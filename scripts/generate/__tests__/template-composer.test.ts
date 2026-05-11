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
import type { SiteInfo } from '../template-composer.js';

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
    it('should include provided rules array', () => {
      const ikb = generateIKBConfig('b', 's', ['rule1', 'rule2']);
      expect(ikb).toContain("'rule1'");
      expect(ikb).toContain("'rule2'");
    });
  });

  describe('generateImports', () => {
    it('should handle empty sections', () => {
      const imports = generateImports([], 'theme.css');
      expect(imports).toContain("import React from 'react'");
      expect(imports).not.toContain('sections/');
    });
    it('should support section objects with custom importPath', () => {
      const imports = generateImports([{ name: 'Hero', component: 'HeroX', importPath: './custom/Hero.tsx' }]);
      expect(imports).toContain("import HeroX from './custom/Hero.tsx'");
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
    it('default path uses ReactDOM.createRoot and no App wrapper', () => {
      const config: SiteTemplateConfig = { site: mockSite, brandId: 'b', siteSlug: 's' };
      const result = composeSiteTemplate(config);
      expect(result).toContain('ReactDOM.createRoot');
      expect(result).not.toContain('function App()');
    });
    it('customBody override renders inside App function', () => {
      const config: SiteTemplateConfig = {
        site: mockSite,
        brandId: 'b',
        siteSlug: 's',
        customBody: '        <CustomHero />'
      };
      const result = composeSiteTemplate(config);
      expect(result).toContain('function App()');
      expect(result).toContain('<CustomHero />');
      expect(result).toContain('root.render(<App />)');
    });
    it('customHeader and customImports override defaults', () => {
      const config: SiteTemplateConfig = {
        site: mockSite,
        brandId: 'b',
        siteSlug: 's',
        customHeader: '/* CUSTOM HEADER */',
        customImports: "import React from 'react';\nimport Custom from './c';"
      };
      const result = composeSiteTemplate(config);
      expect(result).toContain('CUSTOM HEADER');
      expect(result).toContain("import Custom from './c'");
      expect(result).not.toContain('ikbConfig');
    });
    it('customProviders and customAppInit assemble correctly', () => {
      const config: SiteTemplateConfig = {
        site: mockSite,
        brandId: 'b',
        siteSlug: 's',
        customProviders: '<BrandProvider>',
        customAppInit: '  const x = 1;',
        customBody: '<div/>'
      };
      const result = composeSiteTemplate(config);
      expect(result).toContain('<BrandProvider>');
      expect(result).toContain('const x = 1;');
      expect(result).toContain('</BrandProvider>');
    });
    it('handles sections with conditional field without error', () => {
      const config: SiteTemplateConfig = {
        site: mockSite,
        brandId: 'b',
        siteSlug: 's',
        sections: [{ name: 'Hero', component: 'Hero', conditional: 'showHero' }]
      };
      const result = composeSiteTemplate(config);
      expect(result).toContain('Hero');
    });
    it('does not throw on minimal invalid-ish config', () => {
      const bad = { brandId: 'b', site: { name: 'x', slug: 'y', basename: '' } } as SiteTemplateConfig;
      expect(() => composeSiteTemplate(bad)).not.toThrow();
    });
  });
});
