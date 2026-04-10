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

// Update CSS reference - replace any index-*.css with the new hashed filename
const cssRegex = /\{\{ 'index-[a-zA-Z0-9_-]*\.css' \| asset_url \| stylesheet_tag \}\}/;
const newCssRef = `{{ '${cssFile}' | asset_url | stylesheet_tag }}`;
shopifyHtml = shopifyHtml.replace(cssRegex, newCssRef);

// Update JS reference - replace any index-*.js with the new hashed filename  
const jsRegex = /<script type="module" src="\{\{ 'index-[a-zA-Z0-9_-]*\.js' \| asset_url \}\}"><\/script>/;
const newJsRef = `<script type="module" src="{{ '${jsFile}' | asset_url }}"></script>`;
shopifyHtml = shopifyHtml.replace(jsRegex, newJsRef);

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
