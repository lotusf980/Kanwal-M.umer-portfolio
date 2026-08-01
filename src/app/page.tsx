import { HeroSection } from "@/components/home/hero-section"
import { QuickFacts } from "@/components/home/quick-facts"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { SkillsPreview } from "@/components/home/skills-preview"
import { ContactCTA } from "@/components/home/contact-cta"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickFacts />
      <FeaturedProjects />
      <SkillsPreview />
      <ContactCTA />
    </>
  )
}
