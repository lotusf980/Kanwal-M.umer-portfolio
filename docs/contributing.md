# Contributing

This guide covers how to add content and make code changes safely. It's a solo project, but the conventions keep `main` always deployable.

## Git conventions

- **Branches:** `feat/`, `fix/`, `chore/`, `docs/`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`, `perf:`)
- **Quality gates (must pass before merge):**
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`

## Adding a project (one file)

1. Create `src/content/projects/<slug>.mdx`.
2. Add the required frontmatter (schema in `content-collections.ts`): `title`, `tagline`, `summary`, `status`, `year`, `category`, `technologies`.
   - Optional: `githubUrl`, `liveUrl`, `coverImage`, `featured`, `problem`, `goal`, `solution`, `architecture`, `challenges`, `decisions`, `results`, `metrics`, `lessons`, `related`.
3. Write the body in Markdown/MDX. Embed `<Callout>` or `<Metric>` where useful.
4. Run `npm run dev` and confirm it appears on `/projects`. Set `featured: true` to surface it on the homepage.

## Adding a blog post (one file)

1. Create `src/content/blog/<slug>.mdx`.
2. Frontmatter: `title`, `excerpt`, `date` (ISO), `category`, `tags` (optional), `draft` (optional, defaults to `false`).
   - `draft: true` keeps the post out of routes, the sitemap, and the RSS feed until it's ready.
3. Heading structure drives the table of contents — use `##`/`###` for meaningful sections.
4. Verify on `/blog`.

## Editing data (non-authored facts)

- `src/data/profile.ts`, `src/data/skills.ts`, `src/data/experience.ts`, `src/data/education.ts`, `src/data/certifications.ts`, `src/data/now.ts`
- **All placeholders.** Never fabricate companies, metrics, or credentials — replace placeholders with real, truthful data only.

## Code style

- TypeScript strict; server components by default, client islands explicit with `"use client"`.
- Format with Prettier (`npm run format`).
- Semantic UI tokens (`bg-background`, `text-muted-foreground`, `border-border`) — one design pass covers both themes.
- Respect `prefers-reduced-motion` in any new animation.
- New UI: prefer reusing `src/components/ui/*` primitives.

## Pull requests

Small PRs, self-reviewed. Link the relevant ADR if the change touches the content pipeline, rendering strategy, or theming.
