# Metric Validation Rules

## Prohibited Without Source

### Specific Time Savings
- ❌ "Save X Hours/Week"
- ❌ "Save X Hours Weekly"
- ❌ "Reclaim X hours"
- ❌ "X+ hours saved"
- ✅ "Save time on mailing" (general, no specific number)
- ✅ "Reduce processing time" (general, no specific number)

### Specific Percentages
- ❌ "95% fewer returns"
- ❌ "90% open rate"
- ❌ "40% more clients"
- ❌ "50% reduction"
- ❌ "Up to X%"
- ✅ "Reduce returned mail" (general)
- ✅ "High open rates" (general)
- ✅ "Improve efficiency" (general)

### Specific Counts
- ❌ "5,000+ letters" (unless this is actual capacity spec)
- ❌ "500+ letters" (unless this is capacity)
- ❌ "40% more clients"
- ✅ "High-volume processing" (general)
- ✅ "Scales with your needs" (general)

## Acceptable with Source

If specific metric is used, must include:
- Source citation (study name, date)
- Link to source data
- Context/limitations

Example:
"Save time on mailing (Based on 2024 Postalocity customer survey, n=150, average reported time savings)"

## Capacity Specifications

Capacity ranges are acceptable as product specs:
- ✅ "Handles 50 to 5,000 letters monthly" (product capacity)
- ✅ "No minimum volume" (product feature)
- ✅ "Scales from small practices to enterprise" (general)

## Customer Testimonials

Customer quotes with metrics are acceptable IF:
- ✅ It's an actual customer quote
- ✅ Customer name and date provided
- ✅ Metric is their personal experience
- ❌ Don't use in headlines/hero (too prominent)
- ✅ Can use in testimonial section only

## Validator Implementation

### Pre-Commit Check
```javascript
const prohibitedPatterns = [
  /\d+\+?\s*Hours?\/Week/i,
  /\d+\+?\s*hours?\s*(saved|weekly)/i,
  /up\s*to\s*\d+%/i,
  /\d+%\s*(fewer|more|reduction|increase)/i,
  /\d+%\s*open\s*rate/i
];

function validateMetrics(text) {
  const violations = [];
  prohibitedPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      violations.push(`Unverified metric found: ${text.match(pattern)[0]}`);
    }
  });
  return violations;
}
```

### Usage
Run validation on:
1. Hero headlines
2. Hero subheads
3. Benefit descriptions
4. Service descriptions
5. FAQ answers

### What to Use Instead

**Instead of:** "Save 15+ Hours/Week"
**Use:** "Save time on mailing operations"
**Or:** "Reclaim time for higher-value work"
**Or:** "Reduce manual processing time"

**Instead of:** "95% fewer returns"
**Use:** "Reduce returned mail"
**Or:** "Improve deliverability"
**Or:** "Fewer undeliverable addresses"

**Instead of:** "90% open rate"
**Use:** "High engagement rates"
**Or:** "Physical mail gets noticed"
**Or:** "Better visibility than email"

## Current Violations to Fix

1. debt-collection headline: "Save 15+ Hours/Week"
2. healthcare-mailing headline: "Save 15+ Hours Weekly"
3. debt-collection benefits: "Up to 95% fewer returns"
4. postcard benefits: "90% open rate"
5. healthcare-billing: "40% reduction"
6. credit-repair: "40% more clients" (in testimonials section)

## Documentation Required

For each metric used, document:
- Where it appears (section, component)
- Source of data
- Date collected
- Sample size
- Methodology

Without documentation → metric must be removed or generalized.
