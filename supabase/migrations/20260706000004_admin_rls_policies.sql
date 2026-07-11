-- Phase 29 — Admin RLS policies + product image storage bucket
-- Allows authenticated admin users to CRUD catalog tables.
-- Server actions also use service_role (bypasses RLS); these policies are a defense-in-depth layer.

-- ---------------------------------------------------------------------------
-- Helper: is_admin()
-- Checks JWT app_metadata.role = 'admin'.
-- Admin accounts should be provisioned with app_metadata.role = 'admin'.
-- Only admin users should receive authenticated accounts for this app.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- ---------------------------------------------------------------------------
-- Admin CRUD: products
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all products"
  ON products FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: product_variants
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all product variants"
  ON product_variants FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert product variants"
  ON product_variants FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update product variants"
  ON product_variants FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete product variants"
  ON product_variants FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: product_images
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all product images"
  ON product_images FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert product images"
  ON product_images FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update product images"
  ON product_images FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete product images"
  ON product_images FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: product_tags
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all product tags"
  ON product_tags FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert product tags"
  ON product_tags FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update product tags"
  ON product_tags FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete product tags"
  ON product_tags FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: affiliate_links
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all affiliate links"
  ON affiliate_links FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert affiliate links"
  ON affiliate_links FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update affiliate links"
  ON affiliate_links FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete affiliate links"
  ON affiliate_links FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: product_prices
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all product prices"
  ON product_prices FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert product prices"
  ON product_prices FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update product prices"
  ON product_prices FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete product prices"
  ON product_prices FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin read: brands & categories (all statuses, for form dropdowns)
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all brands"
  ON brands FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin select all categories"
  ON categories FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin select all affiliate stores"
  ON affiliate_stores FOR SELECT
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Storage: product-images bucket (public read for marketing site)
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read product images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND is_admin()
  );

CREATE POLICY "Admin update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images' AND is_admin())
  WITH CHECK (bucket_id = 'product-images' AND is_admin());

CREATE POLICY "Admin delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images' AND is_admin());
