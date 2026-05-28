import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string }> }
) {
  const { brand, slug } = await params;
  const sitePath = path.join(process.cwd(), `../../config/sites/${brand}/${slug}.json`);

  if (!fs.existsSync(sitePath)) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 });
  }

  const content = fs.readFileSync(sitePath, 'utf-8');
  return NextResponse.json(JSON.parse(content));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string }> }
) {
  const { brand, slug } = await params;
  const data = await request.json();

  const configDir = path.join(process.cwd(), `../../config/sites/${brand}`);
  const sitePath = path.join(configDir, `${slug}.json`);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(sitePath, JSON.stringify(data, null, 2));

  // Sync a copy to the generated site's config.json (if the site dir already exists).
  // This ensures the on-disk generated config is fresh even before a full regeneration.
  // The real <iframe> preview (and next `npm run build`) will use it after Generate.
  // Full template re-render + Vite rebuild is still required for the bundled JS to reflect edits.
  const generatedSiteDir = path.join(process.cwd(), `../../sites/${brand}/${slug}`);
  const generatedConfigPath = path.join(generatedSiteDir, 'config.json');
  if (fs.existsSync(generatedSiteDir)) {
    try {
      const synced = {
        _generated: {
          warning: 'AUTO-GENERATED (synced from editor). Run full generate + build for production bundle.',
          source: `config/sites/${brand}/${slug}.json (editor save)`,
          syncedAt: new Date().toISOString(),
        },
        ...data,
      };
      fs.writeFileSync(generatedConfigPath, JSON.stringify(synced, null, 2));
    } catch (e) {
      // Non-fatal: preview will still work after next Generate
      console.warn('Failed to sync generated config.json (non-fatal):', e);
    }
  }

  return NextResponse.json({ success: true });
}
