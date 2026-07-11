"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type AdminStatusFilter = "all" | string

type AdminTableToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  statusFilter?: AdminStatusFilter
  onStatusFilterChange?: (value: AdminStatusFilter) => void
  statusOptions?: { label: string; value: AdminStatusFilter }[]
  resultCount?: number
  className?: string
}

export function AdminTableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search…",
  statusFilter = "all",
  onStatusFilterChange,
  statusOptions = [
    { label: "All statuses", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
    { label: "Archived", value: "archived" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
  resultCount,
  className,
}: AdminTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="pl-8"
          aria-label="Search table"
        />
      </div>

      <div className="flex items-center gap-3">
        {onStatusFilterChange ? (
          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value as AdminStatusFilter)
            }
            className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
        {resultCount != null ? (
          <span className="text-sm text-muted-foreground">
            {resultCount} result{resultCount === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>
    </div>
  )
}
