/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      hunting-mosquito-repellent
 * Brand:     Odin's Innovations
 * Generated: 2026-06-08T20:26:10.639Z
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
import { HeroSection, FAQSection, ComparisonTable, OdinsIcon, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How Citronella Liquid & Beads Work — Sustained Release Technology [ODINS021-EDITED]","description":""},"headline":"How Citronella Liquid & Beads Work — Sustained Release Technology [ODINS021-EDITED]","body":"The proprietary blend of citronellal, geraniol, and other plant-derived compounds masks chemical cues rather than relying on direct kill or rapid evaporation. The oil-based liquid adheres to foliage for immediate rainproof barrier performance. The complementary beads use the same biodegradable polymer technology as Odin's hunting scent products to encapsulate compounds for controlled diffusion. This delivers sustained, hands-free protection for the equivalent of 30 days of continuous exposure — not 30 minutes."},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"hunting-mosquito-repellent":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['citronella'] || ikbConfig.rules?.promoCodes?.['citronella-mosquito-repellent'] || 'HUNT2026';

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
        
        {/* Section 1: Mosquito Control intro — matches live #how-it-works */}
        {content.introduction && (
          <section id="how-it-works" className="section-padding" style={{ background: '#f8f9fa' }}>
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
                      <OdinsIcon icon={feature.icon} alt={feature.title} variant="light" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{feature.title}</h3>
                    <p className="font-body text-sm" style={{ color: '#666' }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 2: Why Odin's */}
        {content['why-odins'] && (
          <section id="why-odins" className="section-padding" style={{ background: '#1a1d29' }}>
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
                {content['why-odins'].cards?.map((card, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      <OdinsIcon icon={card.icon} image={card.image} alt={card.title} variant="dark" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{card.title}</h3>
                    <p className="font-body text-sm text-gray-400">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 3: Detection Process */}
        {content.detection && (
          <section id="detection" className="section-padding" style={{ background: '#fff' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.detection.subtitle || 'Understanding the three-stage targeting process'}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {content.detection.cards?.map((card, idx) => (
                  <div key={idx} className="text-center p-6" style={{ borderTop: '4px solid #2d5a3d' }}>
                    {card.stage && (
                      <div className="text-sm font-bold mb-2 text-green-700">STAGE {card.stage}</div>
                    )}
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <OdinsIcon icon={card.icon} alt={card.title} variant="light" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{card.title}</h3>
                    <p className="font-body text-sm" style={{ color: '#666' }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 5: Application Guide - DARK BACKGROUND */}
        {content.application && (
          <section id="application" className="section-padding" style={{ background: '#242835' }}>
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
        
        {/* Section 6: Hunting Blinds - LIGHT BACKGROUND */}
        {content.blinds && (
          <section id="blinds" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.blinds.headline}
                </h2>
              </div>
              <div className="max-w-3xl mx-auto mb-12">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <p className="font-body text-base text-center leading-relaxed" style={{ color: '#444' }}>
                    {content.blinds.body}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content.blinds.cards?.map((card, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <OdinsIcon icon={card.icon} image={card.image} alt={card.title} variant="light" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>{card.title}</h3>
                    <p className="font-body text-sm" style={{ color: '#666' }}>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Section 6: Layered Strategy */}
        {content.layered && (
          <section id="layered" className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
                {content.layered.subtitle && (
                  <p className="font-display text-lg uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    {content.layered.subtitle}
                  </p>
                )}
                <div className="max-w-3xl mx-auto rounded-lg p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <p className="font-body text-base leading-relaxed" style={{ color: '#ccc' }}>
                    {content.layered.body}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content.layered.cards?.map((card, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      <OdinsIcon icon={card.icon} image={card.image} alt={card.title} variant="dark" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{card.title}</h3>
                    <p className="font-body text-sm text-gray-400">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Comparison Table */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {/* Stamped product reviews */}
        <StampedReviewsSection
          title={content.reviews?.stamped?.title || content.reviews?.title || 'What Hunters Are Saying'}
          subtitle={content.reviews?.stamped?.subtitle || 'Verified Buyers'}
          description={content.reviews?.stamped?.description || content.reviews?.description || "Real results from hunters and outdoors enthusiasts who trust Odin's citronella protection."}
        />
        
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
