import { siteConfig } from "@/config/site"
import type { Blog, Project } from "@content"

/**
 * Builders for JSON-LD structured data. Each returns a plain object
 * suitable for `JsonLd`. Values come from config/content — placeholders
 * are fine because the schema still validates structurally.
 */

const baseUrl = siteConfig.url.replace(/\/$/, "")

/** `Person` + `WebSite` schemas for the homepage. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: baseUrl,
    email: `mailto:${siteConfig.email}`,
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location },
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
  }
}

/** `Project` schema for case studies. */
export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.summary,
    url: `${baseUrl}/projects/${project.slug}`,
    codeRepository: project.githubUrl,
    keywords: project.technologies.join(", "),
    ...(project.category ? { applicationCategory: project.category } : {}),
  }
}

/** `Article` / `BlogPosting` schema for blog posts. */
export function articleSchema(post: Blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: baseUrl,
    },
    ...(post.tags.length > 0 ? { keywords: post.tags.join(", ") } : {}),
  }
}

/** `ItemList` for collection index pages (projects, blog). */
export function itemListSchema<T extends { title: string; slug: string }>(
  items: T[],
  path: "projects" | "blog"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${baseUrl}/${path}/${item.slug}`,
    })),
  }
}

/** `BreadcrumbList` for nested content pages. */
export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  }
}
