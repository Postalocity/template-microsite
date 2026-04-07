/**
 * Grid Layout Utilities for Various Patterns
 *
 * Provides proper row layouts for:
 * - 3x3 pattern (6 items)
 * - 3-2-2 pattern (7 items)
 * - 3-2 pattern (5 items)
 * - 2x2 pattern (4 items)
 */

/**
 * Get grid column configuration
 * 
 * For centered layouts:
 * - 4 items (2x2): use 2 columns so items naturally fill 2x2
 * - 6 items (3x3): use 3 columns, natural 3x3 grid
 * - 7 items (3-2-2): use 6 columns with each item spanning 2 columns
 *   This allows true centering: 3 items fill row (6 cols), 2 items centered (4 cols)
 * - 5 items (3-2): use 6 columns with each item spanning 2 columns
 */
export const getGridColumns = (count: number): { small: number; medium: number; large: number } => {
  if (count === 4) {
    // 2x2 centered pattern - use 2 columns
    return { small: 2, medium: 2, large: 2 };
  }
  if (count === 6) {
    // 3x2 pattern - use 3 columns, natural placement
    return { small: 2, medium: 3, large: 3 };
  }
  if (count === 9) {
    // 3x3 pattern - use 3 columns for 3 rows of 3
    return { small: 1, medium: 3, large: 3 };
  }
  if (count === 7) {
    // 3-2-2 pattern - use 6 columns with col-span-2 for each item
    return { small: 2, medium: 6, large: 6 };
  }
  // 5 items (3-2): use 6 columns with col-span-2
  return { small: 2, medium: 6, large: 6 };
};

/**
 * Get the grid column span class for item width
 * Each item spans 2 columns to achieve proper centering in 6-column grid
 */
export const getColumnSpanClass = (count: number): string => {
  if (count === 9) {
    return ""; // 9 items in 3x3 grid, natural span of 1
  }
  if (count === 7 || count === 5) {
    return "md:col-span-2"; // Only apply col-span-2 on medium+ screens
  }
  if (count === 4) {
    return "md:col-span-1"; // Make 4 items narrower in 2x2 grid
  }
  if (count === 6) {
    return "md:col-span-1"; // 6 items in 3x2, natural span
  }
  return "";
};

/**
 * Get the grid column start class for item positioning
 * Used to center items in rows with fewer than full columns
 * 
 * @param index - 0-based index of the item
 * @param count - total number of items
 */
export const getColumnClass = (index: number, count: number): string => {
  if (count === 9) {
    // 3x3 pattern - natural flow, no special positioning needed
    return "";
  }
  if (count === 6) {
    // 3x2 pattern - natural flow, no special positioning needed
    return "";
  }
  if (count === 7) {
    // 3-2-2 pattern with 6-column grid + col-span-2
    if (index === 3) {
      return "md:col-start-2";
    }
    if (index === 5) {
      return "md:col-start-2";
    }
  }
  if (count === 5) {
    // 3-2 pattern with 6-column grid + col-span-2
    if (index === 3) {
      return "md:col-start-2";
    }
  }
  return "";
};

/**
 * Get complete grid layout classes
 */
export const getGridLayoutClasses = (count: number): string => {
  const cols = getGridColumns(count);

  return `grid grid-cols-${cols.small} md:grid-cols-${cols.medium} lg:grid-cols-${cols.large} gap-6`;
};