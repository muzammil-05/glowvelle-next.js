"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { FolderTree, Pencil, Plus, Trash2 } from "lucide-react"

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
import { deleteBlogPost } from "@/lib/actions/admin-blog"
import type { AdminBlogListItem } from "@/lib/data/admin-read"

function formatDate(value: string | null): string {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

const BLOG_STATUS_OPTIONS = [
  { label: "All statuses", value: "all" as const },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

type DeleteDialogProps = {
  post: AdminBlogListItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DeleteBlogPostDialog({
  post,
  open,
  onOpenChange,
}: DeleteDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    if (!post) return
    setError(null)

    startTransition(async () => {
      const result = await deleteBlogPost(post.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete blog post.")
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
          <DialogTitle>Delete blog post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &ldquo;{post?.title}&rdquo;? This
            action cannot be undone.
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

type AdminBlogTableProps = {
  items: AdminBlogListItem[]
  isPlaceholder?: boolean
}

export function AdminBlogTable({
  items,
  isPlaceholder = false,
}: AdminBlogTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<AdminBlogListItem | null>(
    null,
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          variant="outline"
          render={<Link href="/admin/blog/categories" />}
          nativeButton={false}
        >
          <FolderTree />
          Blog Categories
        </Button>
        <Button render={<Link href="/admin/blog/new" />} nativeButton={false}>
          <Plus />
          Add Post
        </Button>
      </div>

      <AdminListView
        items={items}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["title", "slug", "category", "author"]}
        statusKey="status"
        statusOptions={BLOG_STATUS_OPTIONS}
        searchPlaceholder="Search blog posts…"
        emptyMessage="No blog posts match your filters."
        columns={[
          {
            key: "title",
            header: "Post",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.title}</p>
                <p className="text-xs text-muted-foreground">{row.slug}</p>
              </div>
            ),
          },
          {
            key: "category",
            header: "Category",
            cell: (row) => row.category,
          },
          {
            key: "author",
            header: "Author",
            cell: (row) => row.author,
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={row.status} />
                {row.featured ? <StatusBadge status="featured" /> : null}
              </div>
            ),
          },
          {
            key: "publishedAt",
            header: "Published",
            cell: (row) => (
              <span className="text-muted-foreground">
                {formatDate(row.publishedAt)}
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
                  render={<Link href={`/admin/blog/${row.id}/edit`} />}
                  nativeButton={false}
                  aria-label={`Edit ${row.title}`}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive"
                  onClick={() => setDeleteTarget(row)}
                  aria-label={`Delete ${row.title}`}
                >
                  <Trash2 />
                </Button>
              </div>
            ),
          },
        ]}
      />

      <DeleteBlogPostDialog
        post={deleteTarget}
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      />
    </div>
  )
}
