#!/usr/bin/env npx tsx
/**
 * Audit local Broadstroke prerender builds (dist/index.html) vs live sites.
 *
 * Usage:
 *   npx tsx scripts/audit-broadstroke-live.ts
 *   npx tsx scripts/audit-broadstroke-live.ts --json
 *
 * Writes: logs/broadstroke-live-audit.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { measureRootPrerender, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'broadstroke';
const CONFIG_DIR = path.join(ROOT, 'config', 'sites', BRAND);
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const LOGS_DIR = path.join(ROOT, 'logs');
const MAPPING_PATH = path.join(__dirname, 'broadstroke-live-urls.json');

const SKIP_CONFIGS = new Set(['BRAND-MASTER']);

type SiteMapping = {
  liveUrl: string | null;
  notes?: string;
};

type MappingFile = {
  sites: Record<string, SiteMapping>;
};

type AuditRow = {
  service: string;
  liveUrl: string | null;
  liveStatus: number | 'error' | 'skipped';
  localCss: string | null;
  localJs: string | null;
  liveCss: string | null;
  liveJs: string | null;
  assetsMatch: boolean | null;
  localPrerender: number;
  livePrerender: number;
  prerenderOk: boolean | null;
  localTitle: string | null;
  liveTitle: string | null;
  deployNeeded: boolean;
  notes: string;
};

function listServices(): string[] {
  return fs
    .readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith('.json') && !f.includes('.backup'))
    .map((f) => f.replace(/\.json$/, ''))
    .filter((slug) => !SKIP_CONFIGS.has(slug))
    .sort();
}

function readLocalDist(service: string): {
  css: string | null;
  js: string | null;
  prerender: number;
  title: string | null;
  built: boolean;
} {
  const distPath = path.join(SITES_DIR, service, 'dist', 'index.html');
  if (!fs.existsSync(distPath)) {
    return { css: null, js: null, prerender: 0, title: null, built: false };
  }

  const html = fs.readFileSync(distPath, 'utf8');
  const assets = parseAssetHashes(html);
  const title = html.match(/<title>([^<]+)/i)?.[1]?.trim() ?? null;

  return {
    css: assets.css,
    js: assets.js,
    prerender: measureRootPrerender(html),
    title,
    built: true,
  };
}

async function fetchLive(url: string): Promise<{ status: number; html: string }> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'broadstroke-audit/1.0', 'Cache-Control': 'no-cache' },
    redirect: 'follow',
  });
  return { status: res.status, html: await res.text() };
}

function parseLivePage(html: string, status: number): {
  css: string | null;
  js: string | null;
  prerender: number;
  title: string | null;
} {
  if (status >= 400) {
    return { css: null, js: null, prerender: 0, title: null };
  }
  const assets = parseAssetHashes(html);
  return {
    css: assets.css,
    js: assets.js,
    prerender: measureRootPrerender(html),
    title: html.match(/<title>([^<]+)/i)?.[1]?.trim() ?? null,
  };
}

function boolIcon(v: boolean | null): string {
  if (v === null) return '—';
  return v ? '✅' : '❌';
}

async function auditService(service: string, mapping: SiteMapping | undefined): Promise<AuditRow> {
  const local = readLocalDist(service);
  const liveUrl = mapping?.liveUrl ?? null;
  const notes = mapping?.notes ?? '';

  if (!liveUrl) {
    return {
      service,
      liveUrl: null,
      liveStatus: 'skipped',
      localCss: local.css,
      localJs: local.js,
      liveCss: null,
      liveJs: null,
      assetsMatch: null,
      localPrerender: local.prerender,
      livePrerender: 0,
      prerenderOk: null,
      localTitle: local.title,
      liveTitle: null,
      deployNeeded: !local.built || local.prerender < 500,
      notes: notes || 'no live URL mapped',
    };
  }

  try {
    const { status, html } = await fetchLive(liveUrl);
    const live = parseLivePage(html, status);
    const assetsMatch =
      local.css && local.js && live.css && live.js
        ? local.css === live.css && local.js === live.js
        : null;
    const prerenderOk =
      local.prerender > 500 && live.prerender > 500
        ? live.prerender >= local.prerender * 0.95
        : local.prerender > 500
          ? false
          : null;
    const deployNeeded =
      status >= 400 ||
      !local.built ||
      local.prerender < 500 ||
      !prerenderOk ||
      assetsMatch === false;

    return {
      service,
      liveUrl,
      liveStatus: status,
      localCss: local.css,
      localJs: local.js,
      liveCss: live.css,
      liveJs: live.js,
      assetsMatch,
      localPrerender: local.prerender,
      livePrerender: live.prerender,
      prerenderOk,
      localTitle: local.title,
      liveTitle: live.title,
      deployNeeded,
      notes,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      service,
      liveUrl,
      liveStatus: 'error',
      localCss: local.css,
      localJs: local.js,
      liveCss: null,
      liveJs: null,
      assetsMatch: null,
      localPrerender: local.prerender,
      livePrerender: 0,
      prerenderOk: null,
      localTitle: local.title,
      liveTitle: null,
      deployNeeded: true,
      notes: message,
    };
  }
}

async function main(): Promise<void> {
  const mappingFile = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8')) as MappingFile;
  const services = listServices();
  const jsonOut = process.argv.includes('--json');

  console.log(`\n🔍 Auditing ${services.length} Broadstroke sites vs live...\n`);

  const rows: AuditRow[] = [];
  for (const service of services) {
    const row = await auditService(service, mappingFile.sites[service]);
    rows.push(row);
    const deploy = row.deployNeeded ? 'YES' : 'no';
    console.log(
      `${row.deployNeeded ? '⚠️' : '✅'} ${service.padEnd(32)} deploy=${deploy}  prerender=${row.localPrerender}/${row.livePrerender}  assets=${boolIcon(row.assetsMatch)}`
    );
  }

  const needDeploy = rows.filter((r) => r.deployNeeded).length;
  const generated = new Date().toISOString();

  const md = [
    '# Broadstroke — Live vs Repo Audit',
    '',
    `Generated: ${generated}`,
    '',
    `**${needDeploy} of ${rows.length} sites need deploy** (missing prerender, asset drift, and/or live 404).`,
    '',
    '| Site | Live | Assets | Prerender (local/live) | Title match | Deploy? |',
    '|------|------|--------|-------------------------|-------------|--------|',
    ...rows.map((r) => {
      const liveLink =
        r.liveUrl && r.liveStatus !== 'error' && r.liveStatus !== 'skipped'
          ? `[${r.liveStatus}](${r.liveUrl})`
          : r.liveUrl
            ? String(r.liveStatus)
            : '—';
      const titleMatch =
        r.localTitle && r.liveTitle
          ? r.localTitle === r.liveTitle
            ? '✅'
            : '⚠️'
          : '—';
      return `| ${r.service} | ${liveLink} | ${boolIcon(r.assetsMatch)} local \`${r.localJs ?? '—'}\` vs live \`${r.liveJs ?? '—'}\` | ${r.localPrerender} / ${r.livePrerender} | ${titleMatch} | **${r.deployNeeded ? 'YES' : 'no'}** |`;
    }),
    '',
    '## Deploy checklist (per site)',
    '',
    '1. Run `npm run build:broadstroke` (or single `--service`)',
    '2. Upload `dist/assets/*` to the site path on hosting',
    '3. Upload `dist/index.html` as `index.html` at `broadstrokeinc.com/<slug>/`',
    '4. Re-run `npm run audit:broadstroke-live` until prerender matches',
    '',
    '## Details',
    '',
    ...rows.map((r) =>
      [
        `### ${r.service}`,
        r.liveUrl ? `- Live URL: ${r.liveUrl}` : '- Live URL: not mapped',
        r.notes ? `- Notes: ${r.notes}` : '',
        `- Local dist: \`${path.join('sites', BRAND, r.service, 'dist/index.html')}\``,
        `- Local CSS: \`${r.localCss ?? '—'}\``,
        `- Local JS: \`${r.localJs ?? '—'}\``,
        `- Live CSS: \`${r.liveCss ?? '—'}\``,
        `- Live JS: \`${r.liveJs ?? '—'}\``,
        `- Local title: ${r.localTitle ?? '—'}`,
        `- Live title: ${r.liveTitle ?? '—'}`,
        '',
      ].join('\n')
    ),
  ].join('\n');

  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const reportPath = path.join(LOGS_DIR, 'broadstroke-live-audit.md');
  fs.writeFileSync(reportPath, md);
  console.log(`\n📄 Report written to ${reportPath}\n`);

  if (jsonOut) {
    console.log(JSON.stringify(rows, null, 2));
  }

  if (needDeploy > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});