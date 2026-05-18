# Payload CMS + @microsite/validation — Real Example

This is a **real, minimal but complete** example of integrating the Microsite Platform's validation layer into a Payload CMS project.

## What This Demonstrates

- A real `SiteContent` collection with validation on every publish attempt
- Use of `validateSiteContent()` + `initializeValidation()` from `@microsite/validation`
- Proper error messages returned to the admin UI when content violates IKB rules
- Brand-aware validation (`brandId` on the document)

## How to Use This Example

### Option 1: Bootstrap a new Payload project + copy the important parts (Recommended)

```bash
npx create-payload-app@latest my-cms --template blank
cd my-cms

# Install the local validation package (during development)
npm install @microsite/validation@workspace:*

# Copy the collection
cp -r path/to/this/examples/payload-cms/src/collections/SiteContent.ts ./src/collections/

# Copy or adapt the config pattern
```

Then register the collection and call `initializeValidation()` early in your `payload.config.ts`.

### Option 2: Run this example folder directly (advanced)

This folder is set up as a workspace member. From the root of the monorepo:

```bash
cd examples/payload-cms
npm install
npm run dev
```

> Note: You will still need a real Payload database (Mongo/Postgres) configured via `.env`.

## The Critical Hook (Copy This)

The real power is in `src/collections/SiteContent.ts`:

```ts
beforeValidate: [
  async ({ data }) => {
    const brandId = data.brandId || 'postalocity';
    const result = await validateSiteContent(data, brandId);

    if (!result.valid) {
      throw new Error('Content failed IKB validation...');
    }
    return data;
  }
]
```

This is what prevents bad content from ever being published.

## Next Steps for Production

- Store `brandId` on a Tenant or Site document and resolve it automatically
- Add a "Validate" button in the admin that runs the check without saving
- Version the IKB snapshot at publish time for compliance auditing
- Surface friendly validation messages using Payload's `req.payload.logger`

This pattern is the foundation for safe self-serve microsite editing.
