/**
 * Renders a JSON-LD structured-data block. Safe for server components;
 * the injected object is serialized once at build time. `<` is escaped so a
 * string value can never close the surrounding script tag (XSS hardening).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  )
}
