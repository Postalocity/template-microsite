import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify to remove malicious scripts while allowing safe HTML tags
 * This is critical for Codex #29 (Security by Design) and #32 (Proper Error Handling)
 *
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'span', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'className'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object'],
    FORBID_ATTR: ['onclick', 'onload', 'onerror', 'javascript:'],
  });
};