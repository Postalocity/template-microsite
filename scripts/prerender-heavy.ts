#!/usr/bin/env node

/**
 * Prerender script for heavy (React/Vite CSR) microsites.
 *
 * Purpose: Snapshots the fully rendered React app into static HTML
 * so search engines (and other crawlers that don't execute JS well)
 * see the actual content (headlines, body text, sections, etc.).
 *
 * This gives the SEO benefits of static HTML while preserving the
 * full interactive React experience for real users (hydration).
 *
 * Usage (from a generated heavy site directory after `npm run build`):
 *   npx tsx ../../../scripts/prerender-heavy.ts
 *
 * Or via the generated script:
 *   npm run prerender
 *   npm run build:seo   # build + prerender
 *
 * Playwright is a dev tool for this repo (used for testing + this prerender utility).
 * It is NOT added to individual generated sites' package.json.
 *
 * Usage (from a generated heavy site dir after `npm run build`):
 *   npx tsx ../../../scripts/prerender-heavy.ts
 *
 * Or via the script added by the generator:
 *   npm run prerender
 *   npm run build:seo
 *
 * First time (from the site dir or root):
 *   npx playwright install chromium
 *
 * The script will:
 * 1. Start Vite preview server for the dist/ folder (respects base path).
 * 2. Launch headless Chromium via Playwright.
 * 3. Navigate and wait for the React app to render (networkidle + content selectors).
 * 4. Extract the full rendered HTML.
 * 5. Overwrite dist/index.html with the prerendered version (script tags for the bundle are preserved so React can hydrate).
 *
 * Notes:
 * - Works great for these single-"page" (multi-section) microsites.
 * - For true multi-route apps you'd expand route discovery.
 * - After prerender, the HTML sent to crawlers contains the real content from config + IKB.
 * - Users still get the interactive React app.
 */

import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { measureRootPrerender } from './lib/html-root.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let chromium: any;
let Browser: any;
let Page: any;

async function main() {
  const siteDir = process.cwd();
  const distDir = path.join(siteDir, 'dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(distDir) || !fs.existsSync(indexPath)) {
    console.error('❌ No dist/index.html found. Run `npm run build` first in the site directory.');
    process.exit(1);
  }

  console.log('🚀 Starting prerender for SEO (heavy CSR -> static HTML snapshot)...');

  let server: any;
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    // Start Vite preview (respects the base in vite.config.ts for asset loading)
    server = await preview({
      root: siteDir,
      preview: {
        port: 0, // random available port
        host: '127.0.0.1',
      },
    });

    const port = server.httpServer?.address?.()?.port || 4173;
    const config = server.config;

    // Use the configured base so navigation and asset hints are correct during render.
    // For subfolder sites (e.g. /citronella-mosquito-repellent/) this ensures the app renders in the right context.
    const base = (config.base && config.base !== '/' ? config.base.replace(/\/$/, '') : '');
    const url = `http://127.0.0.1:${port}${base}/`;

    console.log(`   Preview server on ${url}`);

    // Launch browser (dynamic import so we don't require playwright in the site's node_modules)
    try {
      const pw = await import('playwright');
      chromium = pw.chromium;
      browser = await chromium.launch({ headless: true });
      page = await browser.newPage();
    } catch (e) {
      console.error('❌ Playwright not found.');
      console.error('   Run from the repo root or site dir: npx playwright install chromium');
      console.error('   (Playwright is a repo-level dev tool only — it is not installed into individual generated sites.)');
      throw e;
    }

    // Navigate and wait for the app to be "ready"
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for key rendered content (ids/classes from the heavy Odins/Broadstroke/etc templates)
    // Common markers: #hero, various section ids, h1s, the main .section-container wrappers.
    const contentSelectors = [
      '#hero',
      '[id="root"] h1',
      '.section-container',
      '[id^="why-"]',
      '[id="faq"]',
      'main',
    ];

    let rendered = false;
    for (const sel of contentSelectors) {
      try {
        await page.waitForSelector(sel, { timeout: 4000 });
        rendered = true;
        break;
      } catch {}
    }

    if (!rendered) {
      // Last resort: give the React app time to finish its initial render pass
      await page.waitForTimeout(2500);
    }

    // Scroll through the page so useInView / framer-motion sections (icons, images, FAQ) animate in
    await page.evaluate(() => {
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 500) {
        window.scrollTo(0, y);
      }
      window.scrollTo(0, 0);
    });

    // Give framer-motion + async widgets time to finish animating in
    await page.waitForTimeout(2000);

    // Framer-motion leaves opacity:0 on off-screen sections during snapshot — force visible for SEO/Shopify no-JS fallback
    await page.evaluate(() => {
      document.querySelectorAll('[style]').forEach((el) => {
        const style = el.getAttribute('style') || '';
        if (!/opacity:\s*0/.test(style)) return;
        const cleaned = style
          .replace(/opacity:\s*0;?/g, 'opacity: 1;')
          .replace(/transform:\s*translate[^(]*\([^)]*\)\s*;?/g, '');
        el.setAttribute('style', cleaned);
      });
    });

    // Capture the fully rendered document
    const fullHtml = await page.content();
    const prerenderBytes = measureRootPrerender(fullHtml);

    if (prerenderBytes < 500) {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      throw new Error(
        `Prerender #root too small (${prerenderBytes} bytes) — React likely crashed during render` +
          (consoleErrors.length ? `\n   Console: ${consoleErrors.slice(0, 3).join('; ')}` : '')
      );
    }

    // Write the prerendered HTML (this is what crawlers will see)
    // We keep the original script references so the client bundle still hydrates for users.
    fs.writeFileSync(indexPath, fullHtml, 'utf8');

    console.log('✅ Prerender complete!');
    console.log(`   #root prerender: ${prerenderBytes.toLocaleString()} bytes`);
    console.log(`   Wrote full rendered content to ${indexPath}`);
    console.log('   Crawlers will now see the real section text, headings, etc. in the initial HTML.');
    console.log('   The React app will still hydrate for interactive features (accordions, mobile nav, etc.).');

  } catch (err) {
    console.error('❌ Prerender failed:', err);
    process.exit(1);
  } finally {
    if (page) await page.close().catch(() => {});
    if (browser) await browser.close().catch(() => {});
    if (server) {
      await new Promise((r) => server.httpServer?.close(r));
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
