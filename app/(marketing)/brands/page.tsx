import type { Metadata } from "next";

import { BrandsPageContent } from "@/components/brands/brands-page-content";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/layout/container";
import { BrandsEmptyState } from "@/components/shared/brands-empty-state";
import { getActiveBrands } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

// ISR: brand directory changes infrequently.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Beauty Brands",
  description:
    "Discover and compare prices from the world's most coveted beauty houses. Browse premium skincare, makeup, and fragrance brands.",
  path: "/brands",
});

export default async function BrandsPage() {
  const brands = await getActiveBrands();

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <PageHero
        variant="brands"
        imageId="photo-1631730486572-226d1f595b68"
        eyebrow="Curated for You"
        title={
          <>
            Luxury <span className="text-[#FF5FA2] italic">Brands</span>
          </>
        }
        subtitle="Discover and compare prices from the world's most coveted beauty houses."
      />

      <Container className="py-10">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        />

        {brands.length === 0 ? (
          <div className="py-10">
            <BrandsEmptyState variant="grid" />
          </div>
        ) : (
          <BrandsPageContent brands={brands} />
        )}
      </Container>
    </div>
  );
}
