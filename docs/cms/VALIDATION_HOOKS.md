# CMS Validation Hooks — @microsite/validation

This document shows exactly how to wire the IKB compliance validator into a headless CMS (Payload or Strapi) so that non-compliant content is **blocked at publish time**, preserving the platform's compliance guarantees.

---

## Payload CMS Example (Recommended)

```ts
// payload/collections/SiteContent.ts
import { CollectionConfig } from 'payload';
import { validatePhrase, validateContentType } from '@microsite/validation';

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    // ...
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        const brandId = data?.brandId || req?.payload?.brand?.id;

        if (data?.headline) {
          const r = await validatePhrase(data.headline, brandId);
          if (!r.valid) {
            throw new Error(`Validation failed: ${r.errors.join(' | ')}`);
          }
        }

        if (data?.sectionType) {
          const r = await validateContentType(data.sectionType, brandId);
          if (!r.valid) throw new Error(r.errors[0]);
        }

        return data;
      }
    ]
  }
};
```

---

## Strapi v5 Example

```ts
// src/api/page/content-types/page/lifecycles.ts
import { validatePhrase } from '@microsite/validation';

export default {
  async beforeCreate(event) {
    await validateOrThrow(event.params.data);
  },
  async beforeUpdate(event) {
    await validateOrThrow(event.params.data);
  }
};

async function validateOrThrow(data: any) {
  const brandId = data.brandId || 'postalocity';
  if (data.headline) {
    const res = await validatePhrase(data.headline, brandId);
    if (!res.valid) {
      throw new Error(`IKB violation: ${res.errors.join(', ')}`);
    }
  }
}
```

---

## Important Notes

- Always call the validator in `beforeValidate` / `beforeCreate` / `beforeUpdate` lifecycle hooks.
- The functions are async — await them.
- For best UX, surface the exact error messages to the content editor.
- Register a real IKB loader (via `setIKBLoader`) early in your CMS bootstrap so the validator uses the live `config/ikb/` data instead of defaults.

See the package README for how to inject the real loader from `engine/config-loader.ts`.
