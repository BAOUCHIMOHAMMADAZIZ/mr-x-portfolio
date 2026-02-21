export interface ContactFormRequest {
  email: string;
  phone?: string;
  message: string;
  website?: string; // honeypot field
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  submissionId?: string;
  error?: string;
  details?: Record<string, string>;
  retryAfter?: number;
}

export interface ContactFormError {
  email?: string;
  phone?: string;
  message?: string;
}
