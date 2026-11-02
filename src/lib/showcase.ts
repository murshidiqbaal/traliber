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

/** Fetch all published gallery items (public, anon client) */
export async function getPublishedGallery(): Promise<ShowcaseGalleryItem[]> {
  const { data, error } = await supabase
    .from('showcase_gallery')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[showcase] getPublishedGallery error:', error.message);
    return [];
  }
  return (data as ShowcaseGalleryItem[]) ?? [];
}

/** Fetch ALL gallery items (admin, service role client passed in) */
export async function getAllGalleryAdmin(
  serviceClient: SupabaseClient
): Promise<ShowcaseGalleryItem[]> {
  const { data, error } = await serviceClient
    .from('showcase_gallery')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data as ShowcaseGalleryItem[]) ?? [];
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

