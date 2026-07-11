"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ADMIN_NAV_ITEMS } from "@/config/admin-nav"
import { cn } from "@/lib/utils"

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === "/admin/dashboard"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function AdminNavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin navigation">
      {ADMIN_NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href)
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <Link href="/admin/dashboard" className="block">
            <span className="font-display text-lg font-semibold text-primary">
              Glowvelle
            </span>
            <span className="mt-0.5 block text-xs tracking-wide text-muted-foreground uppercase">
              Admin Console
            </span>
          </Link>
        </div>
        <AdminNavLinks pathname={pathname} />
      </aside>

      <div className="flex items-center border-b border-border bg-card px-4 py-3 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Open admin navigation"
              />
            }
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100vw,280px)] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
          >
            <SheetHeader className="border-b border-sidebar-border px-5 py-5">
              <SheetTitle className="font-display text-lg font-semibold text-primary">
                Glowvelle Admin
              </SheetTitle>
            </SheetHeader>
            <AdminNavLinks
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <span className="ml-3 font-display text-base font-semibold text-foreground">
          Admin
        </span>
      </div>
    </>
  )
}
