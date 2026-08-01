import { PostCard } from "@/components/blog/post-card"
import type { Blog } from "@content"

type RelatedPostsProps = {
  posts: Blog[]
}

/** Related post cards shown below an article. */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
