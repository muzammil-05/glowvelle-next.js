import { SectionHeader } from "@/components/marketing/section-header";
import type { Product } from "@/types";

type ProductHowToUseProps = {
  product: Product;
};

export function ProductHowToUse({ product }: ProductHowToUseProps) {
  if (product.howToUse.length === 0) return null;

  return (
    <section aria-labelledby="product-how-to-use-heading">
      <SectionHeader
        eyebrow="Application Guide"
        heading={
          <>
            How To <span className="text-[#FF5FA2] italic">Use</span>
          </>
        }
        className="mb-8"
      />
      <ol className="space-y-4">
        {product.howToUse.map((step, index) => (
          <li
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-[#FFD6E8] bg-white p-5 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF5FA2] font-sans text-[13px] font-bold text-white">
              {index + 1}
            </span>
            <p className="font-sans text-[13px] leading-relaxed text-[#2F2F2F] dark:text-white">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
