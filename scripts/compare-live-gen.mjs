import { chromium } from 'playwright';

const targets = [
  ['LIVE', 'https://odinsinnovations.com/pages/citronella'],
  ['GEN', 'file:///Users/henrytafolla/dev/template-microsite/sites/odins-innovations/hunting-mosquito-repellent/dist/index.html'],
];

const browser = await chromium.launch();
for (const [label, url] of targets) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('section[id]', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(5000);
  const data = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('section[id]')].map((s) => ({
      id: s.id,
      h2: s.querySelector('h2')?.textContent?.trim().replace(/\s+/g, ' ').slice(0, 70) || '',
    }));
    const imgs = [...document.querySelectorAll('img')].map((img) => ({
      src: img.getAttribute('src') || '',
      alt: (img.getAttribute('alt') || '').slice(0, 50),
      ok: img.complete && img.naturalWidth > 0,
    }));
    const heroBg = document.querySelector('#hero')?.style?.backgroundImage || '';
    return { sections, imgs, heroBg };
  });
  console.log(`\n=== ${label} SECTION ORDER ===`);
  data.sections.forEach((s, i) => console.log(`${String(i + 1).padStart(2)}. #${s.id} — ${s.h2}`));
  console.log(`\n=== ${label} IMAGES (${data.imgs.filter((i) => i.ok).length}/${data.imgs.length} loaded) ===`);
  data.imgs.forEach((im, i) => console.log(`${im.ok ? 'OK' : 'XX'} ${im.src}`));
  if (data.heroBg) console.log(`Hero bg: ${data.heroBg.slice(0, 120)}`);
  await page.close();
}
await browser.close();