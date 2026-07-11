import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type AdminTableColumn<T> = {
  key: string
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

type AdminDataTableProps<T> = {
  columns: AdminTableColumn<T>[]
  data: T[]
  emptyMessage?: string
  getRowKey: (row: T) => string
  className?: string
}

export function AdminDataTable<T>({
  columns,
  data,
  emptyMessage = "No records found.",
  getRowKey,
  className,
}: AdminDataTableProps<T>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="border-b border-border/70 last:border-b-0 hover:bg-muted/20"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-4 py-3 align-middle", column.className)}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
