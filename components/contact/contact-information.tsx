import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  CONTACT_INFO_ITEMS,
  CONTACT_MAP,
} from "@/lib/mock/contact";
import { SOCIAL_LINKS } from "@/config/site";
import { unsplashImage } from "@/lib/images";

const iconMap = {
  email: Mail,
  phone: Phone,
  office: MapPin,
} as const;

export function ContactInformation() {
  return (
    <aside aria-label="Contact information" className="space-y-5">
      {CONTACT_INFO_ITEMS.map((item) => {
        const Icon = iconMap[item.id];

        return (
          <div
            key={item.id}
            className="flex items-start gap-4 rounded-2xl border border-[#FFD6E8] bg-white p-6 transition-all hover:shadow-lg hover:shadow-[#FF5FA2]/5 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEAF4] text-[#FF5FA2] dark:bg-[#3A2530]">
              <Icon size={20} aria-hidden />
            </div>
            <div>
              <div className="mb-0.5 font-sans text-[14px] font-semibold text-[#2F2F2F] dark:text-white">
                {item.title}
              </div>
              <div className="font-display text-[16px] font-bold text-[#FF5FA2]">
                {item.info}
              </div>
              <div className="mt-0.5 font-sans text-[11px] text-[#9B8B97]">
                {item.sub}
              </div>
            </div>
          </div>
        );
      })}

      <div className="relative h-52 overflow-hidden rounded-2xl border border-[#FFD6E8] bg-[#FFD6E8] dark:border-[#3A2530] dark:bg-[#2A1520]">
        <Image
          src={unsplashImage(CONTACT_MAP.imageId, 560, 208)}
          alt=""
          width={560}
          height={208}
          sizes="100vw"
          quality={80}
          className="h-full w-full object-cover opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-[#FF5FA2] px-4 py-2 font-sans text-[12px] font-semibold text-white">
            <MapPin size={13} aria-hidden />
            {CONTACT_MAP.label}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#FFD6E8] bg-white p-6 dark:border-[#3A2530] dark:bg-[#2A1520]">
        <h3 className="mb-4 font-display text-[18px] font-bold text-[#2F2F2F] dark:text-white">
          Follow Us
        </h3>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.abbr}
              href={social.href}
              aria-label={`Follow Glowvelle on ${social.label}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFEAF4] text-[10px] font-bold text-[#FF5FA2] transition-all hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none dark:bg-[#3A2530]"
            >
              {social.abbr}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
