import { withContentCollections } from "@content-collections/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: false,
  images: {
    // Project cover images are local, author-controlled SVGs under /content.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default withContentCollections(nextConfig)
