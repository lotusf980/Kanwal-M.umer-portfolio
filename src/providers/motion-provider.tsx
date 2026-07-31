"use client"

import { MotionConfig } from "motion/react"

/**
 * Global motion configuration.
 *
 * `reducedMotion="user"` makes Framer Motion respect the visitor's
 * `prefers-reduced-motion` setting automatically, so animated content
 * stays accessible without per-component work.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
