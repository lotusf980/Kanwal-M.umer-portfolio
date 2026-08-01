import { Award } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import type { CertificationItem } from "@/types"

/**
 * Certifications rendered as a compact grid. Placeholders until real
 * credentials are supplied.
 */
export function CertificationsList({ items }: { items: CertificationItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <Reveal
          key={`${item.name}-${item.issuer}`}
          delay={index * 0.05}
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
        >
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <Award className="size-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.issuer}</p>
            <p className="mt-0.5 font-mono text-[0.7rem] text-muted-foreground">{item.date}</p>
            {item.skills && item.skills.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-1">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
