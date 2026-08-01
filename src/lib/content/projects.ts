import { allProjects } from "@content"
import type { Project } from "@content"

/**
 * Content helper functions for project case studies.
 *
 * The data is generated at build time by content-collections and imported
 * statically, so these functions are safe to call in Server Components and
 * route handlers (generateStaticParams, sitemap, RSS).
 */

/** All projects, most recent first. */
export function getAllProjects(): Project[] {
  return [...allProjects].sort((a, b) => b.year - a.year)
}

/** Projects explicitly marked as featured. */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = getAllProjects().filter((project) => project.featured)
  return limit ? featured.slice(0, limit) : featured
}

/** Look up a single project by its slug. */
export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug)
}

/** Distinct project statuses, used for filtering. */
export function getProjectStatuses(): Project["status"][] {
  return Array.from(new Set(allProjects.map((project) => project.status)))
}

/** Distinct project categories, used for filtering. */
export function getProjectCategories(): string[] {
  return Array.from(new Set(allProjects.map((project) => project.category))).sort()
}

/** Distinct technologies across all projects, used for filtering. */
export function getProjectTechnologies(): string[] {
  return Array.from(new Set(allProjects.flatMap((project) => project.technologies))).sort()
}

/** Projects related to a given project via the `related` frontmatter field. */
export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const project = getProjectBySlug(slug)
  if (!project?.related?.length) return []

  return project.related
    .map((relatedSlug) => getProjectBySlug(relatedSlug))
    .filter((item): item is Project => Boolean(item))
    .slice(0, limit)
}

/** Filter projects by a status/category/technology predicate. */
export function filterProjects({
  status,
  category,
  technology,
  projects = getAllProjects(),
}: {
  status?: Project["status"] | "all"
  category?: string | "all"
  technology?: string | "all"
  projects?: Project[]
}): Project[] {
  return projects.filter((project) => {
    if (status && status !== "all" && project.status !== status) return false
    if (category && category !== "all" && project.category !== category) return false
    if (technology && technology !== "all" && !project.technologies.includes(technology)) {
      return false
    }
    return true
  })
}
