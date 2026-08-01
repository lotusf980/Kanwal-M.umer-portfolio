import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { Reveal } from "@/components/shared/reveal"
import { siteConfig } from "@/config/site"

/**
 * Final call-to-action on the homepage: "Let's work together".
 */
export function ContactCTA() {
  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-6 py-14 text-center shadow-xl shadow-primary/10 sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-white/20 blur-3xl motion-reduce:animate-none animate-orb-1"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 size-64 rounded-full bg-sky-200/25 blur-3xl motion-reduce:animate-none animate-orb-2"
          />
          <div className="relative">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary-foreground/80">
              {siteConfig.availability}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-primary-foreground text-balance sm:text-4xl">
              Let&apos;s build something worth shipping together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              I&apos;m always open to interesting projects, collaborations, and conversations about
              engineering. Drop me a line.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 h-11 px-6 text-primary-foreground transition-transform hover:scale-[1.02] active:scale-100"
            >
              <Link href="/contact">
                Start a conversation
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </Container>
  )
}
