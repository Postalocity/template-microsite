/**
 * Custom Carbonless Forms — Broadstroke, Inc.
 * Generated from template-microsite
 * Brand: Broadstroke
 */

import { createRoot } from 'react-dom/client';
import { HeroSection, BenefitsSection, ServicesSection, FAQSection, ComparisonTable, HowItWorksSection, DifferenceSection, TrustBadgesSection, TestimonialsSection } from '@/components/shared';
import SiteNavigation from '@/components/shared/SiteNavigation';
import SiteFooter from '@/components/shared/SiteFooter';
import FloatingCTA from '@/components/shared/FloatingCTA';
import { BrandProvider } from '@/contexts/BrandContext';
import { IKBProvider } from '@/contexts/IKBContext';
import '@/globals.css';
import config from './config.json';

// Brand configuration (from BrandContext defaults)
const brandConfig = {
  "id": "broadstroke",
  "name": "Broadstroke",
  "slug": "carbonless-forms",
  "domain": "broadstrokeinc.com",
  "tagline": "Print. Mail. Promo. One Call.",
  "googleAnalyticsId": "G-9HXQD6LYZ4",
  "urls": {
    "app": "https://prod.postalocity.com/login.html",
    "website": "https://www.broadstrokeinc.com",
    "blog": "https://broadstrokeinc.com/about/blogs/",
    "howWeHelp": "https://broadstrokeinc.com/",
    "whoWeServe": "https://broadstrokeinc.com/about/",
    "contact": "https://broadstrokeinc.com/contact/",
    "faq": "https://broadstrokeinc.com/resources/"
  },
  "logo": {
    "filename": "logo.png",
    "darkFilename": "logo-dark.png",
    "alt": "Broadstroke - Print, Mail, Promo"
  },
  "colors": {
    "primary": {
      "h": 200,
      "s": 80,
      "l": 30
    },
    "accent": {
      "h": 45,
      "s": 100,
      "l": 50
    }
  },
  "howItWorks": {
    "section": {
      "id": "how-it-works",
      "title": "How It Works",
      "description": "Broadstreamlines custom carbonless form production from design through finishing with concierge service that saves you hours."
    },
    "steps": [
      {
        "number": "01",
        "title": "Design",
        "description": "Share your form requirements, branding, and layout needs. We'll recommend the best paper options and finishing for your specific use case."
      },
      {
        "number": "02",
        "title": "Produce",
        "description": "We create or refine your designs, provide proofs for approval, then print your carbonless forms with precision alignment and quality control."
      },
      {
        "number": "03",
        "title": "Finish",
        "description": "Professional finishing services including numbering, padding, and packaging. Optional fulfillment and distribution available through our integrated mailing services."
      }
    ]
  },
  "difference": {
    "section": {
      "title": "Why Businesses Choose Broadstroke",
      "description": "Organizations nationwide trust Broadstroke for custom carbonless forms because we deliver more than just printing — we provide a true one-stop concierge solution."
    },
    "differences": [
      {
        "icon": "zap",
        "title": "One-Stop Convenience",
        "description": "From design to finishing to optional fulfillment, one dedicated team handles your entire project without coordination headaches."
      },
      {
        "icon": "shield",
        "title": "Proven Quality",
        "description": "45+ years of printing expertise with strict quality control. Every form set is inspected for proper alignment and clean transfer."
      },
      {
        "icon": "package",
        "title": "Integrated Services",
        "description": "Seamless integration with mailing and fulfillment through Postalocity. Forms can be distributed automatically to multiple locations."
      }
    ]
  },
  "trustSignals": [
    "45+ Years of Printing Expertise",
    "Nationwide Shipping",
    "Custom Design Services",
    "Variable Data Printing"
  ],
  "footer": {
    "tagline": "Your one-stop-shop for all things print, mail and promo.",
    "taglineSecondary": "No project is too big or too small",
    "links": [
      {
        "label": "Send Your Files",
        "href": "https://broadstrokeinc.com/business-forms/#file-upload"
      },
      {
        "label": "Print",
        "href": "https://broadstrokeinc.com/commercial-printing/"
      },
      {
        "label": "Mail",
        "href": "https://broadstrokeinc.com/mailing/"
      },
      {
        "label": "Promo",
        "href": "https://www.broadstrokepromos.com/"
      },
      {
        "label": "Business Forms",
        "href": "https://broadstrokeinc.com/business-forms/"
      },
      {
        "label": "Contact",
        "href": "https://broadstrokeinc.com/contact/"
      }
    ],
    "companyLinks": [
      {
        "label": "About",
        "href": "https://broadstrokeinc.com/about/"
      },
      {
        "label": "Our Work",
        "href": "https://broadstrokeinc.com/our-work/"
      },
      {
        "label": "Blog",
        "href": "https://broadstrokeinc.com/about/blogs/"
      },
      {
        "label": "Careers",
        "href": "https://broadstrokeinc.com/careers/"
      }
    ]
  }
};

const contactConfig = {
  "phone": "316-262-3333",
  "email": "orders@broadstrokeinc.com",
  "address": {
    "street": "820 W 2nd St N",
    "city": "Wichita",
    "state": "KS",
    "zip": "67203"
  },
  "hours": {
    "weekdays": "8:00 AM - 5:00 PM CST",
    "support": "orders@broadstrokeinc.com"
  }
};

const socialConfig = {
  "linkedin": "https://www.linkedin.com/company/broadstrokeinc",
  "facebook": "https://www.facebook.com/Broadstrokeinc",
  "instagram": "https://www.instagram.com/broadstrokeinc",
  "tiktok": "https://www.tiktok.com/@broadstrokeinc",
  "pinterest": "https://www.pinterest.com/broadstrokeinc/",
  "youtube": "https://www.youtube.com/channel/UCd7KyDkDwi9hsA1ozODFQQQ"
};

// IKB configuration with promo codes
const ikbConfig = {
  rules: {
    trustSignals: [
      '45+ Years of Printing Expertise',
      'Nationwide Shipping Available',
      'Custom Design Services Included',
    ],
    promoCodes: {
      'carbonless-forms': 'forms2026',
      'business-forms': 'forms2026',
      'printing': 'print2026',
    },
    approvedSections: ['hero', 'howItWorks', 'features', 'faq', 'cta', 'footer', 'trustSignals', 'difference', 'benefits'],
    blocklistedContent: ['video', 'live-chat', 'team', 'experts', 'award', 'awards', 'review', 'reviews'],
    blocklistedPhrases: ['millions of customers', 'award-winning', 'industry-leading', 'guaranteed delivery', '100% accurate'],
  },
  pricing: {
    basePrice: 0.15,
    currency: 'USD',
    units: 'form',
    addOns: {
      'numbering': 0.05,
      'padding': 0.10,
      'variable-data': 0.15,
    },
  },
  support: {
    phone: '316-262-3333',
    email: 'orders@broadstrokeinc.com',
    hours: '8:00 AM - 5:00 PM CST',
  },
};

const navCta = { text: 'Order Now', href: 'https://broadstrokeinc.com/business-forms/#order-form' };

// Types
interface Content {
  hero?: {
    headline?: { main?: string; highlightTerm?: string };
    subhead?: string;
    background?: { image?: string; alt?: string };
    ctas?: Array<{ text: string; href: string; variant?: string }>;
  };
  benefits?: {
    section?: { title?: string; description?: string };
    benefits?: Array<{ icon?: string; title: string; description?: string; detail?: string; metrics?: string }>;
  };
  comparison?: {
    headline?: string;
    columns?: { traditional: string; ourSolution: string };
    rows?: Array<{ icon?: string; feature: string; traditionalApproach: string; ourSolution: string }>;
  };
  services?: {
    section?: { title?: string; description?: string };
    services?: Array<{ icon?: string; title: string; description: string; image?: string; href?: string }>;
  };
  howItWorks?: {
    section?: { id?: string; title?: string; description?: string };
    steps?: Array<{ number?: string; title: string; description: string }>;
  };
  difference?: {
    section?: { title?: string; description?: string };
    differences?: Array<{ icon?: string; title: string; description: string }>;
  };
  trustSignals?: string[];
  faq?: {
    headline?: string;
    items?: Array<{ question: string; answer: string }>;
  };
  footer?: {
    finalCTA?: { headline?: string; description?: string; buttonText?: string; href?: string };
  };
}

// App component
const App = () => {
  const content = config.content as Content;

  return (
    <IKBProvider config={ikbConfig}>
      <BrandProvider brand={brandConfig} contact={contactConfig} social={socialConfig}>
        <SiteNavigation config={config} cta={navCta} />
        
        {/* CarbonlessUSA Logo - Centered above hero */}
        <div className="bg-background pt-8 pb-4">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="https://broadstrokeinc.com/wp-content/uploads/CarbonlessUSA-logo.png" 
              alt="CarbonlessUSA.com"
              className="h-16 md:h-20 mx-auto"
            />
          </div>
        </div>
        
        <HeroSection hero={content.hero} />
        <BenefitsSection benefits={content.benefits} />
        <ServicesSection services={content.services} />
        {content.comparison && <ComparisonTable comparison={content.comparison} />}
        {content.howItWorks ? <HowItWorksSection howItWorks={content.howItWorks} /> : <HowItWorksSection />}
        {content.difference ? <DifferenceSection difference={content.difference} /> : <DifferenceSection />}
        {content.trustSignals ? <TrustBadgesSection trustSignals={content.trustSignals} /> : <TrustBadgesSection />}
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
