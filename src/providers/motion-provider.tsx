"use client"

import { LazyMotion, MotionConfig, domAnimation } from "motion/react"

/**
 * Global motion configuration.
 *
 * `LazyMotion` + `domAnimation` loads only the animation features actually
 * used (animate, whileInView, variants) instead of the full Framer Motion
 * runtime — a meaningful reduction in client JS. `reducedMotion="user"`
 * makes animations respect the visitor's `prefers-reduced-motion` setting.
 *
 * Note: components using `m.*` must live inside this provider; that is the
 * case for the whole app because the provider wraps the root layout.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
