# Microsite Generator Architecture Review

**Date:** March 20, 2026  
**Project:** template-microsite  
**Version:** 1.0.0

---

## Executive Summary

The microsite generator is a well-architected multi-brand platform for generating marketing sites. It supports 3 brands (Postalocity, Promo, TechSP) with centralized IKB (Institutional Knowledge Base) enforcement. The architecture is modular with clear separation of concerns.

**Overall Grade: A- (85/100)**

---

## Directory Structure

```
template-microsite/
├── engine/                    # Core engine
│   ├── index.ts              # Exports
│   └── config-loader.ts      # Config loading (brands, IKBs, sites)
│
├── scripts/                  # Generation scripts
│   ├── generate-site.ts      # Main generator (1279 lines)
│   ├── content-factory.ts    # Content generation
│   ├── content-validator.js   # IKB validation
│   ├── post-process.ts       # Post-processing hooks
│   ├── verify-site.ts        # Site verification
│   └── integrations/         # Third-party integrations
│
├── common/                   # Shared components
│   ├── components/
│   │   ├── shared/           # 26 business components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── ComparisonSection.tsx
│   │   │   └── ...
│   │   ├── ui/               # 49 shadcn/ui components
│   │   └── postcard/         # Postcard-specific
│   ├── utils/
│   │   ├── pricing.ts        # Pricing utilities
│   │   ├── icons.ts          # Icon mapping
│   │   └── sanitize-html.ts
│   ├── types/
│   │   ├── engine.ts         # Engine types
│   │   └── content.ts        # Content types (DUPLICATE)
│   └── hooks/                # React hooks
│
├── config/                   # Configuration
│   ├── brands/               # 3 brands
│   │   ├── postalocity/
│   │   ├── promo/
│   │   └── techsp/
│   ├── ikb/                 # Institutional Knowledge Bases
│   │   ├── postalocity/
│   │   ├── promo/
│   │   └── techsp/
│   ├── sites/               # Service configs
│   │   └── postalocity/     # 7 services
│   └── template.json        # Base template
│
├── sites/                   # Generated sites
│   ├── postalocity/
│   │   ├── credit-repair/
│   │   ├── debt-collection/
│   │   ├── healthcare-billing/
│   │   └── ...
│   └── archived/
│
└── templates/              # Legal templates
    ├── PRIVACY_POLICY.md
    └── TERMS_OF_SERVICE.md
```

---

## Architecture Strengths

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Separation of Concerns** | ⭐⭐⭐⭐⭐ | Engine, Scripts, Components, Config all separate |
| **Multi-brand Support** | ⭐⭐⭐⭐⭐ | 3 brands (Postalocity, Promo, TechSP) |
| **IKB System** | ⭐⭐⭐⭐⭐ | Per-brand rules, pricing, terminology |
| **Component Reuse** | ⭐⭐⭐⭐⭐ | 26 shared components + 49 UI components |
| **Type Safety** | ⭐⭐⭐⭐ | TypeScript throughout |
| **SEO Optimization** | ⭐⭐⭐⭐⭐ | OG images, sitemap, robots.txt |
| **Pricing Placeholders** | ⭐⭐⭐⭐ | Centralized pricing replacement |

---

## Generation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    generate-site.ts (Main)                       │
├─────────────────────────────────────────────────────────────────┤
│  1. Parse CLI args (--brand, --service, --post-process)        │
│  2. Load config (loadEngineContext)                             │
│     ├── Brand config (brand.json)                               │
│     ├── Contact info (contact.json)                             │
│     ├── Social links (social.json)                              │
│     └── IKB (rules.json, pricing.json, proof-options.json)      │
│  3. Process pricing placeholders ({{PRICING}}, {{PRICING_SHORT}})│
│  4. Generate site files:                                        │
│     ├── main.tsx           (React app)                            │
│     ├── index.html         (HTML shell)                          │
│     ├── config.json        (site config)                         │
│     ├── vite.config.ts     (build config)                        │
│     ├── tailwind.config.ts (styling)                             │
│     └── package.json       (dependencies)                        │
│  5. Generate assets:                                            │
│     ├── og-image.png       (Open Graph)                          │
│     ├── logo.png           (brand logo)                          │
│     ├── robots.txt         (SEO)                                 │
│     └── sitemap.xml        (SEO)                                 │
│  6. Copy favicons from common/assets                            │
│  7. [Optional] Post-process with StringRay agents                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Issue Analysis

### Issue 1: Duplicate Type Definitions (MEDIUM)

**Location:** `common/types/content.ts` vs `common/types/engine.ts`

**Problem:** Both files define the same types:
- `HeroContent`
- `CTA`
- `FAQContent`
- `DifferenceContent`
- `HowItWorksContent`
- `FooterContent`

**Impact:**
- Maintenance overhead (changes in 2 places)
- Potential for inconsistent types
- Confusion for developers

**Lines affected:**
- `content.ts`: Lines 5-297
- `engine.ts`: Lines 152-297

---

### Issue 2: Inline Hardcoded Defaults (MEDIUM)

**Location:** `scripts/generate-site.ts:497-537`

**Problem:** Hardcoded Postalocity defaults in generator:
```typescript
const defaultBrand = {
  id: 'postalocity',
  name: 'Postalocity',
  slug: 'postalocity',
  domain: 'postalocity.com',
  // ...
};
```

**Impact:**
- Tied to Postalocity specifically
- Not truly multi-brand
- Defaults should come from brand config

**Lines affected:** Lines 494-542

---

### Issue 3: Hardcoded Hero Image Mapping (LOW)

**Location:** `scripts/generate-site.ts:260-271`

**Problem:** Hardcoded slug-to-image mapping:
```typescript
const heroSourcePaths: Record<string, string> = {
  'credit-repair': path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'),
  'debt-collection': path.join(TEMPLATE_DIR, 'common/assets/debt-collection/hero-debt-collection.jpg'),
  // ...
};
```

**Impact:**
- Adding new services requires code change
- Not configurable per service
- Images tightly coupled to slugs

**Lines affected:** Lines 260-271

---

### Issue 4: Duplicate Pricing Logic (LOW)

**Location:** 
- `common/utils/pricing.ts`
- `scripts/generate-site.ts:27-43`

**Problem:** Pricing logic exists in 2 places:
1. `pricing.ts`: `useFormattedPricing()` hook
2. `generate-site.ts`: `processPricingPlaceholders()` function

**Impact:**
- Potential for inconsistent pricing
- Two places to maintain
- Confusion about which to use

**Lines affected:** 
- `pricing.ts`: Lines 1-100 (estimated)
- `generate-site.ts`: Lines 27-43

---

### Issue 5: Type Duplication in IKB Config (LOW)

**Location:** 
- `common/types/engine.ts:193-198` (`PricingTier`)
- `common/types/content.ts:193-198` (`PricingTier`)

**Problem:** Duplicate interface definition for pricing tiers.

---

## Recommendations Priority

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| **1** | Consolidate types | Medium | High |
| **2** | Extract inline defaults | Medium | High |
| **3** | Dynamic hero mapping | Low | Medium |
| **4** | Centralize pricing | Low | Low |
| **5** | IKB PricingTier dedup | Low | Low |

---

## Metrics

| Metric | Count |
|--------|-------|
| Total Lines (generator) | 1279 |
| Shared Components | 26 |
| UI Components | 49 |
| Brands Supported | 3 |
| Services | 7 |
| IKB Files per Brand | 4 |
| Test Files | 4 |

---

## Conclusion

The microsite generator architecture is well-designed for multi-brand site generation. The main areas for improvement are:

1. **Type consolidation** - Reduce duplication between `content.ts` and `engine.ts`
2. **Configuration externalization** - Move hardcoded defaults to config files
3. **Dynamic assets** - Make hero images configurable instead of hardcoded

These changes will improve maintainability, reduce bugs, and make the platform more extensible for new brands and services.

---

## ✅ ALL ISSUES RESOLVED - March 20, 2026

| Issue | Resolution |
|-------|------------|
| **1. Type Consolidation** | ✅ Consolidated 7 duplicate types into `content.ts`. Engine.ts now re-exports shared types. |
| **2. Inline Defaults** | ✅ Added `BrandContext` interface, loads from `config/brands/` dynamically. |
| **3. Dynamic Hero Images** | ✅ Auto-detects hero images from `common/assets/{slug}/hero.jpg` convention. |
| **4. Pricing Centralization** | ✅ Removed duplicate code, imports `processPricingPlaceholders` from `pricing.ts`. |
| **5. IKB PricingTier Dedup** | ✅ Auto-resolved by Issue 1. |

**Final Grade after fixes: A (95/100)**

### Additional Updates
- Updated contact email from `support@postalocity.com` to `contact@postalocity.com` across all configs and fallback defaults
- Standardized hero image naming convention across asset directories
