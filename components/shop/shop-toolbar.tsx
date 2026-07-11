"use client";

import { Search, X } from "lucide-react";

import {
  SHOP_SORT_OPTIONS,
  type ShopSortOption,
} from "@/lib/shop/filter-products";

type ShopToolbarProps = {
  searchQuery: string;
  sortBy: ShopSortOption;
  resultCount: number;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: ShopSortOption) => void;
  showSearch?: boolean;
  showResultsBar?: boolean;
  resultLabel?: string;
};

export function ShopToolbar({
  searchQuery,
  sortBy,
  resultCount,
  onSearchChange,
  onSortChange,
  showSearch = true,
  showResultsBar = true,
  resultLabel,
}: ShopToolbarProps) {
  return (
    <>
      {showSearch && (
      <div className="relative max-w-2xl">
        <Search
          size={18}
          className="absolute top-1/2 left-5 -translate-y-1/2 text-[#9B8B97]"
          aria-hidden
        />
        <label htmlFor="shop-search" className="sr-only">
          Search products
        </label>
        <input
          id="shop-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products, brands, categories..."
          className="w-full rounded-2xl border border-[#FFD6E8] bg-[#FFF9FC] py-4 pr-5 pl-14 font-sans text-[14px] text-[#2F2F2F] placeholder-[#9B8B97] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none dark:border-[#3A2530] dark:bg-[#2A1520] dark:text-white"
        />
        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-4 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFD6E8] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
          >
            <X size={12} className="text-[#9B8B97]" aria-hidden />
          </button>
        )}
      </div>
      )}

      {showResultsBar && (
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-[13px] text-[#9B8B97]">
          Showing{" "}
          <span className="font-semibold text-[#2F2F2F] dark:text-white">
            {resultCount}
          </span>{" "}
          {resultLabel ?? "products"}
        </p>
        <div className="flex items-center gap-3">
          <label
            htmlFor="shop-sort"
            className="font-sans text-[12px] text-[#9B8B97]"
          >
            Sort by:
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            aria-label="Sort products"
            onChange={(event) =>
              onSortChange(event.target.value as ShopSortOption)
            }
            className="rounded-xl border border-[#FFD6E8] bg-white px-4 py-2 font-sans text-[13px] text-[#2F2F2F] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none dark:border-[#3A2530] dark:bg-[#2A1520] dark:text-white"
          >
            {SHOP_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      )}
    </>
  );
}
