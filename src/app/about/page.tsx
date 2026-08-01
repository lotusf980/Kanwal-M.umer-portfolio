import type { Metadata } from "next"

import { CertificationsList } from "@/components/about/certifications-list"
import { EducationList } from "@/components/about/education-list"
import { ExperienceList } from "@/components/about/experience-list"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { certifications } from "@/data/certifications"
import { education } from "@/data/education"
import { experience } from "@/data/experience"
import { profile } from "@/data/profile"

export const metadata: Metadata = {
  title: "About",
  description:
    "Who I am, how I work, and the journey that got me here — background, experience, education, and goals.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About me"
        description={profile.bio}
      >
        {profile.openTo.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.openTo.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </PageHeader>

      <Container className="pb-16 md:pb-24">
        <div className="space-y-16">
          <section>
            <SectionHeading
              eyebrow="Story"
              title="The longer version"
              description="A bit more about my background, what I enjoy, and how I approach the work."
            />
            <Reveal className="mt-6 max-w-3xl">
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {profile.about.split("\n").filter(Boolean).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </section>

          <section>
            <SectionHeading
              eyebrow="Experience"
              title="Where I've worked"
              description="A timeline of the roles I've held, with the scope and problems I owned."
            />
            <div className="mt-8">
              <ExperienceList items={experience} />
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Education" title="Where I studied" />
            <div className="mt-8">
              <EducationList items={education} />
            </div>
          </section>

          {certifications.length > 0 ? (
            <section>
              <SectionHeading eyebrow="Credentials" title="Certifications" />
              <div className="mt-8">
                <CertificationsList items={certifications} />
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </>
  )
}
