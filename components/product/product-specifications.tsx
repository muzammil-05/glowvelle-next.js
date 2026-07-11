import { SectionHeader } from "@/components/marketing/section-header";
import type { Product } from "@/types";

type ProductSpecificationsProps = {
  product: Product;
};

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  if (product.specifications.length === 0) return null;

  return (
    <section aria-labelledby="product-specifications-heading">
      <SectionHeader
        eyebrow="Product Details"
        headingId="product-specifications-heading"
        heading={
          <>
            Full <span className="text-[#FF5FA2] italic">Specifications</span>
          </>
        }
        className="mb-8"
      />
      <dl className="overflow-hidden rounded-2xl border border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#2A1520]">
        {product.specifications.map((spec, index) => (
          <div
            key={spec.label}
            className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] ${
              index < product.specifications.length - 1
                ? "border-b border-[#FFD6E8] dark:border-[#3A2530]"
                : ""
            }`}
          >
            <dt className="bg-[#FFEAF4] px-6 py-4 font-sans text-[13px] font-semibold text-[#2F2F2F] dark:bg-[#1A0D13] dark:text-white">
              {spec.label}
            </dt>
            <dd className="px-6 py-4 font-sans text-[13px] text-[#9B8B97] dark:text-white/60">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
