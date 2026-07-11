import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {children}
    </div>
  )
}
