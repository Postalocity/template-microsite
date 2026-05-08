/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      earth-cover-scent-beads
 * Brand:     Odin's Innovations
 * Generated: 2026-05-08T15:14:14.375Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/odins-innovations/earth-cover-scent-beads.json
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
import { HeroSection, BenefitsSection, WhyOdinsSection, HowItWorksSection, ProductsSection, ComparisonTable, TrustBadgesSection, FAQSection, SiteFooter, SiteNavigation, DeploymentSection, MosquitoSection, StampedReviewsSection } from '@/themes/odins-innovations/components/shared';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

const brandConfig = {"id":"odins-innovations","name":"Odin's Innovations","slug":"odins-innovations","domain":"odinsinnovations.com","tagline":"Synthetic. Long-Lasting. Legal Everywhere.","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://www.odinsinnovations.com","website":"https://www.odinsinnovations.com","blog":"https://www.odinsinnovations.com/blog","shop":"https://www.odinsinnovations.com/collections/scent-beads","contact":"https://www.odinsinnovations.com/pages/contact-us"},"logo":{"url":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png","faviconUrl":"https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Odins_favicon.png?v=1618500553","filename":"odins-logo.png","alt":"Odin's Innovations - Synthetic Scent Beads"},"colors":{"primary":{"h":30,"s":80,"l":35},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"title":"How Earth Cover Scent Works","description":""},"headline":"How Earth Cover Scent Works","body":"Odin's Earth Cover Scent replicates the smell of forest floor — decaying leaves, rich soil, and organic matter. This baseline scent of a whitetail's natural environment creates an olfactory backdrop that blends into surroundings. The synthetic formulation uses proprietary biodegradable polymer beads that release scent molecules at a controlled rate for 30+ days, regardless of rain, dew, or temperature fluctuations. Unlike sprays that evaporate in 2–4 hours or carbon clothing that saturates quickly, Odin's beads maintain continuous coverage throughout the season."},"difference":{"section":{"title":"The Odin's Difference","description":"Synthetic scent beads engineered for performance where traditional lures fall short"},"differences":[{"icon":"50-states","title":"Legal in All 50 States","description":"100% synthetic formula — not subject to natural urine or CWD restrictions."},{"icon":"clock","title":"30+ Days of Attraction","description":"Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."},{"icon":"leaf","title":"Biodegradable & Safe","description":"Polymer matrix breaks down naturally. No environmental residue or contamination."}]},"footer":{"tagline":"Synthetic. Long-Lasting. Legal Everywhere.","description":"100% synthetic scent beads engineered for 30+ days of consistent attraction. Legal in every state, biodegradable, Made in USA.","links":[{"label":"Scent Beads","href":"https://www.odinsinnovations.com/collections/scent-beads"},{"label":"Liquid Scents","href":"https://www.odinsinnovations.com/collections/liquid-scents"},{"label":"Hunter's Kloak","href":"https://www.odinsinnovations.com/collections/all-hunters-kloak"},{"label":"Find a Dealer","href":"https://www.odinsinnovations.com/pages/find-a-dealer"}],"companyLinks":[{"label":"About Us","href":"https://www.odinsinnovations.com/pages/about-us"},{"label":"Press Releases","href":"https://www.odinsinnovations.com/blogs/press-releases"},{"label":"Field Test Reports","href":"https://www.odinsinnovations.com/blogs/field-test-reports"},{"label":"Industry Publications","href":"https://www.odinsinnovations.com/blogs/in-the-field"}],"supportLinks":[{"label":"Odin's Instructions","href":"https://www.odinsinnovations.com/pages/odins-instructions"},{"label":"Kloak Mister Instructions","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-kloak-mister-instructions"},{"label":"Rut Rouser Instructions","href":"https://www.odinsinnovations.com/pages/rut-rouser%C2%AE-dual-mister-instructions"},{"label":"Hunter's Kloak FAQ","href":"https://www.odinsinnovations.com/pages/hunter-s-kloak%C2%AE-faqs"},{"label":"Contact Us","href":"https://www.odinsinnovations.com/pages/contact-us"},{"label":"Return/Exchange Policy","href":"https://www.odinsinnovations.com/pages/return-exchange-policy"}],"logoSize":"extra-large"}};
const contactConfig = {"phone":"316-393-0440","email":"paul@odinsinnovations.com","address":{"street":"","city":"","state":"","zip":""}};
const socialConfig = {"website":"https://www.odinsinnovations.com","instagram":"https://www.instagram.com/odinsinnovations","facebook":"https://www.facebook.com/theodinsinnovations/","youtube":"https://www.youtube.com/@odinsinnovations2589"};
const ikbConfig = {"rules":{"trustSignals":["Made in USA","50 State Legal","30+ Day Scent"],"promoCodes":{"earth-cover-scent-beads":"HUNT2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":14.95,"currency":"USD","units":"bottle"}};
const promoCode = ikbConfig.rules?.promoCodes?.['earth-cover-scent-beads'] || 'HUNT2026';

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
      <WhyOdinsSection content={content['why-odins']} />
      <HowItWorksSection howItWorks={content['how-it-works']} />
      <BenefitsSection benefits={content.benefits} background="hsl(30, 20%, 95%)" />
      
      {/* How to Use Section */}
      {content['how-to-use'] && <DeploymentSection headline={content['how-to-use'].headline} methods={content['how-to-use'].methods} videos={content['how-to-use'].videos} />}
      
      <ProductsSection content={content.products || content} />
      
      <div style={{ background: 'hsl(30, 20%, 95%)' }}>
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
      </div>
      
      {/* Mosquito Protection Section */}
      {content.mosquito && <MosquitoSection headline={content.mosquito.headline} body={content.mosquito.body} />}
      
{/* Reviews - Success Stories from the Field */}
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
