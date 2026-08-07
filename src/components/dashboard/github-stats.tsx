import Link from "next/link"
import { FolderGit2, GitFork, Star } from "lucide-react"

import { getGithubStats } from "@/lib/github"
import { StatCard } from "@/components/dashboard/stat-card"

/**
 * GitHub statistics widget (Server Component). Reads the cached stats from
 * `lib/github.ts` — built at build time, refreshed on the ISR interval.
 * Degrades to a friendly note if GitHub is unavailable or unconfigured.
 */
export async function GithubStats() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME
  if (!username) {
    return <Unconfigured />
  }

  const stats = await getGithubStats(username)
  if (!stats) return <Unavailable username={username} />

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FolderGit2} label="Public repos" value={stats.publicRepos} />
        <StatCard icon={Star} label="Total stars" value={stats.totalStars} />
        <StatCard icon={FolderGit2} label="Followers" value={stats.followers} />
        <StatCard icon={GitFork} label="Following" value={stats.following} />
      </div>

      {stats.topLanguages.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Top languages
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stats.topLanguages.map((lang) => (
              <li
                key={lang}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium"
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {stats.recentRepos.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            Latest repositories
          </p>
          <ul className="mt-3 divide-y divide-border">
            {stats.recentRepos.map((repo) => (
              <li key={repo.name} className="py-3">
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
                >
                  <FolderGit2 className="size-4 text-primary" aria-hidden="true" />
                  {repo.name}
                </Link>
                {repo.description ? (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {repo.description}
                  </p>
                ) : null}
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  {repo.language ? <span>{repo.language}</span> : null}
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3" aria-hidden="true" />
                    {repo.stars}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" aria-hidden="true" />
                    {repo.forks}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function Unconfigured() {
  return (
    <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
      Set <code className="font-mono text-foreground">NEXT_PUBLIC_GITHUB_USERNAME</code> and{" "}
      <code className="font-mono text-foreground">GITHUB_TOKEN</code> to show GitHub statistics.
    </p>
  )
}

function Unavailable({ username }: { username: string }) {
  return (
    <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
      GitHub stats for <span className="font-mono text-foreground">{username}</span> are temporarily
      unavailable. Check that the username is correct and the token is valid.
    </p>
  )
}
