# Development

## Prerequisites

- Node.js 20+ (this repo targets Next.js 16 / React 19)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                 | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Dev server with Turbopack                  |
| `npm run build`        | Production build                           |
| `npm run start`        | Serve the production build                 |
| `npm run lint`         | ESLint (Next core-web-vitals + TypeScript) |
| `npm run typecheck`    | `tsc --noEmit`                             |
| `npm run format`       | Prettier write                             |
| `npm run format:check` | Prettier check                             |

## Content workflow

All content is Markdown/MDX. Edits hot-reload via the content builder during `next dev`.

- **Projects / case studies:** `src/content/projects/*.mdx`
- **Blog posts:** `src/content/blog/*.mdx`

Every file begins with a YAML frontmatter block. Schemas are defined in `content-collections.ts` (Zod) and validated at build time — an invalid file fails the build with a readable error.

## Contact form

The form on `/contact` is a Server Action (`src/actions/contact.ts`) that re-validates with Zod, rate-limits per IP, and delivers via Resend. Without `RESEND_API_KEY` configured it logs the message server-side and returns success, so the form is safe to develop against. See [environment.md](environment.md) for the variables.

## Private dashboard

`/dashboard` is protected by `ADMIN_TOKEN`:

1. Set `ADMIN_TOKEN` in `.env.local` (any long random string).
2. Visit `/dashboard/login`, enter the token, and sign in.
3. Middleware guards `/dashboard/*`; the session cookie is HTTP-only.

The GitHub widgets read cached stats (build-time fetch, ISR refresh). Without `NEXT_PUBLIC_GITHUB_USERNAME` / `GITHUB_TOKEN` they show a friendly unconfigured note.

## Architecture decisions

See [architecture/decisions](architecture/decisions). Always read relevant ADRs before making a change that affects the content pipeline, rendering strategy, or theming.
