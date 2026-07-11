"use client";

import { useState } from "react";
import Image from "next/image";

import { unsplashImage } from "@/lib/images";
import { getProductGalleryImages } from "@/lib/products/utils";
import type { Product } from "@/types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = getProductGalleryImages(product);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <div className="relative mb-4 h-64 overflow-hidden rounded-3xl bg-[#FFEAF4] shadow-lg shadow-[#FF5FA2]/5 sm:h-80 lg:h-[500px]">
        <Image
          src={unsplashImage(images[selectedIndex], 680, 500)}
          alt={product.name}
          width={680}
          height={500}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={80}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span
            className="rounded-full px-3 py-1.5 font-sans text-[11px] font-bold text-white"
            style={{ backgroundColor: product.badgeColor }}
          >
            {product.badge}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {images.map((imageId, index) => (
          <button
            key={`${imageId}-${index}`}
            type="button"
            aria-label={`View image ${index + 1} of ${images.length}`}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className={`h-20 overflow-hidden rounded-xl bg-[#FFEAF4] transition-all focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none ${
              selectedIndex === index
                ? "ring-2 ring-[#FF5FA2] ring-offset-2"
                : "hover:opacity-80"
            }`}
          >
            <Image
              src={unsplashImage(imageId, 120, 80)}
              alt=""
              width={120}
              height={80}
              sizes="120px"
              quality={80}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
