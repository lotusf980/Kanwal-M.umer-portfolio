import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/shared/container"
import { MdxContent } from "@/components/mdx/mdx-content"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { RelatedPosts } from "@/components/blog/related-posts"
import { Section } from "@/components/shared/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/content/blog"
import { siteConfig } from "@/config/site"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `${siteConfig.url}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [siteConfig.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    alternates: { canonical: url },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 2)

  return (
    <>
      <Container className="pb-16 md:pb-24">
        <Link
          href="/blog"
          className="focus-ring mt-8 inline-flex items-center gap-1.5 rounded text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All articles
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-muted-foreground">
              {post.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2 border-y border-border py-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" aria-hidden="true" />
              {siteConfig.author}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="prose min-w-0">
            {post.coverImage ? <PostCover post={post} /> : null}
            <MdxContent code={post.content} />
          </article>
          <TableOfContents items={post.headings} />
        </div>
      </Container>

      {related.length > 0 ? (
        <Section>
          <SectionHeading eyebrow="Keep reading" title="Related articles" />
          <RelatedPosts posts={related} />
        </Section>
      ) : null}
    </>
  )
}

function PostCover({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  return (
    <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-xl ring-1 ring-border">
      <Image
        src={post.coverImage!}
        alt={`Cover for ${post.title}`}
        fill
        priority
        sizes="(min-width: 1280px) 48rem, 100vw"
        className="object-cover"
      />
    </div>
  )
}
