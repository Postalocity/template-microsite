/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      synthetic-scent-cwd-guide
 * Brand:     Odin's Innovations
 * Generated: 2026-05-18T14:06:16.846Z
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
import { useState } from 'react';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, SiteNavigation, SiteFooter, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"The Science Behind Scent Bead Technology","description":""},"headline":"The Science Behind Scent Bead Technology","body":"Odin's proprietary biodegradable polymer system delivers consistent, long-lasting scent release through controlled molecular diffusion.","steps":[{"number":"01","title":"Synthetic Scent Formulations","description":"Odin's has 21 unique scents formulated to provide a toolkit for hunters of all kinds and for many different times a year"},{"number":"02","title":"Proprietary Biopolymer","description":"Designed to absorb synthetic scents for a controlled release and then biodegrade. Better than you found it™"},{"number":"03","title":"Weatherproof Performance","description":"Rain, snow, and heavy dew won't wash away the scent. Use our weatherproof technology in any conditions","image":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png"},{"number":"04","title":"Controlled Molecular Release","description":"A prescribed amount of scent is infused into each polymer bead. Due to the design, the scent molecules are released over an extended period. Applying science to create innovative products for you!"}],"scienceSection":{"title":"University Testing Confirms Performance","description":"We needed proof that the performance was at least as good as we said. Scent beads were left outside in the natural elements, collecting a small portion every 3 days. Each sample was then tested at a University Chemical Laboratory to compare the volume of scent molecules present over time (using Gas Chromatography-Mass Spectrometry). Moisture does not dilute the remaining scent; the beads could be submerged in water and performance resumes when the bead is exposed to the air. This technology supports 30+ days of continuous release of scent without any maintenance or re-introduction of human scent.","highlight":"52% original scent concentration still releasing after 27 days","chartImage":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Scent_Chart_with_Description_full_size.jpg"}},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};

// IKB configuration
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"synthetic-scent-cwd-guide":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules?.promoCodes?.['synthetic-scent-cwd-guide'] || config.ikb?.rules?.promoCodes?.['synthetic-scent-cwd-guide'] || '';

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
                          {card.icon === 'warning-red' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          )}
                          {card.icon === 'flask-amber' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          )}
                          {card.icon === 'clock-orange' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {card.icon === 'ban-red' && (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          )}
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
              <div className="text-center">
                <a href={content['what-is-cwd'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block" target="_blank" rel="noopener noreferrer">
                  {content['what-is-cwd'].cta?.text || 'Learn More'}
                </a>
              </div>
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
              
              <div className="text-center">
                <a href={content['why-odins'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['why-odins'].cta?.text || 'Shop Now'}
                </a>
              </div>
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
                      {item.icon === 'shield' && (
                        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
        
        {/* Comparison (white) */}
        {content['comparison'] && (
          <section id="comparison" className="py-20" style={{ background: 'hsl(var(--background))' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['comparison'].headline}</h2>
              <ComparisonTable comparison={content['comparison']} promoCode={promoCode} />
              <div className="text-center mt-8">
                <a href={content['comparison'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                  {content['comparison'].cta?.text || 'See Why Hunters Choose Synthetic'}
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Reviews */}
        <StampedReviewsSection
          title={content.reviews?.title || 'Success Stories from the Field'}
          subtitle={content.reviews?.stamped?.subtitle || 'Verified Buyers'}
          description={content.reviews?.description || "Real results from hunters who trust Odin's synthetic scents."}
        />
        
        {/* FAQ (warm cream) */}
        {content['faq'] && (
          <section id="faq" style={{ background: 'hsl(30, 20%, 95%)' }}>
            <FAQSection faq={{ ...content['faq'], showContactSection: false }} />
            <div className="text-center pb-8">
              <a href={content['faq'].cta?.href || '#'} className="btn-accent text-base px-8 py-3 inline-block">
                {content['faq'].cta?.text || 'Shop Now'}
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
