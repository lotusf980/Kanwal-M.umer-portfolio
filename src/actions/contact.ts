"use server"

import { headers } from "next/headers"
import { Resend } from "resend"

import { clientIp, createRateLimiter } from "@/lib/rate-limit"
import {
  contactFormSchema,
  type ContactFormResult,
  type ContactFormValues,
} from "@/lib/validations/contact"

/**
 * Contact form delivery via Resend.
 *
 * Pipeline: honeypot check → server re-validation → rate limit → send.
 * Returns a plain object the client can consume; never throws.
 */

// ── Rate limiting: in-memory sliding window per IP ──────────────
// Simple and correct for a single instance. Swap for Upstash Redis
// when scaling horizontally (see .env.example).
const contactLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 3 })

// ── Email sending (lazy singleton so builds don't touch env) ───
let resend: Resend | null = null
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  resend ??= new Resend(apiKey)
  return resend
}

export async function submitContact(input: ContactFormValues): Promise<ContactFormResult> {
  // Honeypot: if the hidden field was filled, it's a bot. Pretend success.
  if (input.website) return { ok: true }

  const parsed = contactFormSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  if (contactLimiter.isLimited(clientIp(await headers()))) {
    return { ok: false, error: "Too many messages. Please try again in a few minutes." }
  }

  const { name, email, subject, message } = parsed.data
  const client = getResend()
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!client || !to || !from) {
    // Not configured yet (dev / fresh checkout). Report the message to the
    // server console so nothing is silently lost during development.
    const subj = subject ?? "(none)"
    console.info(`[contact] would send from ${name} <${email}> — subject: ${subj}`, message)
    return { ok: true }
  }

  try {
    const { error } = await client.emails.send({
      from,
      to,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      text: message,
    })
    if (error) {
      console.error("[contact] Resend error", error)
      return { ok: false, error: "Something went wrong sending your message. Please try again." }
    }
    return { ok: true }
  } catch (err) {
    console.error("[contact] send failed", err)
    return { ok: false, error: "Something went wrong sending your message. Please try again." }
  }
}
