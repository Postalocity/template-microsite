/**
 * Tests for common/utils/grid-layout.ts
 */

import { describe, it, expect } from 'vitest';
import {
  getGridColumns,
  getColumnSpanClass,
  getColumnClass,
  getGridLayoutClasses,
} from './grid-layout';

describe('grid-layout', () => {
  describe('getGridColumns', () => {
    it('should return 2 columns for 4 items (2x2 centered)', () => {
      const result = getGridColumns(4);
      expect(result).toEqual({ small: 2, medium: 2, large: 2 });
    });

    it('should return 3 columns for 6 items (3x3 pattern)', () => {
      const result = getGridColumns(6);
      expect(result).toEqual({ small: 2, medium: 3, large: 3 });
    });

    it('should return 6 columns for 7 items (3-2-2 pattern)', () => {
      const result = getGridColumns(7);
      expect(result).toEqual({ small: 2, medium: 6, large: 6 });
    });

    it('should return 6 columns for 5 items (3-2 pattern)', () => {
      const result = getGridColumns(5);
      expect(result).toEqual({ small: 2, medium: 6, large: 6 });
    });

    it('should return default columns for other counts', () => {
      const result = getGridColumns(3);
      expect(result).toEqual({ small: 2, medium: 6, large: 6 });
    });
  });

  describe('getColumnSpanClass', () => {
    it('should return md:col-span-2 for 7 items', () => {
      const result = getColumnSpanClass(7);
      expect(result).toBe('md:col-span-2');
    });

    it('should return md:col-span-2 for 5 items', () => {
      const result = getColumnSpanClass(5);
      expect(result).toBe('md:col-span-2');
    });

    it('should return md:col-span-1 for 4 items', () => {
      const result = getColumnSpanClass(4);
      expect(result).toBe('md:col-span-1');
    });

    it('should return md:col-span-1 for 6 items', () => {
      const result = getColumnSpanClass(6);
      expect(result).toBe('md:col-span-1');
    });

    it('should return empty string for other counts', () => {
      const result = getColumnSpanClass(3);
      expect(result).toBe('');
    });
  });

  describe('getColumnClass', () => {
    it('should return empty string for 6 items (3x3 natural flow)', () => {
      // 3x3 pattern - natural flow, no special positioning needed
      expect(getColumnClass(0, 6)).toBe('');
      expect(getColumnClass(3, 6)).toBe('');
      expect(getColumnClass(5, 6)).toBe('');
    });

    it('should return md:col-start-2 for row 2 in 7-item pattern', () => {
      // Row 2 starts at index 3, needs centering
      expect(getColumnClass(3, 7)).toBe('md:col-start-2');
    });

    it('should return md:col-start-2 for row 3 in 7-item pattern', () => {
      // Row 3 starts at index 5, needs centering
      expect(getColumnClass(5, 7)).toBe('md:col-start-2');
    });

    it('should return empty string for other indices in 7-item pattern', () => {
      // Row 1 (indices 0-2) and auto-placed items (4, 6)
      expect(getColumnClass(0, 7)).toBe('');
      expect(getColumnClass(1, 7)).toBe('');
      expect(getColumnClass(2, 7)).toBe('');
      expect(getColumnClass(4, 7)).toBe('');
      expect(getColumnClass(6, 7)).toBe('');
    });

    it('should return md:col-start-2 for row 2 in 5-item pattern', () => {
      // Row 2 starts at index 3, needs centering
      expect(getColumnClass(3, 5)).toBe('md:col-start-2');
    });

    it('should return empty string for other indices in 5-item pattern', () => {
      // Row 1 (indices 0-2) and auto-placed item (4)
      expect(getColumnClass(0, 5)).toBe('');
      expect(getColumnClass(1, 5)).toBe('');
      expect(getColumnClass(2, 5)).toBe('');
      expect(getColumnClass(4, 5)).toBe('');
    });

    it('should return empty string for other counts', () => {
      expect(getColumnClass(0, 4)).toBe('');
      expect(getColumnClass(3, 3)).toBe('');
    });
  });

  describe('getGridLayoutClasses', () => {
    it('should return correct classes for 4 items', () => {
      const result = getGridLayoutClasses(4);
      expect(result).toBe('grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6');
    });

    it('should return correct classes for 6 items', () => {
      const result = getGridLayoutClasses(6);
      expect(result).toBe('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6');
    });

    it('should return correct classes for 7 items', () => {
      const result = getGridLayoutClasses(7);
      expect(result).toBe('grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6');
    });

    it('should return correct classes for 5 items', () => {
      const result = getGridLayoutClasses(5);
      expect(result).toBe('grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6');
    });
  });
});
