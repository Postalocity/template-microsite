/**
 * Doe Estrus Scent Beads - Generated from template-microsite
 * Generated at: 2026-04-06T19:26:01.527Z
 * Brand: Odin's Innovations
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, ProductsSection, SignatureScentBeadsSection, WhyOdinsSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":0,"s":0,"l":10},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works","description":"Simple deployment for extended results"},"steps":[{"number":"1","title":"Deploy the Beads","description":"Place a small amount of beads in mock scrapes, on drag lines, or around stands."},{"number":"2","title":"Natural Release","description":"The biodegradable polymer matrix releases lab-formulated attractants steadily for 30+ days."},{"number":"3","title":"Weatherproof Performance","description":"The formula resists washing away in rain and maintains effectiveness through temperature changes."},{"number":"4","title":"Consistent Results","description":"Lab-consistent results with no spoilage or freezing. Effective for deer, hogs, bears, and elk."}]},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"flag","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"stopwatch","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"Become a Dealer","href":"https://www.odinsinnovations.com/pages/become-a-dealer"},{"label":"Testimonials","href":"https://www.odinsinnovations.com/pages/testimonials"},{"label":"News","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com"};

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
const promoCode = ikbConfig.rules.promoCodes['doe-estrus-guide'] || '2026';

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
        
        {/* Section 1: Why Synthetic (light) */}
        {content['the-difference'] && <WhyOdinsSection content={content['the-difference']} />}
        
        {/* Section 2: Products (dark) */}
        <div style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>
        
        {/* Section 3: Signature Scents (light) */}
        <SignatureScentBeadsSection content={content.signatureScents} />
        
        {/* Section 4: Benefits (dark) */}
        <div style={{ background: '#1a1d29' }}>
          <BenefitsSection benefits={content.benefits} />
        </div>
        
        {/* Section 5: Wins On (light) */}
        {content['wins'] && (
          <section id="wins" className="py-20" style={{ background: '#f8f9fa' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content['wins'].headline}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content['wins'].items.map((item, idx) => (
                  <div key={idx} className="bg-muted/30 rounded-lg p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      {item.icon === 'long-lasting' && (
                        <img 
                          src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841" 
                          alt="Longest release duration"
                          className="w-12 h-12"
                        />
                      )}
                      {item.icon === 'flask' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {item.icon === '50-states' && (
                        <img 
                          src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-50-states.svg" 
                          alt="Legal in all 50 states"
                          className="w-12 h-12"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {/* Section 6: How It Works (dark) */}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        
        {/* Section 7: The Odin's Difference (already dark bg in component) + CTA */}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        
        {/* CTA: See Why Hunters Choose Synthetic */}
        <div className="pb-8 text-center" style={{ background: '#1a1d29' }}>
          <a 
            href="https://www.odinsinnovations.com/pages/benefits-of-synthetic-scents" 
            className="inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90 rounded"
            style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}
          >
            SEE WHY HUNTERS CHOOSE SYNTHETIC
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        
        {/* Section 8: Reviews (dark) */}
        <section id="reviews" className="py-16" style={{ background: '#1a1d29' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">What Hunters Are Saying</h2>
            <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-8">
              Real results from hunters who put Odin's to the test in the field.
            </p>
            {/* Stamped.io Widget */}
            <div id="stamped-main-widget" className="stamped-main-widget" data-widget-type="full-page" data-product-ids="" data-fill-empty="false" data-per-page="10"></div>
            <script async type="text/javascript" src="https://cdn.stamped.io/widget.js"></script>
          </div>
        </section>

        {/* Section 9: FAQ (light) */}
        <FAQSection faq={content.faq} />
        
        {/* Section 10: Newsletter (dark) */}
        <section id="newsletter" className="py-16" style={{ background: '#1a1d29' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Join Our Newsletter</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Join our newsletter for special member offers and announcements.
            </p>
            <a 
              href="https://www.odinsinnovations.com/pages/newsletter-signup" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Subscribe Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
