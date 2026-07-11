"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { AdminListView } from "@/components/admin/admin-list-view"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { deleteCategory } from "@/lib/actions/admin-categories"
import type { AdminCategoryListItem } from "@/lib/data/admin-read"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

const CATEGORY_STATUS_OPTIONS = [
  { label: "All statuses", value: "all" as const },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

type DeleteDialogProps = {
  category: AdminCategoryListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteCategoryDialog({
  category,
  open,
  onOpenChange,
}: DeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!category) return
    setError(null)

    startTransition(async () => {
      const result = await deleteCategory(category.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete category.")
        return
      }
      onOpenChange(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{category?.name}&rdquo;?
            Categories linked to products cannot be deleted.
          </DialogDescription>
        </DialogHeader>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type AdminCategoriesTableProps = {
  items: AdminCategoryListItem[]
  isPlaceholder?: boolean
}

export function AdminCategoriesTable({
  items,
  isPlaceholder = false,
}: AdminCategoriesTableProps) {
  const [deleteTarget, setDeleteTarget] =
    useState<AdminCategoryListItem | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          render={<Link href="/admin/categories/new" />}
          nativeButton={false}
        >
          <Plus />
          Add Category
        </Button>
      </div>

      <AdminListView
        items={items}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["name", "slug"]}
        statusKey="status"
        statusOptions={CATEGORY_STATUS_OPTIONS}
        searchPlaceholder="Search categories…"
        emptyMessage="No categories match your filters."
        columns={[
          {
            key: "name",
            header: "Category",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </div>
            ),
          },
          {
            key: "productCount",
            header: "Products",
            cell: (row) => row.productCount,
          },
          {
            key: "sortOrder",
            header: "Order",
            cell: (row) => row.sortOrder,
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "updatedAt",
            header: "Updated",
            cell: (row) => (
              <span className="text-muted-foreground">
                {formatDate(row.updatedAt)}
              </span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            className: "text-right",
            cell: (row) => (
              <div className="flex justify-end gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  render={
                    <Link href={`/admin/categories/${row.id}/edit`} />
                  }
                  nativeButton={false}
                  aria-label={`Edit ${row.name}`}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive"
                  onClick={() => setDeleteTarget(row)}
                  aria-label={`Delete ${row.name}`}
                >
                  <Trash2 />
                </Button>
              </div>
            ),
          },
        ]}
      />

      <DeleteCategoryDialog
        category={deleteTarget}
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      />
    </div>
  )
}
