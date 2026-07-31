/**
 * Central site configuration.
 *
 * ⚠️ All personal details are PLACEHOLDERS. Replace them with your real
 * information. Never fabricate experience, companies, or credentials.
 */
export const siteConfig = {
  name: "Your Name",
  title: "Software Engineer",
  headline: "Senior Software Engineer",
  tagline: "I design and build fast, accessible, production-grade web applications.",
  description:
    "Software engineer building fast, accessible, production-grade web applications with Next.js, React, and TypeScript.",
  author: "Your Name",

  // Reads from .env / Vercel. Falls back to localhost for development.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  email: "hello@example.com",
  location: "Remote · Worldwide",
  availability: "Open to remote opportunities",

  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    rss: "/feed.xml",
  },

  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/skills", label: "Skills" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/now", label: "Now" },
    { href: "/contact", label: "Contact" },
  ] as const,

  // Shown in the footer. Update when you make notable changes.
  lastUpdated: "2026-08-01",

  // Auto-read from package.json at build time.
  version: process.env.npm_package_version ?? "0.1.0",
} as const

export type SiteConfig = typeof siteConfig
