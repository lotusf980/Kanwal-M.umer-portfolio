import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Container } from "@/components/shared/container"
import { SocialLinks } from "@/components/shared/social-links"
import { Separator } from "@/components/ui/separator"

const builtWith = ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"]

/**
 * Site footer: brand blurb, quick links, socials, and a meta line with
 * version + last-updated date. Rendered on every page.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-heading text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Quick links
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <SocialLinks includeEmail className="mt-4" />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center gap-1.5">
            Built with
            {builtWith.map((tech, index) => (
              <span key={tech}>
                <span className="font-mono text-foreground">{tech}</span>
                {index < builtWith.length - 1 ? "," : ""}
              </span>
            ))}
          </p>

          <p className="font-mono">
            v{siteConfig.version} · Updated {siteConfig.lastUpdated}
          </p>
        </div>
      </Container>
    </footer>
  )
}
