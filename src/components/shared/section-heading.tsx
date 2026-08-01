import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  /** Small uppercase label rendered in the mono font. */
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

/**
 * Consistent section heading: mono eyebrow + display title + optional
 * supporting paragraph. Used across all pages for visual rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-brand" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
