# 4. Deliver contact messages via a Server Action

- Status: accepted
- Date: 2026-08-02

## Context

The contact form needs client-side validation, server-side re-validation (never trust the client), spam protection, rate limiting, and email delivery — with no user accounts and no server to operate.

## Decision

Use a **Server Action** (`src/actions/contact.ts`) rather than a REST `POST /api/contact` route:

1. Client validates with React Hook Form + the shared Zod schema.
2. The action re-validates with the same schema.
3. A honeypot field silently accepts bot submissions.
4. A per-IP in-memory sliding-window rate limit (10 min, 3 messages) rejects excess traffic.
5. Delivery goes through **Resend** with env-configured to/from addresses.

When Resend is not configured (fresh checkout / dev), the action logs the message server-side and returns success so the form never hard-fails during development.

## Consequences

- Less boilerplate than a route + `fetch`, and progressive enhancement works with plain HTML form submission.
- In-memory rate limiting is correct for a single instance; scaling horizontally requires swapping to Redis (documented in `.env.example`).
- Server-only env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) never reach the client.
