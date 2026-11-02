import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { updateGalleryItem, deleteGalleryItem } from '@/lib/showcase';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('Authorization');
  return auth === 'Bearer traliber_admin_auth';
}

/** PATCH /api/showcase/[id] — update metadata for a gallery item */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const body = await req.json();
    const serviceClient = getSupabaseAdmin();
    const updated = await updateGalleryItem(id, body, serviceClient);
    return NextResponse.json({ item: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/showcase/[id] — delete gallery item + storage object */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  try {
    const body = await req.json().catch(() => ({}));
    const storagePath: string = body?.storage_path ?? '';

    const serviceClient = getSupabaseAdmin();
    await deleteGalleryItem(id, storagePath, serviceClient);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

