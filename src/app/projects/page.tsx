import type { Metadata } from "next"
import { Suspense } from "react"

import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { ProjectExplorer } from "@/components/projects/project-explorer"
import { ProjectGridSkeleton } from "@/components/projects/project-grid-skeleton"
import {
  getAllProjects,
  getProjectCategories,
  getProjectTechnologies,
} from "@/lib/content/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of projects I've designed and built, with detailed case studies covering the problem, trade-offs, and outcomes.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const categories = getProjectCategories()
  const technologies = getProjectTechnologies()

  return (
    <Container>
      <PageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="A selection of work I've designed and built. Each case study covers the problem, the trade-offs, and what I'd do differently."
      />
      <div className="pb-16 md:pb-24">
        <Suspense fallback={<ProjectGridSkeleton />}>
          <ProjectExplorer
            projects={projects}
            categories={categories}
            technologies={technologies}
          />
        </Suspense>
      </div>
    </Container>
  )
}
