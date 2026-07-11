"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveSiteSettings } from "@/lib/actions/admin-settings"
import type { AdminSiteSettings } from "@/lib/data/admin-read"

type AdminSettingsFormProps = {
  settings: AdminSiteSettings
  supabaseUrl: string
}

export function AdminSettingsForm({
  settings,
  supabaseUrl,
}: AdminSettingsFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [siteName, setSiteName] = useState(settings.siteName)
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription)
  const [twitterHandle, setTwitterHandle] = useState(settings.twitterHandle)
  const [defaultOgImage, setDefaultOgImage] = useState(settings.defaultOgImage)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const result = await saveSiteSettings({
        siteName,
        siteDescription,
        twitterHandle,
        defaultOgImage,
      })

      if (!result.success) {
        setError(result.error ?? "Failed to save settings.")
        return
      }

      setSuccess(true)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Environment info
        </h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Supabase project URL</dt>
            <dd className="mt-1 font-mono text-xs text-foreground">
              {supabaseUrl || "Not configured"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Admin access</dt>
            <dd className="mt-1 text-muted-foreground">
              Authorized via{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                ADMIN_EMAILS
              </code>{" "}
              or Supabase{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                app_metadata.role = admin
              </code>
              .
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-muted-foreground">
          Public pages still read from{" "}
          <code className="rounded bg-muted px-1">config/site.ts</code>. Settings
          saved here are persisted to the database for future phases.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h2 className="font-display text-lg font-semibold text-foreground">
          Site settings
        </h2>

        {error ? (
          <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="mt-4 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
            Settings saved successfully.
          </div>
        ) : null}

        <div className="mt-6 grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site name</Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site description</Label>
            <Textarea
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitterHandle">Twitter handle</Label>
            <Input
              id="twitterHandle"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="glowvelle (without @)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultOgImage">Default OG image</Label>
            <Input
              id="defaultOgImage"
              value={defaultOgImage}
              onChange={(e) => setDefaultOgImage(e.target.value)}
              placeholder="/og-default.png"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
