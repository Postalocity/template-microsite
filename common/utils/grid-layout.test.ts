import { describe, it, expect } from "vitest";
import { getGridColumns, getGridLayoutClasses, getColumnClass, getColumnSpanClass } from "./grid-layout";

describe("grid-layout", () => {
  describe("getGridColumns", () => {
    it("should return 2 columns for 4 items (2x2 centered)", () => {
      const result = getGridColumns(4);
      expect(result).toEqual({ small: 2, medium: 2, large: 2 });
    });

    it("should return 6 columns for 7 items (3-2-2 pattern with col-span-2)", () => {
      const result = getGridColumns(7);
      expect(result).toEqual({ small: 2, medium: 6, large: 6 });
    });

    it("should return 6 columns for 5 items (3-2 pattern with col-span-2)", () => {
      const result = getGridColumns(5);
      expect(result).toEqual({ small: 2, medium: 6, large: 6 });
    });

    it("should return 3 columns for 3 items", () => {
      const result = getGridColumns(3);
      expect(result).toEqual({ small: 2, medium: 3, large: 3 });
    });
  });

  describe("getGridLayoutClasses", () => {
    it("should return proper grid classes for 4 items", () => {
      const result = getGridLayoutClasses(4);
      expect(result).toContain("grid-cols-2");
    });

    it("should return proper grid classes for 7 items (6-column grid)", () => {
      const result = getGridLayoutClasses(7);
      expect(result).toContain("grid-cols-6");
    });

    it("should return proper grid classes for 5 items", () => {
      const result = getGridLayoutClasses(5);
      expect(result).toContain("grid-cols-6");
    });
  });

  describe("getColumnSpanClass", () => {
    it("should return empty string for 4 items", () => {
      expect(getColumnSpanClass(4)).toBe("");
    });

    it("should return col-span-2 for 7 items", () => {
      expect(getColumnSpanClass(7)).toBe("col-span-2");
    });

    it("should return col-span-2 for 5 items", () => {
      expect(getColumnSpanClass(5)).toBe("col-span-2");
    });

    it("should return empty string for other counts", () => {
      expect(getColumnSpanClass(3)).toBe("");
      expect(getColumnSpanClass(6)).toBe("");
    });
  });

  describe("getColumnClass", () => {
    it("should return empty string for 4 items (no special positioning)", () => {
      expect(getColumnClass(0, 4)).toBe("");
      expect(getColumnClass(1, 4)).toBe("");
      expect(getColumnClass(2, 4)).toBe("");
      expect(getColumnClass(3, 4)).toBe("");
    });

    it("should return col-start-2 for rows 2 and 3 in 7-item pattern", () => {
      // Row 1 (indices 0-2): no col-start class needed
      expect(getColumnClass(0, 7)).toBe("");
      expect(getColumnClass(1, 7)).toBe("");
      expect(getColumnClass(2, 7)).toBe("");
      // Row 2 (indices 3-4): col-start-2 to center (with col-span-2, items occupy 2-3 and 4-5)
      expect(getColumnClass(3, 7)).toBe("col-start-2");
      expect(getColumnClass(4, 7)).toBe("col-start-2");
      // Row 3 (indices 5-6): col-start-2 to center
      expect(getColumnClass(5, 7)).toBe("col-start-2");
      expect(getColumnClass(6, 7)).toBe("col-start-2");
    });

    it("should return col-start-2 for row 2 in 5-item pattern", () => {
      // Row 1 (indices 0-2): no col-start class needed
      expect(getColumnClass(0, 5)).toBe("");
      expect(getColumnClass(1, 5)).toBe("");
      expect(getColumnClass(2, 5)).toBe("");
      // Row 2 (indices 3-4): col-start-2 to center (with col-span-2, items occupy 2-3 and 4-5)
      expect(getColumnClass(3, 5)).toBe("col-start-2");
      expect(getColumnClass(4, 5)).toBe("col-start-2");
    });

    it("should return empty string for other item counts", () => {
      expect(getColumnClass(0, 3)).toBe("");
      expect(getColumnClass(1, 6)).toBe("");
      expect(getColumnClass(2, 8)).toBe("");
    });
  });
});
