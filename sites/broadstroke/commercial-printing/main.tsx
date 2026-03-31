/**
 * Commercial Printing — Broadstroke, Inc. - Generated from template-microsite
 * Generated at: 2026-03-31T20:13:36.905Z
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
const brandConfig = {"id":"broadstroke","name":"Broadstroke","slug":"broadstroke","domain":"broadstrokeinc.com","tagline":"Your One-Stop-Shop for Print, Mail & Promo","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://prod.postalocity.com/login.html","website":"https://www.broadstrokeinc.com","blog":"https://broadstrokeinc.com/about/blogs/","howWeHelp":"https://broadstrokeinc.com/","whoWeServe":"https://broadstrokeinc.com/about/","contact":"https://broadstrokeinc.com/contact/","faq":"https://broadstrokeinc.com/resources/"},"logo":{"filename":"logo.png","darkFilename":"logo-dark.png","alt":"Broadstroke - Print, Mail, Promo"},"colors":{"primary":{"h":200,"s":80,"l":40},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"Commercial Printing Workflow","description":"Broadstroke, Inc. makes commercial printing straightforward through a concierge-managed workflow supported by more than 70 years of experience."},"steps":[{"number":"1","title":"Plan","description":"Share your project goals, files, or ideas. We'll recommend the best paper, quantities, and finishing options for your objectives."},{"number":"2","title":"Produce","description":"We refine your designs, provide proofs for approval, then print and finish everything in-house (folding, scoring, binding)."},{"number":"3","title":"Deliver","description":"Pickup, local delivery, or seamless mailing through Postalocity with address verification and USPS submission. We handle the logistics."}]},"difference":{"section":{"title":"The Broadstroke Difference","description":"Businesses throughout Wichita and Kansas trust Broadstroke for commercial printing because we deliver more than just printed materials — we provide a true one-stop concierge solution for print, mail, and promo."},"differences":[{"icon":"package","title":"Integrated Print-to-Mail Capability","description":"When your project includes mailing, we handle printing, folding, stuffing into real envelopes, sealing, and preparation for USPS submission through our high-speed digital commercial printers and inserters — all managed by one experienced team."},{"icon":"zap","title":"Operational Efficiency","description":"Eliminate the need to manage multiple suppliers for design, printing, finishing, and mailing. One point of contact oversees the entire process, supporting consistent brand presentation and smoother workflows."},{"icon":"shield","title":"Proven Local Expertise","description":"Serving the region since 1979 with more than 70 years of innovation in printing and mail services, Broadstroke combines traditional craftsmanship with modern automation to meet the needs of ad agencies, municipalities, healthcare, financial institutions, and other organizations."}]},"testimonials":[{"quote":"It looks professional. It saves me time. It saves me money. All while helping me get paid quicker.","attribution":"Postalocity Business Client"},{"quote":"Your team is the best I've ever worked with. Thanks for everything you do.","attribution":"CD"},{"quote":"Thank you for getting the materials done for us so quickly. It was a huge help to keep us on track.","attribution":"Steven Shippy"},{"quote":"Just wanted to let you know I received our forms yesterday and our new tickets today. Everything looks fantastic. Thank you for taking good care of us.","attribution":"JB"},{"quote":"I just want to let you know how incredibly pleased we are with the rack card you designed and printed for us. Thank you very much for all of your help.","attribution":"Terry Rogers"},{"quote":"You are a blast to work with even when we throw some crazy projects with even crazier deadlines your way. We truly appreciate all of your hard work.","attribution":"C Hoberecht"}],"trustSignals":["70+ Years Combined Experience","NCOA Verified","CASS Certified","ISO 9001 Documented Processes"],"footer":{"tagline":"Your One-Stop-Shop for Print, Mail & Promo","taglineSecondary":"No project is too big or too small","links":[{"label":"Printing","href":"https://broadstrokeinc.com/printing/"},{"label":"Mailing","href":"https://broadstrokeinc.com/mailing/"},{"label":"Promo","href":"https://www.broadstrokepromos.com/"},{"label":"Contact","href":"https://broadstrokeinc.com/contact/"}]}};
const contactConfig = {"phone":"316-262-3333","email":"info@broadstrokeinc.com","address":{"street":"820 W 2nd St N","city":"Wichita","state":"KS","zip":"67203"},"hours":{"weekdays":"8:00 AM - 5:00 PM CST","support":"info@broadstrokeinc.com"}};
const socialConfig = {"linkedin":"https://www.linkedin.com/company/broadstrokeinc","facebook":"https://www.facebook.com/Broadstrokeinc","instagram":"https://www.instagram.com/broadstrokeinc","tiktok":"https://www.tiktok.com/@broadstrokeinc","pinterest":"https://www.pinterest.com/broadstrokeinc/","youtube":"https://www.youtube.com/channel/UCd7KyDkDwi9hsA1ozODFQQQ"};

// IKB configuration
const ikbConfig = {
  rules: {
    trustSignals: [
      'Made in the USA',
      '50 State Legal',
      'Field Tested',
      '30+ Day Scent',
      'Weatherproof',
      'Biodegradable',
    ],
    promoCodes: {
      'credit-repair': 'cr2026',
      'debt-collection': 'debt2026',
      'healthcare-billing': 'hb2026',
      'healthcare-mailing-services': 'hm2026',
      'postcard': 'pc2026',
      'self-storage': 'pm2026',
      'commercial-printing': 'HUNT2026',
    },
    approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'pricing', 'testimonials'],
    blocklistedContent: ['video', 'live-chat', 'team', 'experts', 'award', 'awards'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading', 'guaranteed delivery', '100% accurate'],
  },
  pricing: {
    basePrice: 17.95,
    currency: 'USD',
    units: 'bottle',
    addOns: {},
  },
  proofOptions: {
    standard: [],
    upgrades: [],
  },
  terminology: {
    mailClasses: {},
    certifications: {},
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
        <BenefitsSection benefits={content.benefits} />
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.comparison && <ComparisonTable comparison={content.comparison} />}
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
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');
const root = createRoot(rootElement);
root.render(<App />);
