/**
 * Credit Repair Mailing Service - Generated from template-microsite
 * Generated at: 2026-04-01T16:17:36.343Z
 * Brand: Postalocity
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
const brandConfig = {"id":"postalocity","name":"Postalocity","slug":"postalocity","domain":"postalocity.com","tagline":"Automate Your Direct Mail","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://prod.postalocity.com/login.html","website":"https://www.postalocity.com","blog":"https://www.postalocity.com/resources/blog/","howWeHelp":"https://www.postalocity.com/how-we-help/","whoWeServe":"https://www.postalocity.com/who-we-serve/","contact":"https://www.postalocity.com/contact/","faq":"https://www.postalocity.com/resources/faq/"},"logo":{"filename":"postalocity-logo.png","alt":"Postalocity - Direct Mail Automation"},"colors":{"primary":{"h":38,"s":92,"l":55},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works","description":"Four simple steps from upload to mailing"},"steps":[{"number":"1","title":"Upload Your PDFs","description":"Drag-and-drop your documents into our secure dashboard. Same-day or next-day mailing available."},{"number":"2","title":"Address Verification","description":"NCOA/CASS verification updates addresses before mailing, reducing returned letters by 40%."},{"number":"3","title":"We Print & Process","description":"Professional printing, folding, stuffing into envelopes, and sealing—all automated."},{"number":"4","title":"USPS Mailing & Tracking","description":"Same-day or next-day mailing. Track Priority and Certified letters through delivery."}]},"difference":{"section":{"title":"The Postalocity Difference","description":"Discover why businesses trust our mailing service"},"differences":[{"icon":"mail","title":"Every Mailer Includes an Envelope","description":"We use real envelopes—not loose paper sealed with a sticker. Every statement is professionally printed, folded, stuffed into an envelope, sealed, and mailed."},{"icon":"eye","title":"Mail Visibility","description":"Tracking available on Priority Mail and Certified Mail. First-Class Mail (standard) does not include tracking. Signature tracking on Certified Mail available for additional fee."},{"icon":"zap","title":"Skip USPS Drop Boxes & Cutoffs","description":"Bypass post office drop-off times and waiting in line. We automate the process—eliminating missed cutoffs and potentially days in delivery time."}]},"footer":{"tagline":"Automate Your Direct Mail","links":[{"label":"Services","href":"https://www.postalocity.com/how-we-help/"},{"label":"Pricing","href":"https://www.postalocity.com/pricing/"},{"label":"Resources","href":"https://www.postalocity.com/resources/"},{"label":"Contact","href":"https://www.postalocity.com/contact/"}]}};
const contactConfig = {"phone":"316-260-2220","email":"contact@postalocity.com","address":{"street":"820 W 2nd St N","city":"Wichita","state":"KS","zip":"67203"},"hours":{"weekdays":"8:00 AM - 5:00 PM CST","support":"contact@postalocity.com"}};
const socialConfig = {"twitter":"https://twitter.com/postalocity","linkedin":"https://linkedin.com/company/postalocity","facebook":"https://facebook.com/postalocity"};

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

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['credit-repair'] || '2026';

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
        <TestimonialsSection />
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
