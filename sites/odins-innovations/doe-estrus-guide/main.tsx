/**
 * Doe Estrus Scent Beads - Generated from template-microsite
 * Brand: Odin's Innovations
 */

import { createRoot } from 'react-dom/client';
import { 
  HeroSection, 
  TrustBarSection,
  BenefitsSection, 
  HowItWorksSection, 
  ProductsSection,
  ComparisonTable, 
  WhyOdinsSection,
  WhenToUseSection,
  HowToUseSection,
  FAQSection
} from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration
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
    "primary": { "h": 140, "s": 60, "l": 25 },
    "accent": { "h": 45, "s": 90, "l": 55 }
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
    approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'pricing'],
    blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat'],
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
        
        {/* Conversion-optimized section order */}
        <HeroSection hero={content.hero} />
        
        {/* Trust Bar - 4 key trust signals */}
        <TrustBarSection trustSignals={[
          { text: "Made in USA" },
          { text: "30+ Day Release" },
          { text: "CWD-Safe Formula" },
          { text: "Weatherproof" }
        ]} />
        
        {/* Benefits with stat highlight */}
        <BenefitsSection benefits={content.benefits} />
        
        {/* How It Works - 3 step timeline */}
        {content['how-it-works'] && (
          <HowItWorksSection howItWorks={{
            headline: content['how-it-works'].headline,
            body: content['how-it-works'].body
          }} />
        )}
        
        {/* Products - Featured layout */}
        {content.products && (
          <ProductsSection content={content.products} />
        )}
        
        {/* Comparison Table */}
        {content.comparison && (
          <ComparisonTable comparison={content.comparison} />
        )}
        
        {/* Why Odin's */}
        {content['why-odins'] && (
          <WhyOdinsSection content={content['why-odins']} />
        )}
        
        {/* When to Use - with seasonal calendar */}
        {content['when-to-use'] && (
          <WhenToUseSection content={content['when-to-use']} />
        )}
        
        {/* How to Use - with product instructions */}
        {content['how-to-use'] && (
          <HowToUseSection content={content['how-to-use']} />
        )}
        
        {/* FAQ with category tabs */}
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
