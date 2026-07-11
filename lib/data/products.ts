import {
  getProductStoreOffers,
  mapProductPriceRowsToStorePrices,
} from "@/lib/data/affiliates";
import { createStaticClient } from "@/lib/supabase/static";
import {
  SHOP_ITEMS_PER_PAGE,
  SHOP_MAX_PRICE,
} from "@/lib/shop/constants";
import type { ShopSortOption } from "@/lib/shop/filter-products";
import type { ProductDetailQueryRow, ProductQueryRow } from "@/types/database";
import type { Product, ProductVariant, StorePrice } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import type {
  GetProductsOptions,
  GetProductsResult,
  PublicProduct,
} from "./types";
import { getRelation } from "./types";

export type { GetProductsOptions, GetProductsResult } from "./types";

const FALLBACK_IMAGE = "photo-1779056904689-ff99fd0045a4";
const DEFAULT_BADGE_COLOR = "#FF5FA2";

const PRODUCT_SELECT = `
  id,
  brand_id,
  category_id,
  name,
  slug,
  description,
  ingredients,
  rating,
  review_count,
  badge,
  badge_color,
  status,
  created_at,
  updated_at,
  brands!inner(name, slug),
  categories!inner(name, slug),
  product_images(image_url, is_primary, sort_order),
  product_prices(
    price,
    original_price,
    in_stock,
    is_prime,
    affiliate_stores(name, brand_color)
  )
`;

const PRODUCT_DETAIL_SELECT = `
  id,
  brand_id,
  category_id,
  name,
  slug,
  description,
  ingredients,
  rating,
  review_count,
  badge,
  badge_color,
  status,
  created_at,
  updated_at,
  brands!inner(name, slug),
  categories!inner(name, slug),
  product_images(image_url, alt_text, is_primary, sort_order),
  product_prices(
    price,
    original_price,
    in_stock,
    is_prime,
    affiliate_stores(name, brand_color)
  ),
  product_variants(id, name, sku, is_default, sort_order),
  product_tags(tag)
`;

export function normalizeProductImage(imageUrl: string | null | undefined): string {
  if (!imageUrl) return FALLBACK_IMAGE;

  if (imageUrl.startsWith("http")) {
    const match = imageUrl.match(/photo-[a-zA-Z0-9-]+/);
    if (match) return match[0];
    return imageUrl;
  }

  return imageUrl;
}

function mapGalleryImages(
  images: ProductQueryRow["product_images"]
): string[] {
  const list = images ?? [];
  const sorted = [...list].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return a.sort_order - b.sort_order;
  });
  const normalized = sorted.map((image) =>
    normalizeProductImage(image.image_url)
  );

  if (normalized.length === 0) return [FALLBACK_IMAGE];
  return normalized;
}

function mapProductVariants(
  variants: ProductDetailQueryRow["product_variants"]
): ProductVariant[] {
  return (variants ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((variant) => ({
      id: variant.id,
      name: variant.name,
      sku: variant.sku,
      isDefault: variant.is_default,
    }));
}

function mapProductTags(
  tags: ProductDetailQueryRow["product_tags"]
): string[] {
  return (tags ?? []).map((row) => row.tag);
}

function mapStorePrices(
  prices: ProductQueryRow["product_prices"]
): StorePrice[] {
  return mapProductPriceRowsToStorePrices(prices);
}

function mapProductDetailFields(
  row: ProductDetailQueryRow,
  product: Product
): Product {
  return {
    ...product,
    categoryId: row.category_id,
    galleryImages: mapGalleryImages(row.product_images),
    tags: mapProductTags(row.product_tags),
    variants: mapProductVariants(row.product_variants),
  };
}

export function computePriceSummary(prices: StorePrice[]): {
  bestPrice: number;
  originalPrice: number;
  savings: number;
} {
  if (!prices.length) {
    return { bestPrice: 0, originalPrice: 0, savings: 0 };
  }

  const inStock = prices.filter((price) => price.inStock);
  const pool = inStock.length > 0 ? inStock : prices;
  const sorted = [...pool].sort((a, b) => a.price - b.price);
  const best = sorted[0];
  const bestPrice = best.price;
  const originalPrice =
    best.originalPrice != null && best.originalPrice > bestPrice
      ? best.originalPrice
      : bestPrice;
  const savings = Math.max(0, originalPrice - bestPrice);

  return { bestPrice, originalPrice, savings };
}

export function mapProductRow(row: ProductQueryRow): Product {
  const brand = getRelation(row.brands);
  const category = getRelation(row.categories);
  const images = row.product_images ?? [];
  const primaryImage =
    images.find((image) => image.is_primary) ??
    [...images].sort((a, b) => a.sort_order - b.sort_order)[0];
  const prices = mapStorePrices(row.product_prices);
  const { bestPrice, originalPrice, savings } = computePriceSummary(prices);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: brand?.name ?? "",
    category: category?.name ?? "",
    image: normalizeProductImage(primaryImage?.image_url),
    rating: row.rating != null ? Number(row.rating) : 0,
    reviews: row.review_count,
    badge: row.badge ?? "",
    badgeColor: row.badge_color ?? DEFAULT_BADGE_COLOR,
    bestPrice,
    originalPrice,
    savings,
    prices,
    description: row.description ?? "",
    benefits: [],
    ingredients: row.ingredients ?? "",
    howToUse: [],
    specifications: [],
  };
}

function normalizeSort(sort?: GetProductsOptions["sort"]): ShopSortOption {
  if (sort === "price_asc" || sort === "price_desc") return "price-asc";
  return sort ?? "featured";
}

function sortMappedProducts(
  products: Product[],
  sort: ShopSortOption,
  createdAtMap: Map<string, string>
): Product[] {
  const sorted = [...products];

  if (sort === "price-asc") {
    return sorted.sort((a, b) => a.bestPrice - b.bestPrice);
  }

  if (sort === "rating") {
    return sorted.sort((a, b) => b.rating - a.rating);
  }

  if (sort === "newest") {
    return sorted.sort((a, b) => {
      const aDate = createdAtMap.get(a.id) ?? "";
      const bDate = createdAtMap.get(b.id) ?? "";
      return bDate.localeCompare(aDate);
    });
  }

  return sorted.sort((a, b) => b.reviews - a.reviews);
}

function applyClientFilters(
  products: Product[],
  {
    searchQuery,
    categoryNames,
    brandNames,
    maxPrice,
    minRating,
  }: Pick<
    GetProductsOptions,
    "searchQuery" | "categoryNames" | "brandNames" | "maxPrice" | "minRating"
  >
): Product[] {
  const query = searchQuery?.trim().toLowerCase() ?? "";

  return products.filter((product) => {
    if (
      query &&
      !product.name.toLowerCase().includes(query) &&
      !product.brand.toLowerCase().includes(query) &&
      !product.category.toLowerCase().includes(query) &&
      !product.description.toLowerCase().includes(query)
    ) {
      return false;
    }

    if (
      categoryNames?.length &&
      !categoryNames.includes(product.category)
    ) {
      return false;
    }

    if (brandNames?.length && !brandNames.includes(product.brand)) {
      return false;
    }

    if (maxPrice != null && product.bestPrice > maxPrice) {
      return false;
    }

    if (minRating != null && product.rating < minRating) {
      return false;
    }

    return true;
  });
}

async function fetchPublishedProductRows(
  options: GetProductsOptions = {}
): Promise<ProductQueryRow[]> {
  const supabase = createStaticClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", options.status ?? "published");

  if (options.categoryId) {
    query = query.eq("category_id", options.categoryId);
  }

  if (options.categorySlug) {
    query = query.eq("categories.slug", options.categorySlug.toLowerCase());
  }

  if (options.brandSlug) {
    query = query.eq("brands.slug", options.brandSlug.toLowerCase());
  }

  if (options.brandName) {
    query = query.eq("brands.name", options.brandName);
  }

  const { data, error } = await query;

  if (handleDbError("fetchPublishedProductRows", error)) return [];

  return (data as unknown as ProductQueryRow[]) ?? [];
}

/** Public read: paginated, filtered product listing. */
export async function getProducts(
  options: GetProductsOptions = {}
): Promise<GetProductsResult> {
  return safeQuery(
    "getProducts",
    async () => {
      const page = Math.max(1, options.page ?? 1);
      const pageSize = options.pageSize ?? SHOP_ITEMS_PER_PAGE;
      const sort = normalizeSort(options.sort);
      const maxPrice = options.maxPrice ?? SHOP_MAX_PRICE;

      const rows = await fetchPublishedProductRows(options);
      const createdAtMap = new Map(rows.map((row) => [row.id, row.created_at]));
      const mapped = rows.map(mapProductRow);

      const filtered = applyClientFilters(mapped, {
        searchQuery: options.searchQuery,
        categoryNames: options.categoryNames,
        brandNames: options.brandNames,
        maxPrice,
        minRating: options.minRating,
      });

      const sorted = sortMappedProducts(filtered, sort, createdAtMap);
      const total = sorted.length;
      const start = (page - 1) * pageSize;
      const products = sorted.slice(start, start + pageSize);

      return { products, total, page, pageSize };
    },
    { products: [], total: 0, page: 1, pageSize: SHOP_ITEMS_PER_PAGE }
  );
}

/** Public read: full product detail with store offers joined. */
export async function getProductBySlug(
  slug: string
): Promise<PublicProduct | null> {
  return safeQuery("getProductBySlug", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_DETAIL_SELECT)
      .eq("status", "published")
      .eq("slug", slug.toLowerCase())
      .maybeSingle();

    if (handleDbError("getProductBySlug", error)) return null;
    if (!data) return null;

    const row = data as ProductDetailQueryRow;
    let product = mapProductDetailFields(row, mapProductRow(row));
    const offers = await getProductStoreOffers(product.id);

    if (offers.length > 0) {
      product = {
        ...product,
        prices: offers,
        ...computePriceSummary(offers),
      };
    }

    return product;
  }, null);
}

/** Public read: top-rated products for homepage sections. */
export async function getFeaturedProducts(limit = 8): Promise<PublicProduct[]> {
  const { products } = await getProducts({
    sort: "rating",
    page: 1,
    pageSize: limit,
  });
  return products;
}

/** Public read: same-category products excluding the current one. */
export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<PublicProduct[]> {
  return safeQuery("getRelatedProducts", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("status", "published")
      .eq("category_id", categoryId)
      .neq("id", productId)
      .order("review_count", { ascending: false })
      .limit(limit);

    if (handleDbError("getRelatedProducts", error)) return [];
    if (!data?.length) return [];

    return (data as ProductQueryRow[]).map(mapProductRow);
  }, []);
}

/** Public read: all products for a brand name. */
export async function getProductsByBrand(
  brandName: string
): Promise<PublicProduct[]> {
  const { products } = await getProducts({
    brandName,
    page: 1,
    pageSize: 1000,
    sort: "rating",
  });
  return products;
}

/** Public read: products with savings for deals page. */
export async function getProductsForDeals(): Promise<PublicProduct[]> {
  return safeQuery("getProductsForDeals", async () => {
    const rows = await fetchPublishedProductRows();
    return rows
      .map(mapProductRow)
      .filter((product) => product.savings > 0)
      .sort((a, b) => b.savings - a.savings);
  }, []);
}

/** SSG helper: slugs for published products. */
export async function getProductStaticParams(): Promise<{ slug: string }[]> {
  return safeQuery("getProductStaticParams", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("products")
      .select("slug")
      .eq("status", "published");

    if (handleDbError("getProductStaticParams", error)) return [];
    if (!data?.length) return [];

    return data.map((row) => ({ slug: row.slug }));
  }, []);
}

/** Public read: text search across product fields. */
export async function searchProducts(
  query: string,
  options: Omit<GetProductsOptions, "searchQuery"> = {}
): Promise<{ products: PublicProduct[]; total: number }> {
  const result = await getProducts({
    ...options,
    searchQuery: query,
    page: options.page ?? 1,
    pageSize: options.pageSize ?? 24,
  });

  return { products: result.products, total: result.total };
}

/** Public read: distinct active brand names for shop filters. */
export async function getProductBrands(): Promise<string[]> {
  return safeQuery("getProductBrands", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("brands")
      .select("name")
      .eq("status", "active")
      .order("name", { ascending: true });

    if (handleDbError("getProductBrands", error)) return [];
    if (!data?.length) return [];

    return data.map((row) => row.name);
  }, []);
}

/** Lookup helper: category_id for a product. */
export async function getProductCategoryId(
  productId: string
): Promise<string | null> {
  return safeQuery("getProductCategoryId", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("products")
      .select("category_id")
      .eq("id", productId)
      .maybeSingle();

    if (handleDbError("getProductCategoryId", error) || !data) return null;

    return data.category_id;
  }, null);
}

export function productToDealSaving(product: Product): string {
  if (product.originalPrice <= product.bestPrice) return "0%";
  const pct = Math.round(
    ((product.originalPrice - product.bestPrice) / product.originalPrice) * 100
  );
  return `${pct}%`;
}

export function productToDealFrom(product: Product): string {
  return `$${product.originalPrice.toFixed(2)} → $${product.bestPrice.toFixed(2)}`;
}
