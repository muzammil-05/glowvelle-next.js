"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createCategory,
  updateCategory,
  type CategoryInput,
} from "@/lib/actions/admin-categories"
import type { AdminCategoryDetail } from "@/lib/data/admin-read"
import { slugify } from "@/lib/utils/slugify"
import type { ReferenceStatus } from "@/types/database"

const STATUS_OPTIONS: { value: ReferenceStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

type CategoryFormProps = {
  category?: AdminCategoryDetail
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(Boolean(category))

  const [name, setName] = useState(category?.name ?? "")
  const [slug, setSlug] = useState(category?.slug ?? "")
  const [icon, setIcon] = useState(category?.icon ?? "")
  const [imageUrl, setImageUrl] = useState(category?.imageUrl ?? "")
  const [description, setDescription] = useState(category?.description ?? "")
  const [sortOrder, setSortOrder] = useState(
    category?.sortOrder != null ? String(category.sortOrder) : "0",
  )
  const [productCount, setProductCount] = useState(
    category?.productCount != null ? String(category.productCount) : "0",
  )
  const [status, setStatus] = useState<ReferenceStatus>(
    category?.status ?? "active",
  )

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const buildInput = (): CategoryInput => ({
    name,
    slug,
    icon: icon || null,
    imageUrl: imageUrl || null,
    description: description || null,
    sortOrder: sortOrder ? Number(sortOrder) : 0,
    productCount: productCount ? Number(productCount) : 0,
    status,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const input = buildInput()

      if (category) {
        const result = await updateCategory(category.id, input)
        if (!result.success) {
          setError(result.error ?? "Failed to update category.")
          return
        }
        router.refresh()
      } else {
        const result = await createCategory(input)
        if (!result.success || !result.data) {
          setError(result.error ?? "Failed to create category.")
          return
        }
        router.push(`/admin/categories/${result.data.id}/edit`)
      }
    })
  }

  const selectClassName =
    "h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            placeholder="Category name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            required
            placeholder="category-slug"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReferenceStatus)}
            className={selectClassName}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="sparkles"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort order</Label>
          <Input
            id="sortOrder"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCount">Product count</Label>
          <Input
            id="productCount"
            type="number"
            min={0}
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Category description"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : category
              ? "Save changes"
              : "Create category"}
        </Button>
      </div>
    </form>
  )
}
