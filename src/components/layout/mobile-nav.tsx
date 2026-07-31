"use client"

import { Menu } from "lucide-react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { SocialLinks } from "@/components/shared/social-links"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

/**
 * Mobile navigation drawer. Desktop navigation is hidden on small screens;
 * this sheet provides the same links + socials. Focus is trapped and the
 * drawer closes on `Escape` (handled by the Sheet primitive).
 */
export function MobileNav() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation menu">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 sm:w-80">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>

          <nav aria-label="Mobile" className="mt-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
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
