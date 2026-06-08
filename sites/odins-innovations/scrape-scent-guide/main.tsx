/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      citronella-mosquito-repellent
 * Brand:     Odin's Innovations
 * Generated: 2026-06-08T20:26:22.750Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/citronella-mosquito-repellent.json
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
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, TrustBadgesSection, WhyOdinsSection, ProductsSection, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"title":"How to Build an Effective Mock Scrape","steps":["Select a location along a natural travel corridor, field edge, or transition zone between bedding and feeding areas. Look for an overhanging limb (licking branch) 4–5 feet off the ground.","Clear a 3' x 3' area of leaves and debris down to bare soil beneath the licking branch.","Sprinkle 1–2 oz of Odin's Scrape Blend scent beads directly in the cleared area.","Apply Scrape Blend liquid to the licking branch itself — squirt it directly on the branch where a buck would make contact.","Set your trail camera 10–15 feet from the scrape, angled to capture the full scrape and licking branch."],"note":"The scent beads will work continuously for 30+ days regardless of weather. Unlike natural urine applied to a scrape (which washes away with the first rain), Odin's polymer beads are rain proof and continue releasing scent through rain, snow, and heavy dew."},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// Promo code (safe default to avoid parser issues with large inline objects)
const promoCode = '2026';
 
function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
    <IKBProvider>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={config} />
        <HeroSection hero={content.hero} />

        {/* Trust Badges */}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}

        {/* Section 1: Benefits */}
        <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />

        {/* Section 2: Why Odin's */}
        <WhyOdinsSection content={{
          headline: content.whyOdins.title,
          body: content.whyOdins.body,
          points: content.whyOdins.points
        }} />

        {/* Section 8: How It Works — with YouTube videos */}
        <section id="how-it-works" className="section-padding" style={{ background: '#1a1d29' }}>
          <div className="section-container">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
              {content.howItWorks.title}
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <ol className="space-y-6">
                    {content.howItWorks.steps.map((step: string, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                          {idx + 1}
                        </span>
                        <p className="font-body text-base text-gray-300 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                  {content.howItWorks.note && (
                    <p className="mt-8 font-body text-sm text-gray-400 italic border-l-2 pl-4" style={{ borderColor: 'hsl(var(--accent))' }}>
                      {content.howItWorks.note}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-6">
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/6cWlyOmc4Sc"
                      title="How to Build an Effective Mock Scrape with Odin's"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  {content.fieldTest && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/JK0IvPqJrN4"
                        title={content.fieldTest.subtitle || "Odin's Scrape Blend Field Test"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Rut Timing */}
        {content.rutTiming && (
          <section id="rut-timing" className="section-padding" style={{ background: 'hsl(var(--muted))' }}>
            <div className="section-container">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider" style={{ background: 'hsl(var(--accent) / 0.2)', color: 'hsl(var(--accent))', clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                    Seasonal Guide
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                    {content.rutTiming.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {content.rutTiming.phases.map((phase: { phase: string; months: string; description: string }, idx: number) => {
                    const colors = ['hsl(35, 70%, 50%)', 'hsl(var(--secondary))', 'hsl(var(--primary))'];
                    return (
                      <div key={idx} className="relative overflow-hidden" style={{ background: 'white', borderTop: `4px solid ${colors[idx]}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <div className="flex flex-col items-center justify-center py-6" style={{ background: `${colors[idx]}15` }}>
                          <span className="font-display text-2xl font-bold uppercase mb-1" style={{ color: colors[idx] }}>{phase.phase}</span>
                          <span className="font-body text-sm font-semibold uppercase tracking-wider" style={{ color: colors[idx], opacity: 0.7 }}>{phase.months}</span>
                        </div>
                        <div className="p-5">
                          <p className="font-body text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: phase.description }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 10: Effectiveness — with proof image */}
        {content.effectiveness && (
          <section id="effectiveness" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-center text-white">
                {content.effectiveness.title}
              </h2>
              <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
                <div className="flex-1">
                  <p className="font-body text-lg text-gray-300 leading-relaxed">
                    {content.effectiveness.body}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/longer_lasting_deer_scent.jpg?v=1776353659"
                    alt="Longer lasting synthetic deer scent performance"
                className="rounded-lg shadow-lg w-full max-w-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6+7: Synthetic vs Natural + Drippers vs Beads — redesigned two-panel */}
        {(content.syntheticVsNatural || content.drippersVsBeads) && (
          <section id="synthetic-vs-natural" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              {/* Section Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider" style={{ background: 'rgba(45,90,61,0.15)', color: 'hsl(var(--accent))', clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                  Know the Difference
                </span>
                <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
                  Why the Right Scent Matters
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch">
                {/* Panel 1 — Synthetic vs Natural */}
                {content.syntheticVsNatural && (
                  <div className="relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }} />
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,90,61,0.15)' }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--accent))' }}>
                            <path d="M9 3v8.5L6.5 19a2.5 2.5 0 004.5 1.5 2.5 2.5 0 004.5-1.5L13 11.5V3" />
                            <path d="M9 3h6" />
                          </svg>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl uppercase text-white">
                          {content.syntheticVsNatural.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm text-gray-300 leading-relaxed mb-5 [&_a]:underline [&_a]:decoration-amber-400/50 [&_a:hover]:decoration-amber-400" dangerouslySetInnerHTML={{ __html: content.syntheticVsNatural.body }} />
                      <div className="rounded px-4 py-3" style={{ borderLeft: '3px solid hsl(var(--accent))', background: 'rgba(45,90,61,0.08)' }}>
                        <p className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--accent))' }}>
                          30 days vs 24–48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* VS Divider */}
                <div className="hidden lg:flex flex-col items-center justify-center px-6" aria-hidden="true">
                  <div style={{ width: '1px', height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />
                  <div className="w-12 h-12 rounded-full flex items-center justify-center my-4" style={{ border: '2px solid hsl(var(--primary))', background: 'rgba(26,29,41,0.9)' }}>
                    <span className="font-display text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>VS</span>
                  </div>
                  <div style={{ width: '1px', height: '40%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)' }} />
                </div>

                {/* Mobile VS Divider */}
                <div className="flex lg:hidden items-center justify-center py-2" aria-hidden="true">
                  <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-4" style={{ border: '2px solid hsl(var(--primary))', background: 'rgba(26,29,41,0.9)' }}>
                    <span className="font-display text-xs font-bold" style={{ color: 'hsl(var(--accent))' }}>VS</span>
                  </div>
                  <div className="flex-1" style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                </div>

                {/* Panel 2 — Drippers vs Beads */}
                {content.drippersVsBeads && (
                  <div className="relative overflow-hidden rounded-lg" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ height: '3px', background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))' }} />
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(45,90,61,0.15)' }}>
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'hsl(var(--accent))' }}>
                            <path d="M12 22a7 7 0 005-2l3.5-3.5a2.83 2.83 0 00-4-4L13 16" />
                            <path d="M12 22a7 7 0 01-5-2L3.5 17.5a2.83 2.83 0 014-4L11 16" />
                            <path d="M12 22V16" />
                          </svg>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl uppercase text-white">
                          {content.drippersVsBeads.title}
                        </h3>
                      </div>
                      <p className="font-body text-sm text-gray-300 leading-relaxed mb-5">
                        {content.drippersVsBeads.body}
                      </p>
                      <div className="rounded px-4 py-3" style={{ borderLeft: '3px solid hsl(var(--accent))', background: 'rgba(45,90,61,0.08)' }}>
                        <p className="font-display text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(var(--accent))' }}>
                          Nothing to clog. Nothing to freeze.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom tagline bar */}
              <div className="mt-10 text-center">
                <p className="font-body text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Synthetic &bull; Long-Lasting &bull; Legal Everywhere
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Products */}
        <div id="products" style={{ background: '#1a1d29' }}>
          {content.products && <ProductsSection content={content.products} />}
        </div>

        {/* Section 10: Comparison */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}

        {/* Reviews */}
        <StampedReviewsSection
          title={content.reviews?.title || 'What Hunters Are Saying'}
          subtitle={content.reviews?.stamped?.subtitle || 'Verified Buyers'}
          description={content.reviews?.description || "Real results from hunters who put Odin's to the test in the field."}
        />

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
