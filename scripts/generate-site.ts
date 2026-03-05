#!/usr/bin/env node

/**
 * Site Generation Script
 * Reads JSON config and generates microsite structure
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIGS_DIR = path.join(__dirname, '../config/sites');
const SITES_DIR = path.join(__dirname, '../sites');
const TEMPLATE_DIR = path.join(__dirname, '..');

async function generateSite(configPath: string) {
  try {
    // Read configuration
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    const { site } = config;
    const siteDir = path.join(SITES_DIR, site.slug);

    console.log(`Generating site: ${site.name}`);
    console.log(`Output directory: ${siteDir}`);

    // Create site directory
    if (!fs.existsSync(siteDir)) {
      fs.mkdirSync(siteDir, { recursive: true });
    }

    // Generate index.tsx
    const indexContent = generateIndexFile(config);
    fs.writeFileSync(path.join(siteDir, 'index.tsx'), indexContent);

    // Copy config.json
    fs.writeFileSync(path.join(siteDir, 'config.json'), configContent);

    // Generate vite.config.ts
    const viteConfigContent = generateViteConfig(site.basename);
    fs.writeFileSync(path.join(siteDir, 'vite.config.ts'), viteConfigContent);

    // Copy package.json with site-specific config
    const packageJson = generatePackageJson(site);
    fs.writeFileSync(path.join(siteDir, 'package.json'), packageJson);

    // Create index.html
    const indexHtml = generateIndexHtml(config);
    fs.writeFileSync(path.join(siteDir, 'index.html'), indexHtml);

    // Generate shared globals.css
    const globalsCss = generateGlobalsCss(config);
    if (!fs.existsSync(path.join(TEMPLATE_DIR, 'common'))) {
      fs.mkdirSync(path.join(TEMPLATE_DIR, 'common'), { recursive: true });
    }
    fs.writeFileSync(path.join(TEMPLATE_DIR, 'common/globals.css'), globalsCss);

    // Generate robots.txt and sitemap.xml (FIX #3 - SEO indexing)
    const robotsTxt = generateRobotsTxt(site);
    fs.writeFileSync(path.join(siteDir, 'robots.txt'), robotsTxt);

    const sitemapXml = generateSitemapXml(site);
    fs.writeFileSync(path.join(siteDir, 'sitemap.xml'), sitemapXml);

    console.log(`✅ ${site.name} generated successfully!`);
    console.log(`📁 Generated files:`);
    console.log(`   - index.tsx`);
    console.log(`   - vite.config.ts`);
    console.log(`   - package.json`);
    console.log(`   - index.html`);
    console.log(`   - globals.css`);
    console.log(`   - robots.txt (NEW - enables indexing)`);
    console.log(`   - sitemap.xml (NEW - SEO discovery)`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   cd ${siteDir}`);
    console.log(`   npm install`);
    console.log(`   npm run build`);

  } catch (error) {
    console.error('Error generating site:', error);
    process.exit(1);
  }
}

function generateIndexFile(config: any): string {
  const { site, content } = config;

  return `/**
 * ${site.name} - Generated from template-microsite
 * Generated at: ${new Date().toISOString()}
 */

import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonSection } from '../common/components/shared';
import SiteNavigation from '../common/components/shared/SiteNavigation';
import SiteFooter from '../common/components/shared/SiteFooter';
import '../common/globals.css';
import config from './config.json';

function App() {
  const { content } = config;

  return (
    <>
      <SiteNavigation config={config} />
      <HeroSection hero={content.hero} />
      <BenefitsSection benefits={content.benefits} />
      <ComparisonSection comparison={content.comparison} />
      <ServicesSection services={content.services} />
      <FAQSection faq={content.faq} />
      <SiteFooter config={config} />
    </>
  );
}

export default App;
`;
}

function generateViteConfig(basename: string): string {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '${basename}',
  resolve: {
    alias: {
      '../common': path.resolve(__dirname, '../../common'),
    },
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

function generatePackageJson(site: any): string {
  return JSON.stringify({
    name: site.slug,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      'react': '^18.3.1',
      'react-dom': '^18.3.1',
      'framer-motion': '^11.11.17',
      'lucide-react': '^0.460.0',
    },
    devDependencies: {
      '@types/react': '^18.3.17',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react-swc': '^3.8.0',
      'typescript': '^5.6.3',
      'vite': '6.1.0',
    },
  }, null, 2);
}

// FIX #1 - Address parsing bug: Properly parse address components from address string
function parseAddress(address: string) {
  const parts = address.split(',').map((s: string) => s.trim());
  const cityStateZip = parts[2]?.trim().split(' ') || ['', '', ''];
  return {
    streetAddress: parts[0] || '',
    addressLocality: parts[1] || '',
    addressRegion: cityStateZip[0] || '',
    postalCode: cityStateZip[1] || '',
  };
}

function generateIndexHtml(config: any): string {
  const { site } = config;
  const canonicalUrl = `https://${site.domain}`;
  const ogImage = `${canonicalUrl}/og-image.png`;

  // Parse address once for schema
  const addressParts = parseAddress(site.contact.address || '');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${site.name} | ${config.branding.tagline}</title>
    <meta name="description" content="${config.content.hero.subhead}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${site.name} | ${config.branding.tagline}" />
    <meta property="og:description" content="${config.content.hero.subhead}" />
    <meta property="og:image" content="${ogImage}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${site.name} | ${config.branding.tagline}" />
    <meta property="twitter:description" content="${config.content.hero.subhead}" />
    <meta property="twitter:image" content="${ogImage}" />

    <!-- SEO Meta Tags -->
    <meta name="keywords" content="${site.name}, ${config.branding.tagline}" />
    <meta name="author" content="${site.name}" />
    <meta name="robots" content="index, follow" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "${site.name}",
          "url": "${canonicalUrl}",
          "description": "${config.content.hero.subhead}",
          "publisher": {
            "@type": "Organization",
            "name": "${site.name}",
            "url": "${canonicalUrl}"
          }
        },
        {
          "@type": "Organization",
          "name": "${site.name}",
          "url": "${canonicalUrl}",
          "logo": "${canonicalUrl}/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "${site.contact.phone || ''}",
            "contactType": "customer service",
            "email": "${site.contact.email}"
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
          "name": "${site.name}",
          "description": "${config.content.hero.subhead}",
          "url": "${canonicalUrl}",
          "telephone": "${site.contact.phone || ''}",
          "email": "${site.contact.email}",
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
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "priceRange": "$$"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            ${(config.content.faq?.faqs || []).map((faq: any) => `
              {
                "@type": "Question",
                "name": "${faq.q.replace(/"/g, '\\"')}",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${faq.a.replace(/"/g, '\\"')}"
                }
              }`).join(',\n            ')}
          ]
        }
      ]
    }
    </script>

    <!-- Mobile-Optimized Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
`;
}

// FIX #3 - Generate robots.txt for SEO indexing
function generateRobotsTxt(site: any): string {
  return `User-agent: *
Allow: /
Sitemap: https://${site.domain}/sitemap.xml
`;
}

// FIX #3 - Generate sitemap.xml for SEO discovery
function generateSitemapXml(site: any): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const canonicalUrl = `https://${site.domain}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${canonicalUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function generateGlobalsCss(config: any): string {
  const { theme } = config;
  const { primary } = theme;

  return `:root {
  --foreground: 222.2 84% 4.9%;
  --background: 210 40% 98%;
  --card: 0 0% 100%;
  --primary: ${primary.h} ${primary.s}% ${primary.l}%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --hero: ${theme.gradients.hero};
  --hero-foreground: 0 0% 100%;
  --hero-subtitle: 210 40% 90%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: ${primary.h} ${primary.s}% ${primary.l}%;
  --radius: 0.5rem;
}

/* Mobile-First Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Selectable text - prevents accidental selection on mobile */
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1rem, 2vw, 1.125rem);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Mobile-optimized readability */
@media (max-width: 768px) {
  body {
    font-size: clamp(1rem, 4vw, 1rem);
  }
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.2;
  word-break: break-word;
  overflow-wrap: break-word;
}

#root {
  min-height: 100vh;
}

.gradient-text {
  background: linear-gradient(135deg,
    hsl(var(--primary)),
    hsl(260 90% 65%),
    hsl(var(--primary))
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem;
}

/* Mobile-Optimized Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Mobile-Friendly Links */
a {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

/* Touch targets minimum 44x44px (WCAG 2.4.5) */
button, a, input, label {
  min-height: 44px;
  min-width: 44px;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

/* Mobile viewing optimization */
@media (max-width: 768px) {
  /* Prevent horizontal scrolling */
  body {
    overflow-x: hidden;
  }

  /* Improve tap target spacing */
  .grid {
    gap: 1.5rem;
  }

  /* Stack content vertically on mobile */
  .flex {
    flex-direction: column;
  }

  /* Hide decorative elements on mobile */
  .hide-mobile {
    display: none;
  }
}

/* Desktop-optimized */
@media (min-width: 769px) {
  /* Restore horizontal layouts */
  .grid {
    gap: 2rem;
  }

  .flex {
    flex-direction: row;
  }

  .hide-desktop {
    display: none;
  }
}

/* Print styles */
@media print {
  body {
    font-size: 12pt;
    color: black;
    background: white;
  }

  .no-print {
    display: none;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus styles for keyboard navigation */
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
}

// CLI interface
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node generate-site.js <config-name>');
  console.error('Example: node generate-site.js healthcare-billing');
  process.exit(1);
}

const configName = args[0];
const configPath = path.join(CONFIGS_DIR, `${configName}.json`);

if (!fs.existsSync(configPath)) {
  console.error(`Config file not found: ${configPath}`);
  console.error(`Available configs:`);
  const configs = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.json'));
  configs.forEach(c => console.error(`  - ${c.replace('.json', '')}`));
  process.exit(1);
}

await generateSite(configPath);