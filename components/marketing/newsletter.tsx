"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Check, Mail } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/components/layout/container";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { unsplashImage } from "@/lib/images";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    startTransition(async () => {
      const result = await subscribeToNewsletter(email, "newsletter-section");

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        toast.success(
          result.alreadySubscribed
            ? "You're already on the list!"
            : "You're in! Watch your inbox for exclusive beauty deals."
        );
        return;
      }

      toast.error(result.error ?? "Something went wrong. Please try again.");
    });
  }

  return (
    <section className="bg-[#FFF9FC] py-8 sm:py-10 dark:bg-[#1A0D13]" aria-labelledby="newsletter-heading">
      <Container>
        <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF5FA2] via-[#FF6DAA] to-[#FFB8D8] p-6 sm:gap-12 sm:p-10 lg:grid-cols-[1fr_420px] lg:gap-16 lg:p-16">
          <div className="absolute inset-0 opacity-[0.07]">
            <Image
              src={unsplashImage("photo-1631730486572-226d1f595b68", 1300, 320)}
              alt=""
              width={1300}
              height={320}
              sizes="100vw"
              quality={80}
              className="h-full w-full object-cover"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute -top-20 -right-20 hidden h-72 w-72 rounded-full bg-white/10 sm:block" />
          <div className="relative z-10">
            <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-white/75 uppercase">
              Stay in the Loop
            </p>
            <h2
              id="newsletter-heading"
              className="mb-4 font-display text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-[48px]"
            >
              Get Exclusive
              <br />
              <span className="italic">Beauty Deals</span>
            </h2>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-white/75 sm:text-[15px]">
              Join 2M+ beauty lovers. Curated deals, new arrivals, and price drop
              alerts — straight to your inbox.
            </p>
          </div>
          <div className="relative z-10 w-full">
            {submitted ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-xl sm:p-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEAF4]">
                  <Check size={24} className="text-[#FF5FA2]" aria-hidden />
                </div>
                <h3 className="mb-1.5 font-display text-xl font-bold text-[#2F2F2F] sm:text-[22px]">
                  You&apos;re In!
                </h3>
                <p className="font-sans text-[13px] text-[#9B8B97]">
                  Watch your inbox for exclusive beauty deals.
                </p>
              </div>
            ) : (
              <form
                className="w-full rounded-2xl border border-white/30 bg-white/20 p-5 backdrop-blur-sm sm:p-6"
                aria-describedby="newsletter-disclaimer"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={isPending}
                    aria-describedby="newsletter-disclaimer"
                    className="w-full rounded-xl border-0 bg-white px-5 py-4 font-sans text-[13px] text-[#2F2F2F] placeholder-[#9B8B97] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none disabled:opacity-70"
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    aria-label="Subscribe to newsletter"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F2F2F] py-4 font-sans text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-70"
                  >
                    <Mail size={14} aria-hidden />
                    {isPending ? "Subscribing..." : "Subscribe for Free"}
                  </button>
                </div>
                <p
                  id="newsletter-disclaimer"
                  className="mt-3 text-center font-sans text-[11px] text-white/65"
                >
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
