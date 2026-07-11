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
import { deleteProduct } from "@/lib/actions/admin-products"
import type { AdminProductListItem } from "@/lib/data/admin-read"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

const PRODUCT_STATUS_OPTIONS = [
  { label: "All statuses", value: "all" as const },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

type DeleteDialogProps = {
  product: AdminProductListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteProductDialog({
  product,
  open,
  onOpenChange,
}: DeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!product) return
    setError(null)

    startTransition(async () => {
      const result = await deleteProduct(product.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete product.")
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
          <DialogTitle>Delete product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{product?.name}&rdquo;? This
            will also remove variants, images, tags, prices, and affiliate
            links. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : null}

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

type AdminProductsTableProps = {
  items: AdminProductListItem[]
  isPlaceholder?: boolean
}

export function AdminProductsTable({
  items,
  isPlaceholder = false,
}: AdminProductsTableProps) {
  const [deleteTarget, setDeleteTarget] =
    useState<AdminProductListItem | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button render={<Link href="/admin/products/new" />} nativeButton={false}>
          <Plus />
          Add Product
        </Button>
      </div>

      <AdminListView
        items={items}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["name", "slug", "brand", "category"]}
        statusKey="status"
        statusOptions={PRODUCT_STATUS_OPTIONS}
        searchPlaceholder="Search products…"
        emptyMessage="No products match your filters."
        columns={[
          {
            key: "name",
            header: "Product",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.name}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </div>
            ),
          },
          {
            key: "brand",
            header: "Brand",
            cell: (row) => row.brand,
          },
          {
            key: "category",
            header: "Category",
            cell: (row) => row.category,
          },
          {
            key: "rating",
            header: "Rating",
            cell: (row) => (
              <span>
                {row.rating.toFixed(1)}{" "}
                <span className="text-muted-foreground">({row.reviews})</span>
              </span>
            ),
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
                    <Link href={`/admin/products/${row.id}/edit`} />
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

      <DeleteProductDialog
        product={deleteTarget}
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      />
    </div>
  )
}
