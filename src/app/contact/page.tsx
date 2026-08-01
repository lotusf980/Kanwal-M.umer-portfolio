import type { Metadata } from "next"

import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about a role, a project, or a collaboration. I reply to every thoughtful message.",
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Whether it's a role, a project, or an idea worth exploring — send a message and I'll get back to you."
      />

      <Container className="pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </Container>
    </>
  )
}
