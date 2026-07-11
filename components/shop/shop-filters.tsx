"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Filter } from "lucide-react";

import {
  SHOP_MAX_PRICE,
  SHOP_MIN_PRICE,
} from "@/lib/shop/constants";
import type { Category } from "@/types";

type ShopFiltersProps = {
  categories: Category[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  maxPrice: number;
  minRating: number | null;
  activeFilterCount: number;
  onToggleCategory: (category: string) => void;
  onToggleBrand: (brand: string) => void;
  onMaxPriceChange: (price: number) => void;
  onMinRatingChange: (rating: number | null) => void;
  onClearAll: () => void;
};

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      aria-label={`${checked ? "Remove" : "Apply"} filter: ${label}`}
      className="group flex w-full items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
    >
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[5px] border transition-all ${
          checked
            ? "border-[#FF5FA2] bg-[#FF5FA2]"
            : "border-[#FFD6E8] group-hover:border-[#FF5FA2] dark:border-[#3A2530]"
        }`}
      >
        {checked && <Check size={10} className="text-white" aria-hidden />}
      </span>
      <span
        className={`font-sans text-[13px] transition-colors ${
          checked
            ? "font-medium text-[#FF5FA2]"
            : "text-[#9B8B97] group-hover:text-[#2F2F2F] dark:group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5 border-b border-[#FFD6E8] pb-5 dark:border-[#3A2530]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`filter-group-${title.toLowerCase().replace(/\s+/g, "-")}`}
        aria-label={`${open ? "Collapse" : "Expand"} ${title} filters`}
        onClick={() => setOpen(!open)}
        className="mb-4 flex w-full items-center justify-between rounded-lg focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
      >
        <span className="font-display text-[15px] font-semibold text-[#2F2F2F] dark:text-white">
          {title}
        </span>
        {open ? (
          <ChevronUp size={15} className="text-[#9B8B97]" aria-hidden />
        ) : (
          <ChevronDown size={15} className="text-[#9B8B97]" aria-hidden />
        )}
      </button>
      {open && (
        <div
          id={`filter-group-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="space-y-3"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function ShopFilters({
  categories = [],
  brands = [],
  selectedCategories,
  selectedBrands,
  maxPrice,
  minRating,
  activeFilterCount,
  onToggleCategory,
  onToggleBrand,
  onMaxPriceChange,
  onMinRatingChange,
  onClearAll,
}: ShopFiltersProps) {
  return (
    <aside className="w-full shrink-0 lg:w-64" aria-label="Product filters">
      <div className="sticky top-20 rounded-2xl border border-[#FFD6E8] bg-white p-5 dark:border-[#3A2530] dark:bg-[#2A1520] sm:p-6 lg:top-24 lg:sticky">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-[#FF5FA2]" aria-hidden />
            <span className="font-display text-[16px] font-bold text-[#2F2F2F] dark:text-white">
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5FA2] font-sans text-[10px] font-bold text-white"
                aria-label={`${activeFilterCount} active filters`}
              >
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              aria-label="Clear all filters"
              className="font-sans text-[11px] font-semibold text-[#FF5FA2] hover:underline focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
            >
              Clear All
            </button>
          )}
        </div>

        <FilterGroup title="Category">
          {categories.map((category) => (
            <FilterCheck
              key={category.name}
              label={`${category.name} (${category.count.toLocaleString()})`}
              checked={selectedCategories.includes(category.name)}
              onChange={() => onToggleCategory(category.name)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Brand">
          {brands.map((brand) => (
            <FilterCheck
              key={brand}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Price Range">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans text-[12px] text-[#9B8B97]">Up to</span>
              <span className="font-display text-[14px] font-bold text-[#FF5FA2]">
                ${maxPrice}
              </span>
            </div>
            <label htmlFor="shop-price-range" className="sr-only">
              Maximum price
            </label>
            <input
              id="shop-price-range"
              type="range"
              min={SHOP_MIN_PRICE}
              max={SHOP_MAX_PRICE}
              value={maxPrice}
              aria-valuemin={SHOP_MIN_PRICE}
              aria-valuemax={SHOP_MAX_PRICE}
              aria-valuenow={maxPrice}
              aria-valuetext={`Up to $${maxPrice}`}
              onChange={(event) => onMaxPriceChange(Number(event.target.value))}
              className="w-full accent-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
            />
            <div className="mt-1 flex justify-between font-sans text-[10px] text-[#9B8B97]">
              <span>${SHOP_MIN_PRICE}</span>
              <span>${SHOP_MAX_PRICE}</span>
            </div>
          </div>
        </FilterGroup>

        <FilterGroup title="Ratings">
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              type="button"
              aria-pressed={minRating === rating}
              aria-label={`Filter by ${rating} stars and up`}
              onClick={() =>
                onMinRatingChange(minRating === rating ? null : rating)
              }
              className={`flex w-full items-center gap-2 rounded-lg px-1 py-1 transition-colors focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none ${
                minRating === rating ? "bg-[#FFEAF4] dark:bg-[#3A2530]" : ""
              }`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-[14px] ${
                    star <= rating ? "text-[#D8B36A]" : "text-gray-200"
                  }`}
                  aria-hidden
                >
                  ★
                </span>
              ))}
              <span className="font-sans text-[11px] text-[#9B8B97]">& up</span>
            </button>
          ))}
        </FilterGroup>
      </div>
    </aside>
  );
}
