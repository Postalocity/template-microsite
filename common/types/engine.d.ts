/**
 * Microsite Engine Types
 *
 * Core types for multi-brand microsite generation.
 */
import type { HeroContent, FAQContent, DifferenceContent, HowItWorksContent, FooterContent, PricingTier, PricingContent } from './content';
export type { CTA, HeroContent, FAQContent, DifferenceContent, HowItWorksContent, FooterContent, PricingTier, PricingContent, SiteConfig, SectionContent, } from './content';
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
    url?: string;
    faviconUrl?: string;
    filename: string;
    darkFilename?: string;
    alt: string;
}
export interface BrandColors {
    primary?: {
        h?: number;
        s?: number;
        l?: number;
    };
    accent?: {
        h?: number;
        s?: number;
        l?: number;
    };
}
export interface BrandConfig {
    id: string;
    name: string;
    slug: string;
    domain: string;
    tagline?: string;
    googleAnalyticsId?: string;
    urls: BrandUrls;
    logo: BrandLogo;
    colors?: BrandColors;
    howItWorks?: {
        section?: {
            id?: string;
            title?: string;
            description?: string;
        };
        steps?: Array<{
            number?: string;
            title: string;
            description: string;
        }>;
    };
    difference?: {
        section?: {
            title?: string;
            description?: string;
        };
        differences?: Array<{
            icon?: string;
            title: string;
            description: string;
        }>;
    };
    testimonials?: Array<{
        quote: string;
        attribution: string;
    }>;
    trustSignals?: string[];
    footer?: {
        tagline?: string;
        taglineSecondary?: string;
        description?: string;
        links?: Array<{
            label: string;
            href: string;
        }>;
        companyLinks?: Array<{
            label: string;
            href: string;
        }>;
        supportLinks?: Array<{
            label: string;
            href: string;
        }>;
        logoSize?: string;
    };
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
export interface IKBRules {
    trustSignals: string[];
    promoCodes: Record<string, string>;
    approvedSections: string[];
    blocklistedContent: string[];
    blocklistedPhrases: string[];
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
export interface EngineContext {
    brand: BrandConfig;
    contact: ContactInfo;
    social: SocialLinks;
    ikb: IKBConfig;
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
export interface TrustSignalsContent {
    section: {
        title: string;
        description?: string;
    };
    badges: string[];
}
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
//# sourceMappingURL=engine.d.ts.map