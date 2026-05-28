import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// MIME type helper
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.mjs': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.ico': return 'image/x-icon';
    case '.txt': return 'text/plain; charset=utf-8';
    case '.xml': return 'application/xml';
    case '.map': return 'application/json';
    default: return 'application/octet-stream';
  }
}

const TEXT_EXTENSIONS = ['.html', '.js', '.mjs', '.css', '.json', '.svg', '.txt', '.xml', '.map'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string; path?: string[] }> }
) {
  const { brand, slug, path: pathSegments = [] } = await params;

  // Determine the file to serve inside dist/
  let relativePath = pathSegments.length > 0 ? pathSegments.join('/') : 'index.html';

  // Strip accidental leading slug/ prefix from rewritten requests
  const slugPrefix = `${slug}/`;
  if (relativePath.startsWith(slugPrefix)) {
    relativePath = relativePath.slice(slugPrefix.length);
  }
  if (relativePath === '' || relativePath === '/') {
    relativePath = 'index.html';
  }

  const rootDir = path.join(process.cwd(), '../../');
  const distDir = path.join(rootDir, 'sites', brand, slug, 'dist');
  let fsPath = path.join(distDir, relativePath);

  // If exact file missing and it was a directory-like request without ext, try index.html
  if (!fs.existsSync(fsPath)) {
    const altIndex = path.join(distDir, relativePath, 'index.html');
    if (fs.existsSync(altIndex)) {
      fsPath = altIndex;
      relativePath = path.join(relativePath, 'index.html');
    }
  }

  if (!fs.existsSync(fsPath) || !fs.statSync(fsPath).isFile()) {
    // No dist or missing file — serve a helpful placeholder page
    const notBuiltHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Preview Not Ready — ${brand}/${slug}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; background: #f8f8f8; color: #333; }
    .card { max-width: 520px; margin: 0 auto; background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
    h1 { font-size: 20px; margin: 0 0 12px; }
    p { color: #666; line-height: 1.5; }
    .btn { display: inline-block; margin-top: 16px; background: #111; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚧 Live preview not yet built</h1>
    <p>The real generated site for <strong>${brand}/${slug}</strong> has not been built (no <code>dist/index.html</code> found).</p>
    <p>Click <strong>🚀 Generate Site</strong> in the editor. This will regenerate the site source and run the production build so the iframe can show the authentic output.</p>
    <p>After generation completes, click the <strong>Refresh</strong> button above the preview (or reload the iframe) to see the updated site.</p>
    <a href="/sites/editor/${brand}/${slug}" class="btn">Back to Editor</a>
  </div>
</body>
</html>`;
    return new NextResponse(notBuiltHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const contentType = getContentType(fsPath);
  const isText = TEXT_EXTENSIONS.some((ext) => fsPath.toLowerCase().endsWith(ext));

  let body: Buffer | string = fs.readFileSync(fsPath);

  if (isText) {
    let text = body.toString('utf8');

    // Rewrite references using the original Vite base (/${slug}/...) to our preview proxy
    // This makes built assets, chunks, CSS, and internal references load through the handler.
    const previewPrefix = `/api/preview/${brand}/${slug}/`;
    const baseRef = `/${slug}/`;

    // Cover common patterns in HTML, CSS, and JS bundles
    text = text.replace(new RegExp(`"/${slug}/`, 'g'), `"${previewPrefix}`);
    text = text.replace(new RegExp(`'/${slug}/`, 'g'), `'${previewPrefix}`);
    text = text.replace(new RegExp(`url\\(['"]?/${slug}/`, 'gi'), `url(${previewPrefix}`);
    text = text.replace(new RegExp(`\\(/${slug}/`, 'g'), `(${previewPrefix}`);
    // Catch a few more cases that appear in Vite output (backticks, etc.)
    text = text.replace(new RegExp(`\`/${slug}/`, 'g'), `\`${previewPrefix}`);

    body = text;
  }

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Preview-Brand': brand,
      'X-Preview-Slug': slug,
    },
  });
}
