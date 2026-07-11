"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { CategoriesEmptyState } from "@/components/shared/categories-empty-state";
import { unsplashImage } from "@/lib/images";
import type { Category } from "@/types";

type CategorySectionProps = {
  categories: Category[];
  active: string;
  onActiveChange: (value: string) => void;
};

export function CategorySection({
  categories,
  active,
  onActiveChange,
}: CategorySectionProps) {
  return (
    <section
      aria-labelledby="categories-heading"
      className="bg-[#FFF9FC] py-16 sm:py-20 lg:py-24 dark:bg-[#1A0D13]"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
              Browse by Category
            </p>
            <h2
              id="categories-heading"
              className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
            >
              Shop Your Beauty
              <br />
              <span className="text-[#FF5FA2] italic">Essentials</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all duration-200 hover:gap-2.5 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
          >
            View All Categories
            <ChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6" role="list">
          {categories.length === 0 ? (
            <CategoriesEmptyState variant="grid" />
          ) : (
            categories.map((category) => {
            const isActive = active === category.name;
            const href = `/shop?category=${encodeURIComponent(category.name)}`;

            return (
              <Link
                key={category.name}
                href={href}
                role="listitem"
                aria-current={isActive ? "true" : undefined}
                onClick={() =>
                  onActiveChange(active === category.name ? "All" : category.name)
                }
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? "ring-2 ring-[#FF5FA2] ring-offset-2 ring-offset-[#FFF9FC] dark:ring-offset-[#1A0D13]"
                    : "hover:shadow-xl hover:shadow-[#FF5FA2]/10"
                }`}
              >
                <div className="h-full w-full bg-[#FFD6E8]">
                  <Image
                    src={unsplashImage(category.image, 280, 373)}
                    alt={category.name}
                    width={280}
                    height={373}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    quality={80}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/75 via-[#2F2F2F]/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className="mb-1 text-[22px] drop-shadow" aria-hidden>
                    {category.icon}
                  </span>
                  <div className="font-sans text-[13px] leading-tight font-bold text-white">
                    {category.name}
                  </div>
                  <div className="font-sans text-[11px] text-white/65">
                    {category.count.toLocaleString()} products
                  </div>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5FA2]">
                    <Check size={11} className="text-white" aria-hidden />
                  </div>
                )}
              </Link>
            );
          })
          )}
        </div>
      </Container>
    </section>
  );
}
