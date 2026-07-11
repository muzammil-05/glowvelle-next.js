-- Phase 30 — Admin CRUD RLS for brands, categories, blog, newsletter + site_settings

-- ---------------------------------------------------------------------------
-- Admin CRUD: brands (Phase 29 added SELECT only)
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin insert brands"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update brands"
  ON brands FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete brands"
  ON brands FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: categories (Phase 29 added SELECT only)
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: blog_categories
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all blog categories"
  ON blog_categories FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert blog categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update blog categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete blog categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: blog_authors
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all blog authors"
  ON blog_authors FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert blog authors"
  ON blog_authors FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update blog authors"
  ON blog_authors FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete blog authors"
  ON blog_authors FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin CRUD: blog_posts
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- Admin: newsletter_subscribers (SELECT, UPDATE for unsubscribe, DELETE)
-- ---------------------------------------------------------------------------
CREATE POLICY "Admin select all newsletter subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin update newsletter subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete newsletter subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (is_admin());

-- ---------------------------------------------------------------------------
-- site_settings — key/value store for admin-managed site config
-- ---------------------------------------------------------------------------
CREATE TABLE site_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL DEFAULT '""'::jsonb,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT site_settings_key_format CHECK (key ~ '^[a-z][a-z0-9_]*$')
);

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin select site settings"
  ON site_settings FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admin insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admin update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin delete site settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (is_admin());

INSERT INTO site_settings (key, value) VALUES
  ('site_name', '"Glowvelle"'::jsonb),
  ('site_description', '"The world''s most beautiful beauty price comparison platform."'::jsonb),
  ('twitter_handle', '""'::jsonb),
  ('default_og_image', '"/og-default.png"'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Storage: blog-images bucket (public read, admin write)
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admin upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-images'
    AND is_admin()
  );

CREATE POLICY "Admin update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND is_admin())
  WITH CHECK (bucket_id = 'blog-images' AND is_admin());

CREATE POLICY "Admin delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND is_admin());
