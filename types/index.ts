export type NavLink = {
  label: string;
  href: string;
};

export interface StorePrice {
  store: string;
  price: number;
  originalPrice: number | null;
  inStock: boolean;
  prime: boolean;
  color: string;
  affiliateUrl?: string;
  websiteUrl?: string;
  /** Tracking: affiliate store UUID (present on detail-page offers). */
  storeId?: string;
  /** Tracking: affiliate_links row id when available. */
  affiliateLinkId?: string | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string | null;
  isDefault: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  bestPrice: number;
  originalPrice: number;
  savings: number;
  prices: StorePrice[];
  description: string;
  benefits: string[];
  ingredients: string;
  howToUse: string[];
  specifications: ProductSpecification[];
  /** Detail page: ordered gallery from product_images. */
  galleryImages?: string[];
  /** Detail page: labels from product_tags. */
  tags?: string[];
  /** Detail page: options from product_variants. */
  variants?: ProductVariant[];
  /** Detail page: avoids extra category lookup for related products. */
  categoryId?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BrandData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  founded: string;
  country: string;
  image: string;
  website: string;
  instagramFollowers: string;
  productCount: number;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  count: number;
  description?: string | null;
}

export type PopularCategory = {
  name: string;
  icon: string;
  slug: string;
  count: number;
};

export interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
  savings: string;
}

export interface Deal {
  label: string;
  product: Product;
  saving: string;
  from: string;
}

export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryId: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  content?: string[];
  sections?: BlogSection[];
  faq?: FaqItem[];
}
