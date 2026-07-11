import { FAQ_ITEMS } from "@/lib/mock/products";

export const CONTACT_HERO = {
  eyebrow: "We'd Love to Hear from You",
  title: "Get in",
  titleAccent: "Touch",
} as const;

export const CONTACT_SUBJECTS = [
  "Price comparison question",
  "Affiliate partnership",
  "Brand listing request",
  "Press & media",
  "Technical support",
  "Other",
] as const;

export const CONTACT_INFO_ITEMS = [
  {
    id: "email",
    title: "Email Us",
    info: "glowvelle9@gmail.com",
    sub: "We reply within 24 hours",
  },
  {
    id: "office",
    title: "Our Office",
    info: "120 5th Avenue, New York",
    sub: "NY 10001, United States",
  },
] as const;

export const CONTACT_MAP = {
  imageId: "photo-1779056904689-ff99fd0045a4",
  label: "New York, NY",
} as const;

export const CONTACT_FAQ = {
  eyebrow: "Got Questions?",
  description:
    "Everything you need to know about how Glowvelle works and how we find the best prices for you.",
  items: FAQ_ITEMS,
} as const;
