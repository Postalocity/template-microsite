/**
 * Odin's Innovations - Centralized Brand Configuration
 * This ensures consistent branding across all Odin's sites
 */

// Standard icon sizing
// Container: w-14 h-14 (56px)
// Custom SVGs: w-12 h-12 (48px), strokeWidth=2
// Lucide icons: w-10 h-10 (40px), strokeWidth=1.5, color=#2d5a3d
// Image icons: w-12 h-12 (48px)

// Icon mappings for consistent usage across all Odin's sites
export const odinsIcons = {
  // Lucide icons (use strokeWidth: 1.5 for thinner, consistent look)
  lucide: {
    // Core icons
    bug: { component: 'Bug', color: '#2d5a3d', strokeWidth: 1.5 },
    'shield-check': { component: 'ShieldCheck', color: '#2d5a3d', strokeWidth: 1.5 },
    shield: { component: 'Shield', color: '#2d5a3d', strokeWidth: 1.5 },
    leaf: { component: 'Leaf', color: '#2d5a3d', strokeWidth: 1.5 },
    clock: { component: 'Clock', color: '#2d5a3d', strokeWidth: 1.5 },
    beaker: { component: 'Beaker', color: '#2d5a3d', strokeWidth: 1.5 },
    flask: { component: 'Beaker', color: '#2d5a3d', strokeWidth: 1.5 }, // Alias
    'flask-conical': { component: 'Beaker', color: '#2d5a3d', strokeWidth: 1.5 }, // Alias
    wind: { component: 'Wind', color: '#2d5a3d', strokeWidth: 1.5 },
    thermometer: { component: 'Thermometer', color: '#2d5a3d', strokeWidth: 1.5 },
    droplets: { component: 'Droplets', color: '#2d5a3d', strokeWidth: 1.5 },
    cloud: { component: 'Cloud', color: '#2d5a3d', strokeWidth: 1.5 },
    'check-circle': { component: 'CheckCircle', color: '#2d5a3d', strokeWidth: 1.5 },
    check: { component: 'Check', color: '#2d5a3d', strokeWidth: 1.5 },
    package: { component: 'Package', color: '#2d5a3d', strokeWidth: 1.5 },
    snowflake: { component: 'Snowflake', color: '#2d5a3d', strokeWidth: 1.5 },
    'map-pin': { component: 'MapPin', color: '#2d5a3d', strokeWidth: 1.5 },
    layers: { component: 'Layers', color: '#2d5a3d', strokeWidth: 1.5 },
    heart: { component: 'Heart', color: '#2d5a3d', strokeWidth: 1.5 },
    crown: { component: 'Crown', color: '#2d5a3d', strokeWidth: 1.5 },
    'cloud-rain': { component: 'CloudRain', color: '#2d5a3d', strokeWidth: 1.5 },
    apple: { component: 'Apple', color: '#2d5a3d', strokeWidth: 1.5 },
    nut: { component: 'Nut', color: '#2d5a3d', strokeWidth: 1.5 },
    paw: { component: 'PawPrint', color: '#2d5a3d', strokeWidth: 1.5 },
    flag: { component: 'Flag', color: '#2d5a3d', strokeWidth: 1.5 },
    
    // Colored variants for warnings/highlights
    'warning-red': { component: 'AlertTriangle', color: '#dc2626', strokeWidth: 1.5 },
    'flask-amber': { component: 'Beaker', color: '#d97706', strokeWidth: 1.5 },
    'clock-orange': { component: 'Clock', color: '#ea580c', strokeWidth: 1.5 },
    'ban-red': { component: 'Ban', color: '#dc2626', strokeWidth: 1.5 },
  },
  
  // Custom brand SVG icons (hosted on Shopify CDN)
  brand: {
    '50-states': {
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-50-states.svg',
      description: 'USA flag icon - Legal in all 50 states',
      size: 'w-12 h-12'
    },
    '50states': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-50-states.svg',
      description: 'USA flag icon - Legal in all 50 states',
      size: 'w-12 h-12'
    },
    'long-lasting': {
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    '30-days': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    '30days': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    clock: { // Alias to long-lasting
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    duration: { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    timer: { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841',
      description: 'Clock/timer icon - 30+ day duration',
      size: 'w-12 h-12'
    },
    // PNG brand assets
    'waterproof': {
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
    'rainproof': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
    'weatherproof': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
    'water': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
    'rain': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
    'weather': { // Alias
      url: 'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png',
      description: 'Waterproof/rainproof icon',
      size: 'w-12 h-12'
    },
  }
};

// Helper to get icon config by key
export const getIconConfig = (key: string) => {
  const lucideIcon = odinsIcons.lucide[key];
  if (lucideIcon) return { type: 'lucide', ...lucideIcon };
  
  const brandIcon = odinsIcons.brand[key];
  if (brandIcon) return { type: 'brand', ...brandIcon };
  
  return null;
};

// Brand colors
export const odinsColors = {
  primary: { h: 0, s: 0, l: 10 },
  accent: { h: 45, s: 100, l: 50 },
  green: '#2d5a3d',
  greenLight: '#4ade80',
  red: '#dc2626',
  amber: '#d97706',
  orange: '#ea580c',
};

// Standard brand configuration
export const odinsBrandConfig = {
  id: "odins-innovations",
  name: "Odin's Innovations",
  slug: "odins-innovations",
  domain: "odinsinnovations.com",
  tagline: "Synthetic. Long-Lasting. Legal Everywhere.",
  googleAnalyticsId: "G-XXXXXXXXXX",
  urls: {
    app: "https://www.odinsinnovations.com",
    website: "https://www.odinsinnovations.com",
    blog: "https://www.odinsinnovations.com/blog",
    shop: "https://www.odinsinnovations.com/collections/scent-beads",
    contact: "https://www.odinsinnovations.com/pages/contact-us"
  },
  logo: {
    filename: "odins-logo.png",
    alt: "Odin's Innovations"
  },
  colors: odinsColors,
  icons: odinsIcons
};

export default odinsBrandConfig;
