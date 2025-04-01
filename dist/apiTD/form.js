var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback } from 'react';
export function useTrackDechetFormValidation({ form, api, onAddressValidation, onCompanyFound, }) {
    const { setValue, getValues } = form;
    const validateSIRET = useCallback((siret) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield api.validateSIRET(siret);
            if (result.isValid && result.company) {
                const company = result.company;
                // Update form with company data
                setValue('name', company.name);
                setValue('address', company.addressVoie);
                setValue('postalCode', company.addressPostalCode);
                setValue('city', company.addressCity);
                if (company.contactEmail)
                    setValue('email', company.contactEmail);
                if (company.contactPhone)
                    setValue('phone', company.contactPhone);
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
                onCompanyFound === null || onCompanyFound === void 0 ? void 0 : onCompanyFound(company);
                onAddressValidation === null || onAddressValidation === void 0 ? void 0 : onAddressValidation(false);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error validating SIRET:', error);
            return false;
        }
    }), [api, setValue, getValues, onAddressValidation, onCompanyFound]);
    const handleAddressValidation = useCallback((isValid) => {
        setValue('isAddressValid', isValid);
        onAddressValidation === null || onAddressValidation === void 0 ? void 0 : onAddressValidation(isValid);
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
