#!/usr/bin/env npx tsx
/**
 * Merge repo prerender/content into index.html while keeping LIVE CSS/JS hashes.
 *
 * Usage:
 *   npx tsx scripts/merge-broadstroke-content-live-assets.ts
 *   npx tsx scripts/merge-broadstroke-content-live-assets.ts --service mailing
 *
 * Outputs per site:
 *   deploy/broadstroke/<slug>/index-keep-live-assets.html
 *   deploy/broadstroke/<slug>/content-only/root-inner.html
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractRootInnerHtml, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'broadstroke';
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const OUT_DIR = path.join(ROOT, 'deploy', BRAND);
const MAPPING = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'broadstroke-live-urls.json'), 'utf8')
) as { sites: Record<string, { liveUrl: string | null; notes?: string }> };

const SKIP_CONFIGS = new Set(['BRAND-MASTER']);

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

async function fetchLive(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'broadstroke-merge/1.0', 'Cache-Control': 'no-cache' },
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
    return `❌ ${service}: missing dist/index.html — run build:broadstroke first`;
  }

  const localHtml = fs.readFileSync(distIndex, 'utf8');
  const rootInner = extractRootInnerHtml(localHtml);
  if (!rootInner || rootInner.length < 500) {
    return `❌ ${service}: no prerender in dist/index.html — run build:broadstroke first`;
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
      'Upload `../index-keep-live-assets.html` as `index.html` at the site path.',
      '',
      '**Option B — body only**',
      'Replace only the `<div id="root">…</div>` block with `root-inner.html`.',
      '',
      'Upload new `dist/assets/*` when you are ready for design parity.',
      '',
    ].join('\n')
  );

  return `✅ ${service}: ${rootInner.length.toLocaleString()} bytes — live assets ${liveAssets.css} + ${liveAssets.js}`;
}

async function main(): Promise<void> {
  const services = onlyService ? [onlyService] : listServices();
  console.log(`\n🔀 Merging Broadstroke content with live asset refs (${services.length} site(s))\n`);

  for (const service of services) {
    try {
      console.log(await mergeService(service));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`❌ ${service}: ${msg}`);
    }
  }

  console.log('\nOutput: deploy/broadstroke/<slug>/index-keep-live-assets.html\n');
}

main();