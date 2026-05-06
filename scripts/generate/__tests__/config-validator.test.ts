import { describe, it, expect } from 'vitest';
import { validateSiteConfig } from '../config-validator';

describe('config-validator', () => {
  it('rejects config missing site.id', () => {
    const badConfig = {
      site: { name: 'Test Site', slug: 'test' },
      seo: { title: 'Test', description: 'Test description' }
    };
    expect(() => validateSiteConfig(badConfig)).toThrow();
  });
});
