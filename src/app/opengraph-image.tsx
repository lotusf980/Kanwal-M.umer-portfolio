import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = siteConfig.description
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Default branded social card, generated at build time — no manual
 * image authoring. Per-page cards can override via their own
 * `opengraph-image.tsx`.
 */
export default function OpenGraphImage() {
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
          "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.22), transparent 45%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 28, margin: 0, color: "#38bdf8", letterSpacing: 2 }}>
          {siteConfig.headline}
        </p>
        <h1 style={{ fontSize: 72, margin: 0, fontWeight: 700, lineHeight: 1.05 }}>
          {siteConfig.name}
        </h1>
      </div>
      <p style={{ fontSize: 28, margin: 0, color: "#a1a1aa", maxWidth: 880 }}>
        {siteConfig.tagline}
      </p>
    </div>,
    size
  )
}
