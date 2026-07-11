import type { Metadata } from "next"

import { AdminLoginForm } from "@/components/admin/admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
}

type AdminLoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string
    error?: string
  }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams
  const redirectTo = params.redirectTo ?? "/admin"
  const isUnauthorized = params.error === "unauthorized"

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-semibold text-primary">
            Glowvelle Admin
          </p>
          <h1 className="mt-2 font-display text-xl font-medium text-foreground">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your authorized admin credentials.
          </p>
        </div>

        {isUnauthorized ? (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            You are not authorized to access the admin area.
          </div>
        ) : null}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <AdminLoginForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  )
}
