import { UseFormReturn } from 'react-hook-form';
import { CompanyFormData } from './validation-schema';
import { TrackDechetAPI } from './api';
import { CompanyDetails } from './types';
interface UseTrackDechetFormValidationOptions {
    form: UseFormReturn<CompanyFormData>;
    api: TrackDechetAPI;
    onAddressValidation?: (isValid: boolean) => void;
    onCompanyFound?: (company: CompanyDetails) => void;
}
export declare function useTrackDechetFormValidation({ form, api, onAddressValidation, onCompanyFound, }: UseTrackDechetFormValidationOptions): {
    validateSIRET: (siret: string) => Promise<boolean>;
    handleAddressValidation: (isValid: boolean) => void;
    resetValidation: () => void;
};
export {};
