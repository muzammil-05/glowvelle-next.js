import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { ComparisonProcess } from "@/components/about/comparison-process";
import { Mission } from "@/components/about/mission";
import { OurStory } from "@/components/about/our-story";
import { WhyTrustGlowvelle } from "@/components/about/why-trust-glowvelle";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { createPageMetadata } from "@/lib/seo";

// Static marketing page — long-lived content, hourly ISR is sufficient.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how Glowvelle helps millions of women find luxury beauty at the best prices — with transparency, trust, and editorial integrity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <AboutHero />

      <Container className="py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      </Container>

      <OurStory />
      <Mission />
      <WhyTrustGlowvelle />
      <ComparisonProcess />
      <AboutCta />
      <LazyNewsletter />
    </div>
  );
}
