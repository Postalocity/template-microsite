/**
 * BrandContext Tests
 * Tests for the multi-brand context system
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import {
  BrandProvider,
  useBrand,
  useBrandName,
  useBrandUrls,
  useBrandContact,
  useBrandSocial,
  usePromoCode,
  useAppUrl,
  getDefaultBrandContext,
  type BrandConfig,
  type BrandContact,
  type BrandSocial,
} from './BrandContext';

// Test data
const mockBrand: BrandConfig = {
  id: 'test-brand',
  name: 'Test Brand',
  slug: 'test-brand',
  domain: 'testbrand.com',
  tagline: 'Test tagline',
  urls: {
    app: 'https://app.testbrand.com/login.html',
    website: 'https://www.testbrand.com',
    blog: 'https://blog.testbrand.com',
    contact: 'https://testbrand.com/contact',
  },
  logo: {
    filename: 'test-logo.png',
    alt: 'Test Brand Logo',
  },
};

const mockContact: BrandContact = {
  phone: '555-123-4567',
  email: 'support@testbrand.com',
  address: {
    street: '123 Test St',
    city: 'Test City',
    state: 'TS',
    zip: '12345',
  },
  hours: {
    weekdays: '9-5',
    weekends: 'Closed',
  },
};

const mockSocial: BrandSocial = {
  twitter: 'https://twitter.com/testbrand',
  linkedin: 'https://linkedin.com/company/testbrand',
  facebook: 'https://facebook.com/testbrand',
  instagram: 'https://instagram.com/testbrand',
};

describe('BrandContext', () => {
  describe('getDefaultBrandContext', () => {
    it('should return default Postalocity values', () => {
      const context = getDefaultBrandContext();

      expect(context.brand.id).toBe('postalocity');
      expect(context.brand.name).toBe('Postalocity');
      expect(context.brand.domain).toBe('postalocity.com');
      expect(context.contact.phone).toBe('316-260-2220');
      expect(context.contact.email).toBe('support@postalocity.com');
    });

    it('should have correct URLs structure', () => {
      const context = getDefaultBrandContext();

      expect(context.brand.urls.app).toContain('postalocity.com');
      expect(context.brand.urls.website).toContain('postalocity.com');
      expect(context.brand.urls.contact).toContain('postalocity.com');
    });

    it('should have correct contact address', () => {
      const context = getDefaultBrandContext();

      expect(context.contact.address.city).toBe('Wichita');
      expect(context.contact.address.state).toBe('KS');
    });
  });

  describe('useBrand', () => {
    it('should return provided brand context values', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider
          brand={mockBrand}
          contact={mockContact}
          social={mockSocial}
          promoCode="TEST123"
        >
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrand(), { wrapper });

      expect(result.current.brand.id).toBe('test-brand');
      expect(result.current.contact.email).toBe('support@testbrand.com');
      expect(result.current.promoCode).toBe('TEST123');
    });

    it('should return defaults when no provider is present', () => {
      const { result } = renderHook(() => useBrand());

      expect(result.current.brand.id).toBe('postalocity');
      expect(result.current.contact.phone).toBe('316-260-2220');
    });
  });

  describe('useBrandName', () => {
    it('should return brand name from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrandName(), { wrapper });

      expect(result.current).toBe('Test Brand');
    });

    it('should return Postalocity as default', () => {
      const { result } = renderHook(() => useBrandName());

      expect(result.current).toBe('Postalocity');
    });
  });

  describe('useBrandUrls', () => {
    it('should return brand URLs from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrandUrls(), { wrapper });

      expect(result.current.app).toBe('https://app.testbrand.com/login.html');
      expect(result.current.website).toBe('https://www.testbrand.com');
    });

    it('should return default Postalocity URLs', () => {
      const { result } = renderHook(() => useBrandUrls());

      expect(result.current.app).toContain('postalocity.com');
      expect(result.current.website).toContain('postalocity.com');
    });
  });

  describe('useBrandContact', () => {
    it('should return contact info from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrandContact(), { wrapper });

      expect(result.current.phone).toBe('555-123-4567');
      expect(result.current.email).toBe('support@testbrand.com');
    });

    it('should return default Postalocity contact', () => {
      const { result } = renderHook(() => useBrandContact());

      expect(result.current.phone).toBe('316-260-2220');
    });
  });

  describe('useBrandSocial', () => {
    it('should return social links from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact} social={mockSocial}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrandSocial(), { wrapper });

      expect(result.current.twitter).toBe('https://twitter.com/testbrand');
      expect(result.current.linkedin).toBe('https://linkedin.com/company/testbrand');
    });

    it('should return default Postalocity social links', () => {
      const { result } = renderHook(() => useBrandSocial());

      expect(result.current.twitter).toBe('https://twitter.com/postalocity');
    });

    it('should return empty object when no social provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useBrandSocial(), { wrapper });

      expect(result.current).toEqual({});
    });
  });

  describe('usePromoCode', () => {
    it('should return promo code from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact} promoCode="SUMMER2026">
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => usePromoCode(), { wrapper });

      expect(result.current).toBe('SUMMER2026');
    });

    it('should return undefined when no promo code provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => usePromoCode(), { wrapper });

      expect(result.current).toBeUndefined();
    });
  });

  describe('useAppUrl', () => {
    it('should return app URL with promo code', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact} promoCode="CR2026">
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useAppUrl(), { wrapper });

      expect(result.current).toBe('https://app.testbrand.com/login.html?signUp=true&promo=CR2026');
    });

    it('should return app URL without promo code when not provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={mockBrand} contact={mockContact}>
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useAppUrl(), { wrapper });

      expect(result.current).toBe('https://app.testbrand.com/login.html?signUp=true');
    });

    it('should handle existing query params in app URL', () => {
      const brandWithQuery: BrandConfig = {
        ...mockBrand,
        urls: {
          ...mockBrand.urls,
          app: 'https://app.testbrand.com/login.html?existing=param',
        },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <BrandProvider brand={brandWithQuery} contact={mockContact} promoCode="TEST">
          {children}
        </BrandProvider>
      );

      const { result } = renderHook(() => useAppUrl(), { wrapper });

      // Should strip existing query params and add promo code
      expect(result.current).toContain('?signUp=true&promo=TEST');
    });

    it('should return default Postalocity app URL', () => {
      const { result } = renderHook(() => useAppUrl());

      expect(result.current).toContain('postalocity.com');
      expect(result.current).toContain('?signUp=true');
    });
  });
});
