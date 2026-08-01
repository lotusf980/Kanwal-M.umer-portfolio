import { unstable_cache } from "next/cache"
import { z } from "zod"

/**
 * Server-only GitHub client. Never imported from client components.
 *
 * Reads public data with the `GITHUB_TOKEN` (5000 req/hr) and wraps every
 * call in `unstable_cache` so public pages hit GitHub at build time only.
 * All responses are schema-validated and fail soft — a rate limit or
 * changed API shape can't take down the site.
 */

const githubBase = "https://api.github.com"

const userSchema = z.object({
  login: z.string(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
})

const repoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  fork: z.boolean(),
  created_at: z.string(),
})

const langSchema = z.record(z.string(), z.number())

export type GithubUser = z.infer<typeof userSchema>
export type GithubRepo = z.infer<typeof repoSchema>

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
}
const token = process.env.GITHUB_TOKEN
if (token) headers.Authorization = `Bearer ${token}`

async function githubFetch<T>(path: string, schema: z.ZodType<T>): Promise<T | null> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)
  try {
    const res = await fetch(`${githubBase}${path}`, {
      headers,
      next: { revalidate: 3600 },
      signal: controller.signal,
    })
    if (!res.ok) {
      // 403/429 = rate limited, 404 = not found — degrade silently.
      if (res.status === 403 || res.status === 429 || res.status === 404) return null
      return null
    }
    const json: unknown = await res.json()
    return schema.parse(json)
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchUser(username: string): Promise<GithubUser | null> {
  return githubFetch(`/users/${username}`, userSchema)
}

async function fetchRepos(username: string): Promise<GithubRepo[]> {
  const parsed = await githubFetch(
    `/users/${username}/repos?per_page=100&sort=created`,
    z.array(repoSchema)
  )
  return parsed ?? []
}

async function fetchTopLanguages(username: string, repos: GithubRepo[]): Promise<string[]> {
  const counted = new Map<string, number>()
  for (const repo of repos.slice(0, 10)) {
    const langs = await githubFetch(`/repos/${username}/${repo.name}/languages`, langSchema)
    if (!langs) continue
    for (const [lang, bytes] of Object.entries(langs)) {
      counted.set(lang, (counted.get(lang) ?? 0) + bytes)
    }
  }
  return Array.from(counted.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([lang]) => lang)
}

/** Aggregated, cached GitHub profile data used by the dashboard and home. */
export const getGithubStats = unstable_cache(
  async (username: string) => {
    const user = await fetchUser(username)
    if (!user) return null

    const repos = await fetchRepos(username)
    const ownRepos = repos.filter((repo) => !repo.fork)
    const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const topLanguages = await fetchTopLanguages(username, ownRepos)

    return {
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
      recentRepos: ownRepos.slice(0, 5).map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      })),
    }
  },
  ["github-stats"],
  { revalidate: 3600 }
)
