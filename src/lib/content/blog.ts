import { allBlogs } from "@content"
import type { Blog } from "@content"

/**
 * Content helper functions for blog posts.
 *
 * Published posts only — `draft: true` posts are excluded from every
 * public surface (routes, sitemap, RSS, tag pages).
 */

/** All published posts, most recent first. */
export function getAllPosts(): Blog[] {
  return [...allBlogs]
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** The most recent published posts. */
export function getRecentPosts(limit: number): Blog[] {
  return getAllPosts().slice(0, limit)
}

/** Look up a single post by its slug. Drafts return undefined. */
export function getPostBySlug(slug: string): Blog | undefined {
  const post = allBlogs.find((item) => item.slug === slug)
  return post && !post.draft ? post : undefined
}

/** All tags across published posts, with post counts. */
export function getAllTags(): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

/** Distinct categories across published posts. */
export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort()
}

/** Posts sharing a tag with the given slug, excluding the post itself. */
export function getRelatedPosts(slug: string, limit = 2): Blog[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  return getAllPosts()
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => {
      const overlap = candidate.tags.filter((tag) => post.tags.includes(tag)).length
      return { candidate, overlap }
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}
