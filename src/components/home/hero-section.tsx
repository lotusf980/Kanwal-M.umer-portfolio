"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { SocialLinks } from "@/components/shared/social-links"

// Lazy client island: hero text paints before the animated background mounts.
const AnimatedBackground = dynamic(
  () => import("./animated-background").then((module) => module.AnimatedBackground),
  { ssr: false }
)

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

/**
 * Homepage hero. Headline uses a staggered blur/fade-up; the whole block
 * renders as plain markup when `prefers-reduced-motion` is set.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {animate ? <AnimatedBackground /> : null}
      {animate ? <AnimatedHero /> : <StaticHero />}
    </section>
  )
}

function HeroShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">{children}</div>
  )
}

function AvailabilityPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
      <span className="size-2 rounded-full bg-success" aria-hidden="true" />
      {siteConfig.availability}
    </span>
  )
}

function Headline() {
  const [firstWord, ...rest] = siteConfig.headline.split(" ")
  return (
    <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
      {firstWord} <span className="text-gradient">{rest.join(" ")}</span>
    </h1>
  )
}

function CTAs() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Button asChild size="lg" className="h-11 px-5">
        <Link href="/projects">
          View Projects
          <ArrowRight data-icon="inline-end" />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="h-11 px-5">
        <Link href="/contact">Contact Me</Link>
      </Button>
    </div>
  )
}

function StaticHero() {
  return (
    <HeroShell>
      <p className="mb-6">
        <AvailabilityPill />
      </p>
      <Headline />
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {siteConfig.tagline}
      </p>
      <CTAs />
      <div className="mt-8">
        <SocialLinks includeEmail />
      </div>
    </HeroShell>
  )
}

function AnimatedHero() {
  return (
    <HeroShell>
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      >
        <motion.p variants={itemVariants} className="mb-6">
          <AvailabilityPill />
        </motion.p>
        <motion.div variants={itemVariants}>
          <Headline />
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {siteConfig.tagline}
        </motion.p>
        <motion.div variants={itemVariants}>
          <CTAs />
        </motion.div>
        <motion.div variants={itemVariants} className="mt-8">
          <SocialLinks includeEmail />
        </motion.div>
      </motion.div>
    </HeroShell>
  )
}
