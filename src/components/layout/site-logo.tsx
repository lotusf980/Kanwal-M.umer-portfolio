import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/**
 * Brand mark: gradient monogram + site name.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight",
        className
      )}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-lg bg-gradient-brand text-sm font-bold text-white shadow-sm"
      >
        {initials(siteConfig.name)}
      </span>
      <span className="transition-colors group-hover:text-primary">{siteConfig.name}</span>
    </Link>
  )
}
