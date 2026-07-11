import { SHOP_MAX_PRICE } from "@/lib/shop/constants";

export type ShopSortOption = "featured" | "price-asc" | "rating" | "newest";

export type ShopFilterState = {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  maxPrice: number;
  minRating: number | null;
  sortBy: ShopSortOption;
};

export const SHOP_SORT_OPTIONS: { value: ShopSortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "rating", label: "Highest Rating" },
  { value: "newest", label: "Newest" },
];

export function countActiveFilters({
  selectedCategories,
  selectedBrands,
  maxPrice,
  minRating,
}: Pick<
  ShopFilterState,
  "selectedCategories" | "selectedBrands" | "maxPrice" | "minRating"
>): number {
  return (
    selectedCategories.length +
    selectedBrands.length +
    (maxPrice < SHOP_MAX_PRICE ? 1 : 0) +
    (minRating !== null ? 1 : 0)
  );
}

export function getTotalPages(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

