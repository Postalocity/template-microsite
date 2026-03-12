/**
 * Grid Layout Utilities for Flexible Box Layouts
 *
 * Provides standardized grid layouts for sections with varying item counts
 * - All boxes always centered using mx-auto container
 * - Supports specific patterns: 2x2 (4 items), 3-2-2 (7 items)
 * - Dynamic centering with margin helpers
 */

export type GridColumns = {
  small: number;
  medium: number;
  large: number;
};

export interface GridLayoutParams {
  cols: GridColumns;
  hasMarginHelper?: boolean;
  marginWidth: string;
}

/**
 * Get grid column configuration based on item count
 * @param count - Number of items to display
 * @returns Grid columns configuration
 */
export const getGridColumns = (count: number): GridColumns => {
  // Standardize on 3-column layout for better centering control
  return {
    small: 2,    // Mobile: 2 columns
    medium: 2,   // Tablet: 2 columns
    large: 3    // Desktop: 3 columns (for centering patterns)
  };
};

/**
 * Check if grid needs margin helper for centering
 * @param count - Number of items
 * @returns Whether margin helper is needed
 */
export const needsMarginHelper = (count: number): boolean => {
  // Grid is 3 columns on desktop
  const cols = 3;
  const fullRows = Math.floor(count / cols);
  const incompleteRows = count % cols;

  // Need margin helper if there's a partial row (items don't fill complete rows)
  return incompleteRows > 0 && incompleteRows < cols && fullRows > 0;
};

/**
 * Get margin helper percentage based on item count
 * @param count - Number of items
 * @param cols - Number of columns in grid
 * @returns Margin percentage as Tailwind class prefix
 */
export const getMarginHelper = (count: number, cols: number = 3): string => {
  // Calculate which row is incomplete
  const fullRows = Math.floor(count / cols);
  const incompleteRowItems = count % cols;

  // For 7 items in 3-column grid: 1st row (3 items), 2nd row (2 items), 3rd row (2 items)
  // Pattern: 3-2-2

  // Determine margin based on row position (for 3-2-2 pattern):
  if (count === 5) {
    // 3-2 pattern: Last row needs 66.666% margin to center
    return 'max-w-[66.667%]';
  } else if (count === 7) {
    // 3-2-2 pattern: Last 2 rows each need 66.667% margin
    return 'max-w-[66.667%]';
  }

  // Default: Calculate dynamically
  // Row with less than cols items needs margin of: (items/cols) * 100%
  const marginPercent = (incompleteRowItems / cols) * 100;
  const marginClass = `max-w-[${marginPercent.toFixed(3)}%]`;

  return marginClass;
};

/**
 * Get complete grid classes including margin helper
 * @param count - Number of items
 * @returns Complete CSS classes string
 */
export const getGridLayoutClasses = (count: number): string => {
  const cols = getGridColumns(count);
  const useMarginHelper = needsMarginHelper(count);
  const marginClass = useMarginHelper ? getMarginHelper(count, cols.large) : '';

  return `grid grid-cols-${cols.small} md:grid-cols-${cols.medium} lg:grid-cols-${cols.large} gap-6 ${marginClass} mx-auto container`;
};

/**
 * Get specific row breakdown for layouts
 * @param count - Total item count
 * @returns Array of row sizes (for PHP/section generation logic)
 */
export const getRowBreakdown = (count: number): number[] => {
  // For 7 items: [3, 2, 2]
  if (count === 7) {
    return [3, 2, 2];
  }

  // For 5 items: [3, 2]
  if (count === 5) {
    return [3, 2];
  }

  // Default: Just return count (no special breakdown needed)
  return [count];
};