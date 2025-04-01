import { CompanyDetails } from './types';
export declare class APITDCache {
    private cache;
    private expirationTime;
    constructor(expirationTime?: number);
    set(siret: string, data: CompanyDetails): void;
    get(siret: string): CompanyDetails | null;
    clear(): void;
    remove(siret: string): void;
    setExpirationTime(seconds: number): void;
    cleanup(): void;
}
