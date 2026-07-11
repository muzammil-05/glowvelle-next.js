import type { Metadata } from "next";

import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInformation } from "@/components/contact/contact-information";
import { Container } from "@/components/layout/container";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { createPageMetadata } from "@/lib/seo";

// Static marketing page — long-lived content, hourly ISR is sufficient.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with the Glowvelle team. Questions about price comparisons, partnerships, press, or support — we reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <ContactHero />

      <Container className="py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />
          <ContactInformation />
        </div>
      </Container>

      <Container className="pb-24">
        <ContactFaq />
      </Container>

      <LazyNewsletter />
    </div>
  );
}
