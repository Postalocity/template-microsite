# SEO Integration Guide

This guide explains how to use the 12 SEO skills integrated into the microsite platform.

## Overview

The microsite platform includes **basic SEO automation** (robots.txt, sitemap.xml, schema.org, meta tags) built into the site generation process. For advanced SEO capabilities, the project integrates **12 StringRay SEO skills** via the `@seo-consultant` agent.

## Installation

The 12 SEO skills are included in the `strray-ai` npm package and require installation:

```bash
npx strray-ai install
# or
node node_modules/strray-ai/scripts/integrations/install-claude-seo.js
```

This installs all 12 SEO skills:
- seo-audit
- seo-page
- seo-sitemap
- seo-schema
- seo-technical
- seo-content
- seo-geo
- seo-plan
- seo-programmatic
- seo-competitor-pages
- seo-hreflang
- seo-images

## Current Platform SEO Features

### Automated SEO Generation (Built-in)

Every generated microsite automatically includes:

1. **robots.txt**
   - Allows search engine crawling
   - References sitemap.xml location
   - Configured for maximum SEO visibility

2. **sitemap.xml**
   - XML sitemap following Google specifications
   - Includes all generated pages
   - Proper XML structure and validation

3. **meta_tags.html** (in index.html)
   - Meta charset and viewport
   - Meta descriptions (from hero content)
   - Canonical URLs
   - Keywords, author, and robots directives

4. **Social Sharing Tags**
   - Open Graph tags (og:title, og:description, og:image, og:url)
   - Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)

5. **Schema.org Structured Data**
   - WebSite schema
   - Organization schema
   - LocalBusiness schema
   - FAQPage schema
   - ContactPoint with telephone/email

6. **Mobile Optimization**
   - Viewport meta tag
   - Mobile-friendly responsive design
   - Touch-friendly navigation

### Content Quality Guidelines

From `scripts/generate-site.ts`:

- **Keyword density**: 0.5-2%, 90%+ coverage
- **H1/H2/H3 hierarchy**: Required
- **Word count**: Minimum 500 homepage, 800 service pages, 1,500 blog posts
- **First 100 words**: Must contain primary keywords
- **Testimonials**: Must include City/State locations
- **Certifications**: ISO 9001 documented (NOT HIPAA/SOC2)
- **Metrics**: Specific, verifiable numbers only

## Advanced SEO Skills (StringRay)

### Using SEO Skills

Simply use natural language requests. The appropriate skill will automatically load:

```bash
# Full SEO audit
"Can you perform a full SEO audit on our credit-repair site?"

# Technical SEO
"Analyze the technical SEO of healthcare-billing.com"
"Check our Core Web Vitals performance"

# Content quality
"What's the E-E-A-T score of my homepage?"
"Analyze content quality and readability"

# Schema markup
"Validate our schema markup"
"Generate schema for product pages"

# AI search optimization
"Optimize our content for AI search engines"
"Improve our GEO signals for ChatGPT"

# Sitemap analysis
"Audit our sitemap.xml structure"

# Competitive analysis
"Create a comparison page for our product vs competitor X"
"Analyze competitor SEO strategies"

# Programmatic SEO
"Design a programmatic SEO strategy for location pages"
"Generate content clusters for topic coverage"

# Image SEO
"Optimize images for SEO"
"Check alt text coverage across our site"

# Multi-language SEO
"Validate hreflang implementation"
"Check cross-domain SEO setup"

# Strategic planning
"Create a comprehensive SEO roadmap"
"Develop an SEO strategy for Q1"
```

### Core SEO Skills (8)

#### 1. **seo-audit**
Full website SEO audit with parallel subagent delegation.

**Features:**
- Crawls up to 500 pages
- Detects business type
- Delegates to 6 specialists
- Generates health score (0-100)
- Creates prioritized action plans

**Output Files:**
- `FULL-AUDIT-REPORT.md`
- `ACTION-PLAN.md`
- `screenshots/` (if Playwright available)

**Usage:**
- "SEO audit of credit-repair.com"
- "Run full site SEO check"
- "Analyze my SEO health"

#### 2. **seo-page**
Deep single-page SEO analysis.

**Features:**
- Title tag analysis
- Meta description optimization
- Heading structure validation
- Content density checks
- Internal linking assessment

**Usage:**
- "Analyze homepage for SEO"
- "Check login page SEO"
- "Validate contact page optimization"

#### 3. **seo-technical**
Technical SEO audit across 8 categories:

1. **Crawlability**
   - robots.txt validation
   - XML sitemap presence
   - Noindex/noafter tags
   - Crawl depth analysis
   - JavaScript rendering

2. **Indexability**
   - Canonical tag conflicts
   - Duplicate content detection
   - Thin content identification
   - Pagination handling
   - Hreflang validation

3. **Security**
   - HTTPS enforcement
   - Security headers (CSP, HSTS, etc.)
   - Mixed content checks
   - SSL certificate validation

4. **URL Structure**
   - Clean URL analysis
   - Hierarchy validation
   - Redirect chain detection
   - URL length checks

5. **Mobile Optimization**
   - Responsive design validation
   - Touch target sizing (48x48px min)
   - Mobile-first indexing compliance

6. **Core Web Vitals**
   - LCP (<2.5s target)
   - INP (<200ms target)
   - CLS (<0.1 target)

7. **Structured Data**
   - Schema validation
   - Google-supported type checks

8. **AI Crawler Management**
   - GPTBot (OpenAI training)
   - ChatGPT-User (real-time browsing)
   - ClaudeBot (Anthropic training)
   - PerplexityBot (search index)

**Usage:**
- "Technical SEO audit"
- "Check Core Web Vitals performance"
- "Analyze crawlability issues"

#### 4. **seo-content**
E-E-A-T and content quality analysis.

**E-E-A-T Framework:**

| Factor | Key Signals |
|--------|-------------|
| **Experience** | First-hand research, case studies, unique data, photos |
| **Expertise** | Credentials, certifications, technical depth |
| **Authoritativeness** | External citations, industry recognition |
| **Trustworthiness** | Contact info, testimonials, secure site, policies |

**Content Metrics:**
- Word count analysis (per page type)
- Readability scores (Flesch Reading Ease)
- Keyword optimization
- Heading structure
- Multimedia presence
- Internal/external linking

**AI Content Assessment:**
- Acceptable AI content markers
- Low-quality AI content markers
- Helpful Content System

**AI Citation Readiness (GEO signals):**
- Quotable statements with statistics
- Structured data for data points
- Strong heading hierarchy
- Answer-first formatting

**Usage:**
- "Analyze content quality"
- "Check E-E-A-T compliance"
- "Content audience suitability"

#### 5. **geo-optimization**
AI Search / Generative Engine Optimization.

**Key Strategies:**
- Structured answers for Q&A
- First-party data emphasis
- Schema markup optimization
- Topical authority building
- Entity clarity

**AI Platforms:**
- Google AI Mode (no organic links)
- Google AI Overviews
- ChatGPT
- Perplexity
- Bing Copilot

**Usage:**
- "Optimize for AI search"
- "Improve GEO signals"
- "AI visibility optimization"

#### 6. **seo-plan**
Strategic SEO planning.

**Outputs:**
- SEO roadmap
- Keyword strategy
- Content calendar
- Link building plan
- Technical improvements
- Timeline and priorities

**Usage:**
- "Create SEO roadmap"
- "Develop SEO strategy"
- "Plan content calendar"

#### 7. **seo-sitemap**
XML sitemap analysis and generation.

**Validation Checks:**
- XML format validity
- URL count limits (<50,000)
- HTTP 200 validation
- lastmod accuracy
- Proper referencing in robots.txt

**Generation Features:**
- Quality gates (warning at 30+ pages)
-行业-specific templates
- Structure planning
- Format validation

**Usage:**
- "Audit sitemap.xml"
- "Generate sitemap"
- "Sitemap quality check"

#### 8. **seo-schema**
Schema markup detection, validation, generation.

**Supported Types:**
- WebSite
- Organization
- LocalBusiness
- FAQPage
- Product
- Review
- Article
- HowTo
- BreadcrumbList

**Validation:**
- Syntax checking
- Google support verification
- Required field validation
- Testing tool integration

**Usage:**
- "Validate schema markup"
- "Generate product schema"
- "Schema audit"

### Advanced SEO Skills (4)

#### 9. **seo-programmatic**
Programmatic SEO with quality gates.

**Safe Programmatic Pages:**
- Integration pages (with setup docs)
- Template/tool pages (with content)
- Glossary pages (200+ words)
- Product pages (unique specs)
- User profile pages (UGC)

**Penalty Risk Pages:**
- Location pages with only city names
- "Best [tool]" without value
- Competitor pages without data
- AI-generated pages without review

**Quality Gates:**
- Warning at 30+ location pages
- Hard stop at 50+ pages
- Validation prompts
- Requirement checklist

**Usage:**
- "Programmatic SEO strategy"
- "Content cluster plan"
- "Location page generation"

#### 10. **seo-competitor-pages**
"X vs Y" comparison generators.

**Page Types:**
- Direct "X vs Y" comparisons
- "Alternatives to X" lists
- "Best [category] Tools" roundups
- Feature matrix tables

**Data Requirements:**
- Verifiable claims from public sources
- Current pricing (with "as of [date]" notes)
- Linked sources where possible

**Schema Recommendations:**
- Product schema with AggregateRating
- Review schema
- BreadcrumbList for navigation

**Usage:**
- "Create comparison page"
- "Generate competitor alternatives"
- "Feature matrix generator"

#### 11. **seo-hreflang**
Multi-language SEO validation.

**Checks:**
- Cross-domain hreflang validation
- Language code verification
- Canonicalization conflicts
- Return tag validation
- Self-referencing hreflang

**Best For:**
- Sites with 50+ language variants
- Cross-domain setups
- International reach

**Usage:**
- "Validate hreflang"
- "Multi-language SEO audit"
- "Cross-domain SEO check"

#### 12. **seo-images**
Image optimization analysis.

**Checks:**
- Missing alt text detection
- Oversized image identification
- Format recommendations
- Lazy loading opportunities
- Image Sitemap presence

**Optimization:**
- WebP conversion suggestions
- Compression recommendations
- Responsive image formats
- Placeholder optimization

**Usage:**
- "Image SEO audit"
- "Optimize site images"
- "Alt text analysis"

## Usage Workflow

### Step 1: Generate Site with Basic SEO
```bash
npm run generate my-vertical
cd sites/my-vertical
npm install
npm run build
```

### Step 2: Verify SEO Setup
```bash
npm run verify my-vertical
# Checks:
# ✅ robots.txt exists and valid
# ✅ sitemap.xml valid format
# ✅ Meta tags present
# ✅ Schema markup present
# ✅ Mobile optimization valid
```

### Step 3: Run Advanced SEO Audit
```bash
# Use @seo-consultant agent
@seo-consultant "Perform full SEO audit on my-vertical"

# Or use natural language
"Can you perform a full SEO audit on our my-vertical site?"
```

### Step 4: Review Reports
- `FULL-AUDIT-REPORT.md` - Detailed findings
- `ACTION-PLAN.md` - Prioritized recommendations
- `screenshots/` - Visual evidence (if available)

### Step 5: Implement Recommendations
- Fix critical issues (blocks indexing)
- Address high-priority items (ranking impact)
- Defer medium/low items to backlog

## Examples

### Example 1: Pre-Launch SEO Check
```
User: "We're about to launch credit-repair.com. Please perform a full SEO audit."

@seo-consultant:
- Analyzes robots.txt, sitemap.xml
- Validates schema markup
- Checks Core Web Vitals
- Tests mobile optimization
- Scores SEO Health (0-100)
- Generates ACTION-PLAN.md with prioritized fix list
```

### Example 2: Content Quality Optimization
```
User: "What's the E-E-A-T score of our homepage? How can we improve it?"

@seo-consultant (seo-content skill):
- Analyzes Experience signals (case studies, unique data)
- Checks Expertise (author credentials, technical depth)
- Validates Authoritativeness (external citations, recognition)
- Verifies Trustworthiness (contact info, policies, testimonials)
- Scores each factor (0-25)
- Recommends improvements
```

### Example 3: AI Search Optimization
```
User: "Optimize our content for AI search engines like ChatGPT and Perplexity."

@seo-consultant (seo-geo skill):
- Analyzes citation readiness (quotable statements, structured data)
- Checks heading hierarchy for AI extraction
- Validates entity clarity (brand, authors, concepts mapped to schema)
- Recommends GEO improvements
- Tracks AI visibility across platforms
```

### Example 4: Competitor Comparison Page
```
User: "Create a comparison page for our product vs Competitor X."

@seo-consultant (seo-competitor-pages skill):
- Generates "Product A vs Competitor X" page structure
- Creates feature matrix table
- Includes verified claims and current pricing
- Adds Product schema with AggregateRating
- Optimizes for "Product A vs Competitor X" keyword
- Generates conversion-optimized content
```

### Example 5: Technical SEO Audit
```
User: "Technical SEO check for healthcare-billing.com."

@seo-consultant (seo-technical skill):
- Crawlability analysis (robots.txt, sitemap, noindex tags)
- Indexability checks (canonicals, duplicates, thin content)
- Security validation (HTTPS, CSP, HSTS)
- URL structure review (clean URLs, redirects)
- Mobile optimization (responsive, touch targets)
- Core Web Vitals benchmarking (LCP, INP, CLS)
- Schema markup validation
- AI crawler management (GPTBot, ClaudeBot rules)
```

## Current Platform vs SEO Skills Comparison

| Feature | Platform | SEO Skills | When to Use |
|---------|----------|------------|-------------|
| robots.txt | ✅ Auto | ✅ Validate | After code changes |
| sitemap.xml | ✅ Auto | ✅ Audit | Structure validation |
| Meta tags | ✅ Auto | - | Already handled |
| Schema (6 types) | ✅ Auto | ✅ 10+ types | Advanced schema needs |
| AI crawlers | ❌ | ✅ Manage | AI training control |
| Core Web Vitals | ❌ | ✅ Analyze | Performance optimization |
| E-E-A-T | ❌ | ✅ Score | Content quality |
| AI search | ❌ | ✅ Optimize | GEO strategy |
| Visual SEO | ❌ | ✅ Screenshot | Design review |
| Competitor comparisons | ❌ | ✅ Generate | Revenue pages |
| Programmatic | ❌ | ✅ Plan | Scale content |
| Multi-language | ❌ | ✅ Validate | International sites |
| Image SEO | ❌ | ✅ Optimize | Site-wide audit |
| PDF Reports | ❌ | ✅ Generate | Executive summary |
| Action Plans | ❌ | ✅ Prioritized | Team direction |

## Workflows

### Pre-Launch SEO Audit Workflow
Location: `.opencode/workflows/seo-pre-launch-audit.yml`

Validates:
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

Performs:
- Competitor URL analysis
- Feature matrix generation
- Comparison page creation
- Content gap analysis
- Schema markup generation
- Competitive report generation

## Integration with Site Generation

### Phase 1: Site Generation (Basic SEO)
```bash
npm run generate credit-repair
# Automatically generates:
# ✅ robots.txt
# ✅ sitemap.xml
# ✅ index.html with meta tags
# ✅ Schema.org markup
# ✅ Social sharing tags
# ✅ Mobile optimization
```

### Phase 2: Site Verification
```bash
cd sites/credit-repair
npm run verify
# Checks 15+ SEO elements
# Validates schema markup
# Tests meta tag presence
# Sitemap validation
```

### Phase 3: Advanced SEO Audit (Optional)
```bash
# After production build
@seo-consultant "Perform full SEO audit on credit-repair site"

# Generates:
# - FULL-AUDIT-REPORT.md
# - ACTION-PLAN.md
# - Screenshots
# - Prioritized fix list
```

### Phase 4: Ongoing Optimization
```bash
# Regular tasks
@seo-consultant "Monitor Core Web Vitals performance"
@seo-consultant "Check E-E-A-T score for new content"
@seo-consultant "Validate schema markup for product pages"
@seo-consultant "Optimize content for AI search engines"
```

## Quick Start Checklist

For each new site:

- [ ] Run `npm run generate` (auto-generates basic SEO)
- [ ] Run `npm run verify` (validates 15+ SEO elements)
- [ ] Build site with `npm run build`
- [ ] Run `@seo-consultant` for advanced audit (optional)
- [ ] Review `ACTION-PLAN.md` for recommendations
- [ ] Implement critical/high-priority fixes
- [ ] Deploy to production

## Getting Help

### Troubleshooting Common Issues

**Issue**: SEO audit returns "robots.txt missing"
- **Solution**: Re-run `npm run verify` to regenerate files

**Issue**: Schema validation fails
- **Solution**: Check JSON-LD syntax with Google's Structured Data Testing Tool

**Issue**: Core Web Vitals poor performance
- **Solution**: Use INP monitoring, optimize images, reduce JS bundle size

**Issue**: Low E-E-A-T score
- **Solution**: Add author credentials, case studies, testimonials, contact info

**Issue**: AI search visibility low
- **Solution**: Improve heading hierarchy, add structured data, ensure quotable content

### Additional Resources

- StringRay Documentation: https://github.com/htafolla/stringray
- Google SEO Starter Guide: https://developers.google.com/search/docs
- Schema.org Documentation: https://schema.org/

## Version

**SEO Integration Version**: 1.0.0
**Platform Version**: 1.0.0
**StringRay Version**: 1.7.5