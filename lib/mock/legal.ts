export type LegalSection = {
  id: string;
  heading: string;
  content: string[];
};

export type LegalPageContent = {
  title: string;
  eyebrow: string;
  breadcrumbLabel: string;
  updated: string;
  contactEmail: string;
  sections: LegalSection[];
};

export const PRIVACY_POLICY: LegalPageContent = {
  title: "Privacy Policy",
  eyebrow: "Legal · Data Protection",
  breadcrumbLabel: "Privacy Policy",
  updated: "July 1, 2025",
  contactEmail: "legal@glowvelle.com",
  sections: [
    {
      id: "introduction",
      heading: "Introduction",
      content: [
        "Welcome to Glowvelle. We are committed to protecting your personal data and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our price comparison services.",
        "By using Glowvelle, you agree to the collection and use of information in accordance with this policy. We will never sell your personal data to third parties.",
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information We Collect",
      content: [
        "We collect information you provide directly to us: your email address when you subscribe to our newsletter, your search queries and product interactions to improve our recommendations, and any communications you send to our support team.",
        "We also collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and pages you view. This helps us understand how our platform is being used and improve it over time.",
        "We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      ],
    },
    {
      id: "how-we-use-your-information",
      heading: "How We Use Your Information",
      content: [
        "We use the information we collect to provide, maintain, and improve our services; personalise your experience on Glowvelle; send you newsletters and marketing communications (with your consent); process affiliate commissions; and comply with legal obligations.",
        "We analyse aggregate data about our users to understand which products and features are most useful, improve our price comparison algorithms, and develop new features.",
      ],
    },
    {
      id: "sharing-your-information",
      heading: "Sharing Your Information",
      content: [
        "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist in our operations (such as email service providers and analytics platforms), provided they agree to keep this information confidential.",
        "We may disclose your information when required by law, court order, or government regulation, or to protect the rights, property, or safety of Glowvelle, our users, or the public.",
      ],
    },
    {
      id: "cookies-and-tracking",
      heading: "Cookies & Tracking",
      content: [
        "Glowvelle uses essential cookies required for platform functionality, analytics cookies to understand user behaviour (via Google Analytics), and affiliate tracking cookies that allow us to earn commissions when you purchase through our links.",
        "You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our platform.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your Rights",
      content: [
        "Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your personal information; the right to object to or restrict certain processing; and the right to data portability.",
        "To exercise any of these rights, please contact us at legal@glowvelle.com. We will respond to your request within 30 days.",
      ],
    },
    {
      id: "contact-us",
      heading: "Contact Us",
      content: [
        "If you have questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at legal@glowvelle.com or write to us at 120 5th Avenue, New York, NY 10001.",
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalPageContent = {
  title: "Terms of Service",
  eyebrow: "Legal · Terms & Conditions",
  breadcrumbLabel: "Terms of Service",
  updated: "July 1, 2025",
  contactEmail: "legal@glowvelle.com",
  sections: [
    {
      id: "acceptance-of-terms",
      heading: "Acceptance of Terms",
      content: [
        "By accessing and using Glowvelle ('the Platform'), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.",
        "We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.",
      ],
    },
    {
      id: "use-of-the-platform",
      heading: "Use of the Platform",
      content: [
        "Glowvelle is a beauty price comparison platform. We aggregate publicly available pricing information from third-party retailers including Amazon, Walmart, eBay, and official brand stores. We do not sell products directly.",
        "You may use Glowvelle for personal, non-commercial purposes only. You may not use the platform in any way that could damage, disable, overburden, or impair our servers or networks.",
      ],
    },
    {
      id: "price-accuracy-and-disclaimer",
      heading: "Price Accuracy & Disclaimer",
      content: [
        "While we strive to maintain accurate and up-to-date pricing information, we cannot guarantee that prices shown on Glowvelle are always current or accurate. Prices on third-party retailer websites may change at any time.",
        "Always verify the final price on the retailer's own website before completing a purchase. Glowvelle is not responsible for any discrepancies between prices shown on our platform and those charged by retailers.",
      ],
    },
    {
      id: "affiliate-links",
      heading: "Affiliate Links",
      content: [
        "Glowvelle participates in affiliate marketing programs. When you click on a retailer link and make a purchase, we may earn a commission. This is disclosed in our Affiliate Disclosure page and does not affect the price you pay.",
        "Our editorial content and product recommendations are never influenced by affiliate relationships. We always recommend the best deals regardless of commission rates.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual Property",
      content: [
        "All content on Glowvelle, including text, graphics, logos, and software, is the property of Glowvelle or its content suppliers and is protected by intellectual property laws.",
        "Product names, brand logos, and trademarks belong to their respective owners. Their use on Glowvelle is for identification and informational purposes only.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of Liability",
      content: [
        "To the maximum extent permitted by law, Glowvelle shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.",
        "Our total liability for any claims arising from your use of Glowvelle shall not exceed the amount you have paid us in the twelve months preceding the claim (which, as our platform is free, is $0).",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing Law",
      content: [
        "These Terms of Service are governed by the laws of the State of New York, United States, without regard to conflict of law provisions.",
        "Any disputes arising from these terms shall be resolved through binding arbitration in New York City, NY.",
      ],
    },
  ],
};

export const AFFILIATE_DISCLOSURE: LegalPageContent = {
  title: "Affiliate Disclosure",
  eyebrow: "Legal · Transparency",
  breadcrumbLabel: "Affiliate Disclosure",
  updated: "July 1, 2025",
  contactEmail: "affiliate@glowvelle.com",
  sections: [
    {
      id: "our-commitment-to-transparency",
      heading: "Our Commitment to Transparency",
      content: [
        "Glowvelle believes in complete transparency. This Affiliate Disclosure explains how we earn revenue and how it may (or may not) affect our content and recommendations.",
        "We are a participant in affiliate marketing programs with Amazon Associates, Walmart Affiliate Program, eBay Partner Network, and various direct brand affiliate programs.",
      ],
    },
    {
      id: "how-affiliate-links-work",
      heading: "How Affiliate Links Work",
      content: [
        "When you click on a 'Shop Now' or 'View Deal' link on Glowvelle and subsequently make a purchase on the retailer's website, we may receive a small commission from that retailer.",
        "This commission is paid by the retailer — NOT by you. The price you pay at checkout is exactly the same whether you came through Glowvelle or found the product yourself. We never inflate prices to cover our commissions.",
      ],
    },
    {
      id: "does-this-affect-our-recommendations",
      heading: "Does This Affect Our Recommendations?",
      content: [
        "No. Our editorial decisions — which products we feature, which deals we highlight, which brands we showcase — are made entirely on the basis of quality, relevance, and value to our users.",
        "We do not accept payment from brands to feature their products. We do not rank products based on commission rates. The best deal is always the one we recommend, regardless of who pays us more.",
        "Our beauty editors and curation team are entirely separate from our partnerships team. Editorial independence is fundamental to our model.",
      ],
    },
    {
      id: "which-retailers-we-work-with",
      heading: "Which Retailers We Work With",
      content: [
        "We currently have affiliate relationships with Amazon, Walmart, eBay, Charlotte Tilbury, NARS, Fenty Beauty, Drunk Elephant, La Mer, Rare Beauty, Tatcha, and Dyson, among others.",
        "We compare prices from ALL of these retailers regardless of our affiliate relationships with them. If the best deal is at a retailer we don't have an affiliate agreement with, we still show it and link to it — we just don't earn a commission on that particular link.",
      ],
    },
    {
      id: "ftc-compliance",
      heading: "FTC Compliance",
      content: [
        "In accordance with the FTC's guidelines on endorsements and testimonials, we clearly disclose our affiliate relationships on this page, in our footer, and at relevant points throughout the platform.",
        "If you have any questions about our affiliate relationships or this disclosure, please contact us at affiliate@glowvelle.com.",
      ],
    },
  ],
};
