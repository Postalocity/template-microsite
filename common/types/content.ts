/**
 * Content Type Definitions
 */

export interface CTA {
  text: string;
  subtext?: string; // Phase 3: Small text below main CTA text
  href: string;
  variant?: 'primary' | 'outline' | string; // Allow string for JSON compatibility
}

export interface HeroContent {
  headline: {
    main: string;
    highlightTerm: string; // The term to wrap in gradient-text
  };
  subhead: string;
  background: {
    image?: string;
    alt?: string;
    // Phase 3: Video background support
    video?: {
      src: string;
      poster?: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
    };
  };
  ctas: CTA[];
  // Phase 3: Professional label (e.g., "Professional Grade", "Enterprise Ready")
  professionalLabel?: {
    text: string;
    largeFont?: boolean;
  };
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
    logo?: string | null; // Allow null for JSON compatibility
  };
  theme?: {
    primary?: {
      h?: number;
      s?: number;
      l?: number;
    };
    gradients?: {
      hero?: string;
      cta?: string;
    };
  };
  navigation?: {
    links?: Array<{ label: string; href: string }>;
    cta?: CTA | {
      text?: string;
      href?: string;
      variant?: string;
    };
    // Phase 4: Navigation dropdown menus
    serviceLinks?: Array<{ label: string; href: string }>;
    companyLinks?: Array<{ label: string; href: string }>;
  };
  content: SectionContent;
  footer?: FooterContent;
}

export interface Benefit {
  icon?: string; // Phase 3: Made optional - can use image instead
  image?: string; // Phase 3: Image-based benefits (icon OR image, not both)
  title: string;
  detail?: string; // Phase 3: Made optional for image-based cards
  description?: string; // Phase 3: Alternative to detail
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
  image?: string;
  href?: string;
}

export interface ServicesContent {
  section: {
    title: string;
    description: string;
    finishingNote?: string;
    cta?: {
      text: string;
      href: string;
    };
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
    cta?: {
      text: string;
      href: string;
    };
  };
  columns: {
    ourSolution: string;
    traditional: string;
  };
  rows: ComparisonRow[];
  // Phase 3: Visual chart format
  chart?: ComparisonChartData;
}

// Phase 3: Visual comparison chart
export interface ComparisonChartData {
  totalTimeInHouse: number;
  totalTimePostalocity: number;
  redBarPercentage: number;
  sections?: {
    name: string;
    inHouseTime: number;
    postalocityTime: number;
  }[];
}

// Phase 3: Standalone comparison chart content (for dedicated chart sections)
export interface ComparisonChartContent {
  section: {
    title: string;
    description?: string;
  };
  chart: ComparisonChartData;
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
  footer?: FooterContent;
  difference?: DifferenceContent;
  trustSignals?: TrustSignalsContent;
  howItWorks?: HowItWorksContent;
  // Phase 2: P1 High Priority sections (optional)
  pricing?: PricingContent;
  challenges?: ChallengesContent;
  businessContinuity?: BusinessContinuityContent;
  // Phase 3: P2 Medium Priority sections (optional)
  comparisonChart?: ComparisonChartContent;
  productsCategories?: ProductsCategoriesContent;
  // Phase 4: P4 Low Priority sections (optional)
  brandStory?: BrandStoryContent;
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
    description?: string;
  };
  signals: TrustSignal[];
}

export interface DifferenceContent {
  section: {
    title: string;
    description?: string;
  };
  background?: string;
  differences: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface HowItWorksContent {
  section?: {
    id?: string;
    title?: string;
    description?: string;
  };
  steps?: {
    number?: string;
    title: string;
    description: string;
  }[];
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
    disclaimer?: string;
  };
  description: string;
  tagline: string;
  disclaimer?: string;
  // Phase 4: Footer link sections
  links?: Array<{ label: string; href: string }>; // Legacy support
  quickLinks?: Array<{ label: string; href: string }>;
  companyLinks?: Array<{ label: string; href: string }>;
  supportLinks?: Array<{ label: string; href: string }>;
}

// =============================================================================
// PRICING TYPES
// =============================================================================

export interface PricingTier {
  name: string;
  price: number;
  description?: string;
  features: string[];
}

export interface PricingContent {
  section: {
    title: string;
    description?: string;
  };
  // Support both single pricing and tiered pricing
  startingPrice?: string;
  priceDescription?: string;
  features?: string[];
  cta?: {
    text: string;
    href: string;
    variant?: string;
  };
  disclaimer?: string;
  // Legacy tiered pricing support
  tiers?: PricingTier[];
}

// Phase 2: P1 High Priority - Challenges Section
export interface Challenge {
  icon?: string;
  title: string;
  description: string;
  metric?: string;
  impact?: string;
}

export interface ChallengesContent {
  section: {
    title: string;
    description?: string;
  };
  challenges: Challenge[];
}

// Phase 2: P1 High Priority - Business Continuity Section
export interface BusinessContinuityFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface BusinessContinuityContent {
  section: {
    title: string;
    description?: string;
  };
  features: BusinessContinuityFeature[];
  disasterRecovery?: string;
}

// Phase 3: P2 Medium Priority - Products with Categories (Odin's scent beads)
export interface ScentProduct {
  name: string;
  description?: string;
  season?: string; // e.g., "rut", "pre-rut", "year-round"
  image?: string;
}

export interface ProductCategory {
  name: string;
  description?: string;
  scents: ScentProduct[];
}

export interface ProductsCategoriesContent {
  section: {
    title: string;
    description?: string;
  };
  categories: ProductCategory[];
}

// Phase 4: P4 Low Priority - Brand Story Section
export interface TimelineEvent {
  year: string;
  event: string;
  description?: string;
}

export interface BrandStoryContent {
  section: {
    title: string;
    description?: string;
  };
  origin?: string;
  timeline?: TimelineEvent[];
  philosophy?: string;
}