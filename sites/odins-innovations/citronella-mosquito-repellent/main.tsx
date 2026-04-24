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
  TrustBadgesSection,
  SiteNavigation,
  SiteFooter,
  StampedReviewsSection,
} from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Import Lucide icons
import { 
  Bug, 
  Leaf, 
  Clock, 
  ShieldCheck, 
  Droplets, 
  Wind, 
  Thermometer,
  CheckCircle,
  Cloud,
  MapPin,
  Beaker,
  Package,
  CheckSquare
} from 'lucide-react';

// Import brand config with icon mappings
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
    shop: "https://www.odinsinnovations.com/products/citronella-liquid",
    contact: "https://www.odinsinnovations.com/pages/contact-us"
  },
  logo: {
    filename: "odins-logo.png",
    alt: "Odin's Innovations - Citronella Mosquito Repellent"
  },
  colors: {
    primary: { h: 30, s: 80, l: 35 },
    accent: { h: 45, s: 100, l: 50 }
  },
  // Icon mapping for consistent usage across all Odin's sites
  icons: {
    // Lucide icons (default strokeWidth: 2, use 1.5 for thinner)
    lucide: {
      bug: { component: 'Bug', color: '#2d5a3d', strokeWidth: 1.5 },
      leaf: { component: 'Leaf', color: '#2d5a3d', strokeWidth: 1.5 },
      clock: { component: 'Clock', color: '#2d5a3d', strokeWidth: 1.5 },
      'shield-check': { component: 'ShieldCheck', color: '#2d5a3d', strokeWidth: 1.5 },
      droplets: { component: 'Droplets', color: '#4ade80', strokeWidth: 1.5 }, // green-400 for dark bg
      wind: { component: 'Wind', color: '#2d5a3d', strokeWidth: 1.5 },
      thermometer: { component: 'Thermometer', color: '#2d5a3d', strokeWidth: 1.5 },
      'check-circle': { component: 'CheckCircle', color: '#2d5a3d', strokeWidth: 1.5 },
      cloud: { component: 'Cloud', color: '#2d5a3d', strokeWidth: 1.5 },
      package: { component: 'Package', color: '#4ade80', strokeWidth: 1.5 }, // green-400 for dark bg
    },
    // Custom brand SVG icons (stored in common/assets/odins-innovations/)
    brand: {
      '50-states': {
        light: '/icon-50-states.svg', // dark stroke for light bg
        dark: '/icon-50-states-white.svg', // white stroke for dark bg
        description: 'USA flag icon - Legal in all 50 states'
      },
      '30-days': {
        light: '/icon-long-lasting.svg', // dark stroke for light bg
        dark: '/icon-long-lasting-white.svg', // white stroke for dark bg
        description: 'Clock/timer icon - 30+ day duration'
      },
      chemistry: {
        light: '/icon-chemistry.svg',
        dark: '/icon-chemistry-white.svg',
        description: 'Molecule icon - Skin chemistry detection'
      }
    }
  }
};

const contactConfig = {
  phone: "316-393-0440",
  email: "paul@odinsinnovations.com",
  address: { street: "", city: "", state: "", zip: "" }
};

const socialConfig = {
  website: "https://www.odinsinnovations.com"
};

const ikbConfig = {
  rules: {
    trustSignals: [
      'EPA-Registered Biopesticide',
      'Made in USA',
      'Legal in All 50 States',
    ],
    promoCodes: {
      'citronella': 'HUNT2026',
    },
    approvedSections: ['hero', 'features', 'faq', 'cta', 'footer', 'trustSignals'],
    blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading'],
  },
  pricing: {
    basePrice: 14.95,
    currency: 'USD',
    units: 'bottle',
  },
};

const promoCode = ikbConfig.rules.promoCodes['citronella'] || 'HUNT2026';

// Icon for LIGHT backgrounds (dark stroke)
const Icon50States = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
    <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
    <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="22" cy="32" r="2" fill="currentColor"/>
    <circle cx="30" cy="32" r="2" fill="currentColor"/>
    <circle cx="38" cy="32" r="2" fill="currentColor"/>
    <circle cx="26" cy="38" r="2" fill="currentColor"/>
    <circle cx="34" cy="38" r="2" fill="currentColor"/>
    <circle cx="22" cy="44" r="2" fill="currentColor"/>
    <circle cx="30" cy="44" r="2" fill="currentColor"/>
    <circle cx="38" cy="44" r="2" fill="currentColor"/>
    <circle cx="26" cy="50" r="2" fill="currentColor"/>
    <circle cx="34" cy="50" r="2" fill="currentColor"/>
  </svg>
);

// Icon for DARK backgrounds (white stroke)
const Icon50StatesWhite = () => (
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
);

// Icon for LIGHT backgrounds (dark stroke)
const IconLongLasting = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
    <circle cx="60.82" cy="54.12" r="4.26"/>
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
  </svg>
);

// Icon for DARK backgrounds (white stroke)
const IconLongLastingWhite = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="3" className="w-12 h-12">
    <circle cx="60.82" cy="54.12" r="4.26"/>
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
  </svg>
);



// Section 1: Introduction - LIGHT BACKGROUND
const IntroductionSection = ({ content }: { content: any }) => {
  const features = content?.introduction?.features || [];
  
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'bug':
        return <Bug className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
      case 'leaf':
        return <Leaf className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
      case 'clock':
        return <IconLongLasting />;
      case 'shield-check':
        return <ShieldCheck className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
      default:
        return <Bug className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
    }
  };
  
  return (
    <section className="section-padding" style={{ background: '#f8f9fa' }}>
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
            Mosquito Control for Hunting
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
            Peak protection when you need it most
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature: any, idx: number) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{feature.title}</h3>
              <p className="font-body text-sm" style={{ color: '#666' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 2: Why Odin's - DARK BACKGROUND
const WhyOdinsSection = ({ content }: { content: any }) => (
  <section className="section-padding" style={{ background: '#1a1d29' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
          {content?.headline || "Why Choose Odin's"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
          Professional performance standards for serious hunters
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Droplets className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Rainproof Formula</h3>
          <p className="font-body text-sm text-gray-400">Stays effective after moisture exposure.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Wind className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Masks CO2 Detection</h3>
          <p className="font-body text-sm text-gray-400">Up to 150 feet protection from breath detection.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <IconLongLastingWhite />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">30+ Day Duration</h3>
          <p className="font-body text-sm text-gray-400">Reduced reapplication during long sits.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Leaf className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Plant-Derived Scent</h3>
          <p className="font-body text-sm text-gray-400">No harsh chemical signature detectable by game.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Icon50StatesWhite />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Legal in 50 States</h3>
          <p className="font-body text-sm text-gray-400">100% synthetic formula - legal everywhere.</p>
        </div>
      </div>
    </div>
  </section>
);

// Section 3: Detection Process - LIGHT BACKGROUND
const DetectionSection = ({ content }: { content: any }) => (
  <section className="section-padding" style={{ background: '#fff' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
          {content?.headline || "How Mosquitoes Locate Hosts"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
          Understanding the three-stage targeting process
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6" style={{ borderTop: '4px solid #2d5a3d' }}>
          <div className="text-sm font-bold mb-2 text-green-700">STAGE 01</div>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Wind className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>CO₂ Detection</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Mosquitoes detect carbon dioxide from breath over 150 feet away.</p>
        </div>
        <div className="text-center p-6" style={{ borderTop: '4px solid #2d5a3d' }}>
          <div className="text-sm font-bold mb-2 text-green-700">STAGE 02</div>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Beaker className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>Skin Chemistry</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Lactic acid & octenol from skin and sweat during physical activity.</p>
        </div>
        <div className="text-center p-6" style={{ borderTop: '4px solid #2d5a3d' }}>
          <div className="text-sm font-bold mb-2 text-green-700">STAGE 03</div>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Thermometer className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>Body Heat</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Close-range targeting by detecting heat signatures.</p>
        </div>
      </div>
    </div>
  </section>
);

// Section 4: Application Guide - DARK BACKGROUND
const ApplicationSection = ({ content }: { content: any }) => (
  <section className="section-padding" style={{ background: '#242835' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
          {content?.headline || "Application Guide"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
          {content?.note || "Reduce reapplication time in the field"}
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-4">
        {content?.steps?.map((step: string, i: number) => (
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
);

// Section 5: Hunting Blinds - LIGHT BACKGROUND
const BlindsSection = ({ content }: { content: any }) => (
  <section className="section-padding" style={{ background: '#f5f5f5' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
          {content?.headline || "Citronella in Hunting Blinds"}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Cloud className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>Enclosed Performance</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Blinds concentrate the scent zone for stronger barrier performance.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Clock className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>Long-Lasting Results</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Return days or weeks later with reduced insect presence.</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>Minimal Maintenance</h3>
          <p className="font-body text-sm" style={{ color: '#666' }}>Consistent results across multiple visits with minimal effort.</p>
        </div>
      </div>
    </div>
  </section>
);

// Section 6: Layered Strategy - DARK BACKGROUND
const LayeredSection = ({ content }: { content: any }) => (
  <section className="section-padding" style={{ background: '#1e212b' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
          {content?.headline || "Layered Strategy"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
          Maximum protection with liquid and beads combined
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Droplets className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Weatherproof Formula</h3>
          <p className="font-body text-sm text-gray-400">Rainproof liquid maintains efficacy after moisture.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Leaf className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Polymer Technology</h3>
          <p className="font-body text-sm text-gray-400">Same biodegradable technology as hunting attractants.</p>
        </div>
        <div className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <Package className="w-10 h-10 text-green-400" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl uppercase mb-2 text-white">Easy Storage</h3>
          <p className="font-body text-sm text-gray-400">Seal beads in Ziplock bag to preserve potency.</p>
        </div>
      </div>
    </div>
  </section>
);

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
        
        {/* Section 1: Introduction - LIGHT */}
        <IntroductionSection content={content} />
        
        {/* Section 2: Why Odin's - DARK */}
        {content['why-odins'] && <WhyOdinsSection content={content['why-odins']} />}
        
        {/* Section 3: Detection - LIGHT */}
        {content.detection && <DetectionSection content={content.detection} />}
        
        {/* Section 4: Application - DARK */}
        {content.application && <ApplicationSection content={content.application} />}
        
        {/* Section 5: Blinds - LIGHT */}
        {content.blinds && <BlindsSection content={content.blinds} />}
        
        {/* Section 6: Layered - DARK */}
        {content.layered && <LayeredSection content={content.layered} />}
        
        {/* Trust Badges */}
        <TrustBadgesSection 
          trustSignals={[
            { text: 'EPA-Registered Biopesticide', icon: 'shield-check' },
            { text: 'Made in USA', icon: 'flag' },
            { text: 'Legal in All 50 States', icon: '50-states' },
          ]} 
        />
        
        {/* Stamped.io Reviews - Real Customer Testimonials */}
        <StampedReviewsSection 
          title="What Hunters Are Saying"
          subtitle="Field Reports"
          description="Real results from hunters who put Odin's to the test in the field. For hundreds more reviews, visit our product pages."
        />

        {/* FAQ Section */}
        {content.faq && <FAQSection faq={content.faq} />}
        
        {/* Final CTA */}
        {content.conclusion && (
          <section className="section-md" style={{ background: '#2d5a3d' }}>
            <div className="section-container text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {content.footer.finalCTA.headline}
              </h2>
              <a
                href={content.footer.finalCTA.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition"
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
const rootElement = document.getElementById('root');
if (rootElement && !rootElement.hasAttribute('data-react-root')) {
  rootElement.setAttribute('data-react-root', 'true');
  const root = createRoot(rootElement);
  root.render(<App />);
}