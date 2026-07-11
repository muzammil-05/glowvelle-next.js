import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { Container } from "@/components/layout/container";

export function BlogHero() {
  return (
    <div className="border-b border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#200F18]">
      <Container className="py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <div className="mt-5">
          <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Beauty Insights &amp; Guides
          </p>
          <h1 className="font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl md:text-5xl lg:text-[60px] dark:text-white">
            The <span className="text-[#FF5FA2] italic">Glowvelle</span> Journal
          </h1>
        </div>
      </Container>
    </div>
  );
}
