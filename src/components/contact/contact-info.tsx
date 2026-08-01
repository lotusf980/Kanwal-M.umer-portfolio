import { Clock, Mail, MapPin } from "lucide-react"

import { siteConfig } from "@/config/site"
import { SocialLinks } from "@/components/shared/social-links"

/**
 * Direct contact channels shown alongside the form: email, location,
 * availability, and social profiles.
 */
export function ContactInfo() {
  const facts = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.location,
    },
    {
      icon: Clock,
      label: "Availability",
      value: siteConfig.availability,
    },
  ]

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold">Direct channels</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Prefer to skip the form? Reach out directly.
        </p>
        <ul className="mt-5 space-y-4">
          {facts.map((fact) => {
            const Tag = fact.href ? "a" : "div"
            return (
              <li key={fact.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <fact.icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                    {fact.label}
                  </p>
                  <Tag
                    {...(fact.href ? { href: fact.href, className: "focus-ring rounded hover:text-foreground" } : {})}
                    className="mt-0.5 truncate text-sm font-medium"
                  >
                    {fact.value}
                  </Tag>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-lg font-semibold">Elsewhere</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Find me on GitHub, LinkedIn, or subscribe to the blog.
        </p>
        <SocialLinks className="mt-4" />
      </div>
    </div>
  )
}
