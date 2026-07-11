import Link from "next/link";

import { getBrandWebsiteUrl } from "@/lib/brands/utils";
import type { BrandData } from "@/types";

type BrandInfoProps = {
  brand: BrandData;
};

export function BrandInfo({ brand }: BrandInfoProps) {
  const websiteUrl = getBrandWebsiteUrl(brand.website);

  const stats = [
    { label: "Founded", value: brand.founded },
    { label: "Country", value: brand.country },
    {
      label: "Website",
      value: brand.website,
      href: websiteUrl,
    },
    { label: "Instagram", value: brand.instagramFollowers },
    { label: "Products", value: `${brand.productCount}+` },
  ] as const;

  return (
    <section
      aria-labelledby="brand-info-heading"
      className="mt-12 mb-16"
    >
      <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
        Brand Overview
      </p>
      <h2
        id="brand-info-heading"
        className="mb-8 font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
      >
        Brand <span className="text-[#FF5FA2] italic">Information</span>
      </h2>

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#FFD6E8] bg-[#FFEAF4] p-4 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <dt className="font-sans text-[11px] text-[#9B8B97]">
              {stat.label}
            </dt>
            <dd className="mt-1 font-display text-[22px] font-bold text-[#FF5FA2]">
              {"href" in stat && stat.href ? (
                <Link
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#E84D91] focus-visible:outline-none"
                >
                  {stat.value}
                </Link>
              ) : (
                stat.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
