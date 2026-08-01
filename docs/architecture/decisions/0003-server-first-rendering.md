# 3. Server-first rendering for the public site

- Status: accepted
- Date: 2026-08-02

## Context

Recruiters evaluate the site in seconds on flaky connections. Every page should be fast, accessible without JavaScript, and indexable. But we still need interactivity for navigation, theming, the project explorer, and the contact form.

## Decision

Follow the **App Router server-first model**:

- All content pages are **Server Components** rendered statically (SSG) or with `generateStaticParams` (SSG per slug). No client-side data fetching.
- Interactivity is isolated to small **client islands**: header/mobile nav, theme toggle, hero animation, project explorer, blog filters, contact form, dashboard widgets.
- Heavy islands (e.g. the animated background) load via `next/dynamic` with `ssr: false` so they never block first paint.
- Public pages make no runtime API calls; remote data (GitHub stats) is cached with `unstable_cache` and fetched at build time.

## Consequences

- Near-zero hydration on content pages; static HTML for everything public.
- Prefers-reduced-motion is respected in every animation.
- The dashboard and GitHub stats require a runtime, so a pure static export (`output: "export"`) would disable those features — an acceptable, documented trade-off.
- Adding interactivity requires deliberately opting into a client component.
