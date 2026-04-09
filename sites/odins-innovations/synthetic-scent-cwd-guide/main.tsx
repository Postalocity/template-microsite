/**
 * CWD & Synthetic Scent Guide - Odin's Innovations
 * Generated from template-microsite
 * Generated at: 2026-04-08
 * Brand: Odin's Innovations
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection, SiteNavigation, SiteFooter } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Brand configuration
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works","description":"Simple deployment for extended results"},"steps":[{"number":"1","title":"Deploy the Beads","description":"Place a small amount of beads in mock scrapes, on drag lines, or around stands."},{"number":"2","title":"Natural Release","description":"The biodegradable polymer matrix releases lab-formulated attractants steadily for 30+ days."},{"number":"3","title":"Weatherproof Performance","description":"The formula resists washing away in rain and maintains effectiveness through temperature changes."},{"number":"4","title":"Consistent Results","description":"Lab-consistent results with no spoilage or freezing. Effective for deer, hogs, bears, and elk."}]},"difference":{"section":{"title":"Why Odin's","description":"The Odin's difference"},"differences":[{"icon":"shield","title":"CWD-Safe","description":"Zero biological material — no CWD risk."},{"icon":"clock","title":"30+ Day Release","description":"Continuous attraction for a full month."},{"icon":"globe","title":"Legal Everywhere","description":"Permitted in all 50 states."}]}};

const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com"};

// IKB configuration with promo codes
const ikbConfig = {
  rules: {
    promoCodes: {
      'synthetic-scent-cwd-guide': 'HUNT2026',
    },
    approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'pricing'],
    blocklistedContent: ['testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
  },
};

// Get promo code
const promoCode = 'HUNT2026';

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
          <section id="what-is-cwd" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['what-is-cwd'].headline}</h2>
              
              {/* Key Points Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Always Fatal</h3>
                      <p className="text-sm text-muted-foreground">CWD is a transmissible spongiform encephalopathy caused by misfolded proteins (prions). It is 100% fatal in cervids with no vaccine, treatment, or cure.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Spreads Through Bodily Fluids</h3>
                      <p className="text-sm text-muted-foreground">Prions transmit via urine, saliva, feces, and contaminated environments. Even trace amounts can infect healthy deer.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">18+ Month Incubation</h3>
                      <p className="text-sm text-muted-foreground">CWD can incubate for over 18 months without symptoms. Urine from seemingly healthy herds may contain infectious prions.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-lg p-6 shadow-sm border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">State Restrictions</h3>
                      <p className="text-sm text-muted-foreground">Multiple states restrict or ban natural cervid urine products. Odin's synthetic scents contain zero animal-derived material.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="text-center">
                <a href="https://www.odinsinnovations.com/collections/scent-beads?promo=HUNT2026" className="btn-accent text-base px-8 py-3 inline-block">
                  Shop CWD-Safe Synthetic Scents
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Why Odin's Section */}
        {content['why-odins'] && (
          <section id="why-odins" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['why-odins'].headline}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{content['why-odins'].body}</p>
              <div className="text-center">
                <a href="https://www.odinsinnovations.com/collections/scent-beads?promo=HUNT2026" className="btn-accent text-base px-8 py-3 inline-block">
                  Shop Synthetic Scent Beads
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* How It Works */}
        {content['how-it-works'] && <HowItWorksSection howItWorks={content['how-it-works']} />}
        
        {/* Benefits */}
        {content['benefits'] && <BenefitsSection benefits={content['benefits']} />}
        
        {/* Comparison */}
        {content['comparison'] && (
          <section id="comparison" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['comparison'].headline}</h2>
              <ComparisonTable comparison={content['comparison']} promoCode={promoCode} />
              <div className="text-center mt-8">
                <a href="https://www.odinsinnovations.com/collections/scent-beads?promo=HUNT2026" className="btn-accent text-base px-8 py-3 inline-block">
                  See Why Hunters Choose Synthetic
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* FAQ */}
        {content['faq'] && (
          <>
            <FAQSection faq={{ ...content['faq'], showContactSection: false }} />
            <div className="text-center pb-8">
              <a href="https://www.odinsinnovations.com/collections/scent-beads?promo=HUNT2026" className="btn-accent text-base px-8 py-3 inline-block">
                Shop Synthetic Scent Beads
              </a>
            </div>
          </>
        )}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root')!);
root.render(<App />);