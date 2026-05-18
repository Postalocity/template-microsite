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
export interface BrandColors {
    h: number;
    s: number;
    l: number;
}
export interface TypographyConfig {
    display: string;
    body: string;
    headingWeight: number;
    headingTransform: string;
    headingLetterSpacing: string;
}
export interface SpacingConfig {
    sectionSm: string;
    sectionMd: string;
    sectionLg: string;
    sectionXl: string;
}
export interface ShadowsConfig {
    sm: string;
    md: string;
    lg: string;
}
export interface ButtonStyleConfig {
    uppercase: boolean;
    letterSpacing: string;
    fontWeight: number;
    borderRadius: string;
}
export interface NavStyleConfig {
    scrolledBg: string;
    unscrolledBg: string;
    blur: string;
    logoHeight: string;
    logoHeightLg: string;
}
export interface ThemeConfig {
    name: string;
    description: string;
    brandId: string;
    colors: {
        primary: BrandColors;
        accent: BrandColors;
        background: BrandColors;
        foreground: BrandColors;
        muted: BrandColors;
        mutedForeground: BrandColors;
        border: BrandColors;
        card: BrandColors;
        cardForeground: BrandColors;
        heroBg: BrandColors;
        heroForeground: {
            h: number;
            s: number;
            l: number;
        };
        heroSubtitle: BrandColors;
        sectionAlt: BrandColors;
    };
    typography: TypographyConfig;
    spacing: SpacingConfig;
    shadows: ShadowsConfig;
    borderRadius: string;
    buttonStyle: ButtonStyleConfig;
    navStyle: NavStyleConfig;
    heroOverlay: string;
}
export interface ThemesConfig {
    version: string;
    description: string;
    themes: Record<string, ThemeConfig>;
}
/**
 * Load the themes configuration file
 */
export declare function loadThemes(): ThemesConfig;
/**
 * Get theme config for a specific brand
 * Falls back to 'default' theme if brand-specific theme not found
 */
export declare function getThemeForBrand(brandId: string): ThemeConfig;
/**
 * Get theme by theme key name
 */
export declare function getThemeByKey(themeKey: string): ThemeConfig;
/**
 * Generate CSS custom properties for a theme
 * This is injected into the generated site's globals.css
 */
export declare function generateThemeCSS(theme: ThemeConfig): string;
/**
 * List all available themes
 */
export declare function listThemes(): {
    key: string;
    name: string;
    brandId: string;
    description: string;
}[];
//# sourceMappingURL=theme-loader.d.ts.map