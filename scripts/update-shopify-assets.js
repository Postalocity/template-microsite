#!/usr/bin/env node

/**
 * Update Shopify Assets Script
 * 
 * After Vite build, this script:
 * 1. Scans the dist folder for CSS and JS files
 * 2. Updates shopify.html with the actual hashed filenames
 * 3. Updates the config's shopifyAssets with the mappings
 * 
 * Run after: npm run build
 * Usage: node scripts/update-shopify-assets.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Navigate from scripts/ to root, then to site directory
const ROOT_DIR = path.join(__dirname, '..');
const SITE_DIR = process.cwd();

// Check if we're in a site directory
const isSiteDir = fs.existsSync(path.join(SITE_DIR, 'package.json')) && 
                  fs.existsSync(path.join(SITE_DIR, 'dist'));

if (!isSiteDir) {
  console.error('❌ Error: This script must be run from a generated site directory after building.');
  console.error('   Usage: cd sites/odins-innovations/doe-estrus-guide && npm run build');
  process.exit(1);
}

const distDir = path.join(SITE_DIR, 'dist');
const shopifyHtmlPath = path.join(SITE_DIR, 'shopify.html');
const configPath = path.join(SITE_DIR, 'config.json');

// Find CSS and JS files in dist/assets
const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);

const cssFile = assetFiles.find(f => f.endsWith('.css') && !f.endsWith('.css.map'));
const jsFile = assetFiles.find(f => f.endsWith('.js') && !f.endsWith('.js.map') && f !== 'index.js');

if (!cssFile || !jsFile) {
  console.error('❌ Error: Could not find CSS or JS files in dist folder');
  console.error('   Found:', distFiles);
  process.exit(1);
}

console.log('📦 Found built assets:');
console.log(`   CSS: ${cssFile}`);
console.log(`   JS:  ${jsFile}`);

// Read current shopify.html
let shopifyHtml = fs.readFileSync(shopifyHtmlPath, 'utf-8');

// Update CSS reference - replace {{ 'index.css' | asset_url | stylesheet_tag }}
// with the actual hashed filename using Shopify's asset_url filter
// Handle both the original template and previously hashed versions
const oldCssRefs = [
  `{{ 'index.css' | asset_url | stylesheet_tag }}`,
  `{{ 'index-DRMLvOMf.css' | asset_url | stylesheet_tag }}`
];
const newCssRef = `{{ '${cssFile}' | asset_url | stylesheet_tag }}`;

for (const oldRef of oldCssRefs) {
  shopifyHtml = shopifyHtml.replace(oldRef, newCssRef);
}

// Update JS reference - replace {{ 'index.js' | asset_url }}
// with the actual hashed filename using Shopify's asset_url filter
// Handle both the original template and previously hashed versions
const oldJsRefs = [
  `<script type="module" src="{{ 'index.js' | asset_url }}"></script>`,
  `<script type="module" src="{{ 'index-dyUMp9BQ.js' | asset_url }}"></script>`
];
const newJsRef = `<script type="module" src="{{ '${jsFile}' | asset_url }}"></script>`;

for (const oldRef of oldJsRefs) {
  shopifyHtml = shopifyHtml.replace(oldRef, newJsRef);
}

// Write updated shopify.html
fs.writeFileSync(shopifyHtmlPath, shopifyHtml);
console.log('✅ Updated shopify.html with correct asset filenames');

// Also update config.json with the asset mappings for reference
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
config.shopifyAssets = {
  css: cssFile,
  js: jsFile,
  cssUrl: `{{ '${cssFile}' | asset_url }}`,
  jsUrl: `{{ '${jsFile}' | asset_url }}`
};
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Updated config.json with asset mappings');

console.log('\n📝 Next steps:');
console.log('   1. Upload dist/*.css and dist/*.js to Shopify Assets (not Files)');
console.log('   2. Upload shopify.html as page.doe-estrus-guide.liquid');
console.log('   3. The asset URLs in shopify.html will resolve to your uploaded files');
