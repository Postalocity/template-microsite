#!/usr/bin/env npx tsx
/**
 * Generate + build + prerender for all Broadstroke microsites (index.html deploy).
 *
 * Usage:
 *   npx tsx scripts/build-broadstroke.ts
 *   npx tsx scripts/build-broadstroke.ts --service mailing
 *   npx tsx scripts/build-broadstroke.ts --skip-generate
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { measureRootPrerender, parseAssetHashes } from './lib/html-root.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND = 'broadstroke';
const CONFIG_DIR = path.join(ROOT, 'config', 'sites', BRAND);
const SITES_DIR = path.join(ROOT, 'sites', BRAND);

const SKIP_CONFIGS = new Set(['BRAND-MASTER']);

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
    .filter((slug) => !SKIP_CONFIGS.has(slug))
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
  const distIndex = path.join(SITES_DIR, service, 'dist', 'index.html');
  const out: Pick<BuildResult, 'css' | 'js' | 'prerenderBytes'> = {};

  if (fs.existsSync(distIndex)) {
    const html = fs.readFileSync(distIndex, 'utf8');
    const assets = parseAssetHashes(html);
    out.css = assets.css ?? undefined;
    out.js = assets.js ?? undefined;
    out.prerenderBytes = measureRootPrerender(html);
  }

  return out;
}

async function main(): Promise<void> {
  const services = onlyService ? [onlyService] : listServices();
  const results: BuildResult[] = [];

  console.log(`\n🏗️  Broadstroke batch build (${services.length} site(s)) — index.html prerender\n`);

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

      run('npx vite build && npx tsx ../../../scripts/prerender-heavy.ts', siteDir);

      const artifacts = readBuildArtifacts(service);
      if (!artifacts.prerenderBytes || artifacts.prerenderBytes < 500) {
        throw new Error(`prerender #root too small (${artifacts.prerenderBytes ?? 0} bytes)`);
      }

      results.push({ service, status: 'ok', ...artifacts });
      console.log(
        `✅ ${service} — ${artifacts.css ?? '?'} + ${artifacts.js ?? '?'} — prerender ${artifacts.prerenderBytes ?? 0} bytes`
      );
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