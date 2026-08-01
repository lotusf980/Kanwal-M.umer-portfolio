import type { ComponentType, SVGProps } from "react"
import {
  SiCss,
  SiCssmodules,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrettier,
  SiPrisma,
  SiPnpm,
  SiPytorch,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiSass,
  SiShadcnui,
  SiSqlite,
  SiStorybook,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTestinglibrary,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiZod,
} from "react-icons/si"
import { BrainCircuit, Boxes, Cloud, Database, Server } from "lucide-react"
import type { IconType } from "react-icons"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Maps a `Skill["iconKey"]` to an icon component.
 *
 * Brand icons use the `react-icons/si` (Simple Icons) set so skills are
 * recognisable at a glance. Tools without a brand mark fall back to a
 * Lucide icon rather than leaving a gap.
 */
export const skillIconMap: Record<string, IconComponent | IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  cssmodules: SiCssmodules,
  sass: SiSass,
  vite: SiVite,
  nodejs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  trpc: SiTrpc,
  graphql: SiGraphql,
  zod: SiZod,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  sqlite: SiSqlite,
  mongodb: SiMongodb,
  redis: SiRedis,
  prisma: SiPrisma,
  drizzle: SiDrizzle,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  vercel: SiVercel,
  pnpm: SiPnpm,
  linux: SiLinux,
  vitest: SiVitest,
  jest: SiJest,
  testinglibrary: SiTestinglibrary,
  storybook: SiStorybook,
  eslint: SiEslint,
  prettier: SiPrettier,
  reactquery: SiReactquery,
  redux: SiRedux,
  radix: SiRadixui,
  shadcn: SiShadcnui,
  supabase: SiSupabase,
  firebase: SiFirebase,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  figma: SiFigma,

  // No brand mark available — Lucide fallbacks.
  openai: BrainCircuit,
  aws: Cloud,
  database: Database,
  server: Server,
  tooling: Boxes,
}

/** Fallback used when a key is missing from the map (defensive). */
const fallbackIcon: IconComponent = Boxes

export function getSkillIcon(iconKey: string): IconComponent | IconType {
  return skillIconMap[iconKey] ?? fallbackIcon
}
