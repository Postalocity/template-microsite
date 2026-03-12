/**
 * Postalocity Postcard - Generated from template-microsite
 * Generated at: 2026-03-12T16:45:19.261Z
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable } from '../common/components/shared';
import SiteNavigation from '../common/components/shared/SiteNavigation';
import SiteFooter from '../common/components/shared/SiteFooter';
import { PostcardFront, PostcardBack } from '../common/components/postcard';
import '../common/globals.css';
import '../common/components/postcard/Postcard.css';
import config from './config.json';

function App() {
  const { content } = config;
  return (
    <>
      <SiteNavigation config={config} />
      <HeroSection hero={content.hero} />
      <BenefitsSection benefits={content.benefits} />
      <ServicesSection services={content.services} />
      
      {/* Postcard Preview Section */}
      <section id="postcard" className="section-padding bg-background">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Free Conference Follow-Up Postcard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download a print-ready postcard to follow up with your conference connections. 
              Simply print, write your message, and mail!
            </p>
            <a 
              href="/postcard/print.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              Print / Download Postcard
            </a>
          </div>
          
          {/* Postcard Preview */}
          <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
            <PostcardFront />
            <PostcardBack />
          </div>
        </div>
      </section>
      
      <FAQSection faq={content.faq} />
      <SiteFooter config={config} />
    </>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
