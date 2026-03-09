# StringRay Agents

Quick reference for StringRay AI orchestration framework.

## What is StringRay?

StringRay provides intelligent multi-agent orchestration with automatic delegation and Codex compliance validation. Agents operate via OpenCode plugin injection - no manual setup needed.

## Available Agents

| Agent | Purpose | Invoke |
|-------|---------|--------|
| `@enforcer` | Codex compliance & error prevention | `@enforcer analyze this code` |
| `@orchestrator` | Complex multi-step task coordination | `@orchestrator implement feature` |
| `@architect` | System design & technical decisions | `@architect design API` |
| `@security-auditor` | Vulnerability detection | `@security-auditor scan` |
| `@code-reviewer` | Quality assessment | `@code-reviewer review PR` |
| `@refactorer` | Technical debt elimination | `@refactorer optimize code` |
| `@testing-lead` | Testing strategy | `@testing-lead plan tests` |
| `@bug-triage-specialist` | Error investigation | `@bug-triage-specialist debug error` |
| `@researcher` | Codebase exploration | `@researcher find implementation` |
| `@seo-consultant` | SEO optimization and auditing | `@seo-consultant audit our site` |

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

## Codex

StringRay enforces the Universal Development Codex (60 terms) for systematic error prevention. See [.opencode/strray/codex.json](https://github.com/htafolla/stringray/blob/master/.opencode/strray/codex.json) for full reference.

## Documentation

- [Full Documentation](https://github.com/htafolla/stringray)
- [Configuration Guide](https://github.com/htafolla/stringray/blob/master/docs/CONFIGURATION.md)
- [Troubleshooting](https://github.com/htafolla/stringray/blob/master/docs/TROUBLESHOOTING.md)

## SEO Skills Integration

The `@seo-consultant` agent provides access to **12 specialized SEO skills** for advanced optimization and auditing:

### Core SEO Skills (8)

| Skill | Purpose | Commands |
|-------|---------|----------|
| **seo-audit** | Full website SEO audit with parallel subagents, crawls 500 pages | "SEO audit of [url]", "full SEO check", "analyze my site" |
| **seo-page** | Deep single-page SEO analysis | "Analyze [url] for SEO", "page SEO check" |
| **seo-sitemap** | XML sitemap analysis and generation | "SEO sitemap audit", "generate sitemap" |
| **seo-schema** | Schema markup detection, validation, generation recommendations | "check schema markup", "SEO data validation" |
| **seo-technical** | Technical SEO audit (8 categories: crawl, index, security, URL, mobile, CWV, JS, AI crawlers) | "technical SEO audit", "robots.txt check", "Core Web Vitals" |
| **seo-content** | E-E-A-T analysis and content quality scoring | "analyze content quality", "E-E-A-T check" |
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
"What's the E-E-A-T score of my homepage?"
"Generate a comparison page for our product vs competitor X"
"Check our schema markup for CDLD compliance"
"Optimize our content for AI search engines"
```

The appropriate SEO skill will automatically load based on keyword matching.

### Current Platform vs SEO Skills

| Feature | Platform (Basic) | SEO Skills (Advanced) |
|---------|-----------------|----------------------|
| robots.txt generation | ✅ Automated | ✅ Validation & enhancement |
| sitemap.xml generation | ✅ Automated | ✅ Analysis, quality gates, audit |
| Meta tags (OG, Twitter) | ✅ Automated | ❌ Not needed (already in platform) |
| Schema.org structured data | ✅ 6 types updated | ✅ 10+ types with validation |
| AI Crawler Management | ❌ | ✅ GPTBot, ClaudeBot, Bytespider, etc. |
| Core Web Vitals tracking | ❌ | ✅ LCP, INP, CLS targeting |
| E-E-A-T analysis | ❌ | ✅ Full framework scoring |
| AI Search optimization | ❌ | ✅ GEO signals for ChatGPT, Perplexity |
| Visual SEO analysis | ❌ | ✅ Desktop + mobile screenshots |
| Competitor comparisons | ❌ | ✅ Feature matrices, schema |
| Programmatic SEO | ❌ | ✅ Location pages, quality gates |
| PDF Reports | ❌ | ✅ Executive summaries, action plans |

### SEO Skill Reports

SEO skills generate detailed reports:
- **FULL-AUDIT-REPORT.md** - Comprehensive findings
- **ACTION-PLAN.md** - Prioritized recommendations (Critical → High → Medium → Low)
- **screenshots/** - Desktop + mobile captures (if Playwright available)

No installation required - SEO skills are integrated via `.opencode/integrations/claude-seo/` and load automatically.

---
**Version**: 1.7.5 | [GitHub](https://github.com/htafolla/stringray)
