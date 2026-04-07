# Odin's Innovations - Complete Icon & Image Mapping Table

**Date:** 2026-04-06  
**Purpose:** Consolidate all icons, emojis, and images used across the microsite into a standardized Odin's brand system

---

## 1. LUCIDE ICON MAPPINGS (Replace with Odin's SVGs)

| Current Lucide Icon | Used In | Purpose | Odin's Replacement | Status |
|---------------------|---------|---------|-------------------|--------|
| **Star** | ProductsSection | Best seller badge | 🏆 Trophy/Star SVG | ⚠️ Needs custom SVG |
| **ArrowRight** | ProductsSection, SignatureScentBeadsSection, HowToUseSection | CTA arrows | ➤ Custom arrow SVG | ⚠️ Keep Lucide (functional) |
| **Menu** | SiteNavigation | Mobile menu | ☰ Hamburger SVG | ⚠️ Keep Lucide (functional) |
| **X** | SiteNavigation | Close menu | ✕ Close SVG | ⚠️ Keep Lucide (functional) |
| **ChevronDown** | SiteNavigation | Dropdown indicator | ▼ Chevron SVG | ⚠️ Keep Lucide (functional) |
| **Plus** | FAQSection | Expand question | + Plus SVG | ⚠️ Keep Lucide (functional) |
| **Minus** | FAQSection | Collapse question | − Minus SVG | ⚠️ Keep Lucide (functional) |
| **HelpCircle** | FAQSection | Help indicator | ? Circle SVG | ⚠️ Keep Lucide (functional) |
| **Check** | ComparisonTable | Odin's column | ✓ Check SVG (tcwi-check) | ✅ Use OdinsIconCheckCircle |
| **X** | ComparisonTable | Natural urine column | ✗ X SVG | ⚠️ Keep Lucide (functional) |
| **Trophy** | ComparisonTable | Winner badge | 🏆 Trophy SVG | ⚠️ Optional - can use image |
| **Beaker** | HowToUseSection, HowItWorksSection | Science/lab | 🧪 Beaker SVG | ⚠️ Keep Lucide or custom |
| **Droplets** | HowToUseSection, TrustBarSection | Liquid/oil | 💧 Droplet SVG | ⚠️ Keep Lucide or custom |
| **MapPin** | HowToUseSection, TrustBarSection | Location | 📍 Pin SVG | ⚠️ Keep Lucide (functional) |
| **Mail** | SiteFooter | Email contact | ✉️ Envelope SVG | ⚠️ Keep Lucide (functional) |
| **Phone** | SiteFooter | Phone contact | 📞 Phone SVG | ⚠️ Keep Lucide (functional) |
| **Instagram** | SiteFooter | Social link | 📷 Instagram SVG | ⚠️ Keep Lucide (brand) |
| **FileCheck** | HowItWorksSection | Certification | 📄 Check SVG | ⚠️ Use OdinsIconCheckCircle |
| **Microscope** | HowItWorksSection | Lab testing | 🔬 Microscope SVG | ⚠️ Keep Lucide or custom |
| **Award** | WhyOdinsSection, ServicesSection | Quality | 🎖️ Ribbon SVG (tcwi-ribbon) | ✅ Use OdinsIconRibbon |
| **Leaf** | WhyOdinsSection | Biodegradable | 🍃 Leaf SVG | ✅ Use OdinsIconLeaf |
| **Shield** | WhyOdinsSection, ServicesSection, TrustBarSection | Protection | 🛡️ Shield SVG | ✅ Use OdinsIconShield |
| **Clock** | WhyOdinsSection, TrustBarSection | Duration | ⏱️ Stopwatch SVG (tcwi-stopwatch) | ✅ Use OdinsIconStopwatch |
| **Zap** | WhyOdinsSection | Fast/energy | ⚡ Bolt SVG | ⚠️ Keep Lucide or remove |
| **Recycle** | WhyOdinsSection | Biodegradable | ♻️ Recycle SVG | ✅ Use OdinsIconLeaf |
| **Heart** | ServicesSection | Care/quality | ❤️ Heart SVG | ⚠️ Use image instead |
| **Crown** | ServicesSection | Premium | 👑 Crown SVG | ⚠️ Use image instead |
| **Layers** | ServicesSection | Multi-layer | 📚 Layers SVG | ⚠️ Use image instead |
| **Nut** | ServicesSection | Food/Acorn | 🌰 Acorn image | ✅ Use Food_Scents.png |
| **Apple** | ServicesSection | Food/Apple | 🍎 Apple image | ✅ Use Food_Scents.png |
| **MapPin** | TrustBarSection | Location | 📍 Pin SVG | ⚠️ Keep Lucide (functional) |

---

## 2. EMOJI MAPPINGS (Replace with SVGs)

| Emoji | Used In | Purpose | Odin's Replacement | Status |
|-------|---------|---------|-------------------|--------|
| **❄** (Snowflake) | HowItWorksSection | Step 2 icon | ❄️ Snowflake SVG or Weather icon | ⚠️ Use OdinsIconCloud |
| **⟳** (Recycle) | HowItWorksSection | Step 3 icon | ♻️ Recycle SVG | ✅ Use OdinsIconLeaf |

---

## 3. SHOPIFY TEXT-WITH-ICONS (Keep - Already Odin's Style)

| Icon Name | SVG File | Used In | Purpose | Status |
|-----------|----------|---------|---------|--------|
| **tcwi-ribbon** | Inline SVG | BenefitsSection | Made in USA | ✅ KEEP - Odin's style |
| **tcwi-package** | Inline SVG | BenefitsSection, TrustBadgesSection | Weatherproof/Hassle-free | ✅ KEEP - Odin's style |
| **tcwi-stopwatch** | Inline SVG | BenefitsSection, TrustBadgesSection | 30+ Days | ✅ KEEP - Odin's style |

---

## 4. O'DIN'S BRAND SVG ICONS (Standardized Set)

### Core Icon Components

```typescript
// Standard Odin's SVG Icons (stroke-based, no fill)
const OdinsIconRibbon = () => ( /* tcwi-ribbon style */ );      // Made in USA, Award
const OdinsIconPackage = () => ( /* tcwi-package style */ );    // Weatherproof, Shipping
const OdinsIconStopwatch = () => ( /* tcwi-stopwatch style */ ); // 30+ Days, Duration
const OdinsIconShield = () => ( /* shield style */ );           // Legal, Protection, CWD-safe
const OdinsIconCheckCircle = () => ( /* check-circle style */ );  // Verified, Field Tested
const OdinsIconLeaf = () => ( /* leaf style */ );               // Biodegradable, Eco
const OdinsIconCloud = () => ( /* cloud style */ );             // Weatherproof, Rain
const OdinsIconClock = () => ( /* clock style */ );             // Duration, Time
```

### Icon Usage Matrix

| Icon Component | Benefits | TrustBadges | Difference | Why Odin's | How It Works | Services |
|----------------|----------|-------------|------------|------------|--------------|----------|
| **OdinsIconRibbon** | ✅ Made in USA | ✅ Made in USA | - | ✅ Award | - | - |
| **OdinsIconPackage** | ✅ Weatherproof | ✅ Weatherproof | - | - | - | - |
| **OdinsIconStopwatch** | ✅ 30+ Days | ✅ 30+ Day Scent | - | - | - | - |
| **OdinsIconShield** | - | ✅ 50 State Legal | ✅ Legal | ✅ CWD-safe | - | ✅ Protection |
| **OdinsIconCheckCircle** | ✅ Field Tested | ✅ Field Tested | - | - | - | - |
| **OdinsIconLeaf** | ✅ Biodegradable | - | ✅ Biodegradable | ✅ Eco | ✅ Step 3 | - |
| **OdinsIconCloud** | - | - | - | - | ✅ Step 2 (weather) | - |
| **OdinsIconClock** | - | - | ✅ 30+ Days | - | - | - |

---

## 5. O'DIN'S BRAND IMAGES (Photography/Graphics)

| Image Name | URL | Used In | Purpose | Dimensions | Status |
|------------|-----|---------|---------|------------|--------|
| **Headshot_logo.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Headshot_logo.png` | SiteNavigation | Logo | 180x180 | ✅ Active |
| **OdinsInnov_Doe_Estrus.jpg** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/OdinsInnov_Doe_Estrus.jpg` | HeroSection | Background | Full width | ✅ Active |
| **Food_Scents.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Food_Scents.png` | SignatureScentBeadsSection | Food category | 4:3 aspect | ✅ Active |
| **Rut_Scents.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png` | SignatureScentBeadsSection | Rut category | 4:3 aspect | ✅ Active |
| **Cover_Scents.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Cover_Scents.png` | SignatureScentBeadsSection | Cover category | 4:3 aspect | ✅ Active |
| **odinsInnov_lasts_30days.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_lasts_30days.png` | BenefitsSection | 30+ Days badge | 128x128 | ✅ Active |
| **odinsInnov_water_proof.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png` | BenefitsSection | Weatherproof badge | 128x128 | ✅ Active |
| **odinsInnov_field_tested_deer_lure.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_field_tested_deer_lure.png` | BenefitsSection | Field Tested badge | 128x128 | ✅ Active |
| **odinsInnov_100__biodegradable.png** | `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png` | BenefitsSection | Biodegradable badge | 128x128 | ✅ Active |
| **DoeEstrous_bottle.png** | `https://www.odinsinnovations.com/cdn/shop/products/OdinsInnov_Package_2021_3oz_Bottle_DoeEstrous_...` | ProductsSection | Featured product | Square | ✅ Active |
| **DominantBuck_bottle.png** | `https://www.odinsinnovations.com/cdn/shop/products/OdinsInnov_Package_2021_3oz_Bottle_DominantBuck_...` | ProductsSection | Product 2 | Square | ✅ Active |
| **ScrapeBlend_bottle.png** | `https://www.odinsinnovations.com/cdn/shop/products/OdinsInnov_Package_2021_3oz_Bottle_ScrapeBlend_...` | ProductsSection | Product 3 | Square | ✅ Active |

---

## 6. COMPONENT-SPECIFIC MAPPINGS

### BenefitsSection (images with text)
| Position | Image | Title | Icon Type |
|----------|-------|-------|-----------|
| 1 | odinsInnov_lasts_30days.png | 30+ Days of Scent | Image (not SVG) |
| 2 | odinsInnov_water_proof.png | Weatherproof | Image (not SVG) |
| 3 | odinsInnov_field_tested_deer_lure.png | Field Tested | Image (not SVG) |
| 4 | odinsInnov_100__biodegradable.png | 100% Biodegradable | Image (not SVG) |

### TrustBadgesSection (small badges)
| Position | Badge Name | Odin's Icon | Style |
|----------|------------|-------------|-------|
| 1 | Made in USA | OdinsIconRibbon | tcwi-ribbon style |
| 2 | 50 State Legal | OdinsIconShield | Shield style |
| 3 | 30+ Day Scent | OdinsIconStopwatch | tcwi-stopwatch style |
| 4 | Weatherproof | OdinsIconPackage | tcwi-package style |

### DifferenceSection (large cards)
| Position | Title | Odin's Icon | Style |
|----------|-------|-------------|-------|
| 1 | Legal in All 50 States | OdinsIconShield | Shield, w-8 h-8 |
| 2 | 30+ Days of Attraction | OdinsIconClock | Clock, w-8 h-8 |
| 3 | Biodegradable & Safe | OdinsIconLeaf | Leaf, w-8 h-8 |

### WhyOdinsSection (feature list)
| Position | Feature | Current | Should Be |
|----------|---------|---------|-----------|
| 1 | Legal | Shield Lucide | OdinsIconShield |
| 2 | Duration | Clock Lucide | OdinsIconStopwatch |
| 3 | CWD-Safe | Shield Lucide | OdinsIconShield |
| 4 | Biodegradable | Leaf Lucide | OdinsIconLeaf |

---

## 7. RECOMMENDED ACTIONS

### Immediate (High Priority)
1. **Replace ServicesSection Lucide icons** with product images (Food_Scents.png, etc.)
2. **Replace WhyOdinsSection Lucide icons** with Odin's SVGs
3. **Remove emoji usage** in HowItWorksSection (❄ ⟳) → use OdinsIconCloud and OdinsIconLeaf

### Medium Priority
4. **Standardize all functional icons** (Menu, X, Plus, Arrow) to use consistent stroke width
5. **Create missing custom SVGs** for Star (Best Seller) and Trophy (Winner)

### Low Priority
6. **Document icon sizing standards**: Badges (w-4 h-4), Cards (w-8 h-8), Hero (w-12 h-12)
7. **Create icon style guide** for future components

---

## 8. ICON STANDARDS DOCUMENT

### Size Standards
| Context | Size | Example |
|---------|------|---------|
| **Badges/Tags** | w-4 h-4 (16px) | TrustBadgesSection |
| **Cards/Features** | w-8 h-8 (32px) | DifferenceSection |
| **Hero/CTA** | w-12 h-12 (48px) | HeroSection (if needed) |

### Style Standards
```css
/* All Odin's SVGs should use: */
fill: none;
stroke: currentColor;
stroke-width: 2; /* or 2.5 for badges */
stroke-linecap: round;
stroke-linejoin: round;
viewBox: "0 0 100 100";
```

### Color Standards
| Context | Color Variable | Hex |
|---------|---------------|-----|
| Dark background | white | #FFFFFF |
| Light background | hsl(var(--primary)) | Brand primary |
| Accent/CTA | hsl(var(--secondary)) | Brand secondary |

---

## Summary Table: What to Use Where

| Section | Use Images | Use Odin's SVGs | Use Lucide |
|---------|------------|-----------------|------------|
| **BenefitsSection** | ✅ 4 badge images | ❌ | ❌ |
| **TrustBadgesSection** | ❌ | ✅ 4 icons | ❌ |
| **DifferenceSection** | ❌ | ✅ 3 icons | ❌ |
| **WhyOdinsSection** | ❌ | ✅ 4 icons | ❌ Currently |
| **ProductsSection** | ✅ Product photos | ❌ | ✅ ArrowRight, Star |
| **SignatureScentBeadsSection** | ✅ 3 category images | ❌ | ✅ ArrowRight |
| **HowItWorksSection** | ❌ | ✅ 2 icons | ✅ Beaker |
| **ServicesSection** | ✅ Category images | ❌ | ❌ Currently |
| **FAQSection** | ❌ | ❌ | ✅ Plus, Minus |
| **ComparisonTable** | ❌ | ✅ Check/X | ❌ |
| **SiteNavigation** | ✅ Logo | ❌ | ✅ Menu, X |
| **SiteFooter** | ❌ | ❌ | ✅ Social icons |
