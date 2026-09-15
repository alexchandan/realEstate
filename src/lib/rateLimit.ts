/**
 * In-Memory Sliding Window Rate Limiter
 * Provides DDoS, scraping, and brute-force mitigation for API endpoints.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

/**
 * Checks if an IP or key has exceeded the allowed limit within a time window.
 * @param identifier Client IP, API key, or user identifier
 * @param maxRequests Maximum requests allowed within windowMs (default: 60)
 * @param windowMs Time window in milliseconds (default: 60000 = 1 minute)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = oldestTimestamp + windowMs - now;
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  // Record this request
  record.timestamps.push(now);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetMs: windowMs,
  };
}
