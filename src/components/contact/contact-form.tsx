"use client"

import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckCircle2, LoaderCircle, Send } from "lucide-react"

import { submitContact } from "@/actions/contact"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

/**
 * Contact form with React Hook Form + Zod validation and a Server Action
 * submit. Manages `idle → submitting → success | error` with an aria-live
 * region; success clears the form.
 */
export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  })

  function onSubmit(values: ContactFormValues) {
    setStatus("idle")
    setFormError(null)

    startTransition(async () => {
      const result = await submitContact(values)
      if (result.ok) {
        setStatus("success")
        reset()
        return
      }
      setStatus("error")
      setFormError(result.error ?? "Something went wrong. Please try again.")
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from real users, tempting to bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name ? (
              <p id="name-error" className="text-xs text-destructive" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="email-error" className="text-xs text-destructive" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="What's this about?"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            {...register("subject")}
          />
          {errors.subject ? (
            <p id="subject-error" className="text-xs text-destructive" role="alert">
              {errors.subject.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Tell me about the role, project, or idea…"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message ? (
            <p id="message-error" className="text-xs text-destructive" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        {status === "error" && formError ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {formError}
          </p>
        ) : null}

        {status === "success" ? (
          <p
            className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success"
            role="status"
          >
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Message sent — thanks for reaching out. I&apos;ll get back to you soon.
          </p>
        ) : null}

        <div aria-live="polite" className="sr-only">
          {isPending ? "Submitting message" : status === "success" ? "Message sent" : ""}
        </div>

        <div>
          <Button type="submit" disabled={isPending} className="h-11 px-5">
            {isPending ? (
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
            ) : (
              <Send data-icon="inline-start" />
            )}
            {isPending ? "Sending…" : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  )
}
