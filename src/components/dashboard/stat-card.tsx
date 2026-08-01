import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string | number
  hint?: string
  className?: string
}

/** Dashboard stat tile: icon, label, value, optional hint. */
export function StatCard({ icon: Icon, label, value, hint, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </p>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
