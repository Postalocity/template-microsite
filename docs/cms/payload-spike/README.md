# Payload CMS Integration Spike

**Goal**: Demonstrate a real-world integration of `@microsite/validation` inside a Payload CMS instance so that non-compliant content is blocked at publish time.

## Status

This is a **spike / reference implementation**, not production code. It shows the pattern you should follow when standing up a real Payload (or Strapi) project.

## Recommended Production Setup

1. Create a separate repo (or monorepo package) for your CMS:
   ```bash
   npx create-payload-app@latest my-cms
   cd my-cms
   npm install @microsite/validation
   ```

2. In your Payload config, register the loader early:
   ```ts
   import { initializeValidation } from '@microsite/validation';
   initializeValidation();
   ```

3. Add `beforeValidate` or `beforeOperation` hooks on your content collections (see examples below).

## Minimal Working Example (In-Memory Simulation)

See `simulate-cms-with-validation.ts` in this folder for a tiny Node.js "CMS" that uses the same pattern a real Payload hook would use.

## Real Payload Hook Pattern

```ts
// collections/SiteContent.ts
import { CollectionConfig } from 'payload';
import { validateSiteContent } from '@microsite/validation';

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  fields: [ /* your fields */ ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const brandId = data.brandId || 'postalocity';
        const result = await validateSiteContent(data, brandId);

        if (!result.valid) {
          const firstError = Object.values(result.fieldErrors)[0]?.[0];
          throw new Error(firstError || 'Content failed IKB compliance validation');
        }
        return data;
      }
    ]
  }
};
```

## Running the Local Spike

```bash
npx tsx docs/cms/payload-spike/simulate-cms-with-validation.ts
```

It will show successful and blocked publish attempts using live IKB data.

## Next Steps for Real Project

- Add proper authentication & multi-tenant brand selection
- Store brandId on the Site / Tenant document
- Add a "Preview" button that runs validation without publishing
- Surface nice validation errors in the Payload admin UI
- Version the IKB snapshot at publish time for auditability

This pattern is the foundation for the self-serve + safe-editing vision described in the Phase 2 roadmap.
