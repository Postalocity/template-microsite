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
const CONFIGS_DIR = path.join(ROOT_DIR, 'config/sites/postalocity');  // Default to postalocity
const SITES_DIR = path.join(ROOT_DIR, 'sites');
const TEMPLATE_DIR = ROOT_DIR;

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

// Generate Open Graph images from hero banner
async function generateOgImages(siteDir: string, config: SiteConfig): Promise<void> {
  const { exec } = await import('child_process');
  const publicDir = path.join(siteDir, 'public');

  // Create public dir if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const ogImageDest = path.join(publicDir, 'og-image.png');
  const logoDest = path.join(publicDir, 'logo.png');
  const commonLogoPath = path.join(TEMPLATE_DIR, 'common/assets/postalocity-logo.png');

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

  // Copy and resize logo from common assets
  if (fs.existsSync(commonLogoPath) && sipsCheck.stdout) {
    await new Promise<void>((resolve) => {
      exec(`sips -z 500 500 "${commonLogoPath}" --out "${logoDest}"`, (error) => {
        if (!error) {
          console.log('✓ Resized logo image from common assets (500x500px)');
        } else {
          console.log('⚠ Failed to resize logo, copying instead');
          fs.copyFileSync(commonLogoPath, logoDest);
        }
        resolve();
      });
    });
  } else if (fs.existsSync(commonLogoPath)) {
    fs.copyFileSync(commonLogoPath, logoDest);
  }

  // Get hero image path from config with fallback locations
  let heroImagePath = config.content?.hero?.background?.image;

  if (!heroImagePath) {
    console.log('⚠ No hero image specified in config - generating fallback OG image');
    await generateFallbackOgImage(ogImageDest, config);
    return;
  }

  // Map config path to source image based on site slug
  const heroSourcePaths: Record<string, string> = {
    // Map industry-specific image paths
    'credit-repair': path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'),
    'debt-collection': path.join(TEMPLATE_DIR, 'common/assets/debt-collection/hero-debt-collection.jpg'),
    'healthcare-billing': path.join(TEMPLATE_DIR, 'common/assets/healthcare/hero-bg.jpg'),
    'healthcare-mailing-services': path.join(TEMPLATE_DIR, 'common/assets/healthcare/hero-bg.jpg'),
    'software-billing': path.join(TEMPLATE_DIR, 'common/assets/hero-bg.jpg'),
    'utility-billing': path.join(TEMPLATE_DIR, 'common/assets/utilities/hero-bg.jpg'),
    'international-mail': path.join(TEMPLATE_DIR, 'common/assets/hero-bg.jpg'),
    'postcard': path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'),
    'self-storage': path.join(TEMPLATE_DIR, 'common/assets/self-storage/hero-self-storage.jpg'),
  };

  // Get source hero image path based on site slug
  const siteSlug = config.site?.slug || '';
  const heroSourcePath = heroSourcePaths[siteSlug];

  if (!heroSourcePath || !fs.existsSync(heroSourcePath)) {
    console.log(`⚠ No hero image source for ${siteSlug} - generating fallback OG image`);
    await generateFallbackOgImage(ogImageDest, config);
    return;
  }

  // Copy hero image to generated site's public/images folder
  const heroImagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(heroImagesDir)) {
    fs.mkdirSync(heroImagesDir, { recursive: true });
  }
  // Use source path for copy, but keep config's filename for the destination
  const heroImageFilename = path.basename(heroImagePath);
  const heroImagePathInSite = path.join(heroImagesDir, heroImageFilename);
  fs.copyFileSync(heroSourcePath, heroImagePathInSite);
  console.log(`✓ Copied hero image to: ${heroImagePathInSite}`);

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
  const siteName = config.site?.name || 'Postalocity';
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
      <text x="600" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)" text-anchor="middle">postalocity.com</text>
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

async function generateSite(siteDir: string, config: SiteConfig) {
  try {
    const { site } = config;

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
    fs.writeFileSync(path.join(siteDir, 'config.json'), JSON.stringify(config, null, 2));

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

    // Copy common assets (favicon, etc.)
    copyFavicons(siteDir);

    // Generate Open Graph images from hero banner (SEO optimization)
    await generateOgImages(siteDir, config);

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

function generateIndexFile(config: SiteConfig, brandConfig?: object, contactConfig?: object, socialConfig?: object): string {
  const { site } = config;
  
  // Default brand config for Postalocity (inline to avoid import issues)
  const defaultBrand = {
    id: 'postalocity',
    name: 'Postalocity',
    slug: 'postalocity',
    domain: 'postalocity.com',
    urls: {
      app: 'https://prod.postalocity.com/login.html',
      website: 'https://www.postalocity.com',
      blog: 'https://www.postalocity.com/resources/blog/',
      howWeHelp: 'https://www.postalocity.com/how-we-help/',
      whoWeServe: 'https://www.postalocity.com/who-we-serve/',
      contact: 'https://www.postalocity.com/contact/',
      faq: 'https://www.postalocity.com/resources/faq/',
    },
    logo: {
      filename: 'postalocity-logo.png',
      alt: 'Postalocity - Direct Mail Automation',
    },
  };
  
  const defaultContact = {
    phone: '316-260-2220',
    email: 'support@postalocity.com',
    address: {
      street: '820 W 2nd St N',
      city: 'Wichita',
      state: 'KS',
      zip: '67203',
    },
    hours: {
      weekdays: '8:00 AM - 5:00 PM CST',
      support: 'support@postalocity.com',
    },
  };
  
  const defaultSocial = {
    twitter: 'https://twitter.com/postalocity',
    linkedin: 'https://linkedin.com/company/postalocity',
    facebook: 'https://facebook.com/postalocity',
  };
  
  // Use provided configs or defaults
  const brand = (brandConfig || defaultBrand) as typeof defaultBrand;
  const contact = (contactConfig || defaultContact) as typeof defaultContact;
  const social = (socialConfig || defaultSocial) as typeof defaultSocial;
  
  return `/**
 * ${site.name} - Generated from template-microsite
 * Generated at: ${new Date().toISOString()}
 * Brand: ${brand.name}
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection } from '../../common/components/shared';
import SiteNavigation from '../../common/components/shared/SiteNavigation';
import SiteFooter from '../../common/components/shared/SiteFooter';
import FloatingCTA from '../../common/components/shared/FloatingCTA';
import { BrandProvider } from '../../common/contexts/BrandContext';
import { IKBProvider } from '../../common/contexts/IKBContext';
import '../../common/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = ${JSON.stringify(brand)};
const contactConfig = ${JSON.stringify(contact)};
const socialConfig = ${JSON.stringify(social)};

// IKB configuration with promo codes
const ikbConfig = {
  rules: {
    trustSignals: [
      'NCOA Verified 2024',
      'CASS Certified 2024',
      'ISO 9001 Documented Processes 2023',
    ],
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
    basePrice: 0.69,
    currency: 'USD',
    units: 'per piece',
    addOns: {
      'certified-mail': 4.15,
      'return-receipt': 3.50,
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
        <BenefitsSection benefits={content.benefits} />
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        <ServicesSection services={content.services} />
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
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
  const cityStateZip = parts.length > 1 ? parts[1]?.trim().split(' ') || ['', '', ''] : ['', '', ''];
  return {
    streetAddress: parts[0] || '',
    addressLocality: cityStateZip[0] || '',
    addressRegion: cityStateZip[1] || '',
    postalCode: cityStateZip[2] || '',
  };
}

function generateIndexHtml(config: SiteConfig): string {
  const { site } = config;
  // Use canonicalDomain, seo.canonicalUrl, or fall back to slug-based subdomain pattern
  const canonicalUrl = config.canonicalDomain || config.seo?.canonicalUrl || `https://${site.slug}.postalocity.com`;
  const ogImage = `${canonicalUrl}/og-image.png`;

  // Parse address once for schema
  const addressParts = parseAddress(site.contact?.address || '');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${config.seo?.title || `${site.name} | ${config.branding.tagline}`}</title>
    <meta name="description" content="${config.seo?.description || config.content?.hero?.subhead}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="${config.seo?.canonicalUrl || canonicalUrl}" />
    <link rel="sitemap" type="application/xml" href="${canonicalUrl}/sitemap.xml" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${config.seo?.ogTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="og:description" content="${config.seo?.ogDescription || config.content?.hero?.subhead}" />
    <meta property="og:image" content="${ogImage}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${canonicalUrl}" />
    <meta property="twitter:title" content="${config.seo?.twitterTitle || `${site.name} | ${config.branding.tagline}`}" />
    <meta property="twitter:description" content="${config.seo?.twitterDescription || config.content?.hero?.subhead}" />
    <meta property="twitter:image" content="${ogImage}" />

    <!-- SEO Meta Tags -->
    <meta name="keywords" content="${(config.seo?.keywords || [site.name, config.branding.tagline]).join(', ')}" />
    <meta name="author" content="${site.name}" />
    <meta name="robots" content="${config.seo?.robots || 'index, follow'}" />
    <meta name="theme-color" content="#664400" />

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
          "description": "${config.content?.hero?.subhead}",
          "publisher": {
            "@type": "Organization",
            "name": "${site.name}",
            "url": "${canonicalUrl}"
          }
        },
        {
          "@type": "Organization",
          "name": "Postalocity",
          "url": "${canonicalUrl}",
          "logo": "${canonicalUrl}/logo.png",
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
          "name": "${site.name}",
          "description": "${config.content?.hero?.subhead}",
          "url": "${canonicalUrl}",
          "telephone": "${site.contact?.phone || ''}",
          "email": "${site.contact?.email || ''}",
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
          "priceRange": "${config.seo?.priceRange || '$$'}",
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "${config.seo?.latitude || '39.1147'}",
              "longitude": "${config.seo?.longitude || '-95.6798'}"
            },
            "geoRadius": "5000"
          }
        },
        {
          "@type": "Product",
          "name": "Automated Mailing Service",
          "description": "Upload PDFs or connect via API to automate mailing. Starting at $1.31/letter. Single-sided, B&W envelope, postage included.",
          "image": "${canonicalUrl}/og-image.png",
          "brand": {
            "@type": "Brand",
            "name": "Postalocity"
          },
          "offers": {
            "@type": "Offer",
            "price": "1.31",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "${canonicalUrl}",
            "priceValidUntil": "2027-12-31"
          }
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
                  "text": "${faq.a.replace(/"/g, '\\"')}"
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

Sitemap: https://${site.slug}.${site.domain}/sitemap.xml
`;
}

// FIX #3 - Generate sitemap.xml for SEO discovery
function generateSitemapXml(config: SiteConfig): string {
  const { site } = config;
  const currentDate = new Date().toISOString().split('T')[0];
  const canonicalUrl = config.canonicalDomain || config.seo?.canonicalUrl || `https://${site.slug}.postalocity.com`.replace(/\/$/, '');

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
  
  // Use the site slug for output
  const siteSlug = siteInfo.slug || serviceId;
  const siteBasename = `${brandId}-${siteSlug}`;
  
  // Create unified config that matches legacy SiteConfig structure
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
      logo: `${siteBasename}/logo.png`,
    },
    seo: seoInfo,
    navigation: (siteConfig.navigation || {}) as { links?: Array<{ label: string; href: string }>; cta?: { text: string; href: string } },
    content: contentInfo,
    footer: (siteConfig.footer || {}) as Record<string, unknown>,
  };
  
  const siteDir = path.join(SITES_DIR, brandId, siteSlug);
  
  console.log(`\n📁 Output: ${siteDir}`);
  
  // Create site directory
  if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir, { recursive: true });
  }
  
  // Generate the site using legacy function
  await generateSite(siteDir, unifiedConfig as unknown as SiteConfig);
  
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