/**
 * Scrolls to the first error field in a form
 */
export function scrollToFirstError() {
  // Find the first error message element
  const firstError = document.querySelector('.text-red-500');
  if (firstError) {
    // Find the parent input element
    const inputElement = firstError.parentElement?.querySelector('input, select, textarea') as HTMLElement;
    if (inputElement) {
      // Scroll the input into view with some padding at the top
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the input
      (inputElement as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).focus();
    }
  }
}

/**
 * Validates a SIRET number
 * @param siret - The SIRET number to validate
 * @returns true if the SIRET is valid
 */
export function validateSiret(siret: string): boolean {
  // Remove any spaces
  const cleanSiret = siret.replace(/\s/g, '');

  // Check if it's exactly 14 digits
  if (!/^\d{14}$/.test(cleanSiret)) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost side
  for (let i = cleanSiret.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanSiret[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns true if the phone number is valid
 */
export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\s/g, '');
  return /^0\d{9}$/.test(cleanPhone);
}

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns true if the email is valid
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a postal code
 * @param code - The postal code to validate
 * @returns true if the postal code is valid
 */
export function validatePostalCode(code: string): boolean {
  return /^\d{5}$/.test(code);
}

/**
 * Formats a phone number with spaces
 * @param phone - The phone number to format
 * @returns The formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phone;
}

/**
 * Formats a SIRET number with spaces
 * @param siret - The SIRET number to format
 * @returns The formatted SIRET number
 */
export function formatSiret(siret: string): string {
  const cleaned = siret.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{5})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return siret;
}

/**
 * Validates a form and scrolls to the first error if any
 * @param errors - The form errors object
 * @returns true if the form is valid
 */
export function validateFormAndScroll(errors: Record<string, string | undefined>): boolean {
  const hasErrors = Object.keys(errors).filter(key => errors[key] !== undefined).length > 0;
  if (hasErrors) {
    // Use requestAnimationFrame to ensure the DOM has updated with error messages
    requestAnimationFrame(() => {
      scrollToFirstError();
    });
    return false;
  }
  return true;
} 