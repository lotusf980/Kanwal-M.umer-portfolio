import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"
import { getProjectBySlug } from "@/lib/content/projects"

export const alt = siteConfig.description
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

/**
 * Per-case-study social card. Reads the project at build time; falls
 * back to the site name if the slug is unknown.
 */
export default async function ProjectOpenGraphImage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  return new ImageResponse(
    (
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
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.22), transparent 45%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <p style={{ fontSize: 24, margin: 0, color: "#38bdf8", letterSpacing: 2 }}>
          {project?.category ?? "Case study"}
        </p>
        <h1
          style={{
            fontSize: 56,
            margin: 0,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 920,
            textWrap: "balance",
          }}
        >
          {project?.title ?? siteConfig.name}
        </h1>
        <p style={{ fontSize: 24, margin: 0, color: "#a1a1aa", maxWidth: 880 }}>
          {project?.tagline ?? siteConfig.tagline}
        </p>
      </div>
    ),
    size
  )
}
