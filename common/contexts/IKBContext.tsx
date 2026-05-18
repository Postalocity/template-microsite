/**
 * IKB Context (Institutional Knowledge Base)
 * 
 * Provides institutional knowledge to components - preventing AI hallucination
 * by grounding content in verified business rules and data.
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { IKBConfig, IKBRules } from '../types/engine';

// Use the single source of truth for phrase/content checking
import { isPhraseAllowed as isPhraseAllowedPure, isContentAllowed as isContentAllowedPure } from '../../packages/validation/src/index.js';

// =============================================================================
// DEFAULT IKB VALUES (Postalocity)
// =============================================================================

export const defaultIKBConfig: IKBConfig = {
  rules: {
    trustSignals: [
      'NCOA Verified 2024',
      'CASS Certified 2024', 
      'ISO 9001 Documented Processes 2023',
    ],
    promoCodes: {
      'credit-repair': 'cr2026',
      'debt-collection': 'debt2026',
      'healthcare-billing': 'hb2026',
      'healthcare-mailing-services': 'hm2026',
      'postcard': 'pc2026',
      'self-storage': 'pm2026',
    },
    approvedSections: [
      'hero',
      'howItWorks',
      'features',
      'faq',
      'cta',
      'footer',
      'trustSignals',
      'difference',
      'pricing',
    ],
    blocklistedContent: [
      'testimonial',
      'testimonials',
      'case-study',
      'case-studies',
      'video',
      'video-content',
      'live-chat',
      'livechat',
      'team',
      'experts',
      'award',
      'awards',
      'review',
      'reviews',
      'aggregateRating',
      'star rating',
      '5-star',
    ],
    blocklistedPhrases: [
      'millions of customers',
      'award-winning',
      'industry-leading',
      'world-class',
      'cutting-edge',
      'revolutionary',
      'game-changing',
      'best-in-class',
      'proven results',
      'guaranteed results',
      'satisfaction guaranteed',
      '100% accurate',
      'zero errors',
      'trusted by celebrities',
      'featured in Forbes',
      'as seen on TV',
      'guaranteed delivery',
      '100% delivery',
    ],
  },
  pricing: {
    basePrice: 0.69,
    currency: 'USD',
    units: 'per piece',
    addOns: {
      'certified-mail': 4.15,
      'return-receipt': 3.50,
      'ncoa-verification': 0.05,
      'address-verification': 0.02,
    },
  },
  proofOptions: {
    standard: [
      {
        id: 'usps-photo',
        name: 'USPS Photo',
        description: 'Photo of mailpiece delivered by carrier',
        tier: 'included',
        note: 'Automatically included with every mailing',
      },
    ],
    upgrades: [
      {
        id: 'certified-mail',
        name: 'Certified Mail',
        description: 'Track and confirm delivery with signature',
        tier: 'optional',
        additionalCost: 4.15,
        note: 'Recommended for important documents',
      },
      {
        id: 'electronic-return-receipt',
        name: 'Electronic Return Receipt',
        description: 'Digital signature confirmation via email',
        tier: 'optional',
        additionalCost: 3.50,
      },
    ],
  },
  terminology: {
    mailClasses: {
      'first-class': {
        name: 'First-Class Mail',
        description: 'Standard USPS mail service for letters and packages',
        hasTracking: true,
        hasCertificate: false,
        allowsPersonalData: true,
        useCases: ['letters', 'invoices', 'statements', 'personal correspondence'],
      },
      'marketing-mail': {
        name: 'Marketing Mail',
        description: 'Cost-effective bulk mailing for businesses',
        hasTracking: false,
        hasCertificate: false,
        allowsPersonalData: true,
        useCases: ['promotional materials', ' catalogs', 'newsletters'],
      },
      'parcel-select': {
        name: 'Parcel Select',
        description: 'Ground shipping for packages',
        hasTracking: true,
        hasCertificate: false,
        hasInsurance: true,
        allowsPersonalData: true,
        useCases: ['packages', 'shipping', 'fulfillment'],
      },
    },
    certifications: {
      'ncov': {
        name: 'NCOA',
        fullName: 'National Change of Address',
        description: 'Address verification service that updates outdated addresses',
      },
      'cass': {
        name: 'CASS',
        fullName: 'Coding Accuracy Support System',
        description: 'USPS-certified address standardization',
      },
    },
  },
};

// =============================================================================
// CONTEXT TYPES
// =============================================================================

export interface IKBContextValue {
  ikb: IKBConfig;
  rules: IKBRules;
  getPromoCode: (serviceSlug: string) => string | undefined;
  getTrustSignals: () => string[];
  isContentAllowed: (contentType: string) => boolean;
  isPhraseAllowed: (phrase: string) => boolean;
}

const IKBContext = createContext<IKBContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

export interface IKBProviderProps {
  ikb?: IKBConfig;
  children: React.ReactNode;
}

export function IKBProvider({ ikb = defaultIKBConfig, children }: IKBProviderProps): JSX.Element {
  const value = useMemo<IKBContextValue>(() => ({
    ikb,
    rules: ikb.rules,
    getPromoCode: (serviceSlug: string) => ikb.rules.promoCodes[serviceSlug],
    getTrustSignals: () => ikb.rules.trustSignals,
    isContentAllowed: (contentType: string) => isContentAllowedPure(contentType, ikb.rules),
    isPhraseAllowed: (phrase: string) => isPhraseAllowedPure(phrase, ikb.rules),
  }), [ikb]);

  return (
    <IKBContext.Provider value={value}>
      {children}
    </IKBContext.Provider>
  );
}

// =============================================================================
// HOOKS
// =============================================================================

export function useIKB(): IKBContextValue {
  const context = useContext(IKBContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('IKBContext not provided. Wrap your app with IKBProvider.');
    }
    // Return defaults in production
    console.warn('[IKBContext] Not provided, using default values');
    return getDefaultIKBContext();
  }

  return context;
}

export function useIKBRules(): IKBRules {
  const { rules } = useIKB();
  return rules;
}

export function useTrustSignals(): string[] {
  const { getTrustSignals } = useIKB();
  return getTrustSignals();
}

export function usePromoCodeFromIKB(serviceSlug: string): string | undefined {
  const { getPromoCode } = useIKB();
  return getPromoCode(serviceSlug);
}

export function useIKBPricing() {
  const { ikb } = useIKB();
  return ikb.pricing;
}

export function useIKBTerminology() {
  const { ikb } = useIKB();
  return ikb.terminology;
}

// =============================================================================
// DEFAULT CONTEXT
// =============================================================================

export function getDefaultIKBContext(): IKBContextValue {
  const rules = defaultIKBConfig.rules;
  return {
    ikb: defaultIKBConfig,
    rules,
    getPromoCode: (serviceSlug: string) => rules.promoCodes[serviceSlug],
    getTrustSignals: () => rules.trustSignals,
    isContentAllowed: (contentType: string) => isContentAllowedPure(contentType, rules),
    isPhraseAllowed: (phrase: string) => isPhraseAllowedPure(phrase, rules),
  };
}
