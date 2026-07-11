"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export function ProductWishlistButton() {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <button
      type="button"
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wishlisted}
      onClick={() => setWishlisted(!wishlisted)}
      className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none ${
        wishlisted
          ? "border-[#FF5FA2] bg-[#FF5FA2]"
          : "border-[#FFD6E8] hover:border-[#FF5FA2] dark:border-[#3A2530]"
      }`}
    >
      <Heart
        size={18}
        className={wishlisted ? "fill-white text-white" : "text-[#9B8B97]"}
      />
    </button>
  );
}
