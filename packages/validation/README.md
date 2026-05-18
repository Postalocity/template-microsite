# @microsite/validation

Pure, framework-agnostic IKB compliance and content-quality validation for the Microsite Platform.

This package is the **official validation layer** that headless CMS instances (Payload CMS, Strapi, etc.) must call on every publish attempt to protect the platform's compliance guarantees.

## Installation (once published in the monorepo)

```bash
npm install @microsite/validation
```

## Core Functions

```ts
import {
  validatePhrase,
  validateContentType,
  validateSection,
  getIKBRules,
  validateWritingQuality
} from '@microsite/validation';

// In a Payload/Strapi beforeValidate hook
const result = validatePhrase(newHeadline, 'postalocity');
if (!result.valid) {
  throw new Error(result.errors.join('\n'));
}
```

## Brand IKB Data

Rules are loaded from `config/ikb/{brandId}/rules.json` (via the engine loader once the monorepo layout lands).

## CMS Integration

See `docs/cms/VALIDATION_HOOKS.md` for ready-to-paste hook examples for Payload and Strapi.

## Development

```bash
cd packages/validation
npm install
npm run build
npm test
```

## Status

This is the Phase 2 foundation package. Full IKB loading and richer structural validation will be completed as part of the CMS integration epic.
