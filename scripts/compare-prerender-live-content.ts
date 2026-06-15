#!/usr/bin/env npx tsx
/**
 * Compare local prerender #root content vs live site rendered content.
 *
 * Live pages are CSR shells in raw HTML — this uses Playwright to render live
 * and compares structured fingerprints (H1, sections, H2s, FAQ, visible text).
 *
 * Usage:
 *   npx tsx scripts/compare-prerender-live-content.ts --brand postalocity
 *   npx tsx scripts/compare-prerender-live-content.ts --brand broadstroke
 *   npx tsx scripts/compare-prerender-live-content.ts --brand postalocity --service credit-repair
 *
 * Writes: logs/<brand>-content-compare.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type Browser, type Page } from 'playwright';
import { extractRootInnerHtml } from './lib/html-root.js';
import {
  compareFingerprints,
  fingerprintFromFileHtml,
  type ContentFingerprint,
} from './lib/content-fingerprint.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOGS_DIR = path.join(ROOT, 'logs');

const BRAND_SKIP: Record<string, Set<string>> = {
  postalocity: new Set(['education-final', 'self-storage-backup']),
  broadstroke: new Set(['BRAND-MASTER']),
};

const args = process.argv.slice(2);
const brandArg = (() => {
  const idx = args.indexOf('--brand');
  return idx >= 0 ? args[idx + 1] : null;
})();
const onlyService = (() => {
  const idx = args.indexOf('--service');
  return idx >= 0 ? args[idx + 1] : null;
})();

if (!brandArg || !BRAND_SKIP[brandArg]) {
  console.error('Usage: npx tsx scripts/compare-prerender-live-content.ts --brand postalocity|broadstroke [--service slug]');
  process.exit(1);
}

const BRAND = brandArg;
const CONFIG_DIR = path.join(ROOT, 'config', 'sites', BRAND);
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const MAPPING_PATH = path.join(__dirname, `${BRAND}-live-urls.json`);

type SiteMapping = { liveUrl: string | null; notes?: string };
type MappingFile = { sites: Record<string, SiteMapping> };

function listServices(): string[] {
  return fs
    .readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith('.json') && !f.includes('.backup'))
    .map((f) => f.replace(/\.json$/, ''))
    .filter((slug) => !BRAND_SKIP[BRAND].has(slug))
    .sort();
}

async function scrapeLiveFingerprint(page: Page, url: string): Promise<{
  status: number;
  fingerprint: ContentFingerprint | null;
  error?: string;
}> {
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => null);
  const status = response?.status() ?? 0;

  if (status >= 400) {
    return { status, fingerprint: null, error: `HTTP ${status}` };
  }

  const contentSelectors = ['#hero', '[id="root"] h1', '.section-container', '[id="faq"]', 'main'];
  for (const sel of contentSelectors) {
    try {
      await page.waitForSelector(sel, { timeout: 5000 });
      break;
    } catch {}
  }
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    const height = document.body.scrollHeight;
    for (let y = 0; y < height; y += 500) window.scrollTo(0, y);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  // String body avoids tsx injecting __name helpers into browser context
  const fingerprint = (await page.evaluate(`
    (() => {
      const norm = (t) => String(t || '')
        .replace(/[—–]/g, ' - ')
        .replace(/\\s*&\\s*/g, ' and ')
        .replace(/self storage/gi, 'self-storage')
        .replace(/\\s+/g, ' ')
        .trim()
        .toLowerCase();
      const root = document.getElementById('root') || document.body;
      const title = (document.querySelector('title')?.textContent || '').trim();
      const h1 = (root.querySelector('h1')?.textContent || '').trim();
      const sectionIds = [...root.querySelectorAll('section[id]')].map((s) => s.id).filter(Boolean);
      const h2s = [...root.querySelectorAll('h2')].map((h) => norm(h.textContent)).filter(Boolean);
      const faqQuestions = [...new Set(
        [...root.querySelectorAll('#faq button, #faq h3')]
          .map((el) => norm(el.textContent))
          .filter((t) => t.length > 8)
      )];
      const navLabels = [...root.querySelectorAll('nav a[href^="#"]')]
        .map((a) => norm(a.textContent))
        .filter(Boolean);
      const visibleText = norm(root.textContent);
      return {
        title: title ? norm(title) : null,
        h1: h1 ? norm(h1) : null,
        sectionIds,
        h2s,
        faqQuestions,
        navLabels,
        visibleText,
        textLength: visibleText.length,
      };
    })()
  `)) as ContentFingerprint;

  if (!fingerprint.h1 && fingerprint.textLength < 100) {
    return { status, fingerprint: null, error: 'Live page did not render microsite content (#root empty or non-React page)' };
  }

  return { status, fingerprint };
}

type CompareRow = {
  service: string;
  liveUrl: string | null;
  liveStatus: number | 'error';
  localBuilt: boolean;
  localPrerenderBytes: number;
  liveTextLength: number;
  score: number;
  match: boolean;
  issues: string[];
  error?: string;
};

async function compareService(
  browser: Browser,
  service: string,
  mapping: SiteMapping | undefined
): Promise<CompareRow> {
  const distPath = path.join(SITES_DIR, service, 'dist', 'index.html');
  const liveUrl = mapping?.liveUrl ?? null;

  if (!fs.existsSync(distPath)) {
    return {
      service,
      liveUrl,
      liveStatus: 'error',
      localBuilt: false,
      localPrerenderBytes: 0,
      liveTextLength: 0,
      score: 0,
      match: false,
      issues: ['missing local dist/index.html — run build first'],
      error: 'no local build',
    };
  }

  const localHtml = fs.readFileSync(distPath, 'utf8');
  const localFp = fingerprintFromFileHtml(localHtml);
  const localPrerenderBytes = extractRootInnerHtml(localHtml)?.length ?? 0;

  if (!localFp) {
    return {
      service,
      liveUrl,
      liveStatus: 'error',
      localBuilt: true,
      localPrerenderBytes,
      liveTextLength: 0,
      score: 0,
      match: false,
      issues: ['local prerender #root empty or too small'],
      error: 'no local prerender',
    };
  }

  if (!liveUrl) {
    return {
      service,
      liveUrl: null,
      liveStatus: 'error',
      localBuilt: true,
      localPrerenderBytes,
      liveTextLength: 0,
      score: 0,
      match: false,
      issues: ['no live URL mapped'],
    };
  }

  const page = await browser.newPage();
  try {
    const { status, fingerprint: liveFp, error } = await scrapeLiveFingerprint(page, liveUrl);

    if (!liveFp) {
      return {
        service,
        liveUrl,
        liveStatus: status || 'error',
        localBuilt: true,
        localPrerenderBytes,
        liveTextLength: 0,
        score: 0,
        match: false,
        issues: [error ?? 'could not scrape live content'],
        error,
      };
    }

    const result = compareFingerprints(localFp, liveFp);

    fs.mkdirSync(path.join(LOGS_DIR, BRAND, service), { recursive: true });
    fs.writeFileSync(
      path.join(LOGS_DIR, BRAND, service, 'live-fingerprint.json'),
      JSON.stringify(liveFp, null, 2)
    );
    fs.writeFileSync(
      path.join(LOGS_DIR, BRAND, service, 'local-fingerprint.json'),
      JSON.stringify(localFp, null, 2)
    );

    return {
      service,
      liveUrl,
      liveStatus: status,
      localBuilt: true,
      localPrerenderBytes,
      liveTextLength: liveFp.textLength,
      score: result.score,
      match: result.match,
      issues: result.issues,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      service,
      liveUrl,
      liveStatus: 'error',
      localBuilt: true,
      localPrerenderBytes,
      liveTextLength: 0,
      score: 0,
      match: false,
      issues: [message],
      error: message,
    };
  } finally {
    await page.close();
  }
}

async function main(): Promise<void> {
  const mappingFile = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8')) as MappingFile;
  const services = onlyService ? [onlyService] : listServices();

  console.log(`\n🔬 Comparing ${services.length} ${BRAND} prerender vs live rendered content...\n`);

  const browser = await chromium.launch({ headless: true });
  const rows: CompareRow[] = [];

  try {
    for (const service of services) {
      const row = await compareService(browser, service, mappingFile.sites[service]);
      rows.push(row);
      const icon = row.match ? '✅' : '⚠️';
      console.log(
        `${icon} ${service.padEnd(28)} score=${(row.score * 100).toFixed(0)}%  text=${row.localPrerenderBytes}/${row.liveTextLength}  ${row.issues[0] ?? 'aligned'}`
      );
    }
  } finally {
    await browser.close();
  }

  const matched = rows.filter((r) => r.match).length;
  const generated = new Date().toISOString();

  const md = [
    `# ${BRAND} — Prerender vs Live Content Compare`,
    '',
    `Generated: ${generated}`,
    '',
    `**${matched} of ${rows.length} sites have prerender content aligned with live.**`,
    '',
    'Live content is captured via Playwright (CSR render), then compared to local `dist/index.html` #root.',
    '',
    '| Site | Score | Text (local/live chars) | H1 | Match? |',
    '|------|-------|-------------------------|-----|--------|',
    ...rows.map((r) => {
      const h1Issue = r.issues.find((i) => i.startsWith('H1')) ?? '—';
      return `| ${r.service} | ${(r.score * 100).toFixed(0)}% | ${r.localPrerenderBytes} / ${r.liveTextLength} | ${h1Issue.slice(0, 40)} | **${r.match ? 'YES' : 'NO'}** |`;
    }),
    '',
    '## Details',
    '',
    ...rows.map((r) =>
      [
        `### ${r.service}`,
        r.liveUrl ? `- Live: ${r.liveUrl} (${r.liveStatus})` : '- Live: not mapped',
        `- Local prerender bytes: ${r.localPrerenderBytes}`,
        `- Live visible text chars: ${r.liveTextLength}`,
        `- Score: ${(r.score * 100).toFixed(1)}%`,
        `- Match: **${r.match ? 'YES' : 'NO'}**`,
        r.issues.length ? `- Issues:\n${r.issues.map((i) => `  - ${i}`).join('\n')}` : '',
        `- Fingerprints: \`logs/${BRAND}/${r.service}/local-fingerprint.json\` vs \`live-fingerprint.json\``,
        '',
      ].join('\n')
    ),
  ].join('\n');

  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const reportPath = path.join(LOGS_DIR, `${BRAND}-content-compare.md`);
  fs.writeFileSync(reportPath, md);
  console.log(`\n📄 Report: ${reportPath}`);
  console.log(`📊 ${matched}/${rows.length} content-aligned\n`);

  if (matched < rows.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});