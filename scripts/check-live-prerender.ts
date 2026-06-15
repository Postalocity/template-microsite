#!/usr/bin/env npx tsx
/**
 * Quick live #root prerender check for all mapped URLs + ~/dev one-offs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { measureRootPrerender, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type Entry = { group: string; slug: string; url: string | null };

function loadMapping(file: string, group: string): Entry[] {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8')) as {
    sites: Record<string, { liveUrl: string | null }>;
  };
  return Object.entries(data.sites).map(([slug, v]) => ({
    group,
    slug,
    url: v.liveUrl,
  }));
}

const entries: Entry[] = [
  ...loadMapping('postalocity-live-urls.json', 'postalocity'),
  ...loadMapping('broadstroke-live-urls.json', 'broadstroke'),
  ...loadMapping('odins-live-urls.json', 'odins'),
  { group: '~/dev', slug: 'banking-billing', url: 'https://www.postalocity.com/banking/' },
  { group: '~/dev', slug: 'healthcare-billing', url: 'https://www.postalocity.com/healthcare/' },
  { group: '~/dev', slug: 'international-mail', url: 'https://www.postalocity.com/international/' },
  { group: '~/dev', slug: 'software-billing', url: 'https://www.postalocity.com/software/' },
  { group: '~/dev', slug: 'utility-billing', url: 'https://www.postalocity.com/utilities/' },
  { group: 'postalocity', slug: 'postcard-probe', url: 'https://postalocity.com/postcard' },
];

async function check(entry: Entry) {
  if (!entry.url) {
    return { ...entry, status: '—' as const, prerender: 0, css: null, js: null, note: 'no URL mapped' };
  }
  try {
    const res = await fetch(entry.url, {
      headers: { 'User-Agent': 'live-prerender-check/1.0', 'Cache-Control': 'no-cache' },
      redirect: 'follow',
    });
    const html = await res.text();
    const assets = parseAssetHashes(html);
    const prerender = measureRootPrerender(html);
    const note =
      prerender >= 500 ? 'PRERENDER OK' : prerender > 0 ? 'LOW' : res.status === 404 ? '404' : 'CSR EMPTY';
    return {
      ...entry,
      status: res.status,
      prerender,
      css: assets.css,
      js: assets.js,
      note,
    };
  } catch (err) {
    return {
      ...entry,
      status: 'ERR' as const,
      prerender: 0,
      css: null,
      js: null,
      note: err instanceof Error ? err.message : String(err),
    };
  }
}

async function main() {
  console.log('\n🌐 Live #root prerender check\n');
  const results = [];
  for (const entry of entries) {
    results.push(await check(entry));
  }

  const w = Math.max(...results.map((r) => r.slug.length), 4);
  console.log(
    'Group'.padEnd(14) +
      'Site'.padEnd(w + 2) +
      'Status'.padEnd(8) +
      'Prerender'.padEnd(12) +
      'Note'
  );
  console.log('-'.repeat(14 + w + 2 + 8 + 12 + 20));

  for (const r of results) {
    console.log(
      r.group.padEnd(14) +
        r.slug.padEnd(w + 2) +
        String(r.status).padEnd(8) +
        r.prerender.toLocaleString().padEnd(12) +
        r.note
    );
  }

  const ok = results.filter((r) => r.prerender >= 500);
  const empty = results.filter((r) => r.url && r.prerender < 500);
  const unmapped = results.filter((r) => !r.url);
  console.log(`\n✅ ${ok.length} live with prerender | ⚠️ ${empty.length} empty/low | — ${unmapped.length} unmapped\n`);
}

main();