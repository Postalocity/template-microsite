#!/usr/bin/env npx tsx
import { chromium } from 'playwright';

const url = process.argv[2];
if (!url) {
  console.error('Usage: npx tsx scripts/scrape-live-section.ts <url>');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
const data = await page.evaluate(() => {
  const root = document.querySelector('#root');
  const children = root ? [...root.children].map((el) => ({
    tag: el.tagName.toLowerCase(),
    id: el.id || null,
    className: el.className?.slice?.(0, 80) || null,
    textPreview: el.textContent?.trim().slice(0, 120) || null,
  })) : [];
  return {
    hero: document.querySelector('header')?.innerText?.trim() ?? null,
    heroHtml: document.querySelector('header')?.innerHTML?.slice(0, 8000) ?? null,
    afterHeroHtml: (() => {
      const header = document.querySelector('header');
      let el = header?.nextElementSibling;
      const chunks: string[] = [];
      while (el && el.id !== 'benefits' && chunks.length < 3) {
        chunks.push(`<${el.tagName.toLowerCase()} id="${el.id}">${el.innerHTML.slice(0, 2000)}</${el.tagName.toLowerCase()}>`);
        el = el.nextElementSibling;
      }
      return chunks.join('\n');
    })(),
    rootChildren: children,
    benefits: document.querySelector('#benefits')?.innerText?.trim() ?? null,
    services: document.querySelector('#services')?.innerText?.trim() ?? null,
    businessContinuity: document.querySelector('#business-continuity')?.innerText?.trim() ?? null,
    footer: document.querySelector('footer')?.innerText?.trim() ?? null,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();