#!/usr/bin/env npx tsx
/**
 * Bundle built Postalocity sites for index.html deploy.
 *
 * Usage:
 *   npx tsx scripts/bundle-postalocity-deploy.ts
 *   npx tsx scripts/bundle-postalocity-deploy.ts --service credit-repair
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { measureRootPrerender, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'postalocity';
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const OUT_DIR = path.join(ROOT, 'deploy', BRAND);
const MAPPING = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'postalocity-live-urls.json'), 'utf8')
) as {
  baseUrl: string;
  sites: Record<string, { liveUrl: string | null; notes?: string }>;
};

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

function copyDir(src: string, dest: string): number {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dest, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
      count += 1;
    }
  }
  return count;
}

function bundleService(service: string): { ok: boolean; message: string } {
  const siteDir = path.join(SITES_DIR, service);
  const distIndex = path.join(siteDir, 'dist', 'index.html');
  const distAssets = path.join(siteDir, 'dist', 'assets');
  const outService = path.join(OUT_DIR, service);

  if (!fs.existsSync(distIndex)) {
    return { ok: false, message: 'missing dist/index.html — run build:postalocity first' };
  }

  const html = fs.readFileSync(distIndex, 'utf8');
  const prerenderBytes = measureRootPrerender(html);
  const { css, js } = parseAssetHashes(html);

  fs.rmSync(outService, { recursive: true, force: true });
  fs.mkdirSync(outService, { recursive: true });

  fs.copyFileSync(distIndex, path.join(outService, 'index.html'));
  const assetCount = copyDir(distAssets, path.join(outService, 'assets'));

  const live = MAPPING.sites[service];
  const checklist = [
    `# Deploy: ${service}`,
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Artifacts',
    '- `index.html` — upload as site index (prerendered)',
    `- \`assets/\` — upload ${assetCount} file(s) alongside index.html`,
    `- CSS hash: \`${css ?? '—'}\``,
    `- JS hash: \`${js ?? '—'}\``,
    `- Prerender #root: ${prerenderBytes.toLocaleString()} bytes`,
    '',
    '## Live target',
    live?.liveUrl ?? '(map in postalocity-live-urls.json)',
    live?.notes ? `- Notes: ${live.notes}` : '',
    '',
    '## Steps',
    '1. Upload everything in this folder to the hosting path (e.g. `/credit-repair/`)',
    '2. Ensure `assets/` paths resolve relative to index.html',
    '3. View-source: confirm #root has prerendered section HTML',
    '4. Run `npm run audit:postalocity-live`',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(outService, 'DEPLOY.md'), checklist);

  return {
    ok: prerenderBytes > 500,
    message: `${assetCount} assets, prerender ${prerenderBytes} bytes`,
  };
}

function main(): void {
  const services = onlyService ? [onlyService] : listServices();
  console.log(`\n📦 Bundling ${services.length} Postalocity deploy package(s) → deploy/${BRAND}/\n`);

  let ok = 0;
  let warn = 0;
  let fail = 0;

  for (const service of services) {
    const result = bundleService(service);
    const icon = result.ok ? '✅' : result.message.includes('missing') ? '❌' : '⚠️';
    console.log(`${icon} ${service}: ${result.message}`);
    if (result.message.includes('missing')) fail += 1;
    else if (result.ok) ok += 1;
    else warn += 1;
  }

  fs.writeFileSync(
    path.join(OUT_DIR, 'README.md'),
    [
      "# Postalocity — index.html Deploy Bundles",
      '',
      'Each subdirectory contains prerendered `index.html` + `assets/` for static hosting.',
      '',
      'Workflow: `npm run build:postalocity` → `npm run bundle:postalocity-deploy` → upload → `npm run audit:postalocity-live`',
      '',
    ].join('\n')
  );

  console.log(`\nDone: ${ok} ready, ${warn} low prerender, ${fail} failed\n`);
}

main();