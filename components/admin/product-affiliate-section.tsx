"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  upsertAffiliateLink,
  upsertProductPrice,
} from "@/lib/actions/admin-products"
import type {
  AdminAffiliateLink,
  AdminAffiliateStoreOption,
  AdminProductPrice,
} from "@/lib/data/admin-read"

type ProductAffiliateSectionProps = {
  productId: string
  stores: AdminAffiliateStoreOption[]
  affiliateLinks: AdminAffiliateLink[]
  prices: AdminProductPrice[]
}

type StoreDraft = {
  affiliateUrl: string
  externalProductId: string
  price: string
  originalPrice: string
  inStock: boolean
  isPrime: boolean
}

function buildStoreDraft(
  storeId: string,
  links: AdminAffiliateLink[],
  prices: AdminProductPrice[],
): StoreDraft {
  const link = links.find((l) => l.storeId === storeId)
  const price = prices.find((p) => p.storeId === storeId)

  return {
    affiliateUrl: link?.affiliateUrl ?? "",
    externalProductId: link?.externalProductId ?? "",
    price: price ? String(price.price) : "",
    originalPrice:
      price?.originalPrice != null ? String(price.originalPrice) : "",
    inStock: price?.inStock ?? true,
    isPrime: price?.isPrime ?? false,
  }
}

export function ProductAffiliateSection({
  productId,
  stores,
  affiliateLinks,
  prices,
}: ProductAffiliateSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, StoreDraft>>(() => {
    const initial: Record<string, StoreDraft> = {}
    for (const store of stores) {
      initial[store.id] = buildStoreDraft(store.id, affiliateLinks, prices)
    }
    return initial
  })

  const updateDraft = (
    storeId: string,
    field: keyof StoreDraft,
    value: string | boolean,
  ) => {
    setDrafts((prev) => ({
      ...prev,
      [storeId]: { ...prev[storeId], [field]: value },
    }))
  }

  const handleSave = (storeId: string) => {
    const draft = drafts[storeId]
    if (!draft) return

    setError(null)
    startTransition(async () => {
      if (draft.affiliateUrl.trim()) {
        const linkResult = await upsertAffiliateLink(
          productId,
          storeId,
          draft.affiliateUrl,
          draft.externalProductId || null,
        )
        if (!linkResult.success) {
          setError(linkResult.error ?? "Failed to save affiliate link.")
          return
        }
      }

      if (draft.price.trim()) {
        const priceResult = await upsertProductPrice(
          productId,
          storeId,
          Number(draft.price),
          draft.originalPrice ? Number(draft.originalPrice) : null,
          draft.inStock,
          draft.isPrime,
        )
        if (!priceResult.success) {
          setError(priceResult.error ?? "Failed to save price.")
          return
        }
      }

      router.refresh()
    })
  }

  if (stores.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No affiliate stores configured.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {stores.map((store) => {
        const draft = drafts[store.id]
        if (!draft) return null

        return (
          <div
            key={store.id}
            className="rounded-lg border border-border bg-card p-4 space-y-4"
          >
            <div className="flex items-center gap-2">
              {store.brandColor ? (
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: store.brandColor }}
                />
              ) : null}
              <h3 className="font-medium text-foreground">{store.name}</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`url-${store.id}`}>Affiliate URL</Label>
                <Input
                  id={`url-${store.id}`}
                  value={draft.affiliateUrl}
                  onChange={(e) =>
                    updateDraft(store.id, "affiliateUrl", e.target.value)
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ext-${store.id}`}>External product ID</Label>
                <Input
                  id={`ext-${store.id}`}
                  value={draft.externalProductId}
                  onChange={(e) =>
                    updateDraft(store.id, "externalProductId", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`price-${store.id}`}>Price (USD)</Label>
                <Input
                  id={`price-${store.id}`}
                  type="number"
                  min={0}
                  step={0.01}
                  value={draft.price}
                  onChange={(e) =>
                    updateDraft(store.id, "price", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`orig-${store.id}`}>Original price</Label>
                <Input
                  id={`orig-${store.id}`}
                  type="number"
                  min={0}
                  step={0.01}
                  value={draft.originalPrice}
                  onChange={(e) =>
                    updateDraft(store.id, "originalPrice", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.inStock}
                    onChange={(e) =>
                      updateDraft(store.id, "inStock", e.target.checked)
                    }
                    className="size-4 rounded border-input"
                  />
                  In stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.isPrime}
                    onChange={(e) =>
                      updateDraft(store.id, "isPrime", e.target.checked)
                    }
                    className="size-4 rounded border-input"
                  />
                  Prime eligible
                </label>
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              disabled={isPending}
              onClick={() => handleSave(store.id)}
            >
              Save {store.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
