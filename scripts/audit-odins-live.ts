#!/usr/bin/env npx tsx
/**
 * Audit local Odin's microsite builds vs live Shopify pages.
 *
 * Usage:
 *   npx tsx scripts/audit-odins-live.ts
 *   npx tsx scripts/audit-odins-live.ts --json
 *
 * Writes: logs/odins-live-audit.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'odins-innovations';
const CONFIG_DIR = path.join(ROOT, 'config', 'sites', BRAND);
const SITES_DIR = path.join(ROOT, 'sites', BRAND);
const LOGS_DIR = path.join(ROOT, 'logs');
const MAPPING_PATH = path.join(__dirname, 'odins-live-urls.json');

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
  localFaqCount: number;
  liveFaqHint: string | null;
  faqAligned: boolean | null;
  localEmail: string | null;
  liveEmail: string | null;
  emailAligned: boolean | null;
  deployNeeded: boolean;
  notes: string;
};

function listServices(): string[] {
  return fs
    .readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith('.json') && !f.includes('.backup'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

function readLocalShopify(service: string): {
  css: string | null;
  js: string | null;
  prerender: number;
  email: string | null;
} {
  const shopifyPath = path.join(SITES_DIR, service, 'shopify.html');
  if (!fs.existsSync(shopifyPath)) {
    return { css: null, js: null, prerender: 0, email: null };
  }

  const html = fs.readFileSync(shopifyPath, 'utf8');
  const css = html.match(/index-[A-Za-z0-9_-]+\.css/)?.[0] ?? null;
  const js = html.match(/index-[A-Za-z0-9_-]+\.js/)?.[0] ?? null;
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<style|{{ content_for_footer)/);
  const prerender = rootMatch ? rootMatch[1].trim().length : 0;
  const emailMatch = html.match(/([\w.+-]+@[\w.-]+\.\w+)/);
  const email = emailMatch?.[1] ?? null;

  return { css, js, prerender, email };
}

function readLocalFaqCount(service: string): number {
  const configPath = path.join(SITES_DIR, service, 'config.json');
  if (!fs.existsSync(configPath)) return 0;
  try {
    const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const items = cfg?.content?.faq?.items ?? cfg?.content?.faq?.faqs ?? [];
    return Array.isArray(items) ? items.length : 0;
  } catch {
    return 0;
  }
}

async function fetchLive(url: string): Promise<{
  status: number;
  html: string;
}> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'microsite-audit/1.0' },
    redirect: 'follow',
  });
  return { status: res.status, html: await res.text() };
}

function parseLivePage(html: string): {
  css: string | null;
  js: string | null;
  prerender: number;
  email: string | null;
  faqHint: string | null;
} {
  const css = html.match(/index-[A-Za-z0-9_-]+\.css/)?.[0] ?? null;
  const js = html.match(/index-[A-Za-z0-9_-]+\.js/)?.[0] ?? null;
  const rootMatch = html.match(/<div id="root"[^>]*>([\s\S]*?)<\/div>/);
  const prerender = rootMatch ? rootMatch[1].trim().length : 0;

  const emails = [...html.matchAll(/([\w.+-]+@[\w.-]+\.\w+)/g)].map((m) => m[1]);
  const email =
    emails.find((e) => e.includes('odins') || e.includes('odinsscents')) ??
    emails[0] ??
    null;

  const faqHeadline = html.match(/Regulatory Compliance|Frequently Asked|Questions & Answers/i)?.[0] ?? null;
  const firstFaq =
    html.match(
      /Is synthetic deer scent legal|What is CWD and why does it matter|Is citronella safe|How to Use Odin's|Best Mock Scrape|Dominant Buck Scent|Bear & Hog|Earth Cover Scent|Best Deer Food/i
    )?.[0] ?? null;

  return {
    css,
    js,
    prerender,
    email,
    faqHint: firstFaq ?? faqHeadline,
  };
}

function boolIcon(v: boolean | null): string {
  if (v === null) return '—';
  return v ? '✅' : '❌';
}

async function auditService(service: string, mapping: SiteMapping | undefined): Promise<AuditRow> {
  const local = readLocalShopify(service);
  const localFaqCount = readLocalFaqCount(service);
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
      localFaqCount,
      liveFaqHint: null,
      faqAligned: null,
      localEmail: local.email,
      liveEmail: null,
      emailAligned: null,
      deployNeeded: local.prerender > 0 || !!local.css,
      notes: notes || 'no live URL mapped',
    };
  }

  try {
    const { status, html } = await fetchLive(liveUrl);
    if (status !== 200) {
      return {
        service,
        liveUrl,
        liveStatus: status,
        localCss: local.css,
        localJs: local.js,
        liveCss: null,
        liveJs: null,
        assetsMatch: false,
        localPrerender: local.prerender,
        livePrerender: 0,
        prerenderOk: false,
        localFaqCount,
        liveFaqHint: null,
        faqAligned: null,
        localEmail: local.email,
        liveEmail: null,
        emailAligned: null,
        deployNeeded: true,
        notes: `live HTTP ${status}`,
      };
    }

    const live = parseLivePage(html);
    const assetsMatch = !!(local.css && local.js && live.css && live.js && local.css === live.css && local.js === live.js);
    const prerenderOk = local.prerender > 500 && (live.prerender === 0 || live.prerender >= local.prerender * 0.5);
    const emailAligned =
      local.email && live.email ? local.email.toLowerCase() === live.email.toLowerCase() : null;

    const deployNeeded = !assetsMatch || live.prerender < 500 || emailAligned === false;

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
      localFaqCount,
      liveFaqHint: live.faqHint,
      faqAligned: null,
      localEmail: local.email,
      liveEmail: live.email,
      emailAligned,
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
      assetsMatch: false,
      localPrerender: local.prerender,
      livePrerender: 0,
      prerenderOk: false,
      localFaqCount,
      liveFaqHint: null,
      faqAligned: null,
      localEmail: local.email,
      liveEmail: null,
      emailAligned: null,
      deployNeeded: true,
      notes: message,
    };
  }
}

function renderMarkdown(rows: AuditRow[], generatedAt: string): string {
  const deployCount = rows.filter((r) => r.deployNeeded).length;

  let md = `# Odin's Innovations — Live vs Repo Audit\n\n`;
  md += `Generated: ${generatedAt}\n\n`;
  md += `**${deployCount} of ${rows.length} sites need Shopify deploy** (asset hash mismatch, missing prerender, and/or email drift).\n\n`;
  md += `| Site | Live | Assets | Prerender (local/live) | Email | Deploy? |\n`;
  md += `|------|------|--------|-------------------------|-------|--------|\n`;

  for (const r of rows) {
    const live = r.liveUrl ? `[${r.liveStatus}](${r.liveUrl})` : '—';
    const assets =
      r.assetsMatch === null
        ? '—'
        : r.assetsMatch
          ? '✅ match'
          : `❌ local \`${r.localJs ?? '?'}\` vs live \`${r.liveJs ?? '?'}\``;
    const prerender = `${r.localPrerender} / ${r.livePrerender}`;
    const email = r.emailAligned === null ? '—' : r.emailAligned ? '✅' : `❌ ${r.localEmail} vs ${r.liveEmail}`;
    const deploy = r.deployNeeded ? '**YES**' : 'no';
    md += `| ${r.service} | ${live} | ${assets} | ${prerender} | ${email} | ${deploy} |\n`;
  }

  md += `\n## Details\n\n`;
  for (const r of rows) {
    md += `### ${r.service}\n`;
    md += `- Live URL: ${r.liveUrl ?? 'not mapped'}\n`;
    if (r.notes) md += `- Notes: ${r.notes}\n`;
    md += `- Local CSS: \`${r.localCss ?? 'missing'}\`\n`;
    md += `- Local JS: \`${r.localJs ?? 'missing'}\`\n`;
    md += `- Live CSS: \`${r.liveCss ?? 'n/a'}\`\n`;
    md += `- Live JS: \`${r.liveJs ?? 'n/a'}\`\n`;
    md += `- FAQ items (local config): ${r.localFaqCount}\n`;
    if (r.liveFaqHint) md += `- Live FAQ signal: "${r.liveFaqHint}"\n`;
    md += `\n`;
  }

  md += `## Deploy checklist (per site)\n\n`;
  md += `1. Run \`npm run build:shopify:odins\` (or single-site build)\n`;
  md += `2. Upload \`dist/assets/*.css\` and \`*.js\` to Shopify theme assets\n`;
  md += `3. Replace page liquid with \`shopify.html\` (includes prerendered \`#root\`)\n`;
  md += `4. Re-run \`npm run audit:odins-live\` until Assets + Prerender show match\n\n`;

  return md;
}

async function main(): Promise<void> {
  const asJson = process.argv.includes('--json');
  const mappingFile: MappingFile = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
  const services = listServices();
  const rows: AuditRow[] = [];

  console.log(`\n🔍 Auditing ${services.length} Odin's sites vs live Shopify...\n`);

  for (const service of services) {
    const row = await auditService(service, mappingFile.sites[service]);
    rows.push(row);
    const flag = row.deployNeeded ? '⚠️ ' : '✅ ';
    console.log(
      `${flag}${service.padEnd(32)} deploy=${row.deployNeeded ? 'YES' : 'no '}  prerender=${row.localPrerender}/${row.livePrerender}  assets=${boolIcon(row.assetsMatch)}`
    );
  }

  const generatedAt = new Date().toISOString();
  const markdown = renderMarkdown(rows, generatedAt);

  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
  const reportPath = path.join(LOGS_DIR, 'odins-live-audit.md');
  fs.writeFileSync(reportPath, markdown);

  if (asJson) {
    console.log(JSON.stringify({ generatedAt, rows }, null, 2));
  }

  console.log(`\n📄 Report written to ${reportPath}\n`);

  const deployNeeded = rows.filter((r) => r.deployNeeded).length;
  if (deployNeeded > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});