/**
 * Content Type Definitions
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
        links?: Array<{
            label: string;
            href: string;
        }>;
        cta?: CTA | {
            text?: string;
            href?: string;
            variant?: string;
        };
        serviceLinks?: Array<{
            label: string;
            href: string;
        }>;
        companyLinks?: Array<{
            label: string;
            href: string;
        }>;
    };
    content: SectionContent;
    footer?: FooterContent;
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
        logo?: {
            src: string;
            alt: string;
            height?: number;
        };
        cta?: {
            text: string;
            href: string;
        };
        ctas?: Array<{
            text: string;
            href: string;
            variant?: string;
        }>;
    };
    benefits: Benefit[];
}
export interface Service {
    icon: string;
    title: string;
    description: string;
    image?: string;
    href?: string;
    cta?: CTA;
    logo?: {
        src: string;
        alt: string;
        height?: number;
    };
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
        ctas?: CTA[];
    };
    columns: {
        ourSolution: string;
        traditional: string;
    };
    rows: ComparisonRow[];
    chart?: ComparisonChartData;
}
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
    pricing?: PricingContent;
    challenges?: ChallengesContent;
    businessContinuity?: BusinessContinuityContent;
    comparisonChart?: ComparisonChartContent;
    productsCategories?: ProductsCategoriesContent;
    brandStory?: BrandStoryContent;
}
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
        ctas?: Array<{
            text: string;
            href: string;
            variant?: string;
        }>;
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
    links?: Array<{
        label: string;
        href: string;
    }>;
    quickLinks?: Array<{
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
        description?: string;
    };
    startingPrice?: string;
    priceDescription?: string;
    features?: string[];
    cta?: {
        text: string;
        href: string;
        variant?: string;
    };
    disclaimer?: string;
    tiers?: PricingTier[];
}
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
export interface ScentProduct {
    name: string;
    description?: string;
    season?: string;
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
//# sourceMappingURL=content.d.ts.map