#!/usr/bin/env npx tsx
/**
 * Merge repo prerender/content into shopify.html while keeping LIVE CSS/JS hashes.
 *
 * Use when you want updated copy/SEO in #root but don't want to upload new assets yet.
 *
 * Usage:
 *   npx tsx scripts/merge-odins-content-live-assets.ts
 *   npx tsx scripts/merge-odins-content-live-assets.ts --service synthetic-scent-cwd-guide
 *
 * Outputs per site:
 *   deploy/odins-innovations/<slug>/shopify-keep-live-assets.html
 *   deploy/odins-innovations/<slug>/content-only/root-inner.html
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'odins-innovations';
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const OUT_DIR = path.join(ROOT, 'deploy', BRAND);
const MAPPING = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'odins-live-urls.json'), 'utf8')
) as { sites: Record<string, { liveUrl: string | null; notes?: string }> };

const args = process.argv.slice(2);
const onlyService = (() => {
  const idx = args.indexOf('--service');
  return idx >= 0 ? args[idx + 1] : null;
})();

function listServices(): string[] {
  return fs
    .readdirSync(path.join(ROOT, 'config', 'sites', BRAND))
    .filter((f) => f.endsWith('.json') && !f.includes('.backup'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

function findRootBounds(html: string) {
  const openMatch = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!openMatch || openMatch.index === undefined) return null;

  const startIdx = openMatch.index + openMatch[0].length;
  let depth = 1;
  let i = startIdx;
  let endCloseIdx = -1;

  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        endCloseIdx = nextClose;
        break;
      }
      i = nextClose + 6;
    }
  }

  if (endCloseIdx === -1) return null;
  return { innerStart: startIdx, closeIndex: endCloseIdx };
}

function extractRootInner(html: string): string | null {
  const bounds = findRootBounds(html);
  if (!bounds) return null;
  return html.slice(bounds.innerStart, bounds.closeIndex);
}

function swapAssetRefs(
  html: string,
  liveCss: string,
  liveJs: string
): string {
  return html
    .replace(
      /\{\{\s*'index[^']*\.css'\s*\|\s*asset_url\s*\|\s*stylesheet_tag\s*\}\}/g,
      `{{ '${liveCss}' | asset_url | stylesheet_tag }}`
    )
    .replace(
      /<script\s+type="module"\s+src="\{\{\s*'index[^']*\.js'\s*\|\s*asset_url\s*\}\}"><\/script>/g,
      `<script type="module" src="{{ '${liveJs}' | asset_url }}"></script>`
    );
}

async function fetchLive(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'microsite-merge/1.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseLiveAssets(html: string): { css: string | null; js: string | null } {
  return {
    css: html.match(/index-[A-Za-z0-9_-]+\.css/)?.[0] ?? null,
    js: html.match(/index-[A-Za-z0-9_-]+\.js/)?.[0] ?? null,
  };
}

async function mergeService(service: string): Promise<string> {
  const mapping = MAPPING.sites[service];
  const shopifyPath = path.join(SITES_DIR, service, 'shopify.html');
  const outDir = path.join(OUT_DIR, service);
  const contentDir = path.join(outDir, 'content-only');

  if (!fs.existsSync(shopifyPath)) {
    return `❌ ${service}: missing shopify.html`;
  }

  const localHtml = fs.readFileSync(shopifyPath, 'utf8');
  const rootInner = extractRootInner(localHtml);
  if (!rootInner || rootInner.length < 500) {
    return `❌ ${service}: no prerender in shopify.html — run build:shopify:odins first`;
  }

  fs.mkdirSync(contentDir, { recursive: true });
  fs.writeFileSync(path.join(contentDir, 'root-inner.html'), rootInner.trim());

  if (!mapping?.liveUrl) {
    fs.writeFileSync(
      path.join(outDir, 'shopify-keep-live-assets.html'),
      localHtml
    );
    return `⚠️  ${service}: no live URL — wrote full shopify.html (paste + set your asset lines manually)`;
  }

  const liveHtml = await fetchLive(mapping.liveUrl);
  const { css: liveCss, js: liveJs } = parseLiveAssets(liveHtml);

  if (!liveCss || !liveJs) {
    return `❌ ${service}: could not parse live CSS/JS from ${mapping.liveUrl}`;
  }

  const merged = swapAssetRefs(localHtml, liveCss, liveJs);
  fs.writeFileSync(path.join(outDir, 'shopify-keep-live-assets.html'), merged);

  const localCss = localHtml.match(/index-[A-Za-z0-9_-]+\.css/)?.[0];
  const localJs = localHtml.match(/index-[A-Za-z0-9_-]+\.js/)?.[0];

  fs.writeFileSync(
    path.join(contentDir, 'MERGE.md'),
    [
      `# Content-only deploy: ${service}`,
      '',
      `Live: ${mapping.liveUrl}`,
      '',
      '## Asset refs (kept from live)',
      `- CSS: \`${liveCss}\``,
      `- JS: \`${liveJs}\``,
      '',
      '## Repo build (not uploaded)',
      `- CSS: \`${localCss ?? '—'}\``,
      `- JS: \`${localJs ?? '—'}\``,
      '',
      '## Paste options',
      '',
      '**Option A — full template**',
      'Paste `../shopify-keep-live-assets.html` into the Shopify page liquid. Live CSS/JS refs are already swapped in.',
      '',
      '**Option B — body only**',
      'Keep your existing page liquid. Replace only the `<div id="root">…</div>` block with `root-inner.html`.',
      'Also update `<title>`, meta description, and JSON-LD from repo `shopify.html` if copy changed.',
      '',
      '## What syncs vs what does not',
      '',
      '| Syncs (content-only) | Needs new CSS/JS upload |',
      '|----------------------|-------------------------|',
      '| FAQ copy & order | Icon colors (OdinsIcon) |',
      '| Section nav links | FAQ accordion behavior |',
      '| JSON-LD email/meta | Component layout tweaks |',
      '| Prerender for SEO | Mobile nav hydration |',
      '',
      'Upload new `dist/assets/*` when you are ready for design parity.',
      '',
    ].join('\n')
  );

  return `✅ ${service}: ${rootInner.length.toLocaleString()} bytes — live assets ${liveCss} + ${liveJs}`;
}

async function main(): Promise<void> {
  const services = onlyService ? [onlyService] : listServices();
  console.log(`\n🔀 Merging content with live asset refs (${services.length} site(s))\n`);

  for (const service of services) {
    try {
      console.log(await mergeService(service));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`❌ ${service}: ${msg}`);
    }
  }

  console.log('\nOutput: deploy/odins-innovations/<slug>/shopify-keep-live-assets.html\n');
}

main();