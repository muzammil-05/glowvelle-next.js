export type ReferenceStatus = "active" | "inactive";

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  description: string | null;
  sort_order: number;
  status: ReferenceStatus;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface BrandRow {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  founded: string | null;
  country: string | null;
  image_url: string | null;
  website: string | null;
  instagram_followers: string | null;
  status: ReferenceStatus;
  created_at: string;
  updated_at: string;
}

export type ProductStatus = "draft" | "published" | "archived";

export interface ProductRow {
  id: string;
  brand_id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  ingredients: string | null;
  rating: number | null;
  review_count: number;
  badge: string | null;
  badge_color: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductImageRow {
  id?: string;
  product_id?: string;
  variant_id?: string | null;
  image_url: string;
  alt_text?: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariantRow {
  id: string;
  product_id?: string;
  name: string;
  sku: string | null;
  is_default: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductTagRow {
  id?: string;
  product_id?: string;
  tag: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductPriceRow {
  id?: string;
  product_id?: string;
  variant_id?: string | null;
  store_id?: string;
  price: number;
  original_price: number | null;
  currency?: string;
  in_stock: boolean;
  is_prime: boolean;
  last_checked_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AffiliateStoreRow {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  brand_color: string | null;
  website_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AffiliateLinkRow {
  id: string;
  product_id: string;
  variant_id: string | null;
  store_id: string;
  affiliate_url: string;
  external_product_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductPriceWithStoreRow extends ProductPriceRow {
  affiliate_stores:
    | Pick<AffiliateStoreRow, "name" | "brand_color">
    | Pick<AffiliateStoreRow, "name" | "brand_color">[]
    | null;
}

export interface ProductQueryRow extends ProductRow {
  brands: Pick<BrandRow, "name" | "slug"> | Pick<BrandRow, "name" | "slug">[] | null;
  categories:
    | Pick<CategoryRow, "name" | "slug">
    | Pick<CategoryRow, "name" | "slug">[]
    | null;
  product_images: ProductImageRow[] | null;
  product_prices: ProductPriceWithStoreRow[] | null;
}

export interface ProductDetailQueryRow extends ProductQueryRow {
  product_variants: ProductVariantRow[] | null;
  product_tags: ProductTagRow[] | null;
  affiliate_links: AffiliateLinkRow[] | null;
}

export type BlogPostStatus = "draft" | "published" | "archived";

export interface BlogCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogAuthorRow {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostRow {
  id: string;
  author_id: string;
  blog_category_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  content: unknown;
  read_time_minutes: number | null;
  published_at: string | null;
  is_featured: boolean;
  status: BlogPostStatus;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostQueryRow extends BlogPostRow {
  blog_authors:
    | Pick<BlogAuthorRow, "name" | "slug" | "avatar_url">
    | Pick<BlogAuthorRow, "name" | "slug" | "avatar_url">[]
    | null;
  blog_categories:
    | Pick<BlogCategoryRow, "name" | "slug">
    | Pick<BlogCategoryRow, "name" | "slug">[]
    | null;
}

export interface NewsletterSubscriberRow {
  id: string;
  email: string;
  subscribed_at: string;
  source: string | null;
  consent_marketing: boolean;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingRow {
  key: string;
  value: unknown;
  updated_at: string;
}

export interface AffiliateClickRow {
  id: string;
  affiliate_link_id: string | null;
  product_id: string;
  product_variant_id: string | null;
  store_id: string;
  clicked_at: string;
  session_id: string | null;
  referrer: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  country: string | null;
  device_type: string | null;
  created_at: string;
}
