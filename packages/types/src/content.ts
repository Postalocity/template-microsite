/**
 * Content Type Definitions - Centralized in @microsite/types
 */

export interface CTA {
  text: string;
  subtext?: string;
  href: string;
  variant?: 'primary' | 'outline' | string;
}

export interface HeroContent {
  headline: {
    main: string;
    highlightTerm: string;
  };
  subhead: string;
  background: {
    image?: string;
    alt?: string;
    video?: {
      src: string;
      poster?: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
    };
  };
  ctas: CTA[];
  professionalLabel?: {
    text: string;
    largeFont?: boolean;
  };
  logo?: {
    src: string;
    alt: string;
    height?: number;
    align?: 'left' | 'center';
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
    logo?: string | null;
  };
  theme?: any;
  navigation?: any;
  content: any;
  footer?: any;
}

export interface Benefit {
  icon?: string;
  image?: string;
  title: string;
  detail?: string;
  description?: string;
  metrics?: string;
}

export interface BenefitsContent {
  section: {
    title: string;
    description: string;
  };
  benefits: Benefit[];
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

export interface DifferenceContent {
  section: {
    title: string;
    description: string;
  };
  differences: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

export interface HowItWorksContent {
  section: {
    title: string;
    description: string;
  };
  steps: Array<{
    number?: string;
    title: string;
    description: string;
    detail?: string;
  }>;
}

export interface FooterContent {
  tagline?: string;
  taglineSecondary?: string;
  description?: string;
  links?: Array<{ label: string; href: string }>;
  companyLinks?: Array<{ label: string; href: string }>;
  supportLinks?: Array<{ label: string; href: string }>;
  logoSize?: string;
}

export interface PricingTier {
  name: string;
  price: number | string;
  description?: string;
  features?: string[];
  cta?: string;
  popular?: boolean;
}

export interface PricingContent {
  section: {
    title: string;
    description: string;
  };
  basePrice?: number;
  currency?: string;
  tiers?: PricingTier[];
}

export interface SectionContent {
  hero?: HeroContent;
  benefits?: BenefitsContent;
  howItWorks?: HowItWorksContent;
  faq?: FAQContent;
  difference?: DifferenceContent;
  pricing?: PricingContent;
  [key: string]: any;
}
