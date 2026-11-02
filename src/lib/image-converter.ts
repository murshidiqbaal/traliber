/**
 * Browser-side image-to-WebP converter using the Canvas API.
 * No additional dependencies required.
 */

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

export interface ConvertResult {
  blob: Blob;
  filename: string;
  originalName: string;
  widthPx: number;
  heightPx: number;
}

export class ImageConvertError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageConvertError';
  }
}

/** Generate a collision-resistant filename for the gallery storage path */
function generateFilename(originalName: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const timestamp = now.getTime();
  const random = Math.random().toString(36).slice(2, 8);
  // Strip original extension from name to use as a hint only
  const base = originalName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 40);
  return `gallery/${year}/${month}/${base}-${timestamp}-${random}.webp`;
}

/** Load a File into an HTMLImageElement via object URL */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new ImageConvertError(`Cannot decode image file: ${file.name}`));
    };
    img.src = url;
  });
}

/**
 * Convert a browser File to a WebP Blob using the Canvas API.
 * @param file     The input image file (JPEG, PNG, WebP, GIF).
 * @param quality  WebP quality 0–1. Default 0.83.
 * @returns        ConvertResult with the WebP Blob and generated storage filename.
 */
export async function convertToWebP(file: File, quality = 0.83): Promise<ConvertResult> {
  // --- Validate size ---
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new ImageConvertError(
      `File "${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)} MB. Maximum allowed is 10 MB.`
    );
  }

  // --- Validate MIME type (don't trust extension alone, check actual type) ---
  const mimeType = file.type.toLowerCase();
  if (!SUPPORTED_MIME_TYPES.includes(mimeType)) {
    throw new ImageConvertError(
      `Unsupported file type "${file.type}" for "${file.name}". Accepted: JPEG, PNG, WebP, GIF.`
    );
  }

  // --- Load image ---
  const img = await loadImage(file);

  const { naturalWidth: w, naturalHeight: h } = img;

  if (w === 0 || h === 0) {
    throw new ImageConvertError(`Image "${file.name}" has zero dimensions and cannot be processed.`);
  }

  // --- Draw onto canvas ---
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new ImageConvertError('Canvas 2D context is not available in this browser.');
  }

  ctx.drawImage(img, 0, 0, w, h);

  // --- Convert to WebP ---
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality);
  });

  if (!blob) {
    throw new ImageConvertError(
      `WebP conversion failed for "${file.name}". Your browser may not support WebP encoding.`
    );
  }

  return {
    blob,
    filename: generateFilename(file.name),
    originalName: file.name,
    widthPx: w,
    heightPx: h,
  };
}

