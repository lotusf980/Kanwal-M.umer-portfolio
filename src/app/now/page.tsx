import type { Metadata } from "next"

import { NowBlocks } from "@/components/now/now-block"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { now } from "@/data/now"

export const metadata: Metadata = {
  title: "Now",
  description:
    "A living snapshot of what I'm currently learning, building, and working toward — inspired by the nownownow.com movement.",
}

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I'm up to now"
        description="A living snapshot — not a bio. This page reflects where my attention is today, and it gets updated as things change."
      >
        <p className="mt-6 flex items-center gap-2">
          <Badge variant="outline" className="text-[0.65rem]">
            Last updated {now.updatedAt}
          </Badge>
        </p>
      </PageHeader>

      <Container className="pb-16 md:pb-24">
        <div className="max-w-3xl">
          <NowBlocks />
        </div>
      </Container>
    </>
  )
}
