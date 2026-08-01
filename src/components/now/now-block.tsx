import { BookOpen, Compass, GraduationCap, Hammer, Target } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { now } from "@/data/now"

/**
 * The /now page content blocks, driven by `src/data/now.ts`.
 * Each block maps to a section of the "now" snapshot.
 */
export function NowBlocks() {
  const blocks: Array<{
    id: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    description?: string
    items?: string[]
    pairs?: Array<{ topic: string; why: string }>
  }> = [
    {
      id: "learning",
      icon: GraduationCap,
      title: "Currently learning",
      pairs: now.currentlyLearning,
    },
    {
      id: "building",
      icon: Hammer,
      title: "Currently building",
      description: now.currentlyBuilding.summary,
      items: [now.currentlyBuilding.details].filter(Boolean),
    },
    {
      id: "goals",
      icon: Target,
      title: "Current goals",
      items: now.currentGoals,
    },
    {
      id: "reading",
      icon: BookOpen,
      title: "Reading",
      items: now.reading,
    },
    {
      id: "interests",
      icon: Compass,
      title: "Interests",
      items: now.interests,
    },
  ]

  return (
    <div className="grid gap-8">
      {blocks.map((block, index) => (
        <Reveal key={block.id} delay={index * 0.05}>
          <section className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                <block.icon className="size-4" aria-hidden="true" />
              </span>
              <h2 className="font-heading text-lg font-semibold">{block.title}</h2>
            </div>

            {block.description ? (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {block.description}
              </p>
            ) : null}

            {block.pairs && block.pairs.length > 0 ? (
              <div className="mt-4 space-y-3">
                {block.pairs.map((pair) => (
                  <div
                    key={pair.topic}
                    className="rounded-lg border border-border/60 bg-muted/30 p-3"
                  >
                    <p className="text-sm font-medium">{pair.topic}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {pair.why}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {block.items && block.items.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        </Reveal>
      ))}
    </div>
  )
}
