# Odin's Innovations - Icon Mapping & Usage Guide

## Brand Icon Assets

All custom SVG icons are stored in `common/assets/odins-innovations/` with both light and dark variants.

### Available Icons

| Icon | Light Version | Dark Version | Usage |
|------|--------------|--------------|-------|
| **50 States** | `icon-50-states.svg` | `icon-50-states-white.svg` | Legal/USA |
| **30+ Days** | `icon-long-lasting.svg` | `icon-long-lasting-white.svg` | Duration/Time |
| **Chemistry** | `icon-chemistry.svg` | `icon-chemistry-white.svg` | Molecules/Skin |

### Icon Specifications

**50 States Flag Icon:**
- ViewBox: `0 0 100 100`
- Light: `stroke="currentColor"` (inherits text color)
- Dark: `stroke="white"` (white on dark bg)
- Stroke width: 2px
- Features: Flag outline, stripes, stars in canton

**30+ Days Clock Icon:**
- ViewBox: `0 0 100 100`
- Light: `stroke="currentColor"`
- Dark: `stroke="white"`
- Stroke width: 3px (thicker for visibility)
- Features: Clock face, hands, decorative marks

**Chemistry Molecule Icon:**
- ViewBox: `0 0 100 100`
- Light: `stroke="currentColor"`
- Dark: `stroke="white"`
- Stroke width: 2px
- Features: 3 connected circles (molecule structure)

## Lucide Icon Usage

Standard Lucide icons should use `strokeWidth={1.5}` for elegant, refined appearance:

```javascript
import { Bug, Leaf, Clock, ShieldCheck, Droplets, Wind, Thermometer, CheckCircle, Cloud, Package } from 'lucide-react';

// Light background - dark color
<Bug className="w-8 h-8" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
<Leaf className="w-8 h-8" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />
<Clock className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />

// Dark background - light color  
<Droplets className="w-10 h-10 text-green-400" strokeWidth={1.5} />
<Wind className="w-10 h-10 text-green-400" strokeWidth={1.5} />
<Package className="w-10 h-10 text-green-400" strokeWidth={1.5} />
```

## Color Guidelines

| Background Type | Icon Color | Text Color | Example |
|----------------|-----------|-----------|---------|
| Light (#f8f9fa) | #2d5a3d (green) | #1a1a1a (dark) | Introduction |
| Dark (#1a1d29) | #4ade80 (green-400) or white | #ffffff | Why Odin's |
| White (#fff) | #2d5a3d | #1a1a1a | Detection |
| Dark (#242835) | white | #ffffff | Application |

## Icon Sizes

- **Small icons**: `w-8 h-8` (32px) - Used in 4-column grids
- **Medium icons**: `w-10 h-10` (40px) - Used in 3-column grids
- **Large icons**: `w-12 h-12` (48px) - Brand SVGs

## Section Background Alternation

All Odin's sites should alternate backgrounds for visual flow:

1. Hero → Full image
2. Section 1 → Light (#f8f9fa)
3. Section 2 → Dark (#1a1d29)
4. Section 3 → Light (#fff)
5. Section 4 → Dark (#242835)
6. Section 5 → Light (#f5f5f5)
7. Section 6 → Dark (#1e212b)
8. Trust Badges → Light (#f8f9fa)
9. FAQ → Light/accordion
10. CTA → Brand color (#2d5a3d)

## Brand Config Reference

```javascript
icons: {
  lucide: {
    bug: { component: 'Bug', color: '#2d5a3d', strokeWidth: 1.5 },
    leaf: { component: 'Leaf', color: '#2d5a3d', strokeWidth: 1.5 },
    clock: { component: 'Clock', color: '#2d5a3d', strokeWidth: 1.5 },
    'shield-check': { component: 'ShieldCheck', color: '#2d5a3d', strokeWidth: 1.5 },
    droplets: { component: 'Droplets', color: '#4ade80', strokeWidth: 1.5 },
    wind: { component: 'Wind', color: '#2d5a3d', strokeWidth: 1.5 },
    thermometer: { component: 'Thermometer', color: '#2d5a3d', strokeWidth: 1.5 },
    'check-circle': { component: 'CheckCircle', color: '#2d5a3d', strokeWidth: 1.5 },
    cloud: { component: 'Cloud', color: '#2d5a3d', strokeWidth: 1.5 },
    package: { component: 'Package', color: '#4ade80', strokeWidth: 1.5 },
  },
  brand: {
    '50-states': { light: '/icon-50-states.svg', dark: '/icon-50-states-white.svg' },
    '30-days': { light: '/icon-long-lasting.svg', dark: '/icon-long-lasting-white.svg' },
    chemistry: { light: '/icon-chemistry.svg', dark: '/icon-chemistry-white.svg' }
  }
}
```

## SVG Path Data

All brand icons use consistent path data for uniformity across sites. The icons are designed at 100x100 viewBox for easy scaling.