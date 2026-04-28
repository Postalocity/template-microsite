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
    url: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png",
    faviconUrl: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553",
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
  },
  footer: {
    tagline: "Synthetic. Long-Lasting. Legal Everywhere.",
    description: "100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.",
    links: [
      { label: "Scent Beads", href: "https://www.odinsinnovations.com/collections/scent-beads" },
      { label: "Liquid Scents", href: "https://www.odinsinnovations.com/collections/liquid-scents" },
      { label: "Hunter's Kloak", href: "https://www.odinsinnovations.com/collections/all-hunters-kloak" },
      { label: "Find a Dealer", href: "https://www.odinsinnovations.com/pages/find-a-dealer" }
    ],
    companyLinks: [
      { label: "About Us", href: "https://www.odinsinnovations.com/pages/about-us" },
      { label: "Press Releases", href: "https://www.odinsinnovations.com/blogs/press-releases" },
      { label: "Field Test Reports", href: "https://www.odinsinnovations.com/blogs/field-test-reports" },
      { label: "Industry Publications", href: "https://www.odinsinnovations.com/blogs/in-the-field" }
    ],
    supportLinks: [
      { label: "Odin's Instructions", href: "https://www.odinsinnovations.com/pages/odins-instructions" },
      { label: "Kloak Mister Instructions", href: "https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions" },
      { label: "Rut Rouser Instructions", href: "https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions" },
      { label: "Hunter's Kloak FAQ", href: "https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs" },
      { label: "Contact Us", href: "https://www.odinsinnovations.com/pages/contact-us" },
      { label: "Return/Exchange Policy", href: "https://www.odinsinnovations.com/pages/return-exchange-policy" }
    ],
    logoSize: "extra-large"
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
const WhyOdinsSection = ({ content }: { content: any }) => {
  const cards = content?.cards;
  return (
  <section className="section-padding" style={{ background: '#1a1d29' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
          {content?.headline || "Why Choose Odin's"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
          {content?.subtitle || "Professional performance standards for serious hunters"}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(cards || []).map((card: any, idx: number) => (
          <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-14 h-14 object-contain" loading="lazy" />
              ) : (<>
                {card.icon === 'droplets' && <Droplets className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
                {card.icon === 'wind' && <Wind className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
                {card.icon === 'clock' && <IconLongLastingWhite />}
                {card.icon === 'leaf' && <Leaf className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
                {card.icon === '50-states' && <Icon50StatesWhite />}
                {card.icon === 'shield-check' && <ShieldCheck className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
              </>)}
            </div>
            <h3 className="font-display text-xl uppercase mb-2 text-white">{card.title}</h3>
            <p className="font-body text-sm text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

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
const BlindsSection = ({ content }: { content: any }) => {
  const cards = content?.cards;
  return (
  <section className="section-padding" style={{ background: '#f5f5f5' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
          {content?.headline || "Citronella in Hunting Blinds"}
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {(cards || []).map((card: any, idx: number) => (
          <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-14 h-14 object-contain" loading="lazy" />
              ) : (<>
                {card.icon === 'cloud' && <Cloud className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />}
                {card.icon === 'clock' && <Clock className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />}
                {card.icon === 'check-circle' && <CheckCircle className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />}
              </>)}
            </div>
            <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{card.title}</h3>
            <p className="font-body text-sm" style={{ color: '#666' }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

// Section 6: Layered Strategy - DARK BACKGROUND
const LayeredSection = ({ content }: { content: any }) => {
  const cards = content?.cards;
  return (
  <section className="section-padding" style={{ background: '#1e212b' }}>
    <div className="section-container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
          {content?.headline || "Layered Strategy"}
        </h2>
        <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
          {content?.subtitle || "Maximum protection with liquid and beads combined"}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {(cards || []).map((card: any, idx: number) => (
          <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-14 h-14 object-contain" loading="lazy" />
              ) : (<>
                {card.icon === 'droplets' && <Droplets className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
                {card.icon === 'leaf' && <Leaf className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
                {card.icon === 'package' && <Package className="w-10 h-10 text-green-400" strokeWidth={1.5} />}
              </>)}
            </div>
            <h3 className="font-display text-xl uppercase mb-2 text-white">{card.title}</h3>
            <p className="font-body text-sm text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
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
        
        {/* Stamped.io Reviews - What Hunters Are Saying */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">What Hunters Are Saying</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Real results from hunters who put Odin's to the test in the field.</p>
            </div>
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-product-brand="Odin's Innovations"></div>
            <style dangerouslySetInnerHTML={{__html: `
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            `}} />
          </div>
        </section>

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