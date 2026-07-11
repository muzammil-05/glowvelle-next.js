import Image from "next/image";

import { ABOUT_HERO } from "@/lib/mock/about";
import { unsplashImage } from "@/lib/images";

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative overflow-hidden bg-[#2F2F2F]"
    >
      <Image
        src={unsplashImage(ABOUT_HERO.imageId, 1440, 480)}
        alt=""
        width={1440}
        height={480}
        priority
        sizes="100vw"
        quality={80}
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5FA2]/20 to-transparent" />
      <div className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-20 lg:py-28 text-white">
        <p className="mb-4 font-sans text-[11px] font-semibold tracking-[0.2em] text-[#FFD6E8] uppercase sm:mb-5">
          {ABOUT_HERO.eyebrow}
        </p>
        <h1
          id="about-hero-title"
          className="mb-4 max-w-3xl font-display text-4xl leading-[1.05] font-bold sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {ABOUT_HERO.title}{" "}
          <span className="text-[#FFD6E8] italic">{ABOUT_HERO.titleAccent}</span>
        </h1>
        <p className="max-w-xl font-sans text-base leading-relaxed text-white/65 sm:text-[17px]">
          {ABOUT_HERO.subtitle}
        </p>
      </div>
    </section>
  );
}
