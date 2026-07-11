import Link from "next/link";
import { ShoppingBag } from "lucide-react";

type ProductsEmptyStateProps = {
  variant?: "grid" | "inline";
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function ProductsEmptyState({
  variant = "grid",
  title = "No products found",
  description = "We're curating beautiful beauty products for you. Try adjusting your filters or check back shortly.",
  actionHref = "/shop",
  actionLabel = "Browse All Products",
}: ProductsEmptyStateProps) {
  const isGrid = variant === "grid";

  return (
    <div
      className={
        isGrid
          ? "col-span-full rounded-2xl border border-[#FFD6E8] bg-gradient-to-br from-[#FFF9FC] via-[#FFEAF4] to-[#FFD6E8]/40 px-6 py-14 text-center dark:border-[#3A2530] dark:from-[#2A1520] dark:via-[#1A0D13] dark:to-[#2A1520] sm:px-10 sm:py-16"
          : "rounded-2xl border border-[#FFD6E8] bg-[#FFEAF4]/50 px-5 py-8 text-center dark:border-[#3A2530] dark:bg-[#2A1520]/50"
      }
    >
      <div
        className={`mx-auto flex items-center justify-center rounded-full bg-[#FF5FA2]/10 ${
          isGrid ? "mb-6 h-16 w-16" : "mb-4 h-12 w-12"
        }`}
      >
        <ShoppingBag
          size={isGrid ? 28 : 22}
          className="text-[#FF5FA2]"
          aria-hidden
        />
      </div>
      <h3
        className={`mb-3 font-display font-bold text-[#2F2F2F] dark:text-white ${
          isGrid ? "text-2xl sm:text-[28px]" : "text-lg"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mx-auto font-sans leading-relaxed text-[#9B8B97] ${
          isGrid ? "mb-8 max-w-md text-[14px]" : "mb-5 max-w-sm text-[13px]"
        }`}
      >
        {description}
      </p>
      <Link
        href={actionHref}
        className="inline-flex rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
