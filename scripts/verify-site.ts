#!/usr/bin/env tsx

/**
 * Site Verification Script
 * Validates that the generated site:
 * 1. Has all required files
 * 2. Config loads correctly
 * 3. Content structure is valid
 * 4. Content meets production standards
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function log_pass(msg: string) {
  console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`);
}

function log_fail(msg: string) {
  console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`);
}

function log_warn(msg: string) {
  console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`);
}

function log_section(msg: string) {
  console.log(`\n\x1b[1;36m${msg}${COLORS.reset}`);
}

let passCount = 0;
let failCount = 0;
let warnCount = 0;

function test(description: string, testFn: () => boolean): void {
  try {
    const result = testFn();
    if (result) {
      passCount++;
      log_pass(description);
    } else {
      failCount++;
      log_fail(description);
    }
  } catch (error) {
    failCount++;
    log_fail(`${description}: ${(error as Error).message}`);
  }
}

function warn(description: string, testFn: () => boolean): void {
  try {
    const result = testFn();
    if (!result) {
      warnCount++;
      log_warn(description);
    }
  } catch (error) {
    warnCount++;
    log_warn(`${description}: ${(error as Error).message}`);
  }
}

// Verification
async function verifySite() {
  const args = process.argv.slice(2);
  const configName = args[0] || 'healthcare-billing';
  
  const siteDir = path.join(__dirname, '..', 'sites', configName);
  const configPath = path.join(siteDir, 'config.json');

  console.log(`Config path: ${configPath}`);
  console.log(`Config exists: ${fs.existsSync(configPath)}`);
  // Load config once at the start
  let config: any;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (error) {
    console.error(`Error loading config from ${configPath}:`, error);
    process.exit(1);
  }

  console.log(`Config keys loaded: ${Object.keys(config)}`);
  console.log(`Has content: ${config ? 'yes' : 'no'}`);
  if (config?.content) {
    console.log(`Has hero: ${config.content.hero ? 'yes' : 'no'}`);
    if (config?.content?.hero) {
      console.log(`Hero keys: ${Object.keys(config.content.hero)}`);
    }
  }

  console.log('════════════════════════════════════════════════════════════');
  console.log(`🧪 Template Microsite System Verification - ${configName}`);
  console.log('════════════════════════════════════════════════════════════');

  // Site Structure Tests
  log_section('📁 File Structure');

  test('Generated main.tsx exists', () => {
    return fs.existsSync(path.join(siteDir, 'main.tsx'));
  });

  test('Generated vite.config.ts exists', () => {
    return fs.existsSync(path.join(siteDir, 'vite.config.ts'));
  });

  test('Generated package.json exists', () => {
    return fs.existsSync(path.join(siteDir, 'package.json'));
  });

  test('Generated index.html exists', () => {
    return fs.existsSync(path.join(siteDir, 'index.html'));
  });

  test('Generated config.json exists', () => {
    return fs.existsSync(configPath);
  });

  test('Generated robots.txt exists', () => {
    return fs.existsSync(path.join(siteDir, 'robots.txt'));
  });

  test('Generated sitemap.xml exists', () => {
    return fs.existsSync(path.join(siteDir, 'sitemap.xml'));
  });

  // Config Structure Tests
  log_section('⚙️ Configuration Structure');

  test('Has site object', () => config?.site !== undefined);
  test('Has site.name', () => config?.site?.name !== undefined);
  test('Has proper slug', () => config?.site?.slug === configName);
  test('Has proper domain', () => config?.site?.domain !== undefined);
  test('Has contact information', () => config?.site?.contact !== undefined);
  test('Has contact email', () => config?.site?.contact?.email !== undefined);
  test('Has branding object', () => config?.branding !== undefined);
  test('Has tagline', () => config?.branding?.tagline !== undefined);
  test('Has theme object', () => config?.theme !== undefined);
  test('Has primary color HSL values', () => config?.theme?.primary?.h !== undefined);
  test('Has navigation links array', () => Array.isArray(config?.navigation?.links) && config.navigation.links.length > 0);
  test('Has content object', () => config?.content !== undefined);

  // Content Structure Tests
  log_section('📝 Content Structure');

  // Debug: Check hero structure
  if (config?.content?.hero) {
    console.log('Hero keys:', Object.keys(config.content.hero));
  }

  test('Has hero content', () => config?.content?.hero !== undefined);
  test('Has hero headline.main', () => config?.content?.hero?.headline?.main !== undefined);
  test('Has hero headline.highlightTerm', () => config?.content?.hero?.headline?.highlightTerm !== undefined);
  test('Has hero subhead with 50+ chars', () => config?.content?.hero?.subhead?.length > 50);
  test('Has hero background', () => config?.content?.hero?.background !== undefined);
  test('Has hero CTAs array with 2 items', () => config?.content?.hero?.ctas?.length === 2);
  test('Has benefits section', () => config?.content?.benefits !== undefined);
  test('Has 4 benefits', () => config?.content?.benefits?.benefits?.length === 4);
  test('Each benefit has icon, title, detail, metrics', () => {
    const benefits = config.content.benefits.benefits;
    return benefits.every((b: any) => b.icon && b.title && b.detail && b.metrics);
  });
  test('Has services section', () => config?.content?.services !== undefined);
  test('Has 6 services', () => config?.content?.services?.services?.length === 6);
  test('Each service has icon, title, description', () => {
    const services = config.content.services.services;
    return services.every((s: any) => s.icon && s.title && s.description);
  });
  test('Has comparison section', () => config?.content?.comparison !== undefined);
  test('Has comparison columns', () => config?.content?.comparison?.columns !== undefined);
  test('Has comparison rows', () => config?.content?.comparison?.rows?.length > 0);
  test('Has FAQ section', () => config?.content?.faq !== undefined);
  test('Has 5 FAQs', () => config?.content?.faq?.faqs?.length === 5);
  test('Each FAQ has question and answer', () => {
    const faqs = config.content.faq.faqs;
    return faqs.every((f: any) => f.q && f.a && f.q.length > 10 && f.a.length > 20);
  });

// Content Loading Tests
  log_section('🔗 Content Loading');

  const mainContent = fs.readFileSync(path.join(siteDir, 'main.tsx'), 'utf-8');
  test('Imports config from ./config.json', () => mainContent.includes("import config from './config.json'"));
  test('Imports components from ../common', () => mainContent.includes('from \'../common/components/shared\''));
  test('Imports HeroSection', () => mainContent.includes('HeroSection'));
  test('Imports BenefitsSection', () => mainContent.includes('BenefitsSection'));
  test('Imports ServicesSection', () => mainContent.includes('ServicesSection'));
  test('Imports FAQSection', () => mainContent.includes('FAQSection'));
  test('Imports ComparisonSection', () => mainContent.includes('ComparisonSection'));
  test('Imports SiteNavigation', () => mainContent.includes('SiteNavigation'));
  test('Imports SiteFooter', () => mainContent.includes('SiteFooter'));
  test('Destructures config content', () => mainContent.includes('const { content } = config'));

  // Content Standards Tests
  log_section('✨ Production Content Standards');

  const heroHeadline = config.content.hero.headline.main.toLowerCase();
  const heroSubhead = config.content.hero.subhead.toLowerCase();

  test('Hero headline has no dramatic language', () => {
    const dramaticWords = ['amazing', 'incredible', 'revolutionize', 'unbelievable', 'mind-blowing'];
    return !dramaticWords.some(word => heroHeadline.includes(word));
  });

  test('Hero subhead has no dramatic language', () => {
    const dramaticWords = ['amazing', 'incredible', 'revolutionize', 'unbelievable', 'mind-blowing'];
    return !dramaticWords.some(word => heroSubhead.includes(word));
  });

  test('Hero headline uses hours-focused messaging', () => {
    return heroHeadline.match(/(\d+[\+\s]*hours?)/i) !== null;
  });

  warn('Hero subhead contains relevant keywords', () => {
    const domain = config.site.slug;
    if (domain === 'healthcare-billing') {
      return heroSubhead.includes('healthcare') && heroSubhead.toLowerCase().includes('billing');
    }
    return true; // Skip for other domains
  });

  test('Benefits contain specific metrics', () => {
    const metrics = config.content.benefits.benefits.map((b: any) => b.metrics);
    return metrics.some((m: string) => m.match(/\d+\s*(hour|hours|point|points|%|\$)/i));
  });

  // Build Configuration Tests
  log_section('🔧 Build Configuration');

  const viteConfig = fs.readFileSync(path.join(siteDir, 'vite.config.ts'), 'utf-8');
  const expectedBase = config?.site?.basename || '/' + configName;
  test(`Vite config has base path ${expectedBase}`, () => {
    return viteConfig.includes(`base: '${expectedBase}'`);
  });
  test('Vite config has alias for ../common', () => viteConfig.includes('../common'));
  test('Vite config resolves alias to ../../common', () => viteConfig.includes('../../common'));

// Build Output Tests
  log_section('📦 Build Output');

  const distDir = path.join(siteDir, 'dist');
  test('Dist directory exists', () => fs.existsSync(distDir));
  test('Dist has index.html', () => fs.existsSync(path.join(distDir, 'index.html')));
  test('Dist has assets directory', () => fs.existsSync(path.join(distDir, 'assets')));
  test('Dist has CSS bundle', () => {
    const assets = fs.readdirSync(path.join(distDir, 'assets'));
    return assets.some((f: any) => f.endsWith('.css'));
  });
  test('Dist has JS bundle', () => {
    const assets = fs.readdirSync(path.join(distDir, 'assets'));
    return assets.some((f: any) => f.endsWith('.js'));
  });

  // SEO Files Tests (FIX #3)
  log_section('🔍 SEO Files');

  const robotsTxt = fs.readFileSync(path.join(siteDir, 'robots.txt'), 'utf-8');
  test('robots.txt has User-agent directive', () => robotsTxt.includes('User-agent: *'));
  test('robots.txt allows indexing', () => robotsTxt.includes('Allow: /'));
  test('robots.txt references sitemap', () => robotsTxt.includes('Sitemap:'));

  const sitemapXml = fs.readFileSync(path.join(siteDir, 'sitemap.xml'), 'utf-8');
  test('sitemap.xml has XML declaration', () => sitemapXml.includes('<?xml version="1.0"'));
  test('sitemap.xml has urlset namespace', () => sitemapXml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  test(`sitemap.xml has URL with ${config?.site?.domain}`, () => sitemapXml.includes(`https://${config?.site?.domain}`));

  // Check built HTML
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    const builtHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    const expectedTitle = config?.site?.name || configName;
    const expectedBase = config?.site?.basename || '/' + configName;
    test(`Built HTML has title "${expectedTitle}"`, () => builtHtml.includes(expectedTitle));
    test('Built HTML has hero subhead meta description', () => builtHtml.includes(config.content.hero.subhead.substring(0, 50)));
    test(`Built HTML has script with base path ${expectedBase}`, () => builtHtml.includes(`${expectedBase}/assets/`));
    test('Built HTML loads fonts', () => builtHtml.includes('fonts.googleapis.com'));

    // Schema.org Structured Data Tests (FIX #2 - LocalBusiness schema)
    test('Built HTML has JSON-LD structured data', () => builtHtml.includes('<script type="application/ld+json">'));
    test('Built HTML has WebSite schema', () => builtHtml.includes('"@type": "WebSite"'));
    test('Built HTML has Organization schema', () => builtHtml.includes('"@type": "Organization"'));
    test('Built HTML has FAQPage schema', () => builtHtml.includes('"@type": "FAQPage"'));

    // FIX #2 - LocalBusiness schema
    test('Built HTML has LocalBusiness schema', () => builtHtml.includes('"@type": "LocalBusiness"'));
    test('LocalBusiness has openingHoursSpecification', () => builtHtml.includes('"openingHoursSpecification"'));
    test('LocalBusiness has priceRange', () => builtHtml.includes('"priceRange"'));

    // FIX #1 - Address parsing
    test('Address has streetAddress field', () => builtHtml.includes('"streetAddress": '));
    test('Address has addressLocality field', () => builtHtml.includes('"addressLocality": '));
    test('Address has addressRegion field', () => builtHtml.includes('"addressRegion": '));
    test('Address has postalCode field', () => builtHtml.includes('"postalCode": '));
  }

  // Summary
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📊 Test Results Summary');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`${COLORS.green}✓ Passed:${COLORS.reset} ${passCount}`);
  console.log(`${COLORS.red}✗ Failed:${COLORS.reset} ${failCount}`);
  console.log(`${COLORS.yellow}⚠ Warnings:${COLORS.reset} ${warnCount}`);
  console.log('════════════════════════════════════════════════════════════');

  if (failCount === 0) {
    console.log(`\n${COLORS.green}🎉 All tests passed! System is production-ready.${COLORS.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${COLORS.red}❌ ${failCount} test(s) failed. Please review above.${COLORS.reset}\n`);
    process.exit(1);
  }
}

verifySite().catch((error) => {
  console.error('Fatal error during verification:', error);
  process.exit(1);
});