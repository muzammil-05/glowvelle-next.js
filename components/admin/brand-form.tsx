"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createBrand,
  updateBrand,
  type BrandInput,
} from "@/lib/actions/admin-brands"
import type { AdminBrandDetail } from "@/lib/data/admin-read"
import { slugify } from "@/lib/utils/slugify"
import type { ReferenceStatus } from "@/types/database"

const STATUS_OPTIONS: { value: ReferenceStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

type BrandFormProps = {
  brand?: AdminBrandDetail
}

export function BrandForm({ brand }: BrandFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(Boolean(brand))

  const [name, setName] = useState(brand?.name ?? "")
  const [slug, setSlug] = useState(brand?.slug ?? "")
  const [tagline, setTagline] = useState(brand?.tagline ?? "")
  const [description, setDescription] = useState(brand?.description ?? "")
  const [founded, setFounded] = useState(brand?.founded ?? "")
  const [country, setCountry] = useState(brand?.country ?? "")
  const [imageUrl, setImageUrl] = useState(brand?.imageUrl ?? "")
  const [website, setWebsite] = useState(brand?.website ?? "")
  const [instagramFollowers, setInstagramFollowers] = useState(
    brand?.instagramFollowers ?? "",
  )
  const [status, setStatus] = useState<ReferenceStatus>(
    brand?.status ?? "active",
  )

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const buildInput = (): BrandInput => ({
    name,
    slug,
    tagline: tagline || null,
    description: description || null,
    founded: founded || null,
    country: country || null,
    imageUrl: imageUrl || null,
    website: website || null,
    instagramFollowers: instagramFollowers || null,
    status,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const input = buildInput()

      if (brand) {
        const result = await updateBrand(brand.id, input)
        if (!result.success) {
          setError(result.error ?? "Failed to update brand.")
          return
        }
        router.refresh()
      } else {
        const result = await createBrand(input)
        if (!result.success || !result.data) {
          setError(result.error ?? "Failed to create brand.")
          return
        }
        router.push(`/admin/brands/${result.data.id}/edit`)
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
            placeholder="Brand name"
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
            placeholder="brand-slug"
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

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Short tagline"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Brand description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founded">Founded</Label>
          <Input
            id="founded"
            value={founded}
            onChange={(e) => setFounded(e.target.value)}
            placeholder="2010"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="France"
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

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://brand.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagramFollowers">Instagram followers</Label>
          <Input
            id="instagramFollowers"
            value={instagramFollowers}
            onChange={(e) => setInstagramFollowers(e.target.value)}
            placeholder="1.2M"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : brand ? "Save changes" : "Create brand"}
        </Button>
      </div>
    </form>
  )
}
