import { z } from 'zod';
export declare const companyFormSchema: z.ZodObject<{
    name: z.ZodString;
    siret: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>>;
    address: z.ZodString;
    complement: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodString;
    city: z.ZodString;
    phone: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodOptional<z.ZodString>>;
    mobile: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>;
    email: z.ZodString;
    certifyingBody: z.ZodString;
    certifyingBodyLogin: z.ZodString;
    certifyingBodyPassword: z.ZodString;
    trackWasteLogin: z.ZodOptional<z.ZodString>;
    trackWastePassword: z.ZodOptional<z.ZodString>;
    isAddressValid: z.ZodDefault<z.ZodBoolean>;
    originalTrackDechetData: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        addressVoie: z.ZodString;
        addressPostalCode: z.ZodString;
        addressCity: z.ZodString;
        contactEmail: z.ZodNullable<z.ZodString>;
        contactPhone: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        addressVoie: string;
        addressPostalCode: string;
        addressCity: string;
        contactEmail: string | null;
        contactPhone: string | null;
    }, {
        name: string;
        addressVoie: string;
        addressPostalCode: string;
        addressCity: string;
        contactEmail: string | null;
        contactPhone: string | null;
    }>>;
}, "strip", z.ZodTypeAny, {
    siret: string;
    name: string;
    address: string;
    city: string;
    mobile: string;
    email: string;
    postalCode: string;
    certifyingBody: string;
    certifyingBodyLogin: string;
    certifyingBodyPassword: string;
    isAddressValid: boolean;
    phone?: string | undefined;
    complement?: string | undefined;
    trackWasteLogin?: string | undefined;
    trackWastePassword?: string | undefined;
    originalTrackDechetData?: {
        name: string;
        addressVoie: string;
        addressPostalCode: string;
        addressCity: string;
        contactEmail: string | null;
        contactPhone: string | null;
    } | undefined;
}, {
    siret: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    mobile: string;
    email: string;
    postalCode: string;
    certifyingBody: string;
    certifyingBodyLogin: string;
    certifyingBodyPassword: string;
    complement?: string | undefined;
    trackWasteLogin?: string | undefined;
    trackWastePassword?: string | undefined;
    isAddressValid?: boolean | undefined;
    originalTrackDechetData?: {
        name: string;
        addressVoie: string;
        addressPostalCode: string;
        addressCity: string;
        contactEmail: string | null;
        contactPhone: string | null;
    } | undefined;
}>;
export type CompanyFormData = z.infer<typeof companyFormSchema>;
