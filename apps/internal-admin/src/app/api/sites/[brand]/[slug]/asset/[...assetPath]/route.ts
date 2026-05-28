import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET /api/sites/[brand]/[slug]/asset/[...assetPath]
 * Serves image files from the on-disk generated site assets folder:
 *   sites/{brand}/{slug}/public/{assetPath}
 *
 * This allows the editor (running under the Next.js admin) to display
 * previews of images referenced by content paths such as "/slug/images/hero.jpg"
 * without relying on the microsite's own dev server.
 *
 * Usage from ImageField / previews:
 *   /api/sites/brand/slug/asset/images/hero.jpg
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.avif': 'image/avif',
  };
  return map[ext] || 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string; assetPath: string[] }> }
) {
  const { brand, slug, assetPath } = await params;

  try {
    if (!assetPath || assetPath.length === 0) {
      return new NextResponse('Missing asset path', { status: 400 });
    }

    const rel = assetPath.join('/').replace(/^\/+/, '');
    const rootDir = path.join(process.cwd(), '../../');
    const sitesRoot = path.join(rootDir, 'sites');

    // Primary lookup: public/<rel>
    let diskPath = path.join(sitesRoot, brand, slug, 'public', rel);

    // Fallback: if the path still had /slug/ baked in (e.g. caller passed full content path), strip it
    if (!fs.existsSync(diskPath)) {
      const stripped = rel.replace(new RegExp(`^${slug}/?`, 'i'), '').replace(/^\/+/, '');
      if (stripped && stripped !== rel) {
        diskPath = path.join(sitesRoot, brand, slug, 'public', stripped);
      }
    }

    if (!fs.existsSync(diskPath)) {
      // One more attempt: maybe the assetPath already omitted 'images' and user stored bare filename
      // (rare) — we do not auto-search; just 404.
      return new NextResponse('Image not found', { status: 404 });
    }

    const stat = fs.statSync(diskPath);
    if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 404 });
    }

    const buffer = fs.readFileSync(diskPath);
    const contentType = getMimeType(diskPath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stat.size),
        'Cache-Control': 'public, max-age=60', // short cache for editor use
        'X-Asset-Source': 'local-disk',
      },
    });
  } catch (error: any) {
    console.error('[asset serve] error', error);
    return new NextResponse('Server error serving asset', { status: 500 });
  }
}
