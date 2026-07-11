import { SectionHeader } from "@/components/marketing/section-header";
import type { Product } from "@/types";

type ProductIngredientsProps = {
  product: Product;
};

export function ProductIngredients({ product }: ProductIngredientsProps) {
  return (
    <section aria-labelledby="product-ingredients-heading">
      <SectionHeader
        eyebrow="Full Formula"
        heading={
          <>
            Key <span className="text-[#FF5FA2] italic">Ingredients</span>
          </>
        }
        className="mb-8"
      />
      <div className="rounded-2xl border border-[#FFD6E8] bg-white p-8 dark:border-[#3A2530] dark:bg-[#2A1520]">
        <p className="mb-4 font-sans text-[13px] leading-relaxed text-[#9B8B97] dark:text-white/60">
          Full ingredient list (INCI):
        </p>
        <p className="font-sans text-[14px] leading-relaxed text-[#2F2F2F] dark:text-white">
          {product.ingredients}
        </p>
        <div className="mt-6 border-t border-[#FFD6E8] pt-6 dark:border-[#3A2530]">
          <p className="font-sans text-[11px] text-[#9B8B97]">
            Ingredient information is sourced from the brand&apos;s official product
            listings. Always check the physical packaging for the most up-to-date
            formulation.
          </p>
        </div>
      </div>
    </section>
  );
}
