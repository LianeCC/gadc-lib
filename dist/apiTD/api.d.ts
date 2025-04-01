import { CompanyDetails, TrackDechetConfig, ValidationResponse } from './types';
export declare class TrackDechetAPI {
    private readonly apiUrl;
    private readonly apiKey;
    private readonly cache;
    private readonly config;
    constructor(config: TrackDechetConfig);
    private getHeaders;
    /**
     * Validates a SIRET number and returns company details if valid
     */
    validateSIRET(siret: string): Promise<ValidationResponse>;
    /**
     * Validates and returns company details for session update
     * This is a lighter version that only validates and returns company details
     * without caching or extensive error handling
     */
    validateSIRETForSession(siret: string): Promise<{
        isValid: boolean;
        company: CompanyDetails | null;
    }>;
    /**
     * Clear the cache
     */
    clearCache(): void;
    /**
     * Remove a specific SIRET from cache
     */
    removeFromCache(siret: string): void;
    /**
     * Update cache expiration time
     */
    setCacheExpiration(seconds: number): void;
}
