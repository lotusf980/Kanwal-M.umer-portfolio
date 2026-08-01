import type { Metadata } from "next"
import { Suspense } from "react"

import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { PostGrid } from "@/components/blog/post-grid"
import { PostGridSkeleton } from "@/components/blog/post-grid-skeleton"
import { JsonLd } from "@/components/seo/json-ld"
import { getAllPosts, getAllTags, getCategories } from "@/lib/content/blog"
import { itemListSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on software engineering: React, Next.js, TypeScript, performance, and the trade-offs that matter in production.",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const categories = getCategories()
  const tags = getAllTags()

  return (
    <Container>
      <JsonLd data={itemListSchema(posts, "blog")} />
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Notes on building fast, accessible software — React, Next.js, TypeScript, and the trade-offs that don't make it into the commit message."
      />
      <Suspense fallback={<PostGridSkeleton />}>
        <PostGrid posts={posts} categories={categories} tags={tags} />
      </Suspense>
    </Container>
  )
}
