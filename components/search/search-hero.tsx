import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { SEARCH_HERO } from "@/lib/search/constants";

export function SearchHero() {
  return (
    <section
      aria-labelledby="search-hero-title"
      className="border-b border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#200F18]"
    >
      <Container className="py-10">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />
        <div className="mt-5">
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            {SEARCH_HERO.eyebrow}
          </p>
          <h1
            id="search-hero-title"
            className="font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
          >
            {SEARCH_HERO.title}{" "}
            <span className="text-[#FF5FA2] italic">{SEARCH_HERO.titleAccent}</span>
          </h1>
          <p className="mt-3 max-w-xl font-sans text-[14px] leading-relaxed text-[#9B8B97] dark:text-white/55">
            {SEARCH_HERO.subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
}
