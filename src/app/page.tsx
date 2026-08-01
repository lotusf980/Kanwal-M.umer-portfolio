import { HeroSection } from "@/components/home/hero-section"
import { QuickFacts } from "@/components/home/quick-facts"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { SkillsPreview } from "@/components/home/skills-preview"
import { ContactCTA } from "@/components/home/contact-cta"
import { JsonLd } from "@/components/seo/json-ld"
import { personSchema, websiteSchema } from "@/lib/structured-data"

export default function HomePage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <HeroSection />
      <QuickFacts />
      <FeaturedProjects />
      <SkillsPreview />
      <ContactCTA />
    </>
  )
}
