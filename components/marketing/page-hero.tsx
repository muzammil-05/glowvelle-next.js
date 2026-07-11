import Image from "next/image";
import type { ReactNode } from "react";

import { unsplashImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  imageId: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  height?: string;
  variant?: "default" | "brands";
};

export function PageHero({
  imageId,
  eyebrow,
  title,
  subtitle,
  height,
  variant = "default",
}: PageHeroProps) {
  const isBrandsVariant = variant === "brands";
  const resolvedHeight = height ?? (isBrandsVariant ? "h-56 sm:h-64 lg:h-72" : "h-64 sm:h-72 lg:h-80");

  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn(
        "relative overflow-hidden",
        resolvedHeight,
        isBrandsVariant ? "bg-[#2F2F2F]" : "bg-[#FFD6E8]"
      )}
    >
      <Image
        src={unsplashImage(imageId, 1440, isBrandsVariant ? 288 : 320)}
        alt=""
        width={1440}
        height={isBrandsVariant ? 288 : 320}
        priority
        sizes="100vw"
        quality={80}
        className={cn(
          "h-full w-full object-cover",
          isBrandsVariant ? "opacity-25" : "opacity-60"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-0",
          isBrandsVariant
            ? "bg-gradient-to-r from-[#FF5FA2]/30 to-transparent"
            : "bg-gradient-to-r from-[#2F2F2F]/70 via-[#2F2F2F]/40 to-transparent"
        )}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-20">
        <p
          className={cn(
            "mb-2 sm:mb-3 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase",
            isBrandsVariant ? "text-white/60" : "text-white/70"
          )}
        >
          {eyebrow}
        </p>
        <h1
          id="page-hero-title"
          className={cn(
            "font-display leading-tight font-bold text-white",
            isBrandsVariant
              ? "mb-2 text-3xl sm:text-4xl md:text-5xl lg:text-[60px]"
              : "mb-2 sm:mb-3 text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "font-sans leading-relaxed",
              isBrandsVariant
                ? "text-sm sm:text-[15px] text-white/60"
                : "max-w-md text-sm sm:text-[16px] text-white/70"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
