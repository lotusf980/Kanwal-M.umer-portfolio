"use client"

import { m, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in seconds before the reveal starts. */
  delay?: number
  /** Direction the element animates from. */
  from?: "up" | "down" | "left" | "right" | "none"
  /** Animation duration in seconds. */
  duration?: number
}

const offsets: Record<NonNullable<RevealProps["from"]>, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fade/slide-in on scroll, respecting the user's reduced-motion preference.
 * Animates only `opacity` and `transform` and fires once.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  duration = 0.6,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const offset = offsets[from]

  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
