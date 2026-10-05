import type { Metadata } from "next"

import { CertificationsList } from "@/components/about/certifications-list"
import { EducationList } from "@/components/about/education-list"
import { ExperienceList } from "@/components/about/experience-list"
import { ResumeDownload } from "@/components/resume/resume-download"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { certifications } from "@/data/certifications"
import { education } from "@/data/education"
import { experience } from "@/data/experience"
import { profile } from "@/data/profile"
import { skillCategories } from "@/data/skills"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "A condensed, printable version of my experience and skills, plus a downloadable PDF.",
}

export default function ResumePage() {
  const topSkills = skillCategories.flatMap((category) => category.skills).slice(0, 12)

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        description="A condensed look at my experience, education, and skills. Grab the PDF for the full picture."
      >
        <div className="mt-6">
          <ResumeDownload />
        </div>
      </PageHeader>

      <Container className="pb-16 md:pb-24">
        <div className="space-y-16">
          <section>
            <SectionHeading eyebrow="Summary" title="Who I am" />
            <Reveal className="mt-6 max-w-3xl">
              <p className="text-base leading-relaxed text-muted-foreground">{profile.bio}</p>
            </Reveal>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResumeFact label="Location" value={siteConfig.location} />
              <ResumeFact label="Email" value={siteConfig.email} />
              <ResumeFact label="Phone" value={siteConfig.phone} />
              <ResumeFact label="Focus" value={profile.currentFocus} />
            </dl>
          </section>

          <section>
            <SectionHeading
              eyebrow="Skills"
              title="Core technologies"
              description="The tools I reach for day to day, from my skills catalogue."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Experience" title="Work history" />
            <div className="mt-8">
              <ExperienceList items={experience} />
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Education" title="Education" />
            <div className="mt-8">
              <EducationList items={education} />
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Languages" title="Languages" />
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <span
                  key={language.name}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {language.name} · {language.level}
                </span>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="Credentials" title="Certifications" />
            <div className="mt-8">
              <CertificationsList items={certifications} />
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}

function ResumeFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium" title={value}>
        {value}
      </dd>
    </div>
  )
}
