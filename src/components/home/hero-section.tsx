"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { m, useReducedMotion } from "motion/react"
import { ArrowRight, ChevronDown } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { ProfileImage } from "@/components/shared/profile-image"
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
 * Homepage hero. Two-column layout on desktop — intro text on the left,
 * a medium-sized profile photo on the right. Stacks to a single column on
 * mobile with the photo centered below. The whole block renders as plain
 * markup when `prefers-reduced-motion` is set.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const animate = !prefersReducedMotion

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {animate ? <AnimatedBackground /> : null}
      {animate ? <AnimatedHero /> : <StaticHero />}
      <ScrollIndicator />
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
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-success" />
      </span>
      {siteConfig.availability}
    </span>
  )
}

function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return null
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <m.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="rounded-full border border-border bg-background/70 p-1.5 text-muted-foreground backdrop-blur"
      >
        <ChevronDown className="size-4" />
      </m.div>
    </m.div>
  )
}

function Headline() {
  return (
    <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="text-gradient">{siteConfig.name}</span>
    </h1>
  )
}

function Title() {
  return (
    <p className="mt-3 font-mono text-sm font-medium uppercase tracking-[0.12em] text-primary">
      {siteConfig.title}
    </p>
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

/** Two-column hero grid: text on the left, profile photo on the right. */
function HeroGrid({ content }: { content: React.ReactNode }) {
  return (
    <HeroShell>
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl lg:flex-1">{content}</div>
        <div className="flex justify-center lg:shrink-0 lg:pl-8">
          <ProfileImage variant="hero" priority />
        </div>
      </div>
    </HeroShell>
  )
}

function StaticHero() {
  return (
    <HeroGrid
      content={
        <>
          <p className="mb-6">
            <AvailabilityPill />
          </p>
          <Headline />
          <Title />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteConfig.tagline}
          </p>
          <CTAs />
          <div className="mt-8">
            <SocialLinks includeEmail />
          </div>
        </>
      }
    />
  )
}

function AnimatedHero() {
  return (
    <HeroShell>
      <m.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
        className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-xl lg:flex-1">
          <m.p variants={itemVariants} className="mb-6">
            <AvailabilityPill />
          </m.p>
          <m.div variants={itemVariants}>
            <Headline />
          </m.div>
          <m.div variants={itemVariants}>
            <Title />
          </m.div>
          <m.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {siteConfig.tagline}
          </m.p>
          <m.div variants={itemVariants}>
            <CTAs />
          </m.div>
          <m.div variants={itemVariants} className="mt-8">
            <SocialLinks includeEmail />
          </m.div>
        </div>
        <m.div variants={itemVariants} className="flex justify-center lg:justify-end">
          <ProfileImage variant="hero" priority />
        </m.div>
      </m.div>
    </HeroShell>
  )
}