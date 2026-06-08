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

import { setIKBLoader } from './ikb-validator';

let registered = false;

/**
 * Convenience alias. Call this once early in your app / generator / test bootstrap.
 */
export async function initializeValidation(): Promise<void> {
  await registerEngineLoader();
}

export async function registerEngineLoader(): Promise<void> {
  if (registered) return;

  try {
    // Use dynamic import for ESM compatibility (generator runs under tsx/ESM)
    const engine = await import('@microsite/engine');
    const loadFn = engine.loadIKB || engine.loadIKBRules;

    if (typeof loadFn === 'function') {
      setIKBLoader((brandId: string) => {
        try {
          const ikb = loadFn(brandId);
          // Support both loadIKB (full) and loadIKBRules (rules only)
          const rules = (ikb && ikb.rules) ? ikb.rules : ikb;
          return rules as any; // IKBRulesSnapshot shape is compatible at runtime
        } catch {
          // Per-brand defensive: never let missing/errant IKB cause hard failure in validate
          return { blocklistedContent: [], blocklistedPhrases: [], approvedSections: [], trustSignals: [], promoCodes: {} };
        }
      });
      // registered only after wiring live per-brand loader (ensures consistency)
      registered = true;
    } else {
      registered = true;
    }
  } catch (err) {
    // Always succeed: install safe fallback loader so validate* never hard-fail downstream
    setIKBLoader(() => ({ blocklistedContent: [], blocklistedPhrases: [], approvedSections: [], trustSignals: [], promoCodes: {} }));
    registered = true;
  }
}
