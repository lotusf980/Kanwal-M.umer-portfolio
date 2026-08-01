import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ExternalLink, FolderGit2 } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/shared/container"
import type { Project } from "@content"

type CaseStudyLayoutProps = {
  project: Project
  children: React.ReactNode
  related: React.ReactNode
}

/**
 * Shared layout for project case studies: hero with metadata, the prose
 * body, a sidebar with the tech stack (desktop), and CTAs.
 */
export function CaseStudyLayout({ project, children, related }: CaseStudyLayoutProps) {
  return (
    <Container className="pb-16 md:pb-24">
      <Link
        href="/projects"
        className="focus-ring mt-8 inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All projects
      </Link>

      {/* Hero */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={project.status === "completed" ? "default" : "secondary"}>
            {project.status === "completed" ? "Completed" : "In progress"}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {project.year}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            {project.category}
          </Badge>
        </div>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>

        {project.coverImage ? (
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-xl ring-1 ring-border">
            <Image
              src={project.coverImage}
              alt={`Cover for ${project.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        {/* Body */}
        <article className="prose min-w-0">{children}</article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Tech stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-1.5 lg:flex-col lg:gap-1.5">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge variant="outline" className="text-muted-foreground">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>

          <Separator className="my-6" />

          <div className="flex flex-col gap-2">
            {project.githubUrl ? (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub data-icon="inline-start" />
                  Source code
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink data-icon="inline-start" />
                  Live demo
                </a>
              </Button>
            ) : null}
          </div>

          {project.features.length > 0 ? (
            <>
              <Separator className="my-6" />
              <h3 className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                <FolderGit2 className="size-3.5" aria-hidden="true" />
                Highlights
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <ArrowUpRight
                      className="mt-0.5 size-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>
      </div>

      {related}
    </Container>
  )
}
