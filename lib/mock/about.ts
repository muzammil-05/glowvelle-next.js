import type { LucideIcon } from "lucide-react";
import { Award, Globe, Heart, Shield } from "lucide-react";

export type AboutTrustFeature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export const ABOUT_HERO = {
  eyebrow: "Our Story",
  title: "Beauty Without the",
  titleAccent: "Compromise",
  subtitle:
    "Glowvelle was built for women who deserve both luxury and transparency — beautiful products at the best possible prices, all in one place.",
  imageId: "photo-1522108098940-de49801b5b40",
} as const;

export const OUR_STORY = {
  eyebrow: "How We Started",
  heading: "A Problem Every Beauty Lover Knows",
  paragraphs: [
    "Our co-founder Sofia was a beauty director who spent years recommending luxury products to millions of readers — yet she constantly found herself frustrated. The same Charlotte Tilbury serum could be $23 cheaper on eBay than on the official website. Why did no one make it easy to find this?",
    "In 2023, Sofia and Amara built the first version of Glowvelle over a weekend. Within six months, over a million women had used it to save money on their beauty purchases. Today, Glowvelle is the world's most beautiful beauty price comparison platform.",
  ],
  imageId: "photo-1779056904689-ff99fd0045a4",
  statValue: "2M+",
  statLabel: "Women served monthly",
} as const;

export const ABOUT_MISSION = {
  eyebrow: "What We Stand For",
  heading: "Our",
  headingAccent: "Mission",
  statement:
    "We believe every woman deserves access to luxury beauty without compromise — transparent pricing, trusted retailers, and editorial integrity at every step. Glowvelle exists to make smart beauty shopping effortless, beautiful, and free.",
} as const;

export const TRUST_FEATURES: AboutTrustFeature[] = [
  {
    icon: Shield,
    title: "Transparency",
    desc: "We always disclose affiliate relationships and never let commissions influence our editorial recommendations.",
  },
  {
    icon: Heart,
    title: "Inclusivity",
    desc: "Beauty belongs to everyone. We curate products for all skin tones, types, budgets and backgrounds.",
  },
  {
    icon: Award,
    title: "Quality First",
    desc: "Every brand and product on Glowvelle is vetted by our beauty editors before it's listed on the platform.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    desc: "We actively highlight brands with sustainable practices and cruelty-free certifications throughout our platform.",
  },
];

export const COMPARISON_PROCESS = {
  eyebrow: "Simple · Smart · Beautiful",
  heading: "Beauty Comparison",
  headingAccent: "Process",
} as const;

export const ABOUT_CTA = {
  title: "Ready to Find Your Best Beauty Price?",
  description:
    "Browse 50,000+ luxury products and compare prices across Amazon, Walmart, eBay, and official brand stores — all in one beautiful place.",
  shopLabel: "Shop All Products",
  dealsLabel: "View Today's Deals",
} as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sofia Chen",
    role: "Co-Founder & CEO",
    image: "photo-1581182800629-7d90925ad072",
    bio: "Former beauty director at Vogue, Sofia co-founded Glowvelle to solve a problem she faced every day: why should finding the best price for luxury beauty be so hard?",
  },
  {
    name: "Isabelle Martin",
    role: "Head of Beauty Curation",
    image: "photo-1551184451-76b762941ad6",
    bio: "With 12 years as a professional makeup artist and beauty editor, Isabelle ensures that every product on Glowvelle meets our uncompromising quality standard.",
  },
  {
    name: "Amara Johnson",
    role: "Chief Technology Officer",
    image: "photo-1577746838851-816a43ca8733",
    bio: "A former senior engineer at Google, Amara built the real-time price comparison engine that checks over 50,000 products across 4 retailers every 24 hours.",
  },
  {
    name: "Lily Parker",
    role: "Head of Content & Community",
    image: "photo-1522108098940-de49801b5b40",
    bio: "Beauty journalist and skincare enthusiast, Lily leads our editorial team to create trustworthy, expert-led content that helps millions of women make smarter beauty decisions.",
  },
];
