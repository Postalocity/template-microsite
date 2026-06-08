/**
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Site:      real-estate
 * Brand:     Postalocity
 * Generated: 2026-05-29T15:42:00.425Z
 *
 * EDIT THE SOURCE, NOT THE OUTPUT
 * ─────────────────────────────
 * Content:   config/sites/postalocity/real-estate.json
 * Template:  scripts/generate-site.ts
 *
 * • To change content → edit the source JSON config, then regenerate
 * • To change layout  → edit the template function in generate-site.ts
 * • To add custom sections → create a new template function & add routing
 * • To share components → add to common/themes/postalocity/components/shared/
 *   Never create site-specific component files in the generated site directory
 *
 * DO NOT bypass the pre-commit hook with --no-verify
 */

import { createRoot } from 'react-dom/client';
import { Bug, Leaf, Clock, Check } from 'lucide-react';
import { HeroSection, FAQSection, ComparisonTable, TrustBadgesSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {"id":"postalocity","name":"Postalocity","slug":"postalocity","domain":"postalocity.com","tagline":"Automate Your Direct Mail","googleAnalyticsId":"G-XXXXXXXXXX","urls":{"app":"https://prod.postalocity.com/login.html","website":"https://www.postalocity.com","blog":"https://www.postalocity.com/resources/blog/","howWeHelp":"https://www.postalocity.com/how-we-help/","whoWeServe":"https://www.postalocity.com/who-we-serve/","contact":"https://www.postalocity.com/contact/","faq":"https://www.postalocity.com/resources/faq/"},"logo":{"filename":"postalocity-logo.png","alt":"Postalocity - Direct Mail Automation"},"colors":{"primary":{"h":200,"s":80,"l":30},"accent":{"h":45,"s":100,"l":50}},"howItWorks":{"section":{"id":"how-it-works","title":"How Our Real Estate Mailing Service Works","description":"Get started in minutes. Our streamlined property management mailing process eliminates manual work while providing complete documentation."},"steps":[{"number":"1","title":"Upload Your Documents","description":"Upload tenant notices, marketing postcards, or compliance letters as PDFs. Our system accepts standard formats and batch uploads for portfolio-scale mailings."},{"number":"2","title":"We Verify Every Address","description":"Each address is validated against current USPS databases using CASS-certified verification. Bad addresses are flagged before printing to prevent returned mail."},{"number":"3","title":"Professional Production & Mailing","description":"We professionally print, fold, stuff into #10 envelopes, seal, and prepare for USPS delivery. Your landlord mailing is handled with care and consistency."},{"number":"4","title":"Proof & Tracing Provided","description":"Receive a complete mailing affidavit for every letter. Upgrade to Certificate of Mailing for official USPS postmarks and delivery confirmation."}]},"difference":{"section":{"title":"The Postalocity Difference for Real Estate Professionals","description":"Why property managers, landlords, and real estate investors choose our mailing service over alternatives."},"differences":[{"icon":"shield","title":"Affidavit of Mailing. Every Letter.","description":"Every letter includes affidavit of mailing from Postalocity proving items were processed and handed to USPS. Upgrade to a Certificate of Mailing for official USPS documentation or Certified Mail for full USPS tracking with delivery confirmation."},{"icon":"eye","title":"Real-Time Dashboard","description":"Trace mailing status across your entire property portfolio."},{"icon":"map-pin","title":"USPS Address Verification Built-In","description":"Stop dealing with returned mail from bad addresses. Our CASS-certified verification catches errors before printing, reducing undeliverable mail by up to 15%."},{"icon":"clock","title":"Same-Day Processing Available","description":"Need urgent tenant notice mailing? Approve by noon CT for same-day production. Our property management mailing service keeps your critical communications on schedule. *Restrictions apply."}]},"trustSignals":{"section":{"title":"Trusted by Property Managers & Real Estate Professionals Nationwide"},"signals":["NCOA Verified 2024","CASS Certified 2024","ISO 9001 Documented Processes 2023"]},"footer":{"tagline":"Automate Your Direct Mail","links":[{"label":"Services","href":"https://www.postalocity.com/how-we-help/"},{"label":"Pricing","href":"https://www.postalocity.com/pricing/"},{"label":"Resources","href":"https://www.postalocity.com/resources/"},{"label":"Contact","href":"https://www.postalocity.com/contact/"}]}};
const contactConfig = {"phone":"316-260-2220","email":"contact@postalocity.com","address":{"street":"820 W 2nd St N","city":"Wichita","state":"KS","zip":"67203"},"hours":{"weekdays":"8:00 AM - 5:00 PM CST","support":"contact@postalocity.com"}};
const socialConfig = {"twitter":"https://twitter.com/postalocity","linkedin":"https://linkedin.com/company/postalocity","facebook":"https://facebook.com/postalocity"};

// IKB configuration (loaded from config, brand context, or defaults)
const ikbConfig = {"rules":{"trustSignals":["NCOA Verified 2024","CASS Certified 2024","ISO 9001 Documented Processes 2023"],"promoCodes":{"credit-repair":"cr2026","debt-collection":"debt2026","healthcare-billing":"hb2026","healthcare-mailing-services":"hm2026","postcard":"pc2026","self-storage":"pm2026"},"standardizedCopy":{"proofOfMailing":{"title":"Proof of Mailing (Affidavit)","description":"Documents that Postalocity processed and mailed your items."},"certificateOfMailing":{"title":"Certificate of Mailing","description":"An official USPS form with a postmark proving the item was accepted at the post office.","complianceNote":"Some states require this for lien compliance deadlines."},"uspsScanTracing":{"title":"USPS Scan Tracing (First-Class)","description":"Shows processing status — when and where your item was handled in the postal system."},"fullTracking":{"title":"Full Tracking (Certified Mail)","description":"Includes delivery confirmation and signature proof."},"envelope":{"title":"Every Letter Includes an Envelope","description":"Professionally printed, folded, stuffed, sealed, and mailed. No self-mailers or stickers."},"addressVerification":{"title":"Address Verification","description":"Addresses are verified against USPS databases before printing to reduce returned mail."}},"comparisonDefaults":{"envelope":{"ourSolution":"Included — Color Optional","traditionalApproach":"Self-mailer — No envelope"},"price":{"template":"As low as $1.31 to print, fold, stuff, seal, and apply postage — includes envelope"}},"approvedSections":["hero","howItWorks","features","faq","cta","footer","trustSignals","difference","pricing"],"blocklistedContent":["testimonial","testimonials","case-study","case-studies","video","video-content","live-chat","livechat","team","experts","award","awards","review","reviews","aggregateRating","star rating","5-star"],"blocklistedPhrases":["millions of customers","award-winning","industry-leading","world-class","cutting-edge","revolutionary","game-changing","best-in-class","proven results","guaranteed results","satisfaction guaranteed","100% accurate","zero errors","trusted by celebrities","featured in Forbes","as seen on TV","guaranteed delivery","100% delivery","verify with your legal counsel","verify with legal counsel","may meet state","may be required","legal-grade","legal grade","defensible documentation","defensible proof","defensible for compliance","legally-compliant","legally compliant"]},"pricing":{"basePrice":1.31,"currency":"USD","units":"per letter","tiers":[{"name":"Marketing Mail","price":0.244,"description":"Standard advertising mail","features":["No tracking","No personal data","Best for advertisements"]},{"name":"First-Class Mail","price":1.31,"description":"Commercial mail with tracking","features":["Tracking scans","Certificate of mailing","Personalized data allowed","HIPAA compliant"]},{"name":"Priority Mail","price":11.5,"description":"Fast delivery with full tracking","features":["Full tracking","Up to $100 insurance","Fast delivery"]},{"name":"Certified Mail","price":4.5,"description":"First-Class with signature proof","features":["Full tracking","Signature proof","Legal compliance"]}],"addOns":{"certifiedMail":4.5,"returnReceipt":3.35,"restrictedDelivery":8.5}},"proofOptions":{"standard":[{"id":"affidavit","name":"Affidavit of Service","description":"Internal processing document proving Postalocity handled your mail","included":true,"tier":"all"},{"id":"scan","name":"USPS Scan Proof","description":"Scanned barcode showing your mail entered the postal system","included":true,"tier":"first-class","note":"Available for First-Class and above"}],"upgrades":[{"id":"certificate","name":"Certificate of Mailing","description":"Official USPS form 3877 showing acceptance date","additionalCost":1.75,"tier":"first-class"},{"id":"certified","name":"Certified Mail","description":"Full tracking with signature proof of delivery","additionalCost":4.5,"tier":"first-class"},{"id":"restricted","name":"Restricted Delivery","description":"Delivery only to specified recipient","additionalCost":8.5,"tier":"certified"}],"comparison":{"affidavit":"Postalocity processed & handed to USPS","scan":"Item entered postal system","certificate":"USPS accepted item (with date)","certified":"USPS delivered (with signature)"}},"terminology":{"mailClasses":{"first-class":{"name":"First-Class Mail","description":"Commercial mail service with tracking","hasTracking":true,"hasCertificate":true,"allowsPersonalData":true,"hipaaCompliant":true,"useCases":["Bills and statements","Legal notices","HIPAA documents","Account notifications","Compliance documentation"]},"priority":{"name":"Priority Mail","description":"Expedited mail with full tracking","hasTracking":true,"hasCertificate":true,"hasInsurance":true,"allowsPersonalData":true,"insuranceAmount":100,"useCases":["Time-sensitive documents","Valuable items","Legal filings"]},"certified":{"name":"Certified Mail","description":"First-Class with signature proof","hasTracking":true,"hasCertificate":true,"hasSignature":true,"allowsPersonalData":true,"hipaaCompliant":true,"useCases":["Legal compliance","Contract notices","Evidence of delivery"]},"marketing":{"name":"Marketing Mail","description":"Standard advertising mail","hasTracking":false,"hasCertificate":false,"allowsPersonalData":false,"restrictions":["No account numbers","No balance information","No personal identifiers","No HIPAA data","Advertisements only"],"useCases":["Promotional materials","Newsletters","Catalogs","Advertising"]}},"certifications":{"ncoa":{"name":"NCOA","fullName":"National Change of Address","description":"USPS-maintained database of address changes"},"cass":{"name":"CASS","fullName":"Coding Accuracy Support System","description":"Address standardization certification"},"iso9001":{"name":"ISO 9001","fullName":"ISO 9001:2015 Quality Management","description":"International quality management standard"}},"trackingScanEvents":{"description":"USPS tracking scan events for mail piece visibility","stages":[{"stage":"received","displayName":"Accepted / Received","uspsStatuses":["Label Created, Not Yet In System","USPS Awaiting Item","Accepted at USPS Facility","Origin Acceptance","USPS In Possession of Item"],"description":"Mail piece accepted into USPS system","proofProvided":"Affidavit of Service from Postalocity"},{"stage":"processed","displayName":"Processed","uspsStatuses":["Processed at USPS Origin Facility","Arrived at USPS Facility","Departed USPS Facility","Processed at USPS Destination Facility"],"description":"Mail piece processed at USPS facilities","proofProvided":"USPS scan tracing showing processing status"},{"stage":"in_transit","displayName":"In Transit","uspsStatuses":["Departed USPS Facility","Arrived at USPS Facility","In Transit to Next Facility","Arriving Late"],"description":"Mail piece moving through postal network","proofProvided":"USPS scan tracing showing facility transfers"},{"stage":"out_for_delivery","displayName":"Out for Delivery","uspsStatuses":["Arrival at Unit","Out for Delivery","Awaiting Delivery Scan"],"description":"Mail piece at local delivery office","proofProvided":"USPS scan confirmation of delivery attempt"},{"stage":"delivered","displayName":"Delivered","uspsStatuses":["Delivered","Picked Up","Delivered to Agent"],"description":"Mail piece delivered to recipient","proofProvided":"Delivery scan with date/time (upgrade to Certified Mail for signature)"}],"trackingNotes":["All barcoded mail includes scan tracing from acceptance to delivery","Tracking updates occur at each facility scan during transit","Multiple scans can occur at each stage depending on handling","Upgrade to Priority Mail or Certified Mail for full USPS tracking with delivery confirmation"]},"industryTerms":{"mailPiece":"A single item sent through the mail","mailingList":"Collection of addresses for a mailing campaign","ndc":"Network Distribution Center","scf":"Sectional Center Facility","dsf":"Delivery Sequence File","presort":"Pre-sorted mail for discounted rates"}}};

// Get promo code from IKB for the service
const promoCode = ikbConfig.rules.promoCodes['real-estate'] || '2026';

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
        
        {/* Features Section */}
        {content.features && (
          <section id="features" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: '#1a1a1a' }}>
                  {content.features.headline}
                </h2>
                <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                  {content.features.subtitle}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {content.features.features?.map((feature: {title: string; description: string; icon?: string}, idx: number) => {
                  // Map feature titles to Lucide icons (matching live site)
                  const iconMap: Record<string, React.ElementType> = {
                    'Peak Season Protection': Bug,  // Uses bug icon, not shield
                    'Scent-Safe Formula': Leaf,
                    'Long-Lasting Barrier': Clock,
                    'EPA-Registered': Check,
                  };
                  const IconComponent = iconMap[feature.title] || Check;
                  return (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-md text-center border border-gray-200">
                      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ color: '#2d5a3d' }}>
                        <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl uppercase mb-2" style={{ color: '#1a1a1a' }}>
                        {feature.title}
                      </h3>
                      <p className="font-body text-sm" style={{ color: '#666' }}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        
        {/* Dynamic content sections - only render if data exists */}
        {content.introduction && (
          <section id="introduction" className="section-padding" style={{ background: '#f8f9fa' }}>
            <div className="section-container">
              <div className="text-center max-w-3xl mx-auto">
                <p className="font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.introduction.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content['why-odins'] && (
          <section id="why-odins" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content['why-odins'].headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content['why-odins'].items?.map((item: string, idx: number) => (
                  <div key={idx} className="p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p className="font-body text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.detection && (
          <section id="detection" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.detection.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding the three-stage targeting process
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {['CO₂ Detection', 'Skin Chemistry', 'Body Heat'].map((stage, idx) => (
                  <div key={idx} className="text-center p-6">
                    <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'hsl(var(--primary))' }}>
                      STAGE {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-display text-xl uppercase mb-2">{stage}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.application && (
          <section id="application" className="section-padding" style={{ background: '#1a1d29' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.application.headline}
                </h2>
                {content.application.note && (
                  <p className="font-body text-sm text-gray-400 italic">{content.application.note}</p>
                )}
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                {content.application.steps?.map((step: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg flex-shrink-0" style={{ background: 'hsl(var(--primary))', color: 'white' }}>
                      {idx + 1}
                    </div>
                    <p className="font-body text-white text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.blinds && (
          <section id="blinds" className="section-padding" style={{ background: '#f5f5f5' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.blinds.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.blinds.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.layered && (
          <section id="layered" className="section-padding" style={{ background: '#1e212b' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-white">
                  {content.layered.headline}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {['Weatherproof Formula', 'Polymer Technology', 'Easy Storage'].map((item, idx) => (
                  <div key={idx} className="p-6 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h3 className="font-display text-xl uppercase mb-2 text-white">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {content.turkey && (
          <section id="turkey" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.turkey.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.turkey.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.comparison && <ComparisonTable comparison={content.comparison} promoCode={promoCode} />}
        
        {content.howItWorks && (
          <section id="how-it-works" className="section-padding" style={{ background: 'hsl(var(--background))' }}>
            <div className="section-container">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {content.howItWorks.headline}
                </h2>
                <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                  {content.howItWorks.body}
                </p>
              </div>
            </div>
          </section>
        )}
        
        {content.faq && <FAQSection faq={content.faq} />}
        
        <SiteFooter config={config} />
        {navCta && <FloatingCTA href={navCta.href} text={navCta.text} />}
      </BrandProvider>
    </IKBProvider>
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
 root.render(<App />);
