import { z } from 'zod';
import { isValidSIRETFormat } from './validation';

export const companyFormSchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis"),
  siret: z.string()
    .transform((val: string) => val.replace(/\s/g, ''))
    .pipe(
      z.string()
        .length(14, "Le SIRET doit contenir exactement 14 chiffres")
        .regex(/^\d{14}$/, "Le SIRET doit contenir uniquement des chiffres")
        .refine(isValidSIRETFormat, "Le numéro SIRET n'est pas valide")
    ),
  address: z.string().min(1, "L'adresse est requise"),
  complement: z.string().optional(),
  postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  city: z.string().min(1, "La ville est requise"),
  phone: z.string()
    .transform((val: string) => val.replace(/\s/g, ''))
    .pipe(
      z.string()
        .regex(/^\d{10}$/, "Numéro de téléphone invalide")
        .optional()
    ),
  mobile: z.string()
    .transform((val: string) => val.replace(/\s/g, ''))
    .pipe(
      z.string()
        .regex(/^\d{10}$/, "Numéro de mobile invalide")
    ),
  email: z.string().email("Email invalide"),
  certifyingBody: z.string().min(1, "L'organisme certificateur est requis"),
  certifyingBodyLogin: z.string().min(1, "Le login est requis"),
  certifyingBodyPassword: z.string().min(1, "Le mot de passe est requis"),
  trackWasteLogin: z.string().optional(),
  trackWastePassword: z.string().optional(),
  isAddressValid: z.boolean().default(false),
  originalTrackDechetData: z.object({
    name: z.string(),
    addressVoie: z.string(),
    addressPostalCode: z.string(),
    addressCity: z.string(),
    contactEmail: z.string().nullable(),
    contactPhone: z.string().nullable(),
  }).optional(),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>; 