export interface CompanyDetails {
  siret: string;
  name: string;
  etatAdministratif: string;
  addressVoie: string;
  addressPostalCode: string;
  addressCity: string;
  contactEmail: string | null;
  contactPhone: string | null;
  isRegistered: boolean;
}

export interface ValidationError {
  code: 'INVALID_FORMAT' | 'NOT_FOUND' | 'COMPANY_CLOSED' | 'API_ERROR';
  message: string;
}

export interface ValidationResponse {
  isValid: boolean;
  company: CompanyDetails | null;
  error?: ValidationError;
}

export interface TrackDechetConfig {
  trackdechet: {
    apiUrl: string;
    apiKey?: string;
  };
  validation: {
    validateOnMount: boolean;
    cacheResults: boolean;
    cacheExpiration: number; // in seconds
  };
}

// GraphQL types
export interface CompanySearchResponse {
  data?: {
    searchCompanies: Array<{
      siret: string;
      name: string;
      etatAdministratif: string;
      addressVoie: string;
      addressPostalCode: string;
      addressCity: string;
      contactEmail: string | null;
      contactPhone: string | null;
      isRegistered: boolean;
    }>;
  };
  errors?: Array<{
    message: string;
  }>;
} 