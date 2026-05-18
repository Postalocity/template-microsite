# Payload CMS + @microsite/validation — Real Working Example

This folder contains a **real, minimal but production-pattern** integration of `@microsite/validation` into a Payload CMS project.

## Goal

Show exactly how to protect your brand compliance rules when customers (or internal teams) edit content through a modern headless CMS.

## Key Files

- `src/collections/SiteContent.ts` — The most important file. Contains the `beforeValidate` hook that calls `validateSiteContent()`.
- `src/payload.config.ts` — Example Payload configuration.
- `src/server.ts` — Minimal server entry point.

## How to Integrate Into a Real Payload Project (Recommended Path)

1. **Create a new Payload project**

   ```bash
   npx create-payload-app@latest my-brand-cms --template blank
   cd my-brand-cms
   ```

2. **Install the validation package** (during development in this monorepo)

   ```bash
   npm install @microsite/validation@workspace:*
   ```

3. **Copy the collection**

   Copy `examples/payload-cms/src/collections/SiteContent.ts` into your `src/collections/` folder.

4. **Register it** in your `payload.config.ts`

   ```ts
   import { SiteContent } from './collections/SiteContent';

   export default buildConfig({
     collections: [SiteContent, ...otherCollections],
     // ...
   });
   ```

5. **Initialize validation early**

   In your root config or server entry:

   ```ts
   import { initializeValidation } from '@microsite/validation';
   initializeValidation();
   ```

6. **Run the dev server**

   ```bash
   npm run dev
   ```

Now every time someone tries to publish or save a `SiteContent` document with blocklisted phrases or disallowed section types, Payload will reject it with a clear error.

## Running the Example in This Repo (For Testing)

From the monorepo root:

```bash
cd examples/payload-cms
npm install
npm run dev
```

You will need to configure a database in `.env` (Payload v3 supports Postgres, Mongo, etc.).

## The Validation Hook (The Important Part)

The magic lives here:

```ts
beforeValidate: [
  async ({ data }) => {
    const brandId = data.brandId || 'postalocity';
    const result = await validateSiteContent(data, brandId);

    if (!result.valid) {
      const errors = Object.values(result.fieldErrors).flat().join(' | ');
      throw new Error(`IKB Compliance failed: ${errors}`);
    }
    return data;
  }
]
```

This single hook is what makes safe self-serve editing possible while protecting your institutional knowledge and brand voice.

## Recommended Production Enhancements

- Resolve `brandId` from a parent Tenant/Site document instead of storing it on every content item.
- Add a custom "Run Validation" button in the admin UI.
- Log validation warnings (non-blocking) for editorial review.
- Snapshot the IKB rules version at publish time for audit/compliance records.

This example + the `@microsite/validation` package is the technical foundation for the "Internal Platform → Controlled Self-Serve" journey described in the Phase 2 roadmap.
