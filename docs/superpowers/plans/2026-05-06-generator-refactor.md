# Generator Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `scripts/generate-site.ts` (4,032 LOC) from a monolithic god function with 9 duplicated template functions into a composable, testable, type-safe system that reduces maintenance burden by ~80% while preserving all existing functionality and adding missing SEO schema.

**Architecture:**
- Extract pure template fragment functions (`generateHeader()`, `generateImports()`, `generateIKBConfig()`, `composeSiteTemplate()`)
- Introduce `SiteTemplateConfig` type with Zod validation at entry points
- Refactor all 9 template functions to thin wrappers calling the composer
- Move side-effect checks (`fs.existsSync`) outside pure template functions
- Add unit tests for template composition

**Tech Stack:** TypeScript, Zod (schema validation), existing Vite/Tailwind/Framer Motion ecosystem

---

## File Structure Mapping

| File | Responsibility |
|------|----------------|
| `scripts/generate-site.ts` | Orchestrator + CLI entry (reduced from 4032 → ~800 LOC) |
| `scripts/generate/template-composer.ts` | **NEW** — `composeSiteTemplate()`, fragment builders |
| `scripts/generate/config-validator.ts` | **NEW** — Zod schemas for `SiteConfig`, `BrandContext` |
| `scripts/generate/templates/*.ts` | Thin brand wrappers (broadstroke.ts, odins.ts, etc.) |
| `scripts/generate/__tests__/template-composer.test.ts` | **NEW** — Unit tests for composition |

---

## Task 1: Extract Template Fragment Functions

**Files:**
- Create: `scripts/generate/template-composer.ts`
- Modify: `scripts/generate-site.ts:1-100` (add imports)

- [ ] **Step 1: Create `scripts/generate/template-composer.ts` skeleton**

```ts
import type { SiteInfo, BrandContext } from '../types';

export interface SiteTemplateConfig {
  brandId: string;
  site: SiteInfo;
  sections: Array<{
    name: string;
    component: string;
    conditional?: string;
    importPath?: string;
  }>;
  customImports?: string[];
  customBody?: string;
  themePath?: string;
}

export function generateHeader(site: SiteInfo, brandName: string): string {
  return `/**\n * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\n *\n * Site:      ${site.slug}\n * Brand:     ${brandName}\n * Generated: ${new Date().toISOString()}\n ...`;
}

export function generateImports(sections: string[], themePath: string): string {
  const sectionImports = sections.map(s => `import { ${s} } from '${themePath}/components/shared';`).join('\n');
  return `import { createRoot } from 'react-dom/client';\n${sectionImports}\n...`;
}
```

- [ ] **Step 2: Run TypeScript compiler to verify skeleton compiles**

```bash
npx tsc --noEmit scripts/generate/template-composer.ts
```
Expected: No errors (empty file is valid)

- [ ] **Step 3: Implement `generateIKBConfig()`**

```ts
export function generateIKBConfig(brandId: string, siteSlug: string, ikbRules: any): string {
  return `
const ikbConfig = ${JSON.stringify({ rules: ikbRules }, null, 2)};
const promoCode = ikbConfig.rules.promoCodes['${siteSlug}'] || '2026';
  `.trim();
}
```

- [ ] **Step 4: Implement `composeSiteTemplate()` core builder**

```ts
export function composeSiteTemplate(config: SiteTemplateConfig): string {
  const header = generateHeader(config.site, config.brandId);
  const imports = generateImports(
    config.sections.map(s => s.component),
    config.themePath || '@/components/shared'
  );
  const ikb = generateIKBConfig(config.brandId, config.site.slug, {});
  const body = buildSectionBody(config.sections, config.customBody);

  return `${header}\n\n${imports}\n\n${ikb}\n\nfunction App() {\n  return (\n    <BrandProvider ...>\n      ${body}\n    </BrandProvider>\n  );\n}\n\nroot.render(<App />);`;
}
```

- [ ] **Step 5: Write unit test skeleton**

```ts
// scripts/generate/__tests__/template-composer.test.ts
import { composeSiteTemplate } from '../template-composer';

describe('composeSiteTemplate', () => {
  it('generates valid header with site metadata', () => {
    const result = composeSiteTemplate({ /* minimal config */ });
    expect(result).toContain('AUTO-GENERATED FILE');
    expect(result).toContain('Site:      test-site');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npx vitest run scripts/generate/__tests__/template-composer.test.ts
```
Expected: FAIL (composeSiteTemplate not implemented yet)

- [ ] **Step 7: Implement minimal composeSiteTemplate to pass test**

```ts
export function composeSiteTemplate(config: SiteTemplateConfig): string {
  return `/**\n * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY\n *\n * Site:      ${config.site.slug}\n ...`;
}
```

- [ ] **Step 8: Run test to verify it passes**

```bash
npx vitest run scripts/generate/__tests__/template-composer.test.ts::composeSiteTemplate
```
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add scripts/generate/template-composer.ts scripts/generate/__tests__/template-composer.test.ts
git commit -m "feat(generator): extract template-composer with header generation"
```

---

## Task 2: Add Zod Schema Validation

**Files:**
- Create: `scripts/generate/config-validator.ts`
- Modify: `scripts/generate-site.ts:607` (wrap `generateSiteMultiBrand` entry)

- [ ] **Step 1: Install Zod (if not present)**

```bash
npm install zod
```

- [ ] **Step 2: Define `SiteConfigSchema` in `config-validator.ts`**

```ts
import { z } from 'zod';

export const SiteConfigSchema = z.object({
  site: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
  content: z.record(z.any()).optional(),
  // ... add other required fields
});

export type ValidatedSiteConfig = z.infer<typeof SiteConfigSchema>;
```

- [ ] **Step 3: Export `validateSiteConfig()` function**

```ts
export function validateSiteConfig(config: unknown): ValidatedSiteConfig {
  return SiteConfigSchema.parse(config);
}
```

- [ ] **Step 4: Write failing test**

```ts
import { validateSiteConfig } from '../config-validator';

it('rejects config missing required site.id', () => {
  expect(() => validateSiteConfig({ site: {} })).toThrow();
});
```

- [ ] **Step 5: Run test to verify it fails**

```bash
npx vitest run scripts/generate/__tests__/config-validator.test.ts
```
Expected: FAIL

- [ ] **Step 6: Implement minimal validation**

```ts
export function validateSiteConfig(config: unknown) {
  return SiteConfigSchema.parse(config);
}
```

- [ ] **Step 7: Run test to verify it passes**

Expected: PASS

- [ ] **Step 8: Wire validation into `generateSiteMultiBrand()`**

```ts
// scripts/generate-site.ts:607
const validatedConfig = validateSiteConfig(rawConfig);
```

- [ ] **Step 9: Commit**

```bash
git add scripts/generate/config-validator.ts scripts/generate/__tests__/config-validator.test.ts scripts/generate-site.ts
git commit -m "feat(generator): add Zod schema validation for SiteConfig"
```

---

## Task 3: Refactor `generateOdinsInnovationsTemplate` to Use Composer

**Files:**
- Modify: `scripts/generate-site.ts:1365-1670` (the 300-line template function)

- [ ] **Step 1: Replace 300-line template literal with composer call**

```ts
function generateOdinsInnovationsTemplate(config: SiteConfig, brandContext?: BrandContext, brandId?: string): string {
  return composeSiteTemplate({
    brandId: brandId || 'odins-innovations',
    site: config.site,
    sections: [
      { name: 'HeroSection', component: 'HeroSection' },
      { name: 'TrustBadgesSection', component: 'TrustBadgesSection', conditional: 'content.trustSignals' },
      { name: 'WhyOdinsSection', component: 'WhyOdinsSection' },
      // ... all other sections
    ],
    themePath: '@/themes/odins-innovations',
  });
}
```

- [ ] **Step 2: Delete the old 300-line template literal (lines 1365-1670)**

- [ ] **Step 3: Run build to verify no syntax errors**

```bash
npx tsx scripts/generate-site.ts --brand odins-innovations --service doe-estrus-guide
```
Expected: Success (site generated)

- [ ] **Step 4: Verify generated output matches previous behavior** (diff or visual inspection)

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-site.ts
git commit -m "refactor(generator): replace generateOdinsInnovationsTemplate with composeSiteTemplate"
```

---

## Task 4: Repeat for All Other Template Functions

**Files:** Same as Task 3

- [ ] **Step 1: Refactor `generateBroadstrokeTemplate`** (lines ~825-1105)
- [ ] **Step 2: Refactor `generatePromoTemplate`**
- [ ] **Step 3: Refactor `generateCitronellaTemplate`**
- [ ] **Step 4: Refactor `generateCWDSiteTemplate`**
- [ ] **Step 5: Refactor `generateDominantBuckTemplate`**
- [ ] **Step 6: Refactor `generateScrapeScentTemplate`**
- [ ] **Step 7: Refactor `generateFoodScentTemplate`**
- [ ] **Step 8: Refactor `generateEarthCoverScentTemplate`**

Each step follows the same pattern: replace with `composeSiteTemplate()`, delete old literal, test, commit.

---

## Task 5: Fix SEO Gaps (Absolute URLs + Product/HowTo Schema)

**Files:**
- Modify: `scripts/generate-site.ts:3416` (og:image generation)
- Modify: `scripts/generate/template-composer.ts` (add Product/HowTo schema fragments)

- [ ] **Step 1: Compute absolute URLs in `generateOgImages()`**

```ts
const canonicalUrl = config.seo?.canonical || `https://${config.site.domain}/${config.site.slug}`;
const ogImage = config.seo?.ogImage?.startsWith('http')
  ? config.seo.ogImage
  : `${canonicalUrl}${config.seo?.ogImage || '/og-image.png'}`;
```

- [ ] **Step 2: Add `generateProductSchema()` fragment**

```ts
function generateProductSchema(products: any[]): string {
  if (!products?.length) return '';
  return products.map(p => `{
    "@type": "Product",
    "name": "${p.name}",
    "offers": { "@type": "Offer", "price": "${p.price}", "priceCurrency": "USD" }
  }`).join(',');
}
```

- [ ] **Step 3: Add `generateHowToSchema()` fragment**

```ts
function generateHowToSchema(howTo: any): string {
  if (!howTo?.steps) return '';
  return `{ "@type": "HowTo", "name": "${howTo.name}", "step": ${JSON.stringify(howTo.steps)} }`;
}
```

- [ ] **Step 4: Wire schema fragments into `composeSiteTemplate()` output**

- [ ] **Step 5: Test generation produces valid JSON-LD**

```bash
node -e "const html = require('fs').readFileSync('sites/.../index.html'); const match = html.match(/<script type=\"application/ld\+json\">(.*?)<\/script>/s); JSON.parse(match[1])"
```
Expected: No parse errors

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-site.ts scripts/generate/template-composer.ts
git commit -m "fix(seo): absolute URLs + Product/HowTo schema in generated JSON-LD"
```

---

## Task 6: Add Comprehensive Unit Tests

**Files:**
- Create: `scripts/generate/__tests__/` directory with 5+ test files

- [ ] **Step 1: Test `composeSiteTemplate` produces valid TSX imports**
- [ ] **Step 2: Test conditional sections render only when data present**
- [ ] **Step 3: Test IKB promo code injection**
- [ ] **Step 4: Test brand-specific theme path aliasing**
- [ ] **Step 5: Property-based test: generated output always contains valid JSX**

- [ ] **Step 6: Run full test suite**

```bash
npx vitest run scripts/generate
```
Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add scripts/generate/__tests__/
git commit -m "test(generator): add 20+ unit tests for template composition"
```

---

## Task 7: Update Documentation

**Files:**
- Create: `docs/superpowers/generator-refactor.md`
- Modify: `README.md` (add generator architecture section)

- [ ] **Step 1: Document new `composeSiteTemplate` API**
- [ ] **Step 2: Document how to add a new site (now just JSON + optional section config)**
- [ ] **Step 3: Document how to add a new brand (theme dir + thin template wrapper)**
- [ ] **Step 4: Commit**

```bash
git add docs/
git commit -m "docs(generator): document new composeSiteTemplate architecture"
```

---

## Execution Summary

**Total estimated effort:** 8-12 hours (spread across multiple sessions)

**Risk mitigation:**
- Each task produces a working, testable artifact
- Frequent commits allow rollback
- Existing sites continue to generate identically (verified by diff in Task 3-4)

**Post-refactor state:**
- Generator: ~800 LOC (down from 4032)
- Template functions: 9 thin wrappers (down from 9 × 250 LOC each)
- Test coverage: 20+ unit tests (up from 0)
- Adding new site: edit JSON only (no generator changes)
- Adding new brand: create theme dir + 1 thin wrapper (~30 LOC)

**Ready to start?** This plan is saved to `docs/superpowers/plans/2026-05-06-generator-refactor.md`. Would you like me to execute it using subagent-driven-development?
