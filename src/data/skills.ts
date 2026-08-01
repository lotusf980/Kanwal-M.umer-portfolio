import type { Skill, SkillCategory } from "@/types"

/**
 * Skills catalogue grouped by discipline.
 *
 * Levels are honest self-assessments — `learning`, `comfortable`, `advanced`.
 * Prefer an accurate `level` over an invented `years` figure. Add a `note`
 * when it helps clarify the context (e.g. "used daily", "currently exploring").
 */
export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    description: "Building fast, accessible interfaces on the modern web.",
    skills: [
      {
        iconKey: "react",
        name: "React",
        level: "advanced",
        note: "Core library",
      },
      {
        iconKey: "typescript",
        name: "TypeScript",
        level: "advanced",
        note: "Used daily",
      },
      {
        iconKey: "nextjs",
        name: "Next.js",
        level: "advanced",
        note: "App Router, RSC",
      },
      {
        iconKey: "tailwind",
        name: "Tailwind CSS",
        level: "advanced",
      },
      {
        iconKey: "html",
        name: "HTML",
        level: "advanced",
      },
      {
        iconKey: "css",
        name: "CSS",
        level: "advanced",
      },
      {
        iconKey: "vite",
        name: "Vite",
        level: "comfortable",
      },
      {
        iconKey: "sass",
        name: "Sass",
        level: "comfortable",
      },
    ],
  },
  {
    label: "Backend",
    description: "APIs, services, and the systems that power the UI.",
    skills: [
      {
        iconKey: "nodejs",
        name: "Node.js",
        level: "advanced",
      },
      {
        iconKey: "express",
        name: "Express",
        level: "comfortable",
      },
      {
        iconKey: "nestjs",
        name: "NestJS",
        level: "learning",
      },
      {
        iconKey: "trpc",
        name: "tRPC",
        level: "comfortable",
      },
      {
        iconKey: "graphql",
        name: "GraphQL",
        level: "comfortable",
      },
      {
        iconKey: "zod",
        name: "Zod",
        level: "advanced",
        note: "Validation & schemas",
      },
    ],
  },
  {
    label: "Databases",
    description: "Storage, queries, and data modeling.",
    skills: [
      {
        iconKey: "postgresql",
        name: "PostgreSQL",
        level: "comfortable",
      },
      {
        iconKey: "mysql",
        name: "MySQL",
        level: "comfortable",
      },
      {
        iconKey: "sqlite",
        name: "SQLite",
        level: "comfortable",
      },
      {
        iconKey: "mongodb",
        name: "MongoDB",
        level: "comfortable",
      },
      {
        iconKey: "redis",
        name: "Redis",
        level: "comfortable",
      },
      {
        iconKey: "prisma",
        name: "Prisma",
        level: "advanced",
        note: "ORM",
      },
      {
        iconKey: "drizzle",
        name: "Drizzle",
        level: "learning",
      },
    ],
  },
  {
    label: "DevOps & Tooling",
    description: "Shipping, monitoring, and keeping the pipeline healthy.",
    skills: [
      {
        iconKey: "docker",
        name: "Docker",
        level: "comfortable",
      },
      {
        iconKey: "git",
        name: "Git",
        level: "advanced",
        note: "Branching, rebasing",
      },
      {
        iconKey: "github",
        name: "GitHub",
        level: "advanced",
      },
      {
        iconKey: "githubactions",
        name: "GitHub Actions",
        level: "comfortable",
        note: "CI/CD",
      },
      {
        iconKey: "vercel",
        name: "Vercel",
        level: "comfortable",
      },
      {
        iconKey: "pnpm",
        name: "pnpm",
        level: "comfortable",
      },
      {
        iconKey: "linux",
        name: "Linux",
        level: "comfortable",
      },
    ],
  },
  {
    label: "Testing & Quality",
    description: "Catching regressions before they reach users.",
    skills: [
      {
        iconKey: "vitest",
        name: "Vitest",
        level: "comfortable",
      },
      {
        iconKey: "jest",
        name: "Jest",
        level: "comfortable",
      },
      {
        iconKey: "testinglibrary",
        name: "Testing Library",
        level: "comfortable",
      },
      {
        iconKey: "storybook",
        name: "Storybook",
        level: "comfortable",
      },
      {
        iconKey: "eslint",
        name: "ESLint",
        level: "advanced",
        note: "Linting",
      },
      {
        iconKey: "prettier",
        name: "Prettier",
        level: "comfortable",
      },
    ],
  },
  {
    label: "AI & Emerging",
    description: "Current learning focus areas.",
    skills: [
      {
        iconKey: "openai",
        name: "AI / LLM APIs",
        level: "learning",
        note: "Exploring tool use & agents",
      },
      {
        iconKey: "tensorflow",
        name: "TensorFlow",
        level: "learning",
      },
      {
        iconKey: "pytorch",
        name: "PyTorch",
        level: "learning",
      },
      {
        iconKey: "python",
        name: "Python",
        level: "comfortable",
      },
    ],
  },
]

/** Flat list of every skill across all categories, deduplicated by name. */
export const allSkills: Skill[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill }))
)
