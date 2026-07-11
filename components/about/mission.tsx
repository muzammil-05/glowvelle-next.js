import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/marketing/section-header";
import { ABOUT_MISSION } from "@/lib/mock/about";

export function Mission() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="border-b border-[#FFD6E8] bg-white py-16 sm:py-20 lg:py-24 dark:border-[#3A2530] dark:bg-[#200F18]"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            center
            headingId="mission-heading"
            eyebrow={ABOUT_MISSION.eyebrow}
            heading={
              <>
                {ABOUT_MISSION.heading}{" "}
                <span className="text-[#FF5FA2] italic">{ABOUT_MISSION.headingAccent}</span>
              </>
            }
            className="mb-8"
          />
          <p className="font-display text-[22px] leading-relaxed text-[#2F2F2F] italic dark:text-white/85">
            {ABOUT_MISSION.statement}
          </p>
        </div>
      </Container>
    </section>
  );
}
