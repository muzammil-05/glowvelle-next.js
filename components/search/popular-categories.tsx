import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { CategoriesEmptyState } from "@/components/shared/categories-empty-state";
import type { PopularCategory } from "@/types";

type PopularCategoriesProps = {
  categories: PopularCategory[];
};

export function PopularCategories({ categories }: PopularCategoriesProps) {
  if (categories.length === 0) {
    return (
      <section aria-labelledby="popular-categories-heading" className="mt-14">
        <h2
          id="popular-categories-heading"
          className="mb-4 font-display text-[22px] font-bold text-[#2F2F2F] dark:text-white"
        >
          Popular Categories
        </h2>
        <CategoriesEmptyState variant="inline" />
      </section>
    );
  }

  return (
    <section aria-labelledby="popular-categories-heading" className="mt-14">
      <h2
        id="popular-categories-heading"
        className="mb-4 font-display text-[22px] font-bold text-[#2F2F2F] dark:text-white"
      >
        Popular Categories
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/shop/${category.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-[#FFD6E8] bg-white px-5 py-4 transition-all hover:border-[#FF5FA2] hover:shadow-lg hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {category.icon}
                </span>
                <div>
                  <span className="block font-sans text-[14px] font-semibold text-[#2F2F2F] group-hover:text-[#FF5FA2] dark:text-white">
                    {category.name}
                  </span>
                  <span className="font-sans text-[11px] text-[#9B8B97]">
                    {category.count.toLocaleString()} products
                  </span>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-[#9B8B97] transition-transform group-hover:translate-x-0.5 group-hover:text-[#FF5FA2]"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
