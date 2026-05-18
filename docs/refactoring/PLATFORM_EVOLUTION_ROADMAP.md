# Platform Evolution Roadmap: From Generator to Multi-Tenant Microsite SaaS

**Status**: Strategic Draft — For Review  
**Date**: 2026-05  
**Context**: Original deep review + monorepo plan, then expanded with new product direction (self-serve web UI + headless CMS).

---

## 1. The Pivot in One Sentence

You are no longer building a **better static site generator** for an internal team.  
You are evolving toward a **compliance-aware, multi-tenant microsite platform** where:

- Brands (or their customers) can self-serve or semi-self-serve a compliant microsite.
- Non-technical users can edit content safely after launch.
- The powerful IKB + generator system becomes the **onboarding + guardrail engine**, not the runtime source of truth.

This is a **product** shift, not just a tech refactor.

---

## 2. Direct Answer: "Which Content Ownership Model Is Best?"

**Recommendation: Hybrid (JSON/IKB as structural source of truth + CMS for editable customer content)**

### Why Hybrid Wins Here

Your current strength is **institutional guardrails** (blocklists, approved sections, trust signals, pricing, terminology, promo codes). This is your moat and your compliance differentiator.

- **Keep in versioned JSON + IKB** (source-controlled, regenerated or validated on change):
  - Approved section types and order
  - Trust signals, certifications, proof options
  - Pricing tiers + add-ons
  - Terminology definitions
  - Promo code rules
  - Blocklisted phrases / content types
  - Core "How it Works", "Difference", legal/compliance copy

- **Allow in Headless CMS** (customer-editable, with preview + publish):
  - Hero headline + subhead variations
  - Benefits / features list (within approved types)
  - FAQ content (new questions/answers, subject to phrase validation)
  - Testimonials / case studies (with moderation)
  - Seasonal promotions, images, CTAs
  - A/B test variants
  - Localized or partner-specific copy

**Rationale**:
- Pure "CMS owns everything" risks destroying the compliance value you have spent years building.
- Pure "generator stays primary" kills the self-serve editing experience customers will expect.
- Hybrid lets you keep the **Codex / IKB enforcement** on the structural layer while giving customers the modern editing UX they want.

The generator + IKB becomes the **template + validation layer** that seeds the CMS and re-validates on publish.

---

## 3. Recommended High-Level Architecture (4 Layers)

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 3: Self-Serve Management UI (Web App)                     │
│  - Signup / onboarding wizard                                    │
│  - Site dashboard, analytics, publishing                         │
│  - Brand theme picker, IKB rule viewer                           │
│  - User management + permissions                                 │
│  (Next.js / Nuxt / your preferred framework + auth)             │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  LAYER 2: Platform Services (Backend + CMS)                      │
│  - Tenant / Site / User / Audit models                           │
│  - Self-hosted Headless CMS (Strapi or Payload CMS recommended)  │
│  - Content validation service (calls your existing IKB rules)    │
│  - Preview token + publishing pipeline                           │
│  - Asset storage (S3/R2 + CDN)                                   │
│  - (Optional) billing / subscription layer                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  LAYER 1: Rendering / Delivery Layer                             │
│  - Modern React/Next.js site renderer (or Astro/Remix)           │
│  - Pulls: brand config + IKB rules + CMS content + theme         │
│  - Supports static export, ISR, or edge rendering                │
│  - Still produces shopify.html + asset bundles for current flow  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  LAYER 0: Generator + IKB Engine (Current Strength)              │
│  - The thing you have today                                      │
│  - Used for:                                                     │
│      • Initial site bootstrap / onboarding                       │
│      • Compliance validation on CMS publish                      │
│      • Regenerating structural shells                            │
│  - Becomes a library / service, not the only way to produce sites│
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Phased Build-Out Plan (Realistic)

### Phase 0 — Foundation (4–8 weeks) — Do This First

**Goal**: Make the current system support 20–50 brands without pain. This is the prerequisite for everything else.

- Monorepo restructuring (see previous plan: `packages/common`, `packages/generator`, shared build config).
- Fix test/CI pollution and root tooling.
- Theme ownership cleanup (no more forking HeroSection etc.).
- Extract generator into a proper `@microsite/generator` package with clean APIs.
- Add "validate content against IKB" as a reusable function (will be called by the CMS later).

**Deliverable**: You can comfortably add 10 new brands this quarter without the repo falling over.

**Do not skip this.** Building a management UI on top of a messy generator + duplicated components is technical debt on day 1.

---

### Phase 1 — Internal Platform (2–3 months)

**Goal**: Your team (and trusted partners) can create and manage sites through a web UI instead of CLI + JSON editing.

**Scope**:
- Simple internal web app (can start as a Vite + React admin SPA or Next.js app in a new `apps/platform/` or `apps/admin/` directory).
- Auth (email magic link or SSO for internal).
- CRUD for Brands, Sites, Services.
- "Create new site from template" wizard that calls the generator under the hood.
- Preview (spin up a dev server or use the new renderer with live data).
- Basic publishing: trigger a build + push to Shopify / static host / R2.
- Audit log of who changed what.

**Key Integration**:
- The generator is now invoked by the platform backend (not manually by engineers).
- Still produces the current artifact format so nothing downstream breaks.

**Tech choices**:
- Start with Next.js App Router in `apps/platform/` (or keep it simple with Vite + Express if you want minimal new framework).
- Use the same `packages/common` for shared UI primitives.
- Postgres or SQLite for the first internal version.

**Success metric**: A new Postalocity service site can be created by a non-engineer in < 15 minutes via the internal UI.

---

### Phase 2 — Headless CMS Integration + Content Model (3–4 months)

**This is the hardest and most important phase.**

**Recommended CMS choice**: **Payload CMS** (or Strapi v5 if your team prefers it).

**Why Payload over Strapi for your case**:
- Excellent TypeScript support and type generation.
- Very strong admin UI customization (you can embed your IKB validation rules directly in the CMS UI).
- Collections + Globals fit your "brand + site + content" model well.
- You already have strong TypeScript discipline — Payload will feel native.

**Content Model Sketch** (high level):

Collections:
- `Brands` (linked to your existing `config/brands/{id}/`)
- `Sites` (one per microsite)
- `Pages` or `SiteContent` (flexible blocks that map to your section components)
- `Media` (with alt text, usage tracking)
- `Revisions` / `PublishedVersions`

Globals (per brand or per site):
- IKB Rules snapshot (immutable at publish time)
- Promo code rules
- Trust signals

**Critical Feature**: **Validation Hook on Publish**

Before a customer can publish, the platform calls your existing content validator + IKB phrase/blocklist checker. If it fails, the publish is blocked with clear explanations ("Phrase 'guaranteed results' is blocklisted — see IKB rules").

This preserves your compliance moat even when customers have editing power.

**Generator role in this phase**:
- On "Create Site" the generator still runs to produce the initial approved structure + component mapping.
- After that, the CMS owns the *content* while the generator owns the *approved shape*.

---

### Phase 3 — Controlled Self-Serve + Public Onboarding (4–6+ months)

Only after Phase 2 is stable.

- Public signup flow (choose vertical → choose brand/theme → pick domain/subdomain or custom domain).
- Guided onboarding that still forces IKB-compliant choices.
- Limited editing surface for new customers (you deliberately expose only safe fields first).
- Approval workflow or "request changes" that routes to your team for complex brands.
- Billing / plan tiers (number of sites, custom domains, advanced analytics, white-label, etc.).

**At this point** the generator is mostly an internal tool for creating new *kinds* of sites and new brand templates, not for day-to-day content work.

---

## 5. Concrete Recommended Tech Stack (Opinionated)

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| **Monorepo** | npm workspaces + Turborepo (or pnpm) | You already have the pain; fix it in Phase 0 |
| **Shared UI/Components** | Keep React + your existing shadcn/ui + Radix | Don't rewrite what works |
| **Management UI** | Next.js 15 App Router (`apps/platform`) | Best DX for forms, server actions, auth, and future API routes |
| **Headless CMS** | **Payload CMS** (self-hosted) | TypeScript-first, great admin customization, strong validation hooks |
| **Database** | Postgres (Supabase or Neon or self-hosted) | Payload loves Postgres; you will need real relational data for tenants |
| **Auth** | NextAuth / Auth.js or Clerk (for speed) then migrate to self-hosted | Start fast, own it later |
| **Asset Storage** | Cloudflare R2 or S3 + CDN | Cheap, fast, works for both CMS media and generated static assets |
| **Rendering Sites** | Next.js or Astro for the public microsites (new) | Better SEO, partial prerendering, edge runtime. Keep React for complex interactive sections |
| **Hosting** | Vercel (for platform + new renderer) or Cloudflare | You can still export static bundles for Shopify embedding |

**Important**: Do **not** try to make the current Vite-generated React sites the long-term public renderer. They are great for the current Shopify/embedded use case. For the new self-serve world, a proper framework with server components + CMS data fetching will be cleaner.

---

## 6. How the Generator Fits in the Future World

The generator does **not** die. It evolves into three specialized roles:

1. **Template Bootstrapper** — "Give me a new vertical (e.g., 'insurance lead gen') with these 8 approved sections and this IKB" → produces a new starter template + component mapping + validation rules.
2. **Compliance Validator Service** — A pure function/library that the CMS calls on every publish attempt.
3. **Bulk / Migration Tool** — One-off regeneration of many sites when you make a breaking structural change to the design system.

You will likely keep `scripts/generate-site.ts` (or the new `@microsite/generator`) around for years, but it will be called by the platform, not by engineers typing CLI commands.

---

## 7. Risks Specific to This Ambition

| Risk | Severity | Mitigation |
|------|----------|------------|
| CMS editing destroys compliance reputation | Critical | Validation hooks + "approved sections only" + human review queue for new brands |
| Team underestimates the data modeling work | High | Spend real time in Phase 2 on the content model with domain experts |
| Two parallel systems (old generator sites + new CMS sites) for 12+ months | High | Clear "v1 sites" vs "v2 platform sites" naming + migration tools |
| Self-hosted CMS ops burden | Medium | Use managed Postgres + good backup strategy; Payload/Strapi are not zero-ops |
| Customers expect full visual editing like Webflow | Medium | Be explicit in marketing: "Compliant microsite platform with safe editing" — not "unlimited Webflow clone" |

---

## 8. Immediate Next Actions (This Month)

1. **Approve Phase 0 monorepo work** (the previous plan) — this is still the correct foundation.
2. **Create a small internal admin spike** (1–2 weeks) in a new `apps/admin/` directory using Next.js. Goal: prove you can trigger the generator from a web form and get a live preview link.
3. **Evaluate Payload vs Strapi** with a 3-day prototype: model one existing brand + one site + 3–4 editable sections. Test the validation hook idea.
4. **Write the first ADR** for the content ownership model (Hybrid) so the whole team aligns before Phase 2 starts.
5. **Decide on database** (Neon / Supabase / self-hosted Postgres) — this choice affects Payload more than anything else.

---

## 9. Closing Thought

Your current generator + IKB system is one of the best examples of **"AI guardrails done right"** I have seen in a real product. The temptation in the self-serve + CMS world will be to relax those guardrails for speed and "customer freedom."

**Do not do that.**

The winning product is the one that says:

> "You get a beautiful, compliant, on-brand microsite in minutes — and we will still stop you from shooting yourself (and us) in the foot with bad claims, wrong terminology, or unapproved sections."

That combination (speed + safety) is extremely rare and extremely valuable.

The technical roadmap above is designed to protect that moat while giving you the modern UX layer customers expect.

---

**Would you like me to expand any phase into a detailed execution plan with specific epics, tech spikes, and file-level changes?**  
Particularly useful next deliverables:
- Detailed Payload content model + collection schemas
- Phase 0 monorepo execution plan with actual PR breakdown
- Internal admin app data model + first 5 screens

Just say the word.