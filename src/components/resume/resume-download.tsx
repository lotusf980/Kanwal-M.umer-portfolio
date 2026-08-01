import { Download, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"

/**
 * Download/open actions for the resume. The PDF is a placeholder at
 * /public/resume/Resume.pdf until a real file is dropped in.
 */
export function ResumeDownload() {
  const { resumeUrl } = profile

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-5">
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Resume</p>
        <p className="text-xs text-muted-foreground">PDF · placeholder until replaced</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <Download data-icon="inline-start" />
            Download
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink data-icon="inline-start" />
            Open
          </Link>
        </Button>
      </div>
    </div>
  )
}
