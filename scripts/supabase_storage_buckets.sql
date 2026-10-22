-- ==========================================================
-- TRALIBER: Supabase Storage Buckets & Policies Setup
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kmksvaqzimyctbrarhpx/sql
-- ==========================================================

-- 1. Create Public Storage Buckets for Images
-- 'website-images': for general website media, product imagery, brand assets
-- 'testimonials': for customer uploaded reviews, traveler photos, and avatars
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
  (
    'website-images', 
    'website-images', 
    true, 
    10485760, -- 10MB limit
    array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  ),
  (
    'testimonials', 
    'testimonials', 
    true, 
    5242880,  -- 5MB limit
    array['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  )
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2. Drop existing policies if re-running to prevent duplicates
drop policy if exists "Allow public select website-images" on storage.objects;
drop policy if exists "Allow public select testimonials" on storage.objects;
drop policy if exists "Allow public insert testimonials" on storage.objects;
drop policy if exists "Allow public insert website-images" on storage.objects;
drop policy if exists "Allow public update testimonials" on storage.objects;
drop policy if exists "Allow public update website-images" on storage.objects;
drop policy if exists "Allow public delete testimonials" on storage.objects;
drop policy if exists "Allow public delete website-images" on storage.objects;

-- 3. Storage Policies for 'website-images'
-- Public read access: Anyone can view website images
create policy "Allow public select website-images"
  on storage.objects
  for select
  using (bucket_id = 'website-images');

-- Public insert access: Allow uploading website images (admin / frontend)
create policy "Allow public insert website-images"
  on storage.objects
  for insert
  with check (bucket_id = 'website-images');

-- Update & Delete access on website-images
create policy "Allow public update website-images"
  on storage.objects
  for update
  using (bucket_id = 'website-images');

create policy "Allow public delete website-images"
  on storage.objects
  for delete
  using (bucket_id = 'website-images');

-- 4. Storage Policies for 'testimonials'
-- Public read access: Anyone can view traveler photos and avatars
create policy "Allow public select testimonials"
  on storage.objects
  for select
  using (bucket_id = 'testimonials');

-- Public insert access: Any traveler / customer can upload their review picture
create policy "Allow public insert testimonials"
  on storage.objects
  for insert
  with check (bucket_id = 'testimonials');

-- Update & Delete access on testimonials bucket
create policy "Allow public update testimonials"
  on storage.objects
  for update
  using (bucket_id = 'testimonials');

create policy "Allow public delete testimonials"
  on storage.objects
  for delete
  using (bucket_id = 'testimonials');
