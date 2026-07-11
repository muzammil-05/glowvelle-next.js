"use client";

import type { BlogCategoryFilter } from "@/lib/blog/utils";
import type { BlogCategory } from "@/types";

type BlogCategoriesProps = {
  categories: BlogCategory[];
  activeCategory: BlogCategoryFilter;
  onCategoryChange: (category: BlogCategoryFilter) => void;
};

export function BlogCategories({
  categories,
  activeCategory,
  onCategoryChange,
}: BlogCategoriesProps) {
  const filterOptions: BlogCategoryFilter[] = [
    "All",
    ...categories.map((category) => category.name),
  ];

  return (
    <div
      className="mb-10 flex flex-wrap items-center gap-3"
      role="group"
      aria-label="Filter articles by category"
    >
      {filterOptions.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
            className={`rounded-full px-5 py-2 font-sans text-[12px] font-semibold transition-all ${
              isActive
                ? "bg-[#FF5FA2] text-white shadow-md shadow-[#FF5FA2]/30"
                : "border border-[#FFD6E8] bg-white text-[#9B8B97] hover:border-[#FF5FA2] hover:text-[#FF5FA2] dark:border-[#3A2530] dark:bg-[#2A1520]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
