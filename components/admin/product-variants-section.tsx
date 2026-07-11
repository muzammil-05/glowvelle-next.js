"use client"

import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  createVariant,
  deleteVariant,
  updateVariant,
} from "@/lib/actions/admin-products"
import type { AdminProductVariant } from "@/lib/data/admin-read"

type ProductVariantsSectionProps = {
  productId: string
  variants: AdminProductVariant[]
}

type VariantDraft = {
  name: string
  sku: string
  isDefault: boolean
  sortOrder: number
}

const emptyDraft = (): VariantDraft => ({
  name: "",
  sku: "",
  isDefault: false,
  sortOrder: 0,
})

export function ProductVariantsSection({
  productId,
  variants,
}: ProductVariantsSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<VariantDraft>(emptyDraft())

  const resetForm = () => {
    setDraft(emptyDraft())
    setEditingId(null)
    setShowForm(false)
  }

  const startEdit = (variant: AdminProductVariant) => {
    setEditingId(variant.id)
    setDraft({
      name: variant.name,
      sku: variant.sku ?? "",
      isDefault: variant.isDefault,
      sortOrder: variant.sortOrder,
    })
    setShowForm(true)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const payload = {
        name: draft.name,
        sku: draft.sku || null,
        isDefault: draft.isDefault,
        sortOrder: draft.sortOrder,
      }

      const result = editingId
        ? await updateVariant(editingId, payload)
        : await createVariant(productId, payload)

      if (!result.success) {
        setError(result.error ?? "Failed to save variant.")
        return
      }

      resetForm()
      router.refresh()
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteVariant(id)
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

      {variants.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">SKU</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Order</th>
                <th className="px-4 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-2">{variant.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {variant.sku ?? "—"}
                  </td>
                  <td className="px-4 py-2">
                    {variant.isDefault ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">{variant.sortOrder}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={isPending}
                        onClick={() => startEdit(variant)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={isPending}
                        onClick={() => handleDelete(variant.id)}
                        className="text-destructive"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No variants yet.</p>
      )}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-muted/20 p-4 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="variant-name">Name</Label>
              <Input
                id="variant-name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant-sku">SKU</Label>
              <Input
                id="variant-sku"
                value={draft.sku}
                onChange={(e) => setDraft({ ...draft, sku: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variant-order">Sort order</Label>
              <Input
                id="variant-order"
                type="number"
                value={draft.sortOrder}
                onChange={(e) =>
                  setDraft({ ...draft, sortOrder: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex items-end gap-2 pb-1">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.isDefault}
                  onChange={(e) =>
                    setDraft({ ...draft, isDefault: e.target.checked })
                  }
                  className="size-4 rounded border-input"
                />
                Default variant
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isPending}>
              {editingId ? "Update variant" : "Add variant"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
        >
          <Plus />
          Add variant
        </Button>
      )}
    </div>
  )
}
