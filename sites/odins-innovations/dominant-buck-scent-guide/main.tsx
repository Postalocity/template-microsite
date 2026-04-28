/**
 * Dominant Buck Scent Guide - Generated from template-microsite
 * Generated at: 2026-04-28T13:39:38.254Z
 * Brand: Odin's Innovations - Dominant Buck Scent Guide
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, TrustBadgesSection, HowItWorksSection, ProductsSection, WhyOdinsSection, WhenToUseSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"title":"How Dominant Buck Scent Works","body":"Whitetail bucks communicate territorial boundaries through scent marking at scrapes, rubs, and travel corridors. Odin's Dominant Buck Scent replicates the pheromone signature of a mature buck using a proprietary library of 21 synthetic formulations. The result is a consistent aromatic profile that hunters deploy to simulate the presence of an intruding buck. Because the formula is manufactured to precise molecular specification, every application delivers the same scent concentration — unlike natural urine that varies with the donor animal's age, health, diet, and hormonal state."},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":{"title":"Hunter Results","quotes":[{"text":"Observed increased scrape activity over three weeks with the beads still releasing scent after multiple rain events.","author":"Mallory A., Kansas"},{"text":"Daily buck visits on trail cam throughout October and November using Dominant Buck + Scrape Blend.","author":"Randy & Tony, Michigan"},{"text":"Powerful, season-long scent that maintained integrity without daily reapplication.","author":"Grant Meyer"}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['dominant-buck-scent-guide'] || 'HUNT2026';

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

        {/* Section 1: Benefits */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />

        {/* Section 2: How It Works */}
        <HowItWorksSection howItWorks={{
          headline: content.howItWorks.title,
          body: content.howItWorks.body
        }} />

        {/* Section 3: When To Use */}
        <WhenToUseSection content={{
          headline: content.whenToUse.title,
          body: '',
          seasons: content.whenToUse.items.map((item, idx) => {
            const parts = item.split(': ');
            const name = parts[0].trim();
            const description = parts.slice(1).join(': ').trim();
            const monthsMatch = name.match(/\(([^)]+)\)/);
            return {
              name: name.replace(/\s*\([^)]*\)/, '').trim(),
              months: monthsMatch ? monthsMatch[1] : '',
              description: description
            };
          })
        }} />

        {/* Section 4: Deployment */}
        <section id="deployment" className="section-padding" style={{ background: '#1a1d29' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
              {content.deployment.title}
            </h2>
            <div className="max-w-3xl mx-auto">
              <ol className="space-y-6">
                {content.deployment.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                      {idx + 1}
                    </span>
                    <p className="font-body text-base text-gray-300 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              {content.deployment.note && (
                <p className="mt-8 font-body text-sm text-gray-400 italic border-l-2 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                  {content.deployment.note}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 5: Why Odin's */}
        <WhyOdinsSection content={{
          headline: content.whyOdins.title,
          body: content.whyOdins.body
        }} />

        {/* Section 6: Effectiveness */}
        <section id="effectiveness" className="section-padding" style={{ background: 'hsl(30, 20%, 95%)' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-center" style={{ color: 'hsl(var(--foreground))' }}>
              {content.effectiveness.title}
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
              {content.effectiveness.body}
            </p>
          </div>
        </section>

        {/* Section 7: Products */}
        <div style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>

        {/* Section 8: Comparison */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}

        {/* Section 9: Trust Badges */}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}

        {/* Section 10: FAQ */}
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
