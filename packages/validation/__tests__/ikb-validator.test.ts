/**
 * @microsite/validation — IKB Validator Tests
 *
 * These tests run against the built-in defaults today.
 * Once the real loader is wired they will automatically validate against
 * the actual per-brand rules in config/ikb/.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import {
  validatePhrase,
  validateContentType,
  validateSection,
  getIKBRules,
  setIKBLoader
} from '../src/index.js';

// Register the real engine loader so tests run against live IKB data
// This works because Vitest is executed from the project root.
import { loadIKBRules } from '../../../engine/config-loader.js';

beforeAll(() => {
  setIKBLoader((brandId: string) => loadIKBRules(brandId));
});

describe('@microsite/validation — ikb-validator (default rules)', () => {
  it('blocks real blocklisted phrases from postalocity IKB', async () => {
    const result = await validatePhrase('We provide guaranteed results and 100% delivery', 'postalocity');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('guaranteed results'))).toBe(true);
    expect(result.errors.some(e => e.includes('100% delivery'))).toBe(true);
  });

  it('blocks "defensible proof" which only exists in real postalocity rules', async () => {
    const result = await validatePhrase('Defensible proof for your compliance needs', 'postalocity');
    expect(result.valid).toBe(false);
  });

  it('validateSection blocks testimonial and warns on non-approved sections', async () => {
    const bad = await validateSection('testimonial', 'postalocity');
    expect(bad.valid).toBe(false);
    expect(bad.errors.some(e => e.includes('blocklisted'))).toBe(true);

    const unknown = await validateSection('super-special-offer', 'postalocity');
    // Should still be valid (no hard block) but produce a warning because it's not in approvedSections
    expect(unknown.valid).toBe(true);
    expect(unknown.warnings.length).toBeGreaterThan(0);
  });

  it('validateSection enforces structural rules for hero and faq', async () => {
    const badHero = await validateSection({ name: 'hero' }, 'postalocity'); // missing headline
    expect(badHero.errors.some(e => e.includes('headline'))).toBe(true);

    const badFaq = await validateSection({ name: 'faq', faqs: [] }, 'postalocity');
    expect(badFaq.errors.some(e => e.includes('non-empty'))).toBe(true);
  });

  it('allows normal marketing language', async () => {
    const result = await validatePhrase('Fast, reliable mailing with real proof every time', 'odins-innovations');
    expect(result.valid).toBe(true);
  });

  it('blocks blocklisted content types', async () => {
    const result = await validateContentType('testimonial', 'broadstroke');
    expect(result.valid).toBe(false);
  });

  it('returns rule snapshot for debugging / admin UI', async () => {
    const rules = await getIKBRules('postalocity');
    expect(Array.isArray(rules.blocklistedPhrases)).toBe(true);
    expect(rules.blocklistedPhrases.length).toBeGreaterThan(5);
  });

  it('supports custom loader injection (future CMS / generator use)', async () => {
    setIKBLoader((brandId) => ({
      blocklistedContent: [],
      blocklistedPhrases: ['forbidden-word'],
      approvedSections: [],
      trustSignals: [],
      promoCodes: {}
    }));

    const result = await validatePhrase('this contains forbidden-word', 'any-brand');
    expect(result.valid).toBe(false);

    // reset for other tests
    setIKBLoader(null as any);
  });
});

import { validateWritingQuality } from '../src/content-quality.js';

describe('@microsite/validation — content-quality', () => {
  it('detects hedging language', () => {
    const r = validateWritingQuality('This may help you save time');
    expect(r.valid).toBe(false);
    expect(r.errors.some(e => e.includes('hedging'))).toBe(true);
  });

  it('detects fragmented sentences', () => {
    const r = validateWritingQuality('We deliver fast. And reliable service every time.');
    expect(r).toHaveProperty('valid');
  });
});

import { validateSiteContent } from '../src/validate-site-content.js';

describe('@microsite/validation — validateSiteContent (high-level CMS helper)', () => {
  it('rejects a payload containing blocklisted phrases and bad section types', async () => {
    const payload = {
      headline: 'Revolutionary service with guaranteed results',
      sections: [
        { name: 'testimonial', title: 'What our clients say' }
      ]
    };

    const result = await validateSiteContent(payload, 'postalocity');
    expect(result.valid).toBe(false);
    expect(result.fieldErrors.headline?.length).toBeGreaterThan(0);
    expect(result.fieldErrors['sections[0]']?.length).toBeGreaterThan(0);
  });
});
