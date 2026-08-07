/**
 * In-memory sliding-window rate limiter.
 *
 * Suitable for a single-instance deployment (e.g. one warm Vercel function
 * on a low-traffic portfolio). For horizontally scaled deploys, swap for a
 * distributed store like Upstash Redis.
 */
export type RateLimiter = {
  /** Returns true when the key has exceeded the per-window allowance. */
  isLimited: (key: string) => boolean
  reset: () => void
}

export function createRateLimiter({
  windowMs,
  max,
}: {
  windowMs: number
  max: number
}): RateLimiter {
  const hits = new Map<string, number[]>()

  return {
    isLimited(key) {
      const now = Date.now()
      const recent = (hits.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs)
      if (recent.length >= max) return true
      recent.push(now)
      hits.set(key, recent)
      return false
    },
    reset() {
      hits.clear()
    },
  }
}

/**
 * Best-effort client IP from proxy headers. First entry of `x-forwarded-for`
 * is the origin client; `x-real-ip` is a fallback.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown"
  return headers.get("x-real-ip") || "unknown"
}