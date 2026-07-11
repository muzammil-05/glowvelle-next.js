"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type ProductErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductError({ error, reset }: ProductErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center bg-[#FFF9FC] py-16 dark:bg-[#1A0D13]">
      <Container className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFEAF4] dark:bg-[#2A1520]">
          <AlertCircle size={28} className="text-[#FF5FA2]" aria-hidden />
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold text-[#2F2F2F] dark:text-white">
          Couldn&apos;t load this product
        </h1>
        <p className="mb-8 font-sans text-[15px] leading-relaxed text-[#9B8B97] dark:text-white/55">
          We had trouble loading product details. Please try again, or browse
          all beauty products in our shop.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            onClick={reset}
            className="h-auto gap-2 rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2"
          >
            <RefreshCw size={14} aria-hidden />
            Try Again
          </Button>
          <Button
            nativeButton={false}
            render={
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-7 py-3.5 font-sans text-[13px] font-semibold text-[#FF5FA2] hover:border-[#FF5FA2] hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 dark:border-[#3A2530] dark:bg-[#2A1520]"
              />
            }
          >
            <Home size={14} aria-hidden />
            Back to Shop
          </Button>
        </div>
      </Container>
    </div>
  );
}
