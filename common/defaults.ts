/**
 * Default Values
 * 
 * Centralized default values for the template engine.
 * These are used as fallbacks when config values are missing.
 */

export const DEFAULT_GA_ID = 'G-XXXXXXXXXX';

export const DEFAULT_THEME_COLOR = '#664400';

export const DEFAULT_LOCATION = {
  latitude: '37.6872',
  longitude: '-97.3301'
};

export const DEFAULT_PROMO_CODES: Record<string, string> = {
  postalocity: 'bank2026',
  printing: 'print2026',
  mailing: 'mail2026',
  promo: 'promo2026',
  'large-format': 'lf2026'
};

export const DEFAULT_TRUST_SIGNALS = [
  '70+ Years Combined Experience',
  'NCOA Verified',
  'CASS Certified',
  'ISO 9001 Documented Processes'
];

export const DEFAULT_SOCIAL = {
  linkedin: 'https://linkedin.com/company/broadstrokeinc',
  facebook: 'https://facebook.com/Broadstrokeinc',
  instagram: 'https://instagram.com/broadstrokeinc',
  tiktok: 'https://tiktok.com/@broadstrokeinc',
  pinterest: 'https://pinterest.com/broadstrokeinc',
  youtube: 'https://youtube.com/channel/UCd7KyDkDwi9hsA1ozODFQQQ'
};
