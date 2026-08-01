import type { ExperienceItem } from "@/types"

/**
 * Work experience.
 *
 * ⚠️ PLACEHOLDERS ONLY. Every entry here must be replaced with your real
 * experience before deploying publicly. Do NOT fabricate companies, roles,
 * or achievements. If you have no formal experience yet, start with one
 * truthful entry and add more as you grow.
 */
export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Your Company",
    period: "Jan 2026 — Present",
    location: "Remote",
    summary:
      "Replace this with a truthful summary of your responsibilities. Focus on scope, ownership, and the problems you solved.",
    highlights: [
      "Replace this with a specific, measurable achievement.",
      "Replace this with another concrete contribution.",
    ],
    technologies: ["TypeScript", "React", "Next.js", "PostgreSQL"],
    current: true,
  },
]

/** Placeholder for an empty-state when no experience is configured. */
export const hasExperience = experience.length > 0
