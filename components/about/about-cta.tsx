import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ABOUT_CTA } from "@/lib/mock/about";

export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-heading" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="rounded-3xl bg-gradient-to-r from-[#FF5FA2] to-[#FF7DB6] p-12 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="about-cta-heading"
              className="mb-3 font-display text-[36px] leading-tight font-bold"
            >
              {ABOUT_CTA.title}
            </h2>
            <p className="mb-8 font-sans text-[15px] leading-relaxed text-white/80">
              {ABOUT_CTA.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-colors hover:bg-[#FFEAF4] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {ABOUT_CTA.shopLabel}
                <ArrowRight size={13} aria-hidden />
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {ABOUT_CTA.dealsLabel}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
