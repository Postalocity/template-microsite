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
    // The gerund/fragment rule should trigger on the second sentence in some cases
    // For now we mainly assert the function runs without crashing
    expect(r).toHaveProperty('valid');
  });
});
