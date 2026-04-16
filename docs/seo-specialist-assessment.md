# SEO Specialist Assessment
## Carbonless Forms Microsite - Broadstroke, Inc.

---

### Site Overview

| Attribute | Value |
|-----------|-------|
| **URL** | https://broadstrokeinc.com/carbonless-forms |
| **Target Keywords** | carbonless forms, NCR forms, 2-part forms, 3-part forms, 4-part forms, multipart forms |
| **Industry** | Commercial Printing / Business Forms |
| **Build Status** | ✅ Production ready |

---

### Current SEO Configuration

**Meta Tags (from config.json):**
- Title: "Custom Carbonless Forms | NCR 2-Part, 3-Part, 4-Part Printing - Broadstroke"
- Description: "Nationwide custom carbonless forms printing. 2, 3, and 4-part NCR forms with sequential numbering, variable data, and fast turnaround. Free estimates."
- Canonical: https://broadstrokeinc.com/carbonless-forms
- Keywords: custom carbonless forms, NCR forms, carbonless forms printing, 2/3/4 part carbonless forms, multipart forms, NCR printing, sequential numbering, business forms

**Open Graph:**
- og:title: "Custom Carbonless Forms | NCR Printing - Broadstroke"
- og:description: "Custom 2, 3, and 4-part carbonless forms with precision printing and finishing. Get a free estimate."
- og:image: /carbonless-forms/images/og-image.png
- og:url: https://broadstrokeinc.com/carbonless-forms
- Twitter: summary_large_image

---

### Technical Audit Checklist

**✅ Implemented:**
- [x] Semantic HTML structure (React components)
- [x] H1 in hero section ("Custom Carbonless Forms")
- [x] Proper heading hierarchy (H2 in sections, H3 in cards)
- [x] Alt text on images (via lucide-react icons, service images have descriptive context)
- [x] Internal links (navigation anchors, CTAs to main site)
- [x] Mobile responsive (Tailwind responsive classes)
- [x] Fast loading (static build, minimal JS)
- [x] HTTPS (main domain)
- [x] Canonical tags

**⚠️ Action Items:**
- [ ] Add JSON-LD schema (Organization, Service, FAQPage, BreadcrumbList)
- [ ] Create sitemap.xml for /carbonless-forms
- [ ] Add robots.txt entry if not on main site
- [ ] Generate og-image.png (currently referenced but file may not exist)
- [ ] Add structured data for FAQ (Google Rich Results compatible)

---

### Template Layer Confirmation

The base template (`scripts/generate-site.ts`) automatically includes:

✅ **JSON-LD Schema (already implemented in template):**
- WebSite schema
- BreadcrumbList schema
- Organization schema (with address, phone, email)
- LocalBusiness schema (with hours, priceRange, areaServed)
- Product/Service schema
- **FAQPage schema** - automatically generated from config content

✅ **Sitemap (already implemented in template):**
- sitemap.xml auto-generated and written to public folder
- Referenced in HTML via `<link rel="sitemap">`
- Referenced in robots.txt

✅ **Robots.txt (already implemented in template):**
- Auto-generated with Allow: /
- Includes AI crawler permissions (GPTBot, ChatGPT-User, claude-ai, PerplexityBot)
- References sitemap.xml

✅ **og-image.png (already implemented in template):**
- Generated from hero banner during build
- Written to public/og-image.png

**Important:** The carbonless-forms site was built as a standalone microsite (not via the main generator), so these features were not automatically applied. To get full SEO benefits, regenerate the site using:

```bash
npm run generate -- --brand broadstroke --service carbonless-forms
```

This will place the site in `dist/` with all SEO infrastructure included.

---

### Schema Markup Recommendations

**1. Organization Schema (add to index.html):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Broadstroke, Inc.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "820 W 2nd St N",
    "addressLocality": "Wichita",
    "addressRegion": "KS",
    "postalCode": "67203"
  },
  "telephone": "316-262-3333",
  "email": "orders@broadstrokeinc.com",
  "url": "https://broadstrokeinc.com"
}
```

**2. Service Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Custom Carbonless Forms Printing",
  "description": "2, 3, and 4-part NCR carbonless forms with sequential numbering and finishing services",
  "provider": {
    "@type": "Organization",
    "name": "Broadstroke, Inc."
  },
  "areaServed": "United States",
  "priceRange": "$$"
}
```

**3. FAQPage Schema (from config.json FAQs):**
- 6 FAQs already in content - need JSON-LD wrapper for Google rich results
- Topics: 2/3/4-part differences, how carbonless works, sequential numbering, finishing options, production time, mailing integration

---

### Keyword Opportunities

**Primary Keywords (already targeted):**
- carbonless forms ✅
- NCR forms ✅
- 2-part carbonless forms ✅
- 3-part carbonless forms ✅
- 4-part carbonless forms ✅

**Secondary Opportunities:**
- "carbonless invoice printing"
- "NCR form printer"
- "multipart business forms"
- "carbonless receipt forms"
- "custom form printing service"

**Long-tail Opportunities:**
- "carbonless forms with sequential numbering"
- "NCR forms with variable data printing"
- "2-part carbonless invoices wholesale"

---

### Content Quality Assessment

**Strengths:**
- Clear value proposition in hero
- 6 benefit items with detailed descriptions
- 4 service types with images
- 6 comprehensive FAQs
- Comparison table highlighting differentiation
- 3-step "How It Works" process

**Improvements:**
- Add blog post links for "carbonless forms" topic cluster
- Consider adding case studies or testimonials as separate pages
- Add "Before/After" form examples
- Include specific turnaround times (currently says "7-10 business days")

---

### Recommendations Summary

**Template-Handled (when regenerated via generator):**
- ✅ JSON-LD schemas (all types auto-generated)
- ✅ Sitemap.xml (auto-generated during build)
- ✅ robots.txt (auto-generated during build)
- ✅ og-image.png (auto-generated from hero)
- ✅ FAQPage schema (auto-generated from config)

**Current Site Status:**
The standalone carbonless-forms microsite does NOT have these features. To get full SEO benefits, regenerate via the main template.

**Site-Specific Recommendations:**
1. **Action Required:** Regenerate site using template generator for full SEO
2. **Low Priority:** Add more long-tail content pages (blog posts)

---

### Resources for SEO Specialist

**Build Output Location:**
```
/Users/henrytafolla/dev/template-microsite/sites/broadstroke/carbonless-forms/dist/
```

**Key Files:**
- dist/index.html - Main HTML (add schemas here)
- config.json - All content/SEO config
- public/images/ - Image assets

**Contact:** orders@broadstrokeinc.com | 316-262-3333

---

*Generated for SEO specialist review - April 14, 2026*