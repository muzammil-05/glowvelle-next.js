-- Phase 31: Affiliate click tracking — add optional analytics columns

ALTER TABLE affiliate_clicks
  ADD COLUMN IF NOT EXISTS product_variant_id UUID REFERENCES product_variants (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS device_type TEXT;

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_product_variant_id
  ON affiliate_clicks (product_variant_id)
  WHERE product_variant_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_country
  ON affiliate_clicks (country)
  WHERE country IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_device_type
  ON affiliate_clicks (device_type)
  WHERE device_type IS NOT NULL;
