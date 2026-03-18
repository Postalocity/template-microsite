# Postalocity Institutional Knowledge

> **Source of Truth**: This document captures all institutional knowledge for Postalocity microsites. All content must comply with these rules. AI systems must reference this document before generating content.

---

## 1. USPS Mail Classes

### First-Class Mail (Commercial)

| Property | Value |
|----------|-------|
| **Base Price** | $1.31 |
| **Tracking** | Tracing scans (processing milestones) |
| **Certificate of Mailing** | Included automatically |
| **Personalized Data** | ✅ Required (HIPAA, legal, financial) |
| **Use Cases** | Bills, statements, legal notices, compliance documents |

**Key Distinction**: First-Class Mail **MUST** include:
- Account numbers
- Balance information
- Personal identifiers
- HIPAA-protected data
- Legal compliance notices

### Marketing Mail (Standard)

| Property | Value |
|----------|-------|
| **Base Price** | $0.244 |
| **Tracking** | ❌ None |
| **Certificate of Mailing** | ❌ None |
| **Personalized Data** | ❌ Prohibited |
| **Use Cases** | Advertisements, promotional materials, newsletters |

**Key Restriction**: Marketing Mail **CANNOT** include:
- Account numbers
- Balance information
- Personalized account data
- HIPAA-protected information
- Any compliance-required content

### Priority Mail

| Property | Value |
|----------|-------|
| **Base Price** | $11.50+ |
| **Tracking** | Full tracking (constant updates) |
| **Certificate of Mailing** | ✅ Included |
| **Insurance** | Up to $100 included |
| **Use Cases** | Time-sensitive documents, valuable items |

### Certified Mail

| Property | Value |
|----------|-------|
| **Base Price** | First-Class + $4.50 |
| **Tracking** | Full + signature proof |
| **Certificate of Mailing** | ✅ Included |
| **Personalized Data** | ✅ Required |
| **Use Cases** | Legal documents, compliance, high-value mail |

---

## 2. Proof Options

| Proof Type | What It Proves | Included | Notes |
|------------|----------------|----------|-------|
| **Affidavit of Service** | Postalocity processed & handed to USPS | ✅ Standard | Our internal processing document |
| **USPS Scan Proof** | Item entered postal system | ✅ First-Class | Shows processing status, date/time |
| **Certificate of Mailing** | USPS accepted item | ⚠️ Upgrade | Official USPS form 3877 |
| **Certified Mail** | Full tracking + signature | ⚠️ Upgrade | For legal compliance |

### Proof Comparison

```
Affidavit → "We gave it to USPS"
Scan → "USPS has it"
Certificate → "USPS accepted it (with date)"
Certified → "USPS delivered it (with signature)"
```

---

## 3. Pricing Structure

| Mail Class | Base Price | Proof Options |
|------------|------------|---------------|
| Marketing Mail | $0.244 | None (no tracking) |
| First-Class Mail | $1.31 | Affidavit + Scan |
| Priority Mail | $11.50+ | Full tracking |
| Certified Mail | $1.31 + $4.50 | Full tracking + signature |

---

## 4. Content Standards

### Approved Section Types

| Section | Required | Description |
|---------|----------|-------------|
| `hero` | ✅ Yes | Main headline + CTA |
| `howItWorks` | ✅ Yes | 3-column process steps |
| `features` | Recommended | Service features grid |
| `faq` | Recommended | Common questions |
| `cta` | ✅ Yes | Call-to-action blocks |
| `footer` | ✅ Yes | Contact info + links |
| `trustSignals` | ✅ Yes | Trust badges |
| `difference` | Optional | Competitive advantages |

### Trust Signals (LOCKED - 3 Only)

These are the **only** trust signals that may appear on any microsite:

1. **NCOA Verified 2024** - National Change of Address verification
2. **CASS Certified 2024** - Coding Accuracy Support System
3. **ISO 9001 Documented Processes 2023** - Quality management

**No other trust signals are permitted.**

### Blocklisted Content

The following **CANNOT** appear on any microsite:

| Blocklisted | Reason |
|-------------|--------|
| `testimonials` | Unverified, potential fabrication |
| `case-studies` | Not standardized across sites |
| `video-content` | Not implemented |
| `live-chat` | Not integrated |
| `team` / `experts` | Not standardized |
| `awards` | Not verified |
| `aggregateRating` | Requires verified reviews |
| `testimonials` | Fabricated content risk |

---

## 5. Promo Code Mapping

| Site | Short Code | Full Slug |
|------|------------|-----------|
| Credit Repair | `cr2026` | `credit-repair-2026` |
| Debt Collection | `debt2026` | `debt-collection-2026` |
| Healthcare Billing | `hb2026` | `healthcare-billing-2026` |
| Healthcare Mailing | `hm2026` | `healthcare-mailing-services-2026` |
| Postcard | `pc2026` | `postcard-2026` |
| Self Storage | `pm2026` | `self-storage-2026` |

**Usage**: Always use short codes in navigation, hero, and footer CTAs.

---

## 6. Component Data Structures

### Hero Section
```typescript
interface HeroConfig {
  main: string;           // Main headline
  highlightTerm?: string; // Term to highlight (optional)
  subheadline: string;    // Supporting text
  cta: {
    text: string;
    href: string;
  };
  image: {
    src: string;
    alt: string;
    dimensions: { width: number; height: number }; // 1920x1080
  };
}
```

### Trust Signals
```typescript
interface TrustSignalsConfig {
  badges: string[];  // Array of exact badge strings
}
```

### How It Works
```typescript
interface HowItWorksConfig {
  title: string;
  steps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}
```

### Navigation
```typescript
interface NavConfig {
  logo: string;
  navItems: Array<{
    label: string;
    href: string;
  }>;
  cta: {
    text: string;
    href: string;
    promoCode?: string;  // Short code only
  };
}
```

---

## 7. Legal & Compliance

### HIPAA Compliance
- Requires First-Class Mail
- Must include tracking
- Personalized health data only via First-Class

### Lien Compliance
- Legal notices require First-Class or Certified
- Certificate of Mailing recommended
- Timeline documentation required

### Marketing Mail Restrictions
- No personal account information
- No financial data
- No health information
- No compliance-required content

---

## 8. Quality Requirements

### Images
- Hero images: 1920x1080 dimensions
- All images: lazy loading enabled
- Alt text required for accessibility

### SEO
- Unique title per page
- Meta description per page
- Correct sitemap URLs in robots.txt
- Schema.org with accurate organization name ("Postalocity")

### Accessibility
- Semantic HTML
- Focus indicators
- Color contrast compliance
- Screen reader friendly

---

## 9. Launch Checklist

Before any site goes live, validate:

- [ ] Promo codes use short format (cr2026, not credit-repair-2026)
- [ ] Trust signals match exact approved list
- [ ] No blocklisted content present
- [ ] Hero images have dimensions specified
- [ ] Navigation has promo code in CTA
- [ ] Footer has correct contact info
- [ ] Footer has proper mailing class description
- [ ] All links point to valid pages
- [ ] Schema.org organization is "Postalocity"
- [ ] No fake ratings or testimonials
- [ ] robots.txt has correct sitemap URL

---

## 10. Contact Information

### Headquarters
**Postalocity**
123 Business Center Drive
Suite 400
Chicago, IL 60601

### Contact Channels
- **Phone**: 1-800-XXX-XXXX (check site config)
- **Email**: support@postalocity.com
- **Hours**: Check site-specific hours

---

*Last Updated: March 2026*
*Version: 1.0*
*Owner: Content Team*
