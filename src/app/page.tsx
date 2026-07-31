import { siteConfig } from "@/config/site"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"

export default function HomePage() {
  return (
    <Container className="py-16 md:py-24">
      <SectionHeading
        eyebrow="Homepage"
        title={siteConfig.headline}
        description="The homepage is implemented in Phase 3."
      />
    </Container>
  )
}
