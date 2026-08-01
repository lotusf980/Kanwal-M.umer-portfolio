"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type TocItem = {
  id: string
  text: string
  level: number
}

type TableOfContentsProps = {
  items: TocItem[]
}

/**
 * Scroll-spy table of contents. Tracks the heading currently in view via
 * IntersectionObserver and highlights it in the sidebar. Falls back to
 * inert list if the observer is unavailable.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) return
    if (typeof IntersectionObserver === "undefined") return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading that just entered the viewport.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                item.level === 3 ? "pl-6" : "pl-4",
                activeId === item.id
                  ? "border-primary font-medium text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
