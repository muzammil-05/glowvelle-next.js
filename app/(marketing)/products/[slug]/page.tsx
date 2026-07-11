import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { Container } from "@/components/layout/container";
import { ComparePricesSection } from "@/components/product/compare-prices-section";
import { ProductBenefits } from "@/components/product/product-benefits";
import { ProductFaq } from "@/components/product/product-faq";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductHowToUse } from "@/components/product/product-how-to-use";
import { ProductInfo } from "@/components/product/product-info";
import { ProductIngredients } from "@/components/product/product-ingredients";
import { ProductSpecifications } from "@/components/product/product-specifications";
import { RelatedProducts } from "@/components/product/related-products";
import {
  getProductBySlug,
  getProductStaticParams,
  getRelatedProducts,
} from "@/lib/data";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
  createPageMetadata,
  createProductMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/config/site";
import { getLowestInStockPrice } from "@/lib/products/utils";
import { categoryToSlug } from "@/lib/shop/categories";

// ISR: product detail; 30m for more accurate price display.
export const revalidate = 1800;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProductStaticParams();
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Product Not Found",
      path: `/products/${slug}`,
    });
  }

  return createProductMetadata(product);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryId = product.categoryId;
  const relatedProducts = categoryId
    ? await getRelatedProducts(product.id, categoryId)
    : [];
  const lowestPrice = getLowestInStockPrice(product);
  const pageUrl = `${SITE_URL}/products/${product.slug}`;
  const categorySlug = categoryToSlug(product.category);

  return (
    <>
      <ProductJsonLd product={product} pageUrl={pageUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Shop", url: `${SITE_URL}/shop` },
          { name: product.category, url: `${SITE_URL}/shop/${categorySlug}` },
          { name: product.name, url: pageUrl },
        ]}
      />
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            {
              label: product.category,
              href: `/shop/${categoryToSlug(product.category)}`,
            },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 items-start gap-8 sm:mt-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-16">
          <ProductBenefits product={product} />
          <ProductIngredients product={product} />
          <ProductHowToUse product={product} />
          <ProductSpecifications product={product} />
          <ComparePricesSection
            prices={product.prices}
            lowestPrice={lowestPrice}
            productId={product.id}
          />
          <RelatedProducts products={relatedProducts} category={product.category} />
          <ProductFaq />
        </div>
      </Container>

      <LazyNewsletter />
    </div>
    </>
  );
}
