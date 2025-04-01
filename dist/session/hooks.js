var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from './store';
import { getSessionCookie } from './utils';
import { supabase } from '../supabase/client';
export function useSessionCheck() {
    const router = useRouter();
    const state = useSessionStore();
    const sessionId = state.sessionId;
    useEffect(() => {
        function restoreSession() {
            return __awaiter(this, void 0, void 0, function* () {
                // If there's no session in the store, try to get it from cookies
                if (!sessionId) {
                    const cookieSessionId = getSessionCookie();
                    if (cookieSessionId) {
                        // First set the session ID
                        state.setSessionId(cookieSessionId);
                        try {
                            // Fetch session status
                            const { data: sessionData } = yield supabase
                                .from('sessions')
                                .select('status')
                                .eq('id', cookieSessionId)
                                .single();
                            if (sessionData === null || sessionData === void 0 ? void 0 : sessionData.status) {
                                state.setStatus(sessionData.status);
                            }
                            // Fetch company questionnaire data
                            const { data: companyData } = yield supabase
                                .from('company')
                                .select('*')
                                .eq('session_id', cookieSessionId)
                                .single();
                            if (companyData) {
                                // Update all the state values
                                state.setHasStock(companyData.has_stock);
                                state.setHadStockLastYear(companyData.had_stock_lastyear);
                                state.setHasManipulated(companyData.has_manipulated);
                                state.setHasTracability(companyData.has_tracability || false);
                                state.setHasBought(companyData.has_bought);
                                state.setIsSelling(companyData.is_selling);
                                state.setHasTD(companyData.has_td);
                                state.setHasReturnedFluid(companyData.has_returned_fluid || false);
                            }
                        }
                        catch (error) {
                            console.error('Error restoring session data:', error);
                        }
                    }
                    else {
                        // If no session is found in cookies, redirect to home page
                        router.push('/');
                    }
                }
            });
        }
        restoreSession();
    }, [sessionId, state, router, supabase]);
    return sessionId;
}
