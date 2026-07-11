import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { unsplashImage } from "@/lib/images";

const BANNER_IMAGES = [
  { id: "photo-1631730486572-226d1f595b68", width: 144, height: 176, className: "h-32 w-24 sm:h-44 sm:w-36" },
  { id: "photo-1779056904689-ff99fd0045a4", width: 176, height: 208, className: "mt-2 h-36 w-28 sm:mt-4 sm:h-52 sm:w-44" },
  { id: "photo-1608721279136-cd41b752fa41", width: 144, height: 176, className: "hidden h-44 w-36 sm:block" },
] as const;

export function FeatureBanner() {
  return (
    <section aria-labelledby="feature-banner-heading" className="bg-[#FFF9FC] py-4 sm:py-6 dark:bg-[#1A0D13]">
      <Container>
        <div className="relative flex min-h-56 items-center overflow-hidden rounded-3xl bg-[#2F2F2F] sm:min-h-72 dark:bg-[#0D0609]">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={unsplashImage("photo-1522108098940-de49801b5b40", 1400, 288)}
              alt=""
              width={1400}
              height={288}
              sizes="100vw"
              quality={80}
              className="h-full w-full object-cover"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F2F2F] via-[#2F2F2F]/80 to-transparent" />
          <div className="relative z-10 flex w-full flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
            <div>
              <p className="mb-2 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#D8B36A] uppercase sm:mb-3">
                New Arrivals · July 2025
              </p>
              <h2
                id="feature-banner-heading"
                className="mb-4 font-display text-2xl leading-tight font-bold text-white sm:mb-5 sm:text-3xl lg:text-[42px]"
              >
                Summer Glow
                <br />
                <span className="text-[#FF5FA2] italic">Edit</span>
              </h2>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FF5FA2] px-6 py-3 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:px-7 sm:py-3.5"
              >
                Explore Collection
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
            <div className="hidden gap-3 sm:flex sm:gap-4">
              {BANNER_IMAGES.map((image) => (
                <div
                  key={image.id}
                  className={`overflow-hidden rounded-2xl bg-[#FFD6E8] ${image.className}`}
                >
                  <Image
                    src={unsplashImage(image.id, image.width, image.height)}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="176px"
                    quality={80}
                    className="h-full w-full object-cover opacity-80"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
