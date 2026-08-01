/**
 * Shared domain types for the portfolio data layer.
 *
 * These contracts are consumed by the skills, experience, education and
 * certification datasets as well as the UI components that render them.
 */

export type SkillLevel = "learning" | "comfortable" | "advanced"

export interface Skill {
  /** Stable key used to look up an icon in `src/lib/skill-icons.ts`. */
  iconKey: string
  name: string
  /** Honest, self-assessed level. No fabricated years of experience. */
  level: SkillLevel
  /** Optional years. Omit rather than invent a number. */
  years?: number
  /** Optional note shown in the UI (e.g. "currently exploring"). */
  note?: string
}

export interface SkillCategory {
  label: string
  description: string
  skills: Skill[]
}

export interface ExperienceItem {
  role: string
  company: string
  /** Free-form, e.g. "Jan 2025 — Present". Avoid invented precision. */
  period: string
  location?: string
  summary: string
  highlights: string[]
  technologies: string[]
  /** Set to true when this is the current/active role. */
  current?: boolean
}

export interface EducationItem {
  institution: string
  degree: string
  field?: string
  period: string
  summary?: string
  highlights?: string[]
}

export interface CertificationItem {
  name: string
  issuer: string
  /** Free-form date or period. */
  date: string
  credentialUrl?: string
  skills?: string[]
}

export interface TimelineItem {
  label: string
  title: string
  period?: string
  description: string
}
