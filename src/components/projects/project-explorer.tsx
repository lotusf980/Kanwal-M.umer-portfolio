"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SearchX, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/shared/project-card"
import { filterProjects } from "@/lib/content/projects"
import { cn } from "@/lib/utils"
import type { Project } from "@content"

export type SortOrder = "newest" | "oldest" | "featured" | "az"

type ProjectExplorerProps = {
  projects: Project[]
  categories: string[]
  technologies: string[]
}

const sortOptions: Array<{ value: SortOrder; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "featured", label: "Featured" },
  { value: "az", label: "A–Z" },
]

function parseParams(searchParams: URLSearchParams): {
  query: string
  technologies: string[]
  categories: string[]
  status: string
  sort: SortOrder
} {
  return {
    query: searchParams.get("q") ?? "",
    technologies: searchParams.get("tech")?.split(",").filter(Boolean) ?? [],
    categories: searchParams.get("cat")?.split(",").filter(Boolean) ?? [],
    status: searchParams.get("status") ?? "all",
    sort: (searchParams.get("sort") as SortOrder) || "newest",
  }
}

/**
 * Client project explorer: search (debounced), technology/category chips,
 * status and sort controls. All state is mirrored into the URL query string
 * so filters are shareable and bookmarkable. Filtering is a pure `useMemo`
 * over `filterProjects`.
 */
export function ProjectExplorer({ projects, categories, technologies }: ProjectExplorerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initial = useMemo(() => parseParams(searchParams), [searchParams])

  const [query, setQuery] = useState(initial.query)
  const [technologies_, setTechnologies] = useState(initial.technologies)
  const [categories_, setCategories] = useState(initial.categories)
  const [status, setStatus] = useState(initial.status)
  const [sort, setSort] = useState<SortOrder>(initial.sort)

  // Keeps the search input responsive while filtering off the critical path.
  const deferredQuery = useDeferredValue(query)
  const deferredTech = useDeferredValue(technologies_)
  const deferredCat = useDeferredValue(categories_)

  const filtered = useMemo(() => {
    let results = filterProjects({
      projects,
      status: status as Project["status"] | "all",
      category: undefined,
      technology: undefined,
    })

    // Query match on title, tagline, summary, technologies.
    const needle = deferredQuery.trim().toLowerCase()
    if (needle) {
      results = results.filter((project) =>
        [project.title, project.tagline, project.summary, ...project.technologies]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
    }

    if (deferredCat.length > 0) {
      results = results.filter((project) => deferredCat.includes(project.category))
    }

    if (deferredTech.length > 0) {
      results = results.filter((project) =>
        project.technologies.some((tech) => deferredTech.includes(tech))
      )
    }

    switch (sort) {
      case "oldest":
        results = [...results].sort((a, b) => a.year - b.year)
        break
      case "featured":
        results = [...results].sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year
        )
        break
      case "az":
        results = [...results].sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        results = [...results].sort((a, b) => b.year - a.year)
    }

    return results
  }, [projects, deferredQuery, deferredTech, deferredCat, status, sort])

  function syncUrl(next: {
    query?: string
    technologies?: string[]
    categories?: string[]
    status?: string
    sort?: SortOrder
  }) {
    const params = new URLSearchParams(searchParams.toString())
    const setOrDelete = (key: string, value: string | string[] | undefined) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else {
        params.set(key, Array.isArray(value) ? value.join(",") : value)
      }
    }
    setOrDelete("q", next.query ?? query)
    setOrDelete("tech", next.technologies ?? technologies_)
    setOrDelete("cat", next.categories ?? categories_)
    setOrDelete("status", next.status ?? status)
    setOrDelete("sort", next.sort === "newest" ? undefined : (next.sort ?? sort))
    router.replace(`/projects${params.toString() ? `?${params.toString()}` : ""}`)
  }

  function toggle(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
  }

  function resetFilters() {
    setQuery("")
    setTechnologies([])
    setCategories([])
    setStatus("all")
    setSort("newest")
    router.replace("/projects")
  }

  const hasActiveFilters =
    query !== "" ||
    technologies_.length > 0 ||
    categories_.length > 0 ||
    status !== "all" ||
    sort !== "newest"

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                syncUrl({ query: event.target.value })
              }}
              placeholder="Search projects…"
              className="pl-9"
              aria-label="Search projects"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="sort">
              Sort projects
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => {
                const value = event.target.value as SortOrder
                setSort(value)
                syncUrl({ sort: value })
              }}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value)
                syncUrl({ status: event.target.value })
              }}
              aria-label="Filter by status"
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In progress</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <FilterGroup
            label="Category"
            items={categories}
            selected={categories_}
            onToggle={(value) => {
              const next = toggle(categories_, value)
              setCategories(next)
              syncUrl({ categories: next })
            }}
          />
          <FilterGroup
            label="Technologies"
            items={technologies}
            selected={technologies_}
            onToggle={(value) => {
              const next = toggle(technologies_, value)
              setTechnologies(next)
              syncUrl({ technologies: next })
            }}
          />
        </div>

        {hasActiveFilters ? (
          <div className="flex items-center justify-between border-t pt-3">
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            </p>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="size-3.5" data-icon="inline-start" />
              Reset filters
            </Button>
          </div>
        ) : null}
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-heading text-lg font-medium">No projects match your filters</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try clearing the search or removing a filter.
          </p>
          <Button variant="outline" className="mt-6" onClick={resetFilters}>
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  label,
  items,
  selected,
  onToggle,
}: {
  label: string
  items: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div className="min-w-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const isSelected = selected.includes(item)
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggle(item)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
