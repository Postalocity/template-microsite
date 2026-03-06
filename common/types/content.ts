/**
 * Content Type Definitions
 */

export interface CTA {
  text: string;
  subtext?: string;
  href: string;
  variant?: 'primary' | 'outline';
}

export interface HeroContent {
  headline: {
    main: string;
    highlightTerm: string; // The term to wrap in gradient-text
  };
  subhead: string;
  background: {
    image: string;
    alt: string;
  };
  ctas: CTA[];
}

export interface SiteConfig {
  site: {
    id: string;
    name: string;
    slug: string;
    domain: string;
    basename: string;
    contact: {
      email: string;
      phone?: string;
      address?: string;
    };
  };
  branding: {
    tagline: string;
    logo?: string;
  };
  theme: {
    primary: {
      h: number;
      s: number;
      l: number;
    };
    gradients: {
      hero: string;
      cta: string;
    };
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
    cta?: CTA;
  };
  content: SectionContent;
  footer?: FooterContent;
}

export interface Benefit {
  icon: string;
  title: string;
  detail: string;
  metrics?: string;
}

export interface BenefitsContent {
  section: {
    title: string;
    description: string;
  };
  benefits: Benefit[];
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ServicesContent {
  section: {
    title: string;
    description: string;
  };
  services: Service[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface FAQContent {
  section: {
    title: string;
    description: string;
  };
  faqs: FAQ[];
}

export interface ComparisonRow {
  icon: string;
  feature: string;
  ourSolution: string;
  traditionalApproach: string;
}

export interface ComparisonContent {
  section: {
    title: string;
    description: string;
  };
  columns: {
    ourSolution: string;
    traditional: string;
  };
  rows: ComparisonRow[];
}

export interface SectionContent {
  hero?: HeroContent;
  benefits?: BenefitsContent;
  services?: ServicesContent;
  faq?: FAQContent;
  comparison?: ComparisonContent;
  about?: AboutContent;
  reviews?: ReviewsContent;
  caseStudies?: CaseStudiesContent;
}

// E-E-A-T: Experience - Reviews & Testimonials
export interface Review {
  name: string;
  location: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
}

export interface ReviewsContent {
  section: {
    title: string;
    description: string;
  };
  reviews: Review[];
  aggregateRating: {
    overall: number;
    total: number;
    distribution: number[];
  };
}

// E-E-A-T: Expertise - About/Team Section
export interface Expert {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  experience: string;
}

export interface Credential {
  type: 'certification' | 'accreditation' | 'license' | 'award';
  name: string;
  issuer: string;
  year?: string;
  verified?: boolean;
}

export interface AboutContent {
  section: {
    title: string;
    description: string;
  };
  company: {
    founded: string;
    teamSize: string;
    locations: string[];
  };
  mission: string;
  values: string[];
  experts: Expert[];
  credentials: Credential[];
}

// E-E-A-T: Experience + Trust - Case Studies
export interface CaseStudy {
  client: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
  metrics: {
    category: string;
    before: string;
    after: string;
    delta: string;
  }[];
  methodology: string;
  timeline: string;
  outcome: string;
  testimonial?: string;
  evidence?: {
    beforeImage?: string;
    afterImage?: string;
    documents?: string[];
  };
}

export interface CaseStudiesContent {
  section: {
    title: string;
    description: string;
  };
  caseStudies: CaseStudy[];
}

// E-E-A-T: Authoritativeness - Trust Signals
export interface TrustSignal {
  type: 'certification' | 'award' | 'partner' | 'accreditation';
  name: string;
  organization: string;
  url?: string;
  year?: string;
  verified?: boolean;
}

export interface TrustSignalsContent {
  section: {
    title: string;
    description: string;
  };
  signals: TrustSignal[];
}

// E-E-A-T: Trustworthiness - Legal Pages
export interface LegalPageContent {
  title: string;
  lastUpdated: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

export interface FooterContent {
  finalCTA: {
    headline: string;
    description: string;
    buttonText: string;
    href: string;
    promoCode?: string;
  };
  description: string;
  tagline: string;
}