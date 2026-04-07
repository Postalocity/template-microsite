# Odin's Innovations Microsite - Content Standardization Design

**Date:** 2026-04-06  
**Goal:** Standardize visual elements (SVGs/images) and eliminate repetitive messaging across all sections

## Current Repetition Problems

### 1. "30+ Days" Overuse
Appears in:
- Hero subheadline
- Benefits section title (30+ Days of Scent)
- Product descriptions
- FAQ answer
- Comparison table ("30+ days continuous release")
- Signature Scents intro

**Problem:** User sees same claim 6+ times before scrolling halfway.

### 2. "Weatherproof/Waterproof" Overuse
Appears in:
- Benefits section (Weatherproof)
- Why Odin's section (rainproof)
- Comparison table ("Unaffected by rain, snow, dew")
- FAQ implicit in multiple answers

### 3. "Legal in all 50 states" Overuse
Appears in:
- Why Odin's section
- Comparison table
- FAQ answer

### 4. "Biodegradable" Overuse
Appears in:
- Benefits section (100% Biodegradable)
- Comparison table ("Biodegradable polymer")
- FAQ answer

---

## Proposed Solution: Message Ownership by Section

Each key claim should be "owned" by ONE primary section. Other sections reference it visually but don't repeat the text.

### Message Ownership Matrix

| Message | Primary Owner | Visual Treatment | Other Sections |
|---------|---------------|------------------|----------------|
| **30+ Days Duration** | Benefits section (icon image) | Large "30+" graphic with clock icon | Products show price only, FAQ answers with different angle |
| **Weatherproof** | Comparison table | Rain/water icon in comparison row | Benefits shows "weatherproof" badge only |
| **Legal 50 States** | Why Odin's section | Shield/checkmark icon | FAQ mentions briefly, others skip |
| **Biodegradable** | Benefits section | Leaf/nature icon | Others skip or use badge only |
| **CWD Safe** | Why Odin's section | Shield icon | FAQ explains what CWD is |

---

## Standardized Visual Library

### Core Icons (SVG)
1. **Duration/Days:** Clock with "30+" text
2. **Weatherproof:** Rain drops with shield
3. **Legal/Shield:** Shield with checkmark
4. **Biodegradable:** Leaf/recycling symbol
5. **CWD Safe:** Shield with "CWD" crossed out
6. **Field Tested:** Target/checkmark
7. **Made in USA:** Flag or ribbon

### Standard Images
1. **30+ Days Badge:** `odinsInnov_lasts_30days.png`
2. **Weatherproof Badge:** `odinsInnov_water_proof.png`
3. **Field Tested Badge:** `odinsInnov_field_tested_deer_lure.png`
4. **Biodegradable Badge:** `odinsInnov_100__biodegradable.png`
5. **Food Scents Category:** `Food_Scents.png`
6. **Rut Scents Category:** `Rut_Scents.png`
7. **Cover Scents Category:** `Cover_Scents.png`

---

## Revised Section Responsibilities

### 1. Hero Section
**Job:** Hook user with emotional promise
- Headline: Product name + key benefit
- Subhead: 1-sentence value prop (NOT "30+ days" - save that for Benefits)
- Video: Dramatic hunting footage
- **Remove:** Specific duration claims, technical details

### 2. Why Odin's Section (NEW POSITION: right after Hero)
**Job:** Explain the "why" - synthetic vs natural
- Headline: "Why Synthetic Beads Outperform Natural Urine"
- 3-4 bullet points max:
  1. Legal everywhere (shield icon)
  2. CWD-safe (shield icon)
  3. Consistent batch-to-batch (consistency icon)
- **Remove:** Duration claims, biodegradability (save for Benefits)

### 3. Products Section
**Job:** Show what to buy
- Featured: Doe Estrus (best seller)
- Grid: Dominant Buck, Scrape Blend
- **Focus:** Product names, prices, images
- **Remove:** Technical descriptions ("30+ day release"), just use "Long-lasting"

### 4. Signature Scent Beads Section
**Job:** Show the 3 categories (Food, Rut, Cover)
- Cards: Category image, name, 1-sentence description, available scents
- **Remove:** Duration claims, pricing (just say "Shop the line")

### 5. Benefits Section (WITH IMAGES)
**Job:** Prove the claims with visual badges
- 4-column grid of badge images:
  1. 30+ Days (icon image)
  2. Weatherproof (icon image)
  3. Field Tested (icon image)
  4. Biodegradable (icon image)
- Each: Image + 3-4 word label
- **This is the ONLY section that explicitly states "30+ days"**

### 6. Comparison Table
**Job:** Side-by-side vs natural urine
- Table rows with icons:
  - Duration: Just show comparison ("30+ days" vs "Rapid degradation")
  - Weather: Icon comparison
  - Legal: Icon comparison
  - CWD: Icon comparison
- **Visual treatment:** Icons replace text where possible

### 7. How It Works
**Job:** Explain the mechanism
- 4 steps with icons:
  1. Deploy (bead icon)
  2. Release (molecule/arrows icon)
  3. Weatherproof (shield/rain icon)
  4. Results (target/deer icon)
- **Remove:** Duration mentions in step descriptions

### 8. FAQ
**Job:** Answer objections
- Questions focus on HOW and WHY, not repeating benefits
- Examples:
  - "What makes synthetic different?" → CWD/consistent
  - "How do I deploy beads?" → Application method
  - "When should I use it?" → Timing/strategy
- **Remove:** "How long does it last?" (already in Benefits visually)

---

## Content Reduction Summary

**Removing these repetitive phrases:**
- ❌ "30+ days continuous release" (keep only in Benefits with image)
- ❌ "Weatherproof/Rainproof" in text (use icon only)
- ❌ "Legal in all 50 states" in text (use shield icon)
- ❌ "Biodegradable" in text (use leaf icon)

**Result:** Each section has 1-2 key messages maximum. Visual badges do the heavy lifting.

---

## Implementation Plan

1. **Update BenefitsSection** - Use 4 image badges in grid layout
2. **Update WhyOdinsSection** - Reduce to 3 bullet points with icons
3. **Update ProductsSection** - Remove "30+ day" from descriptions
4. **Update SignatureScentBeadsSection** - Remove duration from intro
5. **Update FAQ** - Remove duration question, focus on application/timing
6. **Create Icon Components** - Standard SVG set for reuse

## Acceptance Criteria

- [ ] Benefits section shows 4 badge images (30+ days, weatherproof, field tested, biodegradable)
- [ ] No section repeats "30+ days" text except Benefits
- [ ] Icons used consistently across sections
- [ ] Each section has maximum 2 text claims
- [ ] Visual hierarchy: Images > Icons > Text
