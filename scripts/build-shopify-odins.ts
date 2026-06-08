#!/usr/bin/env npx tsx
/**
 * Generate + build:seo for all Odin's Innovations Shopify microsites.
 *
 * Usage:
 *   npx tsx scripts/build-shopify-odins.ts
 *   npx tsx scripts/build-shopify-odins.ts --service synthetic-scent-cwd-guide
 *   npx tsx scripts/build-shopify-odins.ts --skip-generate
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'odins-innovations';
const CONFIG_DIR = path.join(ROOT, 'config', 'sites', BRAND);
const SITES_DIR = path.join(ROOT, 'sites', BRAND);

const args = process.argv.slice(2);
const skipGenerate = args.includes('--skip-generate');
const onlyService = (() => {
  const idx = args.indexOf('--service');
  return idx >= 0 ? args[idx + 1] : null;
})();

function listServices(): string[] {
  return fs
    .readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith('.json') && !f.includes('.backup'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

function run(cmd: string, cwd = ROOT): void {
  execSync(cmd, { cwd, stdio: 'inherit', env: process.env });
}

type BuildResult = {
  service: string;
  status: 'ok' | 'failed' | 'skipped';
  css?: string;
  js?: string;
  prerenderBytes?: number;
  error?: string;
};

function readBuildArtifacts(service: string): Pick<BuildResult, 'css' | 'js' | 'prerenderBytes'> {
  const siteDir = path.join(SITES_DIR, service);
  const shopifyHtml = path.join(siteDir, 'shopify.html');
  const out: Pick<BuildResult, 'css' | 'js' | 'prerenderBytes'> = {};

  if (fs.existsSync(shopifyHtml)) {
    const html = fs.readFileSync(shopifyHtml, 'utf8');
    out.css = html.match(/index-[A-Za-z0-9_-]+\.css/)?.[0];
    out.js = html.match(/index-[A-Za-z0-9_-]+\.js/)?.[0];
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<style|{{ content_for_footer)/);
    if (rootMatch) {
      out.prerenderBytes = rootMatch[1].trim().length;
    }
  }

  return out;
}

async function main(): Promise<void> {
  const services = onlyService ? [onlyService] : listServices();
  const results: BuildResult[] = [];

  console.log(`\n🏗️  Odin's Shopify batch build (${services.length} site(s))\n`);

  for (const service of services) {
    const siteDir = path.join(SITES_DIR, service);
    const configPath = path.join(CONFIG_DIR, `${service}.json`);

    if (!fs.existsSync(configPath)) {
      results.push({ service, status: 'skipped', error: 'missing config JSON' });
      continue;
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`▶ ${service}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    try {
      if (!skipGenerate) {
        run(`npm run generate -- --brand ${BRAND} --service ${service}`);
      }

      if (!fs.existsSync(path.join(siteDir, 'package.json'))) {
        throw new Error(`generated site missing package.json at ${siteDir}`);
      }

      run('npm run build:seo', siteDir);
      const artifacts = readBuildArtifacts(service);
      results.push({ service, status: 'ok', ...artifacts });
      console.log(`✅ ${service} — ${artifacts.css ?? '?'} + ${artifacts.js ?? '?'} — prerender ${artifacts.prerenderBytes ?? 0} bytes`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ service, status: 'failed', error: message });
      console.error(`❌ ${service} failed: ${message}`);
    }
  }

  const ok = results.filter((r) => r.status === 'ok').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;

  console.log(`\n📊 Build summary: ${ok} ok, ${failed} failed, ${skipped} skipped\n`);
  console.log('| Service | Status | CSS | JS | Prerender |');
  console.log('|---------|--------|-----|----|-----------|');
  for (const r of results) {
    console.log(
      `| ${r.service} | ${r.status} | ${r.css ?? '—'} | ${r.js ?? '—'} | ${r.prerenderBytes ?? '—'} |`
    );
  }

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});