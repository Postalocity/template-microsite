/**
 * @microsite/validation/content-quality
 *
 * Writing-quality and style linter rules (hedging, fragments, etc.).
 * These are the rules currently in scripts/content-validator.js.
 * They are intentionally separate from IKB compliance rules.
 */

import type { ValidationResult } from './types.js';

// TODO(Phase 2): Port the full rule set from scripts/content-validator.js
// For the initial scaffold we expose the same shape so CMS authors can start wiring it.

export const QUALITY_RULES = {
  HEDGING_PHRASES: [
    'may meet', 'may help', 'may support', 'could meet',
    'verify with your legal counsel'
  ],
  BLOCKLISTED_CLAIMS: [
    'millions of customers', 'award-winning', 'industry-leading'
  ]
};

export function validateWritingQuality(text: string, context = 'content'): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lower = text.toLowerCase();

  for (const phrase of QUALITY_RULES.HEDGING_PHRASES) {
    if (lower.includes(phrase)) {
      errors.push(`Hedging language detected in ${context}: "${phrase}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
