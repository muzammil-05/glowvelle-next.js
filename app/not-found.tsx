import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Search, Sparkles } from "lucide-react";

import { FocusMainHeading } from "@/components/a11y/focus-main-heading";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/layout/container";
import { getActiveCategories } from "@/lib/data";
import { unsplashImage } from "@/lib/images";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Return to Glowvelle to discover beauty deals and price comparisons.",
  path: "/404",
  noIndex: true,
});

export default async function NotFound() {
  const categories = await getActiveCategories();

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        className="flex min-h-screen flex-1 flex-col bg-[#FFF9FC] pt-20 dark:bg-[#1A0D13]"
      >
        <Container className="relative w-full">
          <div className="pointer-events-none absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-[#FFD6E8]/40 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-1/4 left-1/3 -z-10 h-48 w-48 rounded-full bg-[#FFEAF4]/50 blur-[60px]" />

          <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col gap-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-4 py-2 dark:border-[#3A2530] dark:bg-[#2A1520]">
                <Sparkles size={13} className="text-[#FF5FA2]" aria-hidden />
                <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
                  Page Not Found
                </span>
              </div>

              <div>
                <div
                  className="font-display text-[100px] leading-none font-bold text-[#FFD6E8] select-none sm:text-[130px] dark:text-[#3A2530]"
                  aria-hidden
                >
                  404
                </div>
                <FocusMainHeading className="-mt-4 font-display text-[40px] leading-tight font-bold text-[#2F2F2F] sm:text-[52px] dark:text-white">
                  Oh no, this page got
                  <br />
                  <span className="text-[#FF5FA2] italic">lost in the glow.</span>
                </FocusMainHeading>
              </div>

              <p className="max-w-md font-sans text-[16px] leading-relaxed text-[#9B8B97] dark:text-white/55">
                The page you&apos;re looking for has moved, expired, or never
                existed. Let&apos;s get you back to discovering beautiful beauty
                deals.
              </p>

              <form action="/search" method="get" role="search" className="max-w-md">
                <div className="relative">
                  <Search
                    size={17}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9B8B97]"
                    aria-hidden
                  />
                  <input
                    type="search"
                    name="q"
                    placeholder="Search beauty products..."
                    aria-label="Search beauty products"
                    className="w-full rounded-2xl border border-[#FFD6E8] bg-white py-4 pr-4 pl-12 font-sans text-[14px] text-[#2F2F2F] placeholder-[#9B8B97] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none dark:border-[#3A2530] dark:bg-[#2A1520] dark:text-white"
                  />
                </div>
              </form>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
                >
                  Back to Home
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-7 py-3.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:border-[#FF5FA2] hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none dark:border-[#3A2530] dark:bg-[#2A1520]"
                >
                  Continue Shopping
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>

            <div className="relative hidden h-[420px] lg:block lg:h-[560px]">
              <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#FFD6E8] shadow-2xl shadow-[#FF5FA2]/15">
                <Image
                  src={unsplashImage("photo-1631730486572-226d1f595b68", 700, 560)}
                  alt="Beautiful cosmetics"
                  width={700}
                  height={560}
                  sizes="(max-width: 1024px) 0px, 50vw"
                  quality={80}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF5FA2]/20 via-transparent to-transparent" />
              </div>

              <div className="absolute -left-10 top-1/3 rounded-2xl border border-[#FFD6E8] bg-white px-5 py-4 shadow-xl dark:border-[#3A2530] dark:bg-[#2A1520]">
                <div className="mb-2 flex items-center gap-2">
                  <Heart size={13} className="text-[#FF5FA2]" aria-hidden />
                  <span className="font-sans text-[11px] text-[#9B8B97]">
                    Don&apos;t miss these deals
                  </span>
                </div>
                <Link
                  href="/deals"
                  aria-label="View today's deals"
                  className="flex items-center gap-1.5 font-display text-[13px] font-bold text-[#FF5FA2] transition-all hover:gap-2.5 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
                >
                  View Today&apos;s Deals
                  <ArrowRight size={12} aria-hidden />
                </Link>
              </div>

              <div className="absolute -right-6 bottom-20 rounded-2xl bg-[#FF5FA2] px-4 py-3 text-white shadow-xl">
                <div className="font-display text-[28px] leading-none font-bold">
                  50K+
                </div>
                <div className="font-sans text-[10px]">Products to explore</div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter categories={categories} />
    </>
  );
}
