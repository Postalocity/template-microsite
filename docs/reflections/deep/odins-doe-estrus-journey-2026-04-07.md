---
story_type: journey
emotional_arc: "confidence → confusion → frustration → clarity → confidence"
codex_terms: [18, 22, 35, 41, 56]
session_date: 2026-04-07
---

# The Doe Estrus Odyssey: Building a Microsite Template That Actually Works

## Part I: The Illusion of Simplicity

It started with what seemed like a straightforward request: deploy the Odin's Innovations Doe Estrus microsite to Shopify. Just upload some files, update a template, done. Right?

I'd built the template system with what I thought was a solid architecture: brand-level configuration in `config/brands/`, site-level overrides in `sites/{brand}/{site}/config.json`, and a component library that pulled from a `BrandContext`. Clean separation of concerns. Multi-brand support. All the buzzwords.

What I didn't realize was that I'd created a system where the pieces *looked* connected but weren't actually talking to each other. The `brand.json` had a logo URL. The `SiteNavigation` component was supposed to use it. But when I deployed, the logo didn't show up. Instead, I saw this in the browser:

```html
<img src="/doe-estrus-guide/logo.png" alt="Odin's Innovations">
```

That local path fallback. The one that only works in development. The one that doesn't exist in production. I'd seen it before, but I'd never really understood *why* it was happening until now.

## Part II: The Hardcoded Truth

The detective work began. I checked `brand.json` - the URL was there: `https://cdn.shopify.com/s/files/1/0555/8049/1971/files/logo_f2bf23b3-0442-4946-90cd-51755447e2d8.png`. I checked `SiteNavigation.tsx` - it was calling `ctx.brand.logo.url`. The context was being provided by `BrandProvider`. So why was it undefined?

Then I opened `main.tsx`.

There it was, staring back at me in plain sight: a hardcoded `brandConfig` object with over 3,000 characters of inline JSON. And in that object:

```javascript
"logo": {
  "filename": "odins-logo.png",
  "alt": "Odin's Innovations - Synthetic Scent Beads"
}
```

No `url` field. No `faviconUrl`. Just the old structure that predated my recent brand-level updates.

The `BrandProvider` wasn't reading from `brand.json`. It was reading from this hardcoded blob. I'd been maintaining two sources of truth - the clean JSON config files, and this invisible inline configuration that actually mattered.

When I saw it, I felt that familiar mix of embarrassment and relief. Embarrassment that I'd missed something so obvious. Relief that the fix was simple: add the URL fields to the hardcoded config. But also... concern. How many other sites had this same issue? How many were falling back to local paths that didn't exist?

## Part III: The Font That Doesn't Exist

With the logo working, I turned to the next issue: the text looked "scrunched." The user described it perfectly - like someone had squeezed the letters together. I'd recently changed the font from Agency FB to Oswald, so I thought the problem was solved. But looking at the deployed site, something was still wrong.

The breakthrough came when I actually examined the deployed page source. There, in the head of the Shopify template, was an inline style block I'd never written:

```css
h1,h2,h3{letter-spacing:-2px}
```

The Impulse theme. Of course. Shopify themes inject their own styles, and this one was aggressively setting negative letter-spacing on all headings. My Oswald font was loading correctly, but then getting visually crushed by the theme's CSS.

I realized I'd made an architectural mistake: I'd assumed our CSS would live in isolation. But when you inject a React app into a Shopify page template, you're not in a clean room. You're in someone else's house, and they've painted the walls a color you didn't choose.

The fix required `!important` - something I usually avoid like the plague. But here, it was the only way to override the theme's aggressive specificity:

```css
h1, h2, h3, .font-display {
  font-family: var(--font-display) !important;
  letter-spacing: 0.02em !important;
}
```

I also added `#root` scoped overrides to ensure our microsite's container took precedence over theme styles. It wasn't elegant, but it worked.

## Part IV: The Agency FB Fiction

This part still makes me shake my head. The original template used "Agency FB" as the display font. I'd seen it in the CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Agency+FB:wght@400;700&family=Montserrat...');
```

It wasn't until the user mentioned text issues that I actually thought about it: Agency FB is a Windows system font. It's not on Google Fonts. Never has been. That import was loading... nothing. Or rather, it was loading and failing silently, falling back to Arial Narrow, which at small sizes looks terrible.

I'd copied this from somewhere - maybe an old design spec, maybe another template - and never questioned it. It worked in my local development (because I have Windows fonts installed), so I assumed it was fine. The deployed site on Shopify was a different story.

Replacing it with Oswald was the right call - it's a similar condensed sans-serif that actually exists on Google Fonts. But the lesson here wasn't about fonts. It was about assumptions. I'd assumed the import worked because I'd seen it in the code. I'd never verified it. Never opened the browser dev tools to check what actually loaded.

## Part V: The Icon Archipelago

The Odin's brand has specific iconography - American flag for "50 States Legal," stopwatch for "30+ Days," custom images for biodegradability. Getting these right required understanding how the icon system actually worked.

Initially, I'd tried using Lucide icons (the React icon library). But the brand had custom SVGs with specific styling - white strokes on dark backgrounds, no fill colors. The Lucide icons didn't match the aesthetic.

So I dug into the `WhyOdinsSection`, `DifferenceSection`, and `BenefitsSection` components. Each had its own way of handling icons: some used image URLs, some used icon names that mapped to SVG components, some had hardcoded fallbacks.

The breakthrough was realizing the configuration layer could be more flexible. Instead of forcing everything into an "icon name" that mapped to a component, I allowed image URLs to pass through directly. The biodegradable badge became:

```json
{
  "icon": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png",
  "title": "100% Biodegradable",
  "description": "..."
}
```

And the component would detect it was a URL and render an `img` tag instead of an SVG icon. This hybrid approach - URLs for brand assets, SVG names for standard icons - gave us the flexibility we needed.

## Part VI: The Build Artifact Dance

Every build generated new CSS and JS files with hashed filenames: `index-BcgytdwJ.css`, `index-2hgtT8Ce.js`, etc. This is standard for cache-busting, but it created a deployment complexity: every time I fixed something, I had to:

1. Build the site
2. Note the new filenames
3. Update `config.json` with the new hashes
4. Update `shopify.html` with the new references
5. Upload the assets to Shopify
6. Update the page template

Missing any step meant the site would use stale assets. I automated some of this with the `shopifyAssets` config section, but it was still manual enough that mistakes were easy.

What I really needed was a deployment script that:
- Built the site
- Uploaded assets to Shopify automatically
- Updated the template
- Verified deployment

That script doesn't exist yet. It's on the list now, born from the realization that manual deployment of hashed assets is error-prone and tedious.

## Part VII: What We Actually Built

When the dust settled, we had more than just a deployed microsite. We had:

1. **A corrected font stack** that actually loads real fonts
2. **Brand-level logo/favicon configuration** that flows to all sites
3. **CSS override patterns** for Shopify theme compatibility
4. **A hybrid icon system** that supports both SVGs and image URLs
5. **Hardcoded config updates** that sync with brand.json (for now)
6. **A 150px logo** that renders from CDN without local fallbacks
7. **Asset management** documentation that warns about the manual steps

But more importantly, we had clarity about the template system's actual architecture versus its intended architecture. The gap between those two was where all the bugs lived.

## Key Takeaways

- **Configuration duplication is a trap** -- The `brand.json` and `main.tsx` hardcoded config drifted apart. Single source of truth means nothing if there are two sources that both matter.

- **Font imports need verification** -- Just because you see `@import url(...)` doesn't mean fonts are loading. Check the Network tab. Verify in an incognito window. Test on the deployment target.

- **Shopify themes are hostile territory** -- They inject CSS you don't control. Use `!important` judiciously, scope styles to your container, and test the actual integration, not just the component in isolation.

- **Image fallbacks hide real problems** -- That `|| "/local/path.png"` fallback made it seem like images were working when they weren't. Fail visibly, or at least log when fallbacks activate.

- **Build hashes require automation** -- Manual updating of hashed filenames is a recipe for stale assets. The deployment pipeline needs to be scripted end-to-end.

## What Next?

The immediate next step is obvious: test the deployed site, verify the fonts render correctly, confirm the logo displays at 150px, and make sure the favicon appears in browser tabs.

But the deeper work is architectural:

- **Create a deployment script** that automates build → upload → template update
- **Refactor the brand config system** so `main.tsx` actually imports from `brand.json` instead of duplicating it
- **Add deployment verification** that checks asset hashes match between config and template
- **Document the Shopify CSS override patterns** so future sites don't hit the same letter-spacing issues

This microsite isn't just a marketing page for deer scent beads. It's a case study in how templates fail in production, and a blueprint for making them more resilient.

---

*Written April 7, 2026, after a session that started with "just deploy this" and ended with a complete rethinking of how brand configuration flows through a multi-site template system.*
