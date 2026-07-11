import type { LucideIcon } from "lucide-react";
import { Search, Shield, Tag } from "lucide-react";

export type HowItWorksStep = {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    num: "01",
    icon: Search,
    title: "Search & Discover",
    desc: "Browse 50,000+ premium beauty products from the world's most coveted brands, all in one curated place.",
  },
  {
    num: "02",
    icon: Tag,
    title: "Compare Prices",
    desc: "See prices from Amazon, Walmart, eBay, and official brand stores side by side — instantly and beautifully.",
  },
  {
    num: "03",
    icon: Shield,
    title: "Shop Confidently",
    desc: "Click through to your chosen retailer with complete confidence. Every link is verified and trusted.",
  },
];
