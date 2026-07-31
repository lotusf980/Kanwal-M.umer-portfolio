# Contributing

> This document is being completed as part of the release phase. Until then, follow the git conventions below.

## Conventions

- **Branches:** `feat/`, `fix/`, `chore/`, `docs/`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`, `perf:`)
- **Quality gates:** `npm run lint` and `npm run typecheck` must pass before merge

## Adding content

1. Create `src/content/projects/<slug>.mdx` (projects) or `src/content/blog/<slug>.mdx` (blog).
2. Add valid YAML frontmatter (see `content-collections.ts` schemas).
3. Run `npm run dev` and confirm the new item appears on the relevant page.
