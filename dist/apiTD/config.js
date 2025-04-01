import { z } from 'zod';
export const TrackDechetConfigSchema = z.object({
    trackdechet: z.object({
        apiUrl: z.string().url('L\'URL de l\'API TrackDéchet est invalide'),
        apiKey: z.string().optional(),
    }),
    validation: z.object({
        validateOnMount: z.boolean().default(true),
        cacheResults: z.boolean().default(true),
        cacheExpiration: z.number().default(3600), // in seconds
    }).default({
        validateOnMount: true,
        cacheResults: true,
        cacheExpiration: 3600,
    }),
});
export const defaultConfig = {
    trackdechet: {
        apiUrl: process.env.TRACKDECHET_API_URL || 'https://api.trackdechets.beta.gouv.fr',
        apiKey: process.env.TRACKDECHET_API_KEY || '',
    },
    validation: {
        validateOnMount: true,
        cacheResults: true,
        cacheExpiration: 3600,
    },
};
export function validateConfig(config) {
    const mergedConfig = Object.assign(Object.assign(Object.assign({}, defaultConfig), config), { trackdechet: Object.assign(Object.assign({}, defaultConfig.trackdechet), config.trackdechet), validation: Object.assign(Object.assign({}, defaultConfig.validation), config.validation) });
    return TrackDechetConfigSchema.parse(mergedConfig);
}
export class TrackDechetConfigurationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.name = 'TrackDechetConfigurationError';
    }
}
