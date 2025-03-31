import { useCallback, useEffect, useState } from 'react';
import { CompanyDetails, ValidationError } from './types';
import { TrackDechetAPI } from './api';

interface UseTrackDechetValidationOptions {
  validateOnMount?: boolean;
  onSuccess?: (company: CompanyDetails) => void;
  onError?: (error: ValidationError) => void;
}

interface UseTrackDechetValidationResult {
  company: CompanyDetails | null;
  isLoading: boolean;
  error: ValidationError | null;
  validate: (siret: string) => Promise<void>;
  reset: () => void;
}

export function useTrackDechetValidation(
  api: TrackDechetAPI,
  initialSiret?: string,
  options: UseTrackDechetValidationOptions = {}
): UseTrackDechetValidationResult {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ValidationError | null>(null);

  const validate = useCallback(async (siret: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await api.validateSIRET(siret);

      if (result.isValid && result.company) {
        setCompany(result.company);
        options.onSuccess?.(result.company);
      } else if (result.error) {
        setError(result.error);
        options.onError?.(result.error);
      }
    } catch (err) {
      const error: ValidationError = {
        code: 'API_ERROR',
        message: err instanceof Error ? err.message : 'Une erreur est survenue lors de la validation.'
      };
      setError(error);
      options.onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [api, options]);

  const reset = useCallback(() => {
    setCompany(null);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (options.validateOnMount && initialSiret) {
      validate(initialSiret);
    }
  }, [initialSiret, options.validateOnMount, validate]);

  return {
    company,
    isLoading,
    error,
    validate,
    reset
  };
} 