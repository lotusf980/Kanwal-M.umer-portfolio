import { Mail, Rss } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa6"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type SocialLinksProps = {
  className?: string
  /** Show the email address as an additional link. */
  includeEmail?: boolean
  showRss?: boolean
}

const iconClass = "size-4"

/**
 * Row of social/profile links used in the hero, footer, and contact page.
 * Icon-only links carry accessible `aria-label`s.
 */
export function SocialLinks({ className, includeEmail = false, showRss = true }: SocialLinksProps) {
  const { github, linkedin, rss } = siteConfig.socials

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
      >
        <FaGithub className={iconClass} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
      >
        <FaLinkedin className={iconClass} />
      </a>
      {includeEmail ? (
        <a
          href={`mailto:${siteConfig.email}`}
          aria-label="Send an email"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
        >
          <Mail className={iconClass} />
        </a>
      ) : null}
      {showRss ? (
        <a
          href={rss}
          aria-label="RSS feed"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
        >
          <Rss className={iconClass} />
        </a>
      ) : null}
    </div>
  )
}
