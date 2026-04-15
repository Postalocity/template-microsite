# Odin's Innovations - Complete Asset Inventory

## Common Assets (Template Base)
**Location:** `/common/assets/odins-innovations/`

| File | Size | Description |
|------|------|-------------|
| `logo.png` | 28KB | Brand logo |
| `favicon.ico` | 2KB | Browser favicon |
| `og-image.png` | 124KB | Social sharing image |
| `hero.jpg` | 730KB | Main hero background |
| `hero1.jpg` | 730KB | Alternative hero variant |
| `hero2.jpg` | 407KB | Alternative hero variant |
| `hero-bg.jpg` | 311KB | Background pattern |
| `odins-innovations-hero.jpg` | 730KB | Full brand hero |
| `scent-beads-hero.jpg` | 730KB | Product-specific hero |

---

## Site-Specific Assets

### 1. scent-beads
**Location:** `/sites/odins-innovations/scent-beads/public/`

| File | Description |
|------|-------------|
| `logo.png` | Site logo |
| `favicon.ico` | Site favicon |
| `og-image.png` | OG image |
| `robots.txt` | Search rules |
| `sitemap.xml` | SEO sitemap |
| `images/hero.jpg` | Hero |
| `images/hero1.jpg` | Hero variant |
| `images/hero2.jpg` | Hero variant |
| `images/hero-bg.jpg` | Background |
| `images/odins-innovations-hero.jpg` | Full hero |

### 2. hunting-mosquito-repellent
**Location:** `/sites/odins-innovations/citronella-mosquito-repellent/public/`

| File | Description |
|------|-------------|
| `logo.png` | Site logo |
| `favicon.ico` | Site favicon |
| `og-image.png` | OG image |
| `robots.txt` | Search rules |
| `sitemap.xml` | SEO sitemap |
| `images/hero.jpg` | Hero |
| `images/hero1.jpg` | Hero variant |
| `images/hero2.jpg` | Hero variant |
| `images/hero-bg.jpg` | Background |
| `images/odins-innovations-hero.jpg` | Full hero |

### 3. synthetic-scent-cwd-guide
**Location:** `/sites/odins-innovations/synthetic-scent-cwd-guide/public/`

| File | Description |
|------|-------------|
| `images/cwd-guide-hero.jpg` | Guide-specific hero |
| `images/hero1.jpg` | Hero variant |
| `images/hero2.jpg` | Hero variant |

### 4. doe-estrus-guide
**Location:** `/sites/odins-innovations/doe-estrus-guide/public/`

| File | Description |
|------|-------------|
| `images/doe-estrus-hero.jpg` | Guide-specific hero |
| `images/hero1.jpg` | Hero variant |
| `images/hero2.jpg` | Hero variant |
| `images/hero-bg.jpg` | Background |
| `images/OdinsInnov_Doe_Estrus.jpg` | Special feature image |
| `images/video_frame_*.jpg` | Video frame images (13 images) |

---

## Image Usage Guide

### Hero Images
```json
// Standard hero
"background": {
  "image": "/{slug}/images/hero.jpg",
  "alt": "Description"
}

// Alternative variant
"background": {
  "image": "/{slug}/images/hero1.jpg"
}
```

### OG Images
```json
"ogImage": "/{slug}/og-image.png"
```

### Logos
```json
"logo": "/{slug}/logo.png"
```

---

## Best Practices

1. **Always use site-specific paths** - Don't rely on common assets for sites
2. **Include alt text** - For accessibility and SEO
3. **Optimize images** - Keep hero images under 1MB
4. **Consistent naming** - Use standard names: hero.jpg, hero1.jpg, hero2.jpg, hero-bg.jpg

---

## Adding New Sites

1. Copy images from common to `sites/odins-innovations/{new-site}/public/images/`
2. Reference in config.json with relative path
3. Update this inventory document