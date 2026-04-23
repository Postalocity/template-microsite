/**
 * Doe Estrus Scent Beads - Generated from template-microsite
 * Generated at: 2026-04-23
 * Brand: Odin's Innovations
 * 
 * REFACTORED: Now reads from doe-estrus-guide.json instead of hardcoding
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import siteConfig from './doe-estrus-guide.json';

// Read configuration from siteConfig (doe-estrus-guide.json)
const brandConfig = siteConfig.brand;
const contactConfig = siteConfig.contact;
const socialConfig = siteConfig.social;
const ikbConfig = siteConfig.ikb;
const promoCode = ikbConfig?.rules?.promoCodes?.['doe-estrus-guide'] || 'HUNT2026';

function App() {
  const { content } = siteConfig;
  const navCta = siteConfig.navigation?.cta;
  return (
    <IKBProvider ikb={ikbConfig}>
      <BrandProvider
        brand={brandConfig}
        contact={contactConfig}
        social={socialConfig}
        promoCode={promoCode}
      >
        <SiteNavigation config={siteConfig} />
        <HeroSection hero={content.hero} />
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        {content.testimonials && content.testimonials.length > 0 && <TestimonialsSection />}
        <FAQSection faq={content.faq} />
        <SiteFooter config={siteConfig} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
