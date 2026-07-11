import type { Testimonial } from "@/types";

export const HERO_STATS = [
  { value: "50K+", label: "Products Compared" },
  { value: "4", label: "Top Retailers" },
  { value: "$2M+", label: "Saved by Users" },
] as const;

export const TRUST_RETAILERS = [
  { name: "Amazon", color: "#FF9900", dot: "#FF9900" },
  { name: "Walmart", color: "#0071CE", dot: "#0071CE" },
  { name: "eBay", color: "#E53238", dot: "#E53238" },
  { name: "Official Stores", color: "#2F2F2F", dot: "#2F2F2F" },
] as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie M.",
    avatar: "photo-1494790108377-be9c29b29330",
    rating: 5,
    text: "Glowvelle saved me over $40 on my Charlotte Tilbury order. I had no idea eBay had it cheaper — now I check here before every purchase.",
    product: "Charlotte Tilbury Magic Cream",
    savings: "$22.01",
  },
  {
    name: "Amara K.",
    avatar: "photo-1438761681033-6461ffad8d80",
    rating: 5,
    text: "Finally a beauty site that doesn't feel like a spreadsheet. Gorgeous design, real prices, and I trust every retailer they link to.",
    product: "NARS Radiant Concealer",
    savings: "$5.50",
  },
  {
    name: "Jess L.",
    avatar: "photo-1544005313-94ddf0286df2",
    rating: 5,
    text: "The deals page is my weekly ritual. Found my Dyson Airwrap $130 below retail. Absolute game changer for luxury beauty shopping.",
    product: "Dyson Airwrap Multi-Styler",
    savings: "$130.00",
  },
];
