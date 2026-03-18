/**
 * Pricing utility functions
 * Used to make pricing globally configurable across all sites
 */

import { useMemo } from 'react';
import { useIKBPricing } from '@/contexts';

/**
 * Format a price as a string
 */
export function formatPrice(price: number, units: string = 'letter'): string {
  return `$${price.toFixed(2)}/${units}`;
}

/**
 * Format full pricing description
 */
export function formatFullPricing(basePrice: number, units: string = 'letter'): string {
  return `$${basePrice.toFixed(2)}/${units} (1-page B&W, envelope + postage)`;
}

/**
 * Default pricing values
 */
export const DEFAULT_PRICING = {
  basePrice: 1.31,
  units: 'letter',
  fullDescription: '$1.31/letter (1-page B&W, envelope + postage)',
};

/**
 * Hook to get formatted pricing text
 */
export function useFormattedPricing() {
  const pricing = useIKBPricing();
  
  return useMemo(() => {
    const basePrice = pricing?.basePrice ?? DEFAULT_PRICING.basePrice;
    const units = pricing?.units ?? DEFAULT_PRICING.units;
    
    return {
      basePrice,
      units,
      short: formatPrice(basePrice, units),
      full: formatFullPricing(basePrice, units),
      withEnvelope: `As low as $${basePrice.toFixed(2)} to print, fold, stuff, seal, and apply postage – includes envelope`,
    };
  }, [pricing]);
}

/**
 * Process text and replace pricing placeholders
 */
export function processPricingPlaceholders(text: string, pricing: { basePrice?: number; units?: string }): string {
  const basePrice = pricing?.basePrice ?? DEFAULT_PRICING.basePrice;
  const units = pricing?.units ?? DEFAULT_PRICING.units;
  
  const shortPrice = formatPrice(basePrice, units);
  const fullPrice = formatFullPricing(basePrice, units);
  const envelopePrice = `As low as $${basePrice.toFixed(2)} to print, fold, stuff, seal, and apply postage – includes envelope`;
  
  return text
    .replace(/\{\{PRICING\}\}/g, fullPrice)
    .replace(/\{\{PRICING_SHORT\}\}/g, shortPrice)
    .replace(/\{\{PRICING_ENVELOPE\}\}/g, envelopePrice);
}

/**
 * Process text with pricing using the IKB pricing context
 */
export function processTextWithPricing(text: string): string {
  const basePrice = DEFAULT_PRICING.basePrice;
  const units = DEFAULT_PRICING.units;
  
  const shortPrice = formatPrice(basePrice, units);
  const fullPrice = formatFullPricing(basePrice, units);
  const envelopePrice = `As low as $${basePrice.toFixed(2)} to print, fold, stuff, seal, and apply postage – includes envelope`;
  
  return text
    .replace(/\{\{PRICING\}\}/g, fullPrice)
    .replace(/\{\{PRICING_SHORT\}\}/g, shortPrice)
    .replace(/\{\{PRICING_ENVELOPE\}\}/g, envelopePrice);
}
