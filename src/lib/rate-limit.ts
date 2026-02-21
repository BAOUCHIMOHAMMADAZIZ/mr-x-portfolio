import { RATE_LIMIT } from './constants';

// In-memory rate limit store (fallback when Redis unavailable)
const rateLimitStore = new Map<string, number[]>();

/**
 * Simple in-memory rate limiter
 * Tracks request timestamps per IP hash
 */
export function checkRateLimit(ipHash: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.WINDOW_MS;

  // Get existing timestamps for this IP
  const timestamps = rateLimitStore.get(ipHash) || [];

  // Filter out old timestamps outside the window
  const recentTimestamps = timestamps.filter((ts) => ts > windowStart);

  // Check if limit exceeded
  if (recentTimestamps.length >= RATE_LIMIT.MAX_REQUESTS) {
    // Calculate retry after time (when oldest request exits the window)
    const oldestTimestamp = Math.min(...recentTimestamps);
    const retryAfter = Math.ceil((oldestTimestamp + RATE_LIMIT.WINDOW_MS - now) / 1000);

    return {
      allowed: false,
      retryAfter: Math.max(retryAfter, 1),
    };
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitStore.set(ipHash, recentTimestamps);

  // Cleanup old entries (optional: every 10 minutes)
  if (Math.random() < 0.01) {
    cleanupOldEntries();
  }

  return { allowed: true };
}

/**
 * Cleanup old entries from rate limit store
 * Prevents memory leaks from old IP hashes
 */
function cleanupOldEntries() {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT.WINDOW_MS;

  for (const [ipHash, timestamps] of rateLimitStore.entries()) {
    const recentTimestamps = timestamps.filter((ts) => ts > windowStart);

    if (recentTimestamps.length === 0) {
      rateLimitStore.delete(ipHash);
    } else {
      rateLimitStore.set(ipHash, recentTimestamps);
    }
  }
}

/**
 * Attempt to use Upstash Redis for distributed rate limiting
 * Falls back to in-memory if unavailable
 */
export async function checkRateLimitWithUpstash(
  ipHash: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  // Try Upstash first
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');

      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(
          RATE_LIMIT.MAX_REQUESTS,
          `${RATE_LIMIT.WINDOW_MS}ms`
        ),
      });

      const { success, remaining, reset } = await ratelimit.limit(ipHash);

      if (!success) {
        const retryAfter = Math.ceil((reset - Date.now()) / 1000);
        return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
      }

      return { allowed: true };
    }
  } catch (error) {
    console.warn('Upstash rate limit unavailable, falling back to in-memory:', error);
  }

  // Fallback to in-memory
  return checkRateLimit(ipHash);
}
