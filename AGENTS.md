# Agents Guide - Microsite Platform

Quick reference for using StringRay agents and SEO skills in the microsite platform.

## About This Platform

This is the **microsite-platform** - a configuration-driven microsite generator that enables rapid creation of vertical-specific microsites. Powered by StringRay AI orchestration.

## Project Structure

```
microsite-platform/
├── common/              # Shared components (props-driven)
│   ├── components/shared/
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── SiteNavigation.tsx
│   │   └── SiteFooter.tsx
│   └── types/content.ts
├── config/sites/        # Vertical-specific configs
│   ├── credit-repair.json
│   └── healthcare-billing.json
├── scripts/
│   ├── generate-site.ts  # Site generation script
│   └── verify-site.ts    # Verification script
└── sites/               # Generated microsites
    ├── credit-repair/
    └── healthcare-billing/
```

## Current Sites

- **credit-repair** - Automated dispute letter mailing for credit repair professionals
- **healthcare-billing** - Healthcare billing solutions microsite

## Platform Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run generate <site>` | Generate site from config |
| `npm run verify <site>` | Verify generated site |

Example:
```bash
npm run generate credit-repair
cd sites/credit-repair
npm install
npm run dev
```

## Available StringRay Agents

| Agent | Purpose | Invoke |
|-------|---------|--------|
| `@enforcer` | Codex compliance & error prevention | `@enforcer analyze this code` |
| `@orchestrator` | Complex multi-step task coordination | `@orchestrator implement feature` |
| `@architect` | System design & technical decisions | `@architect design system` |
| `@security-auditor` | Vulnerability detection | `@security-auditor scan codebase` |
| `@code-reviewer` | Quality assessment | `@code-reviewer review PR` |
| `@refactorer` | Technical debt elimination | `@refactorer optimize code` |
| `@testing-lead` | Testing strategy & coverage | `@testing-lead plan tests` |
| `@bug-triage-specialist` | Error investigation | `@bug-triage-specialist debug error` |
| `@researcher` | Codebase exploration | `@researcher find implementation` |

### Platform-Specific Usage

For microsite platform development:

```bash
# Code quality
@enforcer "Check generate-site.ts for Codex compliance"

# Architecture decisions
@architect "Design architecture for new shared components"

# Bug investigation
@bug-triage-specialist "Debug stylesheet generation issue"

# Code review
@code-reviewer "Review microsite platform PR"

# Refactoring
@refactorer "Optimize component architecture"
```

## Complexity Routing

StringRay automatically routes tasks based on complexity:

- **Simple (≤20)**: Single agent
- **Moderate (21-35)**: Single agent with tools
- **Complex (36-75)**: Multi-agent coordination
- **Enterprise (>75)**: Orchestrator-led team

## CLI Commands

```bash
npx strray-ai install       # Install and configure
npx strray-ai status       # Check configuration
npx strray-ai health        # Health check
npx strray-ai validate      # Validate installation
npx strray-ai capabilities # Show all features
npx strray-ai report        # Generate reports
npx strray-ai analytics    # Pattern analytics
npx strray-ai calibrate    # Calibrate complexity
```

## SEO Consultant Agent

The `@seo-consultant` agent provides access to **12 specialized SEO skills** for advanced optimization and auditing:

### Core SEO Skills (8)

| Skill | Purpose | Commands |
|-------|---------|----------|
| **seo-audit** | Full website SEO audit with parallel subagents, crawls 500 pages | "SEO audit of [url]", "full SEO check", "analyze my site" |
| **seo-page** | Deep single-page SEO analysis | "Analyze [url] for SEO", "page SEO check" |
| **seo-sitemap** | XML sitemap analysis and generation | "SEO sitemap audit", "generate sitemap" |
| **seo-schema** | Schema markup detection, validation, generation recommendations | "check schema markup", "SEO data validation" |
| **seo-technical** | Technical SEO audit (8 categories: crawl, index, security, URL, mobile, CWV, JS, AI crawlers) | "technical SEO audit", "robots.txt check", "Core Web Vitals" |
| **seo-content** | E-E-A-T analysis and content quality scoring | "analyze content quality", "EEAT check" |
| **seo-geo** | AI Search / Generative Engine Optimization for ChatGPT, Perplexity, Google AI Overviews | "optimize for AI search", "GEO optimization" |
| **seo-plan** | Strategic SEO planning and roadmap | "create SEO strategy", "SEO roadmap" |

### Advanced SEO Skills (4)

| Skill | Purpose | Commands |
|-------|---------|----------|
| **seo-programmatic** | Programmatic SEO with quality gates (location pages, content clusters) | "programmatic SEO", "scale content creation" |
| **seo-competitor-pages** | "X vs Y" comparison generators, feature matrices, schema for comparisons | "create comparison page", "build alternatives page" |
| **seo-hreflang** | Multi-language SEO validation and cross-domain hreflang analysis | "check hreflang", "lang SEO validation" |
| **seo-images** | Image optimization analysis (alt text, size, format recommendations) | "image SEO audit", "optimize images" |

### Using SEO Skills

Simply use natural language requests with SEO keywords:

```bash
# Example requests
"Can you perform a full SEO audit on our credit-repair site?"
"Analyze the technical SEO of healthcare-billing.com"
"What's the EEAT score of my homepage?"
"Generate a comparison page for our product vs competitor X"
```

The appropriate SEO skill will automatically load based on keyword matching.

## Built-in Platform SEO vs StringRay SEO Skills

| Feature | Platform (Basic) | SEO Skills (Advanced) |
|---------|-----------------|----------------------|
| robots.txt generation | ✅ | ✅ Validation |
| sitemap.xml generation | ✅ | ✅ Audit/quality gates |
| Meta tags (OG, Twitter) | ✅ | ❌ Not needed |
| Schema.org structured data | ✅ 6 types | ✅ 10+ types |
| AI Crawler Management | ❌ | ✅ GPTBot, ClaudeBot, PerplexityBot |
| Core Web Vitals tracking | ❌ | ✅ LCP, INP, CLS |
| EEAT analysis | ❌ | ✅ Full framework |
| AI Search optimization | ❌ | ✅ GEO signals |
| Visual SEO analysis | ❌ | ✅ Screenshots |
| Competitor comparisons | ❌ | ✅ Feature matrices |
| Programmatic SEO | ❌ | ✅ Quality gates |
| Multi-language SEO | ❌ | ✅ Hreflang validation |
| Image SEO | ❌ | ✅ Alt text, size |
| PDF Reports | ❌ | ✅ Executive summaries |

## Project-Specific Workflows

### Pre-Launch SEO Audit Workflow
Location: `.opencode/workflows/seo-pre-launch-audit.yml`

Validates critical SEO elements before production launch:
- robots.txt presence and validity
- sitemap.xml structure
- Meta tag completeness
- Content length requirements
- Heading hierarchy (H1, H2, H3)
- Schema.org markup
- Alt text coverage
- Mobile optimization
- Build size limits

### Competitive Analysis Workflow
Location: `.opencode/workflows/seo-competitive-analysis.yml`

Performs competitive SEO analysis and comparison page generation

## Verification Script

Run `npm run verify <site>` to validate 15+ SEO elements:
```bash
npm run verify credit-repair
# Checks:
# ✅ robots.txt exists and valid
# ✅ sitemap.xml valid format
# ✅ Meta tags present
# ✅ Schema markup present
# ✅ Mobile optimization valid
```

## Codex

StringRay enforces the Universal Development Codex (60 terms) for systematic error prevention. See [.opencode/strray/codex.json](.opencode/strray/codex.json) for full reference.

## Documentation

- **[SEO Integration Guide](SEO-INTEGRATION.md)** - Complete SEO capabilities guide
- **[README.md](README.md)** - Project overview and getting started
- [StringRay Documentation](https://github.com/htafolla/stringray)
- [SEO Skills Reference](.opencode/integrations/claude-seo/)

## Version

**Platform**: microsite-platform v1.0.0
**StringRay**: 1.7.5
**SEO Skills Integration**: 2026-03-09
