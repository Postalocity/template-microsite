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
        
        {/* Why Odin's Section */}
        {content['why-odins'] && (
          <section id="why-odins" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{content['why-odins'].headline}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content['why-odins'].body}</p>
            </div>
          </section>
        )}
        
        {/* CWD Regulations Section */}
        {content['cwd-regulations'] && (
          <section id="cwd-regulations" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{content['cwd-regulations'].headline}</h2>
              <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">{content['cwd-regulations'].body}</p>
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
            </div>
          </section>
        )}
        
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