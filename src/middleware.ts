import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "admin_session"

/**
 * Protects the private /dashboard. Only the presence of the admin session
 * cookie lets a request through; otherwise redirect to /dashboard/login.
 * The cookie is set by /api/admin/login and is HTTP-only.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith("/dashboard")) return NextResponse.next()

  // The login page must always be reachable.
  if (pathname === "/dashboard/login") return NextResponse.next()

  const session = request.cookies.get(SESSION_COOKIE)?.value
  if (session === "authenticated") return NextResponse.next()

  const loginUrl = new URL("/dashboard/login", request.url)
  loginUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
