/**
 * Debt Collection Mailing Service - Generated from template-microsite
 * Generated at: 2026-03-17T15:05:26.966Z
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection } from '../common/components/shared';
import SiteNavigation from '../common/components/shared/SiteNavigation';
import SiteFooter from '../common/components/shared/SiteFooter';
import '../common/globals.css';
import config from './config.json';

// Promo code mapping for each site
const promoCodeMap: Record<string, string> = {
  'credit-repair': 'cr2026',
  'debt-collection': 'debt2026',
  'healthcare-billing': 'hb2026',
  'healthcare-mailing-services': 'hm2026',
  'postcard': 'pc2026',
  'self-storage': 'pm2026',
};

function App() {
  const { content } = config;
  const promoCode = promoCodeMap['debt-collection'] || '2026';
  return (
    <>
      <SiteNavigation config={config} />
      <HeroSection hero={content.hero} />
      <BenefitsSection benefits={content.benefits} />
      {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
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
