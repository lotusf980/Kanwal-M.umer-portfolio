"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { Container } from "@/components/shared/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SiteLogo } from "@/components/layout/site-logo"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { cn, isRouteActive } from "@/lib/utils"

/**
 * Sticky site header: logo, desktop navigation, theme toggle, mobile menu.
 * Gains a stronger background + shadow once the page is scrolled. The active
 * route is highlighted and marked with `aria-current="page"`.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-background/90 shadow-[0_1px_0_0_var(--border),0_8px_24px_-12px_color-mix(in_oklab,var(--foreground)_18%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
          : "border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <SiteLogo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.navLinks.map((link) => {
            const active = isRouteActive(link.href, pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-brand"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
