# Odin's Innovations - Icon & Indicator Catalog

## 🖼️ BENEFIT ICONS (PNG Images)
*For BenefitsSection with images - downloaded from Shopify*

| Filename | Source URL | Description |
|----------|------------|-------------|
| `benefit-30days.png` | cdn.shopify.com/...odinsInnov_lasts_30days.png | 30+ Days of Scent |
| `benefit-weatherproof.png` | cdn.shopify.com/...odinsInnov_water_proof.png | Weatherproof / Rainproof |
| `benefit-field-tested.png` | cdn.shopify.com/...odinsInnov_field_tested_deer_lure.png | Field Tested |
| `benefit-biodegradable.png` | cdn.shopify.com/...odinsInnov_100__biodegradable.png | 100% Biodegradable |

**Usage in config:**
```json
"benefits": {
  "items": [
    { "image": "/images/benefit-30days.png", "title": "30+ Days", "description": "..." },
    { "image": "/images/benefit-weatherproof.png", "title": "Weatherproof", "description": "..." },
    { "image": "/images/benefit-field-tested.png", "title": "Field Tested", "description": "..." },
    { "image": "/images/benefit-biodegradable.png", "title": "100% Biodegradable", "description": "..." }
  ]
}
```

---

## 🎨 SVG ICONS (Code-based)
*For DifferenceSection - use these icon names*

| Icon Name | SVG Component | Usage |
|-----------|---------------|-------|
| `shield` | `OdinsIconShield` | Protection, EPA, Safety |
| `flag` | `OdinsIconFlag` | USA, Made in USA, Legal |
| `ribbon` | `OdinsIconRibbon` | Awards, Quality, Tested |
| `stopwatch` | `OdinsIconStopwatch` | Duration, Time, Long-lasting |
| `leaf` | `OdinsIconLeaf` | Biodegradable, Natural |
| `cloud` | `OdinsIconCloud` | Weather, Rainproof |
| `check-circle` | `OdinsIconCheck` | Verified, Complete |
| `clock` | `OdinsIconClock` | Timer, Duration |
| `water` | `OdinsIconWater` | Rainproof, Wet conditions |
| `test-tube` | `OdinsIconTestTube` | Lab tested, Scientific |
| `recycle` | `OdinsIconRecycle` | Biodegradable, Eco |
| `map-pin` | `OdinsIconMapPin` | Location, Legal in states |
| `star` | `OdinsIconStar` | Rating, Quality |
| `calendar` | `OdinsIconCalendar` | Duration, 30 days |
| `temperature` | `OdinsIconTemperature` | Weather resistant |
| `deer` | `OdinsIconDeer` | Hunting, Game |
| `bug` | `OdinsIconBug` | Mosquito, Insects |
| `droplet` | `OdinsIconDroplet` | Liquid, Spray |
| `tree` | `OdinsIconTree` | Foliage, Application |
| `eye` | `OdinsIconEye` | Detection |

**Usage in config:**
```json
"differences": [
  { "icon": "shield", "title": "EPA-Registered", "description": "..." },
  { "icon": "flag", "title": "Made in USA", "description": "..." },
  { "icon": "stopwatch", "title": "30+ Days", "description": "..." }
]
```

---

## 📋 WHEN TO USE WHICH

| Scenario | Use |
|----------|-----|
| Benefits section with images | PNG files: `benefit-*.png` |
| Difference section cards | SVG icons: `icon: "shield"` |
| Hero badge | PNG/SVG as needed |
| Trust badges | SVG icons |

---

## 🔄 STANDARD ORDER FOR BENEFITS

Use this consistent order:
1. **Duration** → `benefit-30days.png` / `stopwatch` icon
2. **Weather** → `benefit-weatherproof.png` / `cloud` icon  
3. **Testing** → `benefit-field-tested.png` / `test-tube` icon
4. **Eco** → `benefit-biodegradable.png` / `leaf` icon
5. **Legal** → `flag` icon

---

## 📍 Locations

- **PNG Benefit Icons:** `/common/assets/odins-innovations/benefit-*.png`
- **SVG Icons (code):** `/common/themes/odins-innovations/components/shared/DifferenceSection.tsx`
- **Catalog:** `/common/assets/odins-innovations/ICON_CATALOG.md`