/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      doe-estrus-guide
 * Brand:     Odin's Innovations
 * Generated: 2026-05-05T15:59:42.881Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/doe-estrus-guide.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/odins-innovations/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
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
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":0,"s":0,"l":10},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How SCENT BEADS WORK","description":""},"headline":"How SCENT BEADS WORK","body":"Plant-based beads absorb the synthetic scent and release it gradually when exposed to air. Set it once. Check your trail camera for weeks—no reapplication needed.","video":"https://youtu.be/mRcfYfploNg","videoHeadline":"See It In Action"},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"doe-estrus-guide":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":17.95,"currency":"USD","units":"bottle"}};

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
        
        {/* Section 1: When to Use */}
        {content['when-to-use'] && (
          <section id="when-to-use" className="py-20" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-center" style={{ color: 'hsl(var(--foreground))' }}>
                {content['when-to-use'].headline}
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed whitespace-pre-wrap">
                {content['when-to-use'].body}
              </p>
            </div>
          </section>
        )}
        
        {/* Section 2: Why Synthetic (light) */}
        {content['the-difference'] && <WhyOdinsSection content={content['the-difference']} />}
        
        {/* Section 3: Products (dark) */}
        <div style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>
        
        {/* Section 4: Signature Scents (light) */}
        <SignatureScentBeadsSection content={content.signatureScents} />
        
        {/* Section 5: Benefits (warm sand) */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />
        
        {/* Section 6: Wins On (dark - citronella style) */}
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
        
        {content.comparison && (
          <section id="comparison" className="py-20" style={{ background: '#f8f9fa' }}>
            <ComparisonTable comparison={content.comparison} promoCode={promoCode} />
          </section>
        )}
        
        {/* Section 7: How to Use */}
        {content['how-to-use'] && (
          <section id="how-to-use" className="py-20" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-center" style={{ color: 'hsl(var(--foreground))' }}>
                {content['how-to-use'].headline}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-display text-2xl uppercase mb-4" style={{ color: 'hsl(var(--primary))' }}>Scent Beads</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{content['how-to-use'].beads}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-display text-2xl uppercase mb-4" style={{ color: 'hsl(var(--primary))' }}>Liquid Formula</h3>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{content['how-to-use'].liquid}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Section 8: How It Works */}
        {content['how-it-works'] ? <HowItWorksSection howItWorks={content['how-it-works']} /> : <HowItWorksSection />}
        
        {/* Section 9: The Odin's Difference + CTA */}
        {content['the-odins-difference'] ? <DifferenceSection difference={content['the-odins-difference']} /> : <DifferenceSection />}
        
        {/* CTA: See Why Hunters Choose Synthetic */}
        <div className="pb-8 text-center" style={{ background: '#333333' }}>
          <a 
            href="https://www.archerybusiness.com/the-evolution-of-deer-attractants-why-synthetic-scents-are-redefining-the-category"
            target="_blank"
            rel="noopener noreferrer"
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
        
        {/* Section 10: Reviews - Success Stories from the Field */}
        <section id="reviews" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Success Stories from the Field</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Real results from hunters who trust Odin's synthetic scents.</p>
            </div>
            <div id="stamped-reviews-widget" data-widget-type="full-page" data-take="10" data-per-page="10" data-product-brand="Odin's Innovations"></div>
            <style dangerouslySetInnerHTML={{__html: `
              .stamped-widget-buttons,
              .stamped-full-page-tabs {
                display: none !important;
              }
            `}} />
          </div>
        </section>

        {/* Section 11: FAQ */}
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
