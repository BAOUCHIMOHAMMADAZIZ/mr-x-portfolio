import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {
  parseRequestBody,
  validationErrorResponse,
  rateLimitErrorResponse,
  spamErrorResponse,
  serverErrorResponse,
  successResponse,
} from '@/lib/api-utils';
import { getClientIP, hashIP } from '@/lib/crypto';
import { checkRateLimitWithUpstash } from '@/lib/rate-limit';
import { validateContactForm, checkSpamContent, isSpamEmail } from '@/lib/validation';
import { sendContactNotification } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Extract client IP
    const clientIP = getClientIP(request.headers);
    const ipHash = hashIP(clientIP);

    // Check rate limit
    const rateLimitResult = await checkRateLimitWithUpstash(ipHash);
    if (!rateLimitResult.allowed) {
      return rateLimitErrorResponse(rateLimitResult.retryAfter || 900);
    }

    // Parse request body
    let body: unknown;
    try {
      body = await parseRequestBody(request);
    } catch {
      return validationErrorResponse({ general: 'Invalid request format' });
    }

    // Honeypot check (silent spam detection)
    if (typeof body === 'object' && body !== null && 'website' in body) {
      const websiteField = (body as Record<string, unknown>).website;
      if (typeof websiteField === 'string' && websiteField.trim().length > 0) {
        // Honeypot filled - reject silently with generic error
        console.warn(`[SPAM] Honeypot triggered from IP: ${clientIP}`);
        return spamErrorResponse();
      }
    }

    // Validate against schema
    const validationResult = validateContactForm(body);
    if (!validationResult.success || !validationResult.data) {
      return validationErrorResponse(
        validationResult.errors || { general: 'Validation failed' }
      );
    }

    const { email, message, phone } = validationResult.data;

    // Additional spam checks
    if (isSpamEmail(email)) {
      console.warn(`[SPAM] Suspicious email: ${email}`);
      return validationErrorResponse({ email: 'Invalid email address' });
    }

    if (checkSpamContent(message)) {
      console.warn(`[SPAM] Suspicious content from IP: ${clientIP}`);
      return validationErrorResponse({ message: 'Message contains invalid content' });
    }

    // Get user agent
    const userAgent = request.headers.get('user-agent') || undefined;

    // Store in database
    const submission = await prisma.contactSubmission.create({
      data: {
        email,
        phone: phone || null,
        message,
        ipHash,
        userAgent,
        status: 'new',
      },
    });

    // Send email notification (non-blocking, graceful failure)
    const emailSent = await sendContactNotification({
      email,
      phone: phone || undefined,
      message,
      submissionId: submission.id,
    });

    if (!emailSent) {
      console.warn(
        `[EMAIL] Failed to send notification for submission: ${submission.id}`
      );
      // But still return success to user
    }

    // Return success
    return successResponse({
      message: "Message received! We'll get back to you soon.",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error('[API] Contact form error:', error);
    return serverErrorResponse();
  } finally {
    await prisma.$disconnect();
  }
}

// Handle other HTTP methods
export async function GET() {
  return new Response('Method not allowed', { status: 405 });
}
