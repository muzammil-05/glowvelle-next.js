import { unstable_cache } from "next/cache";
import { cache } from "react";

import {
  getActiveCategories as getActiveCategoriesRaw,
  getCategoryBySlug as getCategoryBySlugRaw,
} from "@/lib/data/categories";
import {
  getActiveBrands as getActiveBrandsRaw,
  getBrandBySlug as getBrandBySlugRaw,
  getFeaturedBrands as getFeaturedBrandsRaw,
  getRelatedBrands as getRelatedBrandsRaw,
} from "@/lib/data/brands";
import { getBlogCategories as getBlogCategoriesRaw } from "@/lib/data/blog-categories";
import {
  getBlogPostBySlug as getBlogPostBySlugRaw,
  getPublishedBlogPosts as getPublishedBlogPostsRaw,
  getRelatedBlogPosts as getRelatedBlogPostsRaw,
} from "@/lib/data/blog-posts";
import {
  getFeaturedProducts as getFeaturedProductsRaw,
  getProductBrands as getProductBrandsRaw,
  getProductBySlug as getProductBySlugRaw,
  getProducts as getProductsRaw,
  getProductsByBrand as getProductsByBrandRaw,
  getProductsForDeals as getProductsForDealsRaw,
  getRelatedProducts as getRelatedProductsRaw,
  searchProducts as searchProductsRaw,
} from "@/lib/data/products";
import type { GetProductsOptions } from "@/lib/data/types";

/** Catalog metadata — categories/brands change infrequently via admin. */
const REVALIDATE_CATALOG = 3600;

/** Product/brand detail — moderate freshness for price accuracy. */
const REVALIDATE_DETAIL = 1800;

/** Editorial and deal listings — hourly refresh is sufficient. */
const REVALIDATE_CONTENT = 3600;

function catalogCache<T>(key: string[], fn: () => Promise<T>, tag: string) {
  return unstable_cache(fn, key, {
    revalidate: REVALIDATE_CATALOG,
    tags: [tag],
  });
}

function detailCache<T>(
  key: string[],
  fn: () => Promise<T>,
  tags: string[]
) {
  return unstable_cache(fn, key, {
    revalidate: REVALIDATE_DETAIL,
    tags,
  });
}

/** Cross-request cache for stable catalog reads; deduped per request via cache(). */
export const getActiveCategories = cache(() =>
  catalogCache(["dal", "active-categories"], getActiveCategoriesRaw, "categories")()
);

export const getCategoryBySlug = cache((slug: string) =>
  catalogCache(
    ["dal", "category-by-slug", slug],
    () => getCategoryBySlugRaw(slug),
    "categories"
  )()
);

export const getActiveBrands = cache(() =>
  catalogCache(["dal", "active-brands"], getActiveBrandsRaw, "brands")()
);

export const getBrandBySlug = cache((slug: string) =>
  catalogCache(
    ["dal", "brand-by-slug", slug],
    () => getBrandBySlugRaw(slug),
    "brands"
  )()
);

export const getFeaturedBrands = cache((limit = 3) =>
  catalogCache(
    ["dal", "featured-brands", String(limit)],
    () => getFeaturedBrandsRaw(limit),
    "brands"
  )()
);

export const getRelatedBrands = cache((currentSlug: string, limit = 3) =>
  getRelatedBrandsRaw(currentSlug, limit)
);

export const getBlogCategories = cache(() =>
  catalogCache(["dal", "blog-categories"], getBlogCategoriesRaw, "blog-categories")()
);

export const getPublishedBlogPosts = cache(
  (options: Parameters<typeof getPublishedBlogPostsRaw>[0] = {}) =>
    unstable_cache(
      () => getPublishedBlogPostsRaw(options),
      [
        "dal",
        "published-blog-posts",
        JSON.stringify(options ?? {}),
      ],
      { revalidate: REVALIDATE_CONTENT, tags: ["blog", "blog-posts"] }
    )()
);

export const getBlogPostBySlug = cache((slug: string) =>
  unstable_cache(
    () => getBlogPostBySlugRaw(slug),
    ["dal", "blog-post-by-slug", slug],
    { revalidate: REVALIDATE_CONTENT, tags: ["blog", "blog-posts", `blog-post:${slug}`] }
  )()
);

export const getRelatedBlogPosts = cache(
  (postId: string, categoryId: string, limit = 3) =>
    getRelatedBlogPostsRaw(postId, categoryId, limit)
);

export const getProductBrands = cache(() =>
  catalogCache(["dal", "product-brands"], getProductBrandsRaw, "products")()
);

/** Request dedup only — filter permutations are too varied for cross-request keys. */
export const getProducts = cache((options: GetProductsOptions = {}) =>
  getProductsRaw(options)
);

export const getProductBySlug = cache((slug: string) =>
  detailCache(
    ["dal", "product-by-slug", slug],
    () => getProductBySlugRaw(slug),
    ["products", `product:${slug}`]
  )()
);

export const getFeaturedProducts = cache((limit = 8) =>
  catalogCache(
    ["dal", "featured-products", String(limit)],
    () => getFeaturedProductsRaw(limit),
    "products"
  )()
);

export const getRelatedProducts = cache(
  (productId: string, categoryId: string, limit = 4) =>
    getRelatedProductsRaw(productId, categoryId, limit)
);

export const getProductsByBrand = cache((brandName: string) =>
  catalogCache(
    ["dal", "products-by-brand", brandName],
    () => getProductsByBrandRaw(brandName),
    "products"
  )()
);

export const getProductsForDeals = cache(() =>
  unstable_cache(
    getProductsForDealsRaw,
    ["dal", "products-for-deals"],
    { revalidate: REVALIDATE_CONTENT, tags: ["products", "deals"] }
  )()
);

/** Search stays request-deduped only — queries are user-driven and must stay fresh. */
export const searchProducts = cache(
  (query: string, options: Omit<GetProductsOptions, "searchQuery"> = {}) =>
    searchProductsRaw(query, options)
);
