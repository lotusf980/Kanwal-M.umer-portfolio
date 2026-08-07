import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * Web app manifest (installable / PWA metadata). Generated at build time.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Portfolio",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#0a0a0f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  }
}
