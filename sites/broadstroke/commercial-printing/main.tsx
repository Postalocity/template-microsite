/**
 * Commercial Printing — Broadstroke, Inc. - Generated from template-microsite
 * Generated at: 2026-04-02T20:41:01.362Z
 * Brand: Broadstroke
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
const brandConfig = {"id":"broadstroke","name":"Broadstroke","slug":"broadstroke","domain":"broadstrokeinc.com","tagline":"Your One-Stop-Shop for Print, Mail & Promo","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://prod.postalocity.com/login.html","website":"https://www.broadstrokeinc.com","blog":"https://broadstrokeinc.com/about/blogs/","howWeHelp":"https://broadstrokeinc.com/","whoWeServe":"https://broadstrokeinc.com/about/","contact":"https://broadstrokeinc.com/contact/","faq":"https://broadstrokeinc.com/resources/"},"logo":{"filename":"logo.png","darkFilename":"logo-dark.png","alt":"Broadstroke - Print, Mail, Promo"},"colors":{"primary":{"h":200,"s":80,"l":40},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"Commercial Printing Workflow","description":"Broadstroke, Inc. makes commercial printing straightforward through a concierge-managed workflow supported by more than 60 years of experience."},"steps":[{"number":"01","title":"Plan","description":"Share your project goals, files, or ideas. We'll recommend the best paper and finishing options for your objectives."},{"number":"02","title":"Produce","description":"We create or refine your designs, provide proofs for approval, then print and finish everything in-house (folding, scoring, binding)."},{"number":"03","title":"Deliver","description":"Pickup, local delivery, or shipping available. You tell us where you want your print job to go and how you want it to get there, and we'll handle the logistics to get your job to its final destination."}]},"difference":{"section":{"title":"The Broadstroke Difference","description":"Businesses in the Wichita area, Kansas, and nationwide trust Broadstroke for commercial printing because we deliver more than just printed materials — we provide a true one-stop concierge solution for print, mail, and promo."},"differences":[{"icon":"zap","title":"Operational Efficiency","description":"Eliminate the need to manage multiple vendors for design, printing, mailing, and promotions. Our team oversees marketing and business materials across multiple channels, supporting consistent brand presentation and smoother workflows for your business."},{"icon":"package","title":"Integrated Print-to-Mail Capability","description":"When your project includes mailing, it's handled as a single job with seamless workflow in-house. Whether it's a postcard, mailer, or mailing, every step of the process, including addressing and applying presort postage, is handled through our high-speed digital commercial printers and inserters, followed by distribution to USPS for delivery — all managed by one experienced team."},{"icon":"shield","title":"Proven Local Expertise","description":"Serving the region since 1964 with more than 60 years of innovation in printing and mail services, Broadstroke combines traditional craftsmanship with modern technology to provide concierge service that meets the needs of businesses of all sizes and across all industries, including small local businesses, non-profits, government entities, educational institutions, and established companies and corporations."}]},"testimonials":[{"quote":"We've had a great working relationship with Broadstroke for almost 30 years. Communication with them is always quick and easy, and they consistently produce our products on or before the requested deadlines. Their work quality is also exceptional. Highly recommend!","attribution":"Eric McCluer","title":"Owner","company":"Talent On Parade, LLC"}],"trustSignals":["60+ Years of Experience","Serving Wichita Since 1964","Full-Service Bindery","In-House Design Team"],"footer":{"tagline":"Your one-stop-shop for all things print, mail and promo.","taglineSecondary":"No project is too big or too small","links":[{"label":"Print","href":"https://broadstrokeinc.com/commercial-printing/"},{"label":"Mail","href":"https://broadstrokeinc.com/mailing/"},{"label":"Mail Pickup","href":"https://broadstrokeinc.com/mail-pickup/"},{"label":"Promo","href":"https://www.broadstrokepromos.com/"},{"label":"Wide Format","href":"https://broadstrokeinc.com/wide-format/"},{"label":"Postalocity","href":"https://www.postalocity.com/"},{"label":"Business Forms","href":"https://broadstrokeinc.com/business-forms/"},{"label":"Technology","href":"https://broadstrokeinc.com/technology/"}],"companyLinks":[{"label":"About","href":"https://broadstrokeinc.com/about/"},{"label":"Our Work","href":"https://broadstrokeinc.com/our-work/"},{"label":"Blog","href":"https://broadstrokeinc.com/about/blogs/"},{"label":"Careers","href":"https://broadstrokeinc.com/careers/"},{"label":"Contact","href":"https://broadstrokeinc.com/contact/"}]}};
const contactConfig = {"phone":"316-262-3333","email":"info@broadstrokeinc.com","address":{"street":"820 W 2nd St N","city":"Wichita","state":"KS","zip":"67203"},"hours":{"weekdays":"8:00 AM - 5:00 PM CST","support":"info@broadstrokeinc.com"}};
const socialConfig = {"linkedin":"https://www.linkedin.com/company/broadstrokeinc","facebook":"https://www.facebook.com/Broadstrokeinc","instagram":"https://www.instagram.com/broadstrokeinc","tiktok":"https://www.tiktok.com/@broadstrokeinc","pinterest":"https://www.pinterest.com/broadstrokeinc/","youtube":"https://www.youtube.com/channel/UCd7KyDkDwi9hsA1ozODFQQQ"};

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
const promoCode = ikbConfig.rules.promoCodes['commercial-printing'] || '2026';

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
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
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
