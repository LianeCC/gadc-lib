var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { useSessionStore } from './store';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
const COOKIE_NAME = 'gadc_session_id';
export const setSessionCookie = (sessionId) => {
    // Set cookie with 60 days expiry
    setCookie('sessionId', sessionId, {
        maxAge: 60 * 24 * 60 * 60, // 60 jours en secondes
        path: '/',
    });
};
export const getSessionCookie = () => {
    const sessionId = getCookie('sessionId');
    return sessionId ? String(sessionId) : null;
};
export const removeSessionCookie = () => {
    deleteCookie('sessionId', { path: '/' });
};
export const createNewSession = (supabase, siret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSessionId = uuidv4();
        console.log('Creating new session with ID:', newSessionId);
        // Get client IP address
        let ipAddress;
        try {
            const ipResponse = yield fetch('https://api.ipify.org?format=json');
            if (!ipResponse.ok) {
                throw new Error(`Failed to get IP: ${ipResponse.statusText}`);
            }
            const ipData = yield ipResponse.json();
            ipAddress = ipData.ip;
            console.log('Got IP address:', ipAddress);
        }
        catch (ipError) {
            console.error('IP fetch error:', ipError);
            ipAddress = '0.0.0.0';
        }
        // First, create session record
        console.log('Creating session record...');
        const { error: sessionError } = yield supabase
            .from('sessions')
            .insert([{ id: newSessionId, status: 'IN_PROGRESS' }]);
        if (sessionError) {
            console.error('Error creating session:', sessionError);
            throw sessionError;
        }
        console.log('Session record created successfully');
        // Then create company record
        console.log('Creating company record...');
        const { error: companyError } = yield supabase
            .from('company')
            .insert({
            session_id: newSessionId,
            siret: siret || undefined,
            ip_address: ipAddress,
            has_stock: false,
            had_stock_lastyear: false,
            has_manipulated: false,
            has_bought: false,
            is_selling: false,
            has_td: false,
        });
        if (companyError) {
            console.error('Error creating company record:', companyError);
            // Clean up session if company creation fails
            console.log('Cleaning up session due to company creation failure...');
            yield supabase
                .from('sessions')
                .delete()
                .eq('id', newSessionId);
            throw companyError;
        }
        console.log('Company record created successfully');
        // Update local state and cookie
        console.log('Updating local state and cookie...');
        setSessionCookie(newSessionId);
        const store = useSessionStore.getState();
        store.setSessionId(newSessionId);
        store.setStatus('IN_PROGRESS');
        console.log('Local state and cookie updated');
        return newSessionId;
    }
    catch (error) {
        console.error('Error in createNewSession:', error);
        return null;
    }
});
export const resetSession = (supabase, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting session reset for ID:', sessionId);
        // First, check if the session exists
        const { data: sessionData, error: sessionError } = yield supabase
            .from('sessions')
            .select('*')
            .eq('id', sessionId)
            .single();
        if (sessionError) {
            console.error('Session not found:', sessionError);
            // If session doesn't exist, just clean up local state
            removeSessionCookie();
            const store = useSessionStore.getState();
            store.resetSession();
            store.setSessionId(null);
            store.setStatus(null);
            return;
        }
        console.log('Found existing session:', sessionData);
        // If session exists, update its status
        const { error: updateError } = yield supabase
            .from('sessions')
            .update({ status: 'RESET' })
            .eq('id', sessionId);
        if (updateError) {
            console.error('Error updating session status:', updateError);
            throw updateError;
        }
        console.log('Updated session status to RESET');
        // Clean up local state
        removeSessionCookie();
        const store = useSessionStore.getState();
        store.resetSession();
        store.setSessionId(null);
        store.setStatus(null);
        // Create new session
        return yield createNewSession(supabase);
    }
    catch (error) {
        console.error('Error in resetSession:', error);
        return null;
    }
});
