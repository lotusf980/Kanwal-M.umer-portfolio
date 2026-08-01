import { Briefcase, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Reveal } from "@/components/shared/reveal"
import type { ExperienceItem } from "@/types"

/**
 * Work experience rendered as a vertical timeline.
 * Each entry is a placeholder until real experience is supplied.
 */
export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="relative space-y-10 border-l border-border pl-8 md:pl-10">
      {items.map((item, index) => (
        <Reveal key={`${item.company}-${item.role}`} delay={index * 0.05} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-[41px] flex size-7 items-center justify-center rounded-full border border-border bg-background md:-left-[49px]"
          >
            <Briefcase className="size-3.5 text-primary" />
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-lg font-semibold">{item.role}</h3>
            {item.current ? (
              <Badge variant="secondary" className="text-[0.65rem]">
                Current
              </Badge>
            ) : null}
          </div>

          <p className="mt-0.5 text-sm text-muted-foreground">
            {item.company}
            {item.location ? (
              <span className="inline-flex items-center gap-1">
                <span aria-hidden="true"> · </span>
                <MapPin className="size-3.5" aria-hidden="true" />
                {item.location}
              </span>
            ) : null}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">{item.period}</p>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

          {item.highlights.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          {item.technologies.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      ))}
    </div>
  )
}
