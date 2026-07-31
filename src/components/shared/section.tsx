import { cn } from "@/lib/utils"
import { Container } from "@/components/shared/container"

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Renders the section inside the site-wide max-width container. */
  contained?: boolean
}

/**
 * Vertical rhythm wrapper for page sections.
 * Defaults to the site container; set `contained={false}` for full-bleed
 * sections (e.g. hero with animated background).
 */
export function Section({ className, contained = true, ...props }: SectionProps) {
  const inner = <div className={cn("py-16 md:py-24", className)} {...props} />

  if (!contained) return inner
  return <Container>{inner}</Container>
}
