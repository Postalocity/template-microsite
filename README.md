# Microsite Platform

A **multi-brand microsite generator** that enables rapid creation of vertical-specific microsites with support for multiple brands (Postalocity, Promo, TechSP) through separated brand configurations and institutional knowledge bases.

## Architecture

### Multi-Brand System

The platform supports multiple brands with separated configurations:

```
config/
├── brands/                    # Brand-specific configurations
│   ├── postalocity/          # Postalocity brand
│   │   ├── brand.json        # Brand metadata, URLs, logo
│   │   ├── contact.json      # Contact information
│   │   └── social.json       # Social media links
│   ├── promo/                # Promo brand
│   └── techsp/               # TechSP brand
├── ikb/                       # Institutional Knowledge Bases
│   ├── postalocity/          # Postalocity IKB
│   │   ├── rules.json        # Trust signals, promo codes, blocklists
│   │   ├── pricing.json      # Pricing tiers and add-ons
│   │   ├── proof-options.json # Proof options and upgrades
│   │   └── terminology.json   # Industry terminology
│   ├── promo/                # Promo IKB
│   └── techsp/               # TechSP IKB
└── sites/                    # Site-specific configurations
```

### React Context Architecture

```
common/contexts/
├── BrandContext.tsx          # Multi-brand support
│   ├── BrandProvider         # Provides brand config to components
│   ├── useBrand()           # Full brand context
│   ├── useBrandName()        # Brand name
│   ├── useBrandUrls()        # All brand URLs
│   ├── useBrandContact()     # Contact info
│   ├── useBrandSocial()      # Social links
│   ├── usePromoCode()        # Promo code
│   └── useAppUrl()           # App URL with promo code
└── IKBContext.tsx            # Institutional Knowledge Base
    ├── IKBProvider           # Provides IKB to components
    ├── useIKB()              # Full IKB context
    ├── useIKBRules()         # Rules, trust signals, blocklists
    ├── useTrustSignals()     # Certification badges
    ├── usePromoCodeFromIKB() # Get promo code for service
    ├── useIKBPricing()       # Pricing information
    └── useIKBTerminology()   # Industry terminology
```

### Key Benefits

| Feature | Benefit |
|---------|---------|
| **Single Codebase** | 13 components work across all brands |
| **Brand Isolation** | Each brand has its own URLs, contacts, and social links |
| **Institutional Knowledge** | IKB prevents AI hallucination with verified data |
| **Fail-Fast Development** | Missing context throws errors in dev mode |
| **Backward Compatible** | Default Postalocity values if no provider |

### Generator Architecture

The site generator uses a **flexible skeleton** approach:

- `composeSiteTemplate(config)` — pure function that builds TSX from declarative `SiteTemplateConfig`
- `SiteTemplateConfig` — brand, site metadata, sections array, optional `customImports`/`customBody`
- Adding a site: edit JSON only (`config/sites/<brand>/<slug>.json`)
- Adding a brand: create theme dir + one thin wrapper (~30 LOC) calling the composer
- **Never edit generated output** — regenerate from source

See `docs/superpowers/generator-refactor.md` for full API and workflows.

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Generate a Site

```bash
# Generate Postalocity site
npm run generate -- --brand postalocity --service credit-repair

# Generate Promo site  
npm run generate -- --brand promo --service signage

# Generate TechSP site
npm run generate -- --brand techsp --service saas-platform
```

### Run Generated Site

```bash
cd sites/postalocity/credit-repair
npm install
npm run dev
```

## Context Usage

### BrandContext

```tsx
import { BrandProvider, useBrandName, useAppUrl } from '@/contexts';

// Wrap your app with brand config
<BrandProvider brand={brandConfig} contact={contactConfig} social={socialConfig} promoCode="cr2026">
  {children}
</BrandProvider>

// Use in components
function MyComponent() {
  const brandName = useBrandName();        // "Postalocity"
  const appUrl = useAppUrl();              // "https://prod.postalocity.com/login.html?signUp=true&promo=cr2026"
  const { brand, contact } = useBrand();  // Full context
}
```

### IKBContext

```tsx
import { IKBProvider, useTrustSignals, usePromoCodeFromIKB } from '@/contexts';

// Wrap your app with IKB config
<IKBProvider ikb={ikbConfig}>
  {children}
</IKBProvider>

// Use in components
function TrustBadges() {
  const trustSignals = useTrustSignals();
  // ['NCOA Verified 2024', 'CASS Certified 2024', 'ISO 9001 Documented Processes 2023']
}

function PromoCode() {
  const code = usePromoCodeFromIKB('credit-repair');  // 'cr2026'
}

// Content validation
const { isContentAllowed, isPhraseAllowed } = useIKB();
isContentAllowed('testimonial');  // false (blocklisted)
isPhraseAllowed('guaranteed delivery');  // false (blocklisted)
```

## Components

All components use contexts for brand-agnostic rendering:

| Component | Context Used |
|-----------|-------------|
| `SiteNavigation` | `useBrand()`, `useBrandUrls()` |
| `SiteFooter` | `useBrand()`, `useBrandContact()` |
| `IntroSection` | `useBrandName()` |
| `TestimonialsSection` | `useBrandName()` |
| `GetStartedSection` | `useBrandName()`, `useAppUrl()` |
| `ScaleSection` | `useAppUrl()` |
| `ConversionSection` | `useBrandName()`, `useAppUrl()` |
| `PromoSignageSection` | `useAppUrl()` |
| `TrustBadgesSection` | `useTrustSignals()` |

## Testing

```bash
# Run all tests (158 tests)
npm test

# Run with coverage
npm run test:coverage
```

### Test Files

| File | Tests | Coverage |
|------|-------|----------|
| `BrandContext.test.tsx` | 20 | Brand hooks, defaults, memoization |
| `IKBContext.test.tsx` | 19 | IKB hooks, validation, defaults |
| `generate-site.test.ts` | 24 | Site generation |
| `config-loader.test.ts` | 23 | Brand/IKB loading |
| `content-factory.test.ts` | 42 | Content validation |
| `grid-layout.test.ts` | 21 | Layout utilities |
| `sanitize-html.test.ts` | 5 | HTML sanitization |
| `use-toast.test.ts` | 2 | Toast hook |
| `base-path-plugin.test.ts` | 2 | Build plugin |

## Scripts

```bash
npm run dev              # Start dev server (root)
npm run build            # Build root package
npm run generate         # Generate site (see usage above)
npm run verify           # Run launch validation
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## Adding a New Brand

### 1. Create Brand Config

```bash
mkdir -p config/brands/mybrand
```

Create `config/brands/mybrand/brand.json`:
```json
{
  "id": "mybrand",
  "name": "My Brand",
  "slug": "mybrand",
  "domain": "mybrand.com",
  "urls": {
    "app": "https://app.mybrand.com",
    "website": "https://www.mybrand.com"
  },
  "logo": { "filename": "logo.png", "alt": "My Brand" }
}
```

### 2. Create IKB

```bash
mkdir -p config/ikb/mybrand
```

Create `config/ikb/mybrand/rules.json`:
```json
{
  "trustSignals": ["Verified 2024"],
  "promoCodes": { "default": "mycode" },
  "approvedSections": ["hero", "faq"],
  "blocklistedContent": ["testimonial"],
  "blocklistedPhrases": ["guaranteed"]
}
```

### 3. Generate Site

```bash
npm run generate -- --brand mybrand --service default
```

## Project Structure

```
microsite-platform/
├── common/
│   ├── components/shared/     # Brand-agnostic components
│   ├── contexts/             # React contexts
│   │   ├── BrandContext.tsx  # Multi-brand support
│   │   └── IKBContext.tsx    # Institutional knowledge
│   └── types/
│       └── engine.ts          # Type definitions
├── config/
│   ├── brands/               # Brand configurations
│   ├── ikb/                  # Institutional knowledge bases
│   └── sites/                # Site configurations
├── engine/
│   ├── config-loader.ts      # Brand/IKB loader
│   └── index.ts              # Engine exports
├── scripts/
│   ├── generate-site.ts      # Site generator
│   ├── content-factory.ts    # Content validation
│   └── launch-validate.ts    # Launch checks
└── sites/                    # Generated microsites
```

## Documentation

- [Architecture Guide](docs/ARCHITECTURE.md) - Detailed architecture documentation
- [Institutional Knowledge](docs/institutional-knowledge.md) - IKB contents
- [AI Guardrails](docs/ai-guardrails.md) - Content validation rules
- [Agents Reference](AGENTS.md) - StringRay agents

## License

MIT
