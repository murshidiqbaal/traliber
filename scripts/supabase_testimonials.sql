-- ==========================================================
-- TRALIBER: Supabase Testimonials Table & Policies Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kmksvaqzimyctbrarhpx/sql
-- ==========================================================

-- 1. Create the testimonials table
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text default 'Verified Traveler',
  location text default '',
  rating integer default 5 check (rating >= 1 and rating <= 5),
  comment text not null,
  avatar text default '',
  date date default current_date,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.testimonials enable row level security;

-- 3. Drop existing policies if any (to prevent duplicates on re-run)
drop policy if exists "Allow public read active testimonials" on public.testimonials;
drop policy if exists "Allow insert testimonials" on public.testimonials;
drop policy if exists "Allow update testimonials" on public.testimonials;
drop policy if exists "Allow delete testimonials" on public.testimonials;

-- 4. Create RLS Policies
-- Allow anyone to read testimonials
create policy "Allow public read active testimonials"
  on public.testimonials
  for select
  using (true);

-- Allow inserting testimonials
create policy "Allow insert testimonials"
  on public.testimonials
  for insert
  with check (true);

-- Allow updating testimonials
create policy "Allow update testimonials"
  on public.testimonials
  for update
  using (true);

-- Allow deleting testimonials
create policy "Allow delete testimonials"
  on public.testimonials
  for delete
  using (true);

-- 5. Insert initial seed data
insert into public.testimonials (name, role, location, rating, comment, is_active)
values
  (
    'Elena Rostova',
    'Senior Flight Attendant, Emirates',
    'Dubai & London',
    5,
    'I live out of a suitcase 20 days a month. Traliber replaced my bulky, leaky liquid bag. The toothpaste tabs and compressed towel are total lifesavers during 14-hour transits!',
    true
  ),
  (
    'Marcus Vance',
    'Tech Consultant & Frequent Flyer',
    'San Francisco, CA',
    5,
    'Passing TSA security without pulling out plastic bags of liquids is liberating. The organic canvas pouch looks exceptionally premium on business hotel counters.',
    true
  ),
  (
    'Aria Chen',
    'Digital Nomad & Travel Photographer',
    'Tokyo & Bali',
    5,
    'Every single item has a purpose. The reusable cutlery kit saved me on overnight sleeper trains in Vietnam, and the paper soap sheets lather up instantly in rural stations.',
    true
  ),
  (
    'Julian Moretti',
    'Adventure Backpacker',
    'Milan, Italy',
    5,
    'Solid quality. The five mini sanitizers are great to distribute across daypacks. Ordered 2 kits on WhatsApp and received tracking within 2 hours.',
    true
  )
on conflict do nothing;
