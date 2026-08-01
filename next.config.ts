import { withContentCollections } from "@content-collections/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: false,
  poweredByHeader: false,
  images: {
    // Project cover images are local, author-controlled SVGs under /content.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Serve next-gen formats for any raster images added later.
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    // Strip debug logging from production bundles, keep error + info (the
    // contact action's unconfigured fallback logs via console.info).
    removeConsole: { exclude: ["error", "info"] },
  },
}

export default withContentCollections(nextConfig)
