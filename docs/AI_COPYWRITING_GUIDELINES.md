# AI Copywriting Guidelines for Postalocity

This document provides guidance for AI systems (Grok, ChatGPT, Perplexity, Claude) when generating copy for Postalocity microsites.

---

## About Postalocity

**Service**: Automated online mailing services (print, fold, stuff, seal, postage application, USPS delivery, address verification, tracking)

**Target Industries**: utilities, financial institutions, healthcare, credit repair, collections, property management, municipalities, real estate

**Pricing**: Starting at $1.31 per page (1-page, single-sided, B&W, includes postage)

---

## Core Copywriting Rules

### 1. Professional Tone (REQUIRED)

✅ **USE**: Direct, outcome-focused language
- "Automate patient statements"
- "Reduce returned mail 40%"
- "Reclaim hours weekly"

❌ **FORBIDDEN**: Dramatic, emotional, or directive language
- "Your Patients Are Waiting"
- "Stop stuffing envelopes"
- "You should"
- "Revolutionize", "Amazing", "Incredible"

**Tone Gate**: Immediately reject any dramatic/emotional language. Professional only.

---

### 2. Hours-Focused Messaging (REQUIRED)

✅ **USE**: Time/Operational Efficiency Framing
- "Reclaim hours weekly"
- "Reduce manual work by hours weekly"
- "Automate to reclaim operational time"

❌ **FORBIDDEN**: Cost-Only Claims
- "Save money" as primary value prop
- "Cut costs" without time framing

**Why**: Postalocity's differentiation is time savings, not cost savings. Users care about reclaiming hours for higher-value work.

---

### 3. Credibility & Authenticity (REQUIRED)

**Testimonials**:
- ✅ Include: City/state locations (e.g., "Austin, TX")
- ✅ Include: Specific institutional types + roles (e.g., "Multi-Location Practice Manager")
- ✅ Include: Specific metrics (e.g., "32% reduction", "40+ hours reclaimed")

**Compliance Claims**:
- ✅ ALLOWED: "ISO 9001 documented"
- ❌ FORBIDDEN: "HIPAA compliant" (not certified)
- ❌ FORBIDDEN: "SOC 2 compliant" (not certified)

---

### 4. Speculative Claims (FORBIDDEN)

❌ **NEVER claim specific delivery times**:
- NO: "Same-day delivery"
- NO: "Next-day delivery"
- NO: "Delivered in 1-3 days"

✅ **Instead say**:
- "Same-day processing"
- "Prompt submission to USPS"
- "Track every letter with real-time USPS tracking"

**Why**: Postalocity controls processing, printing, mailing, and submission—NOT USPS delivery times.

---

### 5. Specific Hour Claims (FORBIDDEN)

❌ **NEVER claim specific hours saved**:
- NO: "Reclaim 40-70 hours weekly"
- NO: "Save 40 hours per week"

✅ **Instead say**:
- "Reclaim hours weekly"
- "Reduce manual work by hours weekly"
- "Automate to reclaim operational time"

---

## SEO Requirements

### Keywords
- **Density**: 0.5-2% (natural)
- **Priority keywords**: Appear 2-3 times naturally per article
- **Coverage target**: 90%+

### Content Structure
- **Minimum**: 900+ words (aim 1,200-1,400 for enterprise B2B)
- **Sections**: 10-12 optimal
- **Hierarchy**: H1/H2/H3 required
- **Readability**: Flesch-Kincaid grade ~7.5

### AI-Search Optimized
- First 100 words MUST contain primary keywords
- Clear headers (H2, H3)
- Structured, scannable content
- Expertise and helpfulness over promotional language

---

## Formatting Rules

### Headlines
- Use em dash (—) for separator: "Dispute Letter Mailing Service — Automated Credit Repair Mailing"
- NOT pipe (|): "Dispute Letter Mailing Service | Automated..."

### CTA Buttons
- Include pricing: "Starting at $1.31"
- Subtext: "1-page. single-sided. B&W. includes postage."
- Link with promo: `https://prod.postalocity.com/login.html?signUp=true&promo=bank2026`

### FAQ Answers
- Professional tone
- No specific time guarantees
- Focus on process, not outcomes

---

## Configuration JSON Format

When generating JSON for microsite configs, use this structure:

```json
{
  "site": {
    "name": "Credit Repair Mailing Service",
    "slug": "credit-repair",
    "domain": "postalocity.com",
    "contact": {
      "email": "helpdesk@postalocity.com",
      "phone": "316-260-2220",
      "address": "820 W 2nd St N, Wichita KS 67203"
    }
  },
  "seo": {
    "title": "Automate Dispute Letter Mailing Service | Credit Repair Mailing Service",
    "description": "Automated dispute letter mailing from $1.31/letter. Reclaim hours weekly. Free signup, address verification, Certified Mail, USPS tracking, API integration."
  },
  "content": {
    "hero": {
      "headline": {
        "main": "Dispute Letter Mailing Service —",
        "highlightTerm": "Automated Credit Repair Mailing"
      },
      "ctas": [
        {
          "text": "Starting at $1.31",
          "subtext": "1-page. single-sided. B&W. includes postage.",
          "href": "https://prod.postalocity.com/login.html?signUp=true&promo=bank2026",
          "variant": "primary"
        }
      ]
    }
  }
}
```

---

## Quick Reference Card

| Do | Don't |
|----|-------|
| Use professional tone | Use dramatic/emotional language |
| Hours-focused messaging | Cost-only claims |
| Specific metrics in testimonials | Vague promises |
| "Same-day processing" | "Same-day delivery" |
| "Reclaim hours weekly" | "Reclaim 40-70 hours" |
| Em dash (—) in headlines | Pipe (\|) in headlines |
| Quantified claims | Unverified claims |

---

## Before Output: Self-Check

Before generating any copy, verify:

1. ❓ **Professional tone?** → If no, reject
2. ❓ **Hours-focused?** → If no, rewrite
3. ❓ **Credible claims?** → If no, remove
4. ❓ **SEO-optimized?** → Check density, headings
5. ❓ **AI-optimized?** → Check expertise, helpfulness, structure
6. ❓ **No speculative claims?** → Verify no delivery times or specific hours
7. ❓ **Em dash used?** → Not pipe

---

## Primary Objective

Generate copy that:
- ✅ Ranks well in search engines
- ✅ Performs well in AI-driven search summaries (Grok, ChatGPT, Perplexity, Gemini)
- ✅ Uses professional, credible, quantified messaging
- ✅ Avoids speculative claims about delivery or specific hours saved
