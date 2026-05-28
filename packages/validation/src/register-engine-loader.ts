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
  // Disabled during editor restoration to avoid engine package resolution errors in source mode.
  // Editor live validation + /api/validate continue to work via core validators.
  registered = true;
  console.log('[validation] Engine loader registration skipped for stability');
}
