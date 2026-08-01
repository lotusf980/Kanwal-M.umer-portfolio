"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LoaderCircle, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * Token login for the private dashboard. Submits to /api/admin/login and
 * redirects back to the requested page on success.
 */
export function AdminLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const from = searchParams.get("from") ?? "/dashboard"

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      const data = (await res.json()) as { ok: boolean; error?: string }
      if (data.ok) {
        router.replace(from)
        router.refresh()
      } else {
        setError(data.error ?? "Login failed.")
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="token">Admin token</Label>
        <Input
          id="token"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your ADMIN_TOKEN"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "token-error" : undefined}
        />
        {error ? (
          <p id="token-error" className="text-xs text-destructive" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isPending || !token} className="h-10">
        {isPending ? (
          <LoaderCircle className="animate-spin" data-icon="inline-start" />
        ) : (
          <Lock data-icon="inline-start" />
        )}
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
