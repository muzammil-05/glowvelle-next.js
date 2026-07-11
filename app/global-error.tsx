"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#FFF9FC] px-4 antialiased dark:bg-[#1A0D13]">
        <main className="max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFEAF4]">
            <AlertCircle size={28} className="text-[#FF5FA2]" aria-hidden />
          </div>
          <h1 className="mb-3 font-display text-3xl font-bold text-[#2F2F2F] dark:text-white">
            Unexpected error
          </h1>
          <p className="mb-8 font-sans text-[15px] leading-relaxed text-[#9B8B97]">
            Glowvelle ran into a problem. Please refresh the page or return home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
            >
              <RefreshCw size={14} aria-hidden />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#FFD6E8] bg-[#FFEAF4] px-7 py-3.5 font-sans text-[13px] font-semibold text-[#FF5FA2] hover:border-[#FF5FA2] hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
            >
              <Home size={14} aria-hidden />
              Back to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
