/**
 * Healthcare Billing Solutions - Generated from template-microsite
 * Generated at: 2026-03-06T18:46:53.461Z
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonSection, SiteNavigation, SiteFooter } from '../../common/components/shared';
import '../../common/globals.css';
import config from './config.json';

function App() {
  const { content } = config;
  return (
    <>
      {/* @ts-ignore - config type is validated at runtime */}
      <SiteNavigation config={config} />
      {/* @ts-ignore - content.hero type is validated at runtime */}
      <HeroSection hero={content.hero} />
      {/* @ts-ignore - content.benefits type is validated at runtime */}
      <BenefitsSection benefits={content.benefits} />
      {/* @ts-ignore - content.comparison type is validated at runtime */}
      <ComparisonSection comparison={content.comparison} />
      {/* @ts-ignore - content.services type is validated at runtime */}
      <ServicesSection services={content.services} />
      {/* @ts-ignore - content.faq type is validated at runtime */}
      <FAQSection faq={content.faq} />
      {/* @ts-ignore - config type is validated at runtime */}
      <SiteFooter config={config} />
    </>
  );
}

// Initialize React
const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element not found');
}
const root = createRoot(rootEl);
root.render(<App />);
