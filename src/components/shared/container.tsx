import { cn } from "@/lib/utils"

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

/**
 * Max-width layout wrapper with consistent responsive padding.
 * Used on every page section to keep horizontal rhythm identical.
 */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  )
}
