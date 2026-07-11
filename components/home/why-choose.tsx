import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { HOW_IT_WORKS_STEPS } from "@/lib/mock/how-it-works";

export function WhyChooseSection() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-gradient-to-br from-[#FF5FA2] via-[#FF79B0] to-[#FFB8D8] py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-white/70 uppercase">
            Simple · Smart · Beautiful
          </p>
          <h2
            id="why-choose-heading"
            className="font-display text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[52px]"
          >
            How <span className="italic">Glowvelle</span> Works
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className="relative rounded-3xl border border-white/25 bg-white/15 p-6 backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:p-9"
              >
                <div className="absolute top-4 right-4 font-display text-5xl leading-none font-bold text-white/8 select-none sm:right-6 sm:text-[80px]">
                  {step.num}
                </div>
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                  <Icon size={26} aria-hidden />
                </div>
                <h3 className="mb-3 font-display text-[24px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] leading-relaxed text-white/75">
                  {step.desc}
                </p>
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 xl:flex">
                    <ChevronRight size={20} className="text-white/40" aria-hidden />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
