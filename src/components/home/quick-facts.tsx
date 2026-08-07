import { MapPin, Sparkles, Zap } from "lucide-react"

import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site"
import { profile, profileStats } from "@/data/profile"

/**
 * Quick-facts strip under the hero: location, availability, current focus
 * and — only when set — real experience/project numbers.
 */
export function QuickFacts() {
  const facts: Array<{ label: string; value: string }> = [
    { label: "Location", value: siteConfig.location },
    { label: "Status", value: siteConfig.availability },
    { label: "Currently", value: profile.currentFocus },
  ]

  if (profileStats.yearsExperience !== undefined) {
    facts.push({ label: "Experience", value: `${profileStats.yearsExperience}+ years` })
  }
  if (profileStats.projectsBuilt !== undefined) {
    facts.push({ label: "Projects", value: `${profileStats.projectsBuilt}+` })
  }

  return (
    <div className="border-y border-border bg-muted/30">
      <Container className="py-6">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3 lg:px-6 lg:first:pl-0">
              <IconForLabel label={fact.label} />
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}

function IconForLabel({ label }: { label: string }) {
  const className = "size-4 shrink-0 text-primary"
  const Icon = label === "Location" ? MapPin : label === "Status" ? Zap : Sparkles
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary ring-1 ring-border">
      <Icon className={className} aria-hidden="true" />
    </span>
  )
}
