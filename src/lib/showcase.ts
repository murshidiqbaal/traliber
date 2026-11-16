import { supabase } from './supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface ShowcaseGalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  storage_path: string;
  alt_text?: string;
  category: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ShowcaseGalleryInsert = Omit<ShowcaseGalleryItem, 'id' | 'created_at' | 'updated_at'>;
export type ShowcaseGalleryUpdate = Partial<ShowcaseGalleryInsert>;

/** Curated fallback items when Supabase showcase_gallery table is not yet provisioned */
export const FALLBACK_SHOWCASE_ITEMS: ShowcaseGalleryItem[] = [
  {
    id: 'fallback-1',
    title: 'Alpine Mountain Journey',
    description: 'Travel essentials ready for high-altitude trails and alpine explorations.',
    image_url: '/images/hero-alpine-mountain.webp',
    storage_path: 'fallback/hero-alpine-mountain.webp',
    alt_text: 'Traliber Travel Essentials Kit against alpine mountain landscape',
    category: 'Adventures',
    display_order: 1,
    is_published: true,
    created_at: '2026-10-20T00:00:00.000Z',
    updated_at: '2026-10-20T00:00:00.000Z',
  },
  {
    id: 'fallback-2',
    title: 'Complete 10-Item Kit Display',
    description: 'Everyday hygiene necessities neatly organized in one practical, water-resistant pouch.',
    image_url: '/images/kit-display.webp',
    storage_path: 'fallback/kit-display.webp',
    alt_text: 'Traliber 10-item travel kit display',
    category: 'Product Showcase',
    display_order: 2,
    is_published: true,
    created_at: '2026-10-21T00:00:00.000Z',
    updated_at: '2026-10-21T00:00:00.000Z',
  },
  {
    id: 'fallback-3',
    title: 'Burst of Essentials',
    description: 'Oral care, sanitizers, wet wipes, and dining hygiene for seamless transit.',
    image_url: '/images/kit-burst-alpine.webp',
    storage_path: 'fallback/kit-burst-alpine.webp',
    alt_text: 'Traliber travel kit burst showcase',
    category: 'Travel Essentials',
    display_order: 3,
    is_published: true,
    created_at: '2026-10-22T00:00:00.000Z',
    updated_at: '2026-10-22T00:00:00.000Z',
  },
  {
    id: 'fallback-4',
    title: 'Mountain Trail Companion',
    description: 'Lightweight and durable pouch built for trains, flights, and road trips.',
    image_url: '/images/hero-alpine-pouch.jpg',
    storage_path: 'fallback/hero-alpine-pouch.jpg',
    alt_text: 'Traliber alpine pouch on trail',
    category: 'Lifestyle',
    display_order: 4,
    is_published: true,
    created_at: '2026-10-23T00:00:00.000Z',
    updated_at: '2026-10-23T00:00:00.000Z',
  },
];

/** Fetch all published gallery items (public, anon client) */
export async function getPublishedGallery(): Promise<ShowcaseGalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('showcase_gallery')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      // Gracefully handle missing database table or schema cache notice
      if (
        error.code === '42P01' ||
        error.message?.includes('schema cache') ||
        error.message?.includes('showcase_gallery')
      ) {
        console.warn(
          '[showcase] Note: Supabase table "public.showcase_gallery" not found in schema cache. Displaying curated fallback showcase items.'
        );
        return FALLBACK_SHOWCASE_ITEMS;
      }
      console.warn('[showcase] getPublishedGallery warning:', error.message);
      return FALLBACK_SHOWCASE_ITEMS;
    }
    return (data as ShowcaseGalleryItem[]) ?? [];
  } catch (err: any) {
    console.warn('[showcase] Network error, using fallback gallery:', err?.message);
    return FALLBACK_SHOWCASE_ITEMS;
  }
}

/** Fetch ALL gallery items (admin, service role client passed in) */
export async function getAllGalleryAdmin(
  serviceClient: SupabaseClient
): Promise<ShowcaseGalleryItem[]> {
  try {
    const { data, error } = await serviceClient
      .from('showcase_gallery')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      if (
        error.code === '42P01' ||
        error.message?.includes('schema cache') ||
        error.message?.includes('showcase_gallery')
      ) {
        console.warn(
          '[showcase] Admin note: "public.showcase_gallery" table not initialized yet. Execute scripts/supabase_showcase_gallery.sql.'
        );
        return [];
      }
      throw new Error(error.message);
    }
    return (data as ShowcaseGalleryItem[]) ?? [];
  } catch (err: any) {
    if (err?.message?.includes('schema cache') || err?.message?.includes('showcase_gallery')) {
      return [];
    }
    throw err;
  }
}

/** Insert a new gallery item */
export async function insertGalleryItem(
  item: ShowcaseGalleryInsert,
  serviceClient: SupabaseClient
): Promise<ShowcaseGalleryItem> {
  const { data, error } = await serviceClient
    .from('showcase_gallery')
    .insert([item])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ShowcaseGalleryItem;
}

/** Update a gallery item's metadata */
export async function updateGalleryItem(
  id: string,
  updates: ShowcaseGalleryUpdate,
  serviceClient: SupabaseClient
): Promise<ShowcaseGalleryItem> {
  const { data, error } = await serviceClient
    .from('showcase_gallery')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as ShowcaseGalleryItem;
}

/** Delete a gallery item + its storage object */
export async function deleteGalleryItem(
  id: string,
  storagePath: string,
  serviceClient: SupabaseClient
): Promise<void> {
  // Delete the storage file first
  const { error: storageError } = await serviceClient.storage
    .from('traliber-showcase')
    .remove([storagePath]);

  if (storageError) {
    console.warn('[showcase] Storage delete warning:', storageError.message);
    // Continue even if storage delete fails — don't leave orphaned DB records
  }

  const { error: dbError } = await serviceClient
    .from('showcase_gallery')
    .delete()
    .eq('id', id);

  if (dbError) throw new Error(dbError.message);
}

/** Get unique categories from published gallery items */
export function extractCategories(items: ShowcaseGalleryItem[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      categories.push(item.category);
    }
  }
  return categories;
}

