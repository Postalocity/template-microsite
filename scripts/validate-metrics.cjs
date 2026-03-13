#!/usr/bin/env node
/**
 * Metric Validator
 * 
 * Validates site configs for unverified metrics and specific claims.
 * Run before committing changes: node scripts/validate-metrics.js
 */

const fs = require('fs');
const path = require('path');

// Prohibited patterns (unverified metrics)
const prohibitedPatterns = [
  {
    pattern: /\d+\+?\s*Hours?\/Week/i,
    message: "Specific time savings claims (e.g., '15+ Hours/Week') require data sources",
    severity: "ERROR"
  },
  {
    pattern: /\d+\+?\s*hours?\s*(saved|weekly|saved)/i,
    message: "Specific time savings claims (e.g., '15+ hours saved') require data sources",
    severity: "ERROR"
  },
  {
    pattern: /up\s*to\s*\d+%/i,
    message: "'Up to X%' claims require data sources",
    severity: "ERROR"
  },
  {
    pattern: /\d+%\s*(fewer|more|reduction|increase|improvement)/i,
    message: "Specific percentage claims (e.g., '95% fewer') require data sources",
    severity: "ERROR"
  },
  {
    pattern: /\d+%\s*open\s*rate/i,
    message: "Specific open rate claims require data sources",
    severity: "ERROR"
  },
  {
    pattern: /\d+%\s*of\s*(mail|letters|documents)/i,
    message: "Specific percentage of mail claims require data sources",
    severity: "ERROR"
  },
  {
    pattern: /\d+\+?\s*more\s*clients/i,
    message: "Specific client increase claims require data sources",
    severity: "ERROR"
  }
];

// Warning patterns (should be reviewed)
const warningPatterns = [
  {
    pattern: /save\s*\d+/i,
    message: "Any 'save' with numbers should be reviewed",
    severity: "WARNING"
  },
  {
    pattern: /\d+%/i,
    message: "Any percentage should be reviewed for source",
    severity: "WARNING"
  }
];

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check prohibited patterns
  prohibitedPatterns.forEach(({ pattern, message, severity }) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        issues.push({
          file: path.basename(filePath),
          match: match,
          message,
          severity,
          line: getLineNumber(content, match)
        });
      });
    }
  });
  
  // Check warning patterns
  warningPatterns.forEach(({ pattern, message, severity }) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // Skip if already caught by prohibited patterns
        const alreadyCaught = issues.some(issue => issue.match === match);
        if (!alreadyCaught) {
          issues.push({
            file: path.basename(filePath),
            match: match,
            message,
            severity,
            line: getLineNumber(content, match)
          });
        }
      });
    }
  });
  
  return issues;
}

function getLineNumber(content, searchStr) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchStr)) {
      return i + 1;
    }
  }
  return 'unknown';
}

function main() {
  const configDir = path.join(__dirname, '..', 'config', 'sites');
  const files = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));
  
  let totalErrors = 0;
  let totalWarnings = 0;
  const allIssues = [];
  
  console.log('🔍 Validating site configs for unverified metrics...\n');
  
  files.forEach(file => {
    const filePath = path.join(configDir, file);
    const issues = validateFile(filePath);
    
    if (issues.length > 0) {
      console.log(`\n📄 ${file}:`);
      issues.forEach(issue => {
        const icon = issue.severity === 'ERROR' ? '❌' : '⚠️';
        console.log(`  ${icon} Line ${issue.line}: "${issue.match}"`);
        console.log(`     ${issue.message}`);
        
        if (issue.severity === 'ERROR') totalErrors++;
        if (issue.severity === 'WARNING') totalWarnings++;
      });
      allIssues.push(...issues);
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`Results: ${totalErrors} errors, ${totalWarnings} warnings`);
  
  if (totalErrors > 0) {
    console.log('\n❌ VALIDATION FAILED: Fix errors before committing');
    console.log('\nRecommended fixes:');
    console.log('  - Replace specific numbers with general language');
    console.log('  - Or add source citations with methodology');
    console.log('  - See docs/METRIC_VALIDATION.md for guidelines');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️ VALIDATION PASSED with warnings (review recommended)');
    process.exit(0);
  } else {
    console.log('\n✅ VALIDATION PASSED: No unverified metrics found');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateFile, prohibitedPatterns };
