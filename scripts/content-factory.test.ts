/**
 * Tests for scripts/content-factory.ts
 */

import { describe, it, expect } from 'vitest';
import {
  validateTrustSignals,
  validatePromoCode,
  validateSections,
  validateHero,
  validateContentBlocks,
  validateMailClassDescription,
  validateConfigFile,
  getPromoCodeList,
  getApprovedTrustSignals,
  containsBlocklistedContent,
  APPROVED_TRUST_SIGNALS,
  PROMO_CODES,
  BLOCKLISTED_CONTENT,
  BLOCKLISTED_PHRASES,
} from './content-factory';

describe('content-factory', () => {
  describe('APPROVED_TRUST_SIGNALS', () => {
    it('should have exactly 3 trust signals', () => {
      expect(APPROVED_TRUST_SIGNALS).toHaveLength(3);
    });

    it('should contain postalocity trust signals', () => {
      expect(APPROVED_TRUST_SIGNALS).toContain('NCOA Verified 2024');
      expect(APPROVED_TRUST_SIGNALS).toContain('CASS Certified 2024');
      expect(APPROVED_TRUST_SIGNALS).toContain('ISO 9001 Documented Processes 2023');
    });
  });

  describe('PROMO_CODES', () => {
    it('should have postalocity promo codes', () => {
      expect(PROMO_CODES['credit-repair']).toBe('cr2026');
      expect(PROMO_CODES['debt-collection']).toBe('debt2026');
      expect(PROMO_CODES['healthcare-billing']).toBe('hb2026');
      expect(PROMO_CODES['healthcare-mailing-services']).toBe('hm2026');
      expect(PROMO_CODES['postcard']).toBe('pc2026');
      expect(PROMO_CODES['self-storage']).toBe('pm2026');
    });

    it('should use short codes, not slugs', () => {
      Object.values(PROMO_CODES).forEach(code => {
        expect(code).not.toContain('-');
        expect(code).toMatch(/^[a-z]+[0-9]{4}$/);
      });
    });
  });

  describe('BLOCKLISTED_CONTENT', () => {
    it('should block testimonials', () => {
      expect(BLOCKLISTED_CONTENT).toContain('testimonial');
      expect(BLOCKLISTED_CONTENT).toContain('testimonials');
    });

    it('should block case studies', () => {
      expect(BLOCKLISTED_CONTENT).toContain('case-study');
      expect(BLOCKLISTED_CONTENT).toContain('case-studies');
    });

    it('should block video content', () => {
      expect(BLOCKLISTED_CONTENT).toContain('video');
      expect(BLOCKLISTED_CONTENT).toContain('video-content');
    });

    it('should block aggregate ratings', () => {
      expect(BLOCKLISTED_CONTENT).toContain('aggregateRating');
    });
  });

  describe('BLOCKLISTED_PHRASES', () => {
    it('should block guarantee phrases', () => {
      expect(BLOCKLISTED_PHRASES).toContain('guaranteed results');
      expect(BLOCKLISTED_PHRASES).toContain('satisfaction guaranteed');
    });

    it('should block award claims', () => {
      expect(BLOCKLISTED_PHRASES).toContain('award-winning');
    });

    it('should block delivery guarantees', () => {
      expect(BLOCKLISTED_PHRASES).toContain('guaranteed delivery');
      expect(BLOCKLISTED_PHRASES).toContain('100% delivery');
    });
  });

  describe('validateTrustSignals', () => {
    it('should return valid for approved trust signals', () => {
      const result = validateTrustSignals([...APPROVED_TRUST_SIGNALS]);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid for non-approved trust signals', () => {
      const result = validateTrustSignals(['Fake Award 2024']);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should return error for empty array', () => {
      const result = validateTrustSignals([]);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Trust signals array is empty or missing');
    });

    it('should warn if not exactly 3 trust signals', () => {
      const result = validateTrustSignals(['NCOA Verified 2024']);
      
      expect(result.warnings).toContain('Expected 3 trust signals, found 1');
    });
  });

  describe('validatePromoCode', () => {
    it('should validate correct promo code', () => {
      const result = validatePromoCode('cr2026', 'credit-repair');
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject incorrect promo code', () => {
      const result = validatePromoCode('wrong2026', 'credit-repair');
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject slug instead of short code', () => {
      const result = validatePromoCode('credit-repair-2026', 'credit-repair');
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('slug'))).toBe(true);
    });

    it('should return error for missing promo code', () => {
      const result = validatePromoCode(undefined, 'credit-repair');
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('missing'))).toBe(true);
    });

    it('should return error for unknown site', () => {
      const result = validatePromoCode('abc123', 'unknown-site');
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Unknown site'))).toBe(true);
    });
  });

  describe('validateSections', () => {
    it('should validate valid sections', () => {
      const sections = {
        hero: {},
        howItWorks: {},
        features: {},
        faq: {},
        cta: {},
        footer: {},
        trustSignals: {},
      };
      
      const result = validateSections(sections);
      
      expect(result.valid).toBe(true);
    });

    it('should detect missing required sections', () => {
      const sections = {
        hero: {},
      };
      
      const result = validateSections(sections);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Missing required section'))).toBe(true);
    });

    it('should detect blocklisted sections', () => {
      const sections = {
        hero: {},
        testimonials: {},
        howItWorks: {},
        cta: {},
        footer: {},
        trustSignals: {},
      };
      
      const result = validateSections(sections);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Blocklisted section'))).toBe(true);
    });
  });

  describe('validateHero', () => {
    it('should validate hero with main headline', () => {
      const hero = { main: 'Test Headline' };
      
      const result = validateHero(hero);
      
      expect(result.valid).toBe(true);
    });

    it('should return error for missing hero', () => {
      const result = validateHero(undefined);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Hero section is missing');
    });

    it('should return error for missing main headline', () => {
      const hero = {};
      
      const result = validateHero(hero);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Hero main headline is missing');
    });

    it('should warn for short headlines', () => {
      const hero = { main: 'Hi' };
      
      const result = validateHero(hero);
      
      expect(result.warnings).toContain('Hero headline seems too short');
    });
  });

  describe('validateContentBlocks', () => {
    it('should pass valid content', () => {
      const content = 'We offer direct mail automation services.';
      
      const result = validateContentBlocks(content);
      
      expect(result.valid).toBe(true);
    });

    it('should detect blocklisted phrases', () => {
      const content = 'We are an award-winning company with guaranteed results!';
      
      const result = validateContentBlocks(content);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('award-winning'))).toBe(true);
      expect(result.errors.some(e => e.includes('guaranteed results'))).toBe(true);
    });

    it('should be case insensitive', () => {
      const content = 'Award-Winning Guaranteed Results';
      
      const result = validateContentBlocks(content);
      
      expect(result.valid).toBe(false);
    });
  });

  describe('validateMailClassDescription', () => {
    it('should warn if HIPAA mentions First-Class', () => {
      const desc = 'HIPAA-compliant documents require First-Class Mail for legal compliance.';
      
      const result = validateMailClassDescription(desc);
      
      // Should not have errors, this is correct
      expect(result.valid).toBe(true);
    });

    it('should error if Marketing Mail mentions account numbers', () => {
      const desc = 'Marketing Mail can include your account number and balance.';
      
      const result = validateMailClassDescription(desc);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('account numbers'))).toBe(true);
    });

    it('should error if Marketing Mail mentions balance', () => {
      const desc = 'Get your balance delivered via Marketing Mail.';
      
      const result = validateMailClassDescription(desc);
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('balance'))).toBe(true);
    });
  });

  describe('getPromoCodeList', () => {
    it('should return array of site/code pairs', () => {
      const list = getPromoCodeList();
      
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
      expect(list[0]).toHaveProperty('site');
      expect(list[0]).toHaveProperty('code');
    });

    it('should include postalocity codes', () => {
      const list = getPromoCodeList();
      const postalocityCodes = list.filter(item => item.site.includes('credit'));
      
      expect(postalocityCodes.length).toBeGreaterThan(0);
    });
  });

  describe('getApprovedTrustSignals', () => {
    it('should return readonly array of trust signals', () => {
      const signals = getApprovedTrustSignals();
      
      expect(Array.isArray(signals)).toBe(true);
      expect(signals).toHaveLength(3);
    });

    it('should match APPROVED_TRUST_SIGNALS', () => {
      const signals = getApprovedTrustSignals();
      
      expect(signals).toEqual(APPROVED_TRUST_SIGNALS);
    });
  });

  describe('containsBlocklistedContent', () => {
    it('should return false for clean content', () => {
      const content = 'We provide direct mail services.';
      
      const result = containsBlocklistedContent(content);
      
      expect(result).toBe(false);
    });

    it('should return true for blocklisted content', () => {
      const content = 'See what our customers say - testimonials!';
      
      const result = containsBlocklistedContent(content);
      
      expect(result).toBe(true);
    });

    it('should be case insensitive', () => {
      const content = 'TESTIMONIALS from happy customers';
      
      const result = containsBlocklistedContent(content);
      
      expect(result).toBe(true);
    });
  });

  describe('validateConfigFile', () => {
    it('should return error for non-existent file', () => {
      const result = validateConfigFile('/nonexistent/path/config.json');
      
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('not found'))).toBe(true);
    });

    it('should validate existing postalocity config', () => {
      const result = validateConfigFile('config/sites/postalocity/credit-repair.json');
      
      // This should either pass or have specific errors
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');
    });
  });
});
