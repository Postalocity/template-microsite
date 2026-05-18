/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      synthetic-scent-beads
 * Brand:     Odin's Innovations
 * Generated: 2026-05-14T15:30:07.917Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/synthetic-scent-beads.json
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
import { HeroSection, WhyOdinsSection, HowToUseSection, BenefitsSection, ProductsSection, ComparisonTable, FAQSection, SiteFooter, SiteNavigation, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"HOW ODIN'S SYNTHETIC TECHNOLOGIES WORK TOGETHER","description":"Every synthetic scent is developed to a specific aroma profile. Our pheromone scents deliver the exact same aroma every single time — doe estrus, dominant buck, scrape blend. Our food scents smell like apples, persimmons, acorns — on down the line. And then we get creative: Jelly Donut without going to the bakery. Maple Bacon tested in Canada for bear hunting. Pear and Peanut Butter to bring hogs out during the day. You can't do that with natural products. Then there's shelf life. Synthetic scents don't spoil. Our biodegradable polymer beads contain a precise amount of scent and release it evenly over 30 days. When a scent molecule hits the bead's surface, it releases into the air. Rain can't stop it. Natural liquid scents expire in 24–36 hours — unless rain gets there first."},"headline":"HOW ODIN'S SYNTHETIC TECHNOLOGIES WORK TOGETHER","description":"Every synthetic scent is developed to a specific aroma profile. Our pheromone scents deliver the exact same aroma every single time — doe estrus, dominant buck, scrape blend. Our food scents smell like apples, persimmons, acorns — on down the line. And then we get creative: Jelly Donut without going to the bakery. Maple Bacon tested in Canada for bear hunting. Pear and Peanut Butter to bring hogs out during the day. You can't do that with natural products. Then there's shelf life. Synthetic scents don't spoil. Our biodegradable polymer beads contain a precise amount of scent and release it evenly over 30 days. When a scent molecule hits the bead's surface, it releases into the air. Rain can't stop it. Natural liquid scents expire in 24–36 hours — unless rain gets there first.","steps":["Select the scent that will help you be successful; cover, lure or attractant scents.","Select the delivery system that best accomplishes what you need;\n- Beads that will last 30-days in front of your trail cameras or in your target area.\n- Liquid on foliage for a \"quicker hit\" up in the air, on the ground creating a trail and available to stick to paws so our prey can help us extend the range.\n- Or both in concert!","Sprinkle/squirt it on the ground, hang it in a mesh bag or pin it on your clothes in our small sheer bags.\n- When on the ground, it is consistently attracting your prey for 30-days.\n- If in one of the bags, put it in a zip-lock bag and 'capture' the scent in the beads until the next use.","When you're done, the beads biodegrade and leave your hunting area BETTER THAN YOU FOUND IT™"]},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};
const ikbConfig = {};
const promoCode = ikbConfig.rules?.promoCodes?.['synthetic-scent-beads'] || 'HUNT2026';

function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;

  return (
    <IKBProvider ikb={ikbConfig}>
    <BrandProvider
      brand={brandConfig}
      contact={contactConfig}
      social={socialConfig}
    >
      <SiteNavigation config={config} />

      {/* Section 1: Hero */}
      <HeroSection hero={content.hero} />

      {/* Section 2: Why Odin's — light */}
      <WhyOdinsSection content={content['why-odins']} background="hsl(var(--background))" />

      {/* Section 3: How It Works — dark, steps left + video right */}
      <section id="how-it-works" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Application Guide
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
              {content['how-it-works'].headline}
            </h2>
            {content['how-it-works'].description && (
              <p className="font-body text-lg text-gray-400 max-w-3xl mx-auto mt-4">
                {content['how-it-works'].description}
              </p>
            )}
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
            {/* Steps — left */}
            <div className="flex-1 space-y-0">
              {content['how-it-works'].steps && content['how-it-works'].steps.map((step, idx) => {
                const text = typeof step === 'string' ? step : step.title;
                const parts = text.split('\n');
                const mainText = parts[0];
                const subItems = parts.slice(1).filter(p => p.trim());
                return (
                  <div key={idx} className="flex gap-5 py-6" style={{ borderBottom: idx < content['how-it-works'].steps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold" style={{ background: 'hsl(var(--accent) / 0.15)', color: 'hsl(var(--accent))', border: '2px solid hsl(var(--accent) / 0.3)' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-base text-gray-300 leading-relaxed">{mainText}</p>
                      {subItems.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {subItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'hsl(var(--accent))' }} />
                              <span className="font-body text-sm text-gray-400 leading-relaxed">{item.startsWith('- ') ? item.slice(2) : item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Video — right */}
            <div className="flex-shrink-0 w-full lg:w-[480px]">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.youtube.com/embed/q9X9zGL8elM"
                  title="How Odin's Synthetic Scent Beads Work"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-lg"
                  style={{ border: 'none' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 4: Retail Perspective — 3 stat cards on light bg */}
      <section id="retail-perspective" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              For Retailers
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase" style={{ color: 'hsl(var(--foreground))' }}>
              Why Stores Are Shifting Shelf Space
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              For multi-location retailers and chains, the business case for expanding synthetic offerings extends beyond consumer demand.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm" style={{ borderTop: '4px solid hsl(var(--primary))' }}>
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="font-display text-lg uppercase" style={{ color: 'hsl(var(--primary))' }}>Shelf Life</h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Natural urine products spoil. They require controlled storage, have real expiration dates, and generate returns when customers receive degraded product. Synthetic scents have indefinite shelf life, reducing shrink and inventory risk.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm" style={{ borderTop: '4px solid hsl(var(--primary))' }}>
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="font-display text-lg uppercase" style={{ color: 'hsl(var(--primary))' }}>Seasonal Carryover</h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Unsold natural product inventory at season's end represents a loss—it cannot be reliably carried to the next season. Synthetic inventory rolls forward without degradation, improving capital efficiency. No end-of-season clearance pressure or disposal costs.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm" style={{ borderTop: '4px solid hsl(var(--primary))' }}>
              <div className="flex items-center gap-3 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <h3 className="font-display text-lg uppercase" style={{ color: 'hsl(var(--primary))' }}>Handling Requirements</h3>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Natural products often require cold chain considerations and careful handling to prevent contamination or spoilage. Synthetics ship and store like any stable consumer product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Synthetic Spectrum — checklist + gold sidebar takeaway, dark bg */}
      <section id="synthetic-spectrum" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Quality Matters
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
              Not All Products Are Equal
            </h2>
            <p className="font-body text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              We did not "react" to CWD regulations. We chose synthetics because it gives us a better tool kit to build better products. There were no existing bans when we started developing synthetic scents — the first came soon after. Getting ahead of the curve gave us 10+ years of development and 8 years of field-proven results. Strategic, not reactive.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Checklist — 3 cols */}
            <div className="md:col-span-3">
              <h3 className="font-display text-xl uppercase text-white mb-6">
                What Legitimate Development Involves
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 font-bold text-lg" style={{ color: 'hsl(45, 100%, 50%)' }}>✓</span>
                  <span className="font-body text-base text-gray-300 leading-relaxed">Advanced analytical chemistry to identify active compounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 font-bold text-lg" style={{ color: 'hsl(45, 100%, 50%)' }}>✓</span>
                  <span className="font-body text-base text-gray-300 leading-relaxed">Precise aroma profile engineering — pheromones and all scent lines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 font-bold text-lg" style={{ color: 'hsl(45, 100%, 50%)' }}>✓</span>
                  <span className="font-body text-base text-gray-300 leading-relaxed">Formulation testing, field testing, refinement and final product.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 font-bold text-lg" style={{ color: 'hsl(45, 100%, 50%)' }}>✓</span>
                  <span className="font-body text-base text-gray-300 leading-relaxed">Ongoing field validation and continuous capability refinement</span>
                </li>
              </ul>
            </div>
            {/* Gold Sidebar — 2 cols */}
            <div className="md:col-span-2">
              <div className="rounded-lg p-6" style={{ background: 'hsl(45, 100%, 50%)' }}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(0,0,0,0.15)', color: '#1a1d29', clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}>
                    The Takeaway
                  </span>
                </div>
                <p className="font-display text-lg uppercase leading-tight mb-3" style={{ color: '#1a1d29' }}>
                  Evaluate on Credibility, Not Labels
                </p>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(26,29,41,0.8)' }}>
                  The growth in synthetic adoption reflects consumers finding products that actually work—not just products that comply with regulations. Evaluate based on manufacturer credibility, R&D investment, and documented field performance—not just the "synthetic" label.
                </p>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(26,29,41,0.2)' }}>
                  <p className="font-display text-sm uppercase font-bold leading-snug" style={{ color: '#1a1d29' }}>
                    Keep our eyes and ears open for new ways to better serve our customers — this is the really cool and fun part!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Natural Reality — stat block + CTA banner, warm sand bg */}
      <section id="natural-reality" className="section-padding" style={{ background: 'hsl(30, 20%, 95%)' }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              The Full Picture
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase" style={{ color: 'hsl(var(--foreground))' }}>
              Natural Product Reality
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              This analysis should not be read as predicting the disappearance of natural attractants. In unrestricted markets, natural products remain popular.
            </p>
          </div>
          {/* Advantages Card with Stat Block */}
          <div className="max-w-4xl mx-auto mb-8 bg-white rounded-lg p-6 shadow-sm" style={{ borderTop: '4px solid hsl(var(--primary))' }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 text-center md:text-left w-24">
                <div className="font-display text-5xl font-bold" style={{ color: 'hsl(var(--primary))' }}>4</div>
                <div className="font-body text-xs uppercase tracking-wider text-muted-foreground mt-1">Key Advantages</div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl uppercase mb-4" style={{ color: 'hsl(var(--primary))' }}>
                  Advantages & Regulatory Costs
                </h3>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3"><span style={{ color: 'hsl(var(--primary))' }}>•</span><span className="font-body text-sm text-muted-foreground leading-relaxed">Decades of field-proven effectiveness, particularly for mature bucks during rut</span></li>
                  <li className="flex items-start gap-3"><span style={{ color: 'hsl(var(--primary))' }}>•</span><span className="font-body text-sm text-muted-foreground leading-relaxed">Complex biological compounds that remain difficult to fully replicate</span></li>
                  <li className="flex items-start gap-3"><span style={{ color: 'hsl(var(--primary))' }}>•</span><span className="font-body text-sm text-muted-foreground leading-relaxed">Traditional appeal and brand loyalty among experienced hunters</span></li>
                  <li className="flex items-start gap-3"><span style={{ color: 'hsl(var(--primary))' }}>•</span><span className="font-body text-sm text-muted-foreground leading-relaxed">Often lower per-unit costs for established operations with existing infrastructure</span></li>
                </ul>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  However, unpredictable regulatory changes have added cost pressure. Starting in 2016 with the ATA's DPP program (now under the <a href="https://responsiblescents.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>Responsible Hunting Scent Association</a>), the industry moved toward standardized production. Imbedded in the program is the <a href="https://www.aphis.usda.gov/livestock-poultry-disease/cervid/chronic-wasting/herd-certification" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>USDA's CWD Voluntary Herd Certification Program</a>. Federal programs add predictable costs — a factor driving retailers toward synthetics.
                </p>
              </div>
            </div>
          </div>
          {/* CTA Banner for articles */}
          <div className="max-w-4xl mx-auto rounded-lg p-6 md:p-8" style={{ background: 'hsl(30, 80%, 35%)' }}>
            <h3 className="font-display text-lg uppercase text-white mb-2">The Market Is Moving</h3>
            <p className="font-body text-sm mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>Read the coverage from industry publications:</p>
            <div className="flex flex-col md:flex-row gap-4">
              <a href="https://www.archerybusiness.com/the-evolution-of-deer-attractants-why-synthetic-scents-are-redefining-the-category" target="_blank" rel="noopener noreferrer"
                 className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded font-display text-sm uppercase tracking-wider text-center transition-all duration-300 hover:brightness-110"
                 style={{ background: 'white', color: 'hsl(30, 80%, 35%)' }}>
                Read Archery Business →
              </a>
              <a href="https://www.odinsinnovations.com/blogs/in-the-field/inside-archery-odins-innovations-a-very-different-kind-of-scent-company" target="_blank" rel="noopener noreferrer"
                 className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded font-display text-sm uppercase tracking-wider text-center transition-all duration-300 hover:brightness-110"
                 style={{ background: 'white', color: 'hsl(30, 80%, 35%)' }}>
                Read Inside Archery →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7b: Beyond Regulation — editorial feature layout, after Natural Reality */}
      <section id="beyond-regulation" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              The Case for Synthetics
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
              Beyond Regulation
            </h2>
            <p className="font-body text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              Three reasons synthetic scents outperform natural products on every metric that matters to hunters and retailers alike.
            </p>
          </div>

          {/* ARGUMENT 1: Stat + Pull Quote — text directly on dark bg */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="font-display text-7xl md:text-8xl font-bold leading-none" style={{ color: 'hsl(45, 100%, 50%)' }}>36</div>
                <div className="font-body text-sm uppercase tracking-wider text-gray-400 mt-2">Hours<br />Average Receptive Window</div>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide text-white mb-4">
                  Consistency and Reliability
                </h3>
                <p className="font-body text-base text-gray-300 leading-relaxed mb-4">
                  Natural deer urine is a biological product subject to nature's variations. An individual doe's estrus window averages about 36 hours — and hormone levels, diet, health, and collection timing all affect potency. No two bottles are identical, even from the same operation.
                </p>
                <blockquote className="border-l-4 pl-6 my-6" style={{ borderColor: 'hsl(45, 100%, 50%)' }}>
                  <p className="font-body text-xl md:text-2xl italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    "A bottle collected during peak estrus from one doe will differ from another, even within the same operation."
                  </p>
                </blockquote>
                <p className="font-body text-base text-gray-300 leading-relaxed">
                  Bucks actively seek receptive does across a 10–14-day peak. You need a product that works the entire window — or you reintroduce human scent every time you reapply. Synthetic scents deployed once deliver consistent attraction for 30+ days. No timing a "magic window."
                </p>
              </div>
            </div>
            <div className="w-24 h-0.5 mx-auto" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* ARGUMENT 2: Side-by-Side Comparison — Natural vs Synthetic */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-wide text-white mb-6 text-center">
              Extended Effectiveness
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg p-6" style={{ background: 'rgba(220,38,38,0.08)', borderLeft: '4px solid #dc2626' }}>
                <h4 className="font-display text-lg uppercase mb-4" style={{ color: '#f87171' }}>Natural Urine</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }}>✕</span>
                    <span className="font-body text-sm text-gray-300">Degrades immediately after collection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }}>✕</span>
                    <span className="font-body text-sm text-gray-300">Shelf life limited even with refrigeration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }}>✕</span>
                    <span className="font-body text-sm text-gray-300">Loses potency within hours in the field</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }}>✕</span>
                    <span className="font-body text-sm text-gray-300">Many manufacturers recommend it remain refrigerated.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#f87171' }}>✕</span>
                    <span className="font-body text-sm text-gray-300">Some brands offer a return-program to pick up what is left at the dealers at the end of the season. (We're not sure what happens to it?)</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg p-6" style={{ background: 'rgba(45,90,61,0.15)', borderLeft: '4px solid hsl(145, 45%, 38%)' }}>
                <h4 className="font-display text-lg uppercase mb-4" style={{ color: '#4ade80' }}>Synthetic Scent Beads</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                    <span className="font-body text-sm text-gray-300">Stable from manufacturing through field application</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                    <span className="font-body text-sm text-gray-300">Indefinite shelf life — no refrigeration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                    <span className="font-body text-sm text-gray-300">30+ days continuous scent release</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                    <span className="font-body text-sm text-gray-300">Ships like any stable consumer product</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                    <span className="font-body text-sm text-gray-300">Carries over to next season without any loss in potency.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-24 h-0.5 mx-auto mt-16" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* ARGUMENT 3: Gradient Accent Bar — Innovation */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg p-8 md:p-10" style={{ background: 'linear-gradient(to right, hsl(30, 80%, 35%), hsl(45, 100%, 50%))' }}>
              <h3 className="font-display text-2xl md:text-3xl uppercase text-white mb-6">
                Innovation Potential
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-white font-body text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>Biodegradable Bead Infusion</span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-white font-body text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>Time-Release Mechanisms</span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-white font-body text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>Multi-Phase Scent Profiles</span>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-white font-body text-sm" style={{ background: 'rgba(255,255,255,0.2)' }}>Weather-Conditioned Volatility</span>
              </div>
              <p className="font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Perhaps the most compelling advantage of synthetic scents is the opportunity for innovation that simply isn't possible with natural products. Advanced delivery systems require the stability and consistency only synthetic products can provide. Manufacturers can fine-tune scent intensity, adjust volatility for different weather conditions, and even engineer multi-phase releases that change over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Comparison — closes the editorial argument */}
      <div style={{ background: 'hsl(var(--background))' }}>
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
      </div>

      {/* Collection Images — linked images only */}
      <section className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="https://www.odinsinnovations.com/collections/food-scents" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Food_Scents.png?v=1762888380"
                  alt="Food Scents collection"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </a>
            <a href="https://www.odinsinnovations.com/collections/rut-scents" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png?v=1762888380"
                  alt="Rut Scents collection"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </a>
            <a href="https://www.odinsinnovations.com/collections/cover-scents" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <img
                  src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Cover_Scents.png?v=1762888625"
                  alt="Cover Scents collection"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 9: Products — action */}
      <ProductsSection content={content.products} background="hsl(30, 20%, 95%)" />

      {/* Section 10: Reviews — dark bg for dramatic feel */}
      <StampedReviewsSection
        title="What Hunters Are Saying"
        subtitle="Field Reports"
        description="Real results from hunters who put Odin's to the test in the field. For hundreds more reviews, visit our product pages."
        background="#1a1d29"
      />

      {/* Hide Stamped Product/Site Reviews tabs - inline style wins source order battle */}
      <style dangerouslySetInnerHTML={{__html: ".stamped-widget-buttons, .stamped-full-page-tabs { display: none !important; }" }} />

      {/* Section 12: FAQ */}
      <FAQSection faq={content.faq} background="hsl(var(--background))" />

      {/* Section 13: Footer CTA */}
      <SiteFooter config={config} />
      {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
    </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
