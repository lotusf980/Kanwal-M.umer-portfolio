import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { skillCategories } from "@/data/skills"

/**
 * Compact skills preview. Shows the top skills from the highest-count
 * categories with their official brand icons; the full catalogue lives
 * on /skills.
 */
export function SkillsPreview() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Toolbox"
          title="Technologies I work with"
          description="The languages, frameworks and tools I reach for day to day. Head to the skills page for the full picture with honest proficiency levels."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.slice(0, 3).map((category, categoryIndex) => (
          <Reveal
            key={category.label}
            delay={categoryIndex * 0.08}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-heading text-lg font-medium">{category.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {category.skills.slice(0, 6).map((skill) => (
                <li
                  key={skill.name}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <Button asChild variant="outline" className="h-11 px-5">
          <Link href="/skills">
            Explore all skills
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>
    </Section>
  )
}
