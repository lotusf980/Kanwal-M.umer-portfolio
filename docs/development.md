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

## Architecture decisions

See [architecture/decisions](architecture/decisions). Always read relevant ADRs before making a change that affects the content pipeline, rendering strategy, or theming.
