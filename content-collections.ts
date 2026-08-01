import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import type { Pluggable } from "unified"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import GithubSlugger from "github-slugger"
import { z } from "zod"

export type Heading = {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Syntax highlighting via shiki. Uses a light/dark theme map so code blocks
 * re-color when the site theme flips.
 */
const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  keepBackground: false,
  defaultLang: "plaintext",
}

const mdxPlugins = {
  rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]] as Pluggable[],
}

/**
 * Extract h2/h3 headings from raw markdown for the table of contents.
 * IDs are generated with the same algorithm rehype-slug uses, so the TOC
 * anchors line up with the rendered headings.
 */
function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    const level = match[1].length as 2 | 3
    const text = match[2].replace(/`/g, "").trim()
    if (!text) continue
    headings.push({ id: slugger.slug(text), text, level })
  }
  return headings
}

/**
 * Case-study schema. Every field is required to be declared here so that
 * a malformed MDX file fails the build instead of the browser.
 */
const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    status: z.enum(["completed", "in-progress"]),
    year: z.number(),
    category: z.string(),
    technologies: z.array(z.string()),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    coverImage: z.string().optional(),
    featured: z.boolean().default(false),
    features: z.array(z.string()).default([]),
    problem: z.string().optional(),
    goal: z.string().optional(),
    solution: z.string().optional(),
    architecture: z.string().optional(),
    challenges: z.array(z.string()).optional(),
    decisions: z.array(z.object({ decision: z.string(), tradeoff: z.string() })).optional(),
    results: z.array(z.string()).optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    lessons: z.array(z.string()).optional(),
    screenshots: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const content = await compileMDX(context, document, mdxPlugins)
    return {
      ...document,
      content,
      slug: document._meta.fileName.replace(/\.[^.]+$/, ""),
    }
  },
})

/**
 * Blog schema. Reading time is derived from the raw word count at build
 * time; drafts are excluded from routes, sitemap and RSS downstream.
 */
const blog = defineCollection({
  name: "blog",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    updatedAt: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
    content: z.string(),
    headings: z
      .array(z.object({ id: z.string(), text: z.string(), level: z.number() }))
      .default([]),
  }),
  transform: async (document, context) => {
    const rawContent = document.content
    const content = await compileMDX(context, document, mdxPlugins)
    const words = rawContent.split(/\s+/).filter(Boolean).length
    return {
      ...document,
      content,
      slug: document._meta.fileName.replace(/\.[^.]+$/, ""),
      readingTime: Math.max(1, Math.round(words / 200)),
      headings: extractHeadings(rawContent),
    }
  },
})

export default defineConfig({
  content: [projects, blog],
})
