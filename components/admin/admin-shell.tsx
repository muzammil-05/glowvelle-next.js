import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

type AdminShellProps = {
  userEmail: string
  children: React.ReactNode
}

export function AdminShell({ userEmail, children }: AdminShellProps) {
  return (
    <div className="admin-shell flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar userEmail={userEmail} />
        <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  )
}
