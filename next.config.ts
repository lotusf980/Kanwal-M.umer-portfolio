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
  async headers() {
    const securityHeaders: Array<{ key: string; value: string }> = [
      // Prevent MIME sniffing and clickjacking.
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      // Stop the header from leaking the full URL to third parties.
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Disable browser features this site never uses.
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      // Content Security Policy. `'unsafe-inline'` is required for Next's
      // inline bootstrap/theme scripts and Tailwind styles; everything else
      // is same-origin only.
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          process.env.NODE_ENV === "development"
            ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
            : "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    ]

    // HSTS should only apply to HTTPS (always the case on Vercel/Netlify).
    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      })
    }

    return [{ source: "/(.*)", headers: securityHeaders }]
  },
}

export default withContentCollections(nextConfig)
