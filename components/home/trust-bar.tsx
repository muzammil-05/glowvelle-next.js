import { Shield } from "lucide-react";

import { Container } from "@/components/layout/container";
import { TRUST_RETAILERS } from "@/lib/mock/home";

export function TrustBar() {
  return (
    <div
      className="border-y border-[#FFD6E8]/70 bg-white dark:border-[#3A2530] dark:bg-[#200F18]"
      aria-label="Trusted retailer partners"
    >
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:py-5">
        <span className="font-sans text-[11px] font-semibold tracking-[0.15em] text-[#9B8B97] uppercase">
          Comparing prices from
        </span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          {TRUST_RETAILERS.map((retailer) => (
            <div key={retailer.name} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: retailer.dot }}
                aria-hidden
              />
              <span
                className="font-sans text-sm font-bold sm:text-[15px]"
                style={{ color: retailer.color }}
              >
                {retailer.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-fit items-center gap-2 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-4 py-2 dark:border-[#3A2530] dark:bg-[#2A1520]">
          <Shield size={13} className="text-[#FF5FA2]" aria-hidden />
          <span className="font-sans text-[11px] font-semibold text-[#FF5FA2]">
            100% Trusted &amp; Verified
          </span>
        </div>
      </Container>
    </div>
  );
}
