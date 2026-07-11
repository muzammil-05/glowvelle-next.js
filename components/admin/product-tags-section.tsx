"use client"

import { X } from "lucide-react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addProductTag, removeProductTag } from "@/lib/actions/admin-products"
import type { AdminProductTag } from "@/lib/data/admin-read"

type ProductTagsSectionProps = {
  productId: string
  tags: AdminProductTag[]
}

export function ProductTagsSection({ productId, tags }: ProductTagsSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [newTag, setNewTag] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault()
    if (!newTag.trim()) return

    setError(null)
    startTransition(async () => {
      const result = await addProductTag(productId, newTag)
      if (!result.success) {
        setError(result.error ?? "Failed to add tag.")
        return
      }
      setNewTag("")
      router.refresh()
    })
  }

  const handleRemove = (tagId: string) => {
    startTransition(async () => {
      await removeProductTag(tagId)
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

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
          className="max-w-xs"
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          Add tag
        </Button>
      </form>

      {tags.length === 0 ? (
        <p className="text-sm text-muted-foreground">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm"
            >
              {tag.tag}
              <button
                type="button"
                onClick={() => handleRemove(tag.id)}
                disabled={isPending}
                className="rounded-full p-0.5 text-muted-foreground hover:text-destructive"
                aria-label={`Remove tag ${tag.tag}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
