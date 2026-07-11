import { Suspense } from "react";

import { TopBrandsSection } from "@/components/home/top-brands";
import { TopBrandsSkeleton } from "@/components/home/top-brands-skeleton";
import { getFeaturedBrands } from "@/lib/data";

async function TopBrandsLoader() {
  const brands = await getFeaturedBrands(6);
  return <TopBrandsSection brands={brands} />;
}

export function TopBrandsSectionWrapper() {
  return (
    <Suspense fallback={<TopBrandsSkeleton />}>
      <TopBrandsLoader />
    </Suspense>
  );
}
