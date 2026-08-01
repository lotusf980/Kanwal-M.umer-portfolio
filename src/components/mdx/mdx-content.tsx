import { MDXContent as BaseMDXContent } from "@content-collections/mdx/react"

import { mdxComponents } from "./mdx-components"

type MdxContentProps = {
  code: string
  components?: Record<string, React.ComponentType<unknown>>
}

/**
 * Renders a compiled MDX document (Server Component). Custom components
 * registered in `mdxComponents` are available inside every document; callers
 * can extend them per-page.
 */
export function MdxContent({ code, components }: MdxContentProps) {
  return <BaseMDXContent code={code} components={{ ...mdxComponents, ...components }} />
}
