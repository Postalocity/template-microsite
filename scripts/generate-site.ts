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

// Copy favicons from common/assets to all sites
function copyFavicons(siteDir: string): void {
  const publicDir = path.join(siteDir, 'public');
  const commonAssetsFavicon = path.join(TEMPLATE_DIR, 'common/assets/favicon.ico');
  
  if (fs.existsSync(commonAssetsFavicon)) {
    // Create public dir if it doesn't exist
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Copy favicon.ico
    fs.copyFileSync(commonAssetsFavicon, path.join(publicDir, 'favicon.ico'));
  }
}

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

    // Generate main.tsx
    const indexContent = generateIndexFile(config);
    fs.writeFileSync(path.join(siteDir, 'main.tsx'), indexContent);

    // Copy config.json
    fs.writeFileSync(path.join(siteDir, 'config.json'), configContent);

    // Generate vite.config.ts
    const viteConfigContent = generateViteConfig(site.basename);
    fs.writeFileSync(path.join(siteDir, 'vite.config.ts'), viteConfigContent);

    // Copy postcss.config.js
    const postcssConfig = fs.readFileSync(path.join(TEMPLATE_DIR, 'postcss.config.js'), 'utf-8');
    fs.writeFileSync(path.join(siteDir, 'postcss.config.js'), postcssConfig);

    // Generate tailwind.config.ts for the site
    const tailwindConfig = generateTailwindConfig();
    fs.writeFileSync(path.join(siteDir, 'tailwind.config.ts'), tailwindConfig);

    // Copy package.json with site-specific config
    const packageJson = generatePackageJson(site);
    fs.writeFileSync(path.join(siteDir, 'package.json'), packageJson);

    // Create index.html
    const indexHtml = generateIndexHtml(config);
    fs.writeFileSync(path.join(siteDir, 'index.html'), indexHtml);

    // Generate robots.txt and sitemap.xml (FIX #3 - SEO indexing)
    const robotsTxt = generateRobotsTxt(site);
    fs.writeFileSync(path.join(siteDir, 'robots.txt'), robotsTxt);

    const sitemapXml = generateSitemapXml(site);
    fs.writeFileSync(path.join(siteDir, 'sitemap.xml'), sitemapXml);

    // Copy common assets (favicon, etc.)
    copyFavicons(siteDir);

    console.log(`✅ ${site.name} generated successfully!`);
    console.log(`📁 Generated files:`);
    console.log(`   - main.tsx`);
    console.log(`   - vite.config.ts`);
    console.log(`   - postcss.config.js`);
    console.log(`   - tailwind.config.ts`);
    console.log(`   - package.json`);
    console.log(`   - index.html`);
    console.log(`   - globals.css`);
    console.log(`   - robots.txt`);
    console.log(`   - sitemap.xml`);
    console.log(`   - favicon.ico (copied from common/assets)`);
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
  const { site } = config;
  return `/**
 * ${site.name} - Generated from template-microsite
 * Generated at: ${new Date().toISOString()}
 */

import { createRoot } from 'react-dom/client';
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

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;
}

function generateViteConfig(basename: string): string {
  return `import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '${basename}',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../common'),
      '../common': path.resolve(__dirname, '../../common'),
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

function generateTailwindConfig(): string {
  return `import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./main.tsx",
    "../../common/components/**/*.{js,ts,jsx,tsx}",
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

function generatePackageJson(site: any): string {
  return JSON.stringify({
    name: site.slug,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
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
  const canonicalUrl = `https://${site.domain}${site.basename}`;
  const ogImage = `https://${site.domain}${site.basename}/og-image.png`;

  // Parse address once for schema
  const addressParts = parseAddress(site.contact.address || '');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.seo?.title || `${site.name} | ${config.branding.tagline}`}</title>
    <meta name="description" content="${config.seo?.description || config.content.hero.subhead}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${config.seo?.canonicalUrl || canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${config.seo?.ogTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="og:description" content="${config.seo?.ogDescription || config.content.hero.subhead}" />
    <meta property="og:image" content="${ogImage}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${config.seo?.twitterTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="twitter:description" content="${config.seo?.twitterDescription || config.content.hero.subhead}" />
    <meta property="twitter:image" content="${ogImage}" />

    <!-- SEO Meta Tags -->
    <meta name="keywords" content="${(config.seo?.keywords || [site.name, config.branding.tagline]).join(', ')}" />
    <meta name="author" content="${site.name}" />
    <meta name="robots" content="${config.seo?.robots || 'index, follow'}" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

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
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`;
}

// FIX #3 - Generate robots.txt for SEO indexing
function generateRobotsTxt(site: any): string {
  return `User-agent: *
Allow: /
Sitemap: https://${site.domain}${site.basename}/sitemap.xml
`;
}

// FIX #3 - Generate sitemap.xml for SEO discovery
function generateSitemapXml(site: any): string {
  const currentDate = new Date().toISOString().split('T')[0];
  const canonicalUrl = `https://${site.domain}${site.basename}`.replace(/\/$/, '');

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