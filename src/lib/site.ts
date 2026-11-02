/**
 * Single source of truth for the Traliber production website URL.
 * Canonical production domain: https://traliber.in
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://traliber.in';

// Strip any trailing slashes to prevent double slashes (e.g. "https://traliber.in//about")
export const SITE_URL = rawUrl.replace(/\/+$/, '');

/**
 * Returns an absolute URL for a given path.
 * Guarantees a leading slash on path and no duplicate slashes.
 */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') {
    return SITE_URL;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
