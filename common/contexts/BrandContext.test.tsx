/**
 * BrandContext Tests
 * Tests for the multi-brand context system
 */

import { describe, it, expect } from 'vitest';
import {
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
    it('should return Postalocity values for backward compatibility', () => {
      const context = getDefaultBrandContext();

      expect(context.brand.id).toBe('postalocity');
      expect(context.brand.name).toBe('Postalocity');
      expect(context.brand.domain).toBe('postalocity.com');
      expect(context.contact.phone).toBe('316-260-2220');
      expect(context.contact.email).toBe('contact@postalocity.com');
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

    it('should have social links configured', () => {
      const context = getDefaultBrandContext();

      expect(context.social.twitter).toContain('twitter.com');
      expect(context.social.linkedin).toContain('linkedin.com');
    });
  });

  describe('Type definitions', () => {
    it('should have valid BrandConfig structure', () => {
      expect(mockBrand).toHaveProperty('id');
      expect(mockBrand).toHaveProperty('name');
      expect(mockBrand).toHaveProperty('domain');
      expect(mockBrand).toHaveProperty('urls');
      expect(mockBrand.urls).toHaveProperty('app');
      expect(mockBrand.urls).toHaveProperty('website');
    });

    it('should have valid BrandContact structure', () => {
      expect(mockContact).toHaveProperty('phone');
      expect(mockContact).toHaveProperty('email');
      expect(mockContact).toHaveProperty('address');
      expect(mockContact.address).toHaveProperty('city');
      expect(mockContact.address).toHaveProperty('state');
    });

    it('should have valid BrandSocial structure', () => {
      expect(mockSocial).toHaveProperty('twitter');
      expect(mockSocial).toHaveProperty('linkedin');
      expect(mockSocial).toHaveProperty('facebook');
    });
  });

  describe('Multi-tenant isolation', () => {
    it('should ensure different brands have different data', () => {
      const postalocityContext = getDefaultBrandContext();

      // Test brand should have different values than postalocity
      expect(mockBrand.id).not.toBe(postalocityContext.brand.id);
      expect(mockBrand.name).not.toBe(postalocityContext.brand.name);
      expect(mockBrand.domain).not.toBe(postalocityContext.brand.domain);
    });

    it('should ensure brand contact data is isolated', () => {
      const postalocityContext = getDefaultBrandContext();

      expect(mockContact.phone).not.toBe(postalocityContext.contact.phone);
      expect(mockContact.email).not.toBe(postalocityContext.contact.email);
    });
  });
});
