# ADR 0002: IKB Validation Layer as Single Source of Truth

**Date**: 2026-05  
**Status**: Accepted  
**Deciders**: Platform team  
**Related**: PLATFORM_EVOLUTION_ROADMAP.md, Phase 2 work on `feat/cms-validation-layer`

## Context

As the platform evolves from a generator-centric model toward a self-serve + headless CMS model (Payload/Strapi), we need a way to enforce our strong Institutional Knowledge Base (IKB) compliance rules at **publish time**, not just at generation time.

Previously, all blocklist/approved section logic lived in:
- `scripts/generate-site.ts`
- `scripts/content-factory.ts`
- `common/contexts/IKBContext.tsx`
- `scripts/content-validator.js`

This duplication made it impossible to safely open content editing to non-technical users or external brands without risking compliance violations.

## Decision

We created a new package `@microsite/validation` that becomes the **single source of truth** for:

- IKB phrase blocking (`validatePhrase`, `isPhraseAllowed`)
- Content type / section blocking (`validateContentType`, `validateSection`)
- Writing quality rules (hedging, fragments, etc.)
- High-level payload validation (`validateSiteContent`)

The package:
- Loads live rules from `config/ikb/{brand}/rules.json` via `engine/config-loader.ts`
- Is framework-agnostic (pure functions + async helpers)
- Is used by:
  - The generator (via `initializeValidation()`)
  - React runtime (via `IKBContext`)
  - Future headless CMS publish hooks
  - Internal admin tools

Legacy files (`content-factory.ts`, `content-validator.js`) now delegate to or re-export from the new package where possible, with deprecation notices.

## Consequences

**Positive**:
- CMS can safely allow customer editing while still blocking non-compliant content at publish time.
- One place to add new compliance rules.
- Clear migration path for the rest of the codebase.
- Enables the hybrid content model (structural/compliance content stays in IKB + JSON; editable content lives in CMS but is validated).

**Negative / Trade-offs**:
- During the transition period, some files still contain legacy hardcoded lists (for backward compat).
- The validation package currently has awkward import paths until the full monorepo workspaces + package linking (Phase 1) is complete.
- `validateSection` structural rules are still evolving and will need to grow with new section types.

## Next Steps

- Continue deeper structural validation rules.
- Build real Payload/Strapi integration examples.
- Complete legacy migration and removal of duplicated blocklists.
- Land monorepo workspace configuration so `@microsite/validation` can be cleanly imported as a workspace package.

## References

- `packages/validation/`
- `docs/cms/VALIDATION_HOOKS.md`
- `PLATFORM_EVOLUTION_ROADMAP.md` (Hybrid content model recommendation)
- Branch: `feat/cms-validation-layer`

---

**Approved by**: Platform team (via iterative development on feature branch)