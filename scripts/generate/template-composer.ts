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
  brandId: string;
  site: SiteInfo;
  sections?: Array<{ name: string; component: string; conditional?: string; importPath?: string; }> | string[];
  customHeader?: string;
  customImports?: string;
  customBody?: string;
  customProviders?: string;
  themePath?: string;
  // Legacy fields for backward compatibility
  brandName?: string;
  siteSlug?: string;
  ikbRules?: string[];
}

/**
 * Generates the header warning comment for auto-generated files.
 */
export function generateHeader(site: SiteInfo, brandName?: string, timestamp?: string): string {
  const ts = timestamp ?? new Date().toISOString();
  return `/**
  * ============================================================================
  * ⚠️  AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
  * ============================================================================
  *
  * File:      main.tsx
  * Site:      ${site.name}
  * Brand:     ${brandName || 'Unknown'}
  * Generated: ${ts}
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
export function generateImports(sections: string[] | Array<{ name: string; component: string; importPath?: string; conditional?: string; }> | undefined, themePath?: string): string {
  if (!sections || sections.length === 0) {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
${themePath ? `import '${themePath}';` : ''}
`;
  }
  const sectionImports = sections
    .map((section) => {
      if (typeof section === 'string') {
        return `import ${section} from './sections/${section}.tsx';`;
      }
      const comp = section.component || section.name;
      const path = section.importPath || `./sections/${section.name}.tsx`;
      return `import ${comp} from '${path}';`;
    })
    .join('\n');

  return `import React from 'react';
import ReactDOM from 'react-dom/client';
${sectionImports}
${themePath ? `import '${themePath}';` : ''}
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
 * Supports flexible overrides via custom* fields for brand-specific skeletons.
 */
export function composeSiteTemplate(config: SiteTemplateConfig): string {
  const header = config.customHeader ?? generateHeader(config.site, config.brandName);
  const imports = config.customImports ?? generateImports(config.sections, config.themePath);
  const ikb = (config.customImports || config.ikbRules) 
    ? '' // skip if custom imports include ikb, or no rules
    : generateIKBConfig(config.brandId, config.siteSlug ?? config.site.slug, config.ikbRules);

  const useCustom = !!(config.customBody || config.customProviders || config.customImports || config.customHeader);

  if (useCustom) {
    // Flexible custom assembly for complex brands like Odin's
    const providersOpen = config.customProviders ?? '';
    const bodyContent = config.customBody ?? '        <div>Site: ${config.site.name}</div>';
    // Standard closing for IKB/BrandProvider pattern used in custom cases
    const providersClose = config.customProviders 
      ? `
      </BrandProvider>
    </IKBProvider>`
      : '';

    const appCode = `
function App() {
  const { content } = config;
  const navCta = config.navigation?.cta;
  return (
${providersOpen}
${bodyContent}
${providersClose}
  );
}

// Initialize React
const root = createRoot(document.getElementById('root'));
root.render(<App />);
`;

    const parts = [header, imports, ikb, appCode].filter(Boolean);
    return parts.join('\n');
  }

  // Default simple body for basic sites
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

