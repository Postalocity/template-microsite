/**
 * @microsite/validation
 * Public entry point for the IKB + content quality validation package.
 *
 * Primary consumers:
 * - Headless CMS (Payload / Strapi) publish hooks
 * - Future internal platform admin
 * - Generator (via re-exports during migration)
 */

export * from './types.js';
export * from './ikb-validator.js';
export { isPhraseAllowed, isContentAllowed } from './ikb-validator.js';
export * from './content-quality.js';
export * from './register-engine-loader.js';
