import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Stars } from "@/components/marketing/stars";
import { unsplashImage } from "@/lib/images";
import { TESTIMONIALS } from "@/lib/mock/home";

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-[#200F18]"
    >
      <Container>
        <div className="mb-14 text-center">
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Community Love
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
          >
            Real Savings,{" "}
            <span className="text-[#FF5FA2] italic">Real Women</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="relative overflow-hidden rounded-3xl border border-[#FFD6E8] bg-[#FFF9FC] p-8 dark:border-[#3A2530] dark:bg-[#2A1520]"
            >
              <div
                className="pointer-events-none absolute top-5 right-7 font-display text-5xl leading-none text-[#FFD6E8] select-none sm:text-[80px] dark:text-[#3A2530]"
                aria-hidden
              >
                &ldquo;
              </div>
              <div className="mb-5 flex items-center gap-3.5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#FFD6E8]">
                  <Image
                    src={unsplashImage(testimonial.avatar, 48, 48)}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    quality={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption>
                  <div className="font-sans text-[13px] font-semibold text-[#2F2F2F] dark:text-white">
                    {testimonial.name}
                  </div>
                  <Stars rating={testimonial.rating} size={10} />
                </figcaption>
              </div>
              <blockquote className="relative z-10 mb-5 font-sans text-[13px] leading-relaxed text-[#9B8B97] dark:text-white/55">
                {testimonial.text}
              </blockquote>
              <div className="flex items-center justify-between border-t border-[#FFD6E8] pt-4 dark:border-[#3A2530]">
                <div className="font-sans text-[11px] text-[#9B8B97]">
                  on {testimonial.product}
                </div>
                <div className="rounded-full bg-[#FFEAF4] px-3 py-1 font-sans text-[11px] font-bold text-[#FF5FA2] dark:bg-[#3A2530]">
                  Saved {testimonial.savings}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
