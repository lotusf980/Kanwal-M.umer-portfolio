/**
 * Standalone content generation for the typecheck / CI workflow.
 *
 * The generated output lives in `.content-collections/generated` and is
 * gitignored. `tsc --noEmit` needs those types to exist, so this script runs
 * as a `pretypecheck` hook to build the content layer without invoking a full
 * `next build`.
 */
import { createBuilder } from "@content-collections/core"

const CONFIG_PATH = "content-collections.ts"

async function main() {
  const builder = await createBuilder(CONFIG_PATH)

  builder.on("builder:end", ({ stats }) => {
    console.log(
      `content: built ${stats.collections} collection(s) and ${stats.documents} document(s)`
    )
  })

  builder.on("transformer:validation-error", ({ file, error }) => {
    console.error(`content: validation error in ${file.path}`)
    console.error(error)
    process.exitCode = 1
  })

  builder.on("transformer:error", ({ error }) => {
    console.error("content: transformer error")
    console.error(error)
    process.exitCode = 1
  })

  builder.on("collector:read-error", ({ filePath, error }) => {
    console.error(`content: read error in ${filePath}`)
    console.error(error)
    process.exitCode = 1
  })

  builder.on("collector:parse-error", ({ filePath, error }) => {
    console.error(`content: parse error in ${filePath}`)
    console.error(error)
    process.exitCode = 1
  })

  try {
    await builder.build()
  } catch (error) {
    console.error("content: build failed")
    console.error(error)
    process.exitCode = 1
  }
}

main()
