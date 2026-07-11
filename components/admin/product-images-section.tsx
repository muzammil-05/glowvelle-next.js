"use client"

import { Star, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  deleteProductImage,
  setPrimaryProductImage,
  uploadProductImage,
} from "@/lib/actions/admin-products"
import type { AdminProductImage } from "@/lib/data/admin-read"

type ProductImagesSectionProps = {
  productId: string
  images: AdminProductImage[]
}

export function ProductImagesSection({
  productId,
  images,
}: ProductImagesSectionProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    const formData = new FormData()
    formData.append("file", file)

    startTransition(async () => {
      const result = await uploadProductImage(productId, formData)
      if (!result.success) {
        setError(result.error ?? "Upload failed.")
        return
      }
      router.refresh()
      if (fileRef.current) fileRef.current.value = ""
    })
  }

  const handleSetPrimary = (imageId: string) => {
    startTransition(async () => {
      await setPrimaryProductImage(imageId, productId)
      router.refresh()
    })
  }

  const handleDelete = (imageId: string) => {
    startTransition(async () => {
      await deleteProductImage(imageId)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => fileRef.current?.click()}
        >
          <Upload />
          Upload image
        </Button>
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground">No images yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-square bg-muted">
                <Image
                  src={image.imageUrl}
                  alt={image.altText ?? "Product image"}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                {image.isPrimary ? (
                  <span className="absolute top-2 left-2 rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    Primary
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-2 p-2">
                {!image.isPrimary ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleSetPrimary(image.id)}
                  >
                    <Star />
                    Set primary
                  </Button>
                ) : null}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleDelete(image.id)}
                  className="text-destructive"
                >
                  <Trash2 />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
