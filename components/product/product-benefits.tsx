import { Check } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import type { Product } from "@/types";

type ProductBenefitsProps = {
  product: Product;
};

export function ProductBenefits({ product }: ProductBenefitsProps) {
  if (product.benefits.length === 0) return null;

  return (
    <section aria-labelledby="product-benefits-heading">
      <SectionHeader
        eyebrow="Beauty Benefits"
        heading={
          <>
            Why You&apos;ll <span className="text-[#FF5FA2] italic">Love It</span>
          </>
        }
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {product.benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-2xl border border-[#FFD6E8] bg-white p-5 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFEAF4]">
              <Check size={14} className="text-[#FF5FA2]" aria-hidden />
            </div>
            <span className="font-sans text-[13px] leading-relaxed text-[#2F2F2F] dark:text-white">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
