import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/marketing/section-header";
import { TRUST_FEATURES } from "@/lib/mock/about";

export function WhyTrustGlowvelle() {
  return (
    <section
      aria-labelledby="why-trust-heading"
      className="border-b border-[#FFD6E8] py-16 sm:py-20 lg:py-24 dark:border-[#3A2530]"
    >
      <Container>
        <SectionHeader
          center
          headingId="why-trust-heading"
          eyebrow="Why Trust Glowvelle"
          heading={
            <>
              Built on <span className="text-[#FF5FA2] italic">Trust</span>
            </>
          }
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRUST_FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-[#FFD6E8] bg-white p-8 transition-all hover:shadow-xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFEAF4] text-[#FF5FA2] dark:bg-[#3A2530]">
                  <Icon size={28} aria-hidden />
                </div>
                <h3 className="mb-2 font-display text-[20px] font-bold text-[#2F2F2F] dark:text-white">
                  {feature.title}
                </h3>
                <p className="font-sans text-[13px] leading-relaxed text-[#9B8B97] dark:text-white/55">
                  {feature.desc}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
