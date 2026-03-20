#!/usr/bin/env node

/**
 * Content Quality Validator
 * 
 * Validates microsite content for clarity, completeness, and brand consistency.
 * Catches common issues like fragmented sentences, hedging phrases, and missing content.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// VALIDATION RULES
// =============================================================================

const rules = {
  /**
   * FRAGMENTED_SENTENCES
   * Detects incomplete sentences that start with conjunctions or gerunds
   * without a proper subject/verb structure.
   */
  FRAGMENTED_SENTENCES: {
    severity: 'error',
    patterns: [
      {
        // Sentence starts with ", verb-ing" after a period
        regex: /,\s+[A-Z][a-z]+(?:ing|en)\s+[^.!?]*[.!?]?$/gm,
        message: 'Possible fragmented sentence: starts with conjunction or modifier without complete clause'
      },
      {
        // Gerund (-ing) as sentence start after period
        regex: /\.(\s+)[A-Z][a-z]+(?:ing)\s+[^.!?]+[.!?]?$/gm,
        message: 'Sentence may be a fragment starting with gerund'
      }
    ]
  },

  /**
   * HEDGING_PHRASES
   * Detects vague language that undermines confidence.
   * Should be replaced with specific explanations.
   */
  HEDGING_PHRASES: {
    severity: 'error',
    patterns: [
      {
        regex: /may meet|may help|may support|could meet|verify with your legal counsel/i,
        message: 'Contains hedging language - replace with specific explanation of what the feature does'
      },
      {
        regex: /verify with (your|the) (legal|attorney|counsel)/i,
        message: 'Hedge phrase detected - explain what the feature provides instead'
      }
    ]
  },

  /**
   * INCOMPLETE_SENTENCES
   * Detects sentence fragments that lack proper verb structure.
   */
  INCOMPLETE_SENTENCES: {
    severity: 'warning',
    patterns: [
      {
        // Sentence that just ends with a noun phrase
        regex: /^[A-Z][^.!?]*\s+(?:includes?|provides?|offers?|delivers?)\s+[^.!?]*[.!?]?\s*$/gim,
        message: 'Sentence may lack complete verb structure'
      },
      {
        // Starting with "for" as if continuing previous thought
        regex: /\.(\s+For\s+[^.!?]+[.!?]?)$/gm,
        message: 'Sentence appears to be a fragment starting with "For"'
      }
    ]
  },

  /**
   * COMPARISON_TABLE_CHECKS
   * Validates comparison table structure and content.
   * Only applies to configs that use the rows format (not chart format).
   */
  COMPARISON_TABLE: {
    severity: 'error',
    checks: [
      {
        name: 'ENVELOPE_ROW_LAST',
        validate: (rows) => {
          // Skip if no rows (config uses chart format or has no comparison)
          if (!rows || rows.length === 0) return { valid: true };
          const lastRow = rows[rows.length - 1];
          if (lastRow.feature !== 'Envelope') {
            return { valid: false, message: `Envelope row should be last, but last row is "${lastRow.feature}"` };
          }
          return { valid: true };
        }
      },
      {
        name: 'SELF_MAILER_TEXT',
        validate: (rows) => {
          // Skip if no rows
          const envelopeRow = rows?.find(r => r.feature === 'Envelope');
          if (!envelopeRow) return { valid: true };
          const traditional = envelopeRow.traditionalApproach;
          if (!traditional.includes('Self-mailer') || !traditional.includes('No envelope')) {
            return { valid: false, message: `Envelope row traditional column should say "Self-mailer — No envelope", got: "${traditional}"` };
          }
          return { valid: true };
        }
      },
      {
        name: 'ENVELOPE_INCLUDE_TEXT',
        validate: (rows) => {
          // Skip if no rows
          const envelopeRow = rows?.find(r => r.feature === 'Envelope');
          if (!envelopeRow) return { valid: true };
          const ourSolution = typeof envelopeRow.ourSolution === 'object' 
            ? envelopeRow.ourSolution.text 
            : envelopeRow.ourSolution;
          if (!ourSolution.includes('Included') || !ourSolution.includes('Color Optional')) {
            return { valid: false, message: `Envelope row should say "Included — Color Optional", got: "${ourSolution}"` };
          }
          return { valid: true };
        }
      },
      {
        name: 'ALL_ROWS_HAVE_ICON',
        validate: (rows) => {
          // Skip if no rows
          if (!rows || rows.length === 0) return { valid: true };
          const issues = [];
          rows?.forEach((row, i) => {
            if (!row.icon) {
              issues.push(`Row ${i + 1} "${row.feature}" is missing icon`);
            }
          });
          if (issues.length > 0) {
            return { valid: false, message: issues.join('; ') };
          }
          return { valid: true };
        }
      }
    ]
  },

  /**
   * PRICE_CLARITY
   * Ensures prices are clearly explained.
   */
  PRICE_CLARITY: {
    severity: 'warning',
    patterns: [
      {
        regex: /\$1\.31\s+includes?\s+everything/i,
        message: '"$1.31 includes everything" is vague - specify what is included: print, fold, stuff, seal, postage, envelope'
      }
    ]
  },

  /**
   * IKB_PROOF_OF_MAILING
   * Ensures Proof of Mailing terminology is consistent with IKB standards.
   */
  IKB_PROOF_OF_MAILING: {
    severity: 'error',
    patterns: [
      {
        regex: /our internal document/i,
        message: 'Use "Documents that Postalocity processed and mailed" instead of "our internal document"'
      },
      {
        regex: /proving we processed/i,
        message: 'Use "proving Postalocity processed" instead of "proving we processed"'
      },
      {
        regex: /verify with (your|the) (legal|attorney|counsel)/i,
        message: 'Do not use "verify with legal counsel" - explain what Certificate of Mailing provides instead'
      }
    ]
  },

  /**
   * IKB_TRACKING_TERMINOLOGY
   * Ensures tracking vs scanning terminology is consistent.
   */
  IKB_TRACKING_TERMINOLOGY: {
    severity: 'warning',
    patterns: [
      {
        regex: /tracking.*includes? scan tracing|scan tracing.*includes? tracking/i,
        message: 'Scan tracing and full tracking are different - do not conflate them'
      }
    ]
  },

  /**
   * IKB_SELF_MAILER
   * Ensures self-mailer terminology is consistent.
   */
  IKB_SELF_MAILER: {
    severity: 'warning',
    patterns: [
      {
        regex: /loose paper|loose papers/i,
        message: 'Use "Self-mailer" instead of "loose paper" for professional terminology'
      },
      {
        regex: /sticker|stickers/i,
        message: 'Use "Self-mailer" instead of "sticker" for professional terminology'
      }
    ]
  },

  /**
   * IKB_BLOCKLISTED_PHRASES
   * Catches phrases that imply legal guarantees or use incorrect terminology.
   */
  IKB_BLOCKLISTED_PHRASES: {
    severity: 'error',
    patterns: [
      {
        regex: /legal-grade|legal grade/i,
        message: 'Use "Proof of Mailing (Affidavit)" instead of "Legal-Grade Proof of Mailing"'
      },
      {
        regex: /defensible (documentation|proof)/i,
        message: 'Use standard IKB terminology - do not use "defensible documentation" or "defensible proof"'
      },
      {
        regex: /defensible for compliance/i,
        message: 'Use standard IKB terminology for proof and compliance'
      },
      {
        regex: /legally-compliant|legally compliant/i,
        message: 'Use standard IKB terminology - avoid "legally compliant"'
      }
    ]
  },

  /**
   * IKB_PROOF_TITLE
   * Ensures Proof of Mailing titles use correct IKB format.
   */
  IKB_PROOF_TITLE: {
    severity: 'error',
    patterns: [
      {
        // Match "Proof of Mailing" NOT followed by "(Affidavit)"
        regex: /Proof of Mailing(?! \([^)]*\))/i,
        message: 'Use "Proof of Mailing (Affidavit)" - include "(Affidavit)" in title'
      }
    ]
  },

  /**
   * SEO_BREADCRUMB
   * Ensures BreadcrumbList schema is present for SERP rich results.
   */
  SEO_BREADCRUMB: {
    severity: 'warning',
    validate: (config) => {
      // This is a structural check - will be validated by checking generated HTML
      return null;
    }
  },

  /**
   * SEO_ADDRESS
   * Ensures LocalBusiness has proper address coordinates.
   */
  SEO_ADDRESS: {
    severity: 'error',
    patterns: [
      {
        regex: /"latitude":\s*"39\.1147"/,
        message: 'Wrong coordinates: 39.1147 is Kansas center, not Wichita (37.6872)'
      },
      {
        regex: /"longitude":\s*"-95\.6798"/,
        message: 'Wrong coordinates: -95.6798 is Kansas center, not Wichita (-97.3325)'
      }
    ]
  },

  /**
   * SEO_HERO_ALT
   * Ensures hero image has descriptive alt text.
   */
  SEO_HERO_ALT: {
    severity: 'warning',
    patterns: [
      {
        regex: /"alt":\s*"Background"|"alt":\s*"background"|"alt":\s*"Hero"/i,
        message: 'Hero image alt text is too generic - describe the actual image content'
      }
    ]
  },

  /**
   * BENEFITS_DESCRIPTION_REQUIRED
   * Ensures benefits have both description and detail.
   */
  BENEFITS_DESCRIPTION_REQUIRED: {
    severity: 'warning',
    validate: (benefits) => {
      const issues = [];
      benefits?.benefits?.forEach((b, i) => {
        if (!b.description || b.description.length < 20) {
          issues.push(`Benefit ${i + 1} "${b.title}" has weak or missing description`);
        }
        if (!b.detail && b.description && b.description.length > 100) {
          // Long description without a focused detail line
        }
      });
      return issues.length > 0 ? issues : null;
    }
  }
};

// =============================================================================
// VALIDATOR CLASS
// =============================================================================

class ContentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = { files: 0, checks: 0 };
  }

  log(type, message, context = '') {
    const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
    const fullMessage = context ? `${prefix} ${message}\n   Context: ${context}` : `${prefix} ${message}`;
    
    if (type === 'error') {
      this.errors.push(fullMessage);
    } else if (type === 'warning') {
      this.warnings.push(fullMessage);
    }
    console.log(fullMessage);
  }

  /**
   * Validate a single config file
   */
  validateConfig(configPath) {
    this.stats.files++;
    console.log(`\n📋 Validating: ${path.basename(configPath)}`);
    
    let config;
    try {
      const content = fs.readFileSync(configPath, 'utf-8');
      config = JSON.parse(content);
    } catch (e) {
      this.log('error', `Failed to parse JSON: ${e.message}`);
      return false;
    }

    let hasErrors = false;

    // Check comparison table
    if (config.content?.comparison?.rows) {
      this.stats.checks++;
      const rows = config.content.comparison.rows;
      
      for (const check of rules.COMPARISON_TABLE.checks) {
        this.stats.checks++;
        const result = check.validate(rows);
        if (!result.valid) {
          this.log('error', `Comparison ${check.name}: ${result.message}`);
          hasErrors = true;
        }
      }
    }

    // Check for fragmented sentences in services
    if (config.content?.services?.services) {
      for (const service of config.content.services.services) {
        if (service.description) {
          this.validateText(service.description, service.title);
        }
      }
    }

    // Check for fragmented sentences in benefits
    if (config.content?.benefits?.benefits) {
      for (const benefit of config.content.benefits.benefits) {
        if (benefit.description) {
          this.validateText(benefit.description, benefit.title);
        }
        if (benefit.detail) {
          this.validateText(benefit.detail, `${benefit.title} (detail)`);
        }
      }
    }

    // Check for fragmented sentences in difference/differentiators
    if (config.content?.difference?.differences) {
      for (const diff of config.content.difference.differences) {
        if (diff.description) {
          this.validateText(diff.description, diff.title);
        }
      }
    }

    // Check FAQ answers
    if (config.content?.faq?.faqs) {
      for (const faq of config.content.faq.faqs) {
        if (faq.a) {
          this.validateText(faq.a, `FAQ: ${faq.q}`);
        }
      }
    }

    // Check prices are clearly explained
    if (config.content) {
      const text = JSON.stringify(config.content);
      
      // Check for vague price mentions
      if (/\$[\d.]+\s+includes?\s+everything/i.test(text)) {
        this.log('warning', rules.PRICE_CLARITY.patterns[0].message, '$X includes everything');
      }
    }

    return !hasErrors;
  }

  /**
   * Validate text content against rules
   */
  validateText(text, context = '') {
    // Check hedging phrases
    for (const pattern of rules.HEDGING_PHRASES.patterns) {
      if (pattern.regex.test(text)) {
        this.log('error', pattern.message, context);
      }
    }

    // Check for vague price language
    for (const pattern of rules.PRICE_CLARITY.patterns) {
      if (pattern.regex.test(text)) {
        this.log('warning', pattern.message, context);
      }
    }

    // Check Proof of Mailing terminology
    for (const pattern of rules.IKB_PROOF_OF_MAILING.patterns) {
      if (pattern.regex.test(text)) {
        this.log('error', pattern.message, context);
      }
    }

    // Check tracking terminology
    for (const pattern of rules.IKB_TRACKING_TERMINOLOGY.patterns) {
      if (pattern.regex.test(text)) {
        this.log('warning', pattern.message, context);
      }
    }

    // Check self-mailer terminology
    for (const pattern of rules.IKB_SELF_MAILER.patterns) {
      if (pattern.regex.test(text)) {
        this.log('warning', pattern.message, context);
      }
    }

    // Check blocklisted phrases
    for (const pattern of rules.IKB_BLOCKLISTED_PHRASES.patterns) {
      if (pattern.regex.test(text)) {
        this.log('error', pattern.message, context);
      }
    }

    // Check proof title format - only for titles (not descriptions/answers)
    // Titles are: benefits, services, differences, services
    const isProofTitle = context && !context.includes('FAQ:') && !context.includes('Every Letter') && !context.includes('tagline') && !context.includes('(detail)') && !context.includes('(description)');
    // Only check text that appears to be a title (short text without many sentences)
    if (isProofTitle && text.split(/[.!?]/).length <= 2) {
      for (const pattern of rules.IKB_PROOF_TITLE.patterns) {
        if (pattern.regex.test(text)) {
          this.log('error', pattern.message, context);
        }
      }
    }

    // Check for potential fragmented sentences
    // This is a simplified check - looks for sentences that end oddly
    const sentences = text.split(/(?<=[.!?])\s+/);
    for (const sentence of sentences) {
      if (sentence.trim().length > 10) {
        // Check for sentence starting with conjunction after comma (possible fragment)
        if (/,\s+[A-Z][a-z]+(?:ing|en)\s+[^.!?]*$/i.test(sentence)) {
          this.log('warning', 'Sentence may be a fragment starting with modifier', context);
        }
        
        // Check for sentence that seems incomplete
        if (/^\s*[A-Z][^.!?]*\s+(?:with|for|in|to|by)\s+[^.!?]*$/i.test(sentence.trim())) {
          this.log('warning', 'Sentence may lack complete ending', context);
        }
      }
    }
  }

  /**
   * Validate all configs in a directory
   */
  validateDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      this.log('error', `Directory not found: ${dirPath}`);
      return;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
    
    for (const file of files) {
      this.validateConfig(path.join(dirPath, file));
    }
  }

  /**
   * Print summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Files checked: ${this.stats.files}`);
    console.log(`Checks run: ${this.stats.checks}`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(e => console.log(`   ${e}`));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS:');
      this.warnings.forEach(w => console.log(`   ${w}`));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All content passes validation!');
    }

    return this.errors.length === 0;
  }
}

// =============================================================================
// CLI
// =============================================================================

function main() {
  const args = process.argv.slice(2);
  const validator = new ContentValidator();

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Content Quality Validator

USAGE:
  node scripts/content-validator.js [options]

OPTIONS:
  --all          Validate all brand configs (default: postalocity)
  --brand <id>   Validate specific brand configs
  --fix          Attempt to auto-fix issues where possible
  --strict       Treat warnings as errors
  --help         Show this help

EXAMPLES:
  node scripts/content-validator.js
  node scripts/content-validator.js --brand postalocity
  node scripts/content-validator.js --all
    `);
    process.exit(0);
  }

  const brands = args.includes('--all') 
    ? ['postalocity', 'promo', 'techsp']
    : ['postalocity'];

  let allValid = true;

  for (const brand of brands) {
    const configDir = path.join(__dirname, '..', 'config', 'sites', brand);
    
    if (fs.existsSync(configDir)) {
      const result = validator.validateDirectory(configDir);
      if (!result) allValid = false;
    } else {
      console.log(`\n⚠️ Config directory not found: ${configDir}`);
    }
  }

  const passed = validator.printSummary();
  process.exit(passed ? 0 : 1);
}

// Only run main if this is the main module (not when imported)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  main();
}

export { ContentValidator, rules };
