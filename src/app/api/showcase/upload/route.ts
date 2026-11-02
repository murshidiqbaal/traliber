import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('Authorization');
  return auth === 'Bearer traliber_admin_auth';
}

const ALLOWED_MIME = 'image/webp';
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * POST /api/showcase/upload
 * Receives a multipart FormData with:
 *   - file:     WebP Blob
 *   - filename: storage path (e.g. gallery/2026/01/image-xxx.webp)
 *
 * Returns: { image_url, storage_path }
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const filename = formData.get('filename');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Validate content type
    if (file.type !== ALLOWED_MIME) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Only WebP is accepted.` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 10 MB.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Validate WebP magic bytes: RIFF....WEBP
    const isWebP =
      buffer[0] === 0x52 && // R
      buffer[1] === 0x49 && // I
      buffer[2] === 0x46 && // F
      buffer[3] === 0x46 && // F
      buffer[8] === 0x57 && // W
      buffer[9] === 0x45 && // E
      buffer[10] === 0x42 && // B
      buffer[11] === 0x50;  // P

    if (!isWebP) {
      return NextResponse.json(
        { error: 'File content is not a valid WebP image.' },
        { status: 400 }
      );
    }

    const serviceClient = getSupabaseAdmin();

    const { error: uploadError } = await serviceClient.storage
      .from('traliber-showcase')
      .upload(filename, buffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = serviceClient.storage
      .from('traliber-showcase')
      .getPublicUrl(filename);

    return NextResponse.json({
      image_url: urlData.publicUrl,
      storage_path: filename,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

