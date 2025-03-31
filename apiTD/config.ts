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

export type TrackDechetConfig = z.infer<typeof TrackDechetConfigSchema>;

export const defaultConfig: TrackDechetConfig = {
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

export function validateConfig(config: Partial<TrackDechetConfig>): TrackDechetConfig {
  const mergedConfig = {
    ...defaultConfig,
    ...config,
    trackdechet: {
      ...defaultConfig.trackdechet,
      ...config.trackdechet,
    },
    validation: {
      ...defaultConfig.validation,
      ...config.validation,
    },
  };

  return TrackDechetConfigSchema.parse(mergedConfig);
}

export class TrackDechetConfigurationError extends Error {
  constructor(message: string, public errors?: z.ZodError) {
    super(message);
    this.name = 'TrackDechetConfigurationError';
  }
} 