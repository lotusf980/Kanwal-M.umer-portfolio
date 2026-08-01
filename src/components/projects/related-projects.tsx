import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@content"

type RelatedProjectsProps = {
  projects: Project[]
}

/**
 * Related projects at the bottom of a case study, driven by the `related`
 * frontmatter field. Hidden entirely when there are none.
 */
export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <Section className="mt-8">
      <SectionHeading eyebrow="Continue exploring" title="Related projects" />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
