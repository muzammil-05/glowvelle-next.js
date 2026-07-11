import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPageContent } from "@/components/shop/category-page-content";
import {
  getActiveCategories,
  getCategoryBySlug,
  getProductBrands,
  getProducts,
} from "@/lib/data";
import { SHOP_ITEMS_PER_PAGE } from "@/lib/shop/constants";
import { parseShopParams, type ShopUrlParams } from "@/lib/shop/search-params";
import {
  BreadcrumbJsonLd,
  CategoryJsonLd,
  createCategoryMetadata,
  createPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/config/site";

// ISR: category catalog; filter params still render dynamically per request.
export const revalidate = 3600;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<ShopUrlParams>;
};

export async function generateStaticParams() {
  const categories = await getActiveCategories();

  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: "Category Not Found",
      path: `/shop/${slug}`,
    });
  }

  const description = `Browse and compare ${category.name.toLowerCase()} products from top beauty retailers.`;

  return createCategoryMetadata({
    ...category,
    description: category.description ?? description,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category: slug } = await params;
  const urlParams = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const parsed = parseShopParams(urlParams);
  const effectiveCategories = parsed.selectedCategories.length
    ? parsed.selectedCategories
    : [category.name];

  const onlyDefaultCategory =
    effectiveCategories.length === 1 &&
    effectiveCategories[0] === category.name;

  const [categories, brands, catalogData] = await Promise.all([
    getActiveCategories(),
    getProductBrands(),
    getProducts({
      page: parsed.page,
      pageSize: SHOP_ITEMS_PER_PAGE,
      ...(onlyDefaultCategory
        ? { categoryId: category.id }
        : { categoryNames: effectiveCategories }),
      brandNames: parsed.selectedBrands,
      searchQuery: parsed.searchQuery,
      maxPrice: parsed.maxPrice,
      minRating: parsed.minRating,
      sort: parsed.sortBy,
    }),
  ]);

  const pageUrl = `${SITE_URL}/shop/${category.slug}`;

  return (
    <>
      <CategoryJsonLd category={category} pageUrl={pageUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Shop", url: `${SITE_URL}/shop` },
          { name: category.name, url: pageUrl },
        ]}
      />
      <CategoryPageContent
      category={category}
      categories={categories}
      brands={brands}
      catalogData={catalogData}
    />
    </>
  );
}
