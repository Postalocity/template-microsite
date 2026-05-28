/**
 * @microsite/validation/content-quality
 *
 * Writing-quality and style linter rules (hedging, fragments, etc.).
 * Ported from scripts/content-validator.js so the CMS and generator share the same checks.
 */

import type { ValidationResult } from './types';

interface QualityRule {
  regex: RegExp;
  message: string;
  severity: 'error' | 'warning';
}

export const QUALITY_RULES: Record<string, { severity: string; patterns?: QualityRule[] }> = {
  FRAGMENTED_SENTENCES: {
    severity: 'error',
    patterns: [
      {
        regex: /,\s+[A-Z][a-z]+(?:ing|en)\s+[^.!?]*[.!?]?$/gm,
        message: 'Possible fragmented sentence: starts with conjunction or modifier without complete clause',
        severity: 'error',
      },
      {
        regex: /\.(\s+)[A-Z][a-z]+(?:ing)\s+[^.!?]+[.!?]?$/gm,
        message: 'Sentence may be a fragment starting with gerund',
        severity: 'error',
      },
    ],
  },
  HEDGING_PHRASES: {
    severity: 'error',
    patterns: [
      {
        regex: /may meet|may help|may support|could meet|verify with your legal counsel/i,
        message: 'Contains hedging language - replace with specific explanation of what the feature does',
        severity: 'error',
      },
      {
        regex: /verify with (your|the) (legal|attorney|counsel)/i,
        message: 'Hedge phrase detected - explain what the feature provides instead',
        severity: 'error',
      },
    ],
  },
  INCOMPLETE_SENTENCES: {
    severity: 'warning',
    patterns: [
      {
        regex: /^[A-Z][^.!?]*\s+(?:includes?|provides?|offers?|delivers?)\s+[^.!?]*[.!?]?\s*$/gim,
        message: 'Sentence may lack complete verb structure',
        severity: 'warning',
      },
    ],
  },
};

export function validateWritingQuality(text: string, context = 'content'): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const rulesToCheck = [
    ...(QUALITY_RULES.FRAGMENTED_SENTENCES.patterns || []),
    ...(QUALITY_RULES.HEDGING_PHRASES.patterns || []),
    ...(QUALITY_RULES.INCOMPLETE_SENTENCES.patterns || []),
  ];

  for (const rule of rulesToCheck) {
    if (rule.regex.test(text)) {
      const msg = `${rule.message} (in ${context})`;
      if (rule.severity === 'error') errors.push(msg);
      else warnings.push(msg);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
