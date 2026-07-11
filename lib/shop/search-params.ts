import {
  SHOP_MAX_PRICE,
  SHOP_MIN_PRICE,
} from "@/lib/shop/constants";
import type { ShopSortOption } from "@/lib/shop/filter-products";

export type ShopUrlParams = {
  q?: string;
  categories?: string;
  brands?: string;
  sort?: string;
  page?: string;
  maxPrice?: string;
  minRating?: string;
};

export type ParsedShopParams = {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  maxPrice: number;
  minRating: number | null;
  sortBy: ShopSortOption;
  page: number;
};

export function parseShopParams(params: ShopUrlParams): ParsedShopParams {
  const sortRaw = params.sort ?? "featured";
  const sortBy: ShopSortOption =
    sortRaw === "price-asc" ||
    sortRaw === "rating" ||
    sortRaw === "newest" ||
    sortRaw === "featured"
      ? sortRaw
      : "featured";

  const maxPrice = params.maxPrice
    ? Math.min(SHOP_MAX_PRICE, Math.max(SHOP_MIN_PRICE, Number(params.maxPrice)))
    : SHOP_MAX_PRICE;

  const minRating = params.minRating ? Number(params.minRating) : null;

  return {
    searchQuery: params.q ?? "",
    selectedCategories: params.categories
      ? params.categories.split(",").filter(Boolean)
      : [],
    selectedBrands: params.brands ? params.brands.split(",").filter(Boolean) : [],
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : SHOP_MAX_PRICE,
    minRating:
      minRating === 3 || minRating === 4 || minRating === 5 ? minRating : null,
    sortBy,
    page: Math.max(1, Number(params.page ?? "1") || 1),
  };
}

export function buildShopQueryString(
  current: ParsedShopParams,
  updates: Partial<ParsedShopParams>
): string {
  const next = { ...current, ...updates };
  const params = new URLSearchParams();

  if (next.searchQuery.trim()) {
    params.set("q", next.searchQuery.trim());
  }

  if (next.selectedCategories.length > 0) {
    params.set("categories", next.selectedCategories.join(","));
  }

  if (next.selectedBrands.length > 0) {
    params.set("brands", next.selectedBrands.join(","));
  }

  if (next.sortBy !== "featured") {
    params.set("sort", next.sortBy);
  }

  if (next.page > 1) {
    params.set("page", String(next.page));
  }

  if (next.maxPrice < SHOP_MAX_PRICE) {
    params.set("maxPrice", String(next.maxPrice));
  }

  if (next.minRating != null) {
    params.set("minRating", String(next.minRating));
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
