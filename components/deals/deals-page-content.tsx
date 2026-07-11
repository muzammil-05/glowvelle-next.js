import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/layout/container";
import { DealsCountdownSections } from "@/components/deals/deals-countdown-sections";
import { DealsPriceComparison } from "@/components/deals/deals-price-comparison";
import { DealsProductGrid } from "@/components/deals/deals-product-grid";
import { FeaturedDeals } from "@/components/deals/featured-deals";
import type { Deal, Product } from "@/types";
import type { FlashDeal } from "@/lib/mock/deals";

type DealsPageContentProps = {
  featuredDeals: Deal[];
  flashDeals: FlashDeal[];
  limitedTimeDeals: Deal[];
  allDealProducts: Product[];
  priceComparisonProducts: Product[];
  limitedTimeEndsIn: readonly [string, string, string];
  flashDealsActiveCount: number;
};

export function DealsPageContent({
  featuredDeals,
  flashDeals,
  limitedTimeDeals,
  allDealProducts,
  priceComparisonProducts,
  limitedTimeEndsIn,
  flashDealsActiveCount,
}: DealsPageContentProps) {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <PageHero
        imageId="photo-1723150512429-bfa92988d845"
        eyebrow="Limited Time Only"
        title="Best Beauty Deals"
        subtitle="Hand-curated price drops updated daily. Save big on luxury beauty without compromise."
        height="h-80"
      />

      <Container className="py-10">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Deals" }]} />

        <FeaturedDeals deals={featuredDeals} />
        <DealsCountdownSections
          flashDeals={flashDeals}
          limitedTimeDeals={limitedTimeDeals}
          limitedTimeEndsIn={limitedTimeEndsIn}
          flashDealsActiveCount={flashDealsActiveCount}
        />
        <DealsProductGrid products={allDealProducts} />
        <DealsPriceComparison products={priceComparisonProducts} />
      </Container>

      <LazyNewsletter />
    </div>
  );
}
