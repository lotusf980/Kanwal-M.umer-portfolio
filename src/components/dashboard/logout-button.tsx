"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Clears the admin session cookie and returns to the login page. */
export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function onLogout() {
    startTransition(async () => {
      await fetch("/api/admin/logout", { method: "POST" })
      router.replace("/dashboard/login")
      router.refresh()
    })
  }

  return (
    <Button variant="outline" onClick={onLogout} disabled={isPending}>
      <LogOut data-icon="inline-start" />
      {isPending ? "Signing out…" : "Sign out"}
    </Button>
  )
}
