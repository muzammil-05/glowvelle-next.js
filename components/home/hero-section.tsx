import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";

import { Container } from "@/components/layout/container";
import { unsplashImage } from "@/lib/images";
import { HERO_STATS } from "@/lib/mock/home";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[#FFF9FC] md:min-h-screen dark:bg-[#1A0D13]"
    >
      <div className="pointer-events-none absolute top-24 -left-24 hidden h-96 w-96 rounded-full bg-[#FFD6E8]/50 blur-[80px] sm:block dark:bg-[#FF5FA2]/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-[#FFEAF4]/60 blur-[100px] md:block dark:bg-[#FF5FA2]/5" />
      <Container className="grid w-full grid-cols-1 items-center gap-10 py-10 sm:gap-14 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:py-16">
        <div className="flex flex-col gap-5 sm:gap-7">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FFD6E8] bg-white px-4 py-2 shadow-sm dark:border-[#3A2530] dark:bg-[#2A1520]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF5FA2]" aria-hidden />
            <span className="font-sans text-[10px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase sm:text-[11px]">
              The Beauty Price Comparison Platform
            </span>
          </div>
          <h1
            id="hero-heading"
            className="font-display text-4xl leading-[1.06] font-bold tracking-tight text-[#2F2F2F] sm:text-5xl md:text-6xl lg:text-7xl dark:text-white"
          >
            Discover Beauty
            <br />
            at Its <span className="text-[#FF5FA2] italic">Best Price</span>
          </h1>
          <p className="max-w-[460px] font-sans text-base leading-relaxed text-[#9B8B97] sm:text-[17px] dark:text-white/55">
            Compare luxury skincare, makeup &amp; haircare prices across Amazon,
            Walmart, eBay, and official brand stores — all in one beautifully
            curated place.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4">
            <Link
              href="/shop"
              className="group flex items-center gap-2.5 rounded-full bg-[#FF5FA2] px-6 py-3.5 font-sans text-[13px] font-semibold tracking-wide text-white shadow-lg shadow-[#FF5FA2]/35 transition-all duration-200 hover:bg-[#E84D91] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none sm:px-8 sm:py-4"
            >
              Start Comparing
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <Link
              href="/deals"
              className="rounded-full border border-[#FFD6E8] px-6 py-3.5 font-sans text-[13px] font-medium text-[#FF5FA2] transition-all duration-200 hover:bg-[#FFEAF4] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none sm:px-8 sm:py-4 dark:border-[#3A2530] dark:hover:bg-[#2A1520]"
            >
              Browse Deals
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 border-t border-[#FFD6E8]/60 pt-5 sm:gap-10 dark:border-[#3A2530]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="mb-0.5 font-display text-2xl leading-none font-bold text-[#2F2F2F] sm:text-[28px] dark:text-white">
                  {stat.value}
                </div>
                <div className="font-sans text-[12px] text-[#9B8B97]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[320px] w-full max-w-lg sm:h-[420px] lg:mx-0 lg:h-[580px] lg:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[#FFD6E8] shadow-2xl shadow-[#FF5FA2]/15 lg:rounded-[32px]">
            <Image
              src={unsplashImage("photo-1779056904689-ff99fd0045a4", 700, 580)}
              alt="Luxury skincare products on marble"
              width={700}
              height={580}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/20 via-transparent to-transparent" />
          </div>

          <div
            className="absolute top-[35%] left-2 hidden w-48 rounded-2xl border border-[#FFD6E8] bg-white px-4 py-3 shadow-xl sm:block sm:w-56 sm:px-5 sm:py-4 md:-left-14 lg:left-auto lg:-left-14 dark:border-[#3A2530] dark:bg-[#2A1520]"
            aria-label="Best price found: $82.99, save $22.01 via eBay"
          >
            <div className="mb-1.5 font-sans text-[11px] font-medium text-[#9B8B97]">
              Best Price Found
            </div>
            <div className="mb-1 font-display text-2xl leading-none font-bold text-[#2F2F2F] sm:text-[28px] dark:text-white">
              $82.99
            </div>
            <div className="flex items-center gap-1 font-sans text-[11px] font-semibold text-[#FF5FA2]">
              <Zap size={10} aria-hidden />
              Save $22.01 vs Official
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 border-t border-[#FFEAF4] pt-2.5">
              <div className="h-2 w-2 rounded-full bg-[#E53238]" aria-hidden />
              <span className="font-sans text-[11px] text-[#9B8B97]">via eBay</span>
            </div>
          </div>

          <div className="absolute top-8 right-2 hidden w-40 rounded-2xl bg-[#FF5FA2] px-4 py-3 text-white shadow-xl sm:block sm:top-14 sm:-right-4 sm:w-48 lg:-right-8">
            <div className="mb-1.5 flex items-center gap-1.5">
              <TrendingUp size={12} aria-hidden />
              <span className="font-sans text-[10px] font-semibold tracking-wide uppercase">
                Trending Now
              </span>
            </div>
            <div className="font-display text-[13px] leading-snug font-semibold sm:text-[14px]">
              Charlotte Tilbury Magic Cream
            </div>
          </div>

          <Link
            href="/products/2"
            className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-[#FFD6E8] bg-white px-4 py-3 shadow-lg transition-shadow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none sm:-bottom-6 sm:left-14 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#FFEAF4]">
              <Image
                src={unsplashImage("photo-1631730486572-226d1f595b68", 44, 44)}
                alt=""
                width={44}
                height={44}
                sizes="44px"
                quality={80}
                className="h-full w-full object-cover"
                aria-hidden
              />
            </div>
            <div className="text-left">
              <div className="font-sans text-[11px] font-semibold whitespace-nowrap text-[#2F2F2F] dark:text-white">
                NARS Concealer
              </div>
              <div className="font-sans text-[11px] font-bold text-[#FF5FA2]">
                From $26.50
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
