/**
 * Odin's Innovations - Synthetic Scent Beads - Generated from template-microsite
 * Generated at: 2026-04-24T21:20:14.582Z
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
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":0,"s":0,"l":10},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How SCENT BEADS WORK","description":""},"headline":"How SCENT BEADS WORK","body":"Plant-based beads absorb the synthetic scent and release it gradually when exposed to air. Set it once. Check your trail camera for weeks—no reapplication needed.","video":"https://youtu.be/mRcfYfploNg","videoHeadline":"See It In Action"},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"shield","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"Become a Dealer","href":"https://www.odinsinnovations.com/pages/become-a-dealer"},{"label":"Testimonials","href":"https://www.odinsinnovations.com/pages/testimonials"},{"label":"News","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['doe-estrus-guide'] || '2026';

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
        
        {/* Section 5: Wins On (dark - citronella style) */}
        {content['wins'] && (
          <section id="wins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
                {content['wins'].headline}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content['wins'].items.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      {item.icon === 'long-lasting' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="2.5" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {item.icon === 'flask' && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      )}
                      {item.icon === '50-states' && (
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
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.title}</h3>
                    <p className="font-body text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {/* Section 6: How It Works */}
        {content['how-it-works'] ? <HowItWorksSection howItWorks={content['how-it-works']} /> : <HowItWorksSection />}
        
        {/* Section 7: The Odin's Difference + CTA */}
        {content['the-odins-difference'] ? <DifferenceSection difference={content['the-odins-difference']} /> : <DifferenceSection />}
        
        {/* CTA: See Why Hunters Choose Synthetic */}
        <div className="pb-8 text-center" style={{ background: '#333333' }}>
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
        
        {/* Section 8: Reviews (light gray) */}
        <section id="reviews" className="py-16" style={{ background: '#f8f9fa' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">What Hunters Are Saying</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Real results from hunters who put Odin's to the test in the field.
            </p>
            <div id="stamped-main-widget" className="stamped-main-widget" data-widget-type="full-page" data-product-ids="" data-fill-empty="false" data-per-page="10"></div>
            <script async type="text/javascript" src="https://cdn.stamped.io/widget.js"></script>
          </div>
        </section>

        {/* Section 9: FAQ */}
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
