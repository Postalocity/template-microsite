/**
 * @microsite/validation/register-engine-loader
 *
 * Call this once at application / test bootstrap to wire the real
 * IKB loader from the engine package.
 *
 * Usage (from root-level code, generator, or CMS entrypoint):
 *
 *   import { registerEngineLoader } from '@microsite/validation/register-engine-loader';
 *   registerEngineLoader();
 *
 * After this call, validatePhrase / validateContentType etc. will use
 * the live data from config/ikb/{brand}/rules.json.
 */

import type { IKBRules } from '../../../common/types/engine.js';

let registered = false;

export function registerEngineLoader(): void {
  if (registered) return;

  // Dynamic import so this file can be imported even before full monorepo linking
  // The consumer (running from project root) will have the correct module resolution.
  // We use a relative path that works when the package is inside the monorepo.
  import('../../../engine/config-loader.js')
    .then((mod) => {
      const { loadIKBRules } = mod;

      if (typeof loadIKBRules !== 'function') {
        console.warn('[validation] engine/config-loader did not export loadIKBRules');
        return;
      }

      // Provide an async wrapper that matches the expected IKBLoader signature
      const loader = (brandId: string): IKBRules => loadIKBRules(brandId);

      // We need to import the setter from the main entry to avoid circular issues
      import('./ikb-validator.js').then(({ setIKBLoader }) => {
        setIKBLoader(loader as any);
        registered = true;
        console.log('[validation] Real IKB loader from engine registered successfully');
      });
    })
    .catch((err) => {
      console.warn('[validation] Failed to dynamically load engine/config-loader:', err);
    });
}
