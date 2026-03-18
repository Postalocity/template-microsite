/**
 * Tests for common/utils/sanitize-html.ts
 * Note: DOMPurify requires browser environment, limited tests for Node
 */

import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitize-html';

describe('sanitize-html', () => {
  describe('sanitizeHtml', () => {
    it('should be defined as a function', () => {
      expect(typeof sanitizeHtml).toBe('function');
    });

    it('should handle empty string input', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should return empty string for null input', () => {
      const result = sanitizeHtml(null as unknown as string);
      expect(result).toBe('');
    });

    it('should return empty string for undefined input', () => {
      const result = sanitizeHtml(undefined as unknown as string);
      expect(result).toBe('');
    });

    it('should return empty string for non-string input', () => {
      const result = sanitizeHtml(123 as unknown as string);
      expect(result).toBe('');
    });
  });
});
