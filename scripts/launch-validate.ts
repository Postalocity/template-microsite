#!/usr/bin/env tsx

/**
 * Launch Validation Script
 * Runs comprehensive validation on a microsite before launch:
 * 
 * Validates two categories:
 * 1. TEMPLATE ISSUES - Failures here are bugs in the generator/template
 * 2. CONTENT ISSUES - Warnings here are site-specific content that should be added to template
 * 
 * Usage: npm run launch-validate -- <site-name>
 * Example: npm run launch-validate -- self-storage
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const SITES_DIR = path.join(ROOT_DIR, 'sites');

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  reset: '\x1b[0m'
};

function log(msg: string) { console.log(msg); }
function log_pass(msg: string) { console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`); }
function log_fail(msg: string) { console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`); }
function log_warn(msg: string) { console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`); }
function log_info(msg: string) { console.log(`${COLORS.cyan}ℹ${COLORS.reset} ${msg}`); }
function log_content(msg: string) { console.log(`${COLORS.blue}○${COLORS.reset} ${msg}`); }
function log_section(msg: string) { log(`\n${COLORS.bold}${COLORS.magenta}${'='.repeat(60)}\n  ${msg}\n${'='.repeat(60)}${COLORS.reset}`); }

let templateFailCount = 0;
let templatePassCount = 0;
let contentWarnCount = 0;

// Get site name from command line
const siteName = process.argv[2];
if (!siteName) {
  log_fail('Usage: npm run launch-validate -- <site-name>');
  log_info('Example: npm run launch-validate -- self-storage');
  process.exit(1);
}

const siteDir = path.join(SITES_DIR, siteName);

log_section(`Launch Validation: ${siteName}`);

// ============================================
// TEMPLATE VALIDATION (Critical - Generator Issues)
// ============================================
log_section('TEMPLATE VALIDATION (Generator/Build Issues)');

const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  'index.html',
  'main.tsx',
  'config.json'
];

const requiredDirs = [
  'public',
  'public/images',
  'dist'
];

// Check required files (TEMPLATE)
for (const file of requiredFiles) {
  const filePath = path.join(siteDir, file);
  if (fs.existsSync(filePath)) {
    log_pass(`File exists: ${file}`);
    templatePassCount++;
  } else {
    log_fail(`Missing file: ${file}`);
    templateFailCount++;
  }
}

// Check required directories (TEMPLATE)
for (const dir of requiredDirs) {
  const dirPath = path.join(siteDir, dir);
  if (fs.existsSync(dirPath)) {
    log_pass(`Directory exists: ${dir}`);
    templatePassCount++;
  } else {
    log_fail(`Missing directory: ${dir}`);
    templateFailCount++;
  }
}

// ============================================
// CONFIG STRUCTURE VALIDATION (Template)
// ============================================
log_section('CONFIG STRUCTURE (Template)');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Check required config sections (TEMPLATE - these must exist)
  const requiredConfigSections = ['site', 'navigation', 'content', 'seo'];
  for (const section of requiredConfigSections) {
    if (config[section]) {
      log_pass(`Config section: ${section}`);
      templatePassCount++;
    } else {
      log_fail(`Missing config section: ${section}`);
      templateFailCount++;
    }
  }
  
  // Check SEO fields (TEMPLATE)
  if (config.seo?.title) {
    log_pass('SEO title present');
    templatePassCount++;
  } else {
    log_fail('SEO title missing');
    templateFailCount++;
  }
  
  if (config.seo?.description) {
    log_pass('SEO description present');
    templatePassCount++;
  } else {
    log_fail('SEO description missing');
    templateFailCount++;
  }
  
  // Check promo codes (TEMPLATE) - validate all CTAs have correct promo
  const promoCodes: Record<string, string> = {
    'credit-repair': 'cr2026',
    'debt-collection': 'debt2026',
    'healthcare-billing': 'hb2026',
    'healthcare-mailing-services': 'hm2026',
    'postcard': 'pc2026',
    'self-storage': 'pm2026',
    'property-management': 'pm2026',
    'real-estate': 're2026',
    'propane': 'pr2026',
    'education': 'ed2026'
  };
  
  const siteSlug = config.site?.slug || '';
  const expectedPromo = promoCodes[siteSlug] || '2026';
  
  // Check navigation CTA
  const navCtaHref = config.navigation?.cta?.href || '';
  if (navCtaHref.includes(`promo=${expectedPromo}`)) {
    log_pass(`Navigation CTA has correct promo: ${expectedPromo}`);
    templatePassCount++;
  } else if (navCtaHref.includes('promo=')) {
    log_fail(`Navigation CTA promo incorrect: found ${navCtaHref.match(/promo=([^&]+)/)?.[1]}, expected ${expectedPromo}`);
    templateFailCount++;
  } else {
    log_fail('Navigation CTA missing promo code');
    templateFailCount++;
  }
  
  // Check hero CTAs
  const heroCtas = config.content?.hero?.ctas || [];
  let heroCtaPromoPass = true;
  for (const cta of heroCtas) {
    if (cta.href && cta.href.includes('login.html') && !cta.href.includes(`promo=${expectedPromo}`)) {
      heroCtaPromoPass = false;
    }
  }
  if (heroCtaPromoPass && heroCtas.length > 0) {
    log_pass(`Hero CTAs have correct promo: ${expectedPromo}`);
    templatePassCount++;
  } else if (heroCtas.length > 0) {
    log_fail('Hero CTA promo mismatch');
    templateFailCount++;
  }
  
  // Check footer CTA
  const footerCtaHref = config.content?.footer?.finalCTA?.href || '';
  if (footerCtaHref.includes(`promo=${expectedPromo}`)) {
    log_pass(`Footer CTA has correct promo: ${expectedPromo}`);
    templatePassCount++;
  } else if (footerCtaHref.includes('promo=')) {
    log_fail(`Footer CTA promo incorrect: found ${footerCtaHref.match(/promo=([^&]+)/)?.[1]}, expected ${expectedPromo}`);
    templateFailCount++;
  } else if (footerCtaHref.includes('login.html')) {
    log_fail('Footer CTA missing promo code');
    templateFailCount++;
  }
  
} catch (e: any) {
  log_fail(`Config validation failed: ${e.message}`);
  templateFailCount++;
}

// ============================================
// CONTENT MATCH VALIDATION (Config vs Generated)
// ============================================
log_section('CONTENT MATCHING (Config vs Generated)');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const indexHtml = fs.readFileSync(path.join(siteDir, 'dist', 'index.html'), 'utf-8');
  
  // Check hero headline matches
  const heroHeadline = config.content?.hero?.headline?.main || '';
  if (heroHeadline && indexHtml.includes(heroHeadline)) {
    log_pass('Hero headline matches config');
    templatePassCount++;
  } else if (heroHeadline) {
    log_fail('Hero headline mismatch in generated HTML');
    templateFailCount++;
  }
  
  // Check title matches
  const seoTitle = config.seo?.title || '';
  if (seoTitle && indexHtml.includes(seoTitle)) {
    log_pass('SEO title matches config');
    templatePassCount++;
  } else if (seoTitle) {
    log_fail('SEO title mismatch in generated HTML');
    templateFailCount++;
  }
  
  // Check description matches
  const seoDesc = config.seo?.description || '';
  if (seoDesc && indexHtml.includes(seoDesc)) {
    log_pass('SEO description matches config');
    templatePassCount++;
  } else if (seoDesc) {
    log_fail('SEO description mismatch in generated HTML');
    templateFailCount++;
  }
  
} catch (e: any) {
  log_warn(`Content matching validation skipped: ${e.message}`);
}

// ============================================
// BUILD VALIDATION (Template)
// ============================================
log_section('BUILD OUTPUT (Template)');

try {
  const distDir = path.join(siteDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distFiles = fs.readdirSync(distDir);
    const htmlFiles = distFiles.filter(f => f.endsWith('.html'));
    
    const assetsDir = path.join(distDir, 'assets');
    let jsFiles: string[] = [];
    let cssFiles: string[] = [];
    
    if (fs.existsSync(assetsDir)) {
      const assetFiles = fs.readdirSync(assetsDir);
      jsFiles = assetFiles.filter(f => f.endsWith('.js'));
      cssFiles = assetFiles.filter(f => f.endsWith('.css'));
    }
    
    if (htmlFiles.length > 0) {
      log_pass(`HTML built: ${htmlFiles.length}`);
      templatePassCount++;
    } else {
      log_fail('No HTML in dist');
      templateFailCount++;
    }
    
    if (jsFiles.length > 0) {
      log_pass(`JS built: ${jsFiles.length}`);
      templatePassCount++;
    } else {
      log_fail('No JS in dist');
      templateFailCount++;
    }
    
    if (cssFiles.length > 0) {
      log_pass(`CSS built: ${cssFiles.length}`);
      templatePassCount++;
    } else {
      log_fail('No CSS in dist');
      templateFailCount++;
    }
    
  } else {
    log_fail('Site not built - run: npm run build');
    templateFailCount++;
  }
} catch (e: any) {
  log_fail(`Build validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// SEO META VALIDATION (Template)
// ============================================
log_section('SEO META TAGS (Template)');

try {
  const indexHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf-8');
  
  // These are TEMPLATE-level checks
  if (indexHtml.includes('<meta name="description"')) {
    log_pass('Meta description in template');
    templatePassCount++;
  } else {
    log_fail('Meta description missing in template');
    templateFailCount++;
  }
  
  if (indexHtml.includes('<meta property="og:')) {
    log_pass('Open Graph tags in template');
    templatePassCount++;
  } else {
    log_fail('Open Graph tags missing in template');
    templateFailCount++;
  }
  
  if (indexHtml.includes('application/ld+json')) {
    log_pass('JSON-LD Schema in template');
    templatePassCount++;
  } else {
    log_fail('JSON-LD Schema missing in template');
    templateFailCount++;
  }
  
  if (indexHtml.includes('theme-color')) {
    log_pass('Theme-color meta in template');
    templatePassCount++;
  } else {
    log_fail('Theme-color meta missing in template');
    templateFailCount++;
  }
  
} catch (e: any) {
  log_fail(`SEO template validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// SECTION STRUCTURE VALIDATION
// ============================================
log_section('SECTION STRUCTURE (Required Sections)');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Check all required sections exist
  const requiredSections = [
    { key: 'hero', name: 'Hero' },
    { key: 'benefits', name: 'Benefits' },
    { key: 'services', name: 'Services' },
    { key: 'faq', name: 'FAQ' },
    { key: 'footer', name: 'Footer' }
  ];
  
  for (const section of requiredSections) {
    if (config.content?.[section.key]) {
      log_pass(`Section present: ${section.name}`);
      templatePassCount++;
    } else {
      log_fail(`Missing section: ${section.name}`);
      templateFailCount++;
    }
  }
  
  // Check comparison or difference section exists
  const hasComparison = config.content?.comparison;
  const hasDifference = config.content?.difference;
  
  if (hasComparison || hasDifference) {
    log_pass('Comparison/Difference section present');
    templatePassCount++;
  } else {
    log_warn('No comparison or difference section');
    contentWarnCount++;
  }
  
  // Static sections always present via template defaults
  log_content('Static sections: howItWorks, difference, trustSignals (template defaults)');
  
} catch (e: any) {
  log_fail(`Section validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// NAVIGATION & LINKS VALIDATION
// ============================================
log_section('NAVIGATION & LINKS');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Check navigation links - verify hrefs are valid formats
  const navLinks = config.navigation?.links || [];
  
  if (navLinks.length >= 3) {
    log_pass(`Navigation has ${navLinks.length} links`);
    templatePassCount++;
  } else {
    log_fail(`Navigation has only ${navLinks.length} links - need at least 3`);
    templateFailCount++;
  }
  
  // Check all nav links have valid hrefs
  for (const link of navLinks) {
    const href = link.href || '';
    const label = link.label || '';
    
    // Valid: #section-id or https://...
    if (href.startsWith('#') || href.startsWith('http')) {
      log_pass(`Nav link "${label}" -> ${href.substring(0, 30)}`);
      templatePassCount++;
    } else {
      log_fail(`Nav link "${label}" has invalid href: ${href}`);
      templateFailCount++;
    }
  }
  
  // Check footer blurb/description
  const footerDesc = config.content?.footer?.description || config.footer?.description;
  if (footerDesc && footerDesc.length > 20) {
    log_pass(`Footer blurb present (${footerDesc.length} chars)`);
    templatePassCount++;
  } else {
    log_fail('Footer blurb/description missing or too short');
    templateFailCount++;
  }
  
  // Check CTA links are valid URLs (skip anchor links for this check)
  const allCtas = [
    config.navigation?.cta,
    ...(config.content?.hero?.ctas || []),
    config.content?.footer?.finalCTA
  ].filter(Boolean);
  
  let externalCtaCount = 0;
  for (const cta of allCtas) {
    const href = cta?.href || '';
    // Count external URLs (not anchor links)
    if (href.includes('postalocity.com') || href.startsWith('http')) {
      externalCtaCount++;
    }
  }
  
  if (externalCtaCount >= 2) {
    log_pass(`External CTA links: ${externalCtaCount}`);
    templatePassCount++;
  } else {
    log_warn(`Only ${externalCtaCount} external CTA links - may need more`);
    contentWarnCount++;
  }
  
} catch (e: any) {
  log_fail(`Navigation validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// ASSETS VALIDATION
// ============================================
log_section('ASSETS & IMAGES');

try {
  const publicDir = path.join(siteDir, 'public');
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Check hero image
  const heroImage = config.content?.hero?.background?.image || '';
  if (heroImage) {
    // Check if hero image exists in images directory (generator may strip slug prefix)
    const imagesDir = path.join(publicDir, 'images');
    let found = false;
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      if (files.some(f => f.includes('hero'))) {
        log_pass(`Hero image exists in images folder`);
        templatePassCount++;
        found = true;
      }
    }
    
    if (!found) {
      log_fail(`Hero image NOT FOUND: ${heroImage}`);
      templateFailCount++;
    }
  }
  
  // Check OG image
  const ogImagePaths = [
    path.join(publicDir, 'og-image.png'),
    path.join(publicDir, 'images', 'og-image.png')
  ];
  let ogExists = false;
  for (const p of ogImagePaths) {
    if (fs.existsSync(p)) {
      ogExists = true;
      log_pass('OG image exists');
      templatePassCount++;
      break;
    }
  }
  if (!ogExists) {
    log_fail('OG image NOT FOUND');
    templateFailCount++;
  }
  
  // Check favicon
  const faviconPaths = [
    path.join(publicDir, 'favicon.ico'),
    path.join(publicDir, 'favicon.png')
  ];
  let faviconExists = false;
  for (const p of faviconPaths) {
    if (fs.existsSync(p)) {
      faviconExists = true;
      log_pass('Favicon exists');
      templatePassCount++;
      break;
    }
  }
  if (!faviconExists) {
    log_fail('Favicon NOT FOUND');
    templateFailCount++;
  }
  
} catch (e: any) {
  log_fail(`Assets validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// CONTACT INFO VALIDATION
// ============================================
log_section('CONTACT INFO');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  const contact = config.site?.contact || {};
  
  if (contact.email) {
    log_pass(`Email: ${contact.email}`);
    templatePassCount++;
  } else {
    log_fail('Contact email missing');
    templateFailCount++;
  }
  
  if (contact.phone) {
    log_pass(`Phone: ${contact.phone}`);
    templatePassCount++;
  } else {
    log_fail('Contact phone missing');
    templateFailCount++;
  }
  
  if (contact.address) {
    log_pass('Address present');
    templatePassCount++;
  } else {
    log_fail('Contact address missing');
    templateFailCount++;
  }
  
} catch (e: any) {
  log_fail(`Contact validation error: ${e.message}`);
  templateFailCount++;
}

// ============================================
// CONTENT VALIDATION (Site-Specific - Warnings Only)
// ============================================
log_section('CONTENT VALIDATION (Site-Specific - Add to Template)');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // Hero alt text - CONTENT specific
  if (config.content?.hero?.background?.alt) {
    log_content('Hero alt text: Present (site-specific)');
  } else {
    log_warn('Hero alt text: Missing - add to template');
    contentWarnCount++;
  }
  
  // Trust signals - CONTENT
  if (config.content?.trustSignals) {
    log_content('Trust signals: Present (site-specific)');
  } else {
    log_warn('Trust signals: Missing - add to template');
    contentWarnCount++;
  }
  
  // How it works - CONTENT
  if (config.content?.howItWorks) {
    log_content('How It Works: Present (site-specific)');
  } else {
    log_warn('How It Works: Missing - add to template');
    contentWarnCount++;
  }
  
  // Footer CTA button text - CONTENT
  if (config.content?.footer?.finalCTA?.buttonText) {
    log_content('Footer CTA button: Present (site-specific)');
  } else {
    log_warn('Footer CTA button text: Missing - add to template');
    contentWarnCount++;
  }
  
  // Navigation CTA text - CONTENT
  if (config.navigation?.cta?.text) {
    log_content(`Nav CTA: "${config.navigation.cta.text}" (site-specific)`);
  } else {
    log_warn('Navigation CTA text: Missing - add to template');
    contentWarnCount++;
  }
  
} catch (e: any) {
  log_warn(`Content validation error: ${e.message}`);
  contentWarnCount++;
}

// ============================================
// CONVERSION ELEMENTS (Content - Warnings)
// ============================================
log_section('CONVERSION ELEMENTS (Site-Specific)');

try {
  const configPath = path.join(siteDir, 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  // All these are content-specific
  if (config.navigation?.cta) {
    const ctaText = config.navigation.cta.text || '';
    if (ctaText.toLowerCase().includes('sign up') || ctaText.toLowerCase().includes('get started')) {
      log_content(`Nav CTA action: "${ctaText}" - OK`);
    } else {
      log_warn(`Nav CTA text "${ctaText}" - consider "Sign Up Now"`);
      contentWarnCount++;
    }
  }
  
  // Hero CTAs
  const heroCtas = config.content?.hero?.ctas?.length || 0;
  if (heroCtas >= 2) {
    log_content(`Hero CTAs: ${heroCtas} - OK`);
  } else {
    log_warn(`Hero CTAs: ${heroCtas} - recommend 2 (primary + secondary)`);
    contentWarnCount++;
  }
  
  // Benefits count
  const benefitsCount = config.content?.benefits?.benefits?.length || 0;
  if (benefitsCount >= 3) {
    log_content(`Benefits: ${benefitsCount} - OK`);
  } else {
    log_warn(`Benefits: ${benefitsCount} - recommend 3+`);
    contentWarnCount++;
  }
  
  // FAQ count
  const faqCount = config.content?.faq?.faqs?.length || 0;
  if (faqCount >= 3) {
    log_content(`FAQ: ${faqCount} - OK`);
  } else {
    log_warn(`FAQ: ${faqCount} - recommend 3+`);
    contentWarnCount++;
  }
  
} catch (e: any) {
  log_warn(`Conversion validation error: ${e.message}`);
  contentWarnCount++;
}

// ============================================
// SUMMARY
// ============================================
log_section('VALIDATION SUMMARY');

log(`${COLORS.green}Template Passed: ${templatePassCount}${COLORS.reset}`);
log(`${COLORS.red}Template Failed: ${templateFailCount}${COLORS.reset}`);
log(`${COLORS.yellow}Content Warnings: ${contentWarnCount}${COLORS.reset}`);
log('');

if (templateFailCount > 0) {
  log(`${COLORS.red}${COLORS.bold}❌ LAUNCH BLOCKED${COLORS.reset}`);
  log(`${COLORS.red}Fix ${templateFailCount} template/generator issues${COLORS.reset}`);
  process.exit(1);
} else if (contentWarnCount > 0) {
  log(`${COLORS.yellow}${COLORS.bold}⚠️  TEMPLATE OK - Content warnings${COLORS.reset}`);
  log(`${COLORS.yellow}These are site-specific - consider adding to template:${COLORS.reset}`);
  log(`${COLORS.yellow}  npm run launch-validate -- <site> shows what to add${COLORS.reset}`);
  process.exit(0);
} else {
  log(`${COLORS.green}${COLORS.bold}✅ LAUNCH READY - All checks passed!${COLORS.reset}`);
  process.exit(0);
}
