var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useState } from 'react';
export function useTrackDechetValidation(api, initialSiret, options = {}) {
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const validate = useCallback((siret) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        setIsLoading(true);
        setError(null);
        try {
            const result = yield api.validateSIRET(siret);
            if (result.isValid && result.company) {
                setCompany(result.company);
                (_a = options.onSuccess) === null || _a === void 0 ? void 0 : _a.call(options, result.company);
            }
            else if (result.error) {
                setError(result.error);
                (_b = options.onError) === null || _b === void 0 ? void 0 : _b.call(options, result.error);
            }
        }
        catch (err) {
            const error = {
                code: 'API_ERROR',
                message: err instanceof Error ? err.message : 'Une erreur est survenue lors de la validation.'
            };
            setError(error);
            (_c = options.onError) === null || _c === void 0 ? void 0 : _c.call(options, error);
        }
        finally {
            setIsLoading(false);
        }
    }), [api, options]);
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
