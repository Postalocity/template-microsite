/**
 * Microsite Engine Types
 * 
 * Core types for multi-brand microsite generation.
 */

// =============================================================================
// BRAND CONFIGURATION
// =============================================================================

export interface BrandUrls {
  app: string;
  website: string;
  blog?: string;
  howWeHelp?: string;
  whoWeServe?: string;
  contact?: string;
  faq?: string;
  [key: string]: string | undefined;
}

export interface BrandLogo {
  filename: string;
  alt: string;
}

export interface BrandColors {
  primary?: { h?: number; s?: number; l?: number };
  accent?: { h?: number; s?: number; l?: number };
}

export interface BrandConfig {
  id: string;
  name: string;
  slug: string;
  domain: string;
  tagline?: string;
  urls: BrandUrls;
  logo: BrandLogo;
  colors?: BrandColors;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours?: {
    weekdays?: string;
    weekends?: string;
    support?: string;
  };
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  [key: string]: string | undefined;
}

// =============================================================================
// INSTITUTIONAL KNOWLEDGE BASE (IKB)
// =============================================================================

export interface IKBRules {
  trustSignals: string[];
  promoCodes: Record<string, string>;
  approvedSections: string[];
  blocklistedContent: string[];
  blocklistedPhrases: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  description?: string;
  features: string[];
}

export interface IKBProofOption {
  id: string;
  name: string;
  description: string;
  included?: boolean;
  additionalCost?: number;
  tier: string;
  note?: string;
}

export interface MailClassDefinition {
  name: string;
  description: string;
  hasTracking: boolean;
  hasCertificate: boolean;
  hasInsurance?: boolean;
  hasSignature?: boolean;
  allowsPersonalData: boolean;
  hipaaCompliant?: boolean;
  insuranceAmount?: number;
  restrictions?: string[];
  useCases: string[];
}

export interface CertificationDefinition {
  name: string;
  fullName: string;
  description: string;
}

export interface IKBConfig {
  rules: IKBRules;
  pricing: {
    basePrice: number;
    currency: string;
    units?: string;
    tiers?: PricingTier[];
    addOns?: Record<string, number>;
  };
  proofOptions: {
    standard: IKBProofOption[];
    upgrades: IKBProofOption[];
    comparison?: Record<string, string>;
  };
  terminology?: {
    mailClasses?: Record<string, MailClassDefinition>;
    certifications?: Record<string, CertificationDefinition>;
    industryTerms?: Record<string, string>;
  };
}

// =============================================================================
// ENGINE CONTEXT
// =============================================================================

export interface EngineContext {
  brand: BrandConfig;
  contact: ContactInfo;
  social: SocialLinks;
  ikb: IKBConfig;
}

// =============================================================================
// SITE CONTENT TYPES
// =============================================================================

export interface CTA {
  text: string;
  subtext?: string;
  href: string;
  variant?: string;
}

export interface HeroContent {
  headline: {
    main: string;
    highlightTerm: string;
  };
  subhead: string;
  background: {
    image: string;
    alt: string;
  };
  ctas: CTA[];
}

export interface FeaturesContent {
  section: {
    title: string;
    description: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface CTAContent {
  headline: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  promoCode?: string;
}

export interface PricingTier {
  name: string;
  price: number;
  description?: string;
  features: string[];
}

export interface PricingContent {
  section: {
    title: string;
    description: string;
  };
  tiers: PricingTier[];
}

export interface TrustSignalsContent {
  section: {
    title: string;
    description?: string;
  };
  badges: string[];
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

export interface FAQContent {
  section: {
    title: string;
    description: string;
  };
  faqs: Array<{
    q: string;
    a: string;
  }>;
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
}

// =============================================================================
// RESOLVED SITE CONFIG
// =============================================================================

export interface ServiceInfo {
  id: string;
  name: string;
  slug: string;
}

export interface ResolvedSiteConfig {
  brand: BrandConfig;
  contact: ContactInfo;
  social: SocialLinks;
  ikb: IKBConfig;
  service: ServiceInfo;
  content: SiteContent;
  meta?: SiteMeta;
}

export interface SiteContent {
  hero?: HeroContent;
  howItWorks?: HowItWorksContent;
  features?: FeaturesContent;
  faq?: FAQContent;
  cta?: CTAContent;
  trustSignals?: TrustSignalsContent;
  difference?: DifferenceContent;
  pricing?: PricingContent;
  footer?: FooterContent;
}

export interface SiteMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

// =============================================================================
// RE-EXPORTS FROM CONTENT.TS
// =============================================================================

export type { SiteConfig } from './content';
export type { SectionContent } from './content';
