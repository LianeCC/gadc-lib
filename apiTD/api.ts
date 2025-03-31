import { CompanyDetails, CompanySearchResponse, TrackDechetConfig, ValidationResponse } from './types';
import { cleanSIRET, isValidSIRETFormat } from './validation';
import { APITDCache } from './cache';

const COMPANY_SEARCH_QUERY = `
  query SearchCompanies($clue: String!) {
    searchCompanies(clue: $clue) {
      siret
      name
      etatAdministratif
      addressVoie
      addressPostalCode
      addressCity
      contactEmail
      contactPhone
      isRegistered
    }
  }
`;

export class TrackDechetAPI {
  private readonly apiUrl: string;
  private readonly apiKey: string | undefined;
  private readonly cache: APITDCache;
  private readonly config: TrackDechetConfig;

  constructor(config: TrackDechetConfig) {
    this.apiUrl = config.trackdechet.apiUrl;
    this.apiKey = config.trackdechet.apiKey;
    this.config = config;
    this.cache = new APITDCache(config.validation.cacheExpiration);
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Only add Authorization header if we have an API key
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  /**
   * Validates a SIRET number and returns company details if valid
   */
  async validateSIRET(siret: string): Promise<ValidationResponse> {
    const cleanedSiret = cleanSIRET(siret);

    // Check format first
    if (!isValidSIRETFormat(cleanedSiret)) {
      return {
        isValid: false,
        company: null,
        error: {
          code: 'INVALID_FORMAT',
          message: 'Le numéro SIRET fourni n\'est pas valide.'
        }
      };
    }

    // Check cache if enabled
    if (this.config.validation.cacheResults) {
      const cachedData = this.cache.get(cleanedSiret);
      if (cachedData) {
        return {
          isValid: true,
          company: cachedData
        };
      }
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          query: COMPANY_SEARCH_QUERY,
          variables: { clue: cleanedSiret }
        })
      });

      if (!response.ok) {
        return {
          isValid: false,
          company: null,
          error: {
            code: 'API_ERROR',
            message: `Erreur API: ${response.status} ${response.statusText}`
          }
        };
      }

      const data: CompanySearchResponse = await response.json();

      // Check for GraphQL errors
      if (data.errors) {
        return {
          isValid: false,
          company: null,
          error: {
            code: 'API_ERROR',
            message: data.errors.map(e => e.message).join(', ')
          }
        };
      }

      const companies = data.data?.searchCompanies;

      if (!companies || companies.length === 0) {
        return {
          isValid: false,
          company: null,
          error: {
            code: 'NOT_FOUND',
            message: 'Entreprise non trouvée dans la base TrackDéchet.'
          }
        };
      }

      const company = companies[0];

      // Check if company is administratively closed
      if (company.etatAdministratif === 'F') {
        return {
          isValid: false,
          company: null,
          error: {
            code: 'COMPANY_CLOSED',
            message: 'Cette entreprise est fermée administrativement.'
          }
        };
      }

      const companyDetails: CompanyDetails = {
        siret: company.siret,
        name: company.name,
        etatAdministratif: company.etatAdministratif,
        addressVoie: company.addressVoie,
        addressPostalCode: company.addressPostalCode,
        addressCity: company.addressCity,
        contactEmail: company.contactEmail,
        contactPhone: company.contactPhone,
        isRegistered: company.isRegistered
      };

      // Cache the result if enabled
      if (this.config.validation.cacheResults) {
        this.cache.set(cleanedSiret, companyDetails);
      }

      // Company found and valid
      return {
        isValid: true,
        company: companyDetails
      };
    } catch (error) {
      return {
        isValid: false,
        company: null,
        error: {
          code: 'API_ERROR',
          message: error instanceof Error ? error.message : 'Une erreur est survenue lors de la validation.'
        }
      };
    }
  }

  /**
   * Validates and returns company details for session update
   * This is a lighter version that only validates and returns company details
   * without caching or extensive error handling
   */
  async validateSIRETForSession(siret: string): Promise<{
    isValid: boolean;
    company: CompanyDetails | null;
  }> {
    const cleanedSiret = cleanSIRET(siret);

    if (!isValidSIRETFormat(cleanedSiret)) {
      return {
        isValid: false,
        company: null
      };
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          query: COMPANY_SEARCH_QUERY,
          variables: { clue: cleanedSiret }
        })
      });

      if (!response.ok) {
        return { isValid: false, company: null };
      }

      const data: CompanySearchResponse = await response.json();
      
      if (data.errors || !data.data?.searchCompanies?.length) {
        return { isValid: false, company: null };
      }

      const company = data.data.searchCompanies[0];
      
      if (company.etatAdministratif === 'F') {
        return { isValid: false, company: null };
      }

      return {
        isValid: true,
        company: {
          siret: company.siret,
          name: company.name,
          etatAdministratif: company.etatAdministratif,
          addressVoie: company.addressVoie,
          addressPostalCode: company.addressPostalCode,
          addressCity: company.addressCity,
          contactEmail: company.contactEmail,
          contactPhone: company.contactPhone,
          isRegistered: company.isRegistered
        }
      };
    } catch (error) {
      return { isValid: false, company: null };
    }
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Remove a specific SIRET from cache
   */
  removeFromCache(siret: string): void {
    this.cache.remove(siret);
  }

  /**
   * Update cache expiration time
   */
  setCacheExpiration(seconds: number): void {
    this.cache.setExpirationTime(seconds);
  }
} 