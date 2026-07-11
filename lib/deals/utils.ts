import type { Deal, Product } from "@/types";

import {
  productToDealFrom,
  productToDealSaving,
} from "@/lib/data/products";

export function buildDealsFromProducts(
  products: Product[],
  labels: readonly string[]
): Deal[] {
  return products.slice(0, labels.length).map((product, index) => ({
    label: labels[index % labels.length] ?? "Deal",
    product,
    saving: productToDealSaving(product),
    from: productToDealFrom(product),
  }));
}

export function buildFlashDealsFromProducts(
  products: Product[],
  labels: readonly string[],
  timeLeftVariants: [number, number, number][]
) {
  return buildDealsFromProducts(products, labels).map((deal, index) => ({
    ...deal,
    timeLeft: timeLeftVariants[index % timeLeftVariants.length] ?? [2, 47, 33],
  }));
}
