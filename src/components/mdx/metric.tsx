type MetricProps = {
  label: string
  value: string
  detail?: string
}

/** MDX-embeddable impact metric. Usage: `<Metric label="Requests/s" value="4.2k" />`. */
export function Metric({ label, value, detail }: MetricProps) {
  return (
    <div className="my-6 rounded-lg border border-border bg-muted/40 p-4">
      <p className="font-mono text-2xl font-semibold tracking-tight text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium">{label}</p>
      {detail ? <p className="mt-1 text-xs text-muted-foreground">{detail}</p> : null}
    </div>
  )
}
