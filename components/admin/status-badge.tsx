import { cn } from "@/lib/utils"

export type StatusBadgeVariant =
  | "published"
  | "draft"
  | "archived"
  | "active"
  | "inactive"
  | "featured"
  | "default"

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  published:
    "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  draft:
    "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  archived:
    "bg-zinc-500/10 text-zinc-600 dark:bg-zinc-500/20 dark:text-zinc-300",
  active:
    "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  inactive:
    "bg-zinc-500/10 text-zinc-600 dark:bg-zinc-500/20 dark:text-zinc-300",
  featured:
    "bg-primary/10 text-primary dark:bg-primary/20",
  default:
    "bg-muted text-muted-foreground",
}

function normalizeStatus(status: string): StatusBadgeVariant {
  const value = status.toLowerCase()

  if (value in VARIANT_STYLES) {
    return value as StatusBadgeVariant
  }

  return "default"
}

type StatusBadgeProps = {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = normalizeStatus(status)

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  )
}
