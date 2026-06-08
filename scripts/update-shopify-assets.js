#!/usr/bin/env node

/**
 * Update Shopify Assets Script
 *
 * After Vite build (+ optional prerender), this script:
 * 1. Scans dist/assets for hashed CSS and JS filenames
 * 2. Updates shopify.html liquid asset references with real filenames
 * 3. Injects prerendered #root innerHTML from dist/index.html (when present)
 * 4. Sanitizes subfolder base paths in injected markup for Shopify asset_url
 * 5. Updates config.json shopifyAssets mappings
 *
 * Run after: npm run build:seo  (or: npm run build && npm run prerender && npm run post-build)
 * Usage: node scripts/update-shopify-assets.js  (from a generated site directory)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_DIR = process.cwd();

const isSiteDir =
  fs.existsSync(path.join(SITE_DIR, 'package.json')) &&
  fs.existsSync(path.join(SITE_DIR, 'dist'));

if (!isSiteDir) {
  console.error('❌ Error: This script must be run from a generated site directory after building.');
  console.error('   Usage: cd sites/<brand>/<slug> && npm run build:seo && npm run post-build');
  process.exit(1);
}

const distDir = path.join(SITE_DIR, 'dist');
const shopifyHtmlPath = path.join(SITE_DIR, 'shopify.html');
const configPath = path.join(SITE_DIR, 'config.json');
const distIndexPath = path.join(distDir, 'index.html');

// --- Resolve Vite base path (subfolder deploy) ---
function resolveBasePath() {
  const viteConfigPath = path.join(SITE_DIR, 'vite.config.ts');
  if (fs.existsSync(viteConfigPath)) {
    const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');
    const match = viteConfig.match(/base:\s*['"]([^'"]+)['"]/);
    if (match?.[1]) {
      let base = match[1];
      if (!base.startsWith('/')) base = '/' + base;
      return base.replace(/\/$/, '') || '/';
    }
  }

  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const basename = config.site?.basename || config.basename;
      if (basename) {
        let base = basename.startsWith('/') ? basename : `/${basename}`;
        return base.replace(/\/$/, '') || '/';
      }
      const slug = config.site?.slug;
      if (slug) return `/${slug}`;
    } catch {
      /* fall through */
    }
  }

  return '/';
}

// --- Depth-aware #root parsing (handles deeply nested markup) ---
function findRootBounds(html) {
  const openMatch = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!openMatch || openMatch.index === undefined) return null;

  const startIdx = openMatch.index + openMatch[0].length;
  let depth = 1;
  let i = startIdx;
  let endCloseIdx = -1;

  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        endCloseIdx = nextClose;
        break;
      }
      i = nextClose + 6;
    }
  }

  if (endCloseIdx === -1) return null;

  return {
    openIndex: openMatch.index,
    innerStart: startIdx,
    closeIndex: endCloseIdx,
    closeEnd: endCloseIdx + 6,
  };
}

function extractRootInnerHtml(html) {
  const bounds = findRootBounds(html);
  if (!bounds) return null;
  return html.slice(bounds.innerStart, bounds.closeIndex);
}

function replaceRootDiv(html, newInnerHtml) {
  const bounds = findRootBounds(html);
  if (!bounds) return null;
  return (
    html.slice(0, bounds.openIndex) +
    `<div id="root">${newInnerHtml}</div>` +
    html.slice(bounds.closeEnd)
  );
}

// --- Strip subfolder prefix from asset paths for Shopify theme Assets ---
// Framer-motion hides icons/images with opacity:0 until scroll — strip for Shopify prerender body
function stripHiddenMotionStyles(markup) {
  if (!markup) return markup;
  return markup.replace(/style="([^"]*)"/g, (match, style) => {
    if (!/opacity:\s*0/.test(style)) return match;
    const cleaned = style
      .replace(/opacity:\s*0;?/g, 'opacity: 1;')
      .replace(/transform:\s*translate[^(]*\([^)]*\)\s*;?/g, '');
    return `style="${cleaned}"`;
  });
}

function sanitizeBasePathsInMarkup(markup, basePath) {
  if (!markup || !basePath || basePath === '/') return markup;

  const escaped = basePath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const assetPathRegex = new RegExp(
    `((?:href|src)=["'])(${escaped})?(/assets/|/_astro/|assets/|_astro/)`,
    'g'
  );
  let result = markup.replace(assetPathRegex, '$1$3');
  const broadBaseAsset = new RegExp(`${escaped}/(assets|_astro)/`, 'g');
  result = result.replace(broadBaseAsset, '/$1/');
  return result;
}

// --- Find built CSS/JS in dist/assets ---
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ Error: dist/assets not found. Run npm run build first.');
  process.exit(1);
}

const assetFiles = fs.readdirSync(assetsDir);
const cssFile = assetFiles.find((f) => f.endsWith('.css') && !f.endsWith('.css.map'));
const jsFile = assetFiles.find(
  (f) => f.endsWith('.js') && !f.endsWith('.js.map') && f !== 'index.js'
);

if (!cssFile || !jsFile) {
  console.error('❌ Error: Could not find CSS or JS files in dist/assets');
  console.error('   Found:', assetFiles);
  process.exit(1);
}

console.log('📦 Found built assets:');
console.log(`   CSS: ${cssFile}`);
console.log(`   JS:  ${jsFile}`);

let shopifyHtml = fs.readFileSync(shopifyHtmlPath, 'utf-8');

// Patch liquid CSS ref (index.css, index-*.css, or any prior hash)
shopifyHtml = shopifyHtml.replace(
  /\{\{\s*'index[^']*\.css'\s*\|\s*asset_url\s*\|\s*stylesheet_tag\s*\}\}/g,
  `{{ '${cssFile}' | asset_url | stylesheet_tag }}`
);

// Patch liquid JS ref
shopifyHtml = shopifyHtml.replace(
  /<script\s+type="module"\s+src="\{\{\s*'index[^']*\.js'\s*\|\s*asset_url\s*\}\}"><\/script>/g,
  `<script type="module" src="{{ '${jsFile}' | asset_url }}"></script>`
);

console.log('✅ Updated shopify.html with correct asset filenames');

// --- Inject prerendered body into #root ---
const basePath = resolveBasePath();
console.log(`   Base path (for asset sanitization): ${basePath}`);

if (fs.existsSync(distIndexPath)) {
  const distHtml = fs.readFileSync(distIndexPath, 'utf-8');
  const rootInner = extractRootInnerHtml(distHtml);

  if (rootInner && rootInner.trim().length > 50) {
    const sanitized = stripHiddenMotionStyles(sanitizeBasePathsInMarkup(rootInner, basePath));
    const markerBlock =
      /<!--\s*PRERENDERED_CONTENT[^>]*-->\s*<div\s+id=["']root["'][^>]*>\s*<\/div>/i;

    if (markerBlock.test(shopifyHtml)) {
      const injectedRoot = `<div id="root">${sanitized}</div>`;
      shopifyHtml = shopifyHtml.replace(
        markerBlock,
        `<!-- PRERENDERED_CONTENT (injected from dist/index.html) -->\n    ${injectedRoot}`
      );
      console.log('✅ Injected prerendered content via PRERENDERED_CONTENT marker + #root');
    } else {
      const replaced = replaceRootDiv(shopifyHtml, sanitized);
      if (replaced) {
        shopifyHtml = replaced;
        console.log('✅ Replaced #root with fresh prerendered content (depth-aware)');
      } else {
        console.warn('⚠️  Could not find #root in shopify.html; skipping body injection');
      }
    }
  } else {
    console.warn(
      '⚠️  dist/index.html has empty #root — run npm run prerender before post-build for Shopify SEO body'
    );
  }
} else {
  console.warn('⚠️  dist/index.html not found; skipping body injection');
}

fs.writeFileSync(shopifyHtmlPath, shopifyHtml);

// Update config.json with asset mappings
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  config.shopifyAssets = {
    css: cssFile,
    js: jsFile,
    cssUrl: `{{ '${cssFile}' | asset_url }}`,
    jsUrl: `{{ '${jsFile}' | asset_url }}`,
    prerenderedBodyInjected: Boolean(
      extractRootInnerHtml(fs.readFileSync(distIndexPath, 'utf-8'))?.trim().length > 50
    ),
  };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✅ Updated config.json with asset mappings');
}

console.log('\n📝 Next steps:');
console.log('   1. Upload dist/assets/*.css and *.js to Shopify Theme Assets');
console.log('   2. Upload shopify.html as your page liquid template (e.g. page.<slug>.liquid)');
console.log('   3. Liquid asset_url tags + prerendered body will serve styled static HTML; React hydrates for interactivity');