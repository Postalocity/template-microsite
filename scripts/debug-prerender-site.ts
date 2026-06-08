#!/usr/bin/env npx tsx
import { preview } from 'vite';
import { chromium } from 'playwright';

const siteDir = process.argv[2] || process.cwd();

async function main() {
  const server = await preview({
    root: siteDir,
    preview: { port: 0, host: '127.0.0.1' },
  });

  const port = (server.httpServer?.address() as { port: number })?.port ?? 4173;
  const config = server.config;
  const base = config.base && config.base !== '/' ? String(config.base).replace(/\/$/, '') : '';
  const url = `http://127.0.0.1:${port}${base}/`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });

  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(5000);

  const rootLen = await page.evaluate(() => document.getElementById('root')?.innerHTML?.length ?? -1);
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent ?? null);

  console.log('siteDir:', siteDir);
  console.log('url:', url);
  console.log('status:', res?.status());
  console.log('title:', await page.title());
  console.log('root innerHTML length:', rootLen);
  console.log('h1:', h1);
  console.log('errors:', errors);

  await browser.close();
  await new Promise((r) => server.httpServer?.close(r));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});