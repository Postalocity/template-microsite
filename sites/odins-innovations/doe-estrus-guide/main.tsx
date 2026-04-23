/**
 * Doe Estrus Scent Beads - Refactored from template-microsite
 * Generated at: 2026-04-23
 * Brand: Odin's Innovations
 * 
 * REFACTORED: Now reads brand, contact, social, and ikb from config.json
 * instead of hardcoded values.
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection } from '@/themes/odins-innovations/components/shared';
import SiteNavigation from '@/themes/odins-innovations/components/shared/SiteNavigation';
import SiteFooter from '@/themes/odins-innovations/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/themes/odins-innovations/globals.css';
import config from './config.json';

// Read configuration from config.json instead of hardcoding
const brandConfig = config.brand;
const contactConfig = config.contact;
const socialConfig = config.social;
const ikbConfig = config.ikb;

// Get promo code from IKB for the service
const promoCode = ikbConfig?.rules?.promoCodes?.['doe-estrus-guide'] || 'HUNT2026';

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
        {/* ProductsSection - disabled (not exported in shared components) */}
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        {/* Optional Sections - only render if testimonials exist */}
        {content.testimonials && content.testimonials.length > 0 && <TestimonialsSection />}
        {/* {content.about?.enabled && <AboutSection about={content.about} />} */}
        {/* {content.reviews?.enabled && <ReviewsSection reviews={content.reviews} />} */}
        {/* {content.caseStudies?.enabled && <CaseStudiesSection caseStudies={content.caseStudies} />} */}
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
