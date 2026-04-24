/**
 * Odin's Innovations - Synthetic Scent Beads - Generated from template-microsite
 * Generated at: 2026-04-24T19:02:00.483Z
 * Brand: Odin's Innovations
 */

import { createRoot } from 'react-dom/client';
import { Bug, Leaf, Clock, Check } from 'lucide-react';
import { HeroSection, FAQSection, ComparisonTable, TrustBadgesSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":0,"s":0,"l":10},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How SCENT BEADS WORK","description":""},"headline":"How SCENT BEADS WORK","body":"Plant-based beads absorb the synthetic scent and release it gradually when exposed to air. Set it once. Check your trail camera for weeks—no reapplication needed.","video":"https://youtu.be/mRcfYfploNg","videoHeadline":"See It In Action"},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"shield","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"Become a Dealer","href":"https://www.odinsinnovations.com/pages/become-a-dealer"},{"label":"Testimonials","href":"https://www.odinsinnovations.com/pages/testimonials"},{"label":"News","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com"};

// IKB configuration with promo codes - dynamic based on site
const ikbConfig = {"rules":{"trustSignals":["EPA-Registered Biopesticide","Made in USA","Legal in All 50 States"],"promoCodes":{"hunting-mosquito-repellent":"HUNT2026","citronella-mosquito-repellent":"HUNT2026"},"approvedSections":["hero","features","introduction","why-odins","detection","application","blinds","layered","turkey","comparison","howItWorks","faq","footer","trustSignals"],"blocklistedContent":["testimonial","testimonials","video","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};

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
        
        {/* Features Section */}
        {content.features && (
          <section id="features" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.features.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.features.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {content.features.features?.map((feature: {title: string; description: string; icon?: string}, idx: number) => {
                  // Map feature titles to Lucide icons (matching live site)
                  const iconMap: Record<string, React.ElementType> = {
                    'Peak Season Protection': Bug,  // Uses bug icon, not shield
                    'Scent-Safe Formula': Leaf,
                    'Long-Lasting Barrier': Clock,
                    'EPA-Registered': Check,
                  };
                  const IconComponent = iconMap[feature.title] || Check;
                  return (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ color: '#2d5a3d' }}>
                        <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm" style={{ color: '#666' }}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        
        {/* Dynamic content sections - only render if data exists */}
        {content.introduction && (
          <section id="introduction" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center max-w-3xl mx-auto">
                <p className="font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.introduction.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content['why-odins'] && (
          <section id="why-odins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content['why-odins'].headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content['why-odins'].items?.map((item: string, idx: number) => (
                  <div key={idx} className="p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="font-body text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.detection && (
          <section id="detection" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding the three-stage targeting process
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {['CO₂ Detection', 'Skin Chemistry', 'Body Heat'].map((stage, idx) => (
                  <div key={idx} className="text-center p-6">
                    <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--primary))' }}>
                      STAGE {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2">{stage}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.application && (
          <section id="application" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.application.headline}
                </h2>
                {content.application.note && (
                  <p className="font-body text-sm text-gray-400 italic">{content.application.note}</p>
                )}
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {content.application.steps?.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0" style={{ background: 'hsl(var(--primary))', color: 'white' }}>
                      {idx + 1}
                    </div>
                    <p className="font-body text-white text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.blinds && (
          <section id="blinds" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.blinds.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.blinds.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.layered && (
          <section id="layered" className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Weatherproof Formula', 'Polymer Technology', 'Easy Storage'].map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.turkey && (
          <section id="turkey" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.turkey.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.turkey.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {content.howItWorks && (
          <section id="how-it-works" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.howItWorks.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.howItWorks.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.faq && <FAQSection faq={content.faq} />}
        
        {content.footer?.finalCTA && (
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
