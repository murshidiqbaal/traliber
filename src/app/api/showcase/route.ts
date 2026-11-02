import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getAllGalleryAdmin, insertGalleryItem } from '@/lib/showcase';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('Authorization');
  return auth === 'Bearer traliber_admin_auth';
}

/** GET /api/showcase — list all gallery items (admin) */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const serviceClient = getSupabaseAdmin();
    const items = await getAllGalleryAdmin(serviceClient);
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** POST /api/showcase — create a new gallery item */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, image_url, storage_path, alt_text, category, display_order, is_published } = body;

    if (!title || !image_url || !storage_path || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image_url, storage_path, category' },
        { status: 400 }
      );
    }

    const serviceClient = getSupabaseAdmin();
    const item = await insertGalleryItem(
      {
        title: String(title).trim(),
        description: description ? String(description).trim() : undefined,
        image_url: String(image_url),
        storage_path: String(storage_path),
        alt_text: alt_text ? String(alt_text).trim() : undefined,
        category: String(category).trim(),
        display_order: typeof display_order === 'number' ? display_order : 0,
        is_published: Boolean(is_published ?? false),
      },
      serviceClient
    );

    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

