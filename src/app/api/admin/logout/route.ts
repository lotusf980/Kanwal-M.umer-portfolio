import { NextResponse } from "next/server"

import { isCrossOrigin } from "@/lib/csrf"

const SESSION_COOKIE = "admin_session"

export async function POST(request: Request) {
  // Block cross-site form submissions (CSRF).
  if (isCrossOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return response
}
