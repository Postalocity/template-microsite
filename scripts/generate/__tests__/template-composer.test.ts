/**
 * Unit tests for template-composer
 * Following TDD: write failing test first, then implement to pass.
 */

import { describe, it, expect } from 'vitest';
import {
  generateHeader,
  generateImports,
  generateIKBConfig,
  composeSiteTemplate,
  type SiteTemplateConfig
} from '../template-composer.js';
import type { SiteInfo } from '../../generate-site.js';

describe('template-composer', () => {
  const mockSite: SiteInfo = {
    name: 'Test Site',
    slug: 'test-site',
    basename: '/test-site'
  };

  describe('generateHeader', () => {
    it('should generate header with site name and brand', () => {
      const header = generateHeader(mockSite, 'testbrand');
      expect(header).toContain('AUTO-GENERATED FILE');
      expect(header).toContain('Test Site');
      expect(header).toContain('testbrand');
    });
  });

  describe('generateImports', () => {
    it('should generate import statements for sections', () => {
      const imports = generateImports(['Hero', 'FAQ'], '../common/theme.css');
      expect(imports).toContain("import React from 'react'");
      expect(imports).toContain("import Hero from './sections/Hero.tsx'");
      expect(imports).toContain("import FAQ from './sections/FAQ.tsx'");
      expect(imports).toContain("import '../common/theme.css'");
    });
  });

  describe('generateIKBConfig', () => {
    it('should generate IKB config with brand and site', () => {
      const ikb = generateIKBConfig('brand1', 'site1');
      expect(ikb).toContain("brandId: 'brand1'");
      expect(ikb).toContain("siteSlug: 'site1'");
      expect(ikb).toContain('rules: []');
    });
  });

  describe('composeSiteTemplate', () => {
    it('should compose a complete site template', () => {
      const config: SiteTemplateConfig = {
        site: mockSite,
        brandName: 'testbrand',
        sections: ['Hero'],
        themePath: '../theme.css',
        brandId: 'testbrand',
        siteSlug: 'test-site'
      };

      const result = composeSiteTemplate(config);
      expect(result).toContain('AUTO-GENERATED FILE');
      expect(result).toContain('import React from');
      expect(result).toContain('ikbConfig');
      expect(result).toContain('Site: Test Site');
    });
  });
});
