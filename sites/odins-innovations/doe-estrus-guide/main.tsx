/**
 * Doe Estrus Scent Beads - Complete Content
 * Brand: Odin's Innovations
 * Style: Scent-beads baseline - natural, earthy, clean
 */

import { createRoot } from 'react-dom/client';
import { 
  HeroSection, 
  ServicesSection,
  BenefitsSection, 
  ComparisonTable, 
  FAQSection,
  WhyOdinsSection,
  HowItWorksSection,
  WhenToUseSection,
  HowToUseSection
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
        
        {/* Complete section order with all content */}
        <HeroSection hero={content.hero} />
        
        {/* Why Odin's - Main value proposition */}
        {content['why-odins'] && (
          <WhyOdinsSection content={content['why-odins']} />
        )}
        
        {/* How It Works - The science */}
        {content['how-it-works'] && (
          <HowItWorksSection howItWorks={{
            headline: content['how-it-works'].headline,
            body: content['how-it-works'].body
          }} />
        )}
        
        {/* Benefits - Key advantages */}
        {content.benefits && (
          <BenefitsSection benefits={content.benefits} />
        )}
        
        {/* Services/Products - What we offer */}
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
        
        {/* When to Use - Seasonal guide */}
        {content['when-to-use'] && (
          <WhenToUseSection content={content['when-to-use']} />
        )}
        
        {/* How to Use - Application instructions */}
        {content['how-to-use'] && (
          <HowToUseSection content={content['how-to-use']} />
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
