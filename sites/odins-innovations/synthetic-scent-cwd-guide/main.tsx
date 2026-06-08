/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      synthetic-scent-cwd-guide
 * Brand:     Odin's Innovations
 * Generated: 2026-06-08T20:26:35.966Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/synthetic-scent-cwd-guide.json
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
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, OdinsIcon, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"The Science Behind Scent Bead Technology","description":""},"headline":"The Science Behind Scent Bead Technology","body":"Odin's proprietary biodegradable polymer system delivers consistent, long-lasting scent release through controlled molecular diffusion.","steps":[{"number":"01","title":"Synthetic Scent Formulations","description":"Odin's has 21 unique scents formulated to provide a toolkit for hunters of all kinds and for many different times a year"},{"number":"02","title":"Proprietary Biopolymer","description":"Designed to absorb synthetic scents for a controlled release and then biodegrade. Better than you found it™"},{"number":"03","title":"Weatherproof Performance","description":"Rain, snow, and heavy dew won't wash away the scent. Use our weatherproof technology in any conditions","image":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png"},{"number":"04","title":"Controlled Molecular Release","description":"A prescribed amount of scent is infused into each polymer bead. Due to the design, the scent molecules are released over an extended period. Applying science to create innovative products for you!"}],"scienceSection":{"title":"University Testing Confirms Performance","description":"We needed proof that the performance was at least as good as we said. Scent beads were left outside in the natural elements, collecting a small portion every 3 days. Each sample was then tested at a University Chemical Laboratory to compare the volume of scent molecules present over time (using <a href=\"https://en.wikipedia.org/wiki/Gas_chromatography%E2%80%93mass_spectrometry\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-primary underline underline-offset-2 hover:opacity-80\">Gas Chromatography-Mass Spectrometry</a>). Moisture does not dilute the remaining scent; the beads could be submerged in water and performance resumes when the bead is exposed to the air. This technology supports 30+ days of continuous release of scent without any maintenance or re-introduction of human scent.","highlight":"52% original scent concentration still releasing after 27 days","chartImage":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Scent_Chart_with_Description_full_size.jpg"}},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"synthetic-scent-cwd-guide":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['synthetic-scent-cwd-guide'] || config.ikb?.rules?.promoCodes?.['synthetic-scent-cwd-guide'] || '';

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
        
        {/* What Is CWD Section */}
        {content['what-is-cwd'] && (
          <section id="what-is-cwd" className="py-20" style={{ background: 'hsl(30, 20%, 95%)' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{content['what-is-cwd'].headline}</h2>
              
              {/* Intro Paragraph */}
              {content['what-is-cwd'].intro && (
                <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8">{content['what-is-cwd'].intro}</p>
              )}
              
              {/* Key Points Cards - Dynamic from config */}
              {content['what-is-cwd'].cards && (
                <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                  {content['what-is-cwd'].cards.map((card, idx) => (
                    <div key={idx} className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                          <OdinsIcon icon={card.icon} alt={card.title} variant="light" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                          <p className="text-sm text-muted-foreground">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* CTA */}
              {content['what-is-cwd'].cta && (
                <div className="text-center">
                  <a href={content['what-is-cwd'].cta.href} className="btn-accent text-base px-8 py-3 inline-block" target="_blank" rel="noopener noreferrer">
                    {content['what-is-cwd'].cta.text}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Why Odin's Section (white) */}
        {content['why-odins'] && (
          <section id="why-odins" className="py-20" style={{ background: 'hsl(var(--background))' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['why-odins'].headline}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{content['why-odins'].body}</p>
              
              {/* USDA BioPreferred Certification Badge */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <img 
                    src={content['why-odins'].usdaBioPreferred?.imageUrl || 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/usda_certified_biobased_product.png?v=1776353558'} 
                    alt={content['why-odins'].usdaBioPreferred?.imageAlt || 'USDA Certified Biobased Product'}
                    className="w-48 h-auto"
                  />
                </div>
                <div className="text-left max-w-md">
                  <p className="text-lg text-stone-700 mb-2">
                    <strong>{content['why-odins'].usdaBioPreferred?.title || 'USDA BioPreferred® Certified'}</strong>
                  </p>
                  <p className="text-stone-600 mb-4">
                    {content['why-odins'].usdaBioPreferred?.description || 'Our biodegradable polymer contains 42% certified biobased content. Both beaded and liquid products are USDA BioPreferred Certified.'}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
                    <span className="text-stone-500">Certified Under:</span>
                    <span className="font-medium text-stone-700">{content['why-odins'].usdaBioPreferred?.certifiedUnder || 'LC BioPlastics LLC'}</span>
                    <a 
                      href={content['why-odins'].usdaBioPreferred?.detailsUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B4513] hover:text-[#6b3410] underline underline-offset-2"
                    >
                      {content['why-odins'].usdaBioPreferred?.detailsLinkText || 'View Details →'}
                    </a>
                  </div>
                </div>
              </div>
              
              {content['why-odins'].cta && (
                <div className="text-center">
                  <a href={content['why-odins'].cta.href} className="btn-accent text-base px-8 py-3 inline-block">
                    {content['why-odins'].cta.text}
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* How It Works - Dark background with science section */}
        {content['how-it-works'] && (
          <section id="how-it-works" className="py-20" style={{ background: '#1a1d29' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">{content['how-it-works'].headline}</h2>
              <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">{content['how-it-works'].body}</p>
              
              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {content['how-it-works'].steps?.map((step, idx) => (
                  <div key={idx} className="rounded-lg p-8 shadow-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {step.image ? (
                      /* Step with image - side-by-side layout */
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="sm:w-24 sm:h-24 w-full h-32 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-16 h-16 object-contain drop-shadow-sm"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-3xl font-bold text-primary mb-2">{step.number}</div>
                          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                        </div>
                      </div>
                    ) : (
                      /* Step without image - standard layout */
                      <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
                    )}
                    {!step.image && <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>}
                    <p className="text-base text-gray-300">{step.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Science Section - Bigger Font */}
              {content['how-it-works'].scienceSection && (
                <div className="rounded-xl p-8 md:p-12" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">{content['how-it-works'].scienceSection.title}</h3>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    <img 
                      src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/longer_lasting_deer_scent.jpg?v=1776353659" 
                      alt="Longer Lasting Deer Scent - 30+ Days of Performance"
                      className="w-48 h-auto rounded-lg shadow-md"
                    />
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: content['how-it-works'].scienceSection.description }} />
                  </div>
                  <div className="bg-primary/10 rounded-lg p-6 text-center">
                    <p className="text-xl md:text-2xl font-bold text-primary">{content['how-it-works'].scienceSection.highlight}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* Benefits (warm cream) */}
        {content['benefits'] && <BenefitsSection benefits={content['benefits']} background="hsl(30, 20%, 95%)" />}
        
        {/* Wins Section (dark - citronella style) */}
        {content['wins'] && (
          <section id="wins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
                {content['wins'].headline}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content['wins'].items.map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center text-green-400">
                      <OdinsIcon icon={item.icon} alt={item.title} variant="dark" />
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item.title}</h3>
                    <p className="font-body text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Comparison (white) — ComparisonTable owns #comparison */}
        {content['comparison'] && (
          <>
            <ComparisonTable comparison={content['comparison']} background="hsl(var(--background))" />
            {content['comparison'].cta && (
              <div className="text-center pb-20" style={{ background: 'hsl(var(--background))' }}>
                <a href={content['comparison'].cta.href} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['comparison'].cta.text}
                </a>
              </div>
            )}
          </>
        )}
        
        {/* Reviews */}
        <StampedReviewsSection
          title={content.reviews?.title || 'Success Stories from the Field'}
          subtitle={content.reviews?.stamped?.subtitle || 'Verified Buyers'}
          description={content.reviews?.description || "Real results from hunters who trust Odin's synthetic scents."}
        />
        
        {/* FAQ (warm cream) — FAQSection owns #faq */}
        {content['faq'] && (
          <>
            <FAQSection faq={{ ...content['faq'], showContactSection: false }} background="hsl(30, 20%, 95%)" />
            {content['faq'].cta && (
              <div className="text-center pb-8" style={{ background: 'hsl(30, 20%, 95%)' }}>
                <a href={content['faq'].cta.href} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['faq'].cta.text}
                </a>
              </div>
            )}
          </>
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
