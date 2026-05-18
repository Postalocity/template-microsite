/**
 * @microsite/validation/validate-site-content
 *
 * High-level helper intended for CMS publish hooks.
 * Takes a typical "site content" payload and runs the full suite of checks:
 *   - Phrase validation against blocklistedPhrases
 *   - Section type validation against approvedSections / blocklistedContent
 *   - Writing quality (hedging, fragments)
 *
 * Returns a consolidated result with field-level errors.
 */

import type { ValidationResult } from './types.js';
import { validatePhrase, validateSection, validateWritingQuality } from './index.js';

export interface SiteContentInput {
  headline?: string;
  subhead?: string;
  body?: string;
  sections?: Array<{ name?: string; type?: string; title?: string; description?: string; [k: string]: unknown }>;
  [key: string]: unknown;
}

export interface SiteContentValidationResult {
  valid: boolean;
  fieldErrors: Record<string, string[]>;
  warnings: string[];
}

export async function validateSiteContent(
  content: SiteContentInput,
  brandId: string
): Promise<SiteContentValidationResult> {
  const fieldErrors: Record<string, string[]> = {};
  const warnings: string[] = [];

  const pushError = (field: string, msg: string) => {
    if (!fieldErrors[field]) fieldErrors[field] = [];
    fieldErrors[field].push(msg);
  };

  // Headline
  if (content.headline) {
    const r = await validatePhrase(String(content.headline), brandId);
    if (!r.valid) r.errors.forEach(e => pushError('headline', e));
    const q = validateWritingQuality(String(content.headline), 'headline');
    q.errors.forEach(e => pushError('headline', e));
    q.warnings.forEach(w => warnings.push(`headline: ${w}`));
  }

  // Subhead
  if (content.subhead) {
    const r = await validatePhrase(String(content.subhead), brandId);
    if (!r.valid) r.errors.forEach(e => pushError('subhead', e));
  }

  // Body / long text
  if (content.body) {
    const q = validateWritingQuality(String(content.body), 'body');
    q.errors.forEach(e => pushError('body', e));
    q.warnings.forEach(w => warnings.push(`body: ${w}`));
  }

  // Sections
  if (Array.isArray(content.sections)) {
    for (const [idx, section] of content.sections.entries()) {
      const secResult = await validateSection(section, brandId);
      if (!secResult.valid) {
        secResult.errors.forEach(e => pushError(`sections[${idx}]`, e));
      }
      secResult.warnings.forEach(w => warnings.push(`sections[${idx}]: ${w}`));
    }
  }

  const valid = Object.keys(fieldErrors).length === 0;

  return { valid, fieldErrors, warnings };
}
