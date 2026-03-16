/**
 * Self Storage Mailing Service - Generated from template-microsite
 * Generated at: 2026-03-16T21:10:43.256Z
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection } from '../common/components/shared';
import SiteNavigation from '../common/components/shared/SiteNavigation';
import SiteFooter from '../common/components/shared/SiteFooter';
import '../common/globals.css';
import config from './config.json';

function App() {
  const { content } = config;
  return (
    <>
      <SiteNavigation config={config} />
      <HeroSection hero={content.hero} />
      <BenefitsSection benefits={content.benefits} />
      {content.comparison && <ComparisonTable comparison={content.comparison} promoCode="self-storage2026" />}
      <ServicesSection services={content.services} />
      {content.difference && <DifferenceSection difference={content.difference} />}
      {content.trustSignals && <TrustBadgesSection trustSignals={content.trustSignals} />}
      <FAQSection faq={content.faq} />
      <SiteFooter config={config} />
    </>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
