import { useCallback } from 'react';
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

export function useTrackDechetFormValidation({
  form,
  api,
  onAddressValidation,
  onCompanyFound,
}: UseTrackDechetFormValidationOptions) {
  const { setValue, getValues } = form;

  const validateSIRET = useCallback(async (siret: string) => {
    try {
      const result = await api.validateSIRET(siret);

      if (result.isValid && result.company) {
        const company = result.company;
        
        // Update form with company data
        setValue('name', company.name);
        setValue('address', company.addressVoie);
        setValue('postalCode', company.addressPostalCode);
        setValue('city', company.addressCity);
        if (company.contactEmail) setValue('email', company.contactEmail);
        if (company.contactPhone) setValue('phone', company.contactPhone);

        // Keep existing values for other fields
        const currentValues = getValues();
        
        // Store original data for comparison
        setValue('originalTrackDechetData', {
          name: company.name,
          addressVoie: company.addressVoie,
          addressPostalCode: company.addressPostalCode,
          addressCity: company.addressCity,
          contactEmail: company.contactEmail,
          contactPhone: company.contactPhone,
        });

        // Reset address validation
        setValue('isAddressValid', false);

        // Notify parent components
        onCompanyFound?.(company);
        onAddressValidation?.(false);

        return true;
      }

      return false;
    } catch (error) {
      console.error('Error validating SIRET:', error);
      return false;
    }
  }, [api, setValue, getValues, onAddressValidation, onCompanyFound]);

  const handleAddressValidation = useCallback((isValid: boolean) => {
    setValue('isAddressValid', isValid);
    onAddressValidation?.(isValid);
  }, [setValue, onAddressValidation]);

  const resetValidation = useCallback(() => {
    setValue('isAddressValid', false);
    setValue('originalTrackDechetData', undefined);
  }, [setValue]);

  return {
    validateSIRET,
    handleAddressValidation,
    resetValidation,
  };
} 