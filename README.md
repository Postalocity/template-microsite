# Template Microsite

A configuration-driven microsite template system that enables rapid creation of vertical-specific microsites (10-15 minutes per site) while maintaining professional quality and design consistency.

## Architecture

**Template + JSON Config + Build Scripts** - Three-tier architecture separating structure from content:

- **Structure (60% of code)**: Fixed, shared React components with Framer Motion animations
- **Content (40% of code)**: Vertical-specific configurations in JSON
- **Generation**: Automated scaffolding scripts creating complete sites from configs

### Design Pattern

Configuration-Driven Component Architecture allows:

- **80% code reuse**: Shared components reduce duplication
- **5-7 hours foundation**: One-time setup for common infrastructure
- **15-20 minutes per site**: Content creation vs. 80-160 hours for manual copy-paste
- **95% error reduction**: Eliminates content leakage from manual operations

## Project Structure

```
template-microsite/
├── common/
│   ├── components/
│   │   └── shared/              # Reusable components (props-driven)
│   │       ├── HeroSection.tsx
│   │       ├── BenefitsSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── FAQSection.tsx
│   │       ├── ComparisonSection.tsx
│   │       ├── SiteNavigation.tsx
│   │       └── SiteFooter.tsx
│   └── types/
│       └── content.ts           # TypeScript content type definitions
├── config/
│   └── sites/                   # Vertical-specific configurations
│       └── healthcare-billing.json
├── scripts/
│   └── generate-site.ts         # Site generation script
├── sites/                       # Generated microsites
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

### Generating a Site

1. Create your configuration file in `config/sites/`:
   ```bash
   config/sites/your-vertical.json
   ```

2. Use the generation script:
   ```bash
   npm run generate your-vertical

   # Example:
   npm run generate healthcare-billing
   ```

3. Navigate to your generated site:
   ```bash
   cd sites/your-vertical
   npm install
   npm run dev
   ```

## Component Architecture

### Props-Driven Components

All components accept content props from JSON configs rather than hardcoded content:

```typescript
// Example: BenefitsSection
interface BenefitsSectionProps {
  benefits: BenefitsContent;
}

<BenefitsSection benefits={content.benefits} />
```

### Available Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `HeroSection` | `hero: HeroContent` | Hero banner with headline, CTA buttons |
| `BenefitsSection` | `benefits: BenefitsContent` | Grid of benefits with icons and metrics |
| `ServicesSection` | `services: ServicesContent` | Grid of service offerings |
| `FAQSection` | `faq: FAQContent` | Accordion-style FAQ section |
| `ComparisonSection` | `comparison: ComparisonContent` | 2-column comparison table |
| `SiteNavigation` | `config: SiteConfig` | Sticky navigation with mobile menu |
| `SiteFooter` | `config: SiteConfig` | Footer with branding and contact |

## Configuration Schema

### Site Configuration Structure

```json
{
  "site": {
    "id": "healthcare-billing",
    "name": "Healthcare Billing Solutions",
    "slug": "healthcare-billing",
    "domain": "healthcare-billing.com",
    "basename": "/healthcare-billing",
    "contact": {
      "email": "contact@healthcare-billing.com",
      "phone": "1-800-555-0199",
      "address": "123 Healthcare Way"
    }
  },
  "branding": {
    "tagline": "Healthcare Billing Solutions"
  },
  "theme": {
    "primary": {
      "h": 217,
      "s": 91,
      "l": 60
    },
    "gradients": {
      "hero": "217 91% 60%",
      "cta": "217 91% 60%"
    }
  },
  "navigation": {
    "links": [
      { "label": "Benefits", "href": "#benefits" },
      { "label": "Services", "href": "#services" }
    ],
    "cta": {
      "text": "Get Started",
      "href": "#contact",
      "variant": "primary"
    }
  },
  "content": {
    "hero": { ... },
    "benefits": { ... },
    "services": { ... },
    "faq": { ... },
    "comparison": { ... }
  }
}
```

### Content Type Definitions

See `common/types/content.ts` for complete type definitions including:

- `HeroContent` - Headlines, CTA buttons, background images
- `BenefitsContent` - Grid of benefit items with icons
- `ServicesContent` - Grid of service descriptions
- `FAQContent` - Question/answer pairs
- `ComparisonContent` - Comparison table rows
- `SiteConfig` - Site metadata and navigation

## Production Lessons Learned

This template incorporates lessons from the healthcare-billing site production:

### Professional Tone Guidelines

- NO dramatic language or emotional appeals
- NO revenue-first messaging
- Hours-focused messaging ("Reclaim 40-70 hours weekly")
- Verified claims only (city/state testimonials, specific metrics)

### Content Quality Standards

- Keyword density: 0.5-2%, 90%+ coverage
- H1/H2/H3 hierarchy required
- Minimum 900+ words per page
- First 100 words must contain primary keywords

### Credibility Standards

- Testimonials: City/State location required
- Certifications: ISO 9001 documented, NOT HIPAA/SOC2
- Metrics: Specific, verifiable numbers

## Scaling Strategy

### 1-10 Sites
- Current template structure suffices
- Manual site generation acceptable

### 10-20+ Sites
- Convert to monorepo (Turborepo)
- Automated CI/CD pipelines
- Shared content validation

### 200+ Sites
- Microservices architecture
- Content management system
- Automated SEO optimization

## Development

### Adding New Components

1. Define types in `common/types/content.ts`
2. Create component in `common/components/shared/`
3. Export from `common/components/shared/index.ts`
4. Update `scripts/generate-site.ts` template

### Customizing Themes

Edit the theme section in your site config:

```json
"theme": {
  "primary": {
    "h": 217,    // Hue (0-360)
    "s": 91,     // Saturation (0-100)
    "l": 60      // Lightness (0-100)
  }
}
```

### Image Assets

Place images in site directories:

```
sites/your-vertical/
├── public/
│   └── images/
│       └── hero-bg.jpg
```

Reference in config:

```json
"background": {
  "image": "/images/hero-bg.jpg",
  "alt": "Hero background description"
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate <config-name>` - Generate site from config
- `npm run validate-configs` - Validate all site configs

## License

MIT

## Contributing

Contributions welcome! Please read our coding standards and submit pull requests with:
1. Clear description of changes
2. Updated documentation
3. Tests for new features