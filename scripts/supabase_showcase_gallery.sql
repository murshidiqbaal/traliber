-- ========================================================================
-- TRALIBER SHOWCASE GALLERY DATABASE SCHEMA & STORAGE SETUP
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/kmksvaqzimyctbrarhpx/sql
-- ========================================================================

-- Enable pgcrypto / uuid-ossp for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create table: showcase_gallery
CREATE TABLE IF NOT EXISTS public.showcase_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  category TEXT NOT NULL DEFAULT 'Travel',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_showcase_gallery_published ON public.showcase_gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_showcase_gallery_category ON public.showcase_gallery(category);
CREATE INDEX IF NOT EXISTS idx_showcase_gallery_order ON public.showcase_gallery(display_order ASC, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.showcase_gallery ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
DROP POLICY IF EXISTS "Public can view published showcase items" ON public.showcase_gallery;
CREATE POLICY "Public can view published showcase items"
  ON public.showcase_gallery FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage all showcase items" ON public.showcase_gallery;
CREATE POLICY "Admins can manage all showcase items"
  ON public.showcase_gallery FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 5. Storage Bucket: showcase
INSERT INTO storage.buckets (id, name, public)
VALUES ('showcase', 'showcase', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for 'showcase' bucket
DROP POLICY IF EXISTS "Public can view showcase images" ON storage.objects;
CREATE POLICY "Public can view showcase images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'showcase');

DROP POLICY IF EXISTS "Admins can upload showcase images" ON storage.objects;
CREATE POLICY "Admins can upload showcase images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'showcase' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

DROP POLICY IF EXISTS "Admins can update showcase images" ON storage.objects;
CREATE POLICY "Admins can update showcase images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'showcase' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

DROP POLICY IF EXISTS "Admins can delete showcase images" ON storage.objects;
CREATE POLICY "Admins can delete showcase images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'showcase' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));

-- 6. Initial Seed Items
INSERT INTO public.showcase_gallery (title, description, image_url, storage_path, alt_text, category, display_order, is_published)
VALUES
  ('Alpine Mountain Journey', 'Travel essentials ready for high-altitude trails and alpine explorations.', '/images/hero-alpine-mountain.webp', 'seed/hero-alpine-mountain.webp', 'Traliber Travel Essentials Kit against alpine mountain landscape', 'Adventures', 1, true),
  ('Complete 10-Item Kit Display', 'Everyday hygiene necessities neatly organized in one practical, water-resistant pouch.', '/images/kit-display.webp', 'seed/kit-display.webp', 'Traliber 10-item travel kit display', 'Product Showcase', 2, true),
  ('Burst of Essentials', 'Oral care, sanitizers, wet wipes, and dining hygiene for seamless transit.', '/images/kit-burst-alpine.webp', 'seed/kit-burst-alpine.webp', 'Traliber travel kit burst showcase', 'Travel Essentials', 3, true),
  ('Mountain Trail Companion', 'Lightweight and durable pouch built for trains, flights, and road trips.', '/images/hero-alpine-pouch.jpg', 'seed/hero-alpine-pouch.jpg', 'Traliber alpine pouch on trail', 'Lifestyle', 4, true)
ON CONFLICT DO NOTHING;

