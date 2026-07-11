import { createAdminClient } from "@/lib/supabase/admin"
import { createStaticClient } from "@/lib/supabase/static"
import type {
  AffiliateLinkRow,
  AffiliateStoreRow,
  BlogAuthorRow,
  BlogCategoryRow,
  BlogPostQueryRow,
  BlogPostRow,
  BlogPostStatus,
  BrandRow,
  CategoryRow,
  NewsletterSubscriberRow,
  ProductDetailQueryRow,
  ProductImageRow,
  ProductPriceRow,
  ProductQueryRow,
  ProductStatus,
  ProductTagRow,
  ProductVariantRow,
  ReferenceStatus,
  SiteSettingRow,
} from "@/types/database"

import { handleDbError, safeQuery } from "./errors"
import { getRelation } from "./types"

export type AdminDataSource = "live" | "placeholder"

export type AdminListResult<T> = {
  items: T[]
  source: AdminDataSource
}

export type AdminProductListItem = {
  id: string
  name: string
  slug: string
  brand: string
  category: string
  status: ProductStatus
  rating: number
  reviews: number
  updatedAt: string
}

export type AdminBrandListItem = {
  id: string
  name: string
  slug: string
  country: string
  status: ReferenceStatus
  updatedAt: string
}

export type AdminCategoryListItem = {
  id: string
  name: string
  slug: string
  productCount: number
  sortOrder: number
  status: ReferenceStatus
  updatedAt: string
}

export type AdminBlogListItem = {
  id: string
  title: string
  slug: string
  category: string
  author: string
  status: BlogPostStatus
  featured: boolean
  publishedAt: string | null
  updatedAt: string
}

const ADMIN_PRODUCT_SELECT = `
  id,
  name,
  slug,
  status,
  rating,
  review_count,
  updated_at,
  brands!inner(name),
  categories!inner(name)
`

const ADMIN_BLOG_SELECT = `
  id,
  title,
  slug,
  status,
  is_featured,
  published_at,
  updated_at,
  blog_authors!inner(name),
  blog_categories!inner(name)
`

const PLACEHOLDER_PRODUCTS: AdminProductListItem[] = [
  {
    id: "placeholder-product-1",
    name: "Radiant Glow Serum",
    slug: "radiant-glow-serum",
    brand: "LumiSkin",
    category: "Serums",
    status: "published",
    rating: 4.8,
    reviews: 214,
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "placeholder-product-2",
    name: "Velvet Matte Lip Tint",
    slug: "velvet-matte-lip-tint",
    brand: "Rose & Co",
    category: "Makeup",
    status: "draft",
    rating: 4.5,
    reviews: 89,
    updatedAt: "2026-05-28T14:30:00Z",
  },
]

const PLACEHOLDER_BRANDS: AdminBrandListItem[] = [
  {
    id: "placeholder-brand-1",
    name: "LumiSkin",
    slug: "lumiskin",
    country: "France",
    status: "active",
    updatedAt: "2026-05-15T09:00:00Z",
  },
  {
    id: "placeholder-brand-2",
    name: "Rose & Co",
    slug: "rose-and-co",
    country: "United States",
    status: "inactive",
    updatedAt: "2026-04-20T11:00:00Z",
  },
]

const PLACEHOLDER_CATEGORIES: AdminCategoryListItem[] = [
  {
    id: "placeholder-category-1",
    name: "Serums",
    slug: "serums",
    productCount: 42,
    sortOrder: 1,
    status: "active",
    updatedAt: "2026-05-10T08:00:00Z",
  },
  {
    id: "placeholder-category-2",
    name: "Makeup",
    slug: "makeup",
    productCount: 67,
    sortOrder: 2,
    status: "active",
    updatedAt: "2026-05-10T08:00:00Z",
  },
]

const PLACEHOLDER_BLOG: AdminBlogListItem[] = [
  {
    id: "placeholder-blog-1",
    title: "Summer Skincare Essentials",
    slug: "summer-skincare-essentials",
    category: "Skincare",
    author: "Glowvelle Editorial",
    status: "published",
    featured: true,
    publishedAt: "2026-06-01T12:00:00Z",
    updatedAt: "2026-06-01T12:00:00Z",
  },
  {
    id: "placeholder-blog-2",
    title: "Ingredient Spotlight: Niacinamide",
    slug: "ingredient-spotlight-niacinamide",
    category: "Education",
    author: "Glowvelle Editorial",
    status: "draft",
    featured: false,
    publishedAt: null,
    updatedAt: "2026-05-25T16:00:00Z",
  },
]

function mapAdminProductRow(row: ProductQueryRow): AdminProductListItem {
  const brand = getRelation(row.brands)
  const category = getRelation(row.categories)

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brand: brand?.name ?? "—",
    category: category?.name ?? "—",
    status: row.status,
    rating: row.rating != null ? Number(row.rating) : 0,
    reviews: row.review_count,
    updatedAt: row.updated_at,
  }
}

function mapAdminBrandRow(row: BrandRow): AdminBrandListItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    country: row.country ?? "—",
    status: row.status,
    updatedAt: row.updated_at,
  }
}

function mapAdminCategoryRow(row: CategoryRow): AdminCategoryListItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    productCount: row.product_count,
    sortOrder: row.sort_order,
    status: row.status,
    updatedAt: row.updated_at,
  }
}

function mapAdminBlogRow(row: BlogPostQueryRow): AdminBlogListItem {
  const author = getRelation(row.blog_authors)
  const category = getRelation(row.blog_categories)

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: category?.name ?? "—",
    author: author?.name ?? "—",
    status: row.status,
    featured: row.is_featured,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  }
}

/** Read-only product list for admin table (service role — all statuses). */
export async function getAdminProducts(): Promise<
  AdminListResult<AdminProductListItem>
> {
  return safeQuery(
    "getAdminProducts",
    async () => {
      let supabase
      try {
        supabase = createAdminClient()
      } catch {
        supabase = createStaticClient()
      }

      const { data, error } = await supabase
        .from("products")
        .select(ADMIN_PRODUCT_SELECT)
        .order("updated_at", { ascending: false })

      if (handleDbError("getAdminProducts", error)) {
        return { items: PLACEHOLDER_PRODUCTS, source: "placeholder" }
      }

      const items = ((data as unknown as ProductQueryRow[]) ?? []).map(
        mapAdminProductRow
      )

      return { items, source: "live" }
    },
    { items: PLACEHOLDER_PRODUCTS, source: "placeholder" }
  )
}

/** Read-only brand list for admin table. */
export async function getAdminBrands(): Promise<AdminListResult<AdminBrandListItem>> {
  return safeQuery(
    "getAdminBrands",
    async () => {
      const supabase = createStaticClient()
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("name", { ascending: true })

      if (handleDbError("getAdminBrands", error)) {
        return { items: PLACEHOLDER_BRANDS, source: "placeholder" }
      }

      const items = ((data as BrandRow[]) ?? []).map(mapAdminBrandRow)
      return { items, source: "live" }
    },
    { items: PLACEHOLDER_BRANDS, source: "placeholder" }
  )
}

/** Read-only category list for admin table. */
export async function getAdminCategories(): Promise<
  AdminListResult<AdminCategoryListItem>
> {
  return safeQuery(
    "getAdminCategories",
    async () => {
      const supabase = createStaticClient()
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })

      if (handleDbError("getAdminCategories", error)) {
        return { items: PLACEHOLDER_CATEGORIES, source: "placeholder" }
      }

      const items = ((data as CategoryRow[]) ?? []).map(mapAdminCategoryRow)
      return { items, source: "live" }
    },
    { items: PLACEHOLDER_CATEGORIES, source: "placeholder" }
  )
}

/** Read-only blog post list for admin table. */
export async function getAdminBlogPosts(): Promise<
  AdminListResult<AdminBlogListItem>
> {
  return safeQuery(
    "getAdminBlogPosts",
    async () => {
      const supabase = createStaticClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select(ADMIN_BLOG_SELECT)
        .order("updated_at", { ascending: false })

      if (handleDbError("getAdminBlogPosts", error)) {
        return { items: PLACEHOLDER_BLOG, source: "placeholder" }
      }

      const items = ((data as unknown as BlogPostQueryRow[]) ?? []).map(
        mapAdminBlogRow
      )

      return { items, source: "live" }
    },
    { items: PLACEHOLDER_BLOG, source: "placeholder" }
  )
}

// ---------------------------------------------------------------------------
// Admin product detail + form dropdowns
// ---------------------------------------------------------------------------

export type AdminSelectOption = {
  id: string
  name: string
  slug: string
}

export type AdminAffiliateStoreOption = AdminSelectOption & {
  brandColor: string | null
}

export type AdminProductImage = {
  id: string
  imageUrl: string
  altText: string | null
  sortOrder: number
  isPrimary: boolean
}

export type AdminProductVariant = {
  id: string
  name: string
  sku: string | null
  isDefault: boolean
  sortOrder: number
}

export type AdminProductTag = {
  id: string
  tag: string
}

export type AdminAffiliateLink = {
  id: string
  storeId: string
  affiliateUrl: string
  externalProductId: string | null
  isActive: boolean
}

export type AdminProductPrice = {
  id: string
  storeId: string
  price: number
  originalPrice: number | null
  inStock: boolean
  isPrime: boolean
}

export type AdminProductDetail = {
  id: string
  name: string
  slug: string
  brandId: string
  categoryId: string
  brandName: string
  categoryName: string
  description: string | null
  ingredients: string | null
  rating: number | null
  reviewCount: number
  badge: string | null
  badgeColor: string | null
  status: ProductStatus
  images: AdminProductImage[]
  variants: AdminProductVariant[]
  tags: AdminProductTag[]
  affiliateLinks: AdminAffiliateLink[]
  prices: AdminProductPrice[]
}

const ADMIN_PRODUCT_DETAIL_SELECT = `
  *,
  brands!inner(id, name, slug),
  categories!inner(id, name, slug),
  product_images(*),
  product_variants(*),
  product_tags(*),
  affiliate_links(*),
  product_prices(*)
`

function mapAdminProductDetail(row: ProductDetailQueryRow): AdminProductDetail {
  const brand = getRelation(row.brands)
  const category = getRelation(row.categories)

  const images = (row.product_images ?? [])
    .map((img: ProductImageRow) => ({
      id: img.id!,
      imageUrl: img.image_url,
      altText: img.alt_text ?? null,
      sortOrder: img.sort_order,
      isPrimary: img.is_primary,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const variants = (row.product_variants ?? [])
    .map((v: ProductVariantRow) => ({
      id: v.id,
      name: v.name,
      sku: v.sku,
      isDefault: v.is_default,
      sortOrder: v.sort_order,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const tags = (row.product_tags ?? []).map((t: ProductTagRow) => ({
    id: t.id!,
    tag: t.tag,
  }))

  const affiliateLinks = (row.affiliate_links ?? []).map((l: AffiliateLinkRow) => ({
    id: l.id,
    storeId: l.store_id,
    affiliateUrl: l.affiliate_url,
    externalProductId: l.external_product_id,
    isActive: l.is_active,
  }))

  const prices = (row.product_prices ?? []).map((p: ProductPriceRow) => ({
    id: p.id!,
    storeId: p.store_id!,
    price: Number(p.price),
    originalPrice: p.original_price != null ? Number(p.original_price) : null,
    inStock: p.in_stock,
    isPrime: p.is_prime,
  }))

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    brandId: row.brand_id,
    categoryId: row.category_id,
    brandName: brand?.name ?? "—",
    categoryName: category?.name ?? "—",
    description: row.description,
    ingredients: row.ingredients,
    rating: row.rating != null ? Number(row.rating) : null,
    reviewCount: row.review_count,
    badge: row.badge,
    badgeColor: row.badge_color,
    status: row.status,
    images,
    variants,
    tags,
    affiliateLinks,
    prices,
  }
}

/** Full product with relations for admin edit form. */
export async function getAdminProductById(
  id: string,
): Promise<AdminProductDetail | null> {
  return safeQuery(
    "getAdminProductById",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("products")
        .select(ADMIN_PRODUCT_DETAIL_SELECT)
        .eq("id", id)
        .maybeSingle()

      if (handleDbError("getAdminProductById", error) || !data) {
        return null
      }

      return mapAdminProductDetail(data as unknown as ProductDetailQueryRow)
    },
    null,
  )
}

/** Active brands for product form dropdown. */
export async function getActiveBrandsForAdmin(): Promise<AdminSelectOption[]> {
  return safeQuery(
    "getActiveBrandsForAdmin",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("brands")
        .select("id, name, slug")
        .eq("status", "active")
        .order("name", { ascending: true })

      if (handleDbError("getActiveBrandsForAdmin", error)) return []

      return ((data as Pick<BrandRow, "id" | "name" | "slug">[]) ?? []).map(
        (row) => ({ id: row.id, name: row.name, slug: row.slug }),
      )
    },
    [],
  )
}

/** Active categories for product form dropdown. */
export async function getActiveCategoriesForAdmin(): Promise<AdminSelectOption[]> {
  return safeQuery(
    "getActiveCategoriesForAdmin",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("status", "active")
        .order("sort_order", { ascending: true })

      if (handleDbError("getActiveCategoriesForAdmin", error)) return []

      return ((data as Pick<CategoryRow, "id" | "name" | "slug">[]) ?? []).map(
        (row) => ({ id: row.id, name: row.name, slug: row.slug }),
      )
    },
    [],
  )
}

/** Active affiliate stores for product affiliate section. */
export async function getAdminAffiliateStores(): Promise<
  AdminAffiliateStoreOption[]
> {
  return safeQuery(
    "getAdminAffiliateStores",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("affiliate_stores")
        .select("id, name, slug, brand_color")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (handleDbError("getAdminAffiliateStores", error)) return []

      return ((data as Pick<AffiliateStoreRow, "id" | "name" | "slug" | "brand_color">[]) ?? []).map(
        (row) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          brandColor: row.brand_color,
        }),
      )
    },
    [],
  )
}

// ---------------------------------------------------------------------------
// Admin brand / category / blog / newsletter / settings detail
// ---------------------------------------------------------------------------

export type AdminBrandDetail = {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  founded: string | null
  country: string | null
  imageUrl: string | null
  website: string | null
  instagramFollowers: string | null
  status: ReferenceStatus
}

export type AdminCategoryDetail = {
  id: string
  name: string
  slug: string
  icon: string | null
  imageUrl: string | null
  description: string | null
  sortOrder: number
  productCount: number
  status: ReferenceStatus
}

export type AdminBlogPostDetail = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  authorId: string
  blogCategoryId: string
  authorName: string
  categoryName: string
  featuredImageUrl: string | null
  content: unknown
  readTimeMinutes: number | null
  publishedAt: string | null
  isFeatured: boolean
  status: BlogPostStatus
  metaDescription: string | null
}

export type AdminBlogCategoryListItem = {
  id: string
  name: string
  slug: string
  description: string | null
  sortOrder: number
  updatedAt: string
}

export type AdminNewsletterSubscriber = {
  id: string
  email: string
  subscribedAt: string
  source: string | null
  consentMarketing: boolean
  unsubscribedAt: string | null
}

export type AdminSiteSettings = {
  siteName: string
  siteDescription: string
  twitterHandle: string
  defaultOgImage: string
}

function mapAdminBrandDetail(row: BrandRow): AdminBrandDetail {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    founded: row.founded,
    country: row.country,
    imageUrl: row.image_url,
    website: row.website,
    instagramFollowers: row.instagram_followers,
    status: row.status,
  }
}

function mapAdminCategoryDetail(row: CategoryRow): AdminCategoryDetail {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    icon: row.icon,
    imageUrl: row.image_url,
    description: row.description,
    sortOrder: row.sort_order,
    productCount: row.product_count,
    status: row.status,
  }
}

function mapAdminBlogPostDetail(row: BlogPostRow & {
  blog_authors?: { name: string } | { name: string }[] | null
  blog_categories?: { name: string } | { name: string }[] | null
}): AdminBlogPostDetail {
  const author = getRelation(row.blog_authors)
  const category = getRelation(row.blog_categories)

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    authorId: row.author_id,
    blogCategoryId: row.blog_category_id,
    authorName: author?.name ?? "—",
    categoryName: category?.name ?? "—",
    featuredImageUrl: row.featured_image_url,
    content: row.content,
    readTimeMinutes: row.read_time_minutes,
    publishedAt: row.published_at,
    isFeatured: row.is_featured,
    status: row.status,
    metaDescription: row.meta_description,
  }
}

function extractJsonString(value: unknown): string {
  if (typeof value === "string") return value
  if (value == null) return ""
  try {
    const parsed = typeof value === "object" ? value : JSON.parse(String(value))
    if (typeof parsed === "string") return parsed
  } catch {
    // fall through
  }
  return String(value).replace(/^"|"$/g, "")
}

/** Full brand for admin edit form. */
export async function getAdminBrandById(
  id: string,
): Promise<AdminBrandDetail | null> {
  return safeQuery(
    "getAdminBrandById",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .eq("id", id)
        .maybeSingle()

      if (handleDbError("getAdminBrandById", error) || !data) {
        return null
      }

      return mapAdminBrandDetail(data as BrandRow)
    },
    null,
  )
}

/** Full category for admin edit form. */
export async function getAdminCategoryById(
  id: string,
): Promise<AdminCategoryDetail | null> {
  return safeQuery(
    "getAdminCategoryById",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .maybeSingle()

      if (handleDbError("getAdminCategoryById", error) || !data) {
        return null
      }

      return mapAdminCategoryDetail(data as CategoryRow)
    },
    null,
  )
}

/** Full blog post for admin edit form. */
export async function getAdminBlogPostById(
  id: string,
): Promise<AdminBlogPostDetail | null> {
  return safeQuery(
    "getAdminBlogPostById",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_authors!inner(name),
          blog_categories!inner(name)
        `)
        .eq("id", id)
        .maybeSingle()

      if (handleDbError("getAdminBlogPostById", error) || !data) {
        return null
      }

      return mapAdminBlogPostDetail(data as BlogPostRow & {
        blog_authors?: { name: string } | { name: string }[] | null
        blog_categories?: { name: string } | { name: string }[] | null
      })
    },
    null,
  )
}

/** Blog authors for post form dropdown. */
export async function getAdminBlogAuthors(): Promise<AdminSelectOption[]> {
  return safeQuery(
    "getAdminBlogAuthors",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("blog_authors")
        .select("id, name, slug")
        .order("name", { ascending: true })

      if (handleDbError("getAdminBlogAuthors", error)) return []

      return ((data as Pick<BlogAuthorRow, "id" | "name" | "slug">[]) ?? []).map(
        (row) => ({ id: row.id, name: row.name, slug: row.slug }),
      )
    },
    [],
  )
}

/** Blog categories for post form dropdown. */
export async function getAdminBlogCategories(): Promise<AdminSelectOption[]> {
  return safeQuery(
    "getAdminBlogCategories",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("blog_categories")
        .select("id, name, slug")
        .order("sort_order", { ascending: true })

      if (handleDbError("getAdminBlogCategories", error)) return []

      return ((data as Pick<BlogCategoryRow, "id" | "name" | "slug">[]) ?? []).map(
        (row) => ({ id: row.id, name: row.name, slug: row.slug }),
      )
    },
    [],
  )
}

/** Blog categories list for admin CRUD page. */
export async function getAdminBlogCategoriesList(): Promise<
  AdminListResult<AdminBlogCategoryListItem>
> {
  return safeQuery(
    "getAdminBlogCategoriesList",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("sort_order", { ascending: true })

      if (handleDbError("getAdminBlogCategoriesList", error)) {
        return { items: [], source: "placeholder" }
      }

      const items = ((data as BlogCategoryRow[]) ?? []).map((row) => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        sortOrder: row.sort_order,
        updatedAt: row.updated_at,
      }))

      return { items, source: "live" }
    },
    { items: [], source: "placeholder" },
  )
}

/** Newsletter subscribers for admin table. */
export async function getAdminNewsletterSubscribers(): Promise<
  AdminListResult<AdminNewsletterSubscriber>
> {
  return safeQuery(
    "getAdminNewsletterSubscribers",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false })

      if (handleDbError("getAdminNewsletterSubscribers", error)) {
        return { items: [], source: "placeholder" }
      }

      const items = ((data as NewsletterSubscriberRow[]) ?? []).map((row) => ({
        id: row.id,
        email: row.email,
        subscribedAt: row.subscribed_at,
        source: row.source,
        consentMarketing: row.consent_marketing,
        unsubscribedAt: row.unsubscribed_at,
      }))

      return { items, source: "live" }
    },
    { items: [], source: "placeholder" },
  )
}

const DEFAULT_SITE_SETTINGS: AdminSiteSettings = {
  siteName: "Glowvelle",
  siteDescription:
    "The world's most beautiful beauty price comparison platform.",
  twitterHandle: "",
  defaultOgImage: "/og-default.png",
}

/** Site settings from DB (admin only). */
export async function getSiteSettings(): Promise<AdminSiteSettings> {
  return safeQuery(
    "getSiteSettings",
    async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase.from("site_settings").select("*")

      if (handleDbError("getSiteSettings", error) || !data?.length) {
        return DEFAULT_SITE_SETTINGS
      }

      const map = new Map(
        (data as SiteSettingRow[]).map((row) => [row.key, row.value]),
      )

      return {
        siteName: extractJsonString(map.get("site_name")) || DEFAULT_SITE_SETTINGS.siteName,
        siteDescription:
          extractJsonString(map.get("site_description")) ||
          DEFAULT_SITE_SETTINGS.siteDescription,
        twitterHandle:
          extractJsonString(map.get("twitter_handle")) ||
          DEFAULT_SITE_SETTINGS.twitterHandle,
        defaultOgImage:
          extractJsonString(map.get("default_og_image")) ||
          DEFAULT_SITE_SETTINGS.defaultOgImage,
      }
    },
    DEFAULT_SITE_SETTINGS,
  )
}
