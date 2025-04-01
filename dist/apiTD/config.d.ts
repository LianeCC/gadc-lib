import { z } from 'zod';
export declare const TrackDechetConfigSchema: z.ZodObject<{
    trackdechet: z.ZodObject<{
        apiUrl: z.ZodString;
        apiKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        apiUrl: string;
        apiKey?: string | undefined;
    }, {
        apiUrl: string;
        apiKey?: string | undefined;
    }>;
    validation: z.ZodDefault<z.ZodObject<{
        validateOnMount: z.ZodDefault<z.ZodBoolean>;
        cacheResults: z.ZodDefault<z.ZodBoolean>;
        cacheExpiration: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        validateOnMount: boolean;
        cacheResults: boolean;
        cacheExpiration: number;
    }, {
        validateOnMount?: boolean | undefined;
        cacheResults?: boolean | undefined;
        cacheExpiration?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    validation: {
        validateOnMount: boolean;
        cacheResults: boolean;
        cacheExpiration: number;
    };
    trackdechet: {
        apiUrl: string;
        apiKey?: string | undefined;
    };
}, {
    trackdechet: {
        apiUrl: string;
        apiKey?: string | undefined;
    };
    validation?: {
        validateOnMount?: boolean | undefined;
        cacheResults?: boolean | undefined;
        cacheExpiration?: number | undefined;
    } | undefined;
}>;
export type TrackDechetConfig = z.infer<typeof TrackDechetConfigSchema>;
export declare const defaultConfig: TrackDechetConfig;
export declare function validateConfig(config: Partial<TrackDechetConfig>): TrackDechetConfig;
export declare class TrackDechetConfigurationError extends Error {
    errors?: z.ZodError | undefined;
    constructor(message: string, errors?: z.ZodError | undefined);
}
