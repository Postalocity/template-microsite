/**
 * @microsite/validation
 * Public entry point for the IKB + content quality validation package.
 *
 * Primary consumers:
 * - Headless CMS (Payload / Strapi) publish hooks
 * - Future internal platform admin
 * - Generator (via re-exports during migration)
 */

export * from './types';
export * from './ikb-validator';
export { DEFAULT_IKB_RULES } from './ikb-validator';
export { 
  isPhraseAllowed, 
  isContentAllowed,
  getApprovedSections 
} from './ikb-validator';
export * from './content-quality';
export { initializeValidation, registerEngineLoader } from './register-engine-loader';
export * from './validate-site-content';
