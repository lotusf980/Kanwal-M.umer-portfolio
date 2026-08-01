import { withContentCollections } from "@content-collections/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: false,
}

export default withContentCollections(nextConfig)
