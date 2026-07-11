import { AdminShell } from "@/components/admin/admin-shell"
import { requireAdmin } from "@/lib/auth/admin"

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await requireAdmin()

  return <AdminShell userEmail={user.email ?? "Admin"}>{children}</AdminShell>
}
