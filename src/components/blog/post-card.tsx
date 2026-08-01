import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Blog } from "@content"

type PostCardProps = {
  post: Blog
  className?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Blog post card: title, excerpt, category, date and reading time.
 * The whole card links to the article.
 */
export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card className={cn("group flex h-full flex-col", className)}>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-muted-foreground">
            {post.category}
          </Badge>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <CardTitle className="leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="focus-ring rounded outline-none transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            Read
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
