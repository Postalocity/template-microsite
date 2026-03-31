/**
 * Grid Layout Utilities - Aligned with healthcare-billing patterns
 *
 * Patterns from healthcare-billing:
 * - Services (5 items): flex flex-wrap justify-center gap-6 with card widths
 * - Benefits (4 items): grid md:grid-cols-2 gap-6 max-w-4xl mx-auto
 * - HowItWorks (4 steps): grid md:grid-cols-2 lg:grid-cols-4 gap-6
 * - Difference (3 items): grid md:grid-cols-2 lg:grid-cols-3 gap-8
 * - Testimonials (3 items): grid md:grid-cols-3 gap-8
 * - TrustSignals (4 items): flex flex-wrap items-center justify-center gap-8
 */

/**
 * Get grid column configuration for sections
 * 
 * Layout patterns:
 * - 3 items: 3 columns (lg), centered
 * - 4 items: 2 columns (md), can have max-w container
 * - 5 items: flex-wrap (2 cols sm, 3 lg)
 * - 6 items: 3 columns (lg), natural 3x3
 */
export const getGridColumns = (count: number): { small: number; medium: number; large: number } => {
  if (count === 3) {
    return { small: 1, medium: 3, large: 3 };
  }
  if (count === 4) {
    // Benefits pattern: 2 cols on md+
    return { small: 1, medium: 2, large: 2 };
  }
  if (count === 5) {
    // Services flex pattern: 2 cols sm, 3 cols lg
    return { small: 2, medium: 3, large: 3 };
  }
  if (count === 6) {
    // 3x3 pattern
    return { small: 2, medium: 3, large: 3 };
  }
  if (count >= 7) {
    return { small: 2, medium: 3, large: 4 };
  }
  // Default: 1 column
  return { small: 1, medium: 1, large: 1 };
};

/**
 * Get the grid column span class for item width
 */
export const getColumnSpanClass = (count: number): string => {
  if (count === 5) {
    return "sm:col-span-1"; // Flex handles sizing
  }
  if (count === 4) {
    return "md:col-span-1"; // 2x2 grid
  }
  if (count === 6) {
    return "md:col-span-1"; // 3x3 grid
  }
  if (count === 7 || count === 8) {
    return "lg:col-span-1"; // 4 columns
  }
  return "";
};

/**
 * Get grid layout classes - matches healthcare-billing patterns
 */
export const getGridLayoutClasses = (count: number): string => {
  const cols = getGridColumns(count);

  return `grid grid-cols-${cols.small} md:grid-cols-${cols.medium} lg:grid-cols-${cols.large} gap-6`;
};

/**
 * Get flex layout classes for services (matches healthcare-billing ServicesSection)
 * Returns classes for: max-w-sm, w-full, responsive widths
 */
export const getFlexItemClasses = (count: number, _index?: number): string => {
  if (count === 5) {
    // 5 items: 2 cols on sm (w-1/2), 3 cols on lg (w-1/3)
    return "w-1/2 lg:w-1/3";
  }
  if (count === 4) {
    // 4 items: w-1/2
    return "w-1/2";
  }
  if (count === 3) {
    // 3 items: w-1/3
    return "w-1/3";
  }
  // Default
  return "w-full max-w-sm";
};

/**
 * Get centered container max-width for benefits-like sections
 */
export const getCenteredMaxWidth = (count: number): string => {
  if (count === 4) {
    // Benefits pattern: max-w-4xl mx-auto
    return "max-w-4xl mx-auto";
  }
  if (count <= 3) {
    return "max-w-6xl mx-auto";
  }
  return "";
};

/**
 * Check if section should use flex instead of grid
 * Used for services with 5 items (healthcare-billing pattern)
 */
export const shouldUseFlex = (count: number): boolean => {
  return count === 5;
};

/**
 * Get column start class for centering items (legacy support)
 */
export const getColumnClass = (_index: number, _count: number): string => {
  return "";
};

/**
 * Get flex container classes
 */
export const getFlexContainerClasses = (): string => {
  return "flex flex-wrap justify-center gap-6";
};
