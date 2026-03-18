/**
 * IKBContext Tests
 * Tests for the Institutional Knowledge Base context
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import React from 'react';
import {
  IKBProvider,
  useIKB,
  useIKBRules,
  useTrustSignals,
  usePromoCodeFromIKB,
  useIKBPricing,
  useIKBTerminology,
  getDefaultIKBContext,
  defaultIKBConfig,
} from './IKBContext';
import type { IKBConfig } from '../types/engine';

describe('IKBContext', () => {
  describe('defaultIKBConfig', () => {
    it('should have trust signals', () => {
      expect(defaultIKBConfig.rules.trustSignals).toContain('NCOA Verified 2024');
      expect(defaultIKBConfig.rules.trustSignals).toContain('CASS Certified 2024');
    });

    it('should have promo codes for all services', () => {
      expect(defaultIKBConfig.rules.promoCodes['credit-repair']).toBe('cr2026');
      expect(defaultIKBConfig.rules.promoCodes['healthcare-billing']).toBe('hb2026');
    });

    it('should have blocklisted content', () => {
      expect(defaultIKBConfig.rules.blocklistedContent).toContain('testimonial');
      expect(defaultIKBConfig.rules.blocklistedContent).toContain('video');
    });

    it('should have blocklisted phrases', () => {
      expect(defaultIKBConfig.rules.blocklistedPhrases).toContain('award-winning');
      expect(defaultIKBConfig.rules.blocklistedPhrases).toContain('guaranteed delivery');
    });

    it('should have pricing information', () => {
      expect(defaultIKBConfig.pricing.basePrice).toBe(0.69);
      expect(defaultIKBConfig.pricing.currency).toBe('USD');
    });
  });

  describe('getDefaultIKBContext', () => {
    it('should return full context with defaults', () => {
      const context = getDefaultIKBContext();
      
      expect(context.rules.trustSignals).toBeDefined();
      expect(context.getPromoCode('credit-repair')).toBe('cr2026');
      expect(context.isContentAllowed('hero')).toBe(true);
      expect(context.isContentAllowed('testimonial')).toBe(false);
    });
  });

  describe('IKBProvider', () => {
    it('should render children', () => {
      const { result } = renderHook(() => {
        const { ikb } = useIKB();
        return { price: ikb.pricing.basePrice };
      });

      expect(result.current.price).toBe(0.69);
    });
  });

  describe('useIKB', () => {
    it('should return context from provider', () => {
      const customIKB: IKBConfig = {
        ...defaultIKBConfig,
        rules: {
          ...defaultIKBConfig.rules,
          promoCodes: { 'custom-service': 'custom2026' },
        },
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider ikb={customIKB}>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKB(), { wrapper });

      expect(result.current.getPromoCode('custom-service')).toBe('custom2026');
      expect(result.current.rules.trustSignals).toEqual(defaultIKBConfig.rules.trustSignals);
    });

    it('should return defaults when no provider', () => {
      const { result } = renderHook(() => useIKB());

      expect(result.current.getPromoCode('credit-repair')).toBe('cr2026');
    });
  });

  describe('useIKBRules', () => {
    it('should return rules from context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKBRules(), { wrapper });

      expect(result.current.trustSignals).toContain('NCOA Verified 2024');
      expect(result.current.blocklistedContent).toContain('testimonial');
    });
  });

  describe('useTrustSignals', () => {
    it('should return trust signals array', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useTrustSignals(), { wrapper });

      expect(result.current).toHaveLength(3);
      expect(result.current).toContain('NCOA Verified 2024');
      expect(result.current).toContain('CASS Certified 2024');
      expect(result.current).toContain('ISO 9001 Documented Processes 2023');
    });
  });

  describe('usePromoCodeFromIKB', () => {
    it('should return promo code for service', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => usePromoCodeFromIKB('credit-repair'), { wrapper });
      expect(result.current).toBe('cr2026');

      const { result: result2 } = renderHook(() => usePromoCodeFromIKB('healthcare-billing'), { wrapper });
      expect(result2.current).toBe('hb2026');
    });

    it('should return undefined for unknown service', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => usePromoCodeFromIKB('unknown-service'), { wrapper });
      expect(result.current).toBeUndefined();
    });
  });

  describe('useIKBPricing', () => {
    it('should return pricing information', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKBPricing(), { wrapper });

      expect(result.current.basePrice).toBe(0.69);
      expect(result.current.currency).toBe('USD');
      expect(result.current.addOns?.['certified-mail']).toBe(4.15);
    });
  });

  describe('useIKBTerminology', () => {
    it('should return terminology definitions', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKBTerminology(), { wrapper });

      expect(result.current?.mailClasses?.['first-class']).toBeDefined();
      expect(result.current?.certifications?.['ncov']).toBeDefined();
    });
  });

  describe('Content Validation', () => {
    it('should correctly validate allowed content', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKB(), { wrapper });

      expect(result.current.isContentAllowed('hero')).toBe(true);
      expect(result.current.isContentAllowed('features')).toBe(true);
      expect(result.current.isContentAllowed('faq')).toBe(true);
    });

    it('should correctly validate blocklisted content', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKB(), { wrapper });

      expect(result.current.isContentAllowed('testimonial')).toBe(false);
      expect(result.current.isContentAllowed('video')).toBe(false);
      expect(result.current.isContentAllowed('review')).toBe(false);
    });

    it('should correctly validate allowed phrases', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKB(), { wrapper });

      expect(result.current.isPhraseAllowed('Fast and reliable service')).toBe(true);
      expect(result.current.isPhraseAllowed('Secure document handling')).toBe(true);
    });

    it('should correctly validate blocklisted phrases', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <IKBProvider>{children}</IKBProvider>
      );

      const { result } = renderHook(() => useIKB(), { wrapper });

      expect(result.current.isPhraseAllowed('Award-winning service')).toBe(false);
      expect(result.current.isPhraseAllowed('Guaranteed delivery')).toBe(false);
      expect(result.current.isPhraseAllowed('100% accurate processing')).toBe(false);
    });
  });
});
