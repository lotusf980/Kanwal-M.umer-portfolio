import { GraduationCap } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import type { EducationItem } from "@/types"

/**
 * Education entries rendered as cards. Placeholders until real
 * institutions and degrees are supplied.
 */
export function EducationList({ items }: { items: EducationItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal
          key={`${item.institution}-${item.degree}`}
          delay={index * 0.05}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <GraduationCap className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-base font-semibold">{item.institution}</h3>
              <p className="mt-0.5 text-sm text-foreground">
                {item.degree}
                {item.field ? ` · ${item.field}` : null}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">{item.period}</p>
              {item.summary ? (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
