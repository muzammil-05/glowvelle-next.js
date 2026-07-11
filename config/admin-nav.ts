import {
  FileText,
  FolderTree,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  Tags,
  type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  description?: string
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview and stats",
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    description: "Product catalog",
  },
  {
    label: "Brands",
    href: "/admin/brands",
    icon: Tags,
    description: "Brand directory",
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
    description: "Product categories",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    description: "Blog posts",
  },
  {
    label: "Newsletter",
    href: "/admin/newsletter",
    icon: Mail,
    description: "Subscriber management",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Site configuration",
  },
]

export function getAdminPageTitle(pathname: string): string {
  if (pathname === "/admin" || pathname === "/admin/") {
    return "Dashboard"
  }

  if (pathname === "/admin/products/new") {
    return "New Product"
  }

  if (/^\/admin\/products\/[^/]+\/edit$/.test(pathname)) {
    return "Edit Product"
  }

  if (pathname === "/admin/brands/new") {
    return "New Brand"
  }

  if (/^\/admin\/brands\/[^/]+\/edit$/.test(pathname)) {
    return "Edit Brand"
  }

  if (pathname === "/admin/categories/new") {
    return "New Category"
  }

  if (/^\/admin\/categories\/[^/]+\/edit$/.test(pathname)) {
    return "Edit Category"
  }

  if (pathname === "/admin/blog/new") {
    return "New Blog Post"
  }

  if (/^\/admin\/blog\/[^/]+\/edit$/.test(pathname)) {
    return "Edit Blog Post"
  }

  if (pathname === "/admin/blog/categories") {
    return "Blog Categories"
  }

  const exact = ADMIN_NAV_ITEMS.find((item) => item.href === pathname)
  if (exact) return exact.label

  const nested = ADMIN_NAV_ITEMS.find((item) => pathname.startsWith(`${item.href}/`))
  return nested?.label ?? "Admin"
}

export function getAdminPageDescription(pathname: string): string | undefined {
  const item = ADMIN_NAV_ITEMS.find(
    (nav) => nav.href === pathname || pathname.startsWith(`${nav.href}/`)
  )
  return item?.description
}
