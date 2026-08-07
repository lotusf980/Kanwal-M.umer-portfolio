import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { getPostBySlug } from "@/lib/content/blog"

export const alt = siteConfig.description
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

/**
 * Per-article social card. Reads the post at build time; falls back to
 * the site name if the slug is unknown.
 */
export default async function BlogOpenGraphImage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0a0a0f",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.2), transparent 45%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <p style={{ fontSize: 24, margin: 0, color: "#22d3ee", letterSpacing: 2 }}>
        {post?.category ?? siteConfig.title}
      </p>
      <h1
        style={{
          fontSize: 52,
          margin: 0,
          fontWeight: 700,
          lineHeight: 1.15,
          maxWidth: 900,
          textWrap: "balance",
        }}
      >
        {post?.title ?? siteConfig.name}
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: 24, margin: 0, color: "#a1a1aa" }}>{siteConfig.author}</p>
        <p style={{ fontSize: 20, margin: 0, color: "#71717a" }}>
          {post ? `${post.readingTime} min read` : siteConfig.tagline}
        </p>
      </div>
    </div>,
    size
  )
}
