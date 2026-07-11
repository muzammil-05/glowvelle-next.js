import type { Product } from "@/types";

const FALLBACK_IMAGE = "photo-1779056904689-ff99fd0045a4";

export function getLowestInStockPrice(product: Product): number | null {
  const inStockPrices = product.prices.filter((price) => price.inStock);
  if (inStockPrices.length === 0) return null;
  return Math.min(...inStockPrices.map((price) => price.price));
}

export function getProductGalleryImages(product: Product): string[] {
  if (product.galleryImages?.length) {
    return product.galleryImages.slice(0, 4);
  }

  if (product.image) {
    return [product.image];
  }

  return [FALLBACK_IMAGE];
}
