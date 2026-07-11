import type { ShopSortOption } from "@/lib/shop/filter-products";
import type {
  BlogCategory,
  BlogPost,
  BrandData,
  Category,
  Product,
} from "@/types";

/** Public-facing aliases — separate from future admin write types. */
export type PublicCategory = Category;
export type PublicBrand = BrandData;
export type PublicProduct = Product;
export type PublicBlogPost = BlogPost;
export type PublicBlogCategory = BlogCategory;

export type PaginationOptions = {
  page?: number;
  pageSize?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type GetProductsOptions = {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  categoryId?: string;
  categoryNames?: string[];
  brandSlug?: string;
  brandName?: string;
  brandNames?: string[];
  searchQuery?: string;
  maxPrice?: number;
  minRating?: number | null;
  sort?: ShopSortOption | "price_asc" | "price_desc";
  status?: "published";
};

export type GetProductsResult = {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type GetPublishedBlogPostsOptions = {
  categorySlug?: string;
  featured?: boolean;
};

/** Normalizes Supabase joined relations that may be object or single-element array. */
export function getRelation<T>(
  relation: T | T[] | null | undefined
): T | null {
  if (!relation) return null;
  return Array.isArray(relation) ? (relation[0] ?? null) : relation;
}
