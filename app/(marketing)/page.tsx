import type { Metadata } from "next";

import { FeatureBanner } from "@/components/home/feature-banner";
import { HeroSection } from "@/components/home/hero-section";
import { HomeCategoryProductsSection } from "@/components/home/home-category-products-section";
import { LatestDealsSectionWrapper } from "@/components/home/latest-deals-section";
import { TestimonialsSection } from "@/components/home/testimonials";
import { TopBrandsSectionWrapper } from "@/components/home/top-brands-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyChooseSection } from "@/components/home/why-choose";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { OrganizationJsonLd, WebSiteJsonLd, createPageMetadata } from "@/lib/seo";

// ISR: homepage sections refresh hourly; balances freshness with TTFB.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Compare luxury skincare, makeup, and haircare prices across Amazon, Walmart, eBay, and official brand stores — all in one beautifully curated place.",
  path: "/",
  openGraph: {
    title: "Glowvelle — Discover Beauty at Its Best Price",
  },
});

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <HeroSection />
      <TrustBar />
      <HomeCategoryProductsSection />
      <WhyChooseSection />
      <LatestDealsSectionWrapper />
      <FeatureBanner />
      <TopBrandsSectionWrapper />
      <TestimonialsSection />
      <LazyNewsletter />
    </>
  );
}
