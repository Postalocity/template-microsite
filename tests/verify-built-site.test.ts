import { describe, it, expect, beforeAll } from '@jest/globals';
import fs from 'fs';

describe('Generated Site Build Verification', () => {
  const siteDir = './sites/healthcare-billing';
  const configPath = `${siteDir}/config.json`;
  let config: any;

  beforeAll(() => {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  });

  describe('Configuration Structure', () => {
    it('should load config from config.json', () => {
      expect(config).toBeDefined();
      expect(config.site).toBeDefined();
      expect(config.content).toBeDefined();
    });

    it('should have valid site metadata', () => {
      expect(config.site.name).toBe('Healthcare Billing Solutions');
      expect(config.site.slug).toBe('healthcare-billing');
      expect(config.site.domain).toBe('healthcare-billing.com');
    });

    it('should have contact information', () => {
      expect(config.site.contact).toBeDefined();
      expect(config.site.contact.email).toBe('contact@healthcare-billing.com');
      expect(config.site.contact.phone).toBeDefined();
      expect(config.site.contact.address).toBeDefined();
    });

    it('should have theme configuration', () => {
      expect(config.theme).toBeDefined();
      expect(config.theme.primary).toBeDefined();
      expect(config.theme.primary.h).toBe(217);
      expect(config.theme.primary.s).toBe(91);
      expect(config.theme.primary.l).toBe(60);
    });

    it('should have navigation links', () => {
      expect(config.navigation.links).toBeDefined();
      expect(config.navigation.links.length).toBeGreaterThan(0);
      expect(config.navigation.links[0].label).toBeDefined();
      expect(config.navigation.links[0].href).toBeDefined();
    });
  });

  describe('Content Structure', () => {
    it('should have hero content', () => {
      expect(config.content.hero).toBeDefined();
      expect(config.content.hero.headline.main).toBeDefined();
      expect(config.content.hero.headline.highlightTerm).toBeDefined();
      expect(config.content.hero.subhead).toBeDefined();
      expect(config.content.hero.background).toBeDefined();
      expect(config.content.hero.ctas).toBeDefined();
      expect(config.content.hero.ctas.length).toBe(2);
    });

    it('should have benefits section with 4 benefits', () => {
      expect(config.content.benefits).toBeDefined();
      expect(config.content.benefits.benefits).toBeDefined();
      expect(config.content.benefits.benefits.length).toBe(4);

      const firstBenefit = config.content.benefits.benefits[0];
      expect(firstBenefit.icon).toBeDefined();
      expect(firstBenefit.title).toBeDefined();
      expect(firstBenefit.detail).toBeDefined();
      expect(firstBenefit.metrics).toBeDefined();
    });

    it('should have services section with 6 services', () => {
      expect(config.content.services).toBeDefined();
      expect(config.content.services.services).toBeDefined();
      expect(config.content.services.services.length).toBe(6);

      const firstService = config.content.services.services[0];
      expect(firstService.icon).toBeDefined();
      expect(firstService.title).toBeDefined();
      expect(firstService.description).toBeDefined();
    });

    it('should have comparison section', () => {
      expect(config.content.comparison).toBeDefined();
      expect(config.content.comparison.columns).toBeDefined();
      expect(config.content.comparison.columns.ourSolution).toBe('Our Solution');
      expect(config.content.comparison.columns.traditional).toBe('Traditional Approach');
      expect(config.content.comparison.rows).toBeDefined();
      expect(config.content.comparison.rows.length).toBeGreaterThan(0);

      const firstRow = config.content.comparison.rows[0];
      expect(firstRow.feature).toBeDefined();
      expect(firstRow.ourSolution).toBeDefined();
      expect(firstRow.traditionalApproach).toBeDefined();
    });

    it('should have FAQ section with 5 questions', () => {
      expect(config.content.faq).toBeDefined();
      expect(config.content.faq.faqs).toBeDefined();
      expect(config.content.faq.faqs.length).toBe(5);

      const firstFAQ = config.content.faq.faqs[0];
      expect(firstFAQ.q).toBeDefined();
      expect(firstFAQ.a).toBeDefined();
      expect(firstFAQ.q.length).toBeGreaterThan(10);
      expect(firstFAQ.a.length).toBeGreaterThan(10);
    });
  });

  describe('Content Quality Standards', () => {
    it('should have professional tone - no dramatic language', () => {
      const heroHeadline = config.content.hero.headline.main.toLowerCase();
      const subhead = config.content.hero.subhead.toLowerCase();

      expect(heroHeadline).not.toContain('amazing');
      expect(heroHeadline).not.toContain('incredible');
      expect(heroHeadline).not.toContain('revolutionize');
      expect(heroHeadline).not.toContain('transform');
      expect(subhead).not.toContain('amazing');
      expect(subhead).not.toContain('incredible');
    });

    it('should use hours-focused messaging', () => {
      const heroHeadline = config.content.hero.headline.main;
      const firstBenefitTitle = config.content.benefits.benefits[0].title;

      expect(heroHeadline).toMatch(/Reclaim.*hours/i);
      expect(firstBenefitTitle).toContain('Hours');
    });

    it('should contain keywords in first 100 characters of hero', () => {
      const heroText = `${config.site.name} ${config.content.hero.headline.main} ${config.content.hero.headline.highlightTerm}`;
      const first100Chars = heroText.substring(0, 100);

      expect(first100Chars.toUpperCase()).toContain('HEALTHCARE');
      expect(first100Chars.toUpperCase()).toContain('BILLING');
    });

    it('should have specific, verifiable metrics', () => {
      const firstBenefit = config.content.benefits.benefits[0];
      expect(firstBenefit.metrics).toBeDefined();
      expect(firstBenefit.metrics).toMatch(/\d+.*hour/i);
    });
  });

  describe('File Structure', () => {
    it('should have generated index.tsx', () => {
      expect(fs.existsSync(`${siteDir}/index.tsx`)).toBe(true);
    });

    it('should have generated vite.config.ts', () => {
      expect(fs.existsSync(`${siteDir}/vite.config.ts`)).toBe(true);
    });

    it('should have generated package.json', () => {
      expect(fs.existsSync(`${siteDir}/package.json`)).toBe(true);
    });

    it('should have generated index.html', () => {
      expect(fs.existsSync(`${siteDir}/index.html`)).toBe(true);
    });

    it('should have generated config.json', () => {
      expect(fs.existsSync(`${siteDir}/config.json`)).toBe(true);
    });
  });

  describe('Build Configuration', () => {
    it('should have correct basename in vite.config.ts', () => {
      const viteConfig = fs.readFileSync(`${siteDir}/vite.config.ts`, 'utf-8');
      expect(viteConfig).toContain("base: '/healthcare-billing'");
    });

    it('should have alias to resolve ../common', () => {
      const viteConfig = fs.readFileSync(`${siteDir}/vite.config.ts`, 'utf-8');
      expect(viteConfig).toContain('../common');
      expect(viteConfig).toContain('../../common');
    });
  });
});

describe('Content Loading Verification', () => {
  describe('Generated index.tsx', () => {
    it('should import config from ./config.json', () => {
      const indexContent = fs.readFileSync('./sites/healthcare-billing/index.tsx', 'utf-8');
      expect(indexContent).toContain("import config from './config.json'");
    });

    it('should import components from ../common', () => {
      const indexContent = fs.readFileSync('./sites/healthcare-billing/index.tsx', 'utf-8');
      expect(indexContent).toContain('from \'../common/components/shared\'');
      expect(indexContent).toContain('HeroSection');
      expect(indexContent).toContain('BenefitsSection');
      expect(indexContent).toContain('ServicesSection');
      expect(indexContent).toContain('FAQSection');
      expect(indexContent).toContain('ComparisonSection');
    });

    it('should pass content props to components', () => {
      const indexContent = fs.readFileSync('./sites/healthcare-billing/index.tsx', 'utf-8');
      expect(indexContent).toContain('hero={content.hero}');
      expect(indexContent).toContain('benefits={content.benefits}');
      expect(indexContent).toContain('services={content.services}');
      expect(indexContent).toContain('faq={content.faq}');
      expect(indexContent).toContain('comparison={content.comparison}');
    });

    it('should destructure config to access content', () => {
      const indexContent = fs.readFileSync('./sites/healthcare-billing/index.tsx', 'utf-8');
      expect(indexContent).toContain('const { content } = config');
    });
  });
});