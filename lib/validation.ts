/**
 * Validation Utilities for Newsletter Subscription
 *
 * This file contains functions to validate and sanitize email input
 * before processing subscription requests.
 */

/**
 * Regular expression for validating email format
 * This pattern checks for:
 * - One or more characters before the @
 * - An @ symbol
 * - One or more characters for the domain
 * - A dot followed by 2+ characters for the TLD
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates if a string is a properly formatted email address
 *
 * @param email - The email string to validate
 * @returns true if the email format is valid, false otherwise
 *
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * isValidEmail('') // false
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Sanitizes an email address by trimming whitespace and converting to lowercase
 *
 * @param email - The email string to sanitize
 * @returns The sanitized email string
 *
 * @example
 * sanitizeEmail('  User@Example.COM  ') // 'user@example.com'
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }
  return email.trim().toLowerCase();
}

/**
 * Validation result object
 */
interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitizedEmail?: string;
}

/**
 * Validates a subscription request email with detailed error messages
 *
 * This function performs complete validation including:
 * 1. Checks if email is provided
 * 2. Validates email format
 * 3. Returns sanitized email if valid
 *
 * @param email - The email to validate
 * @returns ValidationResult with valid status and either error or sanitized email
 *
 * @example
 * validateSubscribeRequest('user@example.com')
 * // { valid: true, sanitizedEmail: 'user@example.com' }
 *
 * validateSubscribeRequest('')
 * // { valid: false, error: 'Please enter your email address' }
 *
 * validateSubscribeRequest('invalid')
 * // { valid: false, error: 'Please enter a valid email address' }
 */
export function validateSubscribeRequest(email: string): ValidationResult {
  // Check if email is provided
  if (!email || email.trim() === '') {
    return {
      valid: false,
      error: 'Please enter your email address',
    };
  }

  // Sanitize the email
  const sanitizedEmail = sanitizeEmail(email);

  // Validate email format
  if (!isValidEmail(sanitizedEmail)) {
    return {
      valid: false,
      error: 'Please enter a valid email address',
    };
  }

  // All validations passed
  return {
    valid: true,
    sanitizedEmail,
  };
}
