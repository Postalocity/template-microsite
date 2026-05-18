/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      how-to-use
 * Brand:     Odin's Innovations
 * Generated: 2026-05-18T14:06:17.281Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/how-to-use.json
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
import { HeroSection, WhyOdinsSection, ComparisonTable, FAQSection, SiteFooter, SiteNavigation, StampedReviewsSection, TrustBadgesSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works","description":"Simple deployment for extended results"},"steps":[{"number":"1","title":"Deploy the Beads","description":"Place a small amount of beads in mock scrapes, on drag lines, or around stands."},{"number":"2","title":"Natural Release","description":"The biodegradable polymer matrix releases lab-formulated attractants steadily for 30+ days."},{"number":"3","title":"Weatherproof Performance","description":"The formula resists washing away in rain and maintains effectiveness through temperature changes."},{"number":"4","title":"Consistent Results","description":"Lab-consistent results with no spoilage or freezing. Effective for deer, hogs, bears, and elk."}]},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to CWD restrictions that ban natural deer urine and other liquids."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"testimonials":[{"quote":"I think that the final take away after using Odin's for the past six months is definitely going to be that the scent brings feral pigs in and way more frequently. Find the one that works for your area and with your pigs and you will be super successful way faster. There hasn't been one scent I've tried that hasn't worked. Pear, Orange, Peanut Butter, New Berry, and Blackstrap Molasses all have brought pigs in non-stop for me since September. Happy clients guided and full freezers. I'll forever be a customer.","attribution":"Justin Edwards","title":"Brings Feral Pigs In, Way More Frequently"},{"quote":"Odin's innovations is awesome and I really got to watch it work today just in case anyone is curious about it. They came in about 15 yards or so and one was right next to us and I dropped this big sow. Just an absolutely awesome experience and I can't wait to do it again.","attribution":"Carl Fox","title":"Dropped This Big Sow!"},{"quote":"I had the Jelly Donut oil with me on my hunt in Minnesota. Conditions were horrible with temps in the high 90s. I settled into my stand in the leafy canopy and sprayed the oil on the leaves and branches and bark of the tree. Sixty-five minutes later the bear came in swinging his head, aggressive. I had to move fast or it would have been in the tree with me.","attribution":"Gary Lewis","title":"The Bear Came In!"}],"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"support@odinsscents.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};
const ikbConfig = {};
const promoCode = ikbConfig.rules?.promoCodes?.['how-to-use'] || 'HUNT2026';

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

      {/* Section 1: Understanding the Two Formats — dark */}
      <section id="understanding-formats" className="section-padding" style={{ background: '#1a1d29' }}>
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
              Format Guide
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-white">
              {content.benefits.title}
            </h2>
          </div>

          {/* Two columns side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Scent Beads Column */}
            {content.benefits.beads && (
              <div>
                {/* Headline with Odin's white icon */}
                <div className="flex items-center gap-4 mb-6">
                  <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="3" className="w-12 h-12 flex-shrink-0">
                    <circle cx="60.82" cy="54.12" r="4.26" />
                    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
                    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
                    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
                  </svg>
                  <h3 className="font-display text-2xl md:text-3xl uppercase text-white">
                    {content.benefits.beads.headline}
                  </h3>
                </div>
                {/* Numbered steps — bright on dark */}
                <div className="space-y-0 mb-8">
                  {content.benefits.beads.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-5 py-5" style={{ borderBottom: idx < content.benefits.beads.bullets.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-bold" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                        {idx + 1}
                      </div>
                      <p className="font-body text-base text-gray-300 leading-relaxed pt-2">{bullet}</p>
                    </div>
                  ))}
                </div>
                {/* Video below steps */}
                {content.benefits.beads.video && (
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <iframe
                      src={(() => {
                        const v = content.benefits.beads.video;
                        if (v.includes('youtu.be/')) return 'https://www.youtube.com/embed/' + v.split('youtu.be/')[1]?.split('?')[0];
                        if (v.includes('watch?v=')) return 'https://www.youtube.com/embed/' + v.split('watch?v=')[1]?.split('&')[0];
                        return v;
                      })()}
                      title="Scent Beads"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}

            {/* Liquid Scents Column */}
            {content.benefits.liquids && (
              <div>
                {/* Headline with Odin's white icon */}
                <div className="flex items-center gap-4 mb-6">
                  <img src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsinnov2-02.png?v=1778702241" alt="Weatherproof" className="w-12 h-12 object-contain flex-shrink-0" loading="lazy" />
                  <h3 className="font-display text-2xl md:text-3xl uppercase text-white">
                    {content.benefits.liquids.headline}
                  </h3>
                </div>
                {/* Numbered steps — bright on dark */}
                <div className="space-y-0 mb-8">
                  {content.benefits.liquids.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-5 py-5" style={{ borderBottom: idx < content.benefits.liquids.bullets.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-bold" style={{ background: 'hsl(var(--accent))', color: 'hsl(var(--foreground))' }}>
                        {idx + 1}
                      </div>
                      <p className="font-body text-base text-gray-300 leading-relaxed pt-2">{bullet}</p>
                    </div>
                  ))}
                </div>
                {/* Video below steps */}
                {content.benefits.liquids.video && (
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <iframe
                      src={(() => {
                        const v = content.benefits.liquids.video;
                        if (v.includes('youtu.be/')) return 'https://www.youtube.com/embed/' + v.split('youtu.be/')[1]?.split('?')[0];
                        if (v.includes('watch?v=')) return 'https://www.youtube.com/embed/' + v.split('watch?v=')[1]?.split('&')[0];
                        return v;
                      })()}
                      title="Liquid Scents"
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges — dark strip after format guide */}
      <TrustBadgesSection trustSignals={{
        signals: [
          { name: "30+ Day Scent", icon: "30+ day scent" },
          { name: "Weatherproof", icon: "weatherproof" },
          { name: "Biodegradable", icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsinnov2-04.png?v=1778702232" },
          { name: "Legal in All 50 States", icon: "50 state legal" }
        ]
      }} />

      {/* Section 2: Why Odin's — white */}
      <WhyOdinsSection content={content['why-odins']} background="hsl(var(--background))" />

      {/* Section 3: Beads vs Liquids Comparison — light gray */}
      <div style={{ background: 'hsl(220, 6%, 93%)' }}>
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} background="hsl(220, 6%, 93%)" />}
      </div>

      {/* Section 5: Seasonal Calendar — dark */}
      {content['seasonal-calendar'] && (
        <section id="seasonal-calendar" className="section-padding" style={{ background: '#1a1d29' }}>
          <div className="section-container">
            <div className="text-center mb-12">
              <span 
                className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
                style={{ 
                  background: 'hsl(var(--primary) / 0.15)',
                  color: 'hsl(30, 80%, 55%)',
                  clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
                }}
              >
                Seasonal Guide
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase" style={{ color: '#ffffff' }}>
                {content['seasonal-calendar'].title}
              </h2>
              {content['seasonal-calendar'].description && (
                <p className="font-body text-lg mt-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {content['seasonal-calendar'].description}
                </p>
              )}
            </div>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(30, 80%, 55%)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Month</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(30, 80%, 55%)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Primary Scent</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider hidden md:table-cell" style={{ color: 'hsl(30, 80%, 55%)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Secondary</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider hidden lg:table-cell" style={{ color: 'hsl(30, 80%, 55%)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {content['seasonal-calendar'].table.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3 font-display text-sm uppercase font-bold" style={{ color: '#ffffff' }}>{row.month}</td>
                      <td className="px-4 py-3 font-body text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>{row.primary}</td>
                      <td className="px-4 py-3 font-body text-sm hidden md:table-cell" style={{ color: 'rgba(255,255,255,0.7)' }}>{row.secondary}</td>
                      <td className="px-4 py-3 font-body text-sm hidden lg:table-cell" style={{ color: 'rgba(255,255,255,0.6)' }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Section 7: Advanced Tips — white */}
      {content['advanced-tips'] && (
        <section id="advanced-tips" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
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
                Pro Tips
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase" style={{ color: 'hsl(var(--foreground))' }}>
                {content['advanced-tips'].title}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {content['advanced-tips'].points.map((point, idx) => {
                const iconName = point.icon || '';
                const title = point.title || '';
                const text = point.text || '';
                return (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-sm" style={{ borderLeft: '4px solid hsl(var(--primary))' }}>
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'hsl(var(--primary) / 0.1)' }}
                      >
                        {iconName === 'layers' ? (
                          <svg className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                        ) : iconName === 'wind' ? (
                          <svg className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></svg>
                        ) : iconName === 'refresh-cw' ? (
                          <svg className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>
                        ) : (
                          <svg className="w-5 h-5" style={{ color: 'hsl(var(--primary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        )}
                      </div>
                      <div className="flex-1">
                        {title && (
                          <h3 className="font-display text-lg uppercase mb-2" style={{ color: 'hsl(var(--primary))' }}>
                            {title}
                          </h3>
                        )}
                        <p className="font-body text-muted-foreground leading-relaxed">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section 8: Reviews */}
      <StampedReviewsSection 
        title="What Hunters Are Saying" 
        subtitle="Field Reports"
        description="Real results from hunters who put Odin's to the test in the field. For hundreds more reviews, visit our product pages."
      />
      
      {/* Hide Stamped Product/Site Reviews tabs - inline style wins source order battle */}
      <style dangerouslySetInnerHTML={{__html: `
        .stamped-widget-buttons,
        .stamped-full-page-tabs {
          display: none !important;
        }
      `}} />
      
      {/* Section 9: FAQ — warm cream */}
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
