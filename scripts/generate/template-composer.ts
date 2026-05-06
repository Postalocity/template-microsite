/**
 * Template Composer
 * Pure template fragment functions for site generation.
 * Extracted from generate-site.ts to enable modular template composition.
 *
 * @module template-composer
 */

/**
 * SiteInfo interface - moved from generate-site.ts to reverse import direction
 * generate-site.ts now imports SiteInfo FROM template-composer.ts
 */
export interface SiteInfo {
  id?: string;
  name: string;
  slug: string;
  domain?: string;
  basename: string;
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
}

/**
 * Configuration for site template composition.
 */
export interface SiteTemplateConfig {
  site: SiteInfo;
  brandName: string;
  sections: string[];
  themePath: string;
  brandId: string;
  siteSlug: string;
  ikbRules?: string[];
}

/**
 * Generates the header warning comment for auto-generated files.
 */
export function generateHeader(site: SiteInfo, brandName: string): string {
  const timestamp = new Date().toISOString();
  return `/**
 * ============================================================================
 * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
 * ============================================================================
 *
 * File:      main.tsx
 * Site:      ${site.name}
 * Brand:     ${brandName}
 * Generated: ${timestamp}
 * Generator: scripts/generate-site.ts
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  EDIT THE SOURCE, NOT THE OUTPUT                                      ║
 * ║                                                                      ║
 * ║  To customize this site's content, edit:                              ║
 * ║    config/sites/${brandName}/${site.slug}.json                        ║
 * ║                                                                      ║
 * ║  To customize the site template, edit the generator function in:       ║
 * ║    scripts/generate-site.ts                                          ║
 * ║                                                                      ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */
`;
}

/**
 * Generates import statements for sections and theme.
 */
export function generateImports(sections: string[], themePath: string): string {
  const sectionImports = sections
    .map((section) => `import ${section} from './sections/${section}.tsx';`)
    .join('\n');

  return `import React from 'react';
import ReactDOM from 'react-dom/client';
${sectionImports}
import '${themePath}';
`;
}

/**
 * Generates IKB (Intelligent Knowledge Base) configuration object.
 */
export function generateIKBConfig(
  brandId: string,
  siteSlug: string,
  ikbRules: string[] = []
): string {
  const rulesArray = ikbRules.length > 0
    ? `[\n  ${ikbRules.map(r => `'${r}'`).join(',\n  ')}\n]`
    : '[]';

  return `const ikbConfig = {
  brandId: '${brandId}',
  siteSlug: '${siteSlug}',
  rules: ${rulesArray}
};
`;
}

/**
 * Composes the complete site template by combining header, imports, IKB config, and body.
 */
export function composeSiteTemplate(config: SiteTemplateConfig): string {
  const header = generateHeader(config.site, config.brandName);
  const imports = generateImports(config.sections, config.themePath);
  const ikb = generateIKBConfig(config.brandId, config.siteSlug, config.ikbRules);

  // Minimal body placeholder - will be expanded in later tasks
  const body = `
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<div>Site: ${config.site.name}</div>);
`;

  return `${header}
${imports}
${ikb}
${body}
`;
}

