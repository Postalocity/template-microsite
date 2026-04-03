/**
 * Doe Estrus Scent Beads - Final Design
 * Brand: Odin's Innovations
 * Style: Scent-beads baseline (38/40 score) - natural, earthy, clean
 */

import { createRoot } from 'react-dom/client';
import { 
  HeroSection, 
  ServicesSection,
  BenefitsSection, 
  ComparisonTable, 
  FAQSection
} from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration - matching scent-beads olive palette
const brandConfig = {
  "id": "odins-innovations",
  "name": "Odin's Innovations",
  "slug": "odins-innovations",
  "domain": "odinsinnovations.com",
  "tagline": "Synthetic. Long-Lasting. Legal Everywhere.",
  "googleAnalyticsId": "G-XXXXXXXXXX",
  "urls": {
    "app": "https://www.odinsinnovations.com",
    "website": "https://www.odinsinnovations.com",
    "blog": "https://www.odinsinnovations.com/blog",
    "shop": "https://www.odinsinnovations.com/collections/scent-beads",
    "contact": "https://www.odinsinnovations.com/pages/contact-us"
  },
  "logo": {
    "filename": "odins-logo.png",
    "alt": "Odin's Innovations - Synthetic Scent Beads"
  },
  "colors": {
    "primary": { "h": 85, "s": 25, "l": 35 },
    "accent": { "h": 42, "s": 70, "l": 50 }
  }
};

const contactConfig = {
  "phone": "316-393-0440",
  "email": "paul@odinsinnovations.com",
  "address": { "street": "", "city": "", "state": "", "zip": "" }
};

const socialConfig = { "website": "https://www.odinsinnovations.com" };

// IKB configuration
const ikbConfig = {
  rules: {
    trustSignals: [
      'NCOA Verified 2024',
      'CASS Certified 2024',
      'ISO 9001 Documented Processes 2023',
    ],
    promoCodes: { 'doe-estrus-guide': 'HUNT2026' },
    approvedSections: ['hero', 'services', 'benefits', 'comparison', 'faq', 'footer'],
    blocklistedContent: ['testimonial', 'testimonials'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading'],
  },
  pricing: {
    basePrice: 13.99,
    currency: 'USD',
    units: 'product',
  },
};

// Get promo code
const promoCode = ikbConfig.rules.promoCodes['doe-estrus-guide'] || 'HUNT2026';

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
        
        {/* Scent-beads proven section order */}
        <HeroSection hero={content.hero} />
        
        {/* Services - Product grid showing scent offerings */}
        {content.products && (
          <ServicesSection 
            services={{
              section: {
                title: content.products.headline || "Available Doe Estrus Products",
                description: content.products.intro || "Targeted formulas for every phase of the hunt."
              },
              services: content.products.items?.map(item => ({
                title: item.name,
                description: item.description,
                icon: undefined
              }))
            }} 
          />
        )}
        
        {/* Benefits - Why choose Odin's */}
        {content.benefits && (
          <BenefitsSection benefits={content.benefits} />
        )}
        
        {/* Comparison - Synthetic vs Traditional */}
        {content.comparison && (
          <ComparisonTable comparison={content.comparison} />
        )}
        
        {/* FAQ - Questions answered */}
        <FAQSection faq={content.faq} />
        
        <SiteFooter config={config} />
        
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
