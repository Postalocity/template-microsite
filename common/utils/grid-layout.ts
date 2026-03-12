/**
 * Grid Layout Utilities for 3-2-2 Pattern
 *
 * Provides proper row centering for 3-2-2 pattern using CSS Grid cell placement.
 * For 2-item rows: position items in columns 2 and 3 instead of 1 and 2 to center them.
 */

/**
 * Get grid column configuration
 */
export const getGridColumns = (count: number): { small: number; medium: number; large: number } => {
  return {
    small: 2,
    medium: 2,
    large: 3
  };
};

/**
 * Get grid column for a specific item based on its row position
 * @param index - Current item index (0-based)
 * @param count - Total item count
 * @returns CSS grid column value
 */
export const getGridColumn = (index: number, count: number): string => {
  // For 7 items (3-2-2 pattern):
  // Row 1 (items 0-2): cols 1, 2, 3 (natural)
  // Row 2 (items 3-4): cols 2, 3 (shifted right to center)
  // Row 3 (items 5-6): cols 2, 3 (shifted right to center)

  if (count === 7) {
    const row = Math.floor(index / 3);
    const colInRow = index % 3;

    if (row === 1) {
      // Second row (items 3,4): shift right
      return colInRow === 0 ? '2' : colInRow === 1 ? '3' : '';
    } else if (row === 2) {
      // Third row (items 5,6): shift right
      return colInRow === 0 ? '2' : colInRow === 1 ? '3' : '';
    }
    // First row: natural (1, 2, 3)
  }

  // For 5 items (3-2 pattern):
  // Row 1 (items 0-2): cols 1, 2, 3 (natural)
  // Row 2 (items 3-4): cols 2, 3 (shifted right)
  if (count === 5) {
    const row = Math.floor(index / 3);
    const colInRow = index % 3;

    if (row === 1) {
      return colInRow === 0 ? '2' : colInRow === 1 ? '3' : '';
    }
  }

  // Default: no special column shifting
  return '';
};

/**
 * Get CSS class for specific grid column
 * @param index - Item index
 * @param count - Total count
 * @returns CSS class like 'md:col-start-2' or empty string
 */
export const getColumnClass = (index: number, count: number): string => {
  const col = getGridColumn(index, count);
  if (col) {
    return `md:col-start-${col}`;
  }
  return '';
};

/**
 * Get complete grid layout classes
 */
export const getGridLayoutClasses = (count: number): string => {
  const cols = getGridColumns(count);

  return `grid grid-cols-${cols.small} md:grid-cols-${cols.medium} lg:grid-cols-${cols.large} gap-6`;
};