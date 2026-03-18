# Microsite Engine Architecture

> **Multi-brand microsite generation platform supporting multiple institutional knowledge bases.**

---

## Overview

The Microsite Engine is a brand-agnostic system that generates landing pages from JSON configurations and institutional knowledge bases (IKBs).

```
┌─────────────────────────────────────────────────────────────────┐
│                     MICROSITE ENGINE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │   Brand     │    │    IKB      │    │    Site Config      │ │
│  │   Config    │    │   (Knowl-   │    │    (Per-Site        │ │
│  │  (Identity) │    │   edge)     │    │     Settings)       │ │
│  └──────┬──────┘    └──────┬──────┘    └──────────┬──────────┘ │
│         │                  │                      │           │
│         └──────────────────┼──────────────────────┘           │
│                            ▼                                    │
│                   ┌─────────────────┐                          │
│                   │   Generator     │                          │
│                   │   (Engine)     │                          │
│                   └────────┬────────┘                          │
│                            ▼                                    │
│                   ┌─────────────────┐                          │
│                   │  Static Site    │                          │
│                   │   Output        │                          │
│                   └─────────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architecture Components

### 1. Brand Configuration (`config/brands/`)

Defines brand identity - the company/service being marketed.

| File | Purpose |
|------|---------|
| `brand.json` | Company name, logo, colors, URLs |
| `contact.json` | Contact info (phone, email, address) |
| `social.json` | Social media links |

### 2. Institutional Knowledge Base (`ikb/`)

Contains industry-specific terminology, rules, and content patterns.

| File | Purpose |
|------|---------|
| `{brand}/rules.json` | Content rules, allowlists, blocklists |
| `{brand}/pricing.json` | Pricing structure and options |
| `{brand}/proof-options.json` | Proof/verification options |
| `{brand}/terminology.json` | Industry terms and definitions |

### 3. Site Configuration (`config/sites/`)

Per-site customization for specific services or industries.

| File | Purpose |
|------|---------|
| `{brand}/{service}.json` | Service-specific content |

### 4. Template (`config/template.json`)

Base template with placeholder values that site configs extend.

---

## Directory Structure

```
template-microsite/
├── config/
│   ├── brands/                    # Brand configurations
│   │   ├── postalocity/          # Postalocity brand
│   │   │   ├── brand.json        # Identity config
│   │   │   ├── contact.json      # Contact info
│   │   │   └── social.json       # Social links
│   │   ├── promo/               # Promo brand (future)
│   │   │   └── ...
│   │   └── techsp/              # Tech service provider (future)
│   │       └── ...
│   ├── ikb/                      # Institutional Knowledge Bases
│   │   ├── postalocity/
│   │   │   ├── rules.json        # Content rules
│   │   │   ├── pricing.json      # Pricing
│   │   │   ├── proof-options.json
│   │   │   └── terminology.json
│   │   ├── promo/
│   │   │   └── ...
│   │   └── techsp/
│   │       └── ...
│   ├── sites/                    # Site configurations
│   │   ├── postalocity/
│   │   │   ├── credit-repair.json
│   │   │   ├── debt-collection.json
│   │   │   └── ...
│   │   └── promo/
│   │       └── ...
│   └── template.json             # Base template
├── scripts/
│   ├── generate-site.ts          # Main generator
│   ├── generate-brand.ts         # Brand setup utility
│   ├── content-factory.ts        # Validation
│   └── launch-validate.ts        # Launch checks
├── common/
│   ├── components/               # Shared components
│   ├── types/                    # TypeScript types
│   └── assets/                   # Brand assets
│       ├── postalocity/
│       ├── promo/
│       └── techsp/
├── engine/                        # Core engine library
│   ├── index.ts                  # Main export
│   ├── config-loader.ts          # Config loading
│   ├── ikb-loader.ts            # IKB loading
│   ├── template-engine.ts        # Template processing
│   └── validators/               # Content validators
└── sites/                        # Generated sites output
    ├── postalocity/
    ├── promo/
    └── techsp/
```

---

## Brand Configuration Schema

### `brand.json`

```typescript
interface BrandConfig {
  id: string;                    // 'postalocity', 'promo', 'techsp'
  name: string;                   // 'Postalocity', 'Promo', 'TechSP'
  slug: string;                   // URL-safe identifier
  tagline?: string;               // Brand tagline
  domain: string;                 // Primary domain (e.g., 'postalocity.com')
  urls: {
    app: string;                 // App/login URL
    website: string;             // Main website
    blog?: string;               // Blog URL
    support?: string;            // Support URL
  };
  colors?: {
    primary?: { h?: number; s?: number; l?: number };
    accent?: { h?: number; s?: number; l?: number };
  };
  logo: {
    filename: string;            // e.g., 'postalocity-logo.png'
    alt: string;                  // Alt text
  };
}
```

### `contact.json`

```typescript
interface ContactConfig {
  phone: string;                 // Main phone number
  email: string;                 // Support email
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours?: {
    weekdays?: string;
    weekends?: string;
  };
}
```

---

## Institutional Knowledge Base Schema

### `rules.json`

```typescript
interface IKBRules {
  trustSignals: string[];        // Approved trust signal badges
  promoCodes: Record<string, string>;  // promoCode mapping
  approvedSections: string[];     // Allowed section types
  blocklistedContent: string[];    // Prohibited content types
  blocklistedPhrases: string[];   // Prohibited phrases
}
```

### `pricing.json`

```typescript
interface IKBPricing {
  basePrice: number;             // Base price per unit
  currency: string;               // 'USD'
  tiers?: {                       // Optional pricing tiers
    name: string;
    price: number;
    features: string[];
  }[];
}
```

### `proof-options.json`

```typescript
interface IKBProofOptions {
  standard: {
    name: string;
    description: string;
    included: boolean;
  }[];
  upgrades: {
    name: string;
    description: string;
    additionalCost?: number;
  }[];
}
```

---

## Generator Workflow

```
1. Parse Arguments
   └── --brand postalocity --service credit-repair

2. Load Brand Config
   └── config/brands/postalocity/brand.json
   └── config/brands/postalocity/contact.json
   └── config/brands/postalocity/social.json

3. Load IKB
   └── ikb/postalocity/rules.json
   └── ikb/postalocity/pricing.json
   └── ikb/postalocity/proof-options.json
   └── ikb/postalocity/terminology.json

4. Load Site Config
   └── config/sites/postalocity/credit-repair.json

5. Merge Configs
   └── template.json + brand.json + site.json → resolved config

6. Validate Content
   └── Run content-factory validators against resolved config
   └── Check against IKB rules

7. Generate Site
   └── Generate main.tsx
   └── Generate vite.config.ts
   └── Generate index.html
   └── Generate robots.txt
   └── Generate sitemap.xml

8. Output
   └── sites/{brand}/{service}/
```

---

## Adding a New Brand

### Step 1: Create Brand Config

```bash
mkdir -p config/brands/{newbrand}
mkdir -p ikb/{newbrand}
mkdir -p config/sites/{newbrand}
mkdir -p common/assets/{newbrand}
mkdir -p sites/{newbrand}
```

### Step 2: Create Configuration Files

```json
// config/brands/{newbrand}/brand.json
{
  "id": "newbrand",
  "name": "New Brand",
  "slug": "newbrand",
  "domain": "newbrand.com",
  "urls": {
    "app": "https://app.newbrand.com",
    "website": "https://www.newbrand.com"
  },
  "logo": {
    "filename": "newbrand-logo.png",
    "alt": "New Brand Logo"
  }
}
```

### Step 3: Create IKB

```json
// ikb/{newbrand}/rules.json
{
  "trustSignals": ["Trusted Service 2024"],
  "promoCodes": { "service1": "ns2026" },
  "approvedSections": ["hero", "features", "faq", "cta"],
  "blocklistedContent": ["testimonials", "case-studies"],
  "blocklistedPhrases": ["guaranteed", "100%"]
}
```

### Step 4: Create Site Config

```json
// config/sites/{newbrand}/service1.json
{
  "service": {
    "id": "service1",
    "name": "Service One"
  },
  "content": {
    "hero": { ... },
    "features": { ... }
  }
}
```

### Step 5: Generate

```bash
npx ts-node scripts/generate-site.ts --brand newbrand --service service1
```

---

## Content Validation Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Site Config │ ──▶ │ IKB Rules   │ ──▶ │ Validated   │
│   (JSON)    │     │ (Reference) │     │   Config    │
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                          ▼
                    ┌─────────────┐
                    │ Validation  │
                    │  Report     │
                    └─────────────┘
```

---

## Current Brands

| Brand | ID | Status | Services |
|-------|-----|--------|----------|
| Postalocity | `postalocity` | Active | Direct mail automation |
| Promo | `promo` | Planned | Promotional products |
| TechSP | `techsp` | Planned | Technology services |

---

## Migration Notes

### From v1 (Postalocity-only)

Old structure:
```
config/
├── template.json
└── sites/
    └── *.json (hardcoded postalocity refs)
```

New structure:
```
config/
├── brands/
│   └── postalocity/
│       ├── brand.json
│       ├── contact.json
│       └── social.json
├── ikb/
│   └── postalocity/
│       └── *.json
├── sites/
│   └── postalocity/
│       └── *.json
└── template.json
```

---

*Version: 2.0*
*Last Updated: March 2026*
