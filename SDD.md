# Software Design Document — Portfolio V2 (Senior Edition)

**Version:** 2.0
**Date:** 2026-08-01
**Status:** Draft — awaiting approval
**Audience:** A developer targeting top remote software engineering roles.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Website Architecture](#2-website-architecture)
3. [Content Architecture (MDX)](#3-content-architecture-mdx)
4. [Folder Structure](#4-folder-structure)
5. [Routing Plan](#5-routing-plan)
6. [Component Hierarchy](#6-component-hierarchy)
7. [Reusable UI Components](#7-reusable-ui-components)
8. [Project Case Study System](#8-project-case-study-system)
9. [Blog System](#9-blog-system)
10. [Developer Dashboard Architecture](#10-developer-dashboard-architecture)
11. [Advanced Project Filtering](#11-advanced-project-filtering)
12. [GitHub Integration](#12-github-integration)
13. [Animation System](#13-animation-system)
14. [Theme System](#14-theme-system)
15. ["Now" Section](#15-now-section)
16. [Skills Section](#16-skills-section)
17. [Footer](#17-footer)
18. [Color Palette](#18-color-palette)
19. [Typography](#19-typography)
20. [SEO Strategy](#20-seo-strategy)
21. [Accessibility Strategy](#21-accessibility-strategy)
22. [Performance Optimization Plan](#22-performance-optimization-plan)
23. [Responsive Design Strategy](#23-responsive-design-strategy)
24. [Contact Form Architecture](#24-contact-form-architecture)
25. [Engineering Documentation](#25-engineering-documentation)
26. [Recruiter Experience](#26-recruiter-experience)
27. [Deployment Strategy](#27-deployment-strategy)
28. [Git Workflow](#28-git-workflow)
29. [Data Contracts](#29-data-contracts)
30. [Development Phases](#30-development-phases)
31. [Implementation Order](#31-implementation-order)
32. [Technology Decisions](#32-technology-decisions)
33. [Why This Competes for Remote Jobs](#33-why-this-competes-for-remote-jobs)
34. [Non-Goals / Rules](#34-non-goals--rules)

---

## 1. Executive Summary

A **server-rendered, content-driven React application** built on the **Next.js App Router**, engineered to satisfy three audiences simultaneously:

- **Recruiters** — 30-second scan: clear value proposition, one-click resume, featured work with impact metrics.
- **Engineering hiring managers** — deep case studies, technical writing, clean architecture, GitHub visibility.
- **Search engines / LLMs** — structured data, semantic HTML, fast static rendering.

The core architectural bet: **everything that can be static is static**. Content lives as **versioned MDX files** in `src/content/`, giving the author a git-native CMS with no database, no admin panel, and full type safety. Interactivity is confined to small "islands" (navigation, theme, form, filters, animations). A private `/dashboard` and GitHub-backed data are phased in as optional, non-blocking features.

```
┌──────────────────────────────────────────────────────────────┐
│                            BROWSER                            │
└───────────────────────────┬──────────────────────────────────┘
                            │ HTTPS
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                     Next.js App Router                       │
│                                                              │
│   ┌────────────────────────────────────────────────────┐     │
│   │              RSC (Server Components)               │     │
│   │  Pages · Layouts · generateMetadata · API routes   │     │
│   └───────────────┬──────────────────────┬─────────────┘     │
│                   │                      │                   │
│        ┌──────────▼──────────┐   ┌───────▼──────────┐        │
│        │   Content Layer     │   │  Client Islands  │        │
│        │  content-collections│   │  Nav · Theme     │        │
│        │  MDX → typed data   │   │  Form · Filters  │        │
│        │  src/content/**/*.mdx│  │  Animations      │        │
│        └──────────┬──────────┘   └──────────────────┘        │
└───────────────────┼──────────────────────────────────────────┘
                    │
      ┌─────────────┼────────────────┬─────────────┐
      ▼             ▼                ▼             ▼
┌──────────┐  ┌──────────┐  ┌─────────────┐  ┌────────────┐
│  Email   │  │  GitHub  │  │  Analytics  │  │  Edge/Redis│
│ Provider │  │   API    │  │ (Umami)     │  │ (views)    │
└──────────┘  └──────────┘  └─────────────┘  └────────────┘
```

---

## 2. Website Architecture

### 2.1 Layers

| Layer                 | Responsibility                                                                              | Notes                                   |
| --------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Route / App layer** | Page shells, layouts, metadata, `not-found`, error boundaries                               | All Server Components by default        |
| **Content layer**     | MDX → typed collections (projects, blog, now)                                               | Build-time, git-versioned               |
| **Data layer**        | Typed TS data (profile, skills, experience, certifications) + remote data (GitHub)          | Placeholders until real info exists     |
| **Client islands**    | Navigation, theme toggle, hero animation, project explorer, contact form, dashboard widgets | `"use client"`, lazy-loaded where heavy |
| **Infrastructure**    | Vercel, GitHub Actions, edge caching, env-managed secrets                                   | Config-only, no bespoke servers         |

### 2.2 Rendering Strategy

| Route              | Strategy                           | Rationale                               |
| ------------------ | ---------------------------------- | --------------------------------------- |
| `/` Home           | SSG + client islands               | Fastest TTFB; animated hero is isolated |
| `/about`           | SSG                                | Static content                          |
| `/projects`        | SSG                                | Grid from content collections           |
| `/projects/[slug]` | SSG via `generateStaticParams`     | One page per MDX case study             |
| `/blog`            | SSG                                | Index from blog collection              |
| `/blog/[slug]`     | SSG via `generateStaticParams`     | One page per article                    |
| `/now`             | SSG                                | Static MDX page                         |
| `/skills`          | SSG                                | Static grouped data                     |
| `/resume`          | SSG                                | Static + download link                  |
| `/contact`         | SSG + API route                    | Static form, dynamic submit             |
| `/dashboard`       | Static shell + authenticated reads | Private, optional phase                 |
| `/*`               | Static 404                         | Built-in `not-found.tsx`                |

### 2.3 Data Flow

- **Content** → `content-collections` compiles `src/content/**/*.mdx` at build time into typed, importable collections (typed frontmatter + compiled MDX body).
- **Static data** → typed TS modules in `src/data/` (skills, profile, etc.).
- **Remote data (GitHub)** → fetched server-side, cached with ISR/`unstable_cache`.
- **Contact form** → client validation (Zod) → `POST /api/contact` → server re-validation → email provider; optionally persisted to Postgres for the dashboard.
- **Views (optional)** → edge function incrementing an Upstash Redis counter, read by project cards/dashboard.
- **Theme** → `next-themes` with `localStorage` persistence + inline script to prevent FOUC.

---

## 3. Content Architecture (MDX)

### 3.1 Directory Layout

```
src/content/
├─ projects/
│  ├─ auth-boilerplate.mdx
│  └─ design-system.mdx
└─ blog/
   ├─ why-server-components.mdx
   └─ building-a-type-safe-api.mdx
```

Images referenced by content live in `public/content/<collection>/<slug>/...` so `next/image` can optimize them. Small, content-adjacent assets can also live as a sibling folder if preferred.

### 3.2 Content Loading Strategy

- **Build-time compilation.** A single config file (`content.config.ts`) declares two **collections** — `projects` and `blog` — each with a Zod schema validating frontmatter.
- Every `.mdx` file is compiled once at build into a React component (`MDXContent`) and its frontmatter is typed as an object.
- Pages import the generated collections directly; the framework handles generation of a typed index (`export type Project = typeof collection.docs[number]`).
- **No runtime fetching.** Content is part of the build graph → static export friendly, cacheable at the edge, instant page loads.

### 3.3 MDX Processing

| Concern               | Approach                                                                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authoring**         | MDX (Markdown + JSX) — allows rich sections, code blocks, embedded components, and custom React islands inside a case study                              |
| **Code blocks**       | `rehype-pretty-code` or `shiki` syntax highlighting with theme-aware colors (light/dark)                                                                 |
| **Headings**          | `rehype-slug` for anchor links + generated table of contents                                                                                             |
| **Components in MDX** | A `mdx-components.tsx` mapping (e.g. `img → next/image`, custom `Callout`, `Metric`, `CodeBlock`) so content can be expressive without custom components |
| **Reading time**      | Computed from word count during build; stored as a frontmatter-derived field                                                                             |

### 3.4 Type Safety

- Frontmatter schemas are the **single source of truth** for shape — invalid YAML fails the build with a clear error.
- Generated types flow through the whole app: pages, components, metadata builders. No `any`, no runtime shape mismatches.
- Each collection exposes typed helpers (e.g. `getAllProjects()`, `getProjectBySlug()`, `getAllTags()`).

### 3.5 SEO Handling

- `generateMetadata` per collection page reads typed frontmatter: `title`, `description`, `excerpt`, `coverImage`, `date`, `tags`, `draft`.
- DRAFT posts are excluded from routes, sitemap, RSS, and `noindex`-protected if ever published accidentally.
- Case studies emit `Project` JSON-LD; articles emit `Article`/`BlogPosting` JSON-LD.
- Slugs derived from filenames → stable canonical URLs.

---

## 4. Folder Structure

Every folder has exactly one responsibility.

```
portfolio/
├─ public/                        # Static assets served as-is
│  ├─ images/                     # Logos, social cards, favicons
│  ├─ content/                    # Content assets (per-collection subfolders)
│  ├─ resume/                     # Resume PDF (placeholder until real)
│  └─ fonts/                      # (only if not using next/font)
│
├─ src/
│  ├─ app/                        # ⭐ App Router routes + route handlers + metadata
│  │  ├─ (marketing)/             # Route group — shared nav/footer layout for public pages
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx              # Home
│  │  │  ├─ about/page.tsx
│  │  │  ├─ projects/page.tsx
│  │  │  ├─ projects/[slug]/page.tsx
│  │  │  ├─ blog/page.tsx
│  │  │  ├─ blog/[slug]/page.tsx
│  │  │  ├─ now/page.tsx
│  │  │  ├─ skills/page.tsx
│  │  │  ├─ resume/page.tsx
│  │  │  └─ contact/page.tsx
│  │  ├─ dashboard/               # Private area (phase 5, optional)
│  │  │  ├─ page.tsx
│  │  │  └─ layout.tsx            # Optional auth gate
│  │  ├─ api/
│  │  │  ├─ contact/route.ts      # Contact form POST
│  │  │  └─ github/route.ts       # (optional) cached GitHub proxy
│  │  ├─ feed.xml/route.ts        # RSS feed
│  │  ├─ sitemap.ts               # Auto-generated sitemap
│  │  ├─ robots.ts                # robots.txt (routes + sitemap reference)
│  │  ├─ layout.tsx               # Root layout (fonts, theme, providers)
│  │  ├─ globals.css              # Tailwind + design tokens
│  │  ├─ not-found.tsx            # 404
│  │  └─ error.tsx                # Error boundary
│  │
│  ├─ components/                 # ⭐ UI building blocks
│  │  ├─ ui/                      # shadcn/ui primitives (Button, Card, ...)
│  │  ├─ layout/                  # SiteHeader, SiteFooter, ThemeToggle, MobileNav
│  │  ├─ home/                    # Hero, featured projects, skills preview, CTA
│  │  ├─ about/                   # Bio, timeline, education, goals
│  │  ├─ projects/                # ProjectExplorer, ProjectCard, CaseStudyLayout
│  │  ├─ blog/                    # PostCard, PostGrid, PostHeader, TableOfContents
│  │  ├─ skills/                  # SkillCategoryCard, SkillTag, SkillIcon
│  │  ├─ contact/                 # ContactForm, ContactInfo
│  │  ├─ dashboard/               # StatCard, GithubStats, ViewCounter
│  │  ├─ shared/                  # Container, Section, SectionHeading, Callout, Metric
│  │  └─ mdx/                     # MDX component map (CodeBlock, images, prose)
│  │
│  ├─ content/                    # ⭐ MDX content (git-native CMS)
│  │  ├─ projects/*.mdx
│  │  └─ blog/*.mdx
│  │
│  ├─ lib/                        # ⭐ Non-UI logic (no JSX)
│  │  ├─ content/                 # Collection loaders & helpers
│  │  │  ├─ projects.ts
│  │  │  └─ blog.ts
│  │  ├─ validations/
│  │  │  └─ contact.ts            # Zod schemas
│  │  ├─ email.ts                 # Resend/SMTP client (server-only)
│  │  ├─ github.ts                # GitHub API client + cache (server-only)
│  │  ├─ analytics.ts             # Analytics provider init
│  │  ├─ rss.ts                   # RSS feed generator
│  │  ├─ metadata.ts              # Metadata/OG builders
│  │  └─ utils.ts                 # cn(), formatters, etc.
│  │
│  ├─ hooks/                      # ⭐ Shared React hooks
│  │  ├─ use-mounted.ts
│  │  ├─ use-scroll-position.ts
│  │  ├─ use-media-query.ts
│  │  └─ use-project-filters.ts   # Filtering state (phase 4)
│  │
│  ├─ types/                      # ⭐ Shared TypeScript contracts
│  │  └─ index.ts                 # Project, Skill, Profile, Post, ...
│  │
│  ├─ styles/                     # ⭐ Global styling + tokens
│  │  ├─ globals.css
│  │  └─ tokens.css               # (optional) color/font tokens
│  │
│  ├─ config/                     # ⭐ Site-wide configuration
│  │  ├─ site.ts                  # name, url, description, socials
│  │  └─ nav.ts                   # navigation links
│  │
│  ├─ providers/                  # ⭐ Client providers that wrap the app
│  │  ├─ theme-provider.tsx       # next-themes
│  │  └─ motion-provider.tsx      # MotionConfig (reduced motion)
│  │
│  └─ actions/                    # ⭐ Server Actions (co-located mutations)
│     └─ contact.ts               # (alternative to route handler)
│
├─ docs/                          # ⭐ Engineering documentation (see §25)
│  ├─ architecture/decisions/     # ADRs
│  ├─ development.md
│  ├─ contributing.md
│  └─ environment.md
│
├─ content.config.ts              # content-collections config (collections + schemas)
├─ components.json                # shadcn/ui config
├─ .env.example
├─ .gitignore
├─ LICENSE
├─ README.md
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ eslint.config.mjs
└─ .prettierrc
```

### Folder Roles — one line each

| Folder        | Role                                                                |
| ------------- | ------------------------------------------------------------------- |
| `app/`        | Filesystem router — pages, layouts, API routes, metadata            |
| `components/` | All UI; split by feature (`projects`, `blog`) + shared primitives   |
| `content/`    | The git-native CMS: MDX files that become typed data                |
| `lib/`        | Server-only logic: clients, validators, loaders, utilities          |
| `hooks/`      | Reusable client-side state and browser behavior                     |
| `types/`      | Shared TS contracts consumed across folders                         |
| `styles/`     | Global CSS, design tokens, Tailwind entry                           |
| `config/`     | Static site configuration (no logic)                                |
| `providers/`  | Client context providers (theme, motion, analytics)                 |
| `actions/`    | Server Actions for mutations                                        |
| `data/`       | Typed TS data modules (profile, skills, experience, certifications) |
| `docs/`       | ADRs + developer-facing documentation                               |

> `data/` and `content/` coexist: `data/` holds **non-authored structured facts** (profile, skills); `content/` holds **authored long-form** (projects, blog, now).

---

## 5. Routing Plan

| Route              | Page       | SEO                                             | Notes                                                |
| ------------------ | ---------- | ----------------------------------------------- | ---------------------------------------------------- |
| `/`                | Home       | Index, `Person` + `WebSite` JSON-LD, OG/Twitter | Hero, featured projects, skills preview, contact CTA |
| `/about`           | About      | Index, canonical                                | Bio, journey, education, goals, timeline             |
| `/projects`        | Projects   | Index, canonical                                | Full grid + **advanced filtering**                   |
| `/projects/[slug]` | Case study | Index, `Project` JSON-LD, OG image              | Rich MDX case study                                  |
| `/blog`            | Blog index | Index, canonical                                | Filterable post list                                 |
| `/blog/[slug]`     | Article    | Index, `Article` JSON-LD                        | Prose + TOC + related posts                          |
| `/now`             | Now        | Index, canonical                                | "Now page" — current focus                           |
| `/skills`          | Skills     | Index, canonical                                | 7 categories + official icons                        |
| `/resume`          | Resume     | Index, canonical                                | Summary + download                                   |
| `/contact`         | Contact    | Index, canonical                                | Form + direct channels                               |
| `/dashboard`       | Dashboard  | `noindex`, private                              | Phase 5, optional                                    |
| `/feed.xml`        | RSS        | —                                               | Full blog feed                                       |
| `/sitemap.xml`     | Sitemap    | —                                               | Auto-generated                                       |
| `/*`               | 404        | `noindex`                                       | Custom, branded                                      |

**Navigation:** sticky `SiteHeader` (desktop links + mobile `Sheet`), `aria-current="page"` on active route, breadcrumbs on case study/article pages, `SiteFooter` (see §17).

---

## 6. Component Hierarchy

```
<RootLayout>
├─ <ThemeProvider> / <MotionProvider>
├─ <SiteHeader>            (client)
│  ├─ <SiteLogo>
│  ├─ <NavMenu>            (desktop)
│  └─ <MobileNav>          (Sheet)
├─ <main id="main">{children}</main>
├─ <SiteFooter>
└─ <SkipToContent>

<HomePage>                  (RSC)
├─ <HeroSection>           (client)
│  ├─ <AnimatedBackground>
│  ├─ <HeroHeadline>
│  ├─ <HeroIntro>
│  ├─ <CTAButtons>         (primary: View Projects / Resume; secondary: Contact)
│  └─ <SocialLinks>
├─ <QuickFactsStrip>        (years experience, focus areas, availability)
├─ <FeaturedProjects>      → <ProjectCard> × N
├─ <SkillsPreview>         → <SkillPill> × N
└─ <ContactCTA>

<ProjectsPage>              (RSC → passes data to client)
└─ <ProjectExplorer>       (client — filtering/search/sort)
   ├─ <ProjectFilters>     (search, tech, category, status, sort)
   └─ <ProjectGrid>        → <ProjectCard> × N

<ProjectCaseStudyPage>      (RSC)
├─ <CaseStudyHero>         (title, stack, status, links)
├─ <CaseStudyMetrics>      (impact metrics — truthful placeholders)
└─ <MDXContent>            (renders .mdx body + embedded components)

<BlogIndexPage>             (RSC)
├─ <BlogFilters>           (category/tag)
└─ <PostGrid>              → <PostCard> × N

<BlogPostPage>              (RSC)
├─ <PostHeader>            (title, date, reading time, tags)
├─ <TableOfContents>       (client — scroll-spy)
├─ <MDXContent>
└─ <RelatedPosts>

<SkillsPage>
├─ <PageHeader>
└─ <SkillCategoryGrid>     → <SkillCategoryCard> → <SkillTag>/<SkillIcon> × N

<ContactPage>
├─ <PageHeader>
├─ <ContactForm>           (client — RHF + Zod)
└─ <ContactInfo>

<NowPage>                   (RSC)
└─ <MDXContent>

<DashboardPage>             (RSC shell + client widgets)
├─ <StatCard> (views, submissions, GitHub)
├─ <GithubStats>           (client)
├─ <RecentSubmissions>     (phase 5)
└─ <ViewCounter>
```

---

## 7. Reusable UI Components

Built on **shadcn/ui** primitives, composed into domain components.

| Component                          | Source | Purpose                                                  |
| ---------------------------------- | ------ | -------------------------------------------------------- |
| `Button`, `ButtonLink`             | shadcn | CTAs, links, submit                                      |
| `Card`                             | shadcn | Project/skill/post cards                                 |
| `Badge`                            | shadcn | Tech tags, status, learning badge                        |
| `Input`, `Textarea`, `Label`       | shadcn | Form fields                                              |
| `Select`                           | shadcn | Filters, sort control                                    |
| `Sheet`                            | shadcn | Mobile nav drawer                                        |
| `Tabs`                             | shadcn | Skill category switcher (optional)                       |
| `DropdownMenu`                     | shadcn | Theme selector (light/dark/system)                       |
| `Separator`, `Skeleton`, `Tooltip` | shadcn | Layout, loading, hover hints                             |
| `Container`                        | custom | Max-width responsive wrapper                             |
| `Section` / `SectionHeading`       | custom | Consistent spacing + eyebrow/title                       |
| `ProjectCard`                      | custom | Data-driven card (title, tags, status, links, thumbnail) |
| `SkillTag` / `SkillIcon`           | custom | Chip + official brand icon                               |
| `PostCard`                         | custom | Blog card (title, excerpt, date, reading time)           |
| `Callout` / `Metric`               | custom | MDX-embeddable content components                        |
| `CodeBlock`                        | custom | Syntax-highlighted code in MDX                           |
| `TableOfContents`                  | custom | Scroll-spy TOC on blog posts                             |
| `SocialLinks`                      | custom | GitHub/LinkedIn/RSS icon row                             |
| `ThemeToggle`                      | custom | Light/dark/system selector                               |
| `AnimatedBackground`               | custom | GPU-only gradient orbs/grid                              |
| `ContactForm`                      | custom | RHF + Zod + server submit                                |
| `SkipToContent`                    | custom | A11y skip link                                           |

---

## 8. Project Case Study System

### 8.1 Route

```
/projects/[slug]
```

- `generateStaticParams()` reads all project slugs from the `projects` collection.
- The page is a **Server Component** that loads the typed project doc and renders the MDX body inside a `CaseStudyLayout`.
- `generateMetadata()` emits `Project` JSON-LD + rich OG image.
- Case study structure is **frontmatter-driven** for the "sections list", with the **body** carrying the narrative:

```ts
// Data contract (frontmatter)
interface CaseStudy {
  slug: string
  title: string
  tagline: string
  summary: string // SEO meta description
  status: "completed" | "in-progress"
  year: number
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  coverImage: string // og + card image
  featured?: boolean
  features: string[] // bullet list
  problem: string // short framing for the "Problem" section
  goal: string
  research?: string // what was explored
  solution: string
  architecture?: string // system design narrative
  challenges?: string[]
  decisions?: { decision: string; tradeoff: string }[]
  results?: string[]
  metrics?: { label: string; value: string }[] // impact metrics (truthful)
  lessons?: string[]
  screenshots?: string[]
  related?: string[] // slugs of related projects
}
```

### 8.2 Case Study Sections (rendered from frontmatter)

| Section                    | Content                                                   |
| -------------------------- | --------------------------------------------------------- |
| **Problem**                | The user/business problem, constraints, context           |
| **Goal**                   | Success criteria / acceptance                             |
| **Research**               | Options explored, benchmarks, competitor analysis         |
| **Solution**               | What was built and why it fits the problem                |
| **Architecture**           | System design, diagrams, data flow (rich MDX)             |
| **Technologies**           | Stack badges with official icons                          |
| **Challenges**             | Hard problems + how they were solved                      |
| **Decisions & trade-offs** | Explicit ADR-style entries: chosen vs rejected, rationale |
| **Screenshots**            | Image gallery via `next/image`                            |
| **Results**                | Outcomes, metrics, user feedback (truthful only)          |
| **Lessons learned**        | Honest retrospective                                      |

### 8.3 Page Architecture

- **Layout** stays consistent across case studies (shared `CaseStudyLayout`): hero, sticky tech-stack sidebar on desktop, prose body, CTA to GitHub/live demo, related projects.
- **MDX body** allows rich sections, embedded `CodeBlock`, `Callout`, `Metric`, and even small interactive demos (client components) without leaving the file.
- **Authoring:** adding a project = adding one `.mdx` file under `src/content/projects/`. It automatically appears in `/projects`, filtering options, Home featured (if `featured`), sitemap, and skill aggregation.

---

## 9. Blog System

### 9.1 Routes

```
/blog            → index (list, filter by category/tag, pagination-ready)
/blog/[slug]     → article page
/feed.xml        → RSS feed
```

### 9.2 Article Features

| Feature                 | Implementation                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| **SEO metadata**        | Typed frontmatter → `generateMetadata`; `Article`/`BlogPosting` JSON-LD                                     |
| **Categories & tags**   | Frontmatter arrays; derived indexes; tag/category filter on index                                           |
| **Reading time**        | Word-count based, computed at build                                                                         |
| **Related posts**       | Shared-tag scoring (most overlapping tags, newest first)                                                    |
| **RSS feed**            | `feed.xml` route generating valid RSS 2.0 from the blog collection, with absolute URLs, dates, descriptions |
| **Table of contents**   | `rehype-slug` + scroll-spy client component                                                                 |
| **Drafts**              | `draft: true` excluded from index/sitemap/RSS                                                               |
| **Syntax highlighting** | `shiki`/`rehype-pretty-code`, theme-aware light/dark                                                        |

### 9.3 Post Data Contract

```ts
interface Post {
  slug: string
  title: string
  excerpt: string
  date: string // ISO
  updatedAt?: string
  category: string
  tags: string[]
  coverImage?: string
  readingTime: number // computed
  draft?: boolean
  author: string // from site config
}
```

The blog demonstrates **technical writing** — a top filter for senior remote roles — and gives SEO long-tail content beyond the portfolio pages.

---

## 10. Developer Dashboard Architecture

### 10.1 Principle: Future-Ready, Not Over-Engineered

The dashboard is an **optional, phased, read-mostly** area. V1 ships without it; phase 5 adds a minimal version. It must never block the public site.

### 10.2 Proposed Contents (phased)

| Widget                  | Data source                                                                                                                                              | Phase        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **Visitor analytics**   | Umami (privacy-friendly, self-hostable) or Plausible; embedded as script; dashboard shows trends from their public API                                   | 5            |
| **Contact submissions** | Postgres table written by `/api/contact`; read via server component                                                                                      | 5            |
| **GitHub statistics**   | GitHub API (see §12): repos, stars, followers, top languages, contribution count                                                                         | 5            |
| **Project views**       | Upstash Redis counter incremented at the edge per project; read on dashboard                                                                             | 5 (optional) |
| **Content management**  | _Out of scope._ Content remains git-based MDX. A future CMS (e.g. TinaCMS/Decap) could edit `src/content/` and commit — documented as an ADR when needed | future       |

### 10.3 Architecture

- `/dashboard` is `noindex`, protected by a **single admin token** (`ADMIN_TOKEN` env) via a simple HTTP-only cookie set at a `/api/admin/login` route and checked by middleware (or a lightweight auth check in layout). No user accounts, no OAuth — appropriate for a solo portfolio.
- Widgets are **Server Components** that read from Postgres / GitHub / Redis with caching; only the interactive bits (e.g. GitHub stat refresh) are client islands.
- **Future scalability:** because each widget is an isolated data source + component, upgrading to a full auth provider, a real CMS, or richer analytics is a drop-in change to one module, not a rewrite.

---

## 11. Advanced Project Filtering

### 11.1 Capabilities

On `/projects`:

| Control               | Behavior                                                               |
| --------------------- | ---------------------------------------------------------------------- |
| **Search**            | Debounced substring match on title, tagline, description, technologies |
| **Technology filter** | Multi-select chips derived from the union of all tech stacks           |
| **Category filter**   | Single/multi-select from frontmatter `category`                        |
| **Status filter**     | `completed` / `in-progress`                                            |
| **Sorting**           | Newest, Oldest, Most featured, A–Z                                     |

### 11.2 State Management Strategy

- **Source data** stays in the Server Component (RSC) and is passed down as props — no client fetching.
- **Filter state** lives in one client component (`ProjectExplorer`) using `useReducer` (or a single `useState` object) — a single, predictable state shape:

```ts
interface FilterState {
  query: string
  technologies: string[]
  categories: string[]
  status: "all" | "completed" | "in-progress"
  sort: "newest" | "oldest" | "featured" | "az"
}
```

- **Derived results** via `useMemo` over `filteredProjects(...)` — pure function, unit-testable.
- **URL sync** with `useSearchParams` (`?q=&tech=&cat=&status=&sort=`) so filters are **shareable, bookmarkable, and reflected in analytics**. State is read from the URL on load, and updated via `router.replace` with shallow navigation on change.
- **Responsive typing:** `useDeferredValue` on the search query so keystrokes stay 60fps while filtering happens off the critical path.
- **Empty state:** a clear "no projects match" panel with a reset-filters action.

> Why this approach: no global store (Redux/Zustand) needed — the filter state is local to one route, so local state + URL sync is simpler, faster, and easier to reason about. We introduce a global store only if cross-route filtering (e.g. a global command palette) is added later.

---

## 12. GitHub Integration

### 12.1 Data Exposed (public, read-only)

| Datum                               | GitHub endpoint                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Repo count, followers, public repos | `GET /users/{username}`                                                                                  |
| Total stars across repos            | aggregate of `GET /users/{username}/repos?per_page=100`                                                  |
| Top languages                       | aggregate of `GET /repos/{owner}/{repo}/languages` (top N repos)                                         |
| Latest repositories                 | `GET /users/{username}/repos?sort=created&per_page=5`                                                    |
| Contribution activity               | `GET /users/{username}/contributions` (GitHub's SVG endpoint) or scrape-free `contributions` via GraphQL |

### 12.2 API Handling

- **Server-only client** (`lib/github.ts`). A `GITHUB_TOKEN` is stored server-side and **never** reaches the client. `NEXT_PUBLIC_GITHUB_USERNAME` is the only public value.
- **Octokit** optional — plain `fetch` with headers is sufficient and avoids a dependency; introduce Octokit only if we need many endpoints.
- Data is consumed by: Home social/quick-facts, footer (optional), dashboard widgets, and a `/api/github` route as a cached proxy for client components that need async refresh.

### 12.3 Caching & Rate Limits

- **Rate limits:** unauthenticated = 60 req/hr; authenticated token = 5,000 req/hr. We **always** use the token.
- **Caching:** wrap all GitHub calls in `unstable_cache` (or `fetch` with `next: { revalidate: 3600 }`). Public pages are SSG/ISR so GitHub is hit **at build time only** — zero runtime calls for static pages.
- **Graceful degradation:** if the API is unavailable or rate-limited (HTTP 403/429), return cached data or a small fallback; never let GitHub latency block page render.
- **Robustness:** timeouts, retry-once on 5xx, and schema validation of responses (Zod) so a changed API shape can't break the build.

### 12.4 Security

- Token stored only in `.env` (server) and Vercel env vars.
- No secrets in client components, no `NEXT_PUBLIC_` token.
- The `/api/github` route validates its caller context; it exposes only public data (already public on GitHub), so leakage risk is minimal, but it still runs server-side for caching and rate-limit protection.

---

## 13. Animation System

### 13.1 Library & Policy

- **Primary:** Framer Motion (`motion`) for component/scroll animations.
- **Smooth scrolling:** native `scroll-behavior: smooth` by default (cheap, accessible). Optionally **Lenis** for premium inertial scrolling on desktop _only_, initialized client-side, disabled for `prefers-reduced-motion` and touch. Revisit based on Lighthouse/INP results — if it hurts performance, drop it.
- **View transitions:** adopt Next.js **View Transitions API** (`experimental.viewTransition`) for fade/slide between routes, with a **CSS-only fallback** when unsupported. Never gate content on the animation.
- **GSAP:** reserved for a single, high-impact case — e.g. the hero background parallax or a scroll-driven case-study timeline. Imported lazily via `next/dynamic`. If not needed, it stays out of the bundle.
- **Reduced motion:** global `MotionConfig reducedMotion="user"`; all CSS animations wrapped in `@media (prefers-reduced-motion: reduce)`; View Transitions disabled.

### 13.2 Performance Considerations

- Animate **only `transform` and `opacity`** (compositor-friendly, GPU-accelerated). Never layout properties (`width`, `top`, `margin`).
- Isolate animated regions so repaints stay small.
- `will-change` used sparingly (one element at a time) to avoid memory bloat.
- Keep animation libraries in **client islands only**; Server Components render final markup with no animation JS.
- Lazy-load the animated background (`next/dynamic`, `ssr: false`) so the hero text paints before the effect mounts.
- Monitor with bundle analyzer + Lighthouse INP; anything below 95 triggers simplification.

### 13.3 Animation Map

| Element             | Technique                                             |
| ------------------- | ----------------------------------------------------- |
| Hero headline       | Staggered blur/fade-up per line                       |
| Animated background | CSS keyframes (orbs/grid), `transform`/`opacity` only |
| Section headings    | `whileInView` fade-up, `once: true`                   |
| Project/post cards  | Hover lift + gradient border glow                     |
| Skill tags          | Staggered pop-in                                      |
| Route changes       | View Transitions fade + subtle slide                  |
| Theme toggle        | Icon cross-fade                                       |
| Scroll progress     | Thin progress bar on blog/case-study (optional)       |

---

## 14. Theme System

### 14.1 Supported Modes

| Mode       | Trigger                                     |
| ---------- | ------------------------------------------- |
| **Light**  | Explicit toggle                             |
| **Dark**   | Explicit toggle                             |
| **System** | Follows OS `prefers-color-scheme` (default) |

### 14.2 Architecture

- **`next-themes`** powers resolution: an inline script sets `.dark` on `<html>` **before first paint** (prevents FOUC/flash), and persists the choice in `localStorage` under a stable key.
- **Default = system.** The `ThemeToggle` (DropdownMenu) offers Light / Dark / System with a sun/moon/computer icon, giving users full control.
- **Tokens:** all colors are CSS custom properties in `globals.css`; the `.dark` class flips the values. Components use semantic tokens (`bg-background`, `text-foreground`) so **one design pass covers both modes**.
- **`color-scheme`** set on `<html>` so native form controls, scrollbars, and OS UI match the theme.
- **Metadata theme-color** updates per theme for mobile browser chrome.

### 14.3 Why This Matters

Dark mode is table stakes for a developer audience; system-preference support + zero-flash is the mark of a polished, senior-level build.

---

## 15. "Now" Section

### 15.1 Route

```
/now
```

### 15.2 Content (typed MDX, `src/content/now.mdx` or `src/data/now.ts`)

| Block                  | Content                                      |
| ---------------------- | -------------------------------------------- |
| **Currently learning** | Topic, resources, why                        |
| **Currently building** | Active side-project or focus area            |
| **Current goals**      | 3–6 month targets (technical + career)       |
| **Reading**            | Books/articles currently on the stack        |
| **Interests**          | Adjacent areas (e.g. AI, DX, design systems) |

### 15.3 Why It Improves Personal Branding

- **The "Now page" movement** (nownownow.com) — a living snapshot that signals the developer is _actively_ learning and building, not a static CV.
- Recruiters see momentum, curiosity, and current direction at a glance.
- Content is trivially updated (one MDX file), so the page can't go stale.
- It adds a personal, human layer that generic template portfolios lack — a real differentiator for senior remote roles.

---

## 16. Skills Section

### 16.1 Official Icons

- **`simple-icons`** (via `react-icons/si`) provides official brand glyphs (Next.js, TypeScript, React, Docker, PostgreSQL, etc.).
- A typed map (`skill → icon component`) in `lib/skill-icons.ts` resolves each skill name to its brand icon; unknown names fall back to a generic Lucide icon — **no broken images, ever**.
- Icons render as inline SVGs (crisp, no network requests, theme-able).

### 16.2 Data Contract

```ts
interface Skill {
  name: string
  level: "learning" | "comfortable" | "advanced" // truthful self-assessment
  years?: number // optional; NEVER fabricated
  learning?: boolean // "currently learning" badge
  iconKey?: string // maps to brand icon
}

interface SkillCategory {
  category: "Frontend" | "Backend" | "Databases" | "DevOps" | "Tools" | "AI" | "Testing"
  skills: Skill[]
}
```

### 16.3 Rendering

- Seven category cards, each with brand icons + a proficiency/level chip.
- "Currently learning" skills get a distinct accent badge — honest and impressive.
- **No fabricated years of experience.** Where real data is unknown, `years` is omitted rather than guessed (per project rules).

---

## 17. Footer

A proper footer is a trust signal and a navigation aid.

| Column          | Content                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Brand**       | Name, one-line tagline, availability note                                                                                                              |
| **Quick links** | Projects, Blog, About, Skills, Resume, Contact                                                                                                         |
| **Socials**     | GitHub, LinkedIn, RSS (feed icon linking to `/feed.xml`), email                                                                                        |
| **Meta line**   | © {currentYear} · v{version from `package.json`} · Last updated {date} · Built with Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion |

- **Version** read from `package.json` (`process.env.npm_package_version`) — automatically in sync.
- **Last updated date** from a single constant (e.g. `config/site.ts` `lastUpdated`) or the latest git commit date during build — keeps it honest and current without manual edits.
- **Technologies used** as a small inline badge row — reinforces the stack to recruiters at the bottom of every page.

---

## 18. Color Palette

Defined as CSS custom properties in `globals.css` (Tailwind v4 `@theme`), flipped by `.dark`.

### Light Mode

| Token                  | Hex                |
| ---------------------- | ------------------ |
| `--background`         | `#FAFAF9`          |
| `--foreground`         | `#1C1917`          |
| `--primary`            | `#6D28D9` (violet) |
| `--primary-foreground` | `#FFFFFF`          |
| `--secondary`          | `#F5F5F4`          |
| `--muted`              | `#F5F5F4`          |
| `--muted-foreground`   | `#78716C`          |
| `--accent`             | `#0EA5E9` (sky)    |
| `--card`               | `#FFFFFF`          |
| `--border`             | `#E7E5E4`          |
| `--ring`               | `#6D28D9`          |
| `--success`            | `#16A34A`          |
| `--destructive`        | `#DC2626`          |

### Dark Mode

| Token                  | Hex       |
| ---------------------- | --------- |
| `--background`         | `#0C0A09` |
| `--foreground`         | `#FAFAF9` |
| `--primary`            | `#8B5CF6` |
| `--primary-foreground` | `#FFFFFF` |
| `--secondary`          | `#1C1917` |
| `--muted`              | `#1C1917` |
| `--muted-foreground`   | `#A8A29E` |
| `--accent`             | `#38BDF8` |
| `--card`               | `#171412` |
| `--border`             | `#292524` |
| `--ring`               | `#8B5CF6` |

**Brand gradient:** `linear-gradient(135deg, #6D28D9 0%, #0EA5E9 100%)` for hero text, primary CTAs, and backgrounds. **Contrast:** all foreground/background pairs verified WCAG AA in both themes during the build.

---

## 19. Typography

| Role               | Font               | Notes                          |
| ------------------ | ------------------ | ------------------------------ |
| Headings / Display | **Space Grotesk**  | Distinctive, technical, modern |
| Body               | **Inter**          | Readable at all sizes          |
| Mono / Code        | **JetBrains Mono** | Eyebrows, labels, code, stats  |

- Loaded via `next/font/google` with `display: swap` (CLS-safe, self-hosted).
- Fluid hero scale via `clamp()`. Heading line-height ~1.1, body ~1.65. Eyebrow letter-spacing `0.08em`.
- **Code** rendered via Shiki/rehype-pretty-code with theme-aware colors for light/dark.

---

## 20. SEO Strategy

### 20.1 Structured Data (JSON-LD)

| Schema                     | Where                | Data                                                                      |
| -------------------------- | -------------------- | ------------------------------------------------------------------------- |
| `Person`                   | Home                 | name, jobTitle, url, sameAs (GitHub/LinkedIn), image, knowsAbout (skills) |
| `WebSite` + `SearchAction` | Home                 | site URL, potential search                                                |
| `Project`                  | `/projects/[slug]`   | name, description, url, codeRepository, applicationCategory, keywords     |
| `Article` / `BlogPosting`  | `/blog/[slug]`       | headline, datePublished, author, image, wordCount                         |
| `BreadcrumbList`           | Case studies & posts | hierarchical breadcrumbs                                                  |
| `ItemList`                 | `/projects`, `/blog` | ordered list of entries                                                   |

### 20.2 Technical SEO

- **Metadata API** (`generateMetadata`) per route: `title`, `description`, `canonical`, `robots`, Open Graph, Twitter.
- **`metadataBase`** set to the production URL (env-driven).
- **`sitemap.ts`** — auto-generates from route map + content slugs.
- **`robots.ts`** — allows crawl, references sitemap, `noindex` for `/dashboard`.
- **RSS** — `/feed.xml` via `lib/rss.ts` (valid RSS 2.0, absolute URLs).
- **OG/Twitter cards** — `next/og` dynamic ImageResponse generates per-page social cards (title, tagline, brand gradient) with static fallbacks — no manual image authoring.
- **Semantic HTML** — single `h1`/page, proper heading hierarchy, `<article>`/`<time>`/`<nav>`/`<footer>`.
- **Core Web Vitals targets:** LCP < 2.5s, CLS < 0.1, INP < 200ms.

### 20.3 LLM/AI Visibility (forward-looking)

Clean semantic HTML + JSON-LD means the site is also discoverable by AI/LLM crawlers (AI Overviews, Perplexity, etc.), extending reach beyond classic search.

---

## 21. Accessibility Strategy

- **Semantic landmarks** on every page; `SkipToContent` link.
- **Focus**: visible `:focus-visible` rings; mobile drawer closes on `Escape` with focus return.
- **ARIA**: `aria-label` on icon-only links, `aria-current` on active nav, `aria-live` for form states, `role="progressbar"` for scroll progress.
- **Contrast**: WCAG AA in both themes.
- **Motion**: full `prefers-reduced-motion` support (Framer Motion + CSS + View Transitions).
- **Forms**: proper `<label>` association, error text linked via `aria-describedby`, no color-only cues.
- **Images**: meaningful `alt`; decorative elements `aria-hidden`.
- **Keyboard**: every filter/control operable by keyboard; sort/select native where possible.
- **Testing**: axe-core in CI and Lighthouse a11y ≥ 95.

---

## 22. Performance Optimization Plan

Targets: **Lighthouse ≥ 95** (Performance, Accessibility, Best Practices, SEO).

1. **RSC-first** — minimal client JS; content pages ship near-zero hydration.
2. **Code splitting** — `next/dynamic` for animated background, filters (deferred), GitHub widgets.
3. **Fonts** — `next/font`, `display: swap`, preloaded critical faces.
4. **Images** — `next/image`, explicit dimensions, `priority` on LCP, lazy elsewhere, AVIF/WebP.
5. **Animations** — GPU-only properties, isolated regions, motion libraries client-only.
6. **Caching** — static pages cached at the edge; GitHub data built into ISR.
7. **Bundle analysis** — `@next/bundle-analyzer` in a CI job; fail on bundle regressions.
8. **RSS/sitemap** — generated statically, negligible cost.
9. **Third-party scripts** — analytics is lazy-loaded and self-hostable (Umami) to avoid render-blocking.
10. **INP** — debounce search, `useDeferredValue`, avoid long tasks in client islands.

---

## 23. Responsive Design Strategy

**Mobile-first**, Tailwind breakpoints.

| Breakpoint   | Prefix | Behavior                                        |
| ------------ | ------ | ----------------------------------------------- |
| base (375px) | —      | Single column, condensed spacing, mobile drawer |
| `640px`      | `sm`   | Slightly larger type                            |
| `768px`      | `md`   | Two-column grids begin                          |
| `1024px`     | `lg`   | Desktop layout; project/post grids 2–3 cols     |
| `1280px`     | `xl`   | `max-w-7xl` container, comfortable whitespace   |

- **Container:** max-width ~`72rem`, responsive padding (`px-4 sm:px-6 lg:px-8`).
- **Grids:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- **Nav:** inline desktop links → `Sheet` drawer on mobile.
- **Type:** fluid `clamp()` on hero; spacing `py-16 md:py-24`.
- **Touch targets** ≥ 44px.
- **Case study sidebar** collapses below a sticky, stacked layout on mobile.

---

## 24. Contact Form Architecture

### 24.1 Flow

```
User submits
 → RHF + Zod validate client-side (field errors inline)
 → POST /api/contact (or Server Action)
 → server re-validates with Zod (never trust client)
 → rate-limit check (in-memory sliding window per IP)
 → send email via Resend
 → persist to Postgres (dashboard phase) — optional, non-blocking
 → return { ok: true } | { ok: false, error }
 → UI shows success banner (aria-live) or errors; success clears form
```

### 24.2 Zod Schema (`lib/validations/contact.ts`)

```ts
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})
```

### 24.3 Route / Action

- `POST /api/contact` or a **Server Action** (`actions/contact.ts`). Server Action preferred: less boilerplate, progressive enhancement, same security.
- Rate limiting via in-memory sliding window (per IP) → `429`.
- Proper JSON: `400` (validation), `429` (rate), `500` (provider error), `200` (ok).

### 24.4 Env Vars (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
ADMIN_TOKEN=                    # dashboard (phase 5)
NEXT_PUBLIC_GITHUB_USERNAME=
GITHUB_TOKEN=
# Optional phase-5 DB:
DATABASE_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 24.5 States

`idle → submitting → success | error` with `aria-live`. Success clears the form; errors are field-level (Zod) and form-level (network/rate-limit). A lightweight honeypot field adds spam protection without user friction.

---

## 25. Engineering Documentation

Documentation is part of the deliverable — a senior portfolio shows the author _writes_ software thoughtfully.

```
docs/
├─ architecture/
│  └─ decisions/            # ADRs
│     ├─ 0001-use-content-collections.md
│     ├─ 0002-mdx-content.md
│     ├─ 0003-server-first-rendering.md
│     ├─ 0004-contact-via-server-action.md
│     └─ 0005-dashboard-scope.md
├─ development.md           # Setup, scripts, day-to-day workflow
├─ contributing.md          # How to add a project/post, code style, PR process
└─ environment.md           # Env vars, secrets, deployment env setup
```

| Doc                 | Contents                                                                         |
| ------------------- | -------------------------------------------------------------------------------- |
| **ADR**             | Context, decision, consequences per architectural choice — shows senior thinking |
| **development.md**  | `nvm`, install, `dev`/`build`/`lint` scripts, add-content workflow               |
| **contributing.md** | Style guide, branch/commit conventions, how to add a project in one file         |
| **environment.md**  | Every env var explained, where to get it, how it's set on Vercel                 |

The **README** becomes the entry point linking to these docs.

---

## 26. Recruiter Experience

Designed for a 30-second first pass by a recruiter, then a deeper pass by a hiring manager.

| Requirement                    | Implementation                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Download resume**            | Sticky, always-visible button in header + `/resume` page                                                    |
| **View projects quickly**      | Featured grid on Home; one-click to full list                                                               |
| **Project impact metrics**     | Truthful `metrics` block (e.g. "Reduced bundle by 40%") on cards + case studies — **no fabricated numbers** |
| **Technical writing**          | `/blog` demonstrates communication skills — a top differentiator                                            |
| **GitHub visibility**          | GitHub links on every project, footer, and hero socials; GitHub stats optional                              |
| **Contact CTA**                | Prominent "Let's talk" CTA on hero, footer, and end of every case study/post                                |
| **Clear value prop**           | Hero headline states role + specialization in one line                                                      |
| **Quick facts strip**          | Years experience (honest), focus areas, availability status — scannable at a glance                         |
| **Fast, accessible, polished** | ≥95 Lighthouse = signals engineering quality before a single word is read                                   |

---

## 27. Deployment Strategy

**Primary:** **Vercel**.

1. Push to GitHub `main` → Vercel auto-deploys production.
2. Preview deployments per PR/branch for every change.
3. Env vars in Vercel dashboard (never committed); secret-verified at build.
4. Custom domain + SSL; `NEXT_PUBLIC_SITE_URL` for canonical URLs.
5. ISR/SSG pages cached at the Vercel edge.

**CI/CD (GitHub Actions):** on PR → `lint` → `typecheck` → `build` → `test` (if added) → `axe` a11y smoke test → bundle-size check. `main` must always pass.

**Alternatives:** Netlify / Cloudflare Pages / static export (`output: 'export'`) — documented in README. Note: dashboard/GitHub/views need runtime; static export disables those features (acceptable trade-off documented).

---

## 28. Git Workflow

- **Trunk-based with feature branches** (solo maintainer).
- Branch prefixes: `feat/`, `fix/`, `chore/`, `docs/`.
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`, `perf:`.
- **Husky + lint-staged:** format + lint on pre-commit.
- **PRs:** small, self-review, CI gates, one reviewer when possible.
- `main` is always deployable.

### Init steps

1. `git init` → scaffold → first commit `chore: scaffold next.js app`.
2. Implement each phase on `feat/` branches; merge to `main`.
3. Tag releases `v1.0.0` for the footer version + docs.

---

## 29. Data Contracts

### 29.1 Profile (`src/data/profile.ts`)

```ts
interface Profile {
  name: string // [Your Name]
  headline: string
  tagline: string
  email: string // placeholder
  location: string // placeholder
  availability: string // e.g. "Open to remote"
  socials: { github: string; linkedin: string }
  resumeUrl: string // /resume/Resume.pdf
}
```

### 29.2 Skills (`src/data/skills.ts`)

See §16.2. Seven categories; truthful levels; no invented years.

### 29.3 Experience / Education / Certifications

Typed arrays of timeline entries. **All placeholders** (e.g. `Company Name`, `Role`, `Start – End`) — never invented.

### 29.4 Content Collections

Projects (§8.1) and Blog (§9.3), validated by Zod at build time.

### 29.5 Site Config (`src/config/site.ts`)

```ts
interface SiteConfig {
  name: string
  url: string // from NEXT_PUBLIC_SITE_URL
  description: string
  author: string
  lastUpdated: string // single source for footer date
  navLinks: { href: string; label: string }[]
}
```

---

## 30. Development Phases

Each phase ends with a **stop-and-approve** checkpoint.

| Phase                                | Deliverable          | Includes                                                                                                                                                      |
| ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0. Scaffolding**                   | Project skeleton     | `create-next-app`, Tailwind v4, shadcn/ui init, ESLint, Prettier, `content.config.ts`, folder structure, `.env.example`, `.gitignore`, docs scaffolding       |
| **1. Design System**                 | Foundation           | Tokens, fonts, `globals.css`, primitives (`Container`, `SectionHeading`, `Button`, `Card`, `Badge`), ThemeProvider + toggle, header/footer                    |
| **2. Content + Data Layer**          | Content architecture | content-collections setup, collections (projects, blog), typed schemas, data files (profile, skills, experience, education, certifications) with placeholders |
| **3. Home Page**                     | Landing              | Hero + animated background + CTAs + socials, quick-facts strip, featured projects, skills preview, contact CTA                                                |
| **4. Projects + Blog + Skills**      | Content pages        | `/projects` + filtering, `/projects/[slug]` case studies, `/blog` + `/blog/[slug]` + RSS, `/skills`                                                           |
| **5. About + Resume + Now**          | Content pages        | Bio/timeline/education/goals; resume summary + download; `/now`                                                                                               |
| **6. Contact**                       | Interaction          | ContactForm (RHF + Zod), Server Action/route, success/error states, rate limiting                                                                             |
| **7. SEO + A11y + Perf**             | Polish               | Metadata, JSON-LD, sitemap, robots, RSS, dynamic OG images, reduced-motion, axe audit, bundle analysis                                                        |
| **8. GitHub + Dashboard (optional)** | Integrations         | GitHub client + caching, `/dashboard` (analytics, submissions, GitHub stats), admin auth                                                                      |
| **9. Docs + Deploy**                 | Release              | README, ADRs, development/contributing/environment docs, LICENSE, Vercel setup, final Lighthouse run                                                          |

---

## 31. Implementation Order

```text
Phase 0  Scaffold (deps, config, folders)
  ↓
Phase 1  Design system (tokens, primitives, theme, layout)
  ↓
Phase 2  Content layer + data (collections, schemas, placeholders)
  ↓
Phase 3  Home page (the "wow" impression)
  ↓
Phase 4  Projects → case studies → blog → skills (core content pages)
  ↓
Phase 5  About, Resume, Now (story + conversion)
  ↓
Phase 6  Contact (interaction, validation, delivery)
  ↓
Phase 7  SEO, a11y, performance (production readiness)
  ↓
Phase 8  GitHub + Dashboard (differentiation, optional)
  ↓
Phase 9  Docs + deploy (release)
```

Rationale: **content and data first** so that every page renders from real typed structures (and placeholders are consistent); **SEO/perf last** because it's cross-cutting polish over a stable feature set; **integrations optional** so the core site is never blocked.

---

## 32. Technology Decisions

| Decision   | Choice                                                    | Why                                                                                                                                           |
| ---------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | **Next.js App Router**                                    | RSC, SSG/ISR, file routing, edge-ready, best-in-class DX                                                                                      |
| Language   | **TypeScript**                                            | Type safety across data/content/components                                                                                                    |
| Styling    | **Tailwind CSS v4**                                       | Token-driven, fast, mobile-first, theming via CSS vars                                                                                        |
| UI kit     | **shadcn/ui**                                             | Accessible primitives, copy-paste ownership, no lock-in                                                                                       |
| Content    | **content-collections + MDX**                             | Type-safe frontmatter, build-time MDX, git-native CMS, RSS/OG support. _Fallback:_ official `@next/mdx` if collections tooling is undesirable |
| Forms      | **React Hook Form + Zod**                                 | Performant validation, shared schema client/server                                                                                            |
| Animation  | **Framer Motion**                                         | Declarative, accessible (reduced-motion), tree-shakable; GSAP only for one high-impact effect                                                 |
| Theme      | **next-themes**                                           | Zero-FOUC, light/dark/system                                                                                                                  |
| Icons      | **Lucide** (UI) + **simple-icons** (brand)                | Consistent UI glyphs + official tech logos                                                                                                    |
| Email      | **Resend**                                                | Modern API, no SMTP server to maintain                                                                                                        |
| Analytics  | **Umami/Plausible**                                       | Privacy-friendly, self-hostable, non-blocking                                                                                                 |
| Data store | **Postgres (Neon/Vercel)** + **Upstash Redis** (optional) | Only for dashboard/views — public site needs none                                                                                             |
| GitHub     | **REST API + Zod + `unstable_cache`**                     | Read-only public data, build-time caching, no leaks                                                                                           |
| Deployment | **Vercel** + **GitHub Actions**                           | Zero-config, previews, CI gates                                                                                                               |
| Quality    | **ESLint + Prettier + axe + bundle analyzer**             | Enforced in CI                                                                                                                                |

---

## 33. Why This Competes for Remote Jobs

1. **First impression = engineering quality.** A ≥95 Lighthouse site with dark mode, crisp typography, and fluid motion signals craft — before a single word is read.
2. **Proof, not claims.** Case studies with Problem → Solution → Trade-offs → Results and **impact metrics** demonstrate senior-level thinking. No fabricated numbers = more credible than inflated ones.
3. **Technical writing.** A blog with clean architecture (RSS, categories, related posts, SEO) shows communication skills — the #1 soft skill filter for remote roles.
4. **Git-native, ever-fresh content.** A `/now` page and versioned MDX content prove the author actively learns and ships — momentum is the strongest signal for a senior candidate.
5. **Recruiter-friendly conversion paths.** One-click resume, prominent contact CTAs, GitHub everywhere, quick-facts strip — nothing buried, nothing friction-prone.
6. **Architecture you can interview about.** ADRs, typed content collections, server-first rendering, caching strategy, and graceful degradation are concrete talking points in interviews.
7. **Personal brand consistency.** One system — colors, fonts, copy, data — across pages, SEO, and social cards makes the candidate look like a product.

---

## 34. Non-Goals / Rules

- **No fake experience, companies, testimonials, metrics, or education.** Everything factual is **placeholder** until real information is provided; `years` and `metrics` are omitted rather than guessed.
- **No over-engineering.** The dashboard/GitHub/blog are phased and optional; the core site is a static content site.
- **No database required for the public site.** Persistence exists only for the optional dashboard.
- **No admin panel** — content is git-based by design; a CMS is a future ADR, not a phase-1 dependency.

---

**Next step:** Awaiting your approval (or requested changes) before scaffolding any code.
