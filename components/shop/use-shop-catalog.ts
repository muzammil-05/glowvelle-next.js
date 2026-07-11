"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { GetProductsResult } from "@/lib/data";
import { SHOP_ITEMS_PER_PAGE, SHOP_MAX_PRICE } from "@/lib/shop/constants";
import {
  countActiveFilters,
  getTotalPages,
  type ShopSortOption,
} from "@/lib/shop/filter-products";
import {
  buildShopQueryString,
  parseShopParams,
  type ParsedShopParams,
} from "@/lib/shop/search-params";

export type ShopCatalogData = GetProductsResult;

type UseShopCatalogOptions = {
  initialCategory?: string;
  catalogData: ShopCatalogData;
  brands: string[];
};

export function useShopCatalog({
  initialCategory,
  catalogData,
  brands,
}: UseShopCatalogOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const params = useMemo(() => {
    const parsed = parseShopParams(Object.fromEntries(searchParams.entries()));

    if (initialCategory && parsed.selectedCategories.length === 0) {
      return { ...parsed, selectedCategories: [initialCategory] };
    }

    return parsed;
  }, [searchParams, initialCategory]);

  const updateParams = useCallback(
    (updates: Partial<ParsedShopParams>) => {
      const queryString = buildShopQueryString(params, updates);
      startTransition(() => {
        router.push(`${pathname}${queryString}`, { scroll: false });
      });
    },
    [params, pathname, router, startTransition]
  );

  const totalPages = getTotalPages(catalogData.total, catalogData.pageSize);

  const activeFilterCount = countActiveFilters({
    selectedCategories: params.selectedCategories,
    selectedBrands: params.selectedBrands,
    maxPrice: params.maxPrice,
    minRating: params.minRating,
  });

  const toggleCategory = useCallback(
    (category: string) => {
      const selectedCategories = params.selectedCategories.includes(category)
        ? params.selectedCategories.filter((item) => item !== category)
        : [...params.selectedCategories, category];
      updateParams({ selectedCategories, page: 1 });
    },
    [params.selectedCategories, updateParams]
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      const selectedBrands = params.selectedBrands.includes(brand)
        ? params.selectedBrands.filter((item) => item !== brand)
        : [...params.selectedBrands, brand];
      updateParams({ selectedBrands, page: 1 });
    },
    [params.selectedBrands, updateParams]
  );

  const clearAllFilters = useCallback(() => {
    updateParams({
      selectedCategories: initialCategory ? [initialCategory] : [],
      selectedBrands: [],
      maxPrice: SHOP_MAX_PRICE,
      minRating: null,
      page: 1,
    });
  }, [initialCategory, updateParams]);

  const handleSearchChange = useCallback(
    (searchQuery: string) => {
      updateParams({ searchQuery, page: 1 });
    },
    [updateParams]
  );

  const handleSortChange = useCallback(
    (sortBy: ShopSortOption) => {
      updateParams({ sortBy, page: 1 });
    },
    [updateParams]
  );

  const handleMaxPriceChange = useCallback(
    (maxPrice: number) => {
      updateParams({ maxPrice, page: 1 });
    },
    [updateParams]
  );

  const handleMinRatingChange = useCallback(
    (minRating: number | null) => {
      updateParams({ minRating, page: 1 });
    },
    [updateParams]
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams]
  );

  return {
    searchQuery: params.searchQuery,
    sortBy: params.sortBy,
    selectedCategories: params.selectedCategories,
    selectedBrands: params.selectedBrands,
    maxPrice: params.maxPrice,
    minRating: params.minRating,
    currentPage: catalogData.page,
    brands,
    paginatedProducts: catalogData.products,
    totalPages,
    activeFilterCount,
    total: catalogData.total,
    toggleCategory,
    toggleBrand,
    clearAllFilters,
    handleSearchChange,
    handleSortChange,
    handleMaxPriceChange,
    handleMinRatingChange,
    setCurrentPage,
  };
}

export { SHOP_ITEMS_PER_PAGE };
