import type { TimelineItem } from "@/types"

/**
 * Personal profile content.
 *
 * ⚠️ PLACEHOLDERS ONLY. Replace every field with your real information
 * before deploying. Do NOT fabricate experience, focus areas, or interests.
 */
export const profile = {
  /** Short bio used on the homepage hero and about page. */
  bio: "Replace this with a truthful one-to-two sentence summary of who you are and what you do.",
  /** Longer narrative used on the about page. */
  about: "Replace this with a truthful longer narrative about your background, what you enjoy, and how you work.",
  /** Current focus / what you are working on. Shown on the /now page. */
  currentFocus: "Replace this with what you are currently focused on.",
  /** Things you are actively learning. */
  currentlyLearning: ["Replace with a skill you are learning", "Replace with another"],
  /** Things you are open to. */
  openTo: ["Remote opportunities", "Open source collaboration"],
  /** Select milestones for the about page timeline. */
  timeline: [] as TimelineItem[],
}

/** Personal stats used in the hero / about quick-facts. Omit numbers you don't want to share. */
export const profileStats = {
  yearsExperience: undefined as number | undefined,
  projectsBuilt: undefined as number | undefined,
  articlesWritten: undefined as number | undefined,
  openSourceContributions: undefined as number | undefined,
}
