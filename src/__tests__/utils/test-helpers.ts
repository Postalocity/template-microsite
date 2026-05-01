/**
 * Test helpers for microsite platform testing
 * @module test-helpers
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';

/**
 * Run the site generator and return the result
 */
export function generateSite(brand: string, service: string): GenerateResult {
  const outputDir = join(process.cwd(), 'sites', brand, service);
  
  try {
    const output = execSync(
      `npx tsx scripts/generate-site.ts --brand ${brand} --service ${service}`,
      { encoding: 'utf-8', cwd: process.cwd(), timeout: 120000 }
    );
    
    return {
      success: true,
      output,
      outputDir,
      exists: existsSync(outputDir)
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      output: error.stdout || '',
      outputDir,
      exists: existsSync(outputDir)
    };
  }
}

/**
 * Clean up generated site directory
 */
export function cleanupSite(brand: string, service: string): void {
  const siteDir = join(process.cwd(), 'sites', brand, service);
  if (existsSync(siteDir)) {
    rmSync(siteDir, { recursive: true, force: true });
  }
}

/**
 * Check if a file exists in the generated site
 */
export function siteFileExists(brand: string, service: string, filePath: string): boolean {
  const fullPath = join(process.cwd(), 'sites', brand, service, filePath);
  return existsSync(fullPath);
}

/**
 * Read a file from generated site
 */
export function readSiteFile(brand: string, service: string, filePath: string): string {
  const fullPath = join(process.cwd(), 'sites', brand, service, filePath);
  return readFileSync(fullPath, 'utf-8');
}

/**
 * Validate config JSON structure
 */
export function validateConfigStructure(config: any): ConfigValidation {
  const errors: string[] = [];
  
  // Check required top-level fields
  if (!config.site && !config.version) {
    errors.push('Missing required field: "site" or "version"');
  }
  
  // Check site object if present
  if (config.site) {
    if (!config.site.id) errors.push('Missing site.id');
    if (!config.site.name) errors.push('Missing site.name');
    if (!config.site.slug) errors.push('Missing site.slug');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Parse JSON config file
 */
export function parseConfig(configPath: string): any {
  const content = readFileSync(configPath, 'utf-8');
  return JSON.parse(content);
}

// Types
export interface GenerateResult {
  success: boolean;
  output?: string;
  error?: string;
  outputDir: string;
  exists: boolean;
}

export interface ConfigValidation {
  valid: boolean;
  errors: string[];
}
