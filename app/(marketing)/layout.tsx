import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getActiveCategories } from "@/lib/data";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getActiveCategories();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex min-h-screen flex-1 flex-col pt-20">{children}</main>
      <SiteFooter categories={categories} />
    </>
  );
}
