import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * Robots.txt — allows crawling, points to the sitemap, and keeps the
 * private dashboard out of search indexes.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "")

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
