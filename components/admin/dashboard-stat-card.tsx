import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type DashboardStatCardProps = {
  label: string
  value: string | number
  icon: LucideIcon
  hint?: string
  className?: string
}

export function DashboardStatCard({
  label,
  value,
  icon: Icon,
  hint,
  className,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {hint ? (
            <p className="text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden />
        </div>
      </div>
    </div>
  )
}
