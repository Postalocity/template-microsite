/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      food-scent-deer-attractants
 * Brand:     Odin's Innovations
 * Generated: 2026-06-08T20:25:57.130Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/food-scent-deer-attractants.json
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
import { HeroSection, BenefitsSection, WhyOdinsSection, DifferenceSection, ProductsSection, ComparisonTable, TrustBadgesSection, FAQSection, SiteFooter, SiteNavigation, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works","description":"Simple deployment for extended results"},"steps":[{"number":"1","title":"Deploy the Beads","description":"Place a small amount of beads in mock scrapes, on drag lines, or around stands."},{"number":"2","title":"Natural Release","description":"The biodegradable polymer matrix releases lab-formulated attractants steadily for 30+ days."},{"number":"3","title":"Weatherproof Performance","description":"The formula resists washing away in rain and maintains effectiveness through temperature changes."},{"number":"4","title":"Consistent Results","description":"Lab-consistent results with no spoilage or freezing. Effective for deer, hogs, bears, and elk."}]},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"trustSignals":["Made in USA","50 State Legal","30+ Day Scent","USDA BioPreferred"],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"food-scent-deer-attractants":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};
const promoCode = ikbConfig.rules?.promoCodes?.['food-scent-deer-attractants'] || 'HUNT2026';

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
      <HeroSection hero={content.hero} />
      {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
      <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />
      <ProductsSection content={content.products} background="hsl(var(--background))" />
      <div style={{ background: 'hsl(30, 20%, 95%)' }}>
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
      </div>
      <WhyOdinsSection content={content.outperforms} background="hsl(var(--background))" />

      {/* How to Deploy */}
      <section id="deployment" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 text-white text-center">
            {content.deployment.title}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <ol className="space-y-6">
                  {content.deployment.steps.map((step: string, idx: number) => (
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
              <div className="flex flex-col gap-6">
                {content.deployment.videos.map((video: { src: string; title: string }, idx: number) => (
                  <div key={idx} className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DifferenceSection difference={content.environmental} background="hsl(var(--background))" />

      {/* Baiting Laws and Scent Attractants */}
      {content.baitingLaws && (
      <section id="baiting-laws" className="section-padding" style={{ background: '#1a1d29' }}>
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 text-center text-white" dangerouslySetInnerHTML={{ __html: (content.baitingLaws.title || '').replace(' & ', ' &<br />') }} />
            <p className="font-body text-lg leading-relaxed text-gray-300 text-center mb-12">
              {content.baitingLaws.subtitle}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid hsl(var(--accent))' }}>
                <h3 className="font-display text-xl uppercase mb-3 text-white">Scent Attractants</h3>
                <ul className="space-y-3 font-body text-sm text-gray-300">
                  {(content.baitingLaws.scentPoints || []).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'hsl(var(--accent))' }}>✓</span>
                    <span>{point}</span>
                  </li>
                  ))}
                </ul>
              </div>
              <div className="p-6" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid #ef4444' }}>
                <h3 className="font-display text-xl uppercase mb-3 text-white">Traditional Bait (Corn, Feed)</h3>
                <ul className="space-y-3 font-body text-sm text-gray-300">
                  {(content.baitingLaws.baitPoints || []).map((point: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-400">✗</span>
                    <span>{point}</span>
                  </li>
                  ))}
                </ul>
              </div>
            </div>
            {content.baitingLaws.disclaimer && (
            <div className="mt-10 p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <p className="font-body text-sm text-gray-400">
                <strong className="text-white">Important:</strong> {content.baitingLaws.disclaimer}
              </p>
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Reviews */}
      <StampedReviewsSection
        title={content.reviews?.title || 'What Hunters Are Saying'}
        subtitle={content.reviews?.stamped?.subtitle || 'Verified Buyers'}
        description={content.reviews?.description || "Real results from hunters who put Odin's food scent beads to the test in the field."}
      />

      <FAQSection faq={content.faq} background="hsl(30, 20%, 95%)" />

      <SiteFooter config={config} />
      {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
    </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
 root.render(<App />);
