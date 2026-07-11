export const SITE_NAME = "Glowvelle";

export const SITE_DESCRIPTION =
  "The world's most beautiful beauty price comparison platform. Find the best deals on luxury skincare, makeup, haircare and more.";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://glowvelle.com";

/** SEO reuse — canonical site origin for metadata, sitemap, and JSON-LD. */
export const SITE_ORIGIN = SITE_URL.replace(/\/$/, "");

/** Default relative OG image path (falls back to Unsplash in metadata helpers). */
export const DEFAULT_OG_IMAGE = "/og-default.png";

/** Twitter/X handle without @ — empty until account is configured. */
export const TWITTER_HANDLE = "";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop" },
  { label: "Brands", href: "/brands" },
  { label: "Deals", href: "/deals" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_CATEGORIES = [
  "Skincare",
  "Makeup",
  "Haircare",
  "Fragrance",
  "Nail Care",
  "Beauty Tools",
] as const;

export const FOOTER_RETAILERS = [
  "Amazon",
  "Walmart",
  "eBay",
  "Official Stores",
  "Ulta Beauty",
  "Sephora",
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Affiliate Disclosure", href: "/affiliate" },
  { label: "Cookie Policy", href: "/privacy" },
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
] as const;

export const FOOTER_BOTTOM_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Affiliate", href: "/affiliate" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", abbr: "IG", href: "#" },
  { label: "TikTok", abbr: "TK", href: "#" },
  { label: "Pinterest", abbr: "PT", href: "#" },
  { label: "YouTube", abbr: "YT", href: "#" },
] as const;

export const CONTACT = {
  email: "glowvelle9@gmail.com",
  address: "New York, NY 10001, USA",
} as const;
