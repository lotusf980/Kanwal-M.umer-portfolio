import { z } from "zod"

/**
 * Client + server shared validation for the contact form.
 * The server re-validates with the same schema — never trust the client.
 *
 * `website` is a honeypot: real users never see it, bots tend to fill it.
 * When populated the form is silently rejected.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  website: z.string().max(100).optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type ContactFormResult =
  | { ok: true }
  | { ok: false; error: string }
  | { ok: false; fieldErrors?: Record<string, string[]>; error?: string }
