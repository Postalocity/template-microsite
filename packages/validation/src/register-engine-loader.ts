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

import type { IKBRules } from '@microsite/types';

let registered = false;

/**
 * Convenience alias. Call this once early in your app / generator / test bootstrap.
 */
export function initializeValidation(): void {
  registerEngineLoader();
}

export function registerEngineLoader(): void {
  if (registered) return;

  // Clean import from the new monorepo package
  import('@microsite/engine/config-loader')
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
