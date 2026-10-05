import type { TimelineItem } from "@/types"

/**
 * Personal profile content for Kanwal M. Umer.
 */
export const profile = {
  /** Short bio used on the homepage hero and about page. */
  bio: "Passionate Full Stack Developer with a strong interest in building modern, scalable, and user-friendly web applications.",
  /** Longer narrative used on the about page. */
  about:
    "I am Kanwal M. Umer, a passionate Full Stack Developer with a strong interest in building modern, scalable, and user-friendly web applications. I enjoy working with technologies like Next.js, TypeScript, Python, FastAPI, and Tailwind CSS while continuously expanding my knowledge in Artificial Intelligence and Agentic AI.\n\nI believe in writing clean, maintainable, and high-quality code that delivers real value. I am always eager to learn new technologies, solve challenging problems, and improve my skills through practical projects. My goal is to build innovative AI-powered solutions, contribute to impactful software products, and grow as a professional developer while creating applications that make a meaningful difference.",
  /** Current focus / what you are working on. Shown on the /now page. */
  currentFocus: "Full Stack Development & AI",
  /** Things you are actively learning. */
  currentlyLearning: ["Artificial Intelligence", "Agentic AI", "RAG & LLMs"],
  /** Things you are open to. */
  openTo: ["Remote opportunities", "Open source collaboration", "AI-powered projects"],
  /** Spoken languages, with honest proficiency. */
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Intermediate" },
  ],
  /** Select milestones for the about page timeline. */
  timeline: [] as TimelineItem[],
  /** Path to the resume PDF served from /public. */
  resumeUrl: "/resume/Resume.pdf",
}

/** Personal stats used in the hero / about quick-facts. Omit numbers you don't want to share. */
export const profileStats = {
  yearsExperience: undefined as number | undefined,
  projectsBuilt: undefined as number | undefined,
  articlesWritten: undefined as number | undefined,
  openSourceContributions: undefined as number | undefined,
}
