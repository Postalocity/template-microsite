# Microsite Generator Fix Plan

**Date:** March 20, 2026  
**Based on:** `docs/architecture-review.md`

---

## Overview

This plan addresses the 5 architectural issues identified in the architecture review.

---

## Issue 1: Consolidate Duplicate Types (Priority 1)

### Problem
`common/types/content.ts` and `common/types/engine.ts` both define:
- `HeroContent`, `CTA`, `FAQContent`, `DifferenceContent`, `HowItWorksContent`, `FooterContent`, `PricingTier`

### Solution
Consolidate into a single types file. Keep `engine.ts` for core engine types, export shared types from `content.ts`, and import where needed.

### Steps

1. **Audit all types** in both files
2. **Identify shared vs. unique types**
3. **Move shared types** to `content.ts`
4. **Update `engine.ts`** to re-export from `content.ts`
5. **Update all imports** in:
   - `common/components/shared/*.tsx`
   - `scripts/*.ts`
   - `engine/*.ts`

### Files to Modify
- `common/types/content.ts` - Consolidate shared types
- `common/types/engine.ts` - Re-export, remove duplicates
- `common/components/shared/*.tsx` - Update imports
- `scripts/generate-site.ts` - Update imports

### Verification
```bash
npm run generate -- --brand postalocity --service real-estate
npm run content-validate
```

---

## Issue 2: Extract Inline Defaults (Priority 2)

### Problem
`scripts/generate-site.ts:497-537` has hardcoded Postalocity defaults.

### Solution
Load defaults from brand config files instead of hardcoding.

### Steps

1. **Remove hardcoded defaults** from `generate-site.ts`
2. **Ensure brand configs** have all required fields
3. **Use `loadBrandConfig()`** to get defaults
4. **Handle missing fields** gracefully with fallbacks

### Code Change

**Before:**
```typescript
const defaultBrand = {
  id: 'postalocity',
  name: 'Postalocity',
  // ... hardcoded
};
```

**After:**
```typescript
import { loadBrandConfig } from '../engine/index.js';

const brand = loadBrandConfig(brandId);
const brandDefaults = brand; // Use loaded config
```

### Files to Modify
- `scripts/generate-site.ts` - Remove inline defaults, use loaded config
- `config/brands/postalocity/brand.json` - Ensure completeness

### Verification
```bash
npm run generate -- --brand promo --service postcard
npm run content-validate
```

---

## Issue 3: Dynamic Hero Image Mapping (Priority 3)

### Problem
`scripts/generate-site.ts:260-271` has hardcoded slug-to-image mapping.

### Solution
Add `heroImage` field to service config or detect from common/assets automatically.

### Option A: Config-based (Recommended)
Add `hero.image` path directly in each service config.

### Option B: Auto-detection
Scan `common/assets/{service}/` for hero images automatically.

### Steps (Option A)

1. **Update service configs** to include:
```json
{
  "site": { "slug": "real-estate" },
  "hero": {
    "background": {
      "image": "/images/real-estate-hero.jpg"
    }
  }
}
```

2. **Update generator** to use config path directly

3. **Update images** in `common/assets/{service}/` directories

### Files to Modify
- `config/sites/postalocity/*.json` - Add hero.image field
- `scripts/generate-site.ts` - Remove hardcoded mapping, use config
- `common/assets/*/hero-*.jpg` - Ensure images exist

### Verification
```bash
npm run generate -- --brand postalocity --service real-estate
# Check generated site has correct hero image
```

---

## Issue 4: Centralize Pricing Logic (Priority 4)

### Problem
Pricing logic exists in 2 places:
- `common/utils/pricing.ts` - `useFormattedPricing()` hook
- `scripts/generate-site.ts:27-43` - `processPricingPlaceholders()`

### Solution
Single source of truth in `common/utils/pricing.ts`. Export both hook and utility function.

### Steps

1. **Enhance `pricing.ts`**:
```typescript
// Utility function for non-React contexts
export function processPricing(text: string, basePrice: number = DEFAULT_PRICING.basePrice): string {
  // Move logic from generate-site.ts here
}

// Hook for React components
export function useFormattedPricing() {
  // Existing hook
}
```

2. **Update `generate-site.ts`** to import from pricing.ts

3. **Remove duplicate** `processPricingPlaceholders()` function

### Files to Modify
- `common/utils/pricing.ts` - Add `processPricing()` utility
- `scripts/generate-site.ts` - Import and use `processPricing()`

### Verification
```bash
npm run generate -- --brand postalocity --service debt-collection
# Verify pricing placeholders resolved correctly
```

---

## Issue 5: IKB PricingTier Dedup (Priority 5)

### Problem
`PricingTier` interface defined twice:
- `common/types/engine.ts:193-198`
- `common/types/content.ts:193-198`

### Solution
After consolidating types (Issue 1), this will be resolved automatically.

---

## Implementation Order

```
Week 1: Issue 1 (Type Consolidation) ✅
├── Audit all types
├── Consolidate to content.ts
├── Update imports
└── Test all builds

Week 2: Issue 2 (Inline Defaults) ✅
├── Load from brand config
├── Remove hardcoded defaults
└── Test all brands

Week 3: Issue 3 (Dynamic Hero Images) ✅
├── Update service configs
├── Update generator logic
└── Verify image generation

Week 4: Issue 4 (Pricing Centralization) ✅
├── Enhance pricing.ts
├── Export utility function
└── Remove duplicate code
```

## Completion Status: ALL ISSUES RESOLVED ✅

| Issue | Status | Completed |
|-------|--------|-----------|
| 1. Type Consolidation | ✅ Complete | Mar 20, 2026 |
| 2. Inline Defaults | ✅ Complete | Mar 20, 2026 |
| 3. Dynamic Hero Images | ✅ Complete | Mar 20, 2026 |
| 4. Pricing Centralization | ✅ Complete | Mar 20, 2026 |
| 5. IKB PricingTier Dedup | ✅ Auto-resolved by Issue 1 | Mar 20, 2026 |

---

## Testing Strategy

### Before Each Fix
1. Run full validation: `npm run content-validate`
2. Generate all sites: `npm run generate -- --brand postalocity --all`
3. Build all sites: `cd sites/postalocity/* && npm run build`

### After Each Fix
1. Run content validation
2. Regenerate affected sites
3. Verify no console errors
4. Check generated output matches expectations

### Regression Testing
```bash
# Generate all postalocity sites
for service in credit-repair debt-collection healthcare-billing healthcare-mailing-services postcard real-estate self-storage; do
  npm run generate -- --brand postalocity --service $service
done

# Build all sites
for dir in sites/postalocity/*/; do
  cd $dir && npm install && npm run build && cd ../..
done

# Validate all
npm run content-validate
```

---

## Rollback Plan

If issues arise:
1. Revert changes from git: `git checkout HEAD -- <file>`
2. Re-run generation: `npm run generate -- --brand postalocity --service <service>`
3. Verify previous working state restored

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Type errors | 0 |
| Content validation errors | 0 |
| Build failures | 0 |
| Duplicate type definitions | 0 |
| Hardcoded values in generator | 0 |
| Generated site functionality | 100% |

---

## Files Reference

### Types to Consolidate
```
common/types/content.ts:
├── CTA
├── HeroContent
├── Benefit / BenefitsContent
├── Service / ServicesContent
├── FAQ / FAQContent
├── ComparisonRow / ComparisonContent
├── DifferenceContent
├── HowItWorksContent
├── FooterContent
├── PricingTier (DUPLICATE)
└── ... (E-E-A-T types)

common/types/engine.ts:
├── BrandConfig
├── ContactInfo
├── SocialLinks
├── IKBConfig
├── PricingTier (DUPLICATE)
├── SiteContent (references content.ts types)
└── EngineContext
```

### Configs Requiring Updates
```
config/
├── brands/
│   └── postalocity/
│       └── brand.json (ensure completeness)
├── ikb/
│   └── postalocity/ (already good)
└── sites/
    └── postalocity/
        ├── credit-repair.json (add hero.image)
        ├── debt-collection.json (add hero.image)
        └── ... (all 7 services)
```

---

## Notes

- Use TypeScript strict mode to catch type errors early
- Document all exported functions with JSDoc
- Add unit tests for `pricing.ts` utilities
- Consider adding JSON Schema validation for configs
