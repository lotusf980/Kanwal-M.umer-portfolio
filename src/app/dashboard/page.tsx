import type { Metadata } from "next"

import { GithubStats } from "@/components/dashboard/github-stats"
import { LogoutButton } from "@/components/dashboard/logout-button"
import { StatCard } from "@/components/dashboard/stat-card"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { Mail, GitBranch, Sparkles } from "lucide-react"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/content/blog"
import { getAllProjects } from "@/lib/content/projects"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Private dashboard with site and GitHub statistics.",
  robots: { index: false, follow: false },
}

export default function DashboardPage() {
  const posts = getAllPosts()
  const projects = getAllProjects()

  return (
    <Container className="pb-16 md:pb-24">
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="A private look at the site's content and public GitHub activity. Not indexed."
      >
        <div className="mt-6">
          <LogoutButton />
        </div>
      </PageHeader>

      <div className="space-y-10">
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Sparkles} label="Published posts" value={posts.length} />
            <StatCard icon={Mail} label="Projects" value={projects.length} />
            <StatCard icon={GitBranch} label="GitHub profile" value={siteConfig.socials.github} hint="cached hourly" />
            <StatCard icon={Sparkles} label="Last updated" value={siteConfig.lastUpdated} />
          </div>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold">GitHub</h2>
          <div className="mt-4">
            <GithubStats />
          </div>
        </section>
      </div>
    </Container>
  )
}
