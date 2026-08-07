"use client"

import {
  BookOpen,
  Clock,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Menu,
  User,
  Wrench,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { SocialLinks } from "@/components/shared/social-links"
import { SiteLogo } from "@/components/layout/site-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn, isRouteActive } from "@/lib/utils"

const navIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "/": Home,
  "/projects": FolderGit2,
  "/blog": BookOpen,
  "/skills": Wrench,
  "/about": User,
  "/resume": FileText,
  "/now": Clock,
  "/contact": Mail,
}

/**
 * Mobile navigation drawer. Desktop navigation is hidden on small screens;
 * this sheet provides the same links (with active states) + socials. Focus
 * is trapped and the drawer closes on `Escape` (handled by the Sheet
 * primitive).
 */
export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          <div className="border-b border-border pb-4">
            <SiteLogo />
          </div>

          <nav aria-label="Mobile" className="mt-4">
            <ul className="flex flex-col gap-0.5">
              {siteConfig.navLinks.map((link) => {
                const Icon = navIcons[link.href] ?? Home
                const active = isRouteActive(link.href, pathname)
                return (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon
                          className={cn("size-4", active ? "text-primary" : "text-muted-foreground")}
                          aria-hidden="true"
                        />
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <SocialLinks />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
