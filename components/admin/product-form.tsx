"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createProduct,
  updateProduct,
  type ProductInput,
} from "@/lib/actions/admin-products"
import type { AdminProductDetail, AdminSelectOption } from "@/lib/data/admin-read"
import { slugify } from "@/lib/utils/slugify"
import type { ProductStatus } from "@/types/database"

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
]

type ProductFormProps = {
  brands: AdminSelectOption[]
  categories: AdminSelectOption[]
  product?: AdminProductDetail
}

export function ProductForm({ brands, categories, product }: ProductFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(Boolean(product))

  const [name, setName] = useState(product?.name ?? "")
  const [slug, setSlug] = useState(product?.slug ?? "")
  const [brandId, setBrandId] = useState(product?.brandId ?? brands[0]?.id ?? "")
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? categories[0]?.id ?? "",
  )
  const [description, setDescription] = useState(product?.description ?? "")
  const [ingredients, setIngredients] = useState(product?.ingredients ?? "")
  const [rating, setRating] = useState(
    product?.rating != null ? String(product.rating) : "",
  )
  const [reviewCount, setReviewCount] = useState(
    product?.reviewCount != null ? String(product.reviewCount) : "0",
  )
  const [badge, setBadge] = useState(product?.badge ?? "")
  const [badgeColor, setBadgeColor] = useState(product?.badgeColor ?? "")
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? "draft")

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const buildInput = (): ProductInput => ({
    name,
    slug,
    brandId,
    categoryId,
    description: description || null,
    ingredients: ingredients || null,
    rating: rating ? Number(rating) : null,
    reviewCount: reviewCount ? Number(reviewCount) : 0,
    badge: badge || null,
    badgeColor: badgeColor || null,
    status,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const input = buildInput()

      if (product) {
        const result = await updateProduct(product.id, input)
        if (!result.success) {
          setError(result.error ?? "Failed to update product.")
          return
        }
        router.refresh()
      } else {
        const result = await createProduct(input)
        if (!result.success || !result.data) {
          setError(result.error ?? "Failed to create product.")
          return
        }
        router.push(`/admin/products/${result.data.id}/edit`)
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
            placeholder="Product name"
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
            placeholder="product-slug"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus)}
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
          <Label htmlFor="brand">Brand</Label>
          <select
            id="brand"
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className={selectClassName}
            required
          >
            <option value="" disabled>
              Select brand
            </option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={selectClassName}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Product description"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="ingredients">Ingredients</Label>
          <Textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            placeholder="Key ingredients"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (0–5)</Label>
          <Input
            id="rating"
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="4.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reviewCount">Review count</Label>
          <Input
            id="reviewCount"
            type="number"
            min={0}
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badge">Badge</Label>
          <Input
            id="badge"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="Best Seller"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="badgeColor">Badge color</Label>
          <Input
            id="badgeColor"
            value={badgeColor}
            onChange={(e) => setBadgeColor(e.target.value)}
            placeholder="#FF6B6B"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : product
              ? "Save changes"
              : "Create product"}
        </Button>
      </div>
    </form>
  )
}
