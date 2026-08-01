import type { Metadata } from "next"
import type { IconType } from "react-icons"

import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/shared/reveal"
import { Badge } from "@/components/ui/badge"
import { skillCategories } from "@/data/skills"
import { getSkillIcon } from "@/lib/skill-icons"
import { cn } from "@/lib/utils"
import type { Skill, SkillLevel } from "@/types"

export const metadata: Metadata = {
  title: "Skills",
  description: "The languages, frameworks and tools I work with, with honest proficiency levels.",
}

const levelOrder: Record<SkillLevel, number> = { learning: 0, comfortable: 1, advanced: 2 }

const levelStyles: Record<SkillLevel, string> = {
  advanced: "bg-success/15 text-success",
  comfortable: "bg-accent/15 text-accent",
  learning: "bg-warning/15 text-warning",
}

const levelLabels: Record<SkillLevel, string> = {
  advanced: "Advanced",
  comfortable: "Comfortable",
  learning: "Learning",
}

export default function SkillsPage() {
  return (
    <Container className="pb-16 md:pb-24">
      <PageHeader
        eyebrow="Toolbox"
        title="Skills"
        description="The technologies I use day to day, with honest self-assessed proficiency. 'Learning' is a deliberate signal — it means actively studying, not a claim of mastery."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, categoryIndex) => (
          <Reveal key={category.label} delay={categoryIndex * 0.05}>
            <section className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <h2 className="font-heading text-lg font-medium">{category.label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <SkillRow key={skill.name} skill={skill} />
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}

function SkillRow({ skill }: { skill: Skill }) {
  const Icon = getSkillIcon(skill.iconKey)
  return (
    <li className="group flex items-center gap-3 rounded-lg px-1.5 py-1 -mx-1.5 transition-colors hover:bg-muted/50">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <SkillIcon icon={Icon} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium">{skill.name}</p>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-[0.65rem]", levelStyles[skill.level])}
          >
            {levelLabels[skill.level]}
          </Badge>
        </div>
        <LevelBar level={skill.level} />
        {skill.note ? (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{skill.note}</p>
        ) : null}
      </div>
    </li>
  )
}

function SkillIcon({
  icon,
}: {
  icon: IconType | React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  const Tag = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>
  return <Tag className="size-4" aria-hidden="true" />
}

function LevelBar({ level }: { level: SkillLevel }) {
  const segments = [1, 2, 3]
  const active = levelOrder[level]
  return (
    <div className="mt-1.5 flex gap-1" aria-hidden="true">
      {segments.map((segment) => (
        <span
          key={segment}
          className={cn("h-1 flex-1 rounded-full", segment <= active ? "bg-primary" : "bg-border")}
        />
      ))}
    </div>
  )
}
