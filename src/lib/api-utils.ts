import { ContactFormResponse } from '@/types/api';

/**
 * Create a success response
 */
export function successResponse(data: {
  message: string;
  submissionId: string;
}): Response {
  return Response.json(
    {
      success: true,
      message: data.message,
      submissionId: data.submissionId,
    } as ContactFormResponse,
    { status: 200 }
  );
}

/**
 * Create a validation error response
 */
export function validationErrorResponse(details: Record<string, string>): Response {
  return Response.json(
    {
      success: false,
      error: 'Validation failed',
      details,
    } as ContactFormResponse,
    { status: 400 }
  );
}

/**
 * Create a rate limit error response
 */
export function rateLimitErrorResponse(retryAfter: number): Response {
  return Response.json(
    {
      success: false,
      error: 'Too many submissions. Please try again later.',
      retryAfter,
    } as ContactFormResponse,
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
      },
    }
  );
}

/**
 * Create a spam error response (generic, doesn't reveal honeypot)
 */
export function spamErrorResponse(): Response {
  return Response.json(
    {
      success: false,
      error: 'Submission failed validation',
    } as ContactFormResponse,
    { status: 400 }
  );
}

/**
 * Create a server error response
 */
export function serverErrorResponse(): Response {
  return Response.json(
    {
      success: false,
      error: 'Server error. Please try again later.',
    } as ContactFormResponse,
    { status: 500 }
  );
}

/**
 * Parse request body safely
 */
export async function parseRequestBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new Error('Invalid JSON');
  }
}
