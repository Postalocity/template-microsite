/**
 * @microsite/validation/ikb-validator
 *
 * Pure, framework-agnostic IKB compliance validation functions.
 * These are the core "validation hooks" that a headless CMS (Payload/Strapi)
 * will call on every publish attempt.
 *
 * Reuses the existing IKB loading logic from engine/config-loader.ts
 * (once Phase 1 monorepo layout is in place).
 */

import type { ValidationResult, IKBRulesSnapshot, ValidationContext } from './types.js';
import type { IKBConfig } from '../../../common/types/engine.js'; // will resolve once monorepo paths are set

// -----------------------------------------------------------------------------
// Loader Injection (the key extensibility point for CMS + generator)
// -----------------------------------------------------------------------------

export type IKBLoader = (brandId: string) => Promise<IKBRulesSnapshot> | IKBRulesSnapshot;

let _ikbLoader: IKBLoader | null = null;

/**
 * Allow the host application (generator, Payload hook, etc.) to provide
 * the real IKB loader from engine/config-loader.ts.
 */
export function setIKBLoader(loader: IKBLoader) {
  _ikbLoader = loader;
}

/**
 * Internal loader that prefers the injected one, then tries a dynamic import
 * of the real engine loader, then falls back to safe defaults.
 */
async function loadRulesForBrand(brandId: string): Promise<IKBRulesSnapshot> {
  if (_ikbLoader) {
    return _ikbLoader(brandId);
  }

  // Best-effort dynamic import (works after Phase 1 monorepo wiring)
  try {
    // @ts-ignore - path will be correct once packages are linked
    const mod = await import('../../../engine/config-loader.js');
    if (mod?.loadIKB) {
      const ikb = await mod.loadIKB(brandId);
      return ikb.rules as IKBRulesSnapshot;
    }
  } catch {
    // fall through to default
  }

  console.warn(`[ikb-validator] Using built-in defaults for brand "${brandId}" (no loader registered)`);
  return DEFAULT_RULES;
}

const DEFAULT_RULES: IKBRulesSnapshot = {
  blocklistedContent: [
    'testimonial', 'testimonials', 'video', 'live-chat', 'team', 'experts',
    'award', 'awards', 'review', 'reviews'
  ],
  blocklistedPhrases: [
    'millions of customers', 'award-winning', 'industry-leading', 'world-class',
    'cutting-edge', 'revolutionary', 'game-changing', 'best-in-class',
    'proven results', 'guaranteed results', 'satisfaction guaranteed',
    '100% accurate', 'zero errors', 'guaranteed delivery'
  ],
  approvedSections: [
    'hero', 'howItWorks', 'features', 'faq', 'cta', 'footer',
    'trustSignals', 'difference', 'pricing'
  ],
  trustSignals: [],
  promoCodes: {}
};

/**
 * Validate a free-text phrase against the brand's blocklisted phrases.
 * This is the primary function a CMS should call on rich text / headline fields.
 */
export async function validatePhrase(
  phrase: string,
  brandId: string,
  context?: ValidationContext
): Promise<ValidationResult> {
  const rules = await loadRulesForBrand(brandId);
  const lower = phrase.toLowerCase();
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const blocked of rules.blocklistedPhrases) {
    if (lower.includes(blocked.toLowerCase())) {
      errors.push(`Blocklisted phrase detected: "${blocked}" (brand: ${brandId})`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate a content/section type against the brand's allow/block list.
 */
export async function validateContentType(
  type: string,
  brandId: string,
  context?: ValidationContext
): Promise<ValidationResult> {
  const rules = await loadRulesForBrand(brandId);
  const lower = type.toLowerCase();
  const errors: string[] = [];
  const warnings: string[] = [];

  if (rules.blocklistedContent.some(b => b.toLowerCase() === lower)) {
    errors.push(`Content type "${type}" is blocklisted for brand "${brandId}"`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate a section (by name or by object containing a name/type).
 * Checks against the brand's approvedSections + blocklistedContent.
 */
export async function validateSection(
  section: string | { name?: string; type?: string; [key: string]: unknown },
  brandId: string
): Promise<ValidationResult> {
  const rules = await loadRulesForBrand(brandId);
  const errors: string[] = [];
  const warnings: string[] = [];

  let sectionName = '';
  if (typeof section === 'string') {
    sectionName = section;
  } else if (section && typeof section === 'object') {
    sectionName = (section.name as string) || (section.type as string) || '';
  }

  if (!sectionName) {
    errors.push('Section is missing a name or type');
    return { valid: false, errors, warnings };
  }

  const lower = sectionName.toLowerCase();

  if (rules.blocklistedContent.some(b => b.toLowerCase() === lower)) {
    errors.push(`Section type "${sectionName}" is blocklisted for brand "${brandId}"`);
  }

  // If approvedSections is non-empty, the section must be explicitly allowed
  if (rules.approvedSections.length > 0) {
    const isApproved = rules.approvedSections.some(s => s.toLowerCase() === lower);
    if (!isApproved) {
      warnings.push(`Section "${sectionName}" is not in the approvedSections list for brand "${brandId}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Return the full rule snapshot for a brand (useful for admin UIs and debugging).
 */
export async function getIKBRules(brandId: string): Promise<IKBRulesSnapshot> {
  return loadRulesForBrand(brandId);
}

// -----------------------------------------------------------------------------
// Pure synchronous checkers (ideal for React context and anywhere rules are already in memory)
// -----------------------------------------------------------------------------

export function isPhraseAllowed(phrase: string, rules: IKBRulesSnapshot): boolean {
  const lower = phrase.toLowerCase();
  return !rules.blocklistedPhrases.some((blocked) =>
    lower.includes(blocked.toLowerCase())
  );
}

export function isContentAllowed(contentType: string, rules: IKBRulesSnapshot): boolean {
  const lower = contentType.toLowerCase();
  return !rules.blocklistedContent.some((b) => b.toLowerCase() === lower);
}

export async function getApprovedSections(brandId: string): Promise<string[]> {
  const rules = await loadRulesForBrand(brandId);
  return [...rules.approvedSections];
}
