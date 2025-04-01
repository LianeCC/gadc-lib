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
export declare function useTrackDechetValidation(api: TrackDechetAPI, initialSiret?: string, options?: UseTrackDechetValidationOptions): UseTrackDechetValidationResult;
export {};
