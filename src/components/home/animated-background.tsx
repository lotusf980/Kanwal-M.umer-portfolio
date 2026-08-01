"use client"

/**
 * Decorative animated background for the hero.
 *
 * Pure CSS keyframe animation on `transform`/`opacity` only — no JS running
 * on every frame. Loaded as a lazy client island (`next/dynamic`, ssr:false)
 * so the hero text paints before the effect mounts.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="animate-orb-1 absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="animate-orb-2 absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl" />
      <div className="animate-orb-3 absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
    </div>
  )
}
