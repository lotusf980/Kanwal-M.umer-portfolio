/**
 * Renders a JSON-LD structured-data block. Safe for server components;
 * the injected object is serialized once at build time.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
