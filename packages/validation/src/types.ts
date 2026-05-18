/**
 * @microsite/validation
 * Shared types for IKB compliance validation and content quality.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface IKBRulesSnapshot {
  blocklistedContent: string[];
  blocklistedPhrases: string[];
  approvedSections: string[];
  trustSignals: string[];
  promoCodes: Record<string, string>;
}

export interface ValidationContext {
  brandId: string;
  siteSlug?: string;
  sectionName?: string;
}
