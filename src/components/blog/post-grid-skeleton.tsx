import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading skeleton for the blog index while the client filter state
 * hydrates inside the Suspense boundary.
 */
export function PostGridSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="flex flex-wrap gap-1.5 pb-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-20 rounded-full" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 md:pb-24">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
