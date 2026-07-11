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
import { deleteBrand } from "@/lib/actions/admin-brands"
import type { AdminBrandListItem } from "@/lib/data/admin-read"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

const BRAND_STATUS_OPTIONS = [
  { label: "All statuses", value: "all" as const },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
]

type DeleteDialogProps = {
  brand: AdminBrandListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteBrandDialog({ brand, open, onOpenChange }: DeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!brand) return
    setError(null)

    startTransition(async () => {
      const result = await deleteBrand(brand.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete brand.")
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
          <DialogTitle>Delete brand</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{brand?.name}&rdquo;? Brands
            linked to products cannot be deleted. This action cannot be undone.
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

type AdminBrandsTableProps = {
  items: AdminBrandListItem[]
  isPlaceholder?: boolean
}

export function AdminBrandsTable({
  items,
  isPlaceholder = false,
}: AdminBrandsTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<AdminBrandListItem | null>(
    null,
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button render={<Link href="/admin/brands/new" />} nativeButton={false}>
          <Plus />
          Add Brand
        </Button>
      </div>

      <AdminListView
        items={items}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["name", "slug", "country"]}
        statusKey="status"
        statusOptions={BRAND_STATUS_OPTIONS}
        searchPlaceholder="Search brands…"
        emptyMessage="No brands match your filters."
        columns={[
          {
            key: "name",
            header: "Brand",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </div>
            ),
          },
          {
            key: "country",
            header: "Country",
            cell: (row) => row.country,
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
                  render={<Link href={`/admin/brands/${row.id}/edit`} />}
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

      <DeleteBrandDialog
        brand={deleteTarget}
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      />
    </div>
  )
}
