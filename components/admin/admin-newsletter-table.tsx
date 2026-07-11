"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Trash2, UserMinus } from "lucide-react"

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
import {
  deleteSubscriber,
  unsubscribeSubscriber,
} from "@/lib/actions/admin-newsletter"
import type { AdminNewsletterSubscriber } from "@/lib/data/admin-read"

function formatDate(value: string | null): string {
  if (!value) return "—"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))
}

const STATUS_OPTIONS = [
  { label: "All", value: "all" as const },
  { label: "Active", value: "active" },
  { label: "Unsubscribed", value: "unsubscribed" },
]

type AdminNewsletterTableProps = {
  items: AdminNewsletterSubscriber[]
  isPlaceholder?: boolean
}

export function AdminNewsletterTable({
  items,
  isPlaceholder = false,
}: AdminNewsletterTableProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] =
    useState<AdminNewsletterSubscriber | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleUnsubscribe = (subscriber: AdminNewsletterSubscriber) => {
    if (subscriber.unsubscribedAt) return

    startTransition(async () => {
      const result = await unsubscribeSubscriber(subscriber.id)
      if (!result.success) {
        setError(result.error ?? "Failed to unsubscribe.")
        return
      }
      router.refresh()
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setError(null)

    startTransition(async () => {
      const result = await deleteSubscriber(deleteTarget.id)
      if (!result.success) {
        setError(result.error ?? "Failed to delete subscriber.")
        return
      }
      setDeleteTarget(null)
      router.refresh()
    })
  }

  const itemsWithStatus = items.map((item) => ({
    ...item,
    subscriptionStatus: item.unsubscribedAt ? "unsubscribed" : "active",
  }))

  return (
    <div className="space-y-4">
      {error && !deleteTarget ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <AdminListView
        items={itemsWithStatus}
        isPlaceholder={isPlaceholder}
        getRowKey={(row) => row.id}
        searchKeys={["email", "source"]}
        statusKey="subscriptionStatus"
        statusOptions={STATUS_OPTIONS}
        searchPlaceholder="Search subscribers…"
        emptyMessage="No newsletter subscribers yet."
        columns={[
          {
            key: "email",
            header: "Email",
            cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.email}</p>
                {row.source ? (
                  <p className="text-xs text-muted-foreground">
                    Source: {row.source}
                  </p>
                ) : null}
              </div>
            ),
          },
          {
            key: "subscribedAt",
            header: "Subscribed",
            cell: (row) => (
              <span className="text-muted-foreground">
                {formatDate(row.subscribedAt)}
              </span>
            ),
          },
          {
            key: "consent",
            header: "Consent",
            cell: (row) => (
              <StatusBadge
                status={row.consentMarketing ? "active" : "inactive"}
              />
            ),
          },
          {
            key: "status",
            header: "Status",
            cell: (row) => (
              <StatusBadge
                status={row.unsubscribedAt ? "inactive" : "active"}
              />
            ),
          },
          {
            key: "unsubscribedAt",
            header: "Unsubscribed",
            cell: (row) => (
              <span className="text-muted-foreground">
                {formatDate(row.unsubscribedAt)}
              </span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            className: "text-right",
            cell: (row) => (
              <div className="flex justify-end gap-1">
                {!row.unsubscribedAt ? (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleUnsubscribe(row)}
                    aria-label={`Unsubscribe ${row.email}`}
                    title="Unsubscribe"
                  >
                    <UserMinus />
                  </Button>
                ) : null}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive"
                  onClick={() => setDeleteTarget(row)}
                  aria-label={`Delete ${row.email}`}
                >
                  <Trash2 />
                </Button>
              </div>
            ),
          },
        ]}
      />

      <Dialog
        open={deleteTarget != null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete subscriber</DialogTitle>
            <DialogDescription>
              Permanently delete &ldquo;{deleteTarget?.email}&rdquo;? This cannot
              be undone.
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
