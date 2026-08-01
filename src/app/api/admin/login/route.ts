import { NextResponse } from "next/server"

/**
 * Single-admin login for the private /dashboard. Verifies the submitted
 * token against `ADMIN_TOKEN` and sets an HTTP-only session cookie.
 * No user accounts, no OAuth — appropriate for a solo portfolio.
 */

const SESSION_COOKIE = "admin_session"
const SESSION_TTL = 60 * 60 * 24 * 7 // 7 days, in seconds

export async function POST(request: Request) {
  const expected = process.env.ADMIN_TOKEN

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Dashboard is not configured." },
      { status: 503 }
    )
  }

  let token: string | undefined
  try {
    const body = (await request.json()) as { token?: string }
    token = body.token
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 })
  }

  if (!token || token !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid token." }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  })
  return response
}
