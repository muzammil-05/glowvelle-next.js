/**
 * MVP in-memory rate limiter for affiliate click deduplication.
 * Same session + link (or store when link is absent) within 2 seconds skips
 * duplicate inserts but still allows redirect.
 *
 * Production note: replace with Redis or edge KV for multi-instance deployments.
 */

const RATE_LIMIT_WINDOW_MS = 2_000;
const CLEANUP_INTERVAL_MS = 60_000;

type RateLimitEntry = {
  expiresAt: number;
};

const clickTimestamps = new Map<string, RateLimitEntry>();
let lastCleanupAt = 0;

function buildRateLimitKey(
  sessionId: string,
  affiliateLinkId: string | null | undefined,
  storeId: string
): string {
  return `${sessionId}:${affiliateLinkId ?? storeId}`;
}

function cleanupExpiredEntries(now: number): void {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) {
    return;
  }

  lastCleanupAt = now;

  for (const [key, entry] of clickTimestamps) {
    if (entry.expiresAt <= now) {
      clickTimestamps.delete(key);
    }
  }
}

export function shouldSkipDuplicateClick(
  sessionId: string,
  affiliateLinkId: string | null | undefined,
  storeId: string
): boolean {
  const now = Date.now();
  cleanupExpiredEntries(now);

  const key = buildRateLimitKey(sessionId, affiliateLinkId, storeId);
  const existing = clickTimestamps.get(key);

  if (existing && existing.expiresAt > now) {
    return true;
  }

  clickTimestamps.set(key, {
    expiresAt: now + RATE_LIMIT_WINDOW_MS,
  });

  return false;
}
