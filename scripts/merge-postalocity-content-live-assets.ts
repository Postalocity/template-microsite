#!/usr/bin/env npx tsx
/**
 * Merge repo prerender/content into index.html while keeping LIVE CSS/JS hashes.
 *
 * Use when you want updated copy/SEO in #root but don't want to upload new assets yet.
 *
 * Usage:
 *   npx tsx scripts/merge-postalocity-content-live-assets.ts
 *   npx tsx scripts/merge-postalocity-content-live-assets.ts --service credit-repair
 *
 * Outputs per site:
 *   deploy/postalocity/<slug>/index-keep-live-assets.html
 *   deploy/postalocity/<slug>/content-only/root-inner.html
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractRootInnerHtml, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'postalocity';
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const OUT_DIR = path.join(ROOT, 'deploy', BRAND);
const MAPPING = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'postalocity-live-urls.json'), 'utf8')
) as { sites: Record<string, { liveUrl: string | null; notes?: string }> };

const SKIP_CONFIGS = new Set(['education-final', 'self-storage-backup']);

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
    .filter((slug) => !SKIP_CONFIGS.has(slug))
    .sort();
}

function swapAssetRefs(html: string, liveCss: string, liveJs: string, basePath: string): string {
  const cssPattern = new RegExp(`${basePath}/assets/index-[A-Za-z0-9_-]+\\.css`, 'g');
  const jsPattern = new RegExp(`${basePath}/assets/index-[A-Za-z0-9_-]+\\.js`, 'g');
  return html
    .replace(cssPattern, `${basePath}/assets/${liveCss}`)
    .replace(jsPattern, `${basePath}/assets/${liveJs}`);
}

function replaceRootInner(html: string, rootInner: string): string | null {
  const bounds = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!bounds || bounds.index === undefined) return null;

  const startIdx = bounds.index + bounds[0].length;
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
  return html.slice(0, startIdx) + rootInner + html.slice(endCloseIdx);
}

async function fetchLive(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'postalocity-merge/1.0', 'Cache-Control': 'no-cache' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function mergeService(service: string): Promise<string> {
  const mapping = MAPPING.sites[service];
  const distIndex = path.join(SITES_DIR, service, 'dist', 'index.html');
  const outDir = path.join(OUT_DIR, service);
  const contentDir = path.join(outDir, 'content-only');

  if (!fs.existsSync(distIndex)) {
    return `❌ ${service}: missing dist/index.html — run build:postalocity first`;
  }

  const localHtml = fs.readFileSync(distIndex, 'utf8');
  const rootInner = extractRootInnerHtml(localHtml);
  if (!rootInner || rootInner.length < 500) {
    return `❌ ${service}: no prerender in dist/index.html — run build:postalocity first`;
  }

  fs.mkdirSync(contentDir, { recursive: true });
  fs.writeFileSync(path.join(contentDir, 'root-inner.html'), rootInner);

  if (!mapping?.liveUrl) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index-keep-live-assets.html'), localHtml);
    return `⚠️  ${service}: no live URL — wrote full index.html`;
  }

  const liveHtml = await fetchLive(mapping.liveUrl);
  const liveAssets = parseAssetHashes(liveHtml);
  const localAssets = parseAssetHashes(localHtml);

  if (!liveAssets.css || !liveAssets.js) {
    return `❌ ${service}: could not parse live CSS/JS from ${mapping.liveUrl}`;
  }

  const basePath = `/${service}`;
  const merged = swapAssetRefs(localHtml, liveAssets.css, liveAssets.js, basePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index-keep-live-assets.html'), merged);

  fs.writeFileSync(
    path.join(contentDir, 'MERGE.md'),
    [
      `# Content-only deploy: ${service}`,
      '',
      `Live: ${mapping.liveUrl}`,
      '',
      '## Asset refs (kept from live)',
      `- CSS: \`${liveAssets.css}\``,
      `- JS: \`${liveAssets.js}\``,
      '',
      '## Repo build (not uploaded)',
      `- CSS: \`${localAssets.css ?? '—'}\``,
      `- JS: \`${localAssets.js ?? '—'}\``,
      '',
      '## Paste options',
      '',
      '**Option A — full page**',
      'Upload `../index-keep-live-assets.html` as `index.html` at the site path. Live CSS/JS refs are already swapped in.',
      '',
      '**Option B — body only**',
      'Keep existing `index.html` asset lines. Replace only the `<div id="root">…</div>` block with `root-inner.html`.',
      'Also update `<title>`, meta description, and JSON-LD from repo `dist/index.html` if copy changed.',
      '',
      'Upload new `dist/assets/*` when you are ready for design parity.',
      '',
    ].join('\n')
  );

  return `✅ ${service}: ${rootInner.length.toLocaleString()} bytes — live assets ${liveAssets.css} + ${liveAssets.js}`;
}

async function main(): Promise<void> {
  const services = onlyService ? [onlyService] : listServices();
  console.log(`\n🔀 Merging Postalocity content with live asset refs (${services.length} site(s))\n`);

  for (const service of services) {
    try {
      console.log(await mergeService(service));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`❌ ${service}: ${msg}`);
    }
  }

  console.log('\nOutput: deploy/postalocity/<slug>/index-keep-live-assets.html\n');
}

main();