/**
 * Content Factory & Guardrails
 * 
 * Validators and rules to ensure content consistency and prevent AI hallucination.
 * All content generated for Postalocity microsites must pass these validators.
 */

import fs from 'fs';
import path from 'path';

// Phase 2: Unified validation layer (preferred path when brandId is known)
import { validatePhrase } from '../packages/validation/src/index.js';
import { initializeValidation } from '../packages/validation/src/index.js';
initializeValidation();

// =============================================================================
// ALLOWLISTS
// =============================================================================

/** Approved trust signal badges - ONLY these may be used */
export const APPROVED_TRUST_SIGNALS = [
  'NCOA Verified 2024',
  'CASS Certified 2024',
  'ISO 9001 Documented Processes 2023',
] as const;

/** Promo code short codes by site slug */
export const PROMO_CODES: Record<string, string> = {
  'credit-repair': 'cr2026',
  'debt-collection': 'debt2026',
  'healthcare-billing': 'hb2026',
  'healthcare-mailing-services': 'hm2026',
  'postcard': 'pc2026',
  'self-storage': 'pm2026',
};

/** Approved section types */
export const APPROVED_SECTIONS = [
  'hero',
  'howItWorks',
  'features',
  'faq',
  'cta',
  'footer',
  'trustSignals',
  'difference',
  'pricing',
] as const;

/** US Mail class identifiers */
export const MAIL_CLASSES = [
  'first-class',
  'first-class-mail',
  'priority-mail',
  'priority',
  'certified-mail',
  'certified',
  'marketing-mail',
  'standard-mail',
] as const;

// =============================================================================
// BLOCKLISTS
// =============================================================================

/** Content that CANNOT appear on any microsite */
export const BLOCKLISTED_CONTENT = [
  'testimonial',
  'testimonials',
  'case-study',
  'case-studies',
  'video',
  'video-content',
  'live-chat',
  'livechat',
  'team',
  'experts',
  'award',
  'awards',
  'review',
  'reviews',
  'aggregateRating',
  'star rating',
  '5-star',
] as const;

/** Blocklisted phrases that indicate hallucination or unverified claims */
export const BLOCKLISTED_PHRASES = [
  'millions of customers',
  'award-winning',
  'industry-leading',
  'world-class',
  'cutting-edge',
  'revolutionary',
  'game-changing',
  'best-in-class',
  'proven results',
  'guaranteed results',
  'satisfaction guaranteed',
  '100% accurate',
  'zero errors',
  'trusted by celebrities',
  'featured in Forbes',
  'as seen on TV',
  'guaranteed delivery',
  '100% delivery',
] as const;

// =============================================================================
// VALIDATORS
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate trust signals against approved list
 */
export function validateTrustSignals(badges: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!Array.isArray(badges) || badges.length === 0) {
    errors.push('Trust signals array is empty or missing');
    return { valid: false, errors, warnings };
  }

  for (const badge of badges) {
    if (!APPROVED_TRUST_SIGNALS.includes(badge as typeof APPROVED_TRUST_SIGNALS[number])) {
      errors.push(`Invalid trust signal: "${badge}". Only these are allowed: ${APPROVED_TRUST_SIGNALS.join(', ')}`);
    }
  }

  if (badges.length !== 3) {
    warnings.push(`Expected 3 trust signals, found ${badges.length}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate promo code format
 */
export function validatePromoCode(code: string | undefined, siteSlug: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!code) {
    errors.push(`Promo code missing for site: ${siteSlug}`);
    return { valid: false, errors, warnings };
  }

  const expectedCode = PROMO_CODES[siteSlug];
  if (!expectedCode) {
    errors.push(`Unknown site slug: ${siteSlug}`);
    return { valid: false, errors, warnings };
  }

  if (code !== expectedCode) {
    errors.push(`Invalid promo code "${code}" for ${siteSlug}. Expected: ${expectedCode}`);
  }

  // Check it's not the full slug
  if (code.includes('-')) {
    errors.push(`Promo code "${code}" appears to be a slug, not a short code. Use: ${expectedCode}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate section types
 */
export function validateSections(sections: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sectionKeys = Object.keys(sections);

  // Check for required sections
  const requiredSections = ['hero', 'howItWorks', 'cta', 'footer', 'trustSignals'];
  for (const required of requiredSections) {
    if (!sectionKeys.includes(required)) {
      errors.push(`Missing required section: ${required}`);
    }
  }

  // Check for blocklisted sections
  for (const key of sectionKeys) {
    if (BLOCKLISTED_CONTENT.includes(key as typeof BLOCKLISTED_CONTENT[number])) {
      errors.push(`Blocklisted section found: ${key}`);
    }
  }

  // Check for unknown sections
  for (const key of sectionKeys) {
    if (!APPROVED_SECTIONS.includes(key as typeof APPROVED_SECTIONS[number])) {
      warnings.push(`Unknown section type: ${key}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate hero structure
 */
export function validateHero(hero: { main?: string; highlightTerm?: string } | undefined): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!hero) {
    errors.push('Hero section is missing');
    return { valid: false, errors, warnings };
  }

  if (!hero.main) {
    errors.push('Hero main headline is missing');
  }

  if (typeof hero.main === 'string' && hero.main.length < 10) {
    warnings.push('Hero headline seems too short');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Check content for blocklisted phrases.
 * 
 * Phase 2: When brandId is provided, delegates to the unified @microsite/validation layer
 * which uses the live per-brand IKB rules. Falls back to the legacy hardcoded list otherwise.
 */
/**
 * Check content for blocklisted phrases.
 * 
 * When brandId is provided → uses the live unified @microsite/validation layer (async).
 * When brandId is omitted → uses the legacy hardcoded BLOCKLISTED_PHRASES list (sync for backward compat).
 */
export function validateContentBlocks(
  content: string, 
  context: string = 'content',
  brandId?: string
): ValidationResult | Promise<ValidationResult> {
  if (brandId) {
    // New path - must be awaited by caller
    return (async () => {
      const result = await validatePhrase(content, brandId);
      return {
        valid: result.valid,
        errors: result.errors.map(e => `${e} in ${context}`),
        warnings: result.warnings
      };
    })();
  }

  // Legacy sync path (preserves all existing call sites that don't pass brandId)
  const errors: string[] = [];
  const warnings: string[] = [];
  const lowerContent = content.toLowerCase();

  for (const phrase of BLOCKLISTED_PHRASES) {
    if (lowerContent.includes(phrase.toLowerCase())) {
      errors.push(`Blocklisted phrase "${phrase}" found in ${context}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate mail class descriptions
 */
export function validateMailClassDescription(description: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for First-Class requirements in context
  if (description.toLowerCase().includes('hipaa') || description.toLowerCase().includes('compliance')) {
    if (!description.toLowerCase().includes('first-class')) {
      warnings.push('HIPAA/compliance context mentions should reference First-Class Mail');
    }
  }

  // Marketing Mail restrictions
  if (description.toLowerCase().includes('marketing mail') || description.toLowerCase().includes('standard mail')) {
    if (description.toLowerCase().includes('account number')) {
      errors.push('Marketing Mail cannot include account numbers');
    }
    if (description.toLowerCase().includes('balance')) {
      errors.push('Marketing Mail cannot include balance information');
    }
    if (description.toLowerCase().includes('personalized')) {
      warnings.push('Marketing Mail should not emphasize personalization');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate complete site configuration
 */
export function validateSiteConfig(config: Record<string, unknown>, siteSlug: string): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // Validate sections
  const sections = config.sections as Record<string, unknown> | undefined;
  if (sections) {
    const sectionResult = validateSections(sections);
    allErrors.push(...sectionResult.errors.map(e => `Sections: ${e}`));
    allWarnings.push(...sectionResult.warnings.map(w => `Sections: ${w}`));
  }

  // Validate trust signals
  const trustSignals = sections?.trustSignals as { badges?: string[] } | undefined;
  if (trustSignals?.badges) {
    const trustResult = validateTrustSignals(trustSignals.badges);
    allErrors.push(...trustResult.errors.map(e => `Trust Signals: ${e}`));
    allWarnings.push(...trustResult.warnings.map(w => `Trust Signals: ${w}`));
  }

  // Validate promo code in CTA
  const cta = sections?.cta as { promoCode?: string } | undefined;
  if (cta) {
    const promoResult = validatePromoCode(cta.promoCode, siteSlug);
    allErrors.push(...promoResult.errors.map(e => `CTA: ${e}`));
    allWarnings.push(...promoResult.warnings.map(w => `CTA: ${w}`));
  }

  // Validate hero
  const hero = sections?.hero as { main?: string; highlightTerm?: string } | undefined;
  if (hero) {
    const heroResult = validateHero(hero);
    allErrors.push(...heroResult.errors.map(e => `Hero: ${e}`));
    allWarnings.push(...heroResult.warnings.map(w => `Hero: ${w}`));
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

// =============================================================================
// CONFIG FILE VALIDATOR
// =============================================================================

/**
 * Validate a site config file
 */
export function validateConfigFile(configPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!fs.existsSync(configPath)) {
    errors.push(`Config file not found: ${configPath}`);
    return { valid: false, errors, warnings };
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(content);

    // Extract site slug from filename
    const filename = path.basename(configPath, '.json');
    const siteSlug = filename === 'template' ? '' : filename;

    const result = validateSiteConfig(config, siteSlug);
    errors.push(...result.errors);
    warnings.push(...result.warnings);

  } catch (e) {
    errors.push(`Failed to parse config: ${e}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all available promo codes
 */
export function getPromoCodeList(): Array<{ site: string; code: string }> {
  return Object.entries(PROMO_CODES).map(([site, code]) => ({ site, code }));
}

/**
 * Get all approved trust signals
 */
export function getApprovedTrustSignals(): readonly string[] {
  return APPROVED_TRUST_SIGNALS;
}

/**
 * Check if content contains blocklisted items
 */
export function containsBlocklistedContent(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return BLOCKLISTED_CONTENT.some(item => lowerContent.includes(item.toLowerCase()));
}

/**
 * Generate a content validation report
 */
export function generateReport(configs: string[]): {
  total: number;
  passed: number;
  failed: number;
  results: Record<string, ValidationResult>;
} {
  const results: Record<string, ValidationResult> = {};
  let passed = 0;
  let failed = 0;

  for (const configPath of configs) {
    const result = validateConfigFile(configPath);
    const name = path.basename(configPath);
    results[name] = result;

    if (result.valid) {
      passed++;
    } else {
      failed++;
    }
  }

  return {
    total: configs.length,
    passed,
    failed,
    results,
  };
}
