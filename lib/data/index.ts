/** Public DAL barrel — read queries for marketing site. */
export * from "./affiliate-links";
export * from "./affiliates";
export * from "./errors";
export * from "./product-prices";
export * from "./types";

export { normalizeCategoryImage, mapCategoryRow } from "./categories";
export { normalizeBrandImage, mapBrandRow } from "./brands";
export {
  normalizeBlogImage,
  mapBlogPostRow,
} from "./blog-posts";
export { mapBlogCategoryRow } from "./blog-categories";
export {
  normalizeProductImage,
  mapProductRow,
  computePriceSummary,
  productToDealSaving,
  productToDealFrom,
  getProductStaticParams,
} from "./products";
export type { GetProductsOptions, GetProductsResult } from "./products";
export { getBrandStaticParams } from "./brands";
export { getBlogStaticParams } from "./blog-posts";

/** Cached server reads — request dedup + ISR-backed cross-request cache. */
export {
  getActiveCategories,
  getCategoryBySlug,
  getActiveBrands,
  getBrandBySlug,
  getFeaturedBrands,
  getRelatedBrands,
  getBlogCategories,
  getPublishedBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getProductBrands,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  getProductsByBrand,
  getProductsForDeals,
  searchProducts,
} from "@/lib/cache";
