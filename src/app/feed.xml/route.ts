import { getAllPosts } from "@/lib/content/blog"
import { siteConfig } from "@/config/site"

export const dynamic = "force-static"

/**
 * RSS 2.0 feed generated from the published blog collection.
 * Draft posts are excluded.
 */
export function GET() {
  const posts = getAllPosts()
  const baseUrl = siteConfig.url.replace(/\/$/, "")

  // Deterministic build time so the feed can be statically prerendered.
  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date(0).toUTCString()

  const items = posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("\n      ")}
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} — Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
