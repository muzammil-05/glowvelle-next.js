import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BrandAllProducts } from "@/components/brands/brand-all-products";
import { BrandFeaturedProducts } from "@/components/brands/brand-featured-products";
import { BrandHero } from "@/components/brands/brand-hero";
import { BrandInfo } from "@/components/brands/brand-info";
import { BrandStory } from "@/components/brands/brand-story";
import { RelatedBrands } from "@/components/brands/related-brands";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { Container } from "@/components/layout/container";
import {
  getBrandBySlug,
  getBrandStaticParams,
  getProductsByBrand,
  getRelatedBrands,
} from "@/lib/data";
import {
  BrandJsonLd,
  BreadcrumbJsonLd,
  createBrandMetadata,
  createPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/config/site";

// ISR: brand detail + products; 1h matches catalog cache tags.
export const revalidate = 3600;

type BrandDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBrandStaticParams();
}

export async function generateMetadata({
  params,
}: BrandDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return createPageMetadata({
      title: "Brand Not Found",
      path: `/brands/${slug}`,
    });
  }

  return createBrandMetadata(brand);
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const [allProducts, relatedBrands] = await Promise.all([
    getProductsByBrand(brand.name),
    getRelatedBrands(slug),
  ]);
  const featuredProducts = allProducts.slice(0, 4);
  const pageUrl = `${SITE_URL}/brands/${brand.slug}`;

  return (
    <>
      <BrandJsonLd brand={brand} pageUrl={pageUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Brands", url: `${SITE_URL}/brands` },
          { name: brand.name, url: pageUrl },
        ]}
      />
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <BrandHero brand={brand} />

      <Container className="py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Brands", href: "/brands" },
            { label: brand.name },
          ]}
        />

        <BrandInfo brand={brand} />
        <BrandStory brand={brand} />
        <BrandFeaturedProducts brand={brand} products={featuredProducts} />
        <BrandAllProducts brand={brand} products={allProducts} />
        <RelatedBrands brands={relatedBrands} />
      </Container>

      <LazyNewsletter />
    </div>
    </>
  );
}
