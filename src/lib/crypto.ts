import crypto from 'crypto';

/**
 * Extract IP address from request headers
 * Handles proxied requests (Vercel, etc.)
 */
export function getClientIP(headers: Headers): string {
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIP = headers.get('x-real-ip');
  if (xRealIP) {
    return xRealIP;
  }

  return 'unknown';
}

/**
 * Hash IP address for privacy
 * Do not store raw IPs
 */
export function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

/**
 * Generate a CUID-like unique ID
 * Used for submission IDs
 */
export function generateID(): string {
  return crypto.randomBytes(12).toString('hex');
}
