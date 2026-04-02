/**
 * Brand Context
 * 
 * Provides brand-specific configuration to all components.
 * This enables multi-brand support by abstracting brand identity
 * from component implementations.
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { 
  BrandConfig as EngineBrandConfig,
  BrandUrls as EngineBrandUrls,
  ContactInfo as EngineContactInfo,
  SocialLinks as EngineSocialLinks,
} from '../types/engine';

// Re-export types from engine.ts as single source of truth
export type BrandUrls = EngineBrandUrls;
export type BrandConfig = EngineBrandConfig;
export type BrandContact = EngineContactInfo;
export type BrandSocial = EngineSocialLinks;

export interface BrandContextValue {
  brand: BrandConfig;
  contact: BrandContact;
  social: BrandSocial;
  promoCode?: string;
}

// =============================================================================
// CONTEXT
// =============================================================================

const BrandContext = createContext<BrandContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

export interface BrandProviderProps {
  brand: BrandConfig;
  contact: BrandContact;
  social?: BrandSocial;
  promoCode?: string;
  children: React.ReactNode;
}

export function BrandProvider({
  brand,
  contact,
  social = {},
  promoCode,
  children,
}: BrandProviderProps) {
  const value = useMemo<BrandContextValue>(
    () => ({
      brand,
      contact,
      social,
      promoCode,
    }),
    [brand, contact, social, promoCode]
  );

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useBrand(): BrandContextValue {
  const context = useContext(BrandContext);

  if (!context) {
    // Fail fast in development to catch missing BrandProvider
    if (process.env.NODE_ENV === 'development') {
      throw new Error(
        'BrandContext not provided. Wrap your app with BrandProvider or ensure the site generator includes BrandProvider.'
      );
    }
    // In production, return empty context (not brand-specific)
    console.error('[BrandContext] FATAL: Brand context missing. Site cannot render correctly.');
    return getEmptyBrandContext();
  }

  return context;
}

// =============================================================================
// DEFAULT VALUES (Postalocity - for backward compatibility)
// =============================================================================

export function getDefaultBrandContext(): BrandContextValue {
  return {
    brand: {
      id: 'postalocity',
      name: 'Postalocity',
      slug: 'postalocity',
      domain: 'postalocity.com',
      tagline: 'Automate Your Direct Mail',
      urls: {
        app: 'https://prod.postalocity.com/login.html',
        website: 'https://www.postalocity.com',
        blog: 'https://www.postalocity.com/resources/blog/',
        howWeHelp: 'https://www.postalocity.com/how-we-help/',
        whoWeServe: 'https://www.postalocity.com/who-we-serve/',
        contact: 'https://www.postalocity.com/contact/',
        faq: 'https://www.postalocity.com/resources/faq/',
      },
      logo: {
        filename: 'postalocity-logo.png',
        alt: 'Postalocity - Direct Mail Automation',
      },
    },
    contact: {
      phone: '316-260-2220',
      email: 'contact@postalocity.com',
      address: {
        street: '820 W 2nd St N',
        city: 'Wichita',
        state: 'KS',
        zip: '67203',
      },
      hours: {
        weekdays: '8:00 AM - 5:00 PM CST',
        support: 'contact@postalocity.com',
      },
    },
    social: {
      twitter: 'https://twitter.com/postalocity',
      linkedin: 'https://linkedin.com/company/postalocity',
      facebook: 'https://facebook.com/postalocity',
    },
    promoCode: undefined,
  };
}

// Empty brand context for production fallback (NOT brand-specific)
function getEmptyBrandContext(): BrandContextValue {
  return {
    brand: {
      id: '',
      name: '',
      slug: '',
      domain: '',
      tagline: '',
      urls: {
        app: '',
        website: '',
        blog: '',
        howWeHelp: '',
        whoWeServe: '',
        contact: '',
        faq: '',
      },
      logo: {
        filename: '',
        alt: '',
      },
    },
    contact: {
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
    social: {},
    promoCode: undefined,
  };
}

// =============================================================================
// UTILITY HOOKS
// =============================================================================

export function useBrandName(): string {
  const { brand } = useBrand();
  return brand.name;
}

export function useBrandUrls(): BrandUrls {
  const { brand } = useBrand();
  return brand.urls;
}

export function useBrandContact(): BrandContact {
  const { contact } = useBrand();
  return contact;
}

export function useBrandSocial(): BrandSocial {
  const { social } = useBrand();
  return social;
}

export function usePromoCode(): string | undefined {
  const { promoCode } = useBrand();
  return promoCode;
}

export function useAppUrl(): string {
  const { brand, promoCode } = useBrand();
  const baseUrl = brand.urls.app.replace(/\?.*$/, ''); // Remove existing query
  return promoCode
    ? `${baseUrl}?signUp=true&promo=${promoCode}`
    : `${baseUrl}?signUp=true`;
}
