import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/container";
import {
  CONTACT,
  FOOTER_BOTTOM_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_RETAILERS,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
} from "@/config/site";
import type { Category } from "@/types";

type SiteFooterProps = {
  categories: Category[];
};

export function SiteFooter({ categories }: SiteFooterProps) {
  return (
    <footer className="bg-[#2F2F2F] dark:bg-[#0D0609]">
      <Container className="pt-12 pb-8 sm:pt-16">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:mb-14 lg:grid-cols-5">
          <div>
            <Link href="/" aria-label="Glowvelle home" className="mb-5 flex items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5FA2]">
                <Sparkles size={15} className="text-white" />
              </div>
              <span className="font-display text-[26px] leading-none font-bold text-white">
                Glow<span className="text-[#FF5FA2]">velle</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm font-sans text-[13px] leading-relaxed text-white/45 sm:max-w-[230px]">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={`Follow Glowvelle on ${social.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-sans text-[10px] font-bold text-white/60 transition-all duration-200 hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
                >
                  {social.abbr}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[14px] font-bold text-white">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/shop/${category.slug}`}
                    className="font-sans text-[13px] text-white/45 transition-colors duration-200 hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[14px] font-bold text-white">
              Retailers
            </h4>
            <ul className="space-y-3">
              {FOOTER_RETAILERS.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="font-sans text-[13px] text-white/45 transition-colors duration-200 hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[14px] font-bold text-white">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] text-white/45 transition-colors duration-200 hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-display text-[14px] font-bold text-white">
              Get in Touch
            </h4>
            <ul className="mb-6 space-y-3">
              <li className="flex items-start gap-2 font-sans text-[13px] text-white/45">
                <Mail size={13} className="mt-0.5 shrink-0 text-[#FF5FA2]" />
                {CONTACT.email}
              </li>
              <li className="flex items-start gap-2 font-sans text-[13px] text-white/45">
                <MapPin size={13} className="mt-0.5 shrink-0 text-[#FF5FA2]" />
                {CONTACT.address}
              </li>
            </ul>
            <div className="rounded-2xl border border-[#FF5FA2]/20 bg-[#FF5FA2]/10 p-4">
              <p className="font-sans text-[11px] leading-relaxed text-white/50">
                <Link
                  href="/affiliate"
                  className="font-semibold text-[#D8B36A] transition-colors hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
                >
                  Affiliate Disclosure:
                </Link>{" "}
                Glowvelle earns a commission on purchases made through our links
                at no extra cost to you.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-[12px] text-white/30">
            © 2025 Glowvelle. All rights reserved. Made with ♥ for beauty
            lovers everywhere.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {FOOTER_BOTTOM_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-sans text-[12px] text-white/30 transition-colors hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
