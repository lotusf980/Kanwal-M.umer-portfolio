type DateStyle = "short" | "long"

const options: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
}

/**
 * Format an ISO date string for display. "short" → "Aug 2, 2026",
 * "long" → "August 2, 2026".
 */
export function formatDate(iso: string, style: DateStyle = "long"): string {
  return new Date(iso).toLocaleDateString("en-US", options[style])
}
