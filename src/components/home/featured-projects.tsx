import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"
import { ProjectCard } from "@/components/shared/project-card"
import { getFeaturedProjects } from "@/lib/content/projects"

/**
 * Featured projects on the homepage. Projects marked `featured: true` in
 * their MDX frontmatter appear here, newest first.
 */
export function FeaturedProjects() {
  const projects = getFeaturedProjects(3)

  if (projects.length === 0) return null

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I'm proud of"
          description="A few things I've designed and built. Every case study covers the problem, the trade-offs, and what I'd do differently."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <Button asChild variant="outline" className="h-11 px-5">
          <Link href="/projects">
            View all projects
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>
    </Section>
  )
}
