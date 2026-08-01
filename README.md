# Portfolio

A production-grade, recruiter-facing portfolio for a senior software engineer targeting top remote roles.

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, a typed **MDX** content layer, and a server-first architecture targeting **Lighthouse 95+**.

## Highlights

- **Git-native CMS** — projects, case studies, and blog posts are plain MDX files in `src/content/`, compiled into typed collections at build time.
- **Fast & static-first** — every public page renders as static HTML; interactivity is isolated to small client components.
- **Dark / light / system** theming with zero flash-of-unstyled-content.
- **SEO complete** — metadata API, JSON-LD, sitemap, robots, RSS, and dynamic Open Graph images.
- **Recruiter-friendly** — one-click resume download, featured work with impact metrics, technical writing, GitHub everywhere.

## Tech Stack

| Layer      | Choice                    |
| ---------- | ------------------------- |
| Framework  | Next.js (App Router)      |
| Language   | TypeScript                |
| Styling    | Tailwind CSS v4           |
| UI         | shadcn/ui (Radix)         |
| Content    | content-collections + MDX |
| Forms      | React Hook Form + Zod     |
| Animation  | Framer Motion (motion)    |
| Theme      | next-themes               |
| Icons      | Lucide + simple-icons     |
| Email      | Resend                    |
| Deployment | Vercel                    |

## Getting Started

```bash
npm install
cp .env.example .env.local   # add your values
npm run dev                  # http://localhost:3000
```

## Scripts

| Script                 | Purpose                  |
| ---------------------- | ------------------------ |
| `npm run dev`          | Start the dev server     |
| `npm run build`        | Production build         |
| `npm run start`        | Run the production build |
| `npm run lint`         | ESLint                   |
| `npm run typecheck`    | TypeScript type checking |
| `npm run format`       | Prettier write           |
| `npm run format:check` | Prettier check           |

## Adding a Project

Create one MDX file in `src/content/projects/<slug>.mdx` with the required frontmatter. It automatically appears on `/projects`, Home featured (if `featured: true`), the sitemap, and skill aggregation. See [docs/contributing.md](docs/contributing.md).

## Adding a Blog Post

Create `src/content/blog/<slug>.mdx`. Set `draft: true` until it's ready — drafts stay out of routes, the sitemap, and the RSS feed.

## Deployment

**Primary:** [Vercel](https://vercel.com) — push to `main`, set the environment variables from [`.env.example`](.env.example) in the dashboard, and Vercel deploys production with previews per PR. `NEXT_PUBLIC_SITE_URL` must be set to your canonical URL.

**Alternatives:** Netlify / Cloudflare Pages / static export (`output: "export"`). Note that static export disables the private `/dashboard`, the GitHub stats widget, and the contact email delivery — they require a runtime. That trade-off is acceptable if you only need the public site.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, and build on every push/PR. `main` must always pass.

## Documentation

- [Software Design Document](SDD.md) — full architecture
- [docs/](docs/) — development, environment, contribution guides and ADRs

## License

MIT — see [LICENSE](LICENSE).
