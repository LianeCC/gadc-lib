import { ValidationError } from './types';
/**
 * Validates the format of a SIRET number
 * A valid SIRET number:
 * - Must be exactly 14 digits
 * - Must be a valid Luhn algorithm checksum
 */
export declare function isValidSIRETFormat(siret: string): boolean;
/**
 * Cleans and formats a SIRET number
 */
export declare function cleanSIRET(siret: string): string;
/**
 * Formats error messages based on validation results
 */
export declare function getValidationErrorMessage(code: ValidationError['code']): string;
