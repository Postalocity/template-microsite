/**
 * Grid Layout Utilities
 *
 * Provides standardized grid layout rules for consistent centering across template sections
 * - Odd numbers are centered with proper stagger
 * - 4 boxes: 2x2 grid
 * - 5 boxes: 3-2 pattern (3 top row, 2 bottom row centered)
 * - 7 boxes: 3-2-2 pattern (all rows centered)
 * - All boxes always centered
 */

/**
 * Get grid container classes based on item count
 * @param count - Number of items
 * @returns CSS classes for grid container
 */
export const getGridClasses = (count: number): string => {
  switch (count) {
    case 4:
      return "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto";
    case 5:
      return "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto";
    case 7:
      return "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto";
    default:
      return "grid md:grid-cols-2 lg:grid-cols-3";
  }
};

/**
 * Get individual item classes to handle centered last rows
 * @param index - Current item index
 * @param count - Total item count
 * @returns CSS classes for individual items
 */
export const getItemClasses = (index: number, count: number): string => {
  // For 5 items: items 4-5 (index 3+) should be centered in last row
  if (count === 5 && index >= 3) {
    return "md:col-start-auto";
  }

  // For 7 items: items 6-7 (index 5+) should be centered in last row
  if (count === 7 && index >= 5) {
    return "md:col-start-auto";
  }

  return "";
};

/**
 * Get item classes without the col-start-auto for sections that need different centering
 * @param index - Current item index
 * @param count - Total item count
 * @returns CSS classes for individual items
 */
export const getItemClassesNoCenter = (index: number, count: number): string => {
  const centerMaps = {
    4: [],
    5: [3, 4],
    7: [5, 6],
  };

  if (centerMaps[count]?.includes(index)) {
    return "md:col-start-auto";
  }

  return "";
};