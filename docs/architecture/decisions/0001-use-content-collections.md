# 1. Use content-collections for typed content

- Status: accepted
- Date: 2026-08-02

## Context

The site is built around authored long-form content: project case studies and blog posts. We need a content layer that:

- Compiles Markdown/MDX at build time into type-safe, importable modules.
- Validates frontmatter so a malformed file fails the build instead of the browser.
- Stays git-native — no database, no admin panel, no CMS dependency.
- Produces static output so every public page can be SSG/ISR.

We compared plain `@next/mdx`, `next-mdx-remote`, and `content-collections`.

## Decision

Use **content-collections** (the `content-collections` + `@content-collections/core` packages) with the `@content-collections/next` plugin and `@content-collections/mdx` for MDX compilation.

Collections are declared in `content-collections.ts` at the repo root with **Zod schemas** for frontmatter. Each document is transformed at build time into a typed object with a compiled MDX `content` string and derived fields (slug, reading time, headings).

## Consequences

- Every page imports typed collections via the `@content` path alias (`./.content-collections/generated`).
- Invalid frontmatter breaks the build with a readable error — good for a git-native CMS.
- Adds a build-time content generation step (`npm run content:generate`) wired into `pretypecheck` so CI type-checks against fresh types.
- The generated directory is git-ignored and rebuilt deterministically.
