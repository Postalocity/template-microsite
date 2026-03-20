/**
 * Tests for engine/config-loader.ts
 */

import { describe, it, expect } from 'vitest';
import {
  loadBrandConfig,
  loadContactInfo,
  loadSocialLinks,
  loadIKB,
  loadEngineContext,
  listBrands,
  listServices,
  loadSiteConfig,
} from './config-loader';

describe('config-loader', () => {
  describe('loadBrandConfig', () => {
    it('should load postalocity brand config successfully', () => {
      const config = loadBrandConfig('postalocity');
      
      expect(config).toBeDefined();
      expect(config.id).toBe('postalocity');
      expect(config.name).toBe('Postalocity');
      expect(config.slug).toBe('postalocity');
      expect(config.domain).toBe('postalocity.com');
      expect(config.urls).toBeDefined();
      expect(config.urls.app).toBeDefined();
      expect(config.urls.website).toBeDefined();
      expect(config.logo).toBeDefined();
      expect(config.logo.filename).toBe('postalocity-logo.png');
    });

    it('should throw error for non-existent brand', () => {
      expect(() => loadBrandConfig('nonexistent')).toThrow();
    });

    it('should have required fields in brand config', () => {
      const config = loadBrandConfig('postalocity');
      
      expect(typeof config.id).toBe('string');
      expect(typeof config.name).toBe('string');
      expect(typeof config.slug).toBe('string');
      expect(typeof config.domain).toBe('string');
      expect(typeof config.urls).toBe('object');
      expect(typeof config.logo).toBe('object');
    });
  });

  describe('loadContactInfo', () => {
    it('should load postalocity contact info successfully', () => {
      const contact = loadContactInfo('postalocity');
      
      expect(contact).toBeDefined();
      expect(contact.phone).toBe('316-260-2220');
      expect(contact.email).toBe('contact@postalocity.com');
      expect(contact.address).toBeDefined();
      expect(contact.address.street).toBe('820 W 2nd St N');
      expect(contact.address.city).toBe('Wichita');
      expect(contact.address.state).toBe('KS');
      expect(contact.address.zip).toBe('67203');
    });

    it('should throw error for non-existent brand contact', () => {
      expect(() => loadContactInfo('nonexistent')).toThrow();
    });
  });

  describe('loadSocialLinks', () => {
    it('should load postalocity social links successfully', () => {
      const social = loadSocialLinks('postalocity');
      
      expect(social).toBeDefined();
      expect(social.twitter).toBe('https://twitter.com/postalocity');
      expect(social.linkedin).toBe('https://linkedin.com/company/postalocity');
      expect(social.facebook).toBe('https://facebook.com/postalocity');
    });

    it('should return empty object for brand without social config', () => {
      // This should not throw, just return empty object
      const social = loadSocialLinks('nonexistent');
      expect(social).toEqual({});
    });
  });

  describe('loadIKB', () => {
    it('should load postalocity IKB successfully', () => {
      const ikb = loadIKB('postalocity');
      
      expect(ikb).toBeDefined();
      expect(ikb.rules).toBeDefined();
      expect(ikb.pricing).toBeDefined();
      expect(ikb.proofOptions).toBeDefined();
    });

    it('should have valid rules in IKB', () => {
      const ikb = loadIKB('postalocity');
      
      expect(Array.isArray(ikb.rules.trustSignals)).toBe(true);
      expect(ikb.rules.trustSignals.length).toBe(3);
      expect(ikb.rules.trustSignals).toContain('NCOA Verified 2024');
      expect(ikb.rules.trustSignals).toContain('CASS Certified 2024');
      expect(ikb.rules.trustSignals).toContain('ISO 9001 Documented Processes 2023');
    });

    it('should have valid promo codes mapping', () => {
      const ikb = loadIKB('postalocity');
      
      expect(ikb.rules.promoCodes).toBeDefined();
      expect(ikb.rules.promoCodes['credit-repair']).toBe('cr2026');
      expect(ikb.rules.promoCodes['debt-collection']).toBe('debt2026');
      expect(ikb.rules.promoCodes['healthcare-billing']).toBe('hb2026');
    });

    it('should have valid pricing', () => {
      const ikb = loadIKB('postalocity');
      
      expect(ikb.pricing.basePrice).toBe(1.31);
      expect(ikb.pricing.currency).toBe('USD');
      expect(Array.isArray(ikb.pricing.tiers)).toBe(true);
    });

    it('should have proof options', () => {
      const ikb = loadIKB('postalocity');
      
      expect(ikb.proofOptions.standard).toBeDefined();
      expect(ikb.proofOptions.upgrades).toBeDefined();
      expect(Array.isArray(ikb.proofOptions.standard)).toBe(true);
      expect(Array.isArray(ikb.proofOptions.upgrades)).toBe(true);
    });

    it('should have terminology', () => {
      const ikb = loadIKB('postalocity');
      
      expect(ikb.terminology).toBeDefined();
      expect(ikb.terminology?.mailClasses).toBeDefined();
      expect(ikb.terminology?.mailClasses?.['first-class']).toBeDefined();
    });

    it('should throw error for non-existent brand IKB', () => {
      expect(() => loadIKB('nonexistent')).toThrow();
    });
  });

  describe('loadEngineContext', () => {
    it('should load complete engine context for postalocity', () => {
      const ctx = loadEngineContext('postalocity');
      
      expect(ctx).toBeDefined();
      expect(ctx.brand).toBeDefined();
      expect(ctx.brand.id).toBe('postalocity');
      expect(ctx.contact).toBeDefined();
      expect(ctx.contact.phone).toBe('316-260-2220');
      expect(ctx.social).toBeDefined();
      expect(ctx.ikb).toBeDefined();
      expect(ctx.ikb.rules).toBeDefined();
    });

    it('should have valid structure', () => {
      const ctx = loadEngineContext('postalocity');
      
      expect(typeof ctx.brand).toBe('object');
      expect(typeof ctx.contact).toBe('object');
      expect(typeof ctx.social).toBe('object');
      expect(typeof ctx.ikb).toBe('object');
    });

    it('should throw error for non-existent brand', () => {
      expect(() => loadEngineContext('nonexistent')).toThrow();
    });
  });

  describe('listBrands', () => {
    it('should list available brands', () => {
      const brands = listBrands();
      
      expect(Array.isArray(brands)).toBe(true);
      expect(brands.length).toBeGreaterThan(0);
      expect(brands).toContain('postalocity');
    });
  });

  describe('listServices', () => {
    it('should list services for postalocity', () => {
      const services = listServices('postalocity');
      
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
      expect(services).toContain('credit-repair');
      expect(services).toContain('healthcare-billing');
    });

    it('should return empty array for non-existent brand', () => {
      const services = listServices('nonexistent');
      expect(services).toEqual([]);
    });
  });

  describe('loadSiteConfig', () => {
    it('should load credit-repair site config', () => {
      const siteConfig = loadSiteConfig('postalocity', 'credit-repair');
      
      expect(siteConfig).toBeDefined();
      expect(siteConfig.site).toBeDefined();
    });

    it('should throw error for non-existent service', () => {
      expect(() => loadSiteConfig('postalocity', 'nonexistent')).toThrow();
    });

    it('should throw error for non-existent brand', () => {
      expect(() => loadSiteConfig('nonexistent', 'credit-repair')).toThrow();
    });
  });
});
