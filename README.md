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

Create one MDX file in `src/content/projects/<slug>.mdx` with the required frontmatter. It automatically appears on `/projects`, Home featured (if `featured: true`), the sitemap, and skill aggregation.

## Documentation

- [Software Design Document](SDD.md) — full architecture
- [docs/](docs/) — development, environment, contribution guides and ADRs

## License

MIT — see [LICENSE](LICENSE).
