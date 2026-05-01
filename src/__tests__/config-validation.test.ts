/**
 * Config JSON Schema Validation Tests
 * Validates all site configs against expected schema
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Config directories
const ODINS_CONFIG_DIR = 'config/sites/odins-innovations';
const BROADSTROKE_CONFIG_DIR = 'config/sites/broadstroke';

// Schema validation helpers
interface ConfigSchema {
  version?: string;
  instructions?: {
    requiredFields?: string;
    promoCodes?: { default: string };
  };
  site?: {
    id: string;
    name: string;
    slug: string;
    domain?: string;
    basename?: string;
    contact?: {
      email?: string;
      phone?: string;
    };
  };
  branding?: {
    tagline?: string;
    logo?: string;
  };
  theme?: {
    primary?: { h: number; s: number; l: number };
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  navigation?: {
    links?: Array<{ label: string; href: string }>;
    cta?: { text: string; href: string };
  };
  content?: Record<string, any>;
}

function loadConfig(configPath: string): ConfigSchema {
  const content = readFileSync(configPath, 'utf-8');
  return JSON.parse(content);
}

function getConfigFiles(dir: string): string[] {
  try {
    return readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .map(f => join(dir, f));
  } catch {
    return [];
  }
}

describe('Config JSON Schema Validation', () => {
  describe('Odin\'s Innovations Configs', () => {
    const configFiles = getConfigFiles(ODINS_CONFIG_DIR);

    it('should have at least 7 config files', () => {
      expect(configFiles.length).toBeGreaterThanOrEqual(7);
    });

    configFiles.forEach(configPath => {
      const configName = configPath.split('/').pop();
      
      describe(`Config: ${configName}`, () => {
        let config: ConfigSchema;

        beforeEach(() => {
          config = loadConfig(configPath);
        });

        it('should be valid JSON', () => {
          expect(() => loadConfig(configPath)).not.toThrow();
        });

        it('should have either "version" or "site" field', () => {
          const hasVersion = !!config.version;
          const hasSite = !!config.site;
          expect(hasVersion || hasSite).toBe(true);
        });

        it('should have pretty-printed format (2-space indent)', () => {
          const content = readFileSync(configPath, 'utf-8');
          const lines = content.split('\n');
          // Second line should start with 2 spaces (pretty-printed)
          if (lines[1]) {
            expect(lines[1].startsWith('  ')).toBe(true);
          }
        });

        // Dynamic tests based on config structure
        it('should have valid structure based on config type', () => {
          if (config.site) {
            // Config has site object
            expect(config.site.id).toBeDefined();
            expect(typeof config.site.id).toBe('string');
            expect(config.site.id.length).toBeGreaterThan(0);
            
            expect(config.site.name).toBeDefined();
            expect(typeof config.site.name).toBe('string');
            
            expect(config.site.slug).toBeDefined();
            expect(typeof config.site.slug).toBe('string');
          } 
          
          if (config.version) {
            // Config has version field (newer format)
            expect(config.version).toBeDefined();
            expect(typeof config.version).toBe('string');
          }
        });

        it('should have valid seo if present', () => {
          if (config.seo) {
            if (config.seo.title) {
              expect(typeof config.seo.title).toBe('string');
              expect(config.seo.title.length).toBeGreaterThan(0);
            }
            if (config.seo.description) {
              expect(typeof config.seo.description).toBe('string');
            }
          }
        });

        it('should have valid navigation links if present', () => {
          if (config.navigation?.links) {
            config.navigation.links!.forEach((link, index) => {
              expect(link.label).toBeDefined();
              expect(link.href).toBeDefined();
              expect(typeof link.label).toBe('string');
              expect(typeof link.href).toBe('string');
            });
          }
        });
      });
    });
  });

  describe('Broadstroke Configs', () => {
    const configFiles = getConfigFiles(BROADSTROKE_CONFIG_DIR);

    it('should have at least 7 config files (including BRAND-MASTER)', () => {
      expect(configFiles.length).toBeGreaterThanOrEqual(7);
    });

    configFiles.forEach(configPath => {
      const configName = configPath.split('/').pop();
      
      // Skip BRAND-MASTER.json as it has different schema
      if (configName === 'BRAND-MASTER.json') return;

      describe(`Config: ${configName}`, () => {
        let config: ConfigSchema;

        beforeEach(() => {
          config = loadConfig(configPath);
        });

        it('should be valid JSON', () => {
          expect(() => loadConfig(configPath)).not.toThrow();
        });

        it('should have either "version" or "site" field', () => {
          const hasVersion = !!config.version;
          const hasSite = !!config.site;
          expect(hasVersion || hasSite).toBe(true);
        });

        it('should have pretty-printed format (2-space indent)', () => {
          const content = readFileSync(configPath, 'utf-8');
          const lines = content.split('\n');
          if (lines[1]) {
            expect(lines[1].startsWith('  ')).toBe(true);
          }
        });

        // Dynamic tests based on config structure
        it('should have valid structure based on config type', () => {
          if (config.site) {
            expect(config.site.id).toBeDefined();
            expect(typeof config.site.id).toBe('string');
            expect(config.site.id.length).toBeGreaterThan(0);
            
            expect(config.site.name).toBeDefined();
            expect(typeof config.site.name).toBe('string');
            
            expect(config.site.slug).toBeDefined();
            expect(typeof config.site.slug).toBe('string');
          } 
          
          if (config.version) {
            expect(config.version).toBeDefined();
            expect(typeof config.version).toBe('string');
          }
        });

        it('should have contact info if site object exists', () => {
          if (config.site) {
            expect(config.site.contact).toBeDefined();
          }
        });
      });
    });
  });

  describe('Config Consistency', () => {
    it('all Odin\'s configs should have consistent structure', () => {
      const configFiles = getConfigFiles(ODINS_CONFIG_DIR);
      
      configFiles.forEach(configPath => {
        const config = loadConfig(configPath);
        
        // All Odin's configs should have branding
        if (config.site?.id !== 'odins-innovations' && config.site?.id !== 'odins-innovations-scent-beads') {
          expect(config.branding).toBeDefined();
          expect(config.branding?.tagline).toBeDefined();
        }
      });
    });

    it('all Broadstroke configs should have contact info', () => {
      const configFiles = getConfigFiles(BROADSTROKE_CONFIG_DIR);
      
      configFiles.forEach(configPath => {
        const configName = configPath.split('/').pop();
        if (configName === 'BRAND-MASTER.json') return;
        
        const config = loadConfig(configPath);
        expect(config.site?.contact).toBeDefined();
      });
    });
  });
});