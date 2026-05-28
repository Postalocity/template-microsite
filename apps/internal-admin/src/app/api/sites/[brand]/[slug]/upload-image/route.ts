import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * POST /api/sites/[brand]/[slug]/upload-image
 * Accepts multipart form with 'file' field.
 * Writes the image into the generated site's public/images/ folder (on disk).
 * Returns the canonical content path (e.g. "/slug/images/safe-name.jpg")
 * for storage in the site JSON config.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string }> }
) {
  const { brand, slug } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Only allow common image types
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    const originalName = file.name || 'image.jpg';
    const ext = path.extname(originalName).toLowerCase() || '.jpg';
    const baseName = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 40) || 'image';

    // Ensure uniqueness to avoid accidental overwrites of existing assets
    let filename = `${baseName}-${Date.now()}${ext}`;

    // Compute target directory: sites/{brand}/{slug}/public/images
    const rootDir = path.join(process.cwd(), '../../');
    const imagesDir = path.join(rootDir, 'sites', brand, slug, 'public', 'images');

    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // If exact name exists (rare with timestamp), make it more unique
    let destPath = path.join(imagesDir, filename);
    if (fs.existsSync(destPath)) {
      filename = `${baseName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
      destPath = path.join(imagesDir, filename);
    }

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destPath, buffer);

    // Canonical path used in content JSON (respects the /slug/images convention used by generated sites)
    const imagePath = `/${slug}/images/${filename}`;

    return NextResponse.json({
      success: true,
      path: imagePath,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error('[upload-image] error', error);
    return NextResponse.json({ error: error?.message || 'Upload failed' }, { status: 500 });
  }
}
