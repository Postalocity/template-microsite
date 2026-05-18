/**
 * Config Loader
 * 
 * Loads and validates brand configurations and IKBs.
 */

import fs from 'fs';
import path from 'path';
import type {
  BrandConfig,
  ContactInfo,
  SocialLinks,
  IKBConfig,
  EngineContext,
} from '@microsite/types';

const CONFIG_DIR = path.join(process.cwd(), 'config');
const BRANDS_DIR = path.join(CONFIG_DIR, 'brands');
const IKB_DIR = path.join(CONFIG_DIR, 'ikb');

/**
 * Load a brand configuration by brand ID
 */
export function loadBrandConfig(brandId: string): BrandConfig {
  const brandPath = path.join(BRANDS_DIR, brandId, 'brand.json');

  if (!fs.existsSync(brandPath)) {
    throw new Error(`Brand config not found: ${brandPath}`);
  }

  const content = fs.readFileSync(brandPath, 'utf-8');
  const config = JSON.parse(content) as BrandConfig;

  validateBrandConfig(config);
  return config;
}

/**
 * Load contact info for a brand
 */
export function loadContactInfo(brandId: string): ContactInfo {
  const contactPath = path.join(BRANDS_DIR, brandId, 'contact.json');

  if (!fs.existsSync(contactPath)) {
    throw new Error(`Contact config not found: ${contactPath}`);
  }

  const content = fs.readFileSync(contactPath, 'utf-8');
  return JSON.parse(content) as ContactInfo;
}

/**
 * Load social links for a brand
 */
export function loadSocialLinks(brandId: string): SocialLinks {
  const socialPath = path.join(BRANDS_DIR, brandId, 'social.json');

  if (!fs.existsSync(socialPath)) {
    // Social is optional, return empty object
    return {};
  }

  const content = fs.readFileSync(socialPath, 'utf-8');
  return JSON.parse(content) as SocialLinks;
}

/**
 * Load an IKB configuration by brand ID
 */
export function loadIKB(brandId: string): IKBConfig {
  const ikbPath = path.join(IKB_DIR, brandId);

  if (!fs.existsSync(ikbPath)) {
    throw new Error(`IKB not found: ${ikbPath}`);
  }

  // Load all IKB files
  const rules = loadJsonFile(path.join(ikbPath, 'rules.json')) as unknown as IKBConfig['rules'];
  const pricing = loadJsonFile(path.join(ikbPath, 'pricing.json')) as unknown as IKBConfig['pricing'];
  const proofOptions = loadJsonFile(path.join(ikbPath, 'proof-options.json')) as unknown as IKBConfig['proofOptions'];
  const terminology = loadOptionalJsonFile(path.join(ikbPath, 'terminology.json')) as unknown as IKBConfig['terminology'];

  const ikb: IKBConfig = {
    rules,
    pricing,
    proofOptions,
    terminology,
  };

  validateIKB(ikb);
  return ikb;
}

/**
 * Load only the IKBRules portion for a brand.
 * This is the preferred function for the @microsite/validation layer
 * and for CMS publish hooks.
 */
export function loadIKBRules(brandId: string): import('@microsite/types').IKBRules {
  const ikb = loadIKB(brandId);
  return ikb.rules;
}

/**
 * Load the complete engine context for a brand
 */
export function loadEngineContext(brandId: string): EngineContext {
  const brand = loadBrandConfig(brandId);
  const contact = loadContactInfo(brandId);
  const social = loadSocialLinks(brandId);
  const ikb = loadIKB(brandId);

  return { brand, contact, social, ikb };
}

/**
 * List all available brands
 */
export function listBrands(): string[] {
  if (!fs.existsSync(BRANDS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BRANDS_DIR)
    .filter((item) => {
      const stat = fs.statSync(path.join(BRANDS_DIR, item));
      return stat.isDirectory();
    });
}

/**
 * List all available services for a brand
 */
export function listServices(brandId: string): string[] {
  const servicesPath = path.join(CONFIG_DIR, 'sites', brandId);

  if (!fs.existsSync(servicesPath)) {
    return [];
  }

  return fs
    .readdirSync(servicesPath)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));
}

/**
 * Load a site configuration
 */
export function loadSiteConfig(brandId: string, serviceId: string): Record<string, unknown> {
  const sitePath = path.join(CONFIG_DIR, 'sites', brandId, `${serviceId}.json`);

  if (!fs.existsSync(sitePath)) {
    throw new Error(`Site config not found: ${sitePath}`);
  }

  return loadJsonFile(sitePath);
}

// =============================================================================
// VALIDATORS
// =============================================================================

function validateBrandConfig(config: BrandConfig): void {
  const errors: string[] = [];

  if (!config.id) errors.push('Brand config missing: id');
  if (!config.name) errors.push('Brand config missing: name');
  if (!config.slug) errors.push('Brand config missing: slug');
  if (!config.domain) errors.push('Brand config missing: domain');
  if (!config.urls) errors.push('Brand config missing: urls');
  if (!config.urls?.app) errors.push('Brand config missing: urls.app');
  if (!config.urls?.website) errors.push('Brand config missing: urls.website');
  if (!config.logo) errors.push('Brand config missing: logo');
  if (!config.logo?.filename) errors.push('Brand config missing: logo.filename');

  if (errors.length > 0) {
    throw new Error(`Invalid brand config: ${errors.join(', ')}`);
  }
}

function validateIKB(ikb: IKBConfig): void {
  const errors: string[] = [];

  if (!ikb.rules) errors.push('IKB missing: rules');
  if (!ikb.rules?.trustSignals) errors.push('IKB missing: rules.trustSignals');
  if (!ikb.rules?.promoCodes) errors.push('IKB missing: rules.promoCodes');
  if (!ikb.pricing) errors.push('IKB missing: pricing');
  if (!ikb.pricing?.basePrice) errors.push('IKB missing: pricing.basePrice');
  if (!ikb.proofOptions) errors.push('IKB missing: proofOptions');

  if (errors.length > 0) {
    throw new Error(`Invalid IKB: ${errors.join(', ')}`);
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function loadJsonFile(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function loadOptionalJsonFile(filePath: string): Record<string, unknown> | undefined {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}
