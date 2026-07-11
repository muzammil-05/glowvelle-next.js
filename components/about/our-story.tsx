import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { OUR_STORY } from "@/lib/mock/about";
import { unsplashImage } from "@/lib/images";

export function OurStory() {
  return (
    <section aria-labelledby="our-story-heading" className="border-b border-[#FFD6E8] dark:border-[#3A2530]">
      <Container className="grid grid-cols-1 items-center gap-10 py-16 sm:gap-14 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div>
          <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            {OUR_STORY.eyebrow}
          </p>
          <h2
            id="our-story-heading"
            className="mb-6 font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[48px] dark:text-white"
          >
            {OUR_STORY.heading}
          </h2>
          {OUR_STORY.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mb-5 font-sans text-[15px] leading-relaxed text-[#9B8B97] last:mb-8 dark:text-white/60"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
          >
            Get in Touch
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
        <div className="relative">
          <div className="h-64 overflow-hidden rounded-3xl bg-[#FFD6E8] shadow-2xl shadow-[#FF5FA2]/10 sm:h-80 lg:h-[480px]">
            <Image
              src={unsplashImage(OUR_STORY.imageId, 560, 480)}
              alt="Glowvelle story"
              width={560}
              height={480}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl border border-[#FFD6E8] bg-white p-4 shadow-xl sm:-bottom-6 sm:-left-6 sm:p-5 dark:border-[#3A2530] dark:bg-[#2A1520]">
            <div className="font-display text-[32px] leading-none font-bold text-[#FF5FA2]">
              {OUR_STORY.statValue}
            </div>
            <div className="font-sans text-[12px] text-[#9B8B97]">{OUR_STORY.statLabel}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
