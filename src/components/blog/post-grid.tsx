"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Inbox } from "lucide-react"

import { PostCard } from "@/components/blog/post-card"
import { cn } from "@/lib/utils"
import type { Blog } from "@content"

type PostGridProps = {
  posts: Blog[]
  categories: string[]
  tags: Array<{ name: string; count: number }>
}

/**
 * Client blog index: category/tag filtering with URL sync. Wrapped in a
 * Suspense boundary so the page can remain statically prerendered.
 */
export function PostGrid({ posts, categories, tags }: PostGridProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")

  const filtered = posts.filter((post) => {
    if (category && post.category !== category) return false
    if (tag && !post.tags.includes(tag)) return false
    return true
  })

  const activeFilter = category ? `category-${category}` : tag ? `tag-${tag}` : null

  return (
    <>
      <div className="flex flex-wrap gap-1.5 pb-8">
        <FilterChip label="All" href="/blog" active={!activeFilter} />
        {categories.map((item) => (
          <FilterChip
            key={item}
            label={item}
            href={`/blog?category=${encodeURIComponent(item)}`}
            active={activeFilter === `category-${item}`}
          />
        ))}
        {tags.map(({ name }) => (
          <FilterChip
            key={name}
            label={`#${name}`}
            href={`/blog?tag=${encodeURIComponent(name)}`}
            active={activeFilter === `tag-${name}`}
          />
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 pb-16 md:grid-cols-2 md:pb-24">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 pb-24 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Inbox className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-heading text-lg font-medium">No posts in this category yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon, or browse the full archive.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all posts
          </Link>
        </div>
      )}
    </>
  )
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  )
}
