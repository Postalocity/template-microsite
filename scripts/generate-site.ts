#!/usr/bin/env node

/**
 * Site Generation Script
 * Multi-brand microsite generation platform
 * 
 * Usage:
 *   npx ts-node scripts/generate-site.ts --brand postalocity --service credit-repair
 *   npx ts-node scripts/generate-site.ts postalocity/credit-repair  (legacy)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEngineContext, loadSiteConfig, listBrands, listServices } from '../engine/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory paths
const ROOT_DIR = path.join(__dirname, '..');
const CONFIGS_DIR = path.join(ROOT_DIR, 'config/sites');  // No default brand - require explicit brand parameter
const SITES_DIR = path.join(ROOT_DIR, 'sites');
const TEMPLATE_DIR = ROOT_DIR;

// Import pricing utilities from centralized pricing module
import { processPricingPlaceholders } from '../common/utils/pricing';

/**
 * Generation warning comment for auto-generated files.
 * Prepended to main.tsx and config.json to prevent manual edits.
 */
function getGenerationWarning(siteName: string, brandName: string, fileType: 'tsx' | 'json'): string {
  const fileDesc = fileType === 'tsx' ? 'React component module' : 'runtime configuration';
  const commentStyle = fileType === 'tsx'
    ? { start: '/**', mid: ' *', end: ' */' }
    : { start: '/*', mid: ' *', end: ' */' };
  const { start, mid, end } = commentStyle;
  const timestamp = new Date().toISOString();

  return `${start}
${mid} ============================================================================
${mid} ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
${mid} ============================================================================
${mid}
${mid} File:      ${fileType === 'tsx' ? 'main.tsx' : 'config.json'}
${mid} Type:      ${fileDesc}
${mid} Site:      ${siteName}
${mid} Brand:    ${brandName}
${mid} Generated: ${timestamp}
${mid} Generator: scripts/generate-site.ts
${mid}
${mid} ╔══════════════════════════════════════════════════════════════════════╗
${mid} ║  EDIT THE SOURCE, NOT THE OUTPUT                                      ║
${mid} ║                                                                      ║
${mid} ║  To customize this site's content, edit:                              ║
${mid} ║    config/sites/${brandName}/${siteName}.json                        ║
${mid} ║                                                                      ║
${mid} ║  To customize the site template, edit the generator function in:       ║
${mid} ║    scripts/generate-site.ts                                          ║
${mid} ║                                                                      ║
${mid} ║  To add custom sections or deviate from the brand template,           ║
${mid} ║  create a new template function (e.g., generateMySiteTemplate)       ║
${mid} ║  and add routing in the switch/case block.                           ║
${mid} ║                                                                      ║
${mid} ║  To share styling or components across sites, add them to:            ║
${mid} ║    common/themes/${brandName}/components/shared/                    ║
${mid} ║  Never create site-specific component files in the generated site.    ║
${mid} ║                                                                      ║
${mid} ║  DO NOT bypass the pre-commit hook with --no-verify.                  ║
${mid} ║  The hook exists to prevent manual edits to generated files.          ║
${mid} ╚══════════════════════════════════════════════════════════════════════╝
${end}`;
}

/**
 * Source file reference for editing — maps generated files to their source.
 */
function getSourceReference(brandName: string, siteName: string): string {
  return `Source: config/sites/${brandName}/${siteName}.json | Template: scripts/generate-site.ts`;
}

/**
 * TypeScript interfaces for type safety (Codex #11)
 */
interface SiteInfo {
  id?: string;
  name: string;
  slug: string;
  domain?: string;
  basename: string;
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
}

interface FAQ {
  q: string;
  a: string;
}

interface BrandContext {
  brand: {
    id: string;
    name: string;
    slug: string;
    domain: string;
    tagline?: string;
    urls: Record<string, string>;
    logo: {
      filename: string;
      alt: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    hours?: {
      weekdays?: string;
      support?: string;
    };
  };
  social: Record<string, string>;
}

interface SiteConfig {
  canonicalDomain?: string;
  site: SiteInfo;
  branding: {
    tagline: string;
    logo: string | null;
    primaryColor?: string;
    secondaryColor?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    canonicalUrl?: string;
    robots?: string;
    sitemapPriority?: number;
    sitemapChangeFrequency?: string;
    priceRange?: string;
    latitude?: number;
    longitude?: number;
    googleAnalyticsId?: string;
  };
  navigation?: {
    links?: Array<{ label: string; href: string; }>;
    cta?: {
      text: string;
      subtext?: string;
      href: string;
      variant?: string;
    };
  };
  content?: {
    hero?: {
      headline?: {
        main: string;
        highlightTerm?: string;
      };
      subhead: string;
      background?: {
        image: string;
        alt: string;
      };
      ctas?: Array<{
        text: string;
        subtext?: string;
        href: string;
        variant?: string;
      }>;
    };
    benefits?: {
      section: {
        title: string;
        description: string;
      };
      benefits: Array<{
        icon: string;
        title: string;
        detail: string;
        metrics?: string;
      }>;
    };
    services?: {
      section: {
        title: string;
        description: string;
      };
      services: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    comparison?: {
      section: {
        title: string;
        description: string;
      };
      columns: {
        ourSolution: string;
        traditional: string;
      };
      rows: Array<{
        icon?: string;
        feature: string;
        ourSolution: string | {
          text: string;
          highlight?: string;
          isEnvelope?: boolean;
        };
        traditionalApproach: string;
      }>;
    };
    faq?: {
      section: {
        title: string;
        description: string;
      };
      faqs: Array<{
        q: string;
        a: string;
      }>;
    };
  };
  theme?: {
    primary: { h: number; s: number; l: number };
    gradients?: {
      hero?: string;
      cta?: string;
    };
  };
  footer?: {
    finalCTA?: {
      headline: string;
      description: string;
      buttonText: string;
      href: string;
    };
    description?: string;
    tagline?: string;
  };
}

// Expand shorthand content config (like "headline": "...") into full section configs
function expandShorthandContent(content: Record<string, unknown>): Record<string, unknown> {
  const expanded = { ...content };
  
  // Map kebab-case fields to camelCase for processing
  const fieldMappings: Record<string, string> = {
    'how-it-works': 'howItWorks',
    'when-to-use': 'whenToUse',
    'how-to-use': 'howToUse',
  };
  
  // Apply field mappings
  for (const [kebab, camel] of Object.entries(fieldMappings)) {
    if (expanded[kebab] && !expanded[camel]) {
      expanded[camel] = expanded[kebab];
    }
  }
  
  // Map of shorthand fields to their full section structure
  const sectionFields = ['benefits', 'comparison', 'services', 'faq', 'howItWorks', 'trustSignals'];
  
  for (const field of sectionFields) {
    if (expanded[field]) {
      const value = expanded[field] as Record<string, unknown>;
      // If it's a shorthand with just "headline", expand to full section
      if (value.headline && !value.section) {
        expanded[field] = {
          section: {
            title: value.headline as string,
            description: value.description || '',
          },
          // Preserve other fields like benefits, services, rows, etc.
          ...value,
        };
      }
    }
  }
  
  return expanded;
}

/**
 * Copy brand-specific assets to the site's public directory.
 * Respects existing files - never overwrites brand-specific assets.
 * Priority: common/assets/{brandId}/{slug}/* > common/assets/{brandId}/* > common/assets/*
 */
function copyBrandAssets(siteDir: string, brandId: string, siteSlug: string): void {
  const publicDir = path.join(siteDir, 'public');
  
  // Create public dir if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const imagesDir = path.join(publicDir, 'images');
  
  // Copy hero images from brand-specific source if they exist
  // Priority: common/assets/{brandId}/{slug}/* > common/assets/{brandId}/hero* > common/assets/{slug}/* > common/assets/hero*
  const heroImageSources = [
    // Brand + service specific hero images
    { src: path.join(TEMPLATE_DIR, 'common/assets', brandId, `${siteSlug}-hero.jpg`), dest: path.join(imagesDir, 'hero.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets', brandId, `${siteSlug}-hero-bg.jpg`), dest: path.join(imagesDir, 'hero-bg.jpg') },
    // Brand-level hero images
    { src: path.join(TEMPLATE_DIR, 'common/assets', brandId, 'hero.jpg'), dest: path.join(imagesDir, 'hero.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets', brandId, 'hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
    // Service-level hero images (non-brand-specific)
    { src: path.join(TEMPLATE_DIR, 'common/assets', siteSlug, 'hero.jpg'), dest: path.join(imagesDir, 'hero.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets', siteSlug, 'hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
    // Generic fallbacks (only if nothing brand-specific exists)
    { src: path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets/healthcare/hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets/utilities/hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
    { src: path.join(TEMPLATE_DIR, 'common/assets/hero-bg.jpg'), dest: path.join(imagesDir, 'hero-bg.jpg') },
  ];

  // Find the first existing hero image source
  let heroCopied = false;
  for (const { src, dest } of heroImageSources) {
    if (fs.existsSync(src)) {
      // Create images dir if needed
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }
      // ONLY copy if destination doesn't already exist (preserve brand-specific pre-placed images)
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        console.log(`✓ Copied hero image: ${path.basename(src)} → images/${path.basename(dest)}`);
      } else {
        console.log(`✓ Hero image already exists at ${dest} (preserving brand-specific asset)`);
      }
      heroCopied = true;
      break;
    }
  }
  
  if (!heroCopied) {
    console.log('ℹ No hero image source found - site will use config-specified image path');
  }

  // Copy favicons and logos
  copyFavicons(siteDir, brandId);
}

// Copy favicons and logos from common/assets to all sites
function copyFavicons(siteDir: string, brandId: string): void {
  const publicDir = path.join(siteDir, 'public');
  
  // Create public dir if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Skip local favicon copy — CDN favicon is used via <link> tag in index.html
  // Local favicon.ico overrides the CDN URL in browsers
  const faviconDest = path.join(publicDir, 'favicon.ico');
  if (fs.existsSync(faviconDest)) {
    fs.unlinkSync(faviconDest);
    console.log('✓ Removed local favicon.ico (using CDN version)');
  }
  
  // Copy logo files (light and dark variants) - ONLY if they don't already exist
  const brandLogoDir = path.join(TEMPLATE_DIR, 'common/assets', brandId);
  
  // Copy light logo (logo.png)
  const lightLogoSource = path.join(brandLogoDir, 'logo.png');
  const lightLogoDest = path.join(publicDir, 'logo.png');
  if (fs.existsSync(lightLogoSource) && !fs.existsSync(lightLogoDest)) {
    fs.copyFileSync(lightLogoSource, lightLogoDest);
    console.log(`✓ Copied light logo from ${brandId} assets`);
  } else if (fs.existsSync(lightLogoDest)) {
    console.log(`✓ Light logo already exists (preserving brand-specific asset)`);
  }
  
  // Copy dark logo (logo-dark.png)
  const darkLogoSource = path.join(brandLogoDir, 'logo-dark.png');
  const darkLogoDest = path.join(publicDir, 'logo-dark.png');
  if (fs.existsSync(darkLogoSource) && !fs.existsSync(darkLogoDest)) {
    fs.copyFileSync(darkLogoSource, darkLogoDest);
    console.log(`✓ Copied dark logo from ${brandId} assets`);
  } else if (fs.existsSync(darkLogoDest)) {
    console.log(`✓ Dark logo already exists (preserving brand-specific asset)`);
  }
}

// Generate Open Graph images from hero banner
async function generateOgImages(siteDir: string, config: SiteConfig, brandId: string): Promise<void> {
  const { exec } = await import('child_process');
  const publicDir = path.join(siteDir, 'public');

  // Create public dir if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const ogImageDest = path.join(publicDir, 'og-image.png');
  const logoDest = path.join(publicDir, 'logo.png');
  
  // Determine logo source - use brand-specific logo if available
  const brandLogoPath = path.join(TEMPLATE_DIR, 'common/assets', brandId, 'logo.png');
  const genericLogoPath = path.join(TEMPLATE_DIR, 'common/assets/logo.png');
  const commonLogoPath = fs.existsSync(brandLogoPath) ? brandLogoPath : genericLogoPath;

  // Check if sips is available (macOS)
  const sipsCheck = await new Promise<{ stdout: string, stderr: string }>((resolve) => {
    exec('which sips', (error, stdout, stderr) => {
      if (error) {
        resolve({ stdout: '', stderr: String(error) });
      } else {
        resolve({ stdout, stderr });
      }
    });
  });

  // Copy logo from common assets (no resizing - each brand maintains its original dimensions)
  // ONLY copy if destination doesn't already exist
  if (fs.existsSync(commonLogoPath) && !fs.existsSync(logoDest)) {
    fs.copyFileSync(commonLogoPath, logoDest);
    console.log('✓ Copied logo image from common assets');
  } else if (fs.existsSync(logoDest)) {
    console.log('✓ Logo already exists (preserving brand-specific asset)');
  }

  // Get hero image path from config with fallback locations
  let heroImagePath = config.content?.hero?.background?.image;

  if (!heroImagePath) {
    console.log('⚠ No hero image specified in config - generating fallback OG image');
    await generateFallbackOgImage(ogImageDest, config);
    return;
  }

  // Auto-detect hero image source based on site slug
  // Standard convention: common/assets/{slug}/hero.jpg or common/assets/{brand}/{slug}-hero.jpg
  const siteSlug = config.site?.slug || '';
  const brandSlug = config.site?.id?.split('-')[0] || 'default'; // Extract brand from site id
  
  // Try standard slug directory first, then brand directory, then fall back to category-based directories
  const possibleSourcePaths = [
    path.join(TEMPLATE_DIR, 'common/assets', siteSlug, 'hero.jpg'),
    path.join(TEMPLATE_DIR, 'common/assets', siteSlug, 'hero-bg.jpg'),
    // Brand-specific hero images: common/assets/broadstroke/commercial-printing-hero.jpg
    path.join(TEMPLATE_DIR, 'common/assets', brandSlug, `${siteSlug}-hero.jpg`),
    path.join(TEMPLATE_DIR, 'common/assets', brandSlug, 'hero.jpg'),
    path.join(TEMPLATE_DIR, 'common/assets', brandSlug, 'hero-bg.jpg'),
    // Category-based fallbacks for services that share assets
    path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'),        // credit-repair, postcard
    path.join(TEMPLATE_DIR, 'common/assets/healthcare/hero-bg.jpg'),    // healthcare-*
    path.join(TEMPLATE_DIR, 'common/assets/utilities/hero-bg.jpg'),     // utility-billing
    path.join(TEMPLATE_DIR, 'common/assets/hero-bg.jpg'),               // generic fallback
  ];

  // Find first existing source path
  let heroSourcePath: string | undefined;
  for (const srcPath of possibleSourcePaths) {
    if (fs.existsSync(srcPath)) {
      heroSourcePath = srcPath;
      break;
    }
  }

  // CRITICAL: If the config specifies a hero image path that already exists in the site's public/images,
  // use THAT image instead of overwriting with a generic fallback.
  // This preserves brand-specific hero images that were pre-placed or downloaded.
  const configHeroFullPath = path.join(siteDir, 'public', heroImagePath.replace(/^\//, ''));
  if (fs.existsSync(configHeroFullPath)) {
    console.log(`✓ Using existing brand-specific hero image: ${configHeroFullPath}`);
    heroSourcePath = configHeroFullPath;
  }

  if (!heroSourcePath) {
    console.log(`⚠ No hero image source found for ${siteSlug} - generating fallback OG image`);
    await generateFallbackOgImage(ogImageDest, config);
    return;
  }

  // Copy hero image to generated site's public/images folder ONLY if destination doesn't exist
  const heroImagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(heroImagesDir)) {
    fs.mkdirSync(heroImagesDir, { recursive: true });
  }
  // Use source path for copy, but keep config's filename for the destination
  const heroImageFilename = path.basename(heroImagePath);
  const heroImagePathInSite = path.join(heroImagesDir, heroImageFilename);
  if (!fs.existsSync(heroImagePathInSite)) {
    fs.copyFileSync(heroSourcePath, heroImagePathInSite);
    console.log(`✓ Copied hero image to: ${heroImagePathInSite}`);
  } else {
    console.log(`✓ Hero image already exists at ${heroImagePathInSite} (preserving brand-specific asset)`);
  }

  // Use the source path for OG image generation
  let heroFullPath = heroSourcePath;

  if (!heroFullPath) {
    return;
  }

  // Try to convert SVG to PNG using sharp, then resize with sips
  const heroExt = heroFullPath.toLowerCase();
  const isSvg = heroExt.endsWith('.svg');

  if (isSvg) {
    // Convert SVG to PNG first using sharp
    try {
      const sharp = (await import('sharp')).default;
      await sharp(heroFullPath)
        .resize(1200, 630, { fit: 'inside', withoutEnlargement: true })
        .png()
        .toFile(ogImageDest);
      console.log('✓ Converted SVG to PNG for OG image (1200x630px)');
    } catch (error) {
      // Fallback if sharp not available or fails
      console.log('⚠ Sharp unavailable or failed - SVG cannot be converted');
      console.log('⚠ OG image not generated for SVG hero image');
    }
    return;
  }

  // Check if hero image is a supported raster format (PNG, JPEG, WEBP)
  const isSupportedFormat =
    heroExt.endsWith('.png') ||
    heroExt.endsWith('.jpg') ||
    heroExt.endsWith('.jpeg') ||
    heroExt.endsWith('.webp');

  if (!isSupportedFormat) {
    console.log(`⚠ Unsupported hero image format: ${path.extname(heroFullPath)}`);
    console.log('. Supported formats: PNG, JPEG, WEBP');
    return;
  }

  // If sips is available, resize hero image
  if (heroFullPath && sipsCheck.stdout) {
    // Resize hero to 1200x630 for Open Graph
    await new Promise<void>((resolve) => {
      exec(`sips -z 630 1200 "${heroFullPath}" --out "${ogImageDest}"`, (error) => {
        if (!error) {
          console.log('✓ Generated OG image from hero banner (1200x630px)');
        } else {
          console.log('⚠ Failed to resize hero image, copying instead');
          fs.copyFileSync(heroFullPath, ogImageDest);
        }
        resolve();
      });
    });
  } else if (heroFullPath) {
    // Fallback: Just copy hero image as OG image without resizing
    fs.copyFileSync(heroFullPath, ogImageDest);
    console.log('✓ Copied hero image as OG image (resizing not available)');
  }
}

// Generate fallback OG image when hero image is not available
async function generateFallbackOgImage(ogImageDest: string, config: SiteConfig): Promise<void> {
  const sharp = (await import('sharp')).default;
  
  // Get primary color from theme or branding, fallback to teal
  const primaryColor = config.theme?.primary || { h: 173, s: 79, l: 24 };
  const siteName = config.site?.name || 'Site';
  const tagline = config.branding?.tagline || 'Automated Mailing Service';
  
  // Create a simple gradient background with text
  const svgContent = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${primaryColor.h}, ${primaryColor.s}%, ${primaryColor.l}%)"/>
          <stop offset="100%" style="stop-color:hsl(${primaryColor.h}, ${primaryColor.s}%, ${primaryColor.l - 15}%)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="600" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">${siteName}</text>
      <text x="600" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle">${tagline}</text>
      <text x="600" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)" text-anchor="middle">${config.site?.domain || ''}</text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svgContent))
      .png()
      .toFile(ogImageDest);
    console.log('✓ Generated fallback OG image with site branding');
  } catch (error) {
    console.log('⚠ Failed to generate fallback OG image');
  }
}

async function generateSite(siteDir: string, config: SiteConfig, brandContext?: BrandContext, brandId?: string) {
  try {
    const { site } = config;

    console.log(`Generating site: ${site.name}`);
    console.log(`Output directory: ${siteDir}`);

    // Create site directory
    if (!fs.existsSync(siteDir)) {
      fs.mkdirSync(siteDir, { recursive: true });
    }

    // Generate main.tsx with brand context
    const indexContent = generateIndexFile(config, brandContext, brandId);
    fs.writeFileSync(path.join(siteDir, 'main.tsx'), indexContent);

    // Copy config.json with generation warning
    const configWarning = getGenerationWarning(site.slug, brandId || 'unknown', 'json');
    // JSON doesn't support comments, so we add a _generated metadata field
    const configWithWarning = {
      _generated: {
        warning: 'AUTO-GENERATED FILE — DO NOT EDIT MANUALLY. Edit config/sites/' + (brandId || 'unknown') + '/' + site.slug + '.json instead. Then regenerate: npx tsx scripts/generate-site.ts --brand ' + (brandId || 'unknown') + ' --service ' + site.slug,
        source: 'config/sites/' + (brandId || 'unknown') + '/' + site.slug + '.json',
        template: 'scripts/generate-site.ts',
        generatedAt: new Date().toISOString(),
        doNotEdit: true,
        doNotBypassPreCommitHook: true
      },
      ...config
    };
    fs.writeFileSync(path.join(siteDir, 'config.json'), JSON.stringify(configWithWarning, null, 2));

    // Generate vite.config.ts
    const viteConfigContent = generateViteConfig(site.slug, brandId);
    fs.writeFileSync(path.join(siteDir, 'vite.config.ts'), viteConfigContent);

    // Copy postcss.config.js
    const postcssConfig = fs.readFileSync(path.join(TEMPLATE_DIR, 'postcss.config.js'), 'utf-8');
    fs.writeFileSync(path.join(siteDir, 'postcss.config.js'), postcssConfig);

    // Generate tailwind.config.ts for the site
    const tailwindConfig = generateTailwindConfig(brandId);
    fs.writeFileSync(path.join(siteDir, 'tailwind.config.ts'), tailwindConfig);

    // Copy globals.css - use brand-specific theme if available
    const themeGlobalsPath = path.join(TEMPLATE_DIR, 'common/themes', brandId || '', 'globals.css');
    const globalsSourcePath = fs.existsSync(themeGlobalsPath) ? themeGlobalsPath : path.join(TEMPLATE_DIR, 'common/globals.css');
    const globalsCss = fs.readFileSync(globalsSourcePath, 'utf-8');
    fs.writeFileSync(path.join(siteDir, 'globals.css'), globalsCss);
    if (fs.existsSync(themeGlobalsPath)) {
      console.log(`✓ Using brand-specific theme: ${brandId}`);
    }

    // Copy package.json with site-specific config
    const packageJson = generatePackageJson(site);
    fs.writeFileSync(path.join(siteDir, 'package.json'), packageJson);

    // Create index.html
    const indexHtml = generateIndexHtml(config, brandContext);
    fs.writeFileSync(path.join(siteDir, 'index.html'), indexHtml);

    // Create shopify.html (Liquid template for Shopify pages)
    const shopifyHtml = generateShopifyHtml(config, brandContext);
    fs.writeFileSync(path.join(siteDir, 'shopify.html'), shopifyHtml);

    // Ensure public directory exists for static assets
    const publicDir = path.join(siteDir, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate robots.txt and sitemap.xml to public folder (FIX #3 - SEO indexing)
    const robotsTxt = generateRobotsTxt(site);
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    const sitemapXml = generateSitemapXml(config);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

    // Copy brand-specific assets (hero images, favicons, logos)
    // Respects existing files - never overwrites brand-specific assets
    copyBrandAssets(siteDir, brandId || '', site.slug || '');

    // Generate Open Graph images from hero banner (SEO optimization)
    // Uses existing brand-specific images if available, falls back to generated OG
    await generateOgImages(siteDir, config, brandId || '');

    // Post-processing with StringRay agents (if --post-process flag)
    const postProcessFlag = process.argv.includes('--post-process');
    if (postProcessFlag) {
      console.log(`\n🤖 Running post-processing with StringRay agents...\n`);
      const { spawn } = await import('child_process');
      const postProcess = spawn('npx', ['tsx', path.join(__dirname, 'post-process.ts'), site.slug], {
        stdio: 'inherit',
      });
      await new Promise((resolve, reject) => {
        postProcess.on('close', (code) => {
          if (code === 0) {
            resolve(null);
          } else {
            reject(new Error(`Post-processing exited with code ${code}`));
          }
        });
      });
    }

    console.log(`✅ ${site.name} generated successfully!`);
    console.log(`📁 Generated files:`);
    console.log(`   - main.tsx`);
    console.log(`   - vite.config.ts`);
    console.log(`   - postcss.config.js`);
    console.log(`   - tailwind.config.ts`);
    console.log(`   - package.json`);
    console.log(`   - index.html`);
    console.log(`   - shopify.html (Shopify Liquid template)`);
    console.log(`   - globals.css`);
    console.log(`   - robots.txt`);
    console.log(`   - sitemap.xml`);
    console.log(`   - favicon.ico (copied from common/assets)`);
    console.log(`   - og-image.png (generated from hero banner)`);
    console.log(`   - logo.png (copied from common assets)`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   cd ${siteDir}`);
    console.log(`   npm install`);
    console.log(`   npm run build`);

  } catch (error) {
    console.error('Error generating site:', error);
    process.exit(1);
  }
}

function generateIndexFile(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  
  // Check for brand-specific template override
  if (brandId === 'broadstroke') {
    // Route promo to its own template (has highlight section + unique IKB)
    if (site.slug === 'promo') {
      return generatePromoTemplate(config, brandContext, brandId);
    }
    return generateBroadstrokeTemplate(config, brandContext, brandId);
  }
  if (brandId === 'odins-innovations') {
    // Route Citronella to its own template
    if (site.slug === 'hunting-mosquito-repellent') {
      return generateCitronellaTemplate(config, brandContext, brandId);
    }
    // Route CWD guide to its own template
    if (site.slug === 'synthetic-scent-cwd-guide') {
      return generateCWDSiteTemplate(config, brandContext, brandId);
    }
    // Route Dominant Buck to its own template
    if (site.slug === 'dominant-buck-scent-guide') {
      return generateDominantBuckTemplate(config, brandContext, brandId);
    }
    // Route Scrape Scent Guide to its own template
    if (site.slug === 'scrape-scent-guide') {
      return generateScrapeScentTemplate(config, brandContext, brandId);
    }
    // Route Food Scent Deer Attractants to its own template
    if (site.slug === 'food-scent-deer-attractants') {
      return generateFoodScentTemplate(config, brandContext, brandId);
    }
    return generateOdinsInnovationsTemplate(config, brandContext, brandId);
  }
  
  // Fallback defaults (only used for legacy mode without brand context)
  // Note: Legacy mode should be avoided - always use brand context for proper multi-tenancy
  const fallbackBrand = {
    id: '',
    name: '',
    slug: '',
    domain: '',
    urls: {
      app: '',
      website: '',
      blog: '',
      howWeHelp: '',
      whoWeServe: '',
      contact: '',
      faq: '',
    },
    logo: {
      filename: '',
      alt: '',
    },
  };
  
  const fallbackContact = {
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    hours: {
      weekdays: '',
      support: '',
    },
  };
  
  const fallbackSocial = {};
  
  // Use brand context if provided, otherwise fall back to empty defaults
  // IMPORTANT: For proper multi-tenancy, always provide brand context
  const brand = brandContext?.brand || fallbackBrand;
  const contact = brandContext?.contact || fallbackContact;
  const social = brandContext?.social || fallbackSocial;
  
  // Check if brand has theme-specific components
  const usesBrandTheme = brandId && fs.existsSync(path.join(TEMPLATE_DIR, 'common/themes', brandId, 'globals.css'));
  
  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     ${brand.name}
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/${brandId || 'unknown'}/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/${brandId || 'brand'}/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { Bug, Leaf, Clock, Check } from 'lucide-react';
${usesBrandTheme ? `import { HeroSection, FAQSection, ComparisonTable, TrustBadgesSection } from '@/themes/${brandId}/components/shared';
import SiteNavigation from '@/themes/${brandId}/components/shared/SiteNavigation';
import SiteFooter from '@/themes/${brandId}/components/shared/SiteFooter';` : `import { HeroSection, FAQSection, ComparisonTable, TrustBadgesSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';`}
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
${usesBrandTheme ? `import '@/themes/${brandId}/globals.css';` : `import '@/globals.css';`}
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration with promo codes - dynamic based on site
const ikbConfig = ${JSON.stringify({
  rules: {
    trustSignals: config.content?.features?.trustSignals || [
      'EPA-Registered Biopesticide',
      'Made in USA',
      'Legal in All 50 States',
    ],
    promoCodes: {
      'hunting-mosquito-repellent': 'HUNT2026',
      'citronella-mosquito-repellent': 'HUNT2026',
    },
    approvedSections: ['hero', 'features', 'introduction', 'why-odins', 'detection', 'application', 'blinds', 'layered', 'turkey', 'comparison', 'howItWorks', 'faq', 'footer', 'trustSignals'],
    blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading'],
  },
  pricing: {
    basePrice: 14.95,
    currency: 'USD',
    units: 'bottle',
  },
})};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['${site.slug}'] || '2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        
        {/* Features Section */}
        {content.features && (
          <section id="features" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.features.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.features.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {content.features.features?.map((feature: {title: string; description: string; icon?: string}, idx: number) => {
                  // Map feature titles to Lucide icons (matching live site)
                  const iconMap: Record<string, React.ElementType> = {
                    'Peak Season Protection': Bug,  // Uses bug icon, not shield
                    'Scent-Safe Formula': Leaf,
                    'Long-Lasting Barrier': Clock,
                    'EPA-Registered': Check,
                  };
                  const IconComponent = iconMap[feature.title] || Check;
                  return (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ color: '#2d5a3d' }}>
                        <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm" style={{ color: '#666' }}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        
        {/* Dynamic content sections - only render if data exists */}
        {content.introduction && (
          <section id="introduction" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center max-w-3xl mx-auto">
                <p className="font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.introduction.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content['why-odins'] && (
          <section id="why-odins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content['why-odins'].headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content['why-odins'].items?.map((item: string, idx: number) => (
                  <div key={idx} className="p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="font-body text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.detection && (
          <section id="detection" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding the three-stage targeting process
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {['CO₂ Detection', 'Skin Chemistry', 'Body Heat'].map((stage, idx) => (
                  <div key={idx} className="text-center p-6">
                    <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--primary))' }}>
                      STAGE {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2">{stage}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.application && (
          <section id="application" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.application.headline}
                </h2>
                {content.application.note && (
                  <p className="font-body text-sm text-gray-400 italic">{content.application.note}</p>
                )}
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {content.application.steps?.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0" style={{ background: 'hsl(var(--primary))', color: 'white' }}>
                      {idx + 1}
                    </div>
                    <p className="font-body text-white text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.blinds && (
          <section id="blinds" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.blinds.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.blinds.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.layered && (
          <section id="layered" className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Weatherproof Formula', 'Polymer Technology', 'Easy Storage'].map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.turkey && (
          <section id="turkey" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.turkey.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.turkey.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {content.howItWorks && (
          <section id="how-it-works" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.howItWorks.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.howItWorks.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.faq && <FAQSection faq={content.faq} />}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
 root.render(<App />);
`;
}

function generateBroadstrokeTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};

  // Broadstroke-specific IKB config
  const ikbConfig = {
    rules: {
      trustSignals: ['NCOA Verified 2024', 'CASS Certified 2024', 'ISO 9001 Documented Processes 2023'],
      promoCodes: {
        'credit-repair': 'cr2026',
        'debt-collection': 'debt2026',
        'healthcare-billing': 'hb2026',
        'healthcare-mailing-services': 'hm2026',
        'postcard': 'pc2026',
        'self-storage': 'pm2026',
      },
      approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'pricing'],
      blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
      blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading', 'guaranteed delivery', '100% accurate'],
    },
    pricing: {
      basePrice: 1.31,
      currency: 'USD',
      units: 'letter',
      addOns: {
        'certified-mail': 4.50,
        'return-receipt': 3.35,
        'ncoa-verification': 0.05,
        'address-verification': 0.02,
      },
    },
    proofOptions: {
      standard: [{ id: 'usps-photo', name: 'USPS Photo', description: 'Photo of mailpiece delivered by carrier', tier: 'included' }],
      upgrades: [
        { id: 'certified-mail', name: 'Certified Mail', description: 'Track and confirm delivery with signature', tier: 'optional', additionalCost: 4.15 },
        { id: 'electronic-return-receipt', name: 'Electronic Return Receipt', description: 'Digital signature confirmation via email', tier: 'optional', additionalCost: 3.50 },
      ],
    },
    terminology: {
      mailClasses: {
        'first-class': { name: 'First-Class Mail', description: 'Standard USPS mail service', hasTracking: true, hasCertificate: false, allowsPersonalData: true, useCases: ['letters', 'invoices'] },
        'marketing-mail': { name: 'Marketing Mail', description: 'Cost-effective bulk mailing', hasTracking: false, hasCertificate: false, allowsPersonalData: true, useCases: ['promotional'] },
      },
      certifications: {
        'ncov': { name: 'NCOA', fullName: 'National Change of Address', description: 'Address verification service' },
        'cass': { name: 'CASS', fullName: 'Coding Accuracy Support System', description: 'USPS-certified address standardization' },
      },
    },
  };

  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     ${brand.name || 'Broadstroke'}
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/${brandId || 'broadstroke'}/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/${brandId || 'broadstroke'}/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration with promo codes
const ikbConfig = ${JSON.stringify(ikbConfig)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['${site.slug}'] || '2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        {content.testimonials && content.testimonials.length > 0 && <TestimonialsSection />}
        <FAQSection faq={content.faq} />
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
 root.render(<App />);
`;
}

function generatePromoTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};

  // Promo-specific IKB config
  const ikbConfig = {
    rules: {
      trustSignals: ['NCOA Verified 2024', 'CASS Certified 2024', 'ISO 9001 Documented Processes 2023'],
      promoCodes: {
        'credit-repair': 'cr2026',
        'debt-collection': 'debt2026',
        'healthcare-billing': 'hb2026',
        'healthcare-mailing-services': 'hm2026',
        'postcard': 'pc2026',
        'self-storage': 'pm2026',
      },
      approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'pricing'],
      blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
      blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading', 'guaranteed delivery', '100% accurate'],
    },
    pricing: {
      basePrice: 1.31,
      currency: 'USD',
      units: 'letter',
      addOns: {
        'certified-mail': 4.50,
        'return-receipt': 3.35,
        'ncoa-verification': 0.05,
        'address-verification': 0.02,
      },
    },
    proofOptions: {
      standard: [{ id: 'usps-photo', name: 'USPS Photo', description: 'Photo of mailpiece delivered by carrier', tier: 'included' }],
      upgrades: [
        { id: 'certified-mail', name: 'Certified Mail', description: 'Track and confirm delivery with signature', tier: 'optional', additionalCost: 4.15 },
        { id: 'electronic-return-receipt', name: 'Electronic Return Receipt', description: 'Digital signature confirmation via email', tier: 'optional', additionalCost: 3.50 },
      ],
    },
    terminology: {
      mailClasses: {
        'first-class': { name: 'First-Class Mail', description: 'Standard USPS mail service', hasTracking: true, hasCertificate: false, allowsPersonalData: true, useCases: ['letters', 'invoices'] },
        'marketing-mail': { name: 'Marketing Mail', description: 'Cost-effective bulk mailing', hasTracking: false, hasCertificate: false, allowsPersonalData: true, useCases: ['promotional'] },
      },
      certifications: {
        'ncov': { name: 'NCOA', fullName: 'National Change of Address', description: 'Address verification service' },
        'cass': { name: 'CASS', fullName: 'Coding Accuracy Support System', description: 'USPS-certified address standardization' },
      },
    },
  };

  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     ${brand.name || 'Broadstroke'}
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/${brandId || 'broadstroke'}/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/${brandId || 'broadstroke'}/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection, HighlightSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration with promo codes
const ikbConfig = ${JSON.stringify(ikbConfig)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['${site.slug}'] || '2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.highlight && <HighlightSection section={content.highlight.section} />}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        {content.testimonials && content.testimonials.length > 0 && <TestimonialsSection />}
        <FAQSection faq={content.faq} />
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateOdinsInnovationsTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};
  const ikb = config.ikb || brandContext?.ikb || {};
  
  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     Odin's Innovations
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, ProductsSection, SignatureScentBeadsSection, WhyOdinsSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration
const ikbConfig = ${JSON.stringify(ikb)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['${site.slug}'] || '2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        
        {/* Section 1: Why Synthetic (light) */}
        {content['the-difference'] && <WhyOdinsSection content={content['the-difference']} />}
        
        {/* Section 2: Products (dark) */}
        <div style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>
        
        {/* Section 3: Signature Scents (light) */}
        <SignatureScentBeadsSection content={content.signatureScents} />
        
        {/* Section 4: Benefits (warm sand) */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />
        
        {/* Section 5: Wins On (dark - citronella style) */}
        {content['wins'] && (
          <section id="wins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
                {content['wins'].headline}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content['wins'].items.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      {item.icon === 'long-lasting' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {item.icon === 'flask' && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {item.icon === '50-states' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2" className="w-12 h-12">
                          <path d="M15 25h70v50H15z" fill="white" fillOpacity="0.1"/>
                          <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
                          <path d="M15 25h30v30H15z" fill="white" fillOpacity="0.2"/>
                          <circle cx="22" cy="32" r="2" fill="white"/>
                          <circle cx="30" cy="32" r="2" fill="white"/>
                          <circle cx="38" cy="32" r="2" fill="white"/>
                          <circle cx="26" cy="38" r="2" fill="white"/>
                          <circle cx="34" cy="38" r="2" fill="white"/>
                          <circle cx="22" cy="44" r="2" fill="white"/>
                          <circle cx="30" cy="44" r="2" fill="white"/>
                          <circle cx="38" cy="44" r="2" fill="white"/>
                          <circle cx="26" cy="50" r="2" fill="white"/>
                          <circle cx="34" cy="50" r="2" fill="white"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.title}</h3>
                    <p className="font-body text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {/* Section 6: How It Works */}
        {content['how-it-works'] ? <HowItWorksSection howItWorks={content['how-it-works']} /> : <HowItWorksSection />}
        
        {/* Section 7: The Odin's Difference + CTA */}
        {content['the-odins-difference'] ? <DifferenceSection difference={content['the-odins-difference']} /> : <DifferenceSection />}
        
        {/* CTA: See Why Hunters Choose Synthetic */}
        <div className="pb-8 text-center" style={{ background: '#333333' }}>
          <a 
            href="https://www.odinsinnovations.com/pages/benefits-of-synthetic-scents" 
            className="inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90 rounded"
            style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}
          >
            SEE WHY HUNTERS CHOOSE SYNTHETIC
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        
        {/* Section 8: Reviews - Success Stories from the Field */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Success Stories from the Field</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Real results from hunters who trust Odin's synthetic scents.</p>
            </div>
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-take="10" data-per-page="10" data-product-brand="Odin's Innovations"></div>
            <style dangerouslySetInnerHTML={{__html: \`
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            \`}} />
          </div>
        </section>

        {/* Section 9: FAQ */}
        <FAQSection faq={content.faq} />
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateCitronellaTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};
  const ikb = config.ikb || brandContext?.ikb || {};
  
return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     Odin's Innovations
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration
const ikbConfig = ${JSON.stringify(ikb)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['citronella'] || ikbConfig.rules?.promoCodes?.['citronella-mosquito-repellent'] || 'HUNT2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        
        {/* Section 1: Introduction - LIGHT BACKGROUND */}
        {content.introduction && (
          <section className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.introduction.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.introduction.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.introduction.features?.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      {feature.icon === 'bug' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 014 4v2a4 4 0 00-2.22 3.58L8 12v6h8v2H8m4-14a1 1 0 11-2 0 1 1 0 012 0zm-4 18a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      )}
                      {feature.icon === 'leaf' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2 2 .9 2 2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
                        </svg>
                      )}
                      {feature.icon === 'clock' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="#2d5a3d" strokeWidth="3" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {feature.icon === 'shield-check' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{feature.title}</h3>
                    <p className="font-body text-sm" style={{ color: '#666' }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 2: Why Odin's - DARK BACKGROUND */}
        {content['why-odins'] && (
          <section className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content['why-odins'].headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content['why-odins'].subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content['why-odins'].items?.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      {item.toLowerCase().includes('rain') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l.62-.62a9 9 0 1112.76 0l.62.62M12 22V12m0 0l-4-4m4 4l4-4" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('co2') || item.toLowerCase().includes('mask') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-4a4 4 0 00-4-4H7a4 4 0 00-4 4v4z" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('duration') || item.toLowerCase().includes('30') && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {item.toLowerCase().includes('plant') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2 2 .9 2 2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('legal') || item.toLowerCase().includes('state') && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
                          <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1"/>
                          <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
                          <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2"/>
                          <circle cx="22" cy="32" r="2" fill="currentColor"/>
                          <circle cx="30" cy="32" r="2" fill="currentColor"/>
                          <circle cx="38" cy="32" r="2" fill="currentColor"/>
                          <circle cx="26" cy="38" r="2" fill="currentColor"/>
                          <circle cx="34" cy="38" r="2" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.split('—')[0]}</h3>
                    <p className="font-body text-sm text-gray-400">{item.split('—').slice(1).join('—')}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 3: Detection Process - LIGHT BACKGROUND */}
        {content.detection && (
          <section className="section-padding" style={{ background: '#fff' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.detection.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Section 4: Application Guide - DARK BACKGROUND */}
        {content.application && (
          <section className="section-padding" style={{ background: '#242835' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.application.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content.application.note}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {content.application.steps?.map((step, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #2d5a3d' }}>
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-bold rounded-full" style={{ background: '#2d5a3d', color: '#fff' }}>
                      {i + 1}
                    </div>
                    <p className="font-body text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 5: Hunting Blinds - LIGHT BACKGROUND */}
        {content.blinds && (
          <section className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.blinds.headline}
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.blinds.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Section 6: Layered Strategy - DARK BACKGROUND */}
        {content.layered && (
          <section className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content.layered.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Trust Badges */}
        <TrustBadgesSection 
          trustSignals={[
            { text: 'EPA-Registered Biopesticide', icon: 'shield-check' },
            { text: 'Made in USA', icon: 'flag' },
            { text: 'Legal in All 50 States', icon: '50-states' },
          ]}
        />
        
        {/* Stamped.io Reviews */}
        <StampedReviewsSection 
          title={content.reviews?.title}
          subtitle={content.reviews?.subtitle}
          description={content.reviews?.description}
        />
        
        {/* Comparison Table */}
        {content.comparison && (
          <section id="comparison" className="py-20" style={{ background: '#f8f9fa' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#1a1a1a' }}>{content.comparison.headline}</h2>
              <ComparisonTable comparison={content.comparison} promoCode={promoCode} />
            </div>
          </section>
        )}
        
        {/* FAQ */}
        {content.faq && <FAQSection faq={content.faq} />}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateCWDSiteTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};
  const ikb = config.ikb || brandContext?.ikb || {};
  
  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      synthetic-scent-cwd-guide
 * Brand:     Odin's Innovations
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/synthetic-scent-cwd-guide.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, SiteNavigation, SiteFooter } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration
const ikbConfig = ${JSON.stringify(ikb)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['${site.slug}'] || config.ikb?.rules?.promoCodes?.['${site.slug}'] || '';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />
        
        {/* What Is CWD Section */}
        {content['what-is-cwd'] && (
          <section id="what-is-cwd" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{content['what-is-cwd'].headline}</h2>
              
              {/* Intro Paragraph */}
              {content['what-is-cwd'].intro && (
                <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">{content['what-is-cwd'].intro}</p>
              )}
              
              {/* Key Points Cards - Dynamic from config */}
              {content['what-is-cwd'].cards && (
                <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                  {content['what-is-cwd'].cards.map((card, idx) => (
                    <div key={idx} className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                          {card.icon === 'warning-red' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                          {card.icon === 'flask-amber' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          )}
                          {card.icon === 'clock-orange' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {card.icon === 'ban-red' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                          <p className="text-sm text-muted-foreground">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* CTA */}
              <div className="text-center">
                <a href={content['what-is-cwd'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block" target="_blank" rel="noopener noreferrer">
                  {content['what-is-cwd'].cta?.text || 'Learn More'}
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Why Odin's Section */}
        {content['why-odins'] && (
          <section id="why-odins" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['why-odins'].headline}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{content['why-odins'].body}</p>
              
              {/* USDA BioPreferred Certification Badge */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <img 
                    src={content['why-odins'].usdaBioPreferred?.imageUrl || 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/usda_certified_biobased_product.png?v=1776353558'} 
                    alt={content['why-odins'].usdaBioPreferred?.imageAlt || 'USDA Certified Biobased Product'}
                    className="w-48 h-auto"
                  />
                </div>
                <div className="text-left max-w-md">
                  <p className="text-lg text-stone-700 mb-2">
                    <strong>{content['why-odins'].usdaBioPreferred?.title || 'USDA BioPreferred® Certified'}</strong>
                  </p>
                  <p className="text-stone-600 mb-4">
                    {content['why-odins'].usdaBioPreferred?.description || 'Our biodegradable polymer contains 42% certified biobased content. Both beaded and liquid products are USDA BioPreferred Certified.'}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
                    <span className="text-stone-500">Certified Under:</span>
                    <span className="font-medium text-stone-700">{content['why-odins'].usdaBioPreferred?.certifiedUnder || 'LC BioPlastics LLC'}</span>
                    <a 
                      href={content['why-odins'].usdaBioPreferred?.detailsUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B4513] hover:text-[#6b3410] underline underline-offset-2"
                    >
                      {content['why-odins'].usdaBioPreferred?.detailsLinkText || 'View Details →'}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a href={content['why-odins'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['why-odins'].cta?.text || 'Shop Now'}
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* How It Works - Custom Implementation with Science Section */}
        {content['how-it-works'] && (
          <section id="how-it-works" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{content['how-it-works'].headline}</h2>
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">{content['how-it-works'].body}</p>
              
              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {content['how-it-works'].steps?.map((step, idx) => (
                  <div key={idx} className="bg-background rounded-lg p-8 shadow-sm border border-border/50">
                    {step.image ? (
                      /* Step with image - side-by-side layout */
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="sm:w-24 sm:h-24 w-full h-32 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-16 h-16 object-contain drop-shadow-sm"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-3xl font-bold text-primary mb-2">{step.number}</div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        </div>
                      </div>
                    ) : (
                      /* Step without image - standard layout */
                      <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                    )}
                    {!step.image && <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>}
                    <p className="text-base text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Science Section - Bigger Font */}
              {content['how-it-works'].scienceSection && (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">{content['how-it-works'].scienceSection.title}</h3>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    <img 
                      src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/longer_lasting_deer_scent.jpg?v=1776353659" 
                      alt="Longer Lasting Deer Scent - 30+ Days of Performance"
                      className="w-48 h-auto rounded-lg shadow-md"
                    />
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: content['how-it-works'].scienceSection.description }} />
                  </div>
                  <div className="bg-primary/10 rounded-lg p-6 text-center">
                    <p className="text-xl md:text-2xl font-bold text-primary">{content['how-it-works'].scienceSection.highlight}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Benefits */}
        {content['benefits'] && <BenefitsSection benefits={content['benefits']} />}
        
        {/* Wins Section (dark - citronella style) */}
        {content['wins'] && (
          <section id="wins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
                {content['wins'].headline}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content['wins'].items.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      {item.icon === 'long-lasting' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {item.icon === 'flask' && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {item.icon === '50-states' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2" className="w-12 h-12">
                          <path d="M15 25h70v50H15z" fill="white" fillOpacity="0.1"/>
                          <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
                          <path d="M15 25h30v30H15z" fill="white" fillOpacity="0.2"/>
                          <circle cx="22" cy="32" r="2" fill="white"/>
                          <circle cx="30" cy="32" r="2" fill="white"/>
                          <circle cx="38" cy="32" r="2" fill="white"/>
                          <circle cx="26" cy="38" r="2" fill="white"/>
                          <circle cx="34" cy="38" r="2" fill="white"/>
                          <circle cx="22" cy="44" r="2" fill="white"/>
                          <circle cx="30" cy="44" r="2" fill="white"/>
                          <circle cx="38" cy="44" r="2" fill="white"/>
                          <circle cx="26" cy="50" r="2" fill="white"/>
                          <circle cx="34" cy="50" r="2" fill="white"/>
                        </svg>
                      )}
                      {item.icon === 'shield' && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.title}</h3>
                    <p className="font-body text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Comparison */}
        {content['comparison'] && (
          <section id="comparison" className="py-20 bg-[#f8f6f3]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['comparison'].headline}</h2>
              <ComparisonTable comparison={content['comparison']} promoCode={promoCode} />
              <div className="text-center mt-8">
                <a href={content['comparison'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['comparison'].cta?.text || 'See Why Hunters Choose Synthetic'}
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Stamped.io Reviews - Success Stories from the Field */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{content.reviews?.title || 'Success Stories from the Field'}</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">{content.reviews?.subtitle || "Real results from hunters who trust Odin\\u2019s synthetic scents."}</p>
            </div>
            
            {/* Stamped.io Reviews Widget - Rut Scents Products */}
            {/* Loads automatically via Shopify's Stamped.io app integration */}
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-take="10" data-product-brand="Odin's Innovations"></div>
            
            {/* Hide Product/Site Reviews tabs since no site reviews */}
            <style dangerouslySetInnerHTML={{__html: \`
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            \`}} />
          </div>
        </section>
        
        {/* FAQ */}
        {content['faq'] && (
          <section id="faq" className="bg-muted/30">
            <FAQSection faq={{ ...content['faq'], showContactSection: false }} />
            <div className="text-center pb-8">
              <a href={content['faq'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                {content['faq'].cta?.text || 'Shop Now'}
              </a>
            </div>
          </section>
        )}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateDominantBuckTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};
  const ikb = config.ikb || brandContext?.ikb || {};
  
  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     Odin's Innovations
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';

// ⚠️ DO NOT EDIT — This file is auto-generated. See source config and template.
// Source: config/sites/odins-innovations/${site.slug}.json | Template: scripts/generate-site.ts
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, TrustBadgesSection, HowItWorksSection, ProductsSection, WhyOdinsSection, WhenToUseSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration
const ikbConfig = ${JSON.stringify(ikb)};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['${site.slug}'] || 'HUNT2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />

        {/* Trust Badges */}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}

        {/* Section 1: Benefits */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />

        {/* Section 2: How It Works */}
        <HowItWorksSection howItWorks={{
          headline: content.howItWorks.title,
          body: content.howItWorks.body
        }} />

        {/* Section 3: When To Use */}
        <WhenToUseSection content={{
          headline: content.whenToUse.title,
          body: '',
          seasons: content.whenToUse.items.map((item, idx) => {
            const parts = item.split(': ');
            const name = parts[0].trim();
            const description = parts.slice(1).join(': ').trim();
            const monthsMatch = name.match(/\\(([^)]+)\\)/);
            return {
              name: name.replace(/\\s*\\([^)]*\\)/, '').trim(),
              months: monthsMatch ? monthsMatch[1] : '',
              description: description
            };
          })
        }} />

        {/* Section 4: Deployment */}
        <section id="deployment" className="section-padding" style={{ background: '#1a1d29' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
              {content.deployment.title}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <ol className="space-y-6">
                    {content.deployment.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                          {idx + 1}
                        </span>
                        <p className="font-body text-base text-gray-300 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                  {content.deployment.note && (
                    <p className="mt-8 font-body text-sm text-gray-400 italic border-l-2 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                      {content.deployment.note}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe 
                      src="https://www.youtube.com/embed/q9X9zGL8elM" 
                      title="How to Deploy Dominant Buck Scent" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Why Odin's */}
        <WhyOdinsSection content={{
          headline: content.whyOdins.title,
          body: content.whyOdins.body
        }} />

        {/* Section 6: Effectiveness */}
        <section id="effectiveness" className="section-padding" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-center" style={{ color: 'hsl(var(--foreground))' }}>
              {content.effectiveness.title}
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
              <div className="flex-1">
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  {content.effectiveness.body}
                </p>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/longer_lasting_deer_scent.jpg?v=1776353659" 
                  alt="Longer lasting synthetic deer scent performance" 
                  className="rounded-lg shadow-lg w-full max-w-sm object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Products */}
        <div style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>

        {/* Section 8: Comparison */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}

        {/* Section 10: Reviews */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">What Hunters Are Saying</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Real results from hunters who put Odin's to the test in the field.</p>
            </div>
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-product-brand="Odin's Innovations"></div>
            <style dangerouslySetInnerHTML={{__html: \`
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            \`}} />
          </div>
        </section>

        {/* Section 11: FAQ */}
        <FAQSection faq={content.faq} />

        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateScrapeScentTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};
  const ikb = config.ikb || brandContext?.ikb || {};

return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      citronella-mosquito-repellent
 * Brand:     Odin's Innovations
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/citronella-mosquito-repellent.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, TrustBadgesSection, WhyOdinsSection, ProductsSection, SiteNavigation, SiteFooter } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration
const ikbConfig = ${JSON.stringify(ikb)};

// Get promo code
const promoCode = ikbConfig.rules?.promoCodes?.['scrape-scent-guide'] || 'HUNT2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />

        {/* Trust Badges */}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}

        {/* Section 1: Benefits */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />

        {/* Section 2: Why Odin's */}
        <WhyOdinsSection content={{
          headline: content.whyOdins.title,
          body: content.whyOdins.body,
          points: content.whyOdins.points
        }} />

        {/* Section 3: How It Works — with YouTube videos */}
        <section id="how-it-works" className="section-padding" style={{ background: '#1a1d29' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
              {content.howItWorks.title}
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <ol className="space-y-6">
                    {content.howItWorks.steps.map((step: string, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                          {idx + 1}
                        </span>
                        <p className="font-body text-base text-gray-300 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                  {content.howItWorks.note && (
                    <p className="mt-8 font-body text-sm text-gray-400 italic border-l-2 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                      {content.howItWorks.note}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/6cWlyOmc4Sc"
                      title="How to Build an Effective Mock Scrape with Odin's"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  {content.fieldTest && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/JK0IvPqJrN4"
                        title={content.fieldTest.subtitle || "Odin's Scrape Blend Field Test"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Rut Timing */}
        {content.rutTiming && (
          <section id="rut-timing" className="section-padding" style={{ background: 'hsl(var(--muted))' }}>
            <div className="section-container">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider" style={{ background: 'hsl(var(--accent) / 0.2)', color: 'hsl(var(--accent))', clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                    Seasonal Guide
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                    {content.rutTiming.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {content.rutTiming.phases.map((phase: { phase: string; months: string; description: string }, idx: number) => {
                    const colors = ['hsl(35, 70%, 50%)', 'hsl(var(--secondary))', 'hsl(var(--primary))'];
                    return (
                      <div key={idx} className="relative overflow-hidden" style={{ background: 'white', borderTop: \`4px solid \${colors[idx]}\`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <div className="flex flex-col items-center justify-center py-6" style={{ background: \`\${colors[idx]}15\` }}>
                          <span className="font-display text-2xl font-bold uppercase mb-1" style={{ color: colors[idx] }}>{phase.phase}</span>
                          <span className="font-body text-sm font-semibold uppercase tracking-wider" style={{ color: colors[idx], opacity: 0.7 }}>{phase.months}</span>
                        </div>
                        <div className="p-5">
                          <p className="font-body text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: phase.description }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Effectiveness — with proof image */}
        {content.effectiveness && (
          <section id="effectiveness" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-center text-white">
                {content.effectiveness.title}
              </h2>
              <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
                <div className="flex-1">
                  <p className="font-body text-lg text-gray-300 leading-relaxed">
                    {content.effectiveness.body}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/longer_lasting_deer_scent.jpg?v=1776353659"
                    alt="Longer lasting synthetic deer scent performance"
                className="rounded-lg shadow-lg w-full max-w-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6+7: Synthetic vs Natural + Drippers vs Beads — redesigned two-panel */}
        {(content.syntheticVsNatural || content.drippersVsBeads) && (
          <section id="synthetic-vs-natural" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              {/* Section Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(45,90,61,0.15)', color: 'hsl(var(--accent))', clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                  Know the Difference
                </span>
                <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
                  Why the Right Scent Matters
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch">
                {/* Panel 1 — Synthetic vs Natural */}
                {content.syntheticVsNatural && (
                  <div className="relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }} />
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,90,61,0.15)' }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--accent))' }}>
                            <path d="M9 3v8.5L6.5 19a2.5 2.5 0 004.5 1.5 2.5 2.5 0 004.5-1.5L13 11.5V3" />
                            <path d="M9 3h6" />
                          </svg>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl uppercase text-white">
                          {content.syntheticVsNatural.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm text-gray-300 leading-relaxed mb-5 [&_a]:underline [&_a]:decoration-amber-400/50 [&_a:hover]:decoration-amber-400" dangerouslySetInnerHTML={{ __html: content.syntheticVsNatural.body }} />
                      <div className="rounded px-4 py-3" style={{ borderLeft: '3px solid hsl(var(--accent))', background: 'rgba(45,90,61,0.08)' }}>
                        <p className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--accent))' }}>
                          30 days vs 24–48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* VS Divider */}
                <div className="hidden lg:flex flex-col items-center justify-center px-6" aria-hidden="true">
                  <div style={{ width: '1px', height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center my-4" style={{ border: '2px solid hsl(var(--primary))', background: 'rgba(26,29,41,0.9)' }}>
                    <span className="font-display text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>VS</span>
                  </div>
                  <div style={{ width: '1px', height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />
                </div>

                {/* Mobile VS Divider */}
                <div className="flex lg:hidden items-center justify-center py-2" aria-hidden="true">
                  <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-4" style={{ border: '2px solid hsl(var(--primary))', background: 'rgba(26,29,41,0.9)' }}>
                    <span className="font-display text-xs font-bold" style={{ color: 'hsl(var(--accent))' }}>VS</span>
                  </div>
                  <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                </div>

                {/* Panel 2 — Drippers vs Beads */}
                {content.drippersVsBeads && (
                  <div className="relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))' }} />
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,90,61,0.15)' }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--accent))' }}>
                            <path d="M12 22a7 7 0 005-2l3.5-3.5a2.83 2.83 0 00-4-4L13 16" />
                            <path d="M12 22a7 7 0 01-5-2L3.5 17.5a2.83 2.83 0 014-4L11 16" />
                            <path d="M12 22V16" />
                          </svg>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl uppercase text-white">
                          {content.drippersVsBeads.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm text-gray-300 leading-relaxed mb-5">
                        {content.drippersVsBeads.body}
                      </p>
                      <div className="rounded px-4 py-3" style={{ borderLeft: '3px solid hsl(var(--accent))', background: 'rgba(45,90,61,0.08)' }}>
                        <p className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--accent))' }}>
                          Nothing to clog. Nothing to freeze.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom tagline bar */}
              <div className="mt-10 text-center">
                <p className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Synthetic &bull; Long-Lasting &bull; Legal Everywhere
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 8: Products */}
        <div id="products" style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>

        {/* Section 9: Comparison */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}

        {/* Section 10: Reviews */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">What Hunters Are Saying</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Real results from hunters who put Odin's to the test in the field.</p>
            </div>
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-product-brand="Odin's Innovations" data-take="10" data-per-page="10"></div>
            <style dangerouslySetInnerHTML={{__html: \`
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            \`}} />
          </div>
        </section>

        {/* Section 11: FAQ */}
        <FAQSection faq={content.faq} />

        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
 root.render(<App />);
`;
}

function generateFoodScentTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  const { site } = config;
  const brand = brandContext?.brand || {};
  const contact = brandContext?.contact || {};
  const social = brandContext?.social || {};

  return `/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      ${site.slug}
 * Brand:     ${brand.name || "Odin's Innovations"}
 * Generated: ${new Date().toISOString()}
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/${site.slug}.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, WhyOdinsSection, DifferenceSection, ProductsSection, ComparisonTable, TrustBadgesSection, FAQSection, SiteFooter, SiteNavigation } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};
const ikbConfig = { rules: { promoCodes: { 'food-scent-deer-attractants': 'HUNT2026' } } };
  const promoCode = ikbConfig.rules?.promoCodes?.['food-scent-deer-attractants'] || 'HUNT2026';

  function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;

  return (
    <IKBProvider ikb={ikbConfig}>
    <BrandProvider
      brand={brandConfig}
      contact={contactConfig}
      social={socialConfig}
    >
      <SiteNavigation config={config} />
      <HeroSection hero={content.hero} />
      {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
      <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />
      <ProductsSection content={content.products} />
      <div style={{ background: 'hsl(30, 20%, 95%)' }}>
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
      </div>
      <WhyOdinsSection content={content.outperforms} background="hsl(var(--muted))" />

      {/* How to Deploy */}
      <section id="deployment" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
            {content.deployment.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <ol className="space-y-6">
                  {content.deployment.steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                        {idx + 1}
                      </span>
                      <p className="font-body text-base text-gray-300 leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
                {content.deployment.note && (
                  <p className="mt-8 font-body text-sm text-gray-400 italic border-l-2 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                    {content.deployment.note}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-6">
                {content.deployment.videos.map((video: { src: string; title: string }, idx: number) => (
                  <div key={idx} className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DifferenceSection difference={content.environmental} background="hsl(var(--muted))" />

      {/* Baiting Laws and Scent Attractants */}
      {content.baitingLaws && (
      <section id="baiting-laws" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 text-center text-white" dangerouslySetInnerHTML={{ __html: (content.baitingLaws.title || '').replace(' & ', ' &<br />') }} />
            <p className="font-body text-lg leading-relaxed text-gray-300 text-center mb-12">
              {content.baitingLaws.subtitle}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid hsl(var(--accent))' }}>
                <h3 className="font-display text-xl uppercase mb-3 text-white">Scent Attractants</h3>
                <ul className="space-y-3 font-body text-sm text-gray-300">
                  {(content.baitingLaws.scentPoints || []).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'hsl(var(--accent))' }}>✓</span>
                    <span>{point}</span>
                  </li>
                  ))}
                </ul>
              </div>
              <div className="p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #ef4444' }}>
                <h3 className="font-display text-xl uppercase mb-3 text-white">Traditional Bait (Corn, Feed)</h3>
                <ul className="space-y-3 font-body text-sm text-gray-300">
                  {(content.baitingLaws.baitPoints || []).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>{point}</span>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
            {content.baitingLaws.disclaimer && (
            <div className="mt-10 p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <p className="font-body text-sm text-gray-400">
                <strong className="text-white">Important:</strong> {content.baitingLaws.disclaimer}
              </p>
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Reviews */}
      <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{content.reviews?.title || 'What Hunters Are Saying'}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{content.reviews?.description || ''}</p>
          </div>
          <div id="stamped-reviews-widget" data-widget-type="full-page" data-product-brand="Odin's Innovations"></div>
          <style dangerouslySetInnerHTML={{__html: \`
            .stamped-widget-buttons,
            .stamped-full-page-tabs {
              display: none !important;
            }
          \`}} />
        </div>
      </section>

      <FAQSection faq={content.faq} />

      <SiteFooter config={config} />
      {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
    </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateViteConfig(serviceSlug: string, brandId?: string): string {
  const themeAlias = brandId && fs.existsSync(path.join(TEMPLATE_DIR, 'common/themes', brandId, 'globals.css'))
    ? `
      '@/themes/${brandId}': path.resolve(__dirname, '../../../common/themes/${brandId}'),`
    : '';
  
  return `import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/${serviceSlug}',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../../common'),
      '@/': path.resolve(__dirname, '../../../common') + '/',${themeAlias}
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    host: true,
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
`;
}

function generateTailwindConfig(brandId?: string): string {
  const themeContent = brandId && fs.existsSync(path.join(TEMPLATE_DIR, 'common/themes', brandId, 'globals.css'))
    ? `,
    "../../../common/themes/${brandId}/**/*.{js,ts,jsx,tsx}"`
    : '';
  
  return `import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./main.tsx",
    "../../../common/components/**/*.{js,ts,jsx,tsx}"${themeContent},
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        hero: {
          DEFAULT: "hsl(var(--hero-bg))",
          foreground: "hsl(var(--hero-foreground))",
          subtitle: "hsl(var(--hero-subtitle))",
        },
        "section-alt": "hsl(var(--section-alt))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        cta: "var(--shadow-cta)",
        "cta-green": "var(--shadow-cta-green)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
`;
}

function generatePackageJson(site: SiteInfo): string {
  return JSON.stringify({
    name: site.slug,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      'post-build': 'node ../../../scripts/update-shopify-assets.js'
    },
    dependencies: {
      '@radix-ui/react-accordion': '^1.2.11',
      '@radix-ui/react-alert-dialog': '^1.1.14',
      '@radix-ui/react-aspect-ratio': '^1.1.7',
      '@radix-ui/react-avatar': '^1.1.10',
      '@radix-ui/react-checkbox': '^1.3.2',
      '@radix-ui/react-collapsible': '^1.1.11',
      '@radix-ui/react-context-menu': '^2.2.15',
      '@radix-ui/react-dialog': '^1.1.14',
      '@radix-ui/react-dropdown-menu': '^2.1.15',
      '@radix-ui/react-hover-card': '^1.1.14',
      '@radix-ui/react-label': '^2.1.7',
      '@radix-ui/react-menubar': '^1.1.15',
      '@radix-ui/react-navigation-menu': '^1.2.13',
      '@radix-ui/react-popover': '^1.1.14',
      '@radix-ui/react-progress': '^1.1.7',
      '@radix-ui/react-radio-group': '^1.3.7',
      '@radix-ui/react-scroll-area': '^1.2.9',
      '@radix-ui/react-select': '^2.2.5',
      '@radix-ui/react-separator': '^1.1.7',
      '@radix-ui/react-slider': '^1.3.5',
      '@radix-ui/react-slot': '^1.2.3',
      '@radix-ui/react-switch': '^1.2.5',
      '@radix-ui/react-tabs': '^1.1.12',
      '@radix-ui/react-toast': '^1.2.14',
      '@radix-ui/react-toggle': '^1.1.9',
      '@radix-ui/react-toggle-group': '^1.1.10',
      '@radix-ui/react-tooltip': '^1.2.7',
      'class-variance-authority': '^0.7.1',
      'clsx': '^2.1.1',
      'date-fns': '^4.1.0',
      'framer-motion': '^11.11.17',
      'lucide-react': '^0.460.0',
      'react': '^18.3.1',
      'react-dom': '^18.3.1',
      'tailwind-merge': '^2.6.0',
    },
    devDependencies: {
      '@types/react': '^18.3.17',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react-swc': '^3.8.0',
      'autoprefixer': '^10.4.21',
      'postcss': '^8.5.6',
      'tailwindcss': '^3.4.17',
      'tailwindcss-animate': '^1.0.7',
      'typescript': '^5.6.3',
      'vite': '6.1.0',
    },
  }, null, 2);
}

// FIX #1 - Address parsing bug: Properly parse address components from address string or object
function parseAddress(address: string | { street?: string; city?: string; state?: string; zip?: string } | undefined) {
  // Handle object format (from processed config)
  if (address && typeof address === 'object') {
    return {
      streetAddress: (address as { street?: string }).street || '',
      addressLocality: (address as { city?: string }).city || '',
      addressRegion: (address as { state?: string }).state || '',
      postalCode: (address as { zip?: string }).zip || '',
    };
  }
  
  // Handle string format - handle both "City, State ZIP" and "City, KS 67203"
  if (typeof address !== 'string') {
    return { streetAddress: '', addressLocality: '', addressRegion: '', postalCode: '' };
  }
  
  // Split by comma and clean up
  const parts = address.split(',').map((s: string) => s.trim()).filter(Boolean);
  
  if (parts.length === 0) {
    return { streetAddress: '', addressLocality: '', addressRegion: '', postalCode: '' };
  }
  
  const streetAddress = parts[0] || '';
  
  // For the rest, try to extract city, state, zip
  let addressLocality = '';
  let addressRegion = '';
  let postalCode = '';
  
  if (parts.length > 1) {
    // Join remaining parts and try to parse "Wichita KS 67203" or "KS 67203"
    const remaining = parts.slice(1).join(' ').trim();
    const match = remaining.match(/^([A-Za-z\s]+)?\s*([A-Z]{2})\s*(\d{5})?/);
    if (match) {
      addressLocality = match[1]?.trim() || '';
      addressRegion = match[2] || '';
      postalCode = match[3] || '';
    }
  }
  
  return {
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
  };
}

function generateIndexHtml(config: SiteConfig, brandContext?: BrandContext): string {
  const { site } = config;
  // Use canonicalDomain or seo.canonical, or fall back to slug-based subdirectory pattern
  const seoConfig = config.seo as Record<string, unknown> | undefined;
  const canonicalUrl = config.canonicalDomain || (seoConfig?.canonical as string) || `https://${site.domain}/${site.slug}`;
  const ogImage = `${canonicalUrl}/og-image.png`;

  // Extract brand name from brandContext or derive from domain
  const domainParts = site.domain?.split('.') || [];
  const brandName = brandContext?.brand?.name || (domainParts[0] ? domainParts[0].charAt(0).toUpperCase() + domainParts[0].slice(1) : 'Brand');
  const brandWebsite = brandContext?.brand?.urls?.website || (site.domain ? `https://www.${site.domain}` : '');
  const brandGoogleAnalyticsId = brandContext?.brand?.googleAnalyticsId || 'G-XXXXXXXXXX';
  const brandSocial = brandContext?.social || {};
  const brandTwitterHandle = (brandSocial as any)?.twitterHandle || '';
  const brandSameAs = Object.entries(brandSocial)
    .filter(([key, val]) => key !== 'twitterHandle' && typeof val === 'string' && val.length > 0)
    .map(([, val]) => val as string);

  // Parse address once for schema
  const addressParts = parseAddress(site.contact?.address || '');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${config.seo?.title || `${site.name} | ${config.branding.tagline}`}</title>
    <meta name="description" content="${processPricingPlaceholders(config.seo?.description || config.content?.hero?.subhead || '')}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="sitemap" type="application/xml" href="${canonicalUrl}/sitemap.xml" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${config.seo?.ogTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="og:description" content="${processPricingPlaceholders(config.seo?.ogDescription || config.content?.hero?.subhead || '')}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="${brandName}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${config.seo?.twitterTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="twitter:description" content="${processPricingPlaceholders(config.seo?.twitterDescription || config.content?.hero?.subhead || '')}" />
    <meta property="twitter:image" content="${ogImage}" />
    <meta name="twitter:site" content="${brandTwitterHandle}" />

    <!-- SEO Meta Tags -->
    <meta name="keywords" content="${(config.seo?.keywords || [site.name, config.branding.tagline]).join(', ')}" />
    <meta name="author" content="${brandName}" />
    <meta name="robots" content="${config.seo?.robots || 'index, follow'}" />
    <meta name="theme-color" content="#664400" />

    <!-- Favicon -->
${brandContext?.brand?.logo?.faviconUrl ? `    <link rel="icon" type="image/png" href="${brandContext.brand.logo.faviconUrl}" />` : `    <link rel="icon" type="image/x-icon" href="/favicon.ico" />`}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" media="print" onload="this.media='all'" />
    <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></noscript>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.seo?.googleAnalyticsId || brandGoogleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.seo?.googleAnalyticsId || brandGoogleAnalyticsId}', {
        page_path: window.location.pathname,
      });
    </script>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
         {
           "@type": "WebSite",
           "name": "${site.name}",
           "url": "${canonicalUrl}",
           "description": "${config.content?.hero?.subhead}",
           "publisher": {
             "@type": "Organization",
             "name": "${brandName}",
             "url": "${brandWebsite}"
           }
         },
         {
           "@type": "BreadcrumbList",
           "itemListElement": [
             {
               "@type": "ListItem",
               "position": 1,
               "name": "Home",
               "item": "${brandWebsite}"
             },
             {
               "@type": "ListItem",
               "position": 2,
               "name": "${site.name}",
               "item": "${canonicalUrl}"
             }
           ]
         },
         {
           "@type": "Organization",
           "name": "${brandName}",
           "url": "${brandWebsite}",
           "logo": "${canonicalUrl}/logo.png",
           "sameAs": ${brandSameAs.length > 0 ? JSON.stringify(brandSameAs, null, 12) : '[]'},
           "contactPoint": {
             "@type": "ContactPoint",
             "telephone": "${site.contact?.phone || ''}",
             "contactType": "customer service",
             "email": "${site.contact?.email || ''}"
           },
           "address": {
             "@type": "PostalAddress",
             "streetAddress": "${addressParts.streetAddress}",
             "addressLocality": "${addressParts.addressLocality}",
             "addressRegion": "${addressParts.addressRegion}",
             "postalCode": "${addressParts.postalCode}",
             "addressCountry": "US"
           }
         },
         {
           "@type": "LocalBusiness",
           "name": "${brandName}",
           "description": "${config.content?.hero?.subhead}",
           "url": "${canonicalUrl}",
           "telephone": "${site.contact?.phone || ''}",
           "email": "${site.contact?.email || ''}",
           "image": "${ogImage}",
           "address": {
             "@type": "PostalAddress",
             "streetAddress": "${addressParts.streetAddress}",
             "addressLocality": "${addressParts.addressLocality}",
             "addressRegion": "${addressParts.addressRegion}",
             "postalCode": "${addressParts.postalCode}",
             "addressCountry": "US"
           },
           "openingHoursSpecification": [
             {
               "@type": "OpeningHoursSpecification",
               "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
               "opens": "08:00",
               "closes": "17:00"
             }
           ],
           "priceRange": "${config.seo?.priceRange || '$$'}",
           "areaServed": {
             "@type": "Country",
             "name": "US"
           }
         },
         {
           "@type": "Service",
           "name": "${config.seo?.serviceSchema?.name || site.name}",
           "description": "${config.seo?.serviceSchema?.description || config.content?.hero?.subhead || ''}",
           "provider": {
             "@type": "LocalBusiness",
             "name": "${brandName}"
           },
           "areaServed": {
             "@type": "Country",
             "name": "US"
           },
           "serviceType": "${config.seo?.serviceSchema?.serviceType || site.id}"
         },
        {
          "@type": "FAQPage",
          "mainEntity": [
            ${(config.content?.faq?.faqs || []).map((faq: FAQ) => `
              {
                "@type": "Question",
                "name": "${faq.q.replace(/"/g, '\\"')}",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${faq.a.replace(/<[^>]*>/g, '').replace(/"/g, '\\"')}"
                }
              }`).join(',\n            ')}
          ]
        }
      ]
    }
    </script>

    <!-- Mobile-Optimized Meta Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="${site.name}" />
    <meta name="format-detection" content="telephone=no" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`;
}

// FIX #3 - Generate robots.txt for SEO indexing
function generateRobotsTxt(site: SiteInfo): string {
  // Use subdirectory format: https://postalocity.com/credit-repair
  const sitemapUrl = `https://${site.domain}/${site.slug}/sitemap.xml`;
  
  return `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: claude-ai
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${sitemapUrl}
`;
}

// FIX #3 - Generate sitemap.xml for SEO discovery
function generateSitemapXml(config: SiteConfig): string {
  const { site } = config;
  const currentDate = new Date().toISOString().split('T')[0];
  // Use subdirectory format: https://postalocity.com/credit-repair
  const canonicalUrl = config.canonicalDomain || config.seo?.canonicalUrl || `https://${site.domain}/${site.slug}`.replace(/\/$/, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

// Generate Shopify Liquid page template
function generateShopifyHtml(config: SiteConfig, brandContext?: BrandContext): string {
  const { site, seo } = config;
  
  // Extract keywords from config
  const keywords = seo?.keywords ? seo.keywords.join(', ') : '';
  
  // Get fonts from config or use defaults
  const fonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Agency+FB:wght@400;700&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

  // Get brand website URL
  const domainParts = site.domain?.split('.') || [];
  const brandWebsite = brandContext?.brand?.urls?.website || (site.domain ? `https://www.${site.domain}` : '');
  const brandGoogleAnalyticsId = brandContext?.brand?.googleAnalyticsId || 'G-XXXXXXXXXX';
  const canonicalUrl = config.canonicalDomain || (seo as any)?.canonical || `https://${site.domain}${site.basename}`;
  const gaId = (seo as any)?.googleAnalyticsId || brandGoogleAnalyticsId;

  // Get ogImage from config - use full CDN URL if available, otherwise fallback to asset_url
  const ogImageUrl = (seo as any)?.ogImage || "{{ 'og-image.png' | asset_url }}";
  
  // Get logo from branding config - use full CDN URL if available
  const logoUrl = config.branding?.logo || "{{ 'logo.png' | asset_url }}";

  return `{% layout none %}

<!DOCTYPE html>
<html lang="en">
  <head>
    {{ content_for_header }}

    <!-- Base path so the React app finds images in Assets -->
    <base href="${brandWebsite}/" />

    <meta charset="UTF-8" />
    <title>${seo?.title || site.name}</title>
    <meta name="description" content="${seo?.description || ''}" />

    <!-- Canonical + Sitemap -->
    <link rel="canonical" href="{{ canonical_url }}" />
    <link rel="sitemap" type="application/xml" href="${canonicalUrl}/sitemap.xml" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ canonical_url }}" />
    <meta property="og:title" content="${seo?.ogTitle || site.name}" />
    <meta property="og:description" content="${seo?.ogDescription || ''}" />
    <meta property="og:image" content="${ogImageUrl}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{{ canonical_url }}" />
    <meta property="twitter:title" content="${(seo as any)?.twitterTitle || site.name}" />
    <meta property="twitter:description" content="${(seo as any)?.twitterDescription || ''}" />
    <meta property="twitter:image" content="${ogImageUrl}" />

    <!-- SEO Meta Tags -->
    <meta name="keywords" content="${keywords}" />
    <meta name="author" content="${site.name}" />
    <meta name="robots" content="${seo?.robots || 'index, follow'}" />
    <meta name="theme-color" content="#664400" />

    <!-- Favicon -->
${brandContext?.brand?.logo?.faviconUrl ? `    <link rel="icon" type="image/png" href="${brandContext.brand.logo.faviconUrl}" />` : `    <link rel="icon" type="image/x-icon" href="{{ 'favicon.ico' | asset_url }}" />`}

    <!-- Fonts -->
    ${fonts}

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { page_path: window.location.pathname });
    </script>

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "${site.name}",
          "url": "{{ canonical_url }}",
          "description": "${(config.content as any)?.hero?.subhead || ''}",
          "publisher": {
            "@type": "Organization",
            "name": "${site.name}",
            "url": "{{ canonical_url }}"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "${brandWebsite}" },
            { "@type": "ListItem", "position": 2, "name": "${site.name}", "item": "{{ canonical_url }}" }
          ]
        },
        {
          "@type": "Organization",
          "name": "Odin's Innovations",
          "url": "{{ canonical_url }}",
          "logo": "${logoUrl}",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "${site.contact?.phone || ''}",
            "contactType": "customer service",
            "email": "${site.contact?.email || ''}"
          }
        },
        { "@type": "FAQPage", "mainEntity": [] }
      ]
    }
    </script>

    <!-- Mobile-Optimized Meta Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="${site.name}" />
    <meta name="format-detection" content="telephone=no" />

    <!-- Your built CSS + JS - Filenames must match uploaded assets -->
    {{ 'index.css' | asset_url | stylesheet_tag }}
    <script type="module" src="{{ 'index.js' | asset_url }}"></script>
  </head>
  <body>
    <div id="root"></div>

    {{ content_for_footer }}
  </body>
</html>`;
}

// CLI interface
const args = process.argv.slice(2);

interface CliOptions {
  brand?: string;
  service?: string;
  config?: string;
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    
    if (arg === '--brand' || arg === '-b') {
      options.brand = args[++i];
    } else if (arg === '--service' || arg === '-s') {
      options.service = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      options.config = 'help';
    } else if (!arg.startsWith('-')) {
      // Legacy format: brand/service or just config name
      if (arg.includes('/')) {
        const [brand, service] = arg.split('/');
        options.brand = brand;
        options.service = service;
      } else {
        // Assume legacy single-config name (postalocity-specific)
        options.config = arg;
      }
    }
  }
  
  return options;
}

async function generateSiteMultiBrand(brandId: string, serviceId: string): Promise<void> {
  console.log(`\n🚀 Generating microsite`);
  console.log(`   Brand: ${brandId}`);
  console.log(`   Service: ${serviceId}`);
  
  // Load engine context (brand config, IKB, contact, social)
  const ctx = loadEngineContext(brandId);
  console.log(`   Brand Name: ${ctx.brand.name}`);
  console.log(`   Domain: ${ctx.brand.domain}`);
  
  // Load site-specific config
  const siteConfig = loadSiteConfig(brandId, serviceId) as Record<string, unknown>;
  
  // Extract site info from site config
  const siteInfo = (siteConfig.site || {}) as { name?: string; slug?: string };
  const seoInfo = (siteConfig.seo || {}) as { title?: string; description?: string };
  const contentInfo = (siteConfig.content || {}) as Record<string, unknown>;
  
  // Expand shorthand section configs (like "headline") into full section structures
  const expandedContent = expandShorthandContent(contentInfo);
  
  // Use the site slug for output
  const siteSlug = siteInfo.slug || serviceId;
  const siteBasename = `${brandId}-${siteSlug}`;
  
  // Create unified config that matches legacy SiteConfig structure
  const siteTheme = (siteConfig as Record<string, unknown>)?.theme as SiteConfig['theme'];
  
  const unifiedConfig = {
    site: {
      id: brandId,
      name: siteInfo.name || ctx.brand.name,
      slug: siteSlug,
      domain: ctx.brand.domain,
      basename: siteBasename,
      contact: {
        email: ctx.contact.email,
        phone: ctx.contact.phone,
        address: `${ctx.contact.address.street}, ${ctx.contact.address.city}, ${ctx.contact.address.state} ${ctx.contact.address.zip}`,
      },
    },
    branding: {
      tagline: ctx.brand.tagline || '',
      logo: (siteConfig as Record<string, unknown>)?.branding && typeof (siteConfig as Record<string, unknown>).branding === 'object' 
        ? ((siteConfig as Record<string, unknown>).branding as Record<string, unknown>)?.logo as string || 'logo.png'
        : 'logo.png',
    },
    theme: siteTheme,
    // Merge SEO with brand-level GA ID as fallback
    seo: {
      ...seoInfo,
      googleAnalyticsId: seoInfo?.googleAnalyticsId || ctx.brand.googleAnalyticsId || 'G-9HXQD6LYZ4',
    },
    navigation: (siteConfig.navigation || {}) as { links?: Array<{ label: string; href: string }>; cta?: { text: string; href: string } },
    content: expandedContent,
    // Support footer at root level OR nested in content
    footer: (siteConfig.footer || (contentInfo as Record<string, unknown>)?.footer || {}) as Record<string, unknown>,
    // Pass site-specific IKB config for promo codes, blocklisted content, etc.
    ikb: (siteConfig as Record<string, unknown>)?.ikb as Record<string, unknown> | undefined,
  };
  
  // Create brand context from engine context for use in generated site
  // Use site's theme.primary for colors if available, otherwise fallback to brand colors
  const sitePrimaryColor = unifiedConfig.theme?.primary;
  const brandColors = sitePrimaryColor 
    ? { primary: sitePrimaryColor, accent: ctx.brand.colors?.accent || { h: 45, s: 100, l: 50 } }
    : ctx.brand.colors;

  const brandContext: BrandContext = {
    brand: {
      id: ctx.brand.id,
      name: ctx.brand.name,
      slug: ctx.brand.slug,
      domain: ctx.brand.domain,
      tagline: ctx.brand.tagline,
      googleAnalyticsId: ctx.brand.googleAnalyticsId,
      urls: ctx.brand.urls,
      logo: ctx.brand.logo,
      colors: brandColors,
      // Use site-specific howItWorks/difference/testimonials if available, otherwise fall back to brand
      howItWorks: (expandedContent as Record<string, unknown>)?.howItWorks as typeof ctx.brand.howItWorks || ctx.brand.howItWorks,
      difference: (expandedContent as Record<string, unknown>)?.difference as typeof ctx.brand.difference || ctx.brand.difference,
      testimonials: (expandedContent as Record<string, unknown>)?.testimonials as typeof ctx.brand.testimonials || ctx.brand.testimonials,
      // Use site-specific trustSignals if available, otherwise fall back to brand
      trustSignals: (expandedContent as Record<string, unknown>)?.trustSignals as typeof ctx.brand.trustSignals || ctx.brand.trustSignals,
      footer: ctx.brand.footer,
    },
    contact: {
      phone: ctx.contact.phone,
      email: ctx.contact.email,
      address: ctx.contact.address,
      hours: ctx.contact.hours,
    },
    social: ctx.social,
    // Use site-specific IKB config if available
    ikb: (siteConfig as Record<string, unknown>)?.ikb as Record<string, unknown> | undefined,
  };
  
  const siteDir = path.join(SITES_DIR, brandId, siteSlug);
  
  console.log(`\n📁 Output: ${siteDir}`);
  
  // Create site directory
  if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir, { recursive: true });
  }
  
  // Generate the site using legacy function with brand context
  await generateSite(siteDir, unifiedConfig as unknown as SiteConfig, brandContext, brandId);
  
  console.log(`\n✅ ${ctx.brand.name} - ${serviceId} generated successfully!`);
  
  // Validate content quality
  const { ContentValidator } = await import('./content-validator.js');
  const validator = new ContentValidator();
  const configPath = path.join(ROOT_DIR, 'config', 'sites', brandId, `${serviceId}.json`);
  
  console.log('\n📋 Running content validation...');
  validator.validateConfig(configPath);
  const passed = validator.errors.length === 0;
  
  if (passed) {
    console.log('✅ Content validation passed');
  } else {
    console.log('❌ Content validation failed - review warnings above');
  }
}

function printHelp(): void {
  console.log(`
🚀 Microsite Generator - Multi-Brand Platform

USAGE:
  npx ts-node scripts/generate-site.ts [options]

OPTIONS:
  --brand, -b <id>     Brand ID (e.g., postalocity, promo, techsp)
  --service, -s <id>   Service ID (e.g., credit-repair, marketing)
  --help, -h          Show this help message

EXAMPLES:
  # New format (recommended)
  npx ts-node scripts/generate-site.ts --brand postalocity --service credit-repair
  
  # Legacy format (backward compatible)
  npx ts-node scripts/generate-site.ts postalocity/credit-repair
  npx ts-node scripts/generate-site.ts credit-repair

AVAILABLE BRANDS:
${listBrands().map(b => `  - ${b}`).join('\n')}

AVAILABLE SERVICES (per brand):
  postalocity: ${listServices('postalocity').join(', ')}
`);
}

const options = parseArgs(args);

// Handle help
if (options.config === 'help' || args.includes('--help') || args.includes('-h')) {
  printHelp();
  process.exit(0);
}

// Validate and run
if (options.brand && options.service) {
  // New format: --brand X --service Y
  await generateSiteMultiBrand(options.brand, options.service);
} else if (options.config) {
  // Legacy format: single config name (assumes postalocity)
  const configName = options.config;
  const configPath = path.join(CONFIGS_DIR, `${configName}.json`);
  
  if (!fs.existsSync(configPath)) {
    console.error(`Config file not found: ${configPath}`);
    console.error(`Available configs:`);
    const configs = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json'));
    configs.forEach(c => console.error(`  - ${c.replace('.json', '')}`));
    process.exit(1);
  }
  
  // Load legacy config
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(configContent) as SiteConfig;
  const legacySiteDir = path.join(SITES_DIR, config.site.slug);
  
  await generateSite(legacySiteDir, config);
} else {
  console.error('Error: Missing required arguments');
  console.error('');
  printHelp();
  process.exit(1);
}