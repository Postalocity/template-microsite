# Odin's Innovations - Asset Inventory

## Location
`/common/assets/odins-innovations/`

## Available Assets

| File | Description | Usage |
|------|-------------|-------|
| `logo.png` | Brand logo | Navigation, footer |
| `favicon.ico` | Site favicon | Browser tab |
| `hero.jpg` | Main hero background | Hero section |
| `hero1.jpg` | Alternative hero | Hero section (variant) |
| `hero2.jpg` | Alternative hero | Hero section (variant) |
| `hero-bg.jpg` | Background pattern | Section backgrounds |
| `odins-innovations-hero.jpg` | Brand hero | Full-width hero |
| `og-image.png` | Social sharing image | Open Graph / Facebook |
| `scent-beads-hero.jpg` | Product hero | Scent beads specific |

## Usage in Sites

### For scent-beads site:
```json
"background": {
  "image": "/scent-beads/images/hero1.jpg"
}
```

### For hunting-mosquito-repellent site:
```json
"background": {
  "image": "/hunting-mosquito-repellent/images/hero.jpg"
}
```

## Notes

- All images should be served from the site's public folder
- Hero images are ~730KB each - consider lazy loading for performance
- OG image is 124KB - optimized for social sharing
- hero-bg.jpg is 311KB - used for pattern backgrounds

## Adding New Images

1. Add images to site-specific `/public/images/` folder
2. Reference in config.json with relative path
3. Copy to common assets if reusable across sites