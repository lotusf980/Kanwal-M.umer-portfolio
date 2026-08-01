import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading skeleton for the projects explorer while the client filter state
 * hydrates inside the Suspense boundary.
 */
export function ProjectGridSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-xl border border-border bg-card p-0">
            <Skeleton className="aspect-[16/9] w-full rounded-t-xl" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
