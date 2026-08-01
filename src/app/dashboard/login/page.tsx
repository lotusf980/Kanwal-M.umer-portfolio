import type { Metadata } from "next"
import { Suspense } from "react"

import { AdminLogin } from "@/components/dashboard/admin-login"
import { Container } from "@/components/shared/container"
import { PageHeader } from "@/components/shared/page-header"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Private dashboard.",
  robots: { index: false, follow: false },
}

export default function DashboardLoginPage() {
  return (
    <Container className="pb-16 md:pb-24">
      <div className="mx-auto max-w-sm">
        <PageHeader
          eyebrow="Dashboard"
          title="Sign in"
          description="This area is private. Enter the admin token to continue."
        />
        <div className="rounded-xl border border-border bg-card p-6">
          <Suspense>
            <AdminLogin />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}
