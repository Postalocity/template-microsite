# AI Guardrails for Postalocity Content

> **Purpose**: Prevent AI hallucination and ensure factual accuracy when generating content for Postalocity microsites.

---

## Core Rules

### 1. Never Invent Information

**ALWAYS verify before stating:**
- Pricing (only state what's in institutional knowledge)
- Statistics ("millions of customers" is blocklisted)
- Certifications (only use the 3 approved trust signals)
- Team members or experts
- Awards or recognition
- Customer testimonials

### 2. Stick to Approved Content

**Only generate content from these categories:**
- Hero headlines and subheadlines
- How It Works steps
- Service features
- FAQ questions and answers
- CTA text
- Footer descriptions

**NEVER generate:**
- Testimonials
- Case studies
- Team/expert bios
- Video content descriptions
- Awards or recognition

---

## USPS Mail Class Rules

### First-Class Mail
Use when mentioning:
- HIPAA compliance
- Legal notices
- Account statements
- Personal data
- Billing information
- Financial documents

**Correct**: "First-Class Mail includes tracking scans and certificate of mailing for compliance documentation."

**INCORRECT**: "We guarantee 100% delivery" (never make delivery guarantees)

### Marketing Mail
Use when mentioning:
- Advertisements
- Promotional materials
- Newsletters
- Mass marketing campaigns

**CRITICAL RESTRICTION**: Marketing Mail CANNOT include:
- Account numbers
- Balance information
- Personalized data
- HIPAA-protected information

**INCORRECT**: "Get your account balance delivered via Marketing Mail" (violation)

---

## Trust Signal Rules

### Only These Three Are Allowed:
1. `NCOA Verified 2024`
2. `CASS Certified 2024`
3. `ISO 9001 Documented Processes 2023`

### How to Use Trust Signals:
```
Trust Signals:
- NCOA Verified 2024
- CASS Certified 2024
- ISO 9001 Documented Processes 2023
```

### Never Add:
- ❌ "Award-winning"
- ❌ "Industry-leading"
- ❌ "Trusted by thousands"
- ❌ Any certification not on the approved list

---

## Promo Code Rules

### Format: SHORT CODE ONLY

| Site | Code |
|------|------|
| Credit Repair | `cr2026` |
| Debt Collection | `debt2026` |
| Healthcare Billing | `hb2026` |
| Healthcare Mailing | `hm2026` |
| Postcard | `pc2026` |
| Self Storage | `pm2026` |

### Never Use:
- Full slugs (credit-repair-2026 ❌)
- Mixed formats
- Custom codes

---

## Proof Option Rules

### What Each Proof Proves:

| Proof | What It Proves | Use When |
|-------|----------------|-----------|
| Affidavit | We processed it | Standard processing |
| USPS Scan | USPS has it | First-Class tracking |
| Certificate | USPS accepted it | Official records |
| Certified | USPS delivered + signature | Legal compliance |

### Never State:
- "Guaranteed delivery"
- "100% on-time delivery"
- Delivery timeframes
- Specific delivery dates

---

## Content Structure Rules

### Hero Section
```typescript
{
  main: string;        // Main headline
  highlightTerm?: string; // Term to highlight
  subheadline: string; // Supporting text
  cta: {
    text: string;
    href: string;
  };
}
```

### FAQ Content
- Always reference First-Class vs Marketing Mail distinction
- Never invent FAQ questions
- Only answer based on institutional knowledge

### Section Types
**APPROVED**: hero, howItWorks, features, faq, cta, footer, trustSignals, difference, pricing

**BLOCKED**: testimonials, case-studies, video, live-chat, team, experts, awards

---

## Warning Flags

Watch for these in generated content - they indicate hallucination:

| Flag | Example | Action |
|------|---------|--------|
| Specific numbers | "10,000+ customers" | Remove or verify |
| Guarantees | "guaranteed delivery" | Remove |
| Awards | "award-winning" | Remove |
| Testimonials | "John D. says..." | Remove |
| Celebrity mentions | "trusted by celebrities" | Remove |
| Industry claims | "world-class" | Remove |
| Unverified stats | "99% accuracy" | Remove |

---

## Decision Tree

When generating content, ask:

```
1. Is this in institutional-knowledge.md?
   → YES: Use it
   → NO: Continue

2. Is this on the blocklist?
   → YES: Do not generate
   → NO: Continue

3. Is this claiming statistics, awards, or testimonials?
   → YES: Do not generate
   → NO: Continue

4. Is this claiming guaranteed delivery or 100% accuracy?
   → YES: Do not generate
   → NO: Continue

5. Does this reference mail classes correctly?
   → First-Class: HIPAA, legal, personal data ✓
   → Marketing Mail: Ads, no personal data ✓
   → Otherwise: Do not generate
```

---

## Example Corrections

### Before (Incorrect):
```json
{
  "headline": "Award-Winning Direct Mail Solutions",
  "stats": "Trusted by 50,000+ businesses",
  "proof": "Guaranteed 2-day delivery"
}
```

### After (Correct):
```json
{
  "headline": "Automate Your Direct Mail Processing",
  "stats": null,
  "proof": "First-Class Mail includes tracking and certificate of mailing"
}
```

---

## Validation Commands

Before publishing any content:

```bash
# Run content validators
npx ts-node scripts/content-factory.ts

# Run launch validation
npx ts-node scripts/verify.ts
```

---

## Contact for Uncertainty

If you're unsure about any content:
1. Check institutional-knowledge.md
2. Check content-factory.ts validators
3. Consult the content team

**Never guess. Never fabricate. Always verify.**

---

*Last Updated: March 2026*
*Version: 1.0*
