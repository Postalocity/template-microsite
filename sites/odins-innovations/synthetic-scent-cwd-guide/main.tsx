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
const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How It Works"},"steps":[{"number":"1","title":"Activation","description":"When exposed to air, the polymer begins slowly releasing synthetic scent molecules."},{"number":"2","title":"Continuous Release","description":"Scent meters out evenly over 30+ days for consistent attraction."},{"number":"3","title":"Weather Resistance","description":"Rain pauses release without washing away — performance resumes when dry."},{"number":"4","title":"Biodegradation","description":"Plant-based polymer breaks down naturally — no cleanup needed."}]},"difference":{"section":{"title":"Why Odin's","description":"The Odin's difference"},"differences":[{"icon":"shield","title":"CWD-Safe","description":"Zero biological material — no CWD risk."},{"icon":"clock","title":"30+ Day Release","description":"Continuous attraction for a full month."},{"icon":"globe","title":"Legal Everywhere","description":"Permitted in all 50 states."}]}};

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
        
        {/* Why Odin's Section */}
        {content['why-odins'] && (
          <section id="why-odins" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{content['why-odins'].headline}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content['why-odins'].body}</p>
            </div>
          </section>
        )}
        
        {/* CWD Regulations Section */}
        {content['cwd-regulations'] && (
          <section id="cwd-regulations" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">{content['cwd-regulations'].headline}</h2>
              <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{content['cwd-regulations'].description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {content['cwd-regulations'].states.map((item: any, index: number) => (
                  <div key={index} className="p-4 bg-card rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{item.state}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.status === 'Banned' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4 italic">{content['cwd-regulations'].disclaimer}</p>
            </div>
          </section>
        )}
        
        {/* How It Works */}
        {content['how-it-works'] && <HowItWorksSection howItWorks={content['how-it-works']} />}
        
        {/* Benefits */}
        {content['benefits'] && (
          <section id="benefits" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{content['benefits'].headline}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content['benefits'].items.map((item: string, index: number) => {
                  const parts = item.split('—').map(s => s.trim());
                  const title = parts[0];
                  const description = parts.slice(1).join(' — ');
                  return (
                    <div key={index} className="p-6 bg-card rounded-lg border text-center">
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        
        {/* Comparison */}
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {/* FAQ */}
        {content['faq'] && <FAQSection faq={content['faq']} />}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root')!);
root.render(<App />);