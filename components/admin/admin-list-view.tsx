"use client"

import { useMemo, useState } from "react"

import {
  AdminDataTable,
  type AdminTableColumn,
} from "@/components/admin/admin-data-table"
import { AdminPagination } from "@/components/admin/admin-pagination"
import {
  AdminTableToolbar,
  type AdminStatusFilter,
} from "@/components/admin/admin-table-toolbar"
import { cn } from "@/lib/utils"

type AdminListViewProps<T> = {
  items: T[]
  columns: AdminTableColumn<T>[]
  getRowKey: (row: T) => string
  searchKeys: (keyof T)[]
  statusKey?: keyof T
  statusOptions?: { label: string; value: AdminStatusFilter }[]
  searchPlaceholder?: string
  emptyMessage?: string
  pageSize?: number
  isPlaceholder?: boolean
  className?: string
}

function matchesSearch<T>(
  row: T,
  query: string,
  keys: (keyof T)[]
): boolean {
  if (!query) return true

  const normalized = query.trim().toLowerCase()
  return keys.some((key) => {
    const value = row[key]
    if (value == null) return false
    return String(value).toLowerCase().includes(normalized)
  })
}

export function AdminListView<T>({
  items,
  columns,
  getRowKey,
  searchKeys,
  statusKey,
  statusOptions,
  searchPlaceholder,
  emptyMessage,
  pageSize = 10,
  isPlaceholder = false,
  className,
}: AdminListViewProps<T>) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<AdminStatusFilter>("all")
  const [page, setPage] = useState(1)

  const filteredItems = useMemo(() => {
    return items.filter((row) => {
      if (!matchesSearch(row, search, searchKeys)) return false

      if (statusKey && statusFilter !== "all") {
        const status = String(row[statusKey] ?? "").toLowerCase()
        if (status !== statusFilter) return false
      }

      return true
    })
  }, [items, search, searchKeys, statusFilter, statusKey])

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredItems.slice(start, start + pageSize)
  }, [filteredItems, page, pageSize])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleStatusChange = (value: AdminStatusFilter) => {
    setStatusFilter(value)
    setPage(1)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {isPlaceholder ? (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Showing sample data — live database connection unavailable.
        </div>
      ) : null}

      <AdminTableToolbar
        search={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        statusFilter={statusFilter}
        onStatusFilterChange={statusKey ? handleStatusChange : undefined}
        statusOptions={statusOptions}
        resultCount={filteredItems.length}
      />

      <AdminDataTable
        columns={columns}
        data={paginatedItems}
        getRowKey={getRowKey}
        emptyMessage={emptyMessage}
      />

      <AdminPagination
        page={page}
        pageSize={pageSize}
        totalItems={filteredItems.length}
        onPageChange={setPage}
      />
    </div>
  )
}
