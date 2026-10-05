import type { Skill, SkillCategory } from "@/types"

/**
 * Skills catalogue grouped by discipline.
 *
 * Levels are honest self-assessments — `learning`, `comfortable`, `advanced`.
 */
export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    description: "Building modern, responsive, accessible interfaces.",
    skills: [
      { iconKey: "react", name: "React.js", level: "advanced" },
      { iconKey: "nextjs", name: "Next.js (App Router)", level: "advanced", note: "App Router, RSC" },
      { iconKey: "typescript", name: "TypeScript", level: "advanced", note: "Used daily" },
      { iconKey: "javascript", name: "JavaScript (ES6+)", level: "advanced" },
      { iconKey: "tailwind", name: "Tailwind CSS", level: "advanced" },
      { iconKey: "html", name: "HTML5", level: "advanced" },
      { iconKey: "css", name: "CSS3", level: "advanced" },
      { iconKey: "framer", name: "Framer Motion", level: "comfortable", note: "Animations" },
      { iconKey: "shadcn", name: "shadcn/ui", level: "comfortable", note: "Component library" },
      { iconKey: "responsive", name: "Responsive Web Design", level: "advanced" },
      { iconKey: "component", name: "Component-Based UI", level: "advanced" },
      { iconKey: "theme", name: "Dark / Light Theme", level: "advanced" },
      { iconKey: "seo", name: "SEO Optimization", level: "comfortable" },
      { iconKey: "a11y", name: "Accessibility", level: "comfortable", note: "WCAG thinking" },
    ],
  },
  {
    label: "Backend",
    description: "APIs, services, and the systems that power the UI.",
    skills: [
      { iconKey: "python", name: "Python", level: "advanced" },
      { iconKey: "fastapi", name: "FastAPI", level: "comfortable" },
      { iconKey: "rest", name: "RESTful API Development", level: "comfortable" },
      { iconKey: "ssr", name: "Server-Side Rendering", level: "advanced", note: "Next.js" },
      { iconKey: "api", name: "API Design & Integration", level: "comfortable" },
      { iconKey: "auth", name: "Authentication & Authorization", level: "comfortable", note: "Better Auth" },
      { iconKey: "server", name: "Server Actions", level: "comfortable", note: "Next.js" },
      { iconKey: "zod", name: "Zod Validation", level: "advanced", note: "Validation & schemas" },
      { iconKey: "middleware", name: "Middleware", level: "comfortable" },
      { iconKey: "crud", name: "CRUD Operations", level: "advanced" },
      { iconKey: "errorhandling", name: "Error Handling", level: "comfortable" },
      { iconKey: "apitest", name: "API Testing", level: "comfortable" },
      { iconKey: "env", name: "Environment Variables", level: "comfortable" },
      { iconKey: "email", name: "Resend Email Integration", level: "comfortable" },
    ],
  },
  {
    label: "Databases",
    description: "Storage, queries, and data modeling.",
    skills: [
      { iconKey: "postgresql", name: "PostgreSQL", level: "comfortable" },
      { iconKey: "neon", name: "Neon Serverless PostgreSQL", level: "comfortable" },
      { iconKey: "sql", name: "SQL", level: "comfortable" },
      { iconKey: "orm", name: "ORM", level: "comfortable", note: "SQLModel / Prisma" },
      { iconKey: "design", name: "Database Design", level: "comfortable" },
      { iconKey: "crud", name: "CRUD Operations", level: "advanced" },
      { iconKey: "migrations", name: "Database Migrations", level: "comfortable" },
      { iconKey: "database", name: "Relational DB Management", level: "comfortable" },
      { iconKey: "qdrant", name: "Qdrant Vector Database", level: "learning", note: "Exploring" },
      { iconKey: "design", name: "Data Modeling", level: "comfortable" },
      { iconKey: "integration", name: "Database Integration", level: "comfortable" },
    ],
  },
  {
    label: "AI / Machine Learning",
    description: "Artificial Intelligence, Agentic AI, and LLM-powered apps.",
    skills: [
      { iconKey: "llm", name: "Artificial Intelligence", level: "comfortable" },
      { iconKey: "agent", name: "Agentic AI", level: "learning", note: "Exploring agents" },
      { iconKey: "openai", name: "OpenAI Agents SDK", level: "learning" },
      { iconKey: "prompt", name: "Prompt Engineering", level: "comfortable" },
      { iconKey: "rag", name: "Retrieval-Augmented Generation (RAG)", level: "learning" },
      { iconKey: "llm", name: "Large Language Models (LLMs)", level: "learning" },
      { iconKey: "openai", name: "OpenAI API Integration", level: "learning" },
      { iconKey: "chatbot", name: "AI Chatbot Development", level: "learning" },
      { iconKey: "vector", name: "Vector Databases", level: "learning" },
      { iconKey: "workflow", name: "AI Workflow Automation", level: "learning" },
      { iconKey: "aiapp", name: "AI-Powered Web Applications", level: "comfortable" },
      { iconKey: "nlp", name: "Natural Language Processing Basics", level: "learning" },
      { iconKey: "aiapp", name: "AI Model Integration", level: "learning" },
    ],
  },
  {
    label: "Programming Languages",
    description: "The languages I write production code in.",
    skills: [
      { iconKey: "typescript", name: "TypeScript", level: "advanced" },
      { iconKey: "javascript", name: "JavaScript", level: "advanced" },
      { iconKey: "python", name: "Python", level: "comfortable" },
      { iconKey: "sql", name: "SQL", level: "comfortable" },
      { iconKey: "html", name: "HTML", level: "advanced" },
      { iconKey: "css", name: "CSS", level: "advanced" },
    ],
  },
  {
    label: "Tools & Technologies",
    description: "The tools and platforms I use day to day.",
    skills: [
      { iconKey: "git", name: "Git", level: "advanced" },
      { iconKey: "github", name: "GitHub", level: "advanced" },
      { iconKey: "editor", name: "Visual Studio Code", level: "advanced", note: "Daily editor" },
      { iconKey: "tooling", name: "Claude Code", level: "comfortable", note: "Agentic coding" },
      { iconKey: "openai", name: "OpenAI API", level: "learning" },
      { iconKey: "agent", name: "OpenAI Agents SDK", level: "learning" },
      { iconKey: "nodejs", name: "Node.js", level: "comfortable" },
      { iconKey: "npm", name: "npm", level: "advanced" },
      { iconKey: "vercel", name: "Vercel", level: "comfortable" },
      { iconKey: "docker", name: "Docker", level: "learning", note: "Basics" },
      { iconKey: "auth", name: "Better Auth", level: "comfortable" },
      { iconKey: "neon", name: "Neon", level: "comfortable" },
      { iconKey: "qdrant", name: "Qdrant", level: "learning" },
      { iconKey: "tailwind", name: "Tailwind CSS", level: "advanced" },
      { iconKey: "shadcn", name: "shadcn/ui", level: "comfortable" },
      { iconKey: "framer", name: "Framer Motion", level: "comfortable" },
    ],
  },
]

/** Flat list of every skill across all categories, deduplicated by name. */
export const allSkills: Skill[] = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill }))
)