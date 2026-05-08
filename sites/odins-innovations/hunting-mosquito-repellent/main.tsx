/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      hunting-mosquito-repellent
 * Brand:     Odin's Innovations
 * Generated: 2026-05-08T15:14:12.605Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/hunting-mosquito-repellent.json
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
import { useState } from 'react';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How Citronella Liquid & Beads Work — Sustained Release Technology","description":""},"headline":"How Citronella Liquid & Beads Work — Sustained Release Technology","body":"The proprietary blend of citronellal, geraniol, and other plant-derived compounds masks chemical cues rather than relying on direct kill or rapid evaporation. The oil-based liquid adheres to foliage for immediate rainproof barrier performance. The complementary beads use the same biodegradable polymer technology as Odin's hunting scent products to encapsulate compounds for controlled diffusion. This delivers sustained, hands-free protection for the equivalent of 30 days of continuous exposure — not 30 minutes."},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"hunting-mosquito-repellent":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['citronella'] || ikbConfig.rules?.promoCodes?.['citronella-mosquito-repellent'] || 'HUNT2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  const [zoomImage, setZoomImage] = useState<string | null>(null);
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
        
        {/* Section 1: Introduction - LIGHT BACKGROUND */}
        {content.introduction && (
          <section className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.introduction.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.introduction.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.introduction.features?.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      {feature.icon === 'bug' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 014 4v2a4 4 0 00-2.22 3.58L8 12v6h8v2H8m4-14a1 1 0 11-2 0 1 1 0 012 0zm-4 18a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      )}
                      {feature.icon === 'leaf' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2 2 .9 2 2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
                        </svg>
                      )}
                      {feature.icon === 'clock' && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="#2d5a3d" strokeWidth="3" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {feature.icon === 'shield-check' && (
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#2d5a3d" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{feature.title}</h3>
                    <p className="font-body text-sm" style={{ color: '#666' }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 2: Why Odin's - DARK BACKGROUND */}
        {content['why-odins'] && (
          <section className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content['why-odins'].headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content['why-odins'].subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content['why-odins'].items?.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      {item.toLowerCase().includes('rain') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l.62-.62a9 9 0 1112.76 0l.62.62M12 22V12m0 0l-4-4m4 4l4-4" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('co2') || item.toLowerCase().includes('mask') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-4a4 4 0 00-4-4H7a4 4 0 00-4 4v4z" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('duration') || item.toLowerCase().includes('30') && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12">
                          <circle cx="60.82" cy="54.12" r="4.26"/>
                          <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
                          <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
                        </svg>
                      )}
                      {item.toLowerCase().includes('plant') && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2 2 .9 2 2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
                        </svg>
                      )}
                      {item.toLowerCase().includes('legal') || item.toLowerCase().includes('state') && (
                        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
                          <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1"/>
                          <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
                          <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2"/>
                          <circle cx="22" cy="32" r="2" fill="currentColor"/>
                          <circle cx="30" cy="32" r="2" fill="currentColor"/>
                          <circle cx="38" cy="32" r="2" fill="currentColor"/>
                          <circle cx="26" cy="38" r="2" fill="currentColor"/>
                          <circle cx="34" cy="38" r="2" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.split('—')[0]}</h3>
                    <p className="font-body text-sm text-gray-400">{item.split('—').slice(1).join('—')}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 10: Detection Process - LIGHT BACKGROUND */}
        {content.detection && (
          <section className="section-padding" style={{ background: '#fff' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.detection.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Section 10: Application Guide - DARK BACKGROUND */}
        {content.application && (
          <section className="section-padding" style={{ background: '#242835' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.application.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content.application.note}
                </p>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {content.application.steps?.map((step, i) => (
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
        )}
        
        {/* Section 10: Hunting Blinds - LIGHT BACKGROUND */}
        {content.blinds && (
          <section className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.blinds.headline}
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.blinds.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Section 10: Layered Strategy - DARK BACKGROUND */}
        {content.layered && (
          <section className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto text-gray-400">
                  {content.layered.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {/* Trust Badges */}
        <TrustBadgesSection 
          trustSignals={[
            { text: 'EPA-Registered Biopesticide', icon: 'shield-check' },
            { text: 'Made in USA', icon: 'flag' },
            { text: 'Legal in All 50 States', icon: '50-states' },
          ]}
        />
        
        {/* Stamped.io Reviews */}
        <StampedReviewsSection 
          title={content.reviews?.title}
          subtitle={content.reviews?.subtitle}
          description={content.reviews?.description}
        />
        
        {/* Comparison Table */}
        {content.comparison && (
          <section id="comparison" className="py-20" style={{ background: '#f8f9fa' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" style={{ color: '#1a1a1a' }}>{content.comparison.headline}</h2>
              <ComparisonTable comparison={content.comparison} promoCode={promoCode} />
            </div>
          </section>
        )}
        
        {/* FAQ */}
        {content.faq && <FAQSection faq={content.faq} />}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
