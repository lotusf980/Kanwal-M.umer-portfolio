import type { MDXComponents } from "mdx/types"

import { Callout } from "./callout"
import { Metric } from "./metric"

/**
 * Component overrides merged into every compiled MDX document. These are the
 * embeddable, content-only building blocks available in article and case-study
 * bodies (e.g. `const Callout` used as `<Callout>`). Additional rich
 * components can be registered here without touching the content files.
 */
export const mdxComponents: MDXComponents = {
  Callout,
  Metric,
}
