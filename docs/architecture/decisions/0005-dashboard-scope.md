# 5. Dashboard scope: read-mostly and optional

- Status: accepted
- Date: 2026-08-02

## Context

A private dashboard is a differentiator but must never block or complicate the public site. Content management via a CMS is explicitly out of scope — content stays git-based MDX.

## Decision

Ship a minimal, **read-mostly** `/dashboard`:

- **Auth:** a single `ADMIN_TOKEN` env var. `/api/admin/login` verifies it and sets an HTTP-only session cookie; middleware guards `/dashboard/*` and redirects unauthenticated users to `/dashboard/login`. No accounts, no OAuth.
- **Widgets:** Server Components reading static content counts and cached GitHub statistics; the only client island is the token login and logout controls.
- **Indexing:** `/dashboard` is `noindex` and disallowed in `robots.txt`.
- **Future:** each widget is an isolated module (data source + component), so adding Postgres submissions, Umami analytics, or Redis view counters is a drop-in change, not a rewrite.

## Consequences

- The dashboard is protected but trivial to operate — appropriate for a solo portfolio.
- GitHub stats are fetched at build time and cached on an ISR interval; a rate limit or outage degrades to a friendly note, never a broken page.
- A static export (`output: "export"`) disables the dashboard and GitHub stats — acceptable, documented trade-off.
