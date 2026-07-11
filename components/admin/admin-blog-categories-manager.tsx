"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Plus, Trash2 } from "lucide-react"

import { AdminListView } from "@/components/admin/admin-list-view"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
} from "@/lib/actions/admin-blog"
import type { AdminBlogCategoryListItem } from "@/lib/data/admin-read"
import { slugify } from "@/lib/utils/slugify"

type AdminBlogCategoriesManagerProps = {
  items: AdminBlogCategoryListItem[]
  isPlaceholder?: boolean
}

export function AdminBlogCategoriesManager({
  items,
  isPlaceholder = false,
}: AdminBlogCategoriesManagerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<AdminBlogCategoryListItem | null>(null)
  const [editTarget, setEditTarget] =
    useState<AdminBlogCategoryListItem | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [sortOrder, setSortOrder] = useState("0")
  const [slugTouched, setSlugTouched] = useState(false)

  const resetForm = () => {
    setName("")
    setSlug("")
    setDescription("")
    setSortOrder("0")
    setSlugTouched(false)
    setError(null)
  }

  const openAdd = () => {
    resetForm()
    setEditTarget(null)
    setShowAdd(true)
  }

  const openEdit = (item: AdminBlogCategoryListItem) => {
    setName(item.name)
    setSlug(item.slug)
    setDescription(item.description ?? "")
    setSortOrder(String(item.sortOrder))
    setSlugTouched(true)
    setError(null)
    setEditTarget(item)
    setShowAdd(true)
  }

  const handleSave = () => {
    setError(null)

    startTransition(async () => {
      const input = {
        name,
        slug,
        description: description || null,
        sortOrder: sortOrder ? Number(sortOrder) : 0,
      }

      const result = editTarget
        ? await updateBlogCategory(editTarget.id, input)
        : await createBlogCategory(input)

      if (!result.success) {
        setError(result.error ?? "Failed to save category.")
        return
      }

      setShowAdd(false)
      resetForm()
      setEditTarget(null)
      router.refresh()
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setError(null)

    startTransition(async () => {
      const result = await deleteBlogCategory(deleteTarget.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete category.")
        return
      }
      setDeleteTarget(null)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" onClick={openAdd}>
          <Plus />
          Add category
        </Button>
      </div>

      <AdminListView
        items={items}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["name", "slug"]}
        searchPlaceholder="Search blog categories…"
        emptyMessage="No blog categories yet."
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
            key: "sortOrder",
            header: "Order",
            cell: (row) => row.sortOrder,
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
                  onClick={() => openEdit(row)}
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

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit blog category" : "Add blog category"}
            </DialogTitle>
            <DialogDescription>
              Blog categories group posts on the public blog.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (!slugTouched) setSlug(slugify(e.target.value))
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-slug">Slug</Label>
              <Input
                id="cat-slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value)
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-description">Description</Label>
              <Textarea
                id="cat-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-sort">Sort order</Label>
              <Input
                id="cat-sort"
                type="number"
                min={0}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdd(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete blog category</DialogTitle>
            <DialogDescription>
              Delete &ldquo;{deleteTarget?.name}&rdquo;? Posts referencing this
              category cannot be deleted if still linked.
            </DialogDescription>
          </DialogHeader>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteTarget(null)}
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
    </div>
  )
}
