import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Project } from "@content"

type ProjectCardProps = {
  project: Project
  className?: string
  /** Priority hint for the cover image loader. */
  priority?: boolean
}

/**
 * Data-driven project card: title, summary, tech stack, status and links.
 * The cover and title link to the case study; GitHub/live links sit in the
 * footer as separate, non-nested interactive elements.
 */
export function ProjectCard({ project, className, priority = false }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary/40",
        className
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="focus-ring block rounded-t-xl outline-none"
        aria-label={`${project.title} case study`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`Cover for ${project.title}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
        </div>
      </Link>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>
            <Link
              href={`/projects/${project.slug}`}
              className="focus-ring rounded outline-none hover:text-primary"
            >
              {project.title}
            </Link>
          </CardTitle>
          <Badge variant={project.status === "completed" ? "default" : "secondary"}>
            {project.status === "completed" ? "Completed" : "In progress"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-2 text-muted-foreground">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline" className="text-muted-foreground">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t pt-3 text-xs text-muted-foreground">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="focus-ring inline-flex items-center gap-1.5 rounded p-1 hover:text-foreground"
            >
              <FaGithub className="size-4" />
              Code
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="focus-ring inline-flex items-center gap-1.5 rounded p-1 hover:text-foreground"
            >
              <ExternalLink className="size-4" />
              Live
            </a>
          ) : null}
          <Link
            href={`/projects/${project.slug}`}
            className="focus-ring ml-auto inline-flex items-center gap-1 rounded p-1 font-medium text-primary"
          >
            Case study
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
