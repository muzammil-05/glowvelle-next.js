import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { CONTACT_HERO } from "@/lib/mock/contact";

export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-title"
      className="border-b border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#200F18]"
    >
      <Container className="py-12">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        />
        <div className="mt-5">
          <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            {CONTACT_HERO.eyebrow}
          </p>
          <h1
            id="contact-hero-title"
            className="font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl md:text-5xl lg:text-[60px] dark:text-white"
          >
            {CONTACT_HERO.title}{" "}
            <span className="text-[#FF5FA2] italic">{CONTACT_HERO.titleAccent}</span>
          </h1>
        </div>
      </Container>
    </section>
  );
}
