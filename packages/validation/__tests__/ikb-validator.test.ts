/**
 * @microsite/validation — IKB Validator Tests
 *
 * These tests run against the built-in defaults today.
 * Once the real loader is wired they will automatically validate against
 * the actual per-brand rules in config/ikb/.
 */

import { describe, it, expect } from 'vitest';
import {
  validatePhrase,
  validateContentType,
  getIKBRules,
  setIKBLoader
} from '../src/index.js';

describe('@microsite/validation — ikb-validator (default rules)', () => {
  it('blocks well-known blocklisted phrases for any brand', async () => {
    const result = await validatePhrase('Our service delivers guaranteed results', 'postalocity');
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('guaranteed results'))).toBe(true);
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
