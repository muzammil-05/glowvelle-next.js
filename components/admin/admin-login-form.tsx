"use client"

import { useTransition } from "react"
import { toast } from "sonner"

import { signIn } from "@/lib/actions/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type AdminLoginFormProps = {
  redirectTo?: string
}

const fieldClassName =
  "h-auto rounded-xl border-[#FFD6E8] bg-[#FFF9FC] px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary dark:border-[#3A2530] dark:bg-[#1A0D13]"

const labelClassName =
  "mb-1.5 block font-sans text-xs font-semibold text-foreground"

export function AdminLoginForm({ redirectTo = "/admin" }: AdminLoginFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formData.set("redirectTo", redirectTo)
      const result = await signIn(formData)

      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="email" className={labelClassName}>
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          placeholder="admin@glowvelle.com"
          className={fieldClassName}
        />
      </div>

      <div>
        <Label htmlFor="password" className={labelClassName}>
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          placeholder="••••••••"
          className={fieldClassName}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90",
        )}
      >
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
