/**
 * Scrolls to the first error field in a form
 */
export declare function scrollToFirstError(): void;
/**
 * Validates a SIRET number
 * @param siret - The SIRET number to validate
 * @returns true if the SIRET is valid
 */
export declare function validateSiret(siret: string): boolean;
/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns true if the phone number is valid
 */
export declare function validatePhone(phone: string): boolean;
/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns true if the email is valid
 */
export declare function validateEmail(email: string): boolean;
/**
 * Validates a postal code
 * @param code - The postal code to validate
 * @returns true if the postal code is valid
 */
export declare function validatePostalCode(code: string): boolean;
/**
 * Formats a phone number with spaces
 * @param phone - The phone number to format
 * @returns The formatted phone number
 */
export declare function formatPhoneNumber(phone: string): string;
/**
 * Formats a SIRET number with spaces
 * @param siret - The SIRET number to format
 * @returns The formatted SIRET number
 */
export declare function formatSiret(siret: string): string;
/**
 * Validates a form and scrolls to the first error if any
 * @param errors - The form errors object
 * @returns true if the form is valid
 */
export declare function validateFormAndScroll(errors: Record<string, string | undefined>): boolean;
