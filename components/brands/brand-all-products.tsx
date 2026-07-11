import { ProductCard } from "@/components/marketing/product-card";
import type { BrandData, Product } from "@/types";

type BrandAllProductsProps = {
  brand: BrandData;
  products: Product[];
};

export function BrandAllProducts({ brand, products }: BrandAllProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="brand-all-products-heading"
      className="border-t border-[#FFD6E8] pt-14 pb-16 dark:border-[#3A2530]"
    >
      <div className="mb-10">
        <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
          Full Collection
        </p>
        <h2
          id="brand-all-products-heading"
          className="font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
        >
          All Products by{" "}
          <span className="text-[#FF5FA2] italic">{brand.name}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
