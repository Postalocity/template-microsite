/**
 * Contexts Index
 * Export all React contexts for easy importing
 */

// Brand Context - Multi-brand support
export {
  BrandProvider,
  useBrand,
  useBrandName,
  useBrandUrls,
  useBrandContact,
  useBrandSocial,
  usePromoCode,
  useAppUrl,
  getDefaultBrandContext,
  type BrandConfig,
  type BrandUrls,
  type BrandContact,
  type BrandSocial,
  type BrandContextValue,
  type BrandProviderProps,
} from './BrandContext';

// IKB Context - Institutional Knowledge Base
export {
  IKBProvider,
  useIKB,
  useIKBRules,
  useTrustSignals,
  usePromoCodeFromIKB,
  useIKBPricing,
  useIKBTerminology,
  getDefaultIKBContext,
  defaultIKBConfig,
  type IKBContextValue,
  type IKBProviderProps,
} from './IKBContext';
