import { ValidationError } from './types';

/**
 * Validates the format of a SIRET number
 * A valid SIRET number:
 * - Must be exactly 14 digits
 * - Must be a valid Luhn algorithm checksum
 */
export function isValidSIRETFormat(siret: string): boolean {
  // Remove any spaces or special characters
  const cleanSiret = siret.replace(/\s/g, '');

  // Check length
  if (cleanSiret.length !== 14) {
    return false;
  }

  // Check if contains only digits
  if (!/^\d+$/.test(cleanSiret)) {
    return false;
  }

  // Luhn algorithm validation
  let sum = 0;
  let double = false;
  
  // Loop from right to left
  for (let i = cleanSiret.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanSiret.charAt(i));

    if (double) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    double = !double;
  }

  return (sum % 10) === 0;
}

/**
 * Cleans and formats a SIRET number
 */
export function cleanSIRET(siret: string): string {
  return siret.replace(/\s/g, '');
}

/**
 * Formats error messages based on validation results
 */
export function getValidationErrorMessage(code: ValidationError['code']): string {
  switch (code) {
    case 'INVALID_FORMAT':
      return 'Le numéro SIRET fourni n\'est pas valide.';
    case 'NOT_FOUND':
      return 'Entreprise non trouvée dans la base TrackDéchet.';
    case 'COMPANY_CLOSED':
      return 'Cette entreprise est fermée administrativement.';
    case 'API_ERROR':
      return 'Erreur lors de la récupération des données de l\'entreprise.';
    default:
      return 'Une erreur est survenue lors de la validation du SIRET.';
  }
} 