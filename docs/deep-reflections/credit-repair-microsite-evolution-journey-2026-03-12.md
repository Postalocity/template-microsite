# Credit-Repair Microsite Evolution Journey
## Grid Layouts, Content Precision, and Template Resilience - 2026-03-12

---

## Executive Summary

This narrative captures a multi-session odyssey through the credit-repair microsite implementation—a journey that tested the boundaries of our template system, exposed the fragility of assumed patterns, and ultimately strengthened the core infrastructure for all future microsites.

The work accomplished five major objectives:

1. **Grid Layout Mastery** - Implemented proper 3-2-2 and 2x2 grid patterns after discovering our initial approach created staggered, uncentered layouts
2. **Hero Image Infrastructure** - Built complete pipeline for copying hero images from template to generated sites' public folders
3. **Postcard Microsite Creation** - Rapidly deployed a new site variant with print-ready postcard functionality
4. **Content Precision Refinement** - Updated FAQs, removed SOC 2 references, fixed comparison table icons, and added DifferenceSection
5. **Template Resilience Improvements** - Enhanced component flexibility to handle variable content counts and icon naming conventions

The result: A credit-repair microsite that went from broken grid layouts and missing images to a polished, professional presentation—all while improving the template system that generates it.

---

## Part 1: The Grid Layout Crisis

### The Initial Assumption

When we started, the grid layout for services and benefits seemed straightforward. Seven services should display in a 3-2-2 pattern. Four benefits should display in a 2x2 pattern. Simple, right?

I wrote the initial `grid-layout.ts` utility with confidence:

```typescript
export const getGridColumns = () => ({ small: 2, medium: 3, large: 3 });
export const getColumnClass = (index: number, count: number) => {
  // Row 2 and 3 items get col-start-2 to center them
  if (count === 7 && index >= 3) return "col-start-2";
};
```

The CSS classes would handle the rest. The 3-column grid would naturally flow, and `col-start-2` would push the second and third row items to the center.

### The First Discovery: Right-Aligned, Not Centered

I generated the site, built it, and opened the browser. What I saw made no sense:

**Row 1:** Three items, perfectly placed. ✓  
**Row 2:** Two items, but they were right-aligned, not centered. ✗  
**Row 3:** Two items, also right-aligned. ✗

The `col-start-2` class was being applied, but instead of centering, it was just shifting everything right. The items weren't spanning properly.

### The Debug Spiral

I checked the browser DevTools. The classes were there:
- `md:col-start-2` on item 3
- `md:col-start-3` on item 4  
- `md:col-start-2` on item 5
- `md:col-start-3` on item 6

But the CSS wasn't being generated. Tailwind's JIT compiler wasn't picking up the dynamic class names.

**Attempt 1:** Use arbitrary value syntax `md:[col-start:2]`  
**Result:** Still not detected by Tailwind JIT

**Attempt 2:** Add safelist to tailwind.config.ts  
**Result:** Classes generated, but items still misaligned

**Attempt 3:** Use inline styles `style={{ gridColumnStart: 2 }}`  
**Result:** Better, but items in row 3 were overlapping row 2

The fundamental issue: With a 3-column grid and `col-span-1`, items just filled naturally. To get true centering with 2 items in a 3-column grid, we needed different column spans.

### The Breakthrough: 6-Column Grid with col-span-2

The insight came after multiple iterations: Don't fight the 3-column grid. Use a 6-column grid instead.

With 6 columns:
- **Row 1:** 3 items × 2 columns each = 6 columns (fills row) ✓
- **Row 2:** 2 items × 2 columns each + col-start-2 = centered ✓  
- **Row 3:** 2 items × 2 columns each + col-start-2 = centered ✓

The fix required updating three systems:

1. **grid-layout.ts** - Return 6 columns for 7 items, 2 columns for 4 items
2. **ServicesSection.tsx** - Apply col-span-2 and conditional col-start
3. **tailwind.config.ts** - Safelist grid-cols-6 and col-span-2

```typescript
// The winning formula
const forceItemStyle = itemCount === 7 ? {
  gridColumn: i === 3 || i === 5 ? "2 / 4" : 
              i === 4 || i === 6 ? "4 / 6" : "span 2"
} : {};
```

But this required explicit grid line positioning, not just col-start classes.

---

## Part 2: The Hero Image Mirage

### The Silent Failure

The hero images were configured in the JSON. The build completed successfully. The site rendered. But the hero background was blank.

I checked the browser: 404 error for `/credit-repair/images/credit-repair-hero.jpg`.

I checked the file system: The file didn't exist in `sites/credit-repair/public/images/`.

I checked the generation script: It was only using hero images to generate OG images, never copying them to the public folder for actual display.

### The Pipeline Gap

The `generate-site.ts` script had this logic:

```typescript
// Generate OG image from hero
await generateOGImage(heroImagePath, siteDir);
// ... but never copy hero to public/images/
```

The OG image generator read the source file, processed it, and saved to `public/og-image.png`. But the hero image itself—needed by the HeroSection component—was never copied.

### The Hero Source Hunt

Then came the next discovery: Where do hero images live in the template?

I found `common/assets/hero-bg.jpg` in the root. But for industry-specific sites like credit-repair (finance), we wanted finance-themed heroes. Did they exist?

I searched:
- `common/assets/finance/` - Empty
- `common/assets/healthcare/` - Empty  
- `common/assets/utilities/` - Empty

The industry folders existed but had no hero images. We needed to populate them with appropriate hero backgrounds from the common assets.

### The Implementation

Three changes to `generate-site.ts`:

1. **Hero source mapping** - Map site slugs to industry-specific hero paths
2. **Copy to public/images** - Copy hero image for display in HeroSection  
3. **Copy to industry folders** - Populate industry asset folders for future use

```typescript
const heroSourcePaths: Record<string, string> = {
  'credit-repair': path.join(TEMPLATE_DIR, 'common/assets/finance/hero-bg.jpg'),
  'healthcare-billing': path.join(TEMPLATE_DIR, 'common/assets/healthcare/hero-bg.jpg'),
  // ... etc
};

// Copy to generated site's public/images/
const heroImagesDir = path.join(publicDir, 'images');
fs.copyFileSync(heroSourcePath, path.join(heroImagesDir, heroImageFilename));
```

Now hero images flowed from template → generated site → displayed in browser.

---

## Part 3: The Postcard Pivot

### An Unexpected Request

Midway through the credit-repair work, a new requirement emerged: Create a "postcard" microsite for conference follow-ups. This wasn't in the original plan, but it was time-sensitive—a follow-up to yesterday's conference.

The user asked: "How doable is this as an SVG or should I use another tool?"

### The Analysis

I considered three approaches:

1. **SVG postcard** - Scalable, code-based, can embed in site
2. **Canva template** - Easy, print-ready, manual updates
3. **HTML/CSS → PDF** - Programmatic, matches our workflow

The HTML/CSS approach won: It keeps everything in code, uses our existing infrastructure, and provides a print-ready page that exports to PDF.

### The Rapid Deployment

Creating a new microsite usually takes hours. We did it in minutes:

1. **Created `config/sites/postcard.json`** - Full site config with postcard-specific messaging
2. **Created `common/components/postcard/`** - React components for 4.25" × 6.25" postcard with bleed
3. **Created `sites/postcard/print.html`** - Standalone print page with exact dimensions
4. **Updated `generate-site.ts`** - Added postcard to hero image mapping

The postcard featured:
- Front: Postalocity logo, tagline, headline, subheadline
- Back: Thank you message, CTA, contact info, postal indicia
- Exact dimensions: 4.25" × 6.25" (4×6 with 1/8" bleed)
- Print instructions embedded in the page

Key insight: The template system enabled rapid deployment because the infrastructure already existed. We just configured content and added one specialized component.

---

## Part 4: The Content Refinement Marathon

### The FAQ Iteration Cycle

The FAQs required multiple rounds of refinement. Each change seemed simple, but the propagation was complex.

**Round 1: Initial Updates**
- "How fast can I get dispute letters mailed?" - Remove last sentence
- "How much does a dispute letter mailing cost?" - Add 'a'
- Tracking question - Update second sentence
- Security question - Change title and second sentence

I updated `config/sites/credit-repair.json` and regenerated. But the changes didn't appear.

**Round 2: The Hardcoded Default Trap**

I discovered `FAQSection.tsx` had hardcoded default FAQs:

```typescript
const defaultFaqs = [
  {
    q: "How fast can I get dispute letters mailed?",
    a: "Same-day or next-day processing... Track every letter with real-time USPS tracking."
  },
  // ... old content
];
```

The component used `faqs = faqContent?.faqs ?? defaultFaqs`—if no FAQs provided in props, it fell back to defaults. The generated site wasn't passing FAQ content, so defaults displayed.

**Round 3: Dual Updates Required**

To make changes stick, I had to update:
1. `config/sites/credit-repair.json` - Template config
2. `FAQSection.tsx` defaultFaqs - Component defaults
3. Regenerate the site
4. Verify `config.json` in generated site

The iteration taught us: Component defaults and template configs must stay synchronized. The component provides fallback content, but the template should always provide specific content.

### The SOC 2 Removal Campaign

The user requested: "remove SOC 2 verbiage throughout"

I thought this would be simple—search and replace. But SOC 2 appeared in multiple systems:

1. **FAQ answer** - "SOC 2 Type II certified infrastructure"
2. **TrustBadgesSection** - Badge showing "SOC 2 Type II Certified"
3. **Credentials array** - "SOC 2 Type II Certified" with AICPA issuer
4. **TrustSignals section** - "SOC 2 Type II Certified" signal

Each required separate updates:
- `FAQSection.tsx` - Remove from default answer
- `TrustBadgesSection.tsx` - Remove badge from JSX
- `config/sites/credit-repair.json` - Remove from credentials and signals

The removal cascaded: Template config → generated config → built site. One change in template required regeneration to reach the live site.

### The Icon Naming Convention Crisis

The comparison table had two rows with missing icons:
- "Address Verification" with `icon: "map-pin"`
- "Returned Mail Rate" with `icon: "trending-up"`

I checked `ComparisonTable.tsx`. It had an iconMap with camelCase keys:

```typescript
const iconMap = {
  mapPin: () => <svg>...</svg>,
  trendingUp: () => <svg>...</svg>,
  // ...
};
```

But the config used hyphenated names: `"map-pin"`, `"trending-up"`.

The lookup `iconMap[row.icon]` failed because `"map-pin"` ≠ `"mapPin"`.

**The Fix:** Add hyphenated aliases:

```typescript
const iconMap: Record<string, any> = {
  mapPin: () => <svg>...</svg>,
  'map-pin': () => <svg>...</svg>,  // Hyphenated alias
  trendingUp: () => <svg>...</svg>,
  'trending-up': () => <svg>...</svg>,  // Hyphenated alias
};
```

This made the component resilient to both naming conventions—critical because different configs might use different styles.

### The DifferenceSection Integration

The user wanted to add "The Postalocity Difference" section from the standalone healthcare site to credit-repair. This required:

1. **Copying content** - 3 boxes with specific icons and text
2. **Updating `DifferenceSection.tsx`** - Make it accept props instead of hardcoded content
3. **Adding to `main.tsx`** - Import and conditionally render
4. **Exporting from `index.ts`** - Make available to all sites

The component originally had hardcoded healthcare content. Making it config-driven meant:

```typescript
// Before: Hardcoded
const defaultDifferentials = [
  { icon: Mail, title: "Every Mailer Includes an Envelope", ... }
];

// After: Config-driven
const differentials = hasConfigData 
  ? difference.differences.map(item => ({
      icon: iconMap[item.icon] || Mail,
      title: item.title,
      description: item.description,
    }))
  : defaultDifferentials;
```

Now any site can have a DifferenceSection with custom content, or fall back to sensible defaults.

---

## Part 5: The Build-Regenerate Cycle

### The Pattern of Discovery

A pattern emerged during the work:

1. **Update template** - Change `config/sites/credit-repair.json` or `common/components/`
2. **Regenerate site** - Run `npx tsx scripts/generate-site.ts credit-repair`
3. **Verify changes** - Check `sites/credit-repair/config.json`
4. **Build site** - Run `npm run build`
5. **Test in browser** - Check `npm run preview`
6. **Discover issue** - Something not quite right
7. **Repeat**

Each cycle took 2-3 minutes. Over dozens of iterations, this added up.

### The Cache Problem

Sometimes changes didn't appear even after regeneration. The culprit: Vite's aggressive caching.

```bash
# Clean build required
rm -rf dist node_modules/.cache node_modules/.vite
npm run build
```

Without this, old component code persisted in the build. The browser showed stale content, creating confusion about whether changes were applied.

### The Inference Chain

Every change to the template required inference about what else needed updating:

- Update `grid-layout.ts` → Update `ServicesSection.tsx` to use new functions
- Update `config/sites/credit-repair.json` → Regenerate to propagate to `sites/credit-repair/config.json`
- Update `FAQSection.tsx` defaults → Changes apply to all sites using defaults
- Add new component export → Update all `main.tsx` files that should use it

The dependency graph was complex. Missing one step meant broken functionality.

---

## Part 6: Systemic Improvements

### Component Resilience Patterns

Through the iterations, we established patterns for component resilience:

**Pattern 1: Configurable with Sensible Defaults**
```typescript
const faqs = faqContent?.faqs ?? defaultFaqs;
```

**Pattern 2: Flexible Icon Naming**
```typescript
const iconMap = {
  camelCase: icon,
  'kebab-case': icon,  // Alias for flexibility
};
```

**Pattern 3: Conditional Feature Display**
```typescript
{content.difference && <DifferenceSection difference={content.difference} />}
```

**Pattern 4: Grid Layout Abstraction**
```typescript
const gridClasses = getGridLayoutClasses(itemCount);
const colClass = getColumnClass(index, itemCount);
```

These patterns made components work across multiple sites with different content configurations.

### The Template-Site Sync Mechanism

The work reinforced the need for clear template → site propagation:

1. **Template config** (`config/sites/*.json`) - Source of truth
2. **Generation script** - Transforms template → site
3. **Site config** (`sites/{name}/config.json`) - Generated artifact
4. **Built site** (`sites/{name}/dist/`) - Compiled output

Changes flow: Template → Script → Site Config → Build → Deploy

Understanding this flow prevented the "why aren't my changes showing?" confusion.

---

## Part 7: Reflection and Learnings

### What Went Well

1. **Grid Layout Solved** - After multiple attempts, the 3-2-2 pattern works correctly
2. **Hero Images Fixed** - Complete pipeline from template → generated site → browser
3. **Rapid Postcard Deployment** - New site type created in minutes, not hours
4. **Content Precision Achieved** - FAQs, SOC 2 removal, icons all corrected
5. **Template Resilience Improved** - Components now handle variable configurations
6. **Core Infrastructure Enhanced** - `grid-layout.ts`, `ComparisonTable.tsx`, `FAQSection.tsx` all improved

### What Was Challenging

1. **Tailwind JIT Limitations** - Dynamic class names require safelisting or inline styles
2. **Build Cache Invalidation** - Vite caching required manual clearing
3. **Icon Naming Conventions** - Inconsistency between camelCase and kebab-case
4. **Config Propagation Delay** - Template changes require regeneration to reach sites
5. **Component Default Synchronization** - Template config and component defaults must match
6. **Multi-File Coordination** - One change often required updates to 3-5 files

### Key Insights

**On Grid Layouts:**
- CSS Grid is powerful but requires careful planning
- A 6-column grid with col-span-2 achieves better centering than a 3-column with col-start
- Inline styles can bypass Tailwind JIT limitations

**On Content Management:**
- Component defaults and template configs are dual sources of truth
- Changes must propagate: Template → Component → Generated Site
- Hardcoded defaults make rapid iteration difficult

**On Template Systems:**
- The template generates sites, but sites must be regenerated to receive updates
- Cache invalidation is as important as generation
- Component resilience (handling missing/variable data) is crucial

**On Development Velocity:**
- The postcard site proved the template system enables rapid deployment
- StringRay agents (@bug-triage-specialist) helped solve complex layout issues
- Pattern recognition (icon naming, grid strategies) accelerated fixes

---

## Part 8: Closing Thoughts

### The Journey in Numbers

- **Duration:** Multi-session (March 12, 2026)
- **Sites Affected:** 1 primary (credit-repair), 1 new (postcard)
- **Files Modified:** 15+ across template and generated sites
- **Grid Layout Attempts:** 5 iterations to get 3-2-2 working
- **FAQ Update Rounds:** 3 cycles to propagate correctly
- **Icon Naming Conventions:** 2 (camelCase and kebab-case, now both supported)
- **Commits Made:** 3 major commits
- **Lines Changed:** 500+

### Impact Categories

**INFRASTRUCTURE:**
- Grid layout utilities (`grid-layout.ts`) now support 3-2-2 and 2x2 patterns
- Hero image copying pipeline established
- Component resilience patterns established

**CONTENT:**
- Credit-repair FAQs updated and accurate
- SOC 2 references removed where inappropriate
- DifferenceSection added with 3-box layout

**DEVELOPMENT EXPERIENCE:**
- Icon naming conventions standardized (dual support)
- Component defaults made configurable
- Template-site propagation flow clarified

### What This Means for Future Work

**For Credit-Repair:**
- Site now displays services in proper 3-2-2 grid
- Hero image displays correctly
- FAQs are accurate and up-to-date
- Comparison table shows all icons
- DifferenceSection adds professional touch

**For Template System:**
- All future sites inherit grid layout improvements
- Hero images will copy automatically
- Components handle variable content gracefully
- Icon naming is flexible

**For Postalocity:**
- Postcard site ready for conference follow-ups
- Infrastructure supports rapid microsite deployment
- Template system proven for scale

### Final Reflection

This journey wasn't about fixing one site—it was about strengthening the foundation that generates all sites. Each challenge (grid layouts, hero images, content propagation) revealed gaps in the template system. Each solution closed those gaps permanently.

The credit-repair microsite was the catalyst, but the template system was the beneficiary. The work ensures that credit-repair, postcard, and all future microsites will:
- Display grids properly
- Show hero images reliably
- Handle content variations gracefully
- Support rapid iteration

From broken layouts to systematic resilience. From missing images to automated pipelines. From hardcoded content to configurable flexibility. The journey taught: **Invest in the template, and every site benefits.**

---

*"The template is not just a generator—it's a platform. Strengthen the platform, and every site it creates inherits that strength. The credit-repair site was the test case; the template system was the real deliverable."*

---

**Written on 2026-03-12. From grid chaos to layout mastery. From missing images to automated pipelines. From content confusion to systematic precision. The journey taught me: fix the template, fix every site. Build resilience, enable scale. The foundation determines what the house can become.**
