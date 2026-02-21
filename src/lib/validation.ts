import { z } from 'zod';
import { FORM_LIMITS } from './constants';

/**
 * Zod schema for contact form validation
 */
export const contactFormSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(FORM_LIMITS.EMAIL_MAX_LENGTH, 'Email is too long'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]+$/.test(val),
      'Invalid phone number format'
    ),
  message: z
    .string()
    .min(
      FORM_LIMITS.MESSAGE_MIN_LENGTH,
      `Message must be at least ${FORM_LIMITS.MESSAGE_MIN_LENGTH} characters`
    )
    .max(
      FORM_LIMITS.MESSAGE_MAX_LENGTH,
      `Message must be ${FORM_LIMITS.MESSAGE_MAX_LENGTH} characters or less`
    )
    .transform((val) => val.trim()),
  website: z.string().optional(), // honeypot field
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Validate contact form input
 * Returns validated data or error object
 */
export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormInput;
  errors?: Record<string, string>;
} {
  try {
    const validatedData = contactFormSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0];
        if (path) {
          errors[path.toString()] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}

/**
 * Additional spam detection rules
 */
export function checkSpamContent(message: string): boolean {
  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 5) {
    return true;
  }

  // Check for repeated characters (e.g., "aaaaaa")
  if (/(.)\1{5,}/g.test(message)) {
    return true;
  }

  // Check for all caps (optional - commented out to avoid false positives)
  // if (message.length > 20 && message === message.toUpperCase()) {
  //   return true;
  // }

  return false;
}

/**
 * Validate email against known spam patterns
 */
export function isSpamEmail(email: string): boolean {
  const spamPatterns = [/^test@test/, /^admin@admin/, /^spam@/i];

  return spamPatterns.some((pattern) => pattern.test(email));
}
