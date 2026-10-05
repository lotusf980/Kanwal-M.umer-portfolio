/**
 * Central site configuration.
 *
 * Personal details for Kanwal M. Umer.
 */
export const siteConfig = {
  name: "Kanwal M. Umer",
  title: "Full Stack Developer | AI Engineer",
  headline: "Full Stack Developer | AI Engineer",
  tagline:
    "I design and build fast, accessible, production-grade web applications with Next.js, Python, and modern AI tooling.",
  description:
    "Full Stack Developer and AI Engineer building modern, accessible, production-grade web applications with Next.js, React, TypeScript, Python, and FastAPI.",
  author: "Kanwal M. Umer",

  // Reads from .env / Vercel. Falls back to localhost for development.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  email: "lotusf980@gmail.com",
  phone: "03082363913",
  location: "Karachi, Pakistan",
  availability: "Open to remote opportunities",

  socials: {
    github: "https://github.com/lotusf980",
    linkedin: "https://www.linkedin.com/in/kanwal-umer-4365272b5",
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
  lastUpdated: "2026-08-08",

  // Auto-read from package.json at build time.
  version: process.env.npm_package_version ?? "0.1.0",
} as const

export type SiteConfig = typeof siteConfig