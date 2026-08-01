import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CaseStudyLayout } from "@/components/projects/case-study-layout"
import { MdxContent } from "@/components/mdx/mdx-content"
import { RelatedProjects } from "@/components/projects/related-projects"
import { SectionHeading } from "@/components/shared/section-heading"
import { getProjectBySlug, getAllProjects, getRelatedProjects } from "@/lib/content/projects"
import { siteConfig } from "@/config/site"
import type { Project } from "@content"

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const url = `${siteConfig.url}/projects/${project.slug}`
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "article",
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
    alternates: { canonical: url },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = getRelatedProjects(slug, 2)

  return (
    <CaseStudyLayout project={project} related={<RelatedProjects projects={related} />}>
      {/* Frontmatter-driven narrative sections, in a stable order. */}
      <CaseStudySections project={project} />

      <SectionHeading eyebrow="Deep dive" title="The full story" className="mt-14" />
      <MdxContent code={project.content} />
    </CaseStudyLayout>
  )
}

function CaseStudySections({ project }: { project: Project }) {
  const sections: Array<{
    title: string
    body?: string
    items?: string[]
    decisions?: Array<{ decision: string; tradeoff: string }>
  }> = []
  const push = (title: string, body?: string, items?: string[]) => {
    if (body || (items && items.length > 0)) sections.push({ title, body, items })
  }

  push("Problem", project.problem)
  push("Goal", project.goal)
  push("Solution", project.solution)
  push("Architecture", project.architecture)
  push("Challenges", undefined, project.challenges)
  if (project.decisions && project.decisions.length > 0) {
    sections.push({ title: "Decisions & trade-offs", decisions: project.decisions })
  }
  push("Results", undefined, project.results)
  push("Lessons learned", undefined, project.lessons)

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-heading text-xl font-semibold tracking-tight">{section.title}</h2>
          {section.body ? (
            <p className="mt-2 leading-relaxed text-muted-foreground">{section.body}</p>
          ) : null}
          {section.items ? (
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.decisions ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.decisions.map((decision, index) => (
                <div key={index} className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium">{decision.decision}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{decision.tradeoff}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
