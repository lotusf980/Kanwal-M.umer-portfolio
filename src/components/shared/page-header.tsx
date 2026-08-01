import { Container } from "@/components/shared/container"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

/**
 * Page-level header used at the top of content pages (projects, blog,
 * skills, about, ...). Consistent rhythm with the section heading but
 * sized for a full page intro.
 */
export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <Container className={cn("pt-14 pb-10 md:pt-20 md:pb-14", className)}>
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-brand" />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </Container>
  )
}
