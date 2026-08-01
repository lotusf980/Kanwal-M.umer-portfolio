import { AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react"

import { cn } from "@/lib/utils"

type CalloutProps = {
  title?: string
  variant?: "info" | "warning" | "success" | "tip"
  children: React.ReactNode
}

const styles = {
  info: {
    border: "border-accent/40",
    background: "bg-accent/10",
    icon: Info,
    label: "bg-accent/15 text-accent",
    defaultTitle: "Note",
  },
  warning: {
    border: "border-warning/40",
    background: "bg-warning/10",
    icon: TriangleAlert,
    label: "bg-warning/15 text-warning",
    defaultTitle: "Heads up",
  },
  success: {
    border: "border-success/40",
    background: "bg-success/10",
    icon: AlertCircle,
    label: "bg-success/15 text-success",
    defaultTitle: "Result",
  },
  tip: {
    border: "border-primary/40",
    background: "bg-primary/10",
    icon: Lightbulb,
    label: "bg-primary/15 text-primary",
    defaultTitle: "Tip",
  },
}

/** MDX-embeddable callout box. Usage: `<Callout variant="info">…</Callout>`. */
export function Callout({ title, variant = "info", children }: CalloutProps) {
  const { border, background, icon: Icon, label, defaultTitle } = styles[variant]

  return (
    <aside className={cn("my-6 rounded-lg border p-4", border, background)}>
      <p
        className={cn(
          "mb-2 inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-xs font-medium",
          label
        )}
      >
        <Icon className="size-3.5" aria-hidden="true" />
        {title ?? defaultTitle}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  )
}
