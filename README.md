# Portfolio

A production-grade, recruiter-facing portfolio for a senior software engineer targeting top remote roles.

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, a typed **MDX** content layer, and a server-first architecture targeting **Lighthouse 95+** and **WCAG AA** accessibility.

## Features

- **Git-native CMS** — projects, case studies, and blog posts are plain MDX files in `src/content/`, compiled into typed collections at build time.
- **Fast & static-first** — every public page renders as static HTML; interactivity is isolated to small client islands.
- **Dark / light / system** theming with zero flash-of-unstyled-content.
- **SEO complete** — metadata API, JSON-LD (Person, WebSite, Project, Article, Breadcrumb, ItemList), sitemap, robots, RSS, and dynamic Open Graph images.
- **Contact form** — validated with Zod (client + server), honeypot, IP rate limiting, and Resend email delivery.
- **Private dashboard** — `/dashboard` behind an HTTP-only cookie + middleware, with live GitHub stats.
- **Recruiter-friendly** — one-click resume download, featured work, technical writing, and GitHub everywhere.
- **Hardened** — Content Security Policy + security headers, CSRF-protected admin routes, and escaped JSON-LD.
- **PWA-ready** — branded `icon.svg` favicon and web app manifest.

## Tech Stack

| Layer      | Choice                    |
| ---------- | ------------------------- |
| Framework  | Next.js 16 (App Router)   |
| Language   | TypeScript                |
| Styling    | Tailwind CSS v4           |
| UI         | shadcn/ui (Radix)         |
| Content    | content-collections + MDX |
| Forms      | React Hook Form + Zod     |
| Animation  | Framer Motion (motion)    |
| Theme      | next-themes               |
| Icons      | Lucide + simple-icons     |
| Email      | Resend                    |
| Deployment | Vercel (CI-ready)         |

## Folder Structure

```
src/
├── app/                    # App Router routes + metadata (sitemap, robots, OG, manifest)
│   ├── (home)              # homepage sections
│   ├── about/              # experience, education, certifications
│   ├── blog/[slug]/        # blog index + post pages
│   ├── contact/            # contact page
│   ├── dashboard/          # private admin dashboard + login
│   ├── now/                # "what I'm doing now" page
│   ├── projects/[slug]/    # projects index + case studies
│   ├── resume/             # resume page + PDF download
│   └── skills/             # skill categories + levels
├── actions/                # server actions (contact form)
├── components/             # UI components grouped by feature
├── config/                 # site-wide configuration
├── content/                # MDX content (projects, blog)
├── data/                   # structured data (profile, skills, experience, now)
├── hooks/                  # shared React hooks
├── lib/                    # utilities (content, validation, security, rate limiting)
├── providers/              # theme + motion providers
└── types/                  # shared TypeScript types
```

## Getting Started

```bash
npm install
cp .env.example .env.local   # add your values
npm run dev                  # http://localhost:3000
```

## Environment Variables

| Variable                      | Required | Description                                           |
| ----------------------------- | -------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | ✅       | Canonical site URL (canonicals, sitemap, OG, RSS)     |
| `NEXT_PUBLIC_GITHUB_USERNAME` |          | Public GitHub username for the dashboard stats        |
| `GITHUB_TOKEN`                |          | GitHub PAT for API calls (server-only)                |
| `RESEND_API_KEY`              |          | Resend key for contact form delivery                  |
| `CONTACT_TO_EMAIL`            |          | Where contact messages are delivered                  |
| `CONTACT_FROM_EMAIL`          |          | Verified "From" address, e.g. `onboarding@resend.dev` |
| `ADMIN_TOKEN`                 |          | Secret protecting the `/dashboard` login              |

All secrets live server-side only. Never commit `.env*` files — see [.env.example](.env.example).

## Scripts

| Script                     | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| `npm run dev`              | Start the dev server                       |
| `npm run build`            | Production build (generates content first) |
| `npm run start`            | Run the production build                   |
| `npm run lint`             | ESLint                                     |
| `npm run typecheck`        | TypeScript type checking                   |
| `npm run content:generate` | Compile MDX into typed collections         |
| `npm run format`           | Prettier write                             |
| `npm run format:check`     | Prettier check                             |

## Screenshots

> **Placeholders** — add real screenshots here after deployment:

| Page       | Desktop            | Mobile             |
| ---------- | ------------------ | ------------------ |
| Home       | _(add screenshot)_ | _(add screenshot)_ |
| Projects   | _(add screenshot)_ | _(add screenshot)_ |
| Blog       | _(add screenshot)_ | _(add screenshot)_ |
| Case study | _(add screenshot)_ | _(add screenshot)_ |

## Adding a Project

Create one MDX file in `src/content/projects/<slug>.mdx` with the required frontmatter. It automatically appears on `/projects`, the homepage featured section (if `featured: true`), the sitemap, and skill aggregation. See [docs/contributing.md](docs/contributing.md).

## Adding a Blog Post

Create `src/content/blog/<slug>.mdx`. Set `draft: true` until it's ready — drafts stay out of routes, the sitemap, and the RSS feed.

## Deployment

**Primary:** [Vercel](https://vercel.com) — push to `main`, set the environment variables from [`.env.example`](.env.example) in the dashboard, and Vercel deploys production with previews per PR. `NEXT_PUBLIC_SITE_URL` must be set to your canonical URL.

**Alternatives:** Netlify / Cloudflare Pages / static export (`output: "export"`). Note that static export disables the private `/dashboard`, the GitHub stats widget, and contact email delivery — they require a runtime. That trade-off is acceptable if you only need the public site.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, and build on every push/PR. `main` must always pass.

## Documentation

- [Software Design Document](SDD.md) — full architecture
- [docs/](docs/) — development, environment, contribution guides and ADRs

## Credits

- **[Next.js](https://nextjs.org)** and **Vercel** — framework + hosting
- **[shadcn/ui](https://ui.shadcn.com)** — UI primitives (Radix-based)
- **[content-collections](https://content-collections.dev)** — typed MDX content layer
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Framer Motion](https://motion.dev)** — animations
- **[Lucide](https://lucide.dev)** and **[simple-icons](https://simpleicons.org)** — icons
- **[Resend](https://resend.com)** — email delivery
- Fonts by [Google Fonts](https://fonts.google.com) (Space Grotesk, Inter, JetBrains Mono)

## License

MIT — see [LICENSE](LICENSE).
