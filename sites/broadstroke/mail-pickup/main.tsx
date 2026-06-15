/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      mail-pickup
 * Brand:     Broadstroke
 * Generated: 2026-06-09T13:29:43.010Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/broadstroke/mail-pickup.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/broadstroke/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, DifferenceSection, TrustBadgesSection, HowItWorksSection, TestimonialsSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"broadstroke","name":"Broadstroke","slug":"broadstroke","domain":"broadstrokeinc.com","tagline":"Your One-Stop-Shop for Print, Mail & Promo","googleAnalyticsId":"G-9HXQD6LYZ4","urls":{"app":"https://prod.postalocity.com/login.html","website":"https://www.broadstrokeinc.com","blog":"https://broadstrokeinc.com/about/blogs/","howWeHelp":"https://broadstrokeinc.com/","whoWeServe":"https://broadstrokeinc.com/about/","contact":"https://broadstrokeinc.com/contact/","faq":"https://broadstrokeinc.com/resources/"},"logo":{"filename":"logo.png","darkFilename":"logo-dark.png","alt":"Broadstroke - Print, Mail, Promo"},"colors":{"primary":{"h":200,"s":80,"l":30},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"Mail Pickup Workflow","description":"Simple daily mail pickup that saves you time — from collection through presort processing to prompt USPS delivery."},"steps":[{"number":"01","title":"Pickup","description":"We'll supply trays and add your business to the pickup schedule for our mail route, notifying you of when you can expect mail pickup. Need some flexibility or different time for pickup? Reach out and we'll coordinate a consistent time to ensure that your mail gets to the post office every day."},{"number":"02","title":"Collect & Process","description":"We collect your mail daily, apply presort postage where applicable, and ensure proper sorting for all mail classes."},{"number":"03","title":"Deliver to USPS","description":"Your mail is delivered to the post office same day. We handle all the logistics so you can focus on your business."}]},"difference":{"section":{"title":"The Broadstroke Difference","description":"Businesses in the Wichita Kansas area trust Broadstroke for mail pickup because we deliver more than just daily collection — we provide a true one-stop concierge solution for print, mail, and promo."},"differences":[{"icon":"zap","title":"Operational Efficiency","description":"One experienced team handles more than just mail pickup! Broadstroke offers everything from design to printing, mailing, and promotions. No more juggling multiple vendors—our concierge approach coordinates every step of your project seamlessly."},{"icon":"truck","title":"Pickup, Print & Promo in One Visit","description":"When we pick up your mail, we can also deliver your completed print jobs or promotional products at the same time. It's the convenience of one stop, one team, one call—eliminating extra trips and vendor coordination."},{"icon":"shield","title":"Presort Postage Expertise","description":"As a member of the National Association of Presort Mailers (NAPM), Broadstroke applies presort rates to eligible pieces with no markup, helping you qualify for discounted postage while maintaining full USPS compliance."}]},"testimonials":[{"quote":"We've had a great working relationship with Broadstroke for almost 30 years. Communication with them is always quick and easy, and they consistently produce our products on or before the requested deadlines. Their work quality is also exceptional. Highly recommend!","attribution":"Eric McCluer","title":"Owner","company":"Talent On Parade, LLC"}],"trustSignals":["60+ Years of Experience","USPS Verified Processing","Presort Postage Rates"],"footer":{"tagline":"Your one-stop-shop for all things print, mail and promo.","taglineSecondary":"No project is too big or too small","links":[{"label":"Print","href":"https://broadstrokeinc.com/commercial-printing/"},{"label":"Mail","href":"https://broadstrokeinc.com/mailing/"},{"label":"Mail Pickup","href":"https://broadstrokeinc.com/mail-pickup/"},{"label":"Promo","href":"/promo"},{"label":"Wide Format","href":"https://broadstrokeinc.com/wide-format/"},{"label":"Postalocity","href":"https://www.postalocity.com/"},{"label":"Business Forms","href":"https://broadstrokeinc.com/business-forms/"},{"label":"Technology","href":"https://broadstrokeinc.com/technology/"}],"companyLinks":[{"label":"About","href":"https://broadstrokeinc.com/about/"},{"label":"Our Work","href":"https://broadstrokeinc.com/our-work/"},{"label":"Blog","href":"https://broadstrokeinc.com/about/blogs/"},{"label":"Careers","href":"https://broadstrokeinc.com/careers/"},{"label":"Contact","href":"https://broadstrokeinc.com/contact/"}]}};
const contactConfig = {"phone":"316-262-3333","email":"info@broadstrokeinc.com","address":{"street":"820 W 2nd St N","city":"Wichita","state":"KS","zip":"67203"},"hours":{"weekdays":"8:00 AM - 5:00 PM CST","support":"info@broadstrokeinc.com"}};
const socialConfig = {"twitterHandle":"@broadstrokeinc","linkedin":"https://www.linkedin.com/company/broadstrokeinc","facebook":"https://www.facebook.com/Broadstrokeinc","instagram":"https://www.instagram.com/broadstrokeinc","tiktok":"https://www.tiktok.com/@broadstrokeinc","pinterest":"https://www.pinterest.com/broadstrokeinc/","youtube":"https://www.youtube.com/channel/UCd7KyDkDwi9hsA1ozODFQQQ"};

// IKB configuration with promo codes
const ikbConfig = {"rules":{"trustSignals":["NCOA Verified 2024","CASS Certified 2024","ISO 9001 Documented Processes 2023"],"promoCodes":{"credit-repair":"cr2026","debt-collection":"debt2026","healthcare-billing":"hb2026","healthcare-mailing-services":"hm2026","postcard":"pc2026","self-storage":"pm2026"},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","video","live-chat","team","experts","award","awards","review","reviews"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","guaranteed delivery","100% accurate"]},"pricing":{"basePrice":1.31,"currency":"USD","units":"letter","addOns":{"certified-mail":4.5,"return-receipt":3.35,"ncoa-verification":0.05,"address-verification":0.02}},"proofOptions":{"standard":[{"id":"usps-photo","name":"USPS Photo","description":"Photo of mailpiece delivered by carrier","tier":"included"}],"upgrades":[{"id":"certified-mail","name":"Certified Mail","description":"Track and confirm delivery with signature","tier":"optional","additionalCost":4.15},{"id":"electronic-return-receipt","name":"Electronic Return Receipt","description":"Digital signature confirmation via email","tier":"optional","additionalCost":3.5}]},"terminology":{"mailClasses":{"first-class":{"name":"First-Class Mail","description":"Standard USPS mail service","hasTracking":true,"hasCertificate":false,"allowsPersonalData":true,"useCases":["letters","invoices"]},"marketing-mail":{"name":"Marketing Mail","description":"Cost-effective bulk mailing","hasTracking":false,"hasCertificate":false,"allowsPersonalData":true,"useCases":["promotional"]}},"certifications":{"ncov":{"name":"NCOA","fullName":"National Change of Address","description":"Address verification service"},"cass":{"name":"CASS","fullName":"Coding Accuracy Support System","description":"USPS-certified address standardization"}}}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['mail-pickup'] || '2026';

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
        <ServicesSection services={content.services} />
        <BenefitsSection benefits={content.benefits} />
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
        {content.testimonials && content.testimonials.length > 0 && <TestimonialsSection />}
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
