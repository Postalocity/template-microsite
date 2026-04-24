/**
 * Odin's Innovations - Centralized Brand Configuration
 * This ensures consistent branding across all Odin's sites
 */

// Icon mappings for consistent usage across all Odin's sites
export const odinsIcons = {
  // Lucide icons (default strokeWidth: 2, use 1.5 for thinner)
  lucide: {
    bug: { component: 'Bug', color: '#2d5a3d', strokeWidth: 1.5 },
    leaf: { component: 'Leaf', color: '#2d5a3d', strokeWidth: 1.5 },
    clock: { component: 'Clock', color: '#2d5a3d', strokeWidth: 1.5 },
    'shield-check': { component: 'ShieldCheck', color: '#2d5a3d', strokeWidth: 1.5 },
    droplets: { component: 'Droplets', color: '#4ade80', strokeWidth: 1.5 }, // green-400 for dark bg
    wind: { component: 'Wind', color: '#2d5a3d', strokeWidth: 1.5 },
    thermometer: { component: 'Thermometer', color: '#2d5a3d', strokeWidth: 1.5 },
    'check-circle': { component: 'CheckCircle', color: '#2d5a3d', strokeWidth: 1.5 },
    cloud: { component: 'Cloud', color: '#2d5a3d', strokeWidth: 1.5 },
    package: { component: 'Package', color: '#4ade80', strokeWidth: 1.5 }, // green-400 for dark bg
    beaker: { component: 'Beaker', color: '#2d5a3d', strokeWidth: 1.5 },
  },
  // Custom brand SVG icons
  brand: {
    '50-states': {
      light: '/icon-50-states.svg',
      dark: '/icon-50-states-white.svg',
      description: 'USA flag icon - Legal in all 50 states'
    },
    '30-days': {
      light: '/icon-long-lasting.svg',
      dark: '/icon-long-lasting-white.svg',
      description: 'Clock/timer icon - 30+ day duration'
    },
    chemistry: {
      light: '/icon-chemistry.svg',
      dark: '/icon-chemistry-white.svg',
      description: 'Molecule icon - Chemistry/science'
    }
  }
};

// Brand colors
export const odinsColors = {
  primary: { h: 0, s: 0, l: 10 },
  accent: { h: 45, s: 100, l: 50 },
  green: '#2d5a3d',
  greenLight: '#4ade80',
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
