/**
 * Odin's Innovations Citronella Mosquito Repellent - Generated from template-microsite
 * Generated at: 2026-04-14
 * Brand: Odin's Innovations
 */

import { createRoot } from 'react-dom/client';
import { 
  HeroSection, 
  BenefitsSection, 
  FAQSection, 
  ComparisonTable, 
  TrustBadgesSection,
  HowItWorksSection,
  DifferenceSection,
  SiteNavigation,
  SiteFooter,
} from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {
  id: "odins-innovations",
  name: "Odin's Innovations",
  slug: "odins-innovations",
  domain: "odinsinnovations.com",
  tagline: "Synthetic. Long-Lasting. Legal Everywhere.",
  googleAnalyticsId: "G-XXXXXXXXXX",
  urls: {
    app: "https://www.odinsinnovations.com",
    website: "https://www.odinsinnovations.com",
    blog: "https://www.odinsinnovations.com/blog",
    shop: "https://www.odinsinnovations.com/collections/citronella",
    contact: "https://www.odinsinnovations.com/pages/contact-us"
  },
  logo: {
    filename: "odins-logo.png",
    alt: "Odin's Innovations - Citronella Mosquito Repellent"
  },
  colors: {
    primary: { h: 30, s: 80, l: 35 },
    accent: { h: 45, s: 100, l: 50 }
  }
};

const contactConfig = {
  phone: "316-393-0440",
  email: "paul@odinsinnovations.com",
  address: {
    street: "",
    city: "",
    state: "",
    zip: ""
  }
};

const socialConfig = {
  website: "https://www.odinsinnovations.com"
};

// IKB configuration for hunting products
const ikbConfig = {
  rules: {
    trustSignals: [
      'EPA-Registered Biopesticide',
      'Made in USA',
      'Legal in All 50 States',
    ],
    promoCodes: {
      'citronella': 'HUNT2026',
      'scent-beads': 'HUNT2026',
    },
    approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals'],
    blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading', 'guaranteed', '100% effective'],
  },
  pricing: {
    basePrice: 14.95,
    currency: 'USD',
    units: 'bottle',
    addOns: {},
  },
  proofOptions: {},
  terminology: {},
};

// Get promo code
const promoCode = ikbConfig.rules.promoCodes['citronella'] || 'HUNT2026';

// Transform comparison table from object format to array format
const transformComparisonTable = (comparison: any) => {
  if (!comparison?.table) return comparison;
  
  // Check if table is already in array format
  if (Array.isArray(comparison.table[0])) {
    return comparison;
  }
  
  // Convert from [{feature, odins, traditional}, ...] to [[feature, odins, traditional], ...]
  const headerRow = ['Feature', 'Odins Citronella', 'Traditional Options'];
  const dataRows = comparison.table.map((row: any) => [
    row.feature,
    row.odins,
    row.traditional
  ]);
  
  return {
    ...comparison,
    table: [headerRow, ...dataRows]
  };
};

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
        
        {/* Hero Section */}
        <HeroSection hero={content.hero} />
        
        {/* Introduction - Using DifferenceSection */}
        {content.introduction && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'introduction',
                title: 'Mosquito Control for Hunting',
                description: ''
              },
              differences: [
                {
                  icon: 'bug',
                  title: 'Peak Season Protection',
                  description: 'Peak mosquito activity coincides with spring hunting seasons — from turkey to waterfowl to early bow season.'
                },
                {
                  icon: 'leaf',
                  title: 'Scent-Safe Formula',
                  description: 'The milder scent profile avoids the strong chemical odors DEET produces — odors deer can detect at distance.'
                },
                {
                  icon: 'clock',
                  title: 'Long-Lasting Barrier',
                  description: 'With potential duration up to 720 hours, it dramatically reduces reapplication compared to traditional options that last ~20 minutes.'
                },
                {
                  icon: 'shield',
                  title: 'EPA-Registered Biopesticide',
                  description: 'Formulated with EPA-registered biopesticide (citronellal and geraniol), it masks the CO2, lactic acid, and octenol cues mosquitoes use to locate hosts.'
                }
              ]
            }}
          />
        )}
        
        {/* Why Odin's - Using DifferenceSection */}
        {content['why-odins'] && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'why-odins',
                title: content['why-odins'].headline,
                description: ''
              },
              differences: [
                {
                  icon: 'cloud',
                  title: 'Rainproof oil-based formula',
                  description: 'Stays effective after moisture'
                },
                {
                  icon: 'eye',
                  title: 'Masks CO2 detection',
                  description: 'Up to 150 feet and skin chemistry cues'
                },
                {
                  icon: 'clock',
                  title: 'Reduced reapplication',
                  description: 'During long sits in stands or blinds'
                },
                {
                  icon: 'leaf',
                  title: 'No harsh chemical signature',
                  description: 'Milder, plant-derived scent'
                },
                {
                  icon: 'flag',
                  title: 'Legal in all 50 states',
                  description: '100% synthetic formula'
                }
              ]
            }}
          />
        )}
        
        {/* Mosquito Detection Process - Using DifferenceSection */}
        {content.detection && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'detection',
                title: content.detection.headline,
                description: ''
              },
              differences: [
                {
                  icon: 'eye',
                  title: 'CO₂ Detection',
                  description: 'Mosquitoes detect carbon dioxide from breath over 150 feet away'
                },
                {
                  icon: 'droplet',
                  title: 'Lactic Acid & Octenol',
                  description: 'Medium-range cues from skin and sweat increase during physical activity'
                },
                {
                  icon: 'temperature',
                  title: 'Body Heat',
                  description: 'Close-range targeting completed by detecting heat signatures'
                }
              ]
            }}
          />
        )}
        
        {/* How It Works */}
        {content['how-it-works'] && (
          <HowItWorksSection 
            howItWorks={{
              section: {
                id: 'how-it-works',
                title: content['how-it-works'].headline,
                description: content['how-it-works'].body
              },
              steps: [
                {
                  number: '1',
                  title: 'Apply to Foliage',
                  description: 'Spray lightly on trees, brush, or ground cover to form a protective perimeter ring'
                },
                {
                  number: '2',
                  title: 'Establish Barrier',
                  description: 'Focus on downwind sides and entry paths for optimal barrier establishment'
                },
                {
                  number: '3',
                  title: 'Sustained Release',
                  description: 'Oil-based formula adheres to surfaces for extended performance up to 720 hours'
                },
                {
                  number: '4',
                  title: 'Weather Resistant',
                  description: 'Rainproof formula maintains efficacy even after moisture exposure'
                }
              ]
            }}
          />
        )}
        
        {/* Application Guide - Using DifferenceSection */}
        {content.application && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'application',
                title: content.application.headline,
                description: content.application.note || ''
              },
              differences: content.application.steps.map((step, index) => ({
                icon: 'check-circle',
                title: `Step ${index + 1}`,
                description: step
              }))
            }}
          />
        )}
        
        {/* Hunting Blinds - Using DifferenceSection */}
        {content.blinds && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'blinds',
                title: content.blinds.headline,
                description: ''
              },
              differences: [
                {
                  icon: 'cloud',
                  title: 'Enclosed Space Performance',
                  description: 'Enclosed and semi-enclosed blinds concentrate the scent zone for stronger barrier performance.'
                },
                {
                  icon: 'clock',
                  title: 'Long-Lasting Results',
                  description: 'Users report returning days or weeks later with significantly reduced insect presence.'
                },
                {
                  icon: 'check-circle',
                  title: 'Minimal Maintenance',
                  description: 'The combination supports consistent results across multiple visits with minimal maintenance.'
                }
              ]
            }}
          />
        )}
        
        {/* Comparison Table */}
        {content.comparison && <ComparisonTable comparison={transformComparisonTable(content.comparison)} promoCode={promoCode} />}
        
        {/* Layered Strategy - Using DifferenceSection */}
        {content.layered && (
          <DifferenceSection 
            difference={{
              section: {
                id: 'layered',
                title: content.layered.headline,
                description: ''
              },
              differences: [
                {
                  icon: 'droplet',
                  title: 'Rapid Perimeter Establishment',
                  description: 'Combine Citronella Liquid for rapid perimeter establishment with Citronella Scent Beads for 30+ days of continuous slow-release.'
                },
                {
                  icon: 'leaf',
                  title: 'Same Polymer Technology',
                  description: 'Uses the same biodegradable polymer technology as Odin\'s hunting attractants.'
                },
                {
                  icon: 'check-circle',
                  title: 'Easy Storage',
                  description: 'Seal unused beads in a Ziplock bag to preserve potency when not in use.'
                }
              ]
            }}
          />
        )}
        
        {/* Trust Badges */}
        <TrustBadgesSection 
          trustSignals={[
            { text: 'EPA-Registered Biopesticide', icon: 'shield-check' },
            { text: 'Made in USA', icon: 'flag' },
            { text: 'Legal in All 50 States', icon: 'map-pin' },
          ]} 
        />
        
        {/* FAQ Section */}
        {content.faq && <FAQSection faq={content.faq} />}
        
        {/* Conclusion / Final CTA */}
        {content.conclusion && (
          <section className="section-md bg-primary text-primary-foreground">
            <div className="section-container text-center">
              <h2 className="text-2xl font-bold mb-4">
                {content.footer.finalCTA.headline}
              </h2>
              <a
                href={content.footer.finalCTA.href}
                className="btn-accent-dark inline-flex items-center gap-2"
              >
                {content.footer.finalCTA.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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