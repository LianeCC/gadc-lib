export declare const setSessionCookie: (sessionId: string) => void;
export declare const getSessionCookie: () => string | null;
export declare const removeSessionCookie: () => void;
export declare const createNewSession: (supabase: any, siret?: string | null) => Promise<string | null>;
export declare const resetSession: (supabase: any, sessionId: string) => Promise<string | null | undefined>;
