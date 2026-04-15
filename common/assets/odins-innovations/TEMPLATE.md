# Odin's Innovations - Template Configuration Guide

## Assets Location
All Odin's Innovations assets are stored in:
- **Common:** `/common/assets/odins-innovations/`
- **Site-specific:** `/sites/odins-innovations/{site-slug}/public/images/`

## Available Images

| Image | Path (common) | Path (site-specific) |
|-------|---------------|---------------------|
| Logo | `/assets/odins-innovations/logo.png` | `{slug}/logo.png` |
| Favicon | `/assets/odins-innovations/favicon.ico` | `{slug}/favicon.ico` |
| OG Image | `/assets/odins-innovations/og-image.png` | `{slug}/og-image.png` |
| Hero | `/assets/odins-innovations/hero.jpg` | `{slug}/images/hero.jpg` |
| Hero 1 | `/assets/odins-innovations/hero1.jpg` | `{slug}/images/hero1.jpg` |
| Hero 2 | `/assets/odins-innovations/hero2.jpg` | `{slug}/images/hero2.jpg` |
| Hero BG | `/assets/odins-innovations/hero-bg.jpg` | `{slug}/images/hero-bg.jpg` |

## Site Config Reference

### scent-beads
```json
{
  "site": { "slug": "scent-beads" },
  "hero": { "image": "/scent-beads/images/hero1.jpg" }
}
```

### hunting-mosquito-repellent (NEW)
```json
{
  "site": { "slug": "hunting-mosquito-repellent" },
  "hero": { "image": "/hunting-mosquito-repellent/images/hero.jpg" }
}
```

## Copying Assets to Sites

```bash
# Copy from common to site public folder
cp /common/assets/odins-innovations/hero.jpg /sites/odins-innovations/{slug}/public/images/
```

## Notes
- Site-specific images take precedence over common assets
- Vite build copies public folder to dist automatically
- Always include alt text for accessibility