/**
 * Config Loader
 *
 * Loads and validates brand configurations and IKBs.
 */
import type { BrandConfig, ContactInfo, SocialLinks, IKBConfig, EngineContext } from '../common/types/engine';
/**
 * Load a brand configuration by brand ID
 */
export declare function loadBrandConfig(brandId: string): BrandConfig;
/**
 * Load contact info for a brand
 */
export declare function loadContactInfo(brandId: string): ContactInfo;
/**
 * Load social links for a brand
 */
export declare function loadSocialLinks(brandId: string): SocialLinks;
/**
 * Load an IKB configuration by brand ID
 */
export declare function loadIKB(brandId: string): IKBConfig;
/**
 * Load only the IKBRules portion for a brand.
 * This is the preferred function for the @microsite/validation layer
 * and for CMS publish hooks.
 */
export declare function loadIKBRules(brandId: string): import('../common/types/engine').IKBRules;
/**
 * Load the complete engine context for a brand
 */
export declare function loadEngineContext(brandId: string): EngineContext;
/**
 * List all available brands
 */
export declare function listBrands(): string[];
/**
 * List all available services for a brand
 */
export declare function listServices(brandId: string): string[];
/**
 * Load a site configuration
 */
export declare function loadSiteConfig(brandId: string, serviceId: string): Record<string, unknown>;
//# sourceMappingURL=config-loader.d.ts.map