import type { Metadata } from "next"
import {
  FileText,
  FolderTree,
  Mail,
  Package,
  Tags,
} from "lucide-react"

import { DashboardStatCard } from "@/components/admin/dashboard-stat-card"
import { getAdminDashboardStats } from "@/lib/data/admin-stats"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats()
  const isPlaceholder = stats.source === "placeholder"

  return (
    <div className="space-y-6">
      {isPlaceholder ? (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Showing sample counts — live database connection unavailable.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardStatCard
          label="Published Products"
          value={stats.publishedProducts}
          icon={Package}
        />
        <DashboardStatCard
          label="Active Brands"
          value={stats.activeBrands}
          icon={Tags}
        />
        <DashboardStatCard
          label="Active Categories"
          value={stats.activeCategories}
          icon={FolderTree}
        />
        <DashboardStatCard
          label="Published Blog Posts"
          value={stats.publishedBlogPosts}
          icon={FileText}
        />
        <DashboardStatCard
          label="Newsletter Subscribers"
          value={
            stats.newsletterSubscribers != null
              ? stats.newsletterSubscribers
              : "N/A"
          }
          icon={Mail}
          hint={
            stats.newsletterSubscribers == null
              ? "Subscriber count requires elevated read access"
              : undefined
          }
        />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Welcome back
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This admin console provides read-only visibility into your catalog,
          brands, categories, and blog content. Create, edit, and delete flows
          will be added in a future phase.
        </p>
      </div>
    </div>
  )
}
