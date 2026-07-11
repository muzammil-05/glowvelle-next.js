"use client"

import { usePathname } from "next/navigation"

import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import {
  getAdminPageDescription,
  getAdminPageTitle,
} from "@/config/admin-nav"

type AdminTopbarProps = {
  userEmail: string
}

export function AdminTopbar({ userEmail }: AdminTopbarProps) {
  const pathname = usePathname()
  const title = getAdminPageTitle(pathname)
  const description = getAdminPageDescription(pathname)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Admin
          </p>
          <h1 className="truncate font-display text-2xl font-semibold text-foreground">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden max-w-48 truncate text-sm text-muted-foreground sm:inline">
            {userEmail}
          </span>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  )
}
