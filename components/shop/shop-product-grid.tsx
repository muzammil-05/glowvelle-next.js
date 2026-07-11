"use client";

import { X } from "lucide-react";

import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import { ProductCard } from "@/components/marketing/product-card";
import { Pagination } from "@/components/marketing/pagination";
import type { Product } from "@/types";

type ShopProductGridProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedCategories: string[];
  selectedBrands: string[];
  onRemoveCategory: (category: string) => void;
  onRemoveBrand: (brand: string) => void;
};

export function ShopProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
  selectedCategories,
  selectedBrands,
  onRemoveCategory,
  onRemoveBrand,
}: ShopProductGridProps) {
  const chips = [
    ...selectedCategories.map((label) => ({
      label,
      type: "category" as const,
    })),
    ...selectedBrands.map((label) => ({ label, type: "brand" as const })),
  ];

  return (
    <>
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <div
              key={`${chip.type}-${chip.label}`}
              className="flex items-center gap-1.5 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-3 py-1.5 dark:border-[#4A3040] dark:bg-[#3A2530]"
            >
              <span className="font-sans text-[11px] font-medium text-[#FF5FA2]">
                {chip.label}
              </span>
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={() =>
                  chip.type === "category"
                    ? onRemoveCategory(chip.label)
                    : onRemoveBrand(chip.label)
                }
                className="focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
              >
                <X size={10} className="text-[#FF5FA2]" aria-hidden />
              </button>
            </div>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <ProductsEmptyState
          title="No products found"
          description="Try adjusting your filters or search term."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={onPageChange}
      />
    </>
  );
}
