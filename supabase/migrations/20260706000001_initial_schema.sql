-- Glowvelle Phase 18 MVP — Initial Schema
-- 14 tables: catalog, affiliate, blog, newsletter, click tracking

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
CREATE TYPE product_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE blog_post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE reference_status AS ENUM ('active', 'inactive');

-- ---------------------------------------------------------------------------
-- Shared trigger: auto-update updated_at
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- 1. categories
-- ---------------------------------------------------------------------------
CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL,
  icon          TEXT,
  image_url     TEXT,
  description   TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  status        reference_status NOT NULL DEFAULT 'active',
  product_count INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT categories_slug_unique UNIQUE (slug),
  CONSTRAINT categories_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT categories_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_categories_status ON categories (status);
CREATE INDEX idx_categories_sort_order ON categories (sort_order);

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 2. brands
-- ---------------------------------------------------------------------------
CREATE TABLE brands (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 TEXT NOT NULL,
  slug                 TEXT NOT NULL,
  tagline              TEXT,
  description          TEXT,
  founded              TEXT,
  country              TEXT,
  image_url            TEXT,
  website              TEXT,
  instagram_followers  TEXT,
  status               reference_status NOT NULL DEFAULT 'active',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT brands_slug_unique UNIQUE (slug),
  CONSTRAINT brands_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT brands_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_brands_status ON brands (status);

CREATE TRIGGER trg_brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 3. products
-- ---------------------------------------------------------------------------
CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id      UUID NOT NULL REFERENCES brands (id) ON DELETE RESTRICT,
  category_id   UUID NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL,
  description   TEXT,
  ingredients   TEXT,
  rating        NUMERIC(2, 1) CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5)),
  review_count  INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  badge         TEXT,
  badge_color   TEXT,
  status        product_status NOT NULL DEFAULT 'draft',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT products_slug_unique UNIQUE (slug),
  CONSTRAINT products_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT products_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_products_brand_id ON products (brand_id);
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_status ON products (status);
CREATE INDEX idx_products_slug ON products (slug);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 4. product_variants
-- ---------------------------------------------------------------------------
CREATE TABLE product_variants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sku         TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT product_variants_name_not_empty CHECK (char_length(trim(name)) > 0)
);

CREATE INDEX idx_product_variants_product_id ON product_variants (product_id);
CREATE INDEX idx_product_variants_sku ON product_variants (sku) WHERE sku IS NOT NULL;

CREATE TRIGGER trg_product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 5. product_images
-- ---------------------------------------------------------------------------
CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  variant_id  UUID REFERENCES product_variants (id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  alt_text    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_primary  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT product_images_url_not_empty CHECK (char_length(trim(image_url)) > 0)
);

CREATE INDEX idx_product_images_product_id ON product_images (product_id);
CREATE INDEX idx_product_images_variant_id ON product_images (variant_id) WHERE variant_id IS NOT NULL;

CREATE TRIGGER trg_product_images_updated_at
  BEFORE UPDATE ON product_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 6. product_tags
-- ---------------------------------------------------------------------------
CREATE TABLE product_tags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  tag         TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT product_tags_product_tag_unique UNIQUE (product_id, tag),
  CONSTRAINT product_tags_tag_not_empty CHECK (char_length(trim(tag)) > 0)
);

CREATE INDEX idx_product_tags_product_id ON product_tags (product_id);
CREATE INDEX idx_product_tags_tag ON product_tags (tag);

CREATE TRIGGER trg_product_tags_updated_at
  BEFORE UPDATE ON product_tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 7. affiliate_stores
-- ---------------------------------------------------------------------------
CREATE TABLE affiliate_stores (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL,
  logo_url     TEXT,
  brand_color  TEXT,
  website_url  TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT affiliate_stores_slug_unique UNIQUE (slug),
  CONSTRAINT affiliate_stores_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT affiliate_stores_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_affiliate_stores_is_active ON affiliate_stores (is_active);
CREATE INDEX idx_affiliate_stores_sort_order ON affiliate_stores (sort_order);

CREATE TRIGGER trg_affiliate_stores_updated_at
  BEFORE UPDATE ON affiliate_stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 8. affiliate_links
-- ---------------------------------------------------------------------------
CREATE TABLE affiliate_links (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id           UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  variant_id           UUID REFERENCES product_variants (id) ON DELETE CASCADE,
  store_id             UUID NOT NULL REFERENCES affiliate_stores (id) ON DELETE RESTRICT,
  affiliate_url        TEXT NOT NULL,
  external_product_id  TEXT,
  is_active            BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT affiliate_links_url_not_empty CHECK (char_length(trim(affiliate_url)) > 0)
);

CREATE INDEX idx_affiliate_links_product_id ON affiliate_links (product_id);
CREATE INDEX idx_affiliate_links_variant_id ON affiliate_links (variant_id) WHERE variant_id IS NOT NULL;
CREATE INDEX idx_affiliate_links_store_id ON affiliate_links (store_id);
CREATE INDEX idx_affiliate_links_is_active ON affiliate_links (is_active);

CREATE TRIGGER trg_affiliate_links_updated_at
  BEFORE UPDATE ON affiliate_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 9. product_prices
-- ---------------------------------------------------------------------------
CREATE TABLE product_prices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  variant_id      UUID REFERENCES product_variants (id) ON DELETE CASCADE,
  store_id        UUID NOT NULL REFERENCES affiliate_stores (id) ON DELETE RESTRICT,
  price           NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  original_price  NUMERIC(10, 2) CHECK (original_price IS NULL OR original_price >= 0),
  currency        TEXT NOT NULL DEFAULT 'USD',
  in_stock        BOOLEAN NOT NULL DEFAULT true,
  is_prime        BOOLEAN NOT NULL DEFAULT false,
  last_checked_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT product_prices_product_variant_store_unique
    UNIQUE NULLS NOT DISTINCT (product_id, variant_id, store_id)
);

CREATE INDEX idx_product_prices_product_id ON product_prices (product_id);
CREATE INDEX idx_product_prices_variant_id ON product_prices (variant_id) WHERE variant_id IS NOT NULL;
CREATE INDEX idx_product_prices_store_id ON product_prices (store_id);
CREATE INDEX idx_product_prices_in_stock ON product_prices (in_stock);

CREATE TRIGGER trg_product_prices_updated_at
  BEFORE UPDATE ON product_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 10. blog_categories
-- ---------------------------------------------------------------------------
CREATE TABLE blog_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT blog_categories_slug_unique UNIQUE (slug),
  CONSTRAINT blog_categories_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT blog_categories_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_blog_categories_sort_order ON blog_categories (sort_order);

CREATE TRIGGER trg_blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 11. blog_authors
-- ---------------------------------------------------------------------------
CREATE TABLE blog_authors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL,
  avatar_url  TEXT,
  bio         TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT blog_authors_slug_unique UNIQUE (slug),
  CONSTRAINT blog_authors_name_not_empty CHECK (char_length(trim(name)) > 0),
  CONSTRAINT blog_authors_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE TRIGGER trg_blog_authors_updated_at
  BEFORE UPDATE ON blog_authors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 12. blog_posts
-- ---------------------------------------------------------------------------
CREATE TABLE blog_posts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id           UUID NOT NULL REFERENCES blog_authors (id) ON DELETE RESTRICT,
  blog_category_id    UUID NOT NULL REFERENCES blog_categories (id) ON DELETE RESTRICT,
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL,
  excerpt             TEXT,
  featured_image_url  TEXT,
  content             JSONB NOT NULL DEFAULT '[]'::jsonb,
  read_time_minutes   INTEGER CHECK (read_time_minutes IS NULL OR read_time_minutes > 0),
  published_at        TIMESTAMPTZ,
  is_featured         BOOLEAN NOT NULL DEFAULT false,
  status              blog_post_status NOT NULL DEFAULT 'draft',
  meta_description    TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT blog_posts_slug_unique UNIQUE (slug),
  CONSTRAINT blog_posts_title_not_empty CHECK (char_length(trim(title)) > 0),
  CONSTRAINT blog_posts_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE INDEX idx_blog_posts_author_id ON blog_posts (author_id);
CREATE INDEX idx_blog_posts_blog_category_id ON blog_posts (blog_category_id);
CREATE INDEX idx_blog_posts_status ON blog_posts (status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_is_featured ON blog_posts (is_featured) WHERE is_featured = true;

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 13. newsletter_subscribers
-- ---------------------------------------------------------------------------
CREATE TABLE newsletter_subscribers (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email              CITEXT NOT NULL,
  subscribed_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  source             TEXT,
  consent_marketing  BOOLEAN NOT NULL DEFAULT true,
  unsubscribed_at    TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT newsletter_subscribers_email_unique UNIQUE (email),
  CONSTRAINT newsletter_subscribers_email_format
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_newsletter_subscribers_unsubscribed_at
  ON newsletter_subscribers (unsubscribed_at)
  WHERE unsubscribed_at IS NULL;

CREATE TRIGGER trg_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- 14. affiliate_clicks
-- ---------------------------------------------------------------------------
CREATE TABLE affiliate_clicks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_link_id UUID REFERENCES affiliate_links (id) ON DELETE SET NULL,
  product_id        UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  store_id          UUID NOT NULL REFERENCES affiliate_stores (id) ON DELETE RESTRICT,
  clicked_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_id        TEXT,
  referrer          TEXT,
  user_agent        TEXT,
  ip_hash           TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT affiliate_clicks_ip_hash_length CHECK (ip_hash IS NULL OR char_length(ip_hash) <= 128)
);

CREATE INDEX idx_affiliate_clicks_affiliate_link_id ON affiliate_clicks (affiliate_link_id);
CREATE INDEX idx_affiliate_clicks_product_id ON affiliate_clicks (product_id);
CREATE INDEX idx_affiliate_clicks_store_id ON affiliate_clicks (store_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON affiliate_clicks (clicked_at DESC);
CREATE INDEX idx_affiliate_clicks_session_id ON affiliate_clicks (session_id) WHERE session_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE categories            ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands                ENABLE ROW LEVEL SECURITY;
ALTER TABLE products              ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants      ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images        ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags          ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_stores      ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_prices        ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_authors          ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks      ENABLE ROW LEVEL SECURITY;

-- Public read: active reference catalog data
CREATE POLICY "Public read active categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Public read active brands"
  ON brands FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Public read active affiliate stores"
  ON affiliate_stores FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public read blog categories"
  ON blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read blog authors"
  ON blog_authors FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public read: published products and related catalog rows
CREATE POLICY "Public read published products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Public read variants of published products"
  ON product_variants FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_variants.product_id
        AND p.status = 'published'
    )
  );

CREATE POLICY "Public read images of published products"
  ON product_images FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_images.product_id
        AND p.status = 'published'
    )
  );

CREATE POLICY "Public read tags of published products"
  ON product_tags FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_tags.product_id
        AND p.status = 'published'
    )
  );

CREATE POLICY "Public read active affiliate links for published products"
  ON affiliate_links FOR SELECT
  TO anon, authenticated
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = affiliate_links.product_id
        AND p.status = 'published'
    )
  );

CREATE POLICY "Public read prices for published products"
  ON product_prices FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM products p
      WHERE p.id = product_prices.product_id
        AND p.status = 'published'
    )
  );

CREATE POLICY "Public read published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Public write: newsletter signup (active subscribers only on insert)
CREATE POLICY "Public insert newsletter subscribers"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_marketing = true
    AND unsubscribed_at IS NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- Public write: affiliate click tracking
CREATE POLICY "Public insert affiliate clicks"
  ON affiliate_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Note: service_role bypasses RLS by default in Supabase (no policy needed).
