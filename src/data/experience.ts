import type { ExperienceItem } from "@/types"

/**
 * Work experience.
 *
 * No formal company employment yet — this is presented honestly as
 * self-learning and personal projects. No companies, roles, or dates are
 * invented.
 */
export const experience: ExperienceItem[] = [
  {
    role: "Aspiring Full Stack Developer | AI Engineer",
    company: "Self-Learning & Personal Projects",
    period: "Ongoing",
    location: "Karachi, Pakistan",
    summary:
      "Building modern full-stack web applications using Next.js, TypeScript, Python, FastAPI, PostgreSQL, and modern development tools while continuously expanding my knowledge of Artificial Intelligence and Agentic AI through hands-on projects.",
    highlights: [
      "Building full-stack applications with Next.js, TypeScript, and FastAPI.",
      "Exploring Artificial Intelligence and Agentic AI through practical, hands-on projects.",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    current: false,
  },
]

/** Placeholder for an empty-state when no experience is configured. */
export const hasExperience = experience.length > 0