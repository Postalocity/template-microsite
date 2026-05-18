# Generator Architecture (Post-Refactor)

**Date:** 2026-05-06  
**Status:** Implemented (Tasks 1-7 complete)

## Philosophy: The Flexible Skeleton

The generator is designed as a **flexible skeleton**, not a rigid declarative system. It handles the repetitive, error-prone boilerplate (headers, imports, IKB injection, providers) so brands can focus on their unique logic.

**Core Principle:** *Edit source (JSON + thin wrappers), never generated output.*

The framework provides the "skeleton" (the structure that every site needs) but offers **first-class escape hatches** (`customHeader`, `customImports`, `customBody`, `customProviders`) so that brands can grow in **any direction** without fighting the generator.

---

## Core API

### `composeSiteTemplate(config: SiteTemplateConfig): string`

Pure function that assembles a complete TSX site from declarative config.

```ts
import { composeSiteTemplate, type SiteTemplateConfig } from './generate/template-composer';

const tsx = composeSiteTemplate({
  brandId: 'odins-innovations',
  site: { id: 'doe-estrus', name: 'Doe Estrus Guide', slug: 'doe-estrus-guide', domain: 'odinsinnovations.com' },
  sections: [
    { name: 'HeroSection', component: 'HeroSection' },
    { name: 'TrustBadgesSection', component: 'TrustBadgesSection', conditional: 'content.trustSignals' },
    { name: 'WhyOdinsSection', component: 'WhyOdinsSection' }
  ],
  customImports: ["import { CustomFooter } from './components/CustomFooter';"],
  customBody: "<CustomFooter />",
  themePath: '@/themes/odins-innovations'
});
```

### `SiteTemplateConfig` Interface

```ts
export interface SiteTemplateConfig {
  brandId: string;                    // e.g., 'odins-innovations'
  site: SiteInfo;                     // { id, name, slug, domain }
  sections?: Array<{
    name: string;                     // Display name
    component: string;                // React component name
    conditional?: string;             // Optional: render only if data path exists
    importPath?: string;              // Optional: override default import
  }>;
  customHeader?: string;              // Override the warning header
  customImports?: string[];           // Additional import statements
  customBody?: string;                // Extra JSX to inject in <App />
  customProviders?: string;           // Override the <BrandProvider>/<IKBProvider> wrapper
  themePath?: string;                 // Theme directory alias (default: '@/components/shared')
}
```

---

## Separation of Concerns

The architecture cleanly separates concerns:

1.  **Skeleton (Boilerplate)**: `composeSiteTemplate` handles the repetitive parts.
    *   `generateHeader()`: Warning comments, generation metadata.
    *   `generateImports()`: Standard React imports + theme-specific components.
    *   `generateIKBConfig()`: Institutional Knowledge Base injection.
    *   `App()` Skeleton: `BrandProvider` + `IKBProvider` wrappers.

2.  **Customization (The Body)**: The brand-specific logic lives in `customBody` or the `sections` array.
    *   Simple sites use the declarative `sections` array.
    *   Complex brands (like Odin's with custom CTAs, inline widgets, complex conditionals) use `customBody` to inject arbitrary JSX.

3.  **Validation**: `config-validator.ts` (Zod) ensures configs are valid at the entry point.

---

## Adding a New Site

1.  Create `config/sites/<brand>/<slug>.json`.
2.  Run `npx tsx scripts/generate-site.ts --brand <brand> --service <slug>`.
3.  The generator handles the rest.

---

## Adding a New Brand

1.  Create `common/themes/<brand>/` (globals.css, brand config, shared components).
2.  Create a thin wrapper in `scripts/generate/templates/<brand>.ts` that calls `composeSiteTemplate` with brand-specific sections or a `customBody`.
3.  Add routing logic in `generateIndexFile()`.

---

## Workflow

**Always:** Edit source (JSON, components, thin wrappers) → Regenerate → Deploy.

**Never:** Edit generated files in `sites/`.

---

## Future Direction

The `custom*` escape hatches ensure the framework remains adaptable. Future work can focus on:
*   Expanding the declarative `sections` array for common patterns.
*   Adding more sophisticated schema validation.
*   Improving test coverage for the composition logic.

The skeleton provides consistency; the escape hatches provide freedom.
