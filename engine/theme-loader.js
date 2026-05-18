/**
 * Theme System - Multi-brand design token management
 *
 * Each brand has its own theme configuration that controls:
 * - Color palette (primary, accent, backgrounds, etc.)
 * - Typography (fonts, weights, transforms)
 * - Spacing scale
 * - Border radius
 * - Button styles
 * - Navigation styles
 * - Hero overlay
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const THEMES_DIR = path.join(ROOT_DIR, 'config/themes');
/**
 * Load the themes configuration file
 */
export function loadThemes() {
    const themesPath = path.join(THEMES_DIR, 'themes.json');
    if (!fs.existsSync(themesPath)) {
        throw new Error(`Themes config not found at ${themesPath}`);
    }
    const content = fs.readFileSync(themesPath, 'utf-8');
    return JSON.parse(content);
}
/**
 * Get theme config for a specific brand
 * Falls back to 'default' theme if brand-specific theme not found
 */
export function getThemeForBrand(brandId) {
    const themes = loadThemes();
    // Try to find brand-specific theme
    const brandTheme = Object.values(themes.themes).find(t => t.brandId === brandId);
    if (brandTheme) {
        return brandTheme;
    }
    // Fall back to default theme
    if (themes.themes.default) {
        return themes.themes.default;
    }
    // Fall back to first available theme
    const firstTheme = Object.values(themes.themes)[0];
    if (firstTheme) {
        return firstTheme;
    }
    throw new Error(`No themes found for brand: ${brandId}`);
}
/**
 * Get theme by theme key name
 */
export function getThemeByKey(themeKey) {
    const themes = loadThemes();
    if (themes.themes[themeKey]) {
        return themes.themes[themeKey];
    }
    // Fall back to default
    if (themes.themes.default) {
        return themes.themes.default;
    }
    throw new Error(`Theme not found: ${themeKey}`);
}
/**
 * Generate CSS custom properties for a theme
 * This is injected into the generated site's globals.css
 */
export function generateThemeCSS(theme) {
    const { colors, typography, spacing, shadows, borderRadius, buttonStyle, navStyle, heroOverlay } = theme;
    return `
/* === THEME: ${theme.name} ===
 * ${theme.description}
 * Auto-generated - do not edit manually
 */

:root {
  /* Colors */
  --primary-h: ${colors.primary.h};
  --primary-s: ${colors.primary.s};
  --primary-l: ${colors.primary.l};
  --accent-h: ${colors.accent.h};
  --accent-s: ${colors.accent.s};
  --accent-l: ${colors.accent.l};
  --bg-h: ${colors.background.h};
  --bg-s: ${colors.background.s};
  --bg-l: ${colors.background.l};
  --fg-h: ${colors.foreground.h};
  --fg-s: ${colors.foreground.s};
  --fg-l: ${colors.foreground.l};
  --muted-h: ${colors.muted.h};
  --muted-s: ${colors.muted.s};
  --muted-l: ${colors.muted.l};
  --muted-fg-h: ${colors.mutedForeground.h};
  --muted-fg-s: ${colors.mutedForeground.s};
  --muted-fg-l: ${colors.mutedForeground.l};
  --border-h: ${colors.border.h};
  --border-s: ${colors.border.s};
  --border-l: ${colors.border.l};
  --card-h: ${colors.card.h};
  --card-s: ${colors.card.s};
  --card-l: ${colors.card.l};
  --card-fg-h: ${colors.cardForeground.h};
  --card-fg-s: ${colors.cardForeground.s};
  --card-fg-l: ${colors.cardForeground.l};
  --hero-bg-h: ${colors.heroBg.h};
  --hero-bg-s: ${colors.heroBg.s};
  --hero-bg-l: ${colors.heroBg.l};
  --hero-fg: ${colors.heroForeground.h} ${colors.heroForeground.s}% ${colors.heroForeground.l}%;
  --hero-sub-h: ${colors.heroSubtitle.h};
  --hero-sub-s: ${colors.heroSubtitle.s};
  --hero-sub-l: ${colors.heroSubtitle.l};
  --section-alt-h: ${colors.sectionAlt.h};
  --section-alt-s: ${colors.sectionAlt.s};
  --section-alt-l: ${colors.sectionAlt.l};
  
  /* Typography */
  --font-display: ${typography.display};
  --font-body: ${typography.body};
  --heading-weight: ${typography.headingWeight};
  --heading-transform: ${typography.headingTransform};
  --heading-letter-spacing: ${typography.headingLetterSpacing};
  
  /* Spacing */
  --space-7: ${spacing.sectionSm};
  --space-8: ${spacing.sectionMd};
  --space-9: ${spacing.sectionLg};
  --space-10: ${spacing.sectionXl};
  
  /* Shadows */
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  
  /* Border radius */
  --radius: ${borderRadius};
  
  /* Button style */
  --btn-uppercase: ${buttonStyle.uppercase ? 'uppercase' : 'none'};
  --btn-letter-spacing: ${buttonStyle.letterSpacing};
  --btn-font-weight: ${buttonStyle.fontWeight};
  --btn-radius: ${buttonStyle.borderRadius};
  
  /* Nav style */
  --nav-scrolled-bg: ${navStyle.scrolledBg};
  --nav-unscrolled-bg: ${navStyle.unscrolledBg};
  --nav-blur: ${navStyle.blur};
  --nav-logo-height: ${navStyle.logoHeight};
  --nav-logo-height-lg: ${navStyle.logoHeightLg};
  
  /* Hero overlay */
  --hero-overlay: ${heroOverlay};
}
`;
}
/**
 * List all available themes
 */
export function listThemes() {
    const themes = loadThemes();
    return Object.entries(themes.themes).map(([key, theme]) => ({
        key,
        name: theme.name,
        brandId: theme.brandId,
        description: theme.description,
    }));
}
//# sourceMappingURL=theme-loader.js.map