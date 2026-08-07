/**
 * Lightweight CSRF defense for state-changing POST routes.
 *
 * Browsers send an `Origin` header on cross-origin POSTs; same-origin
 * requests either omit it or match the request `Host`. If an `Origin` is
 * present and doesn't match the current host, the request is not from this
 * site and is rejected.
 */
export function isCrossOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return false // non-browser / same-origin request
  const host = request.headers.get("host")
  if (!host) return true
  try {
    return new URL(origin).host !== host
  } catch {
    // Malformed Origin is treated as hostile.
    return true
  }
}
