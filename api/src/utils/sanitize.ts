/**
 * HTML Content Sanitization Utility
 * 
 * Sanitizes user-provided HTML content to prevent XSS attacks
 * while preserving safe formatting and structure.
 */

// Simple regex-based sanitization for dangerous attributes and event handlers
export const sanitizeHtmlContent = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let sanitized = html;

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove iframe, object, embed, and form tags (potentially dangerous)
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*>/gi, '');
  sanitized = sanitized.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');

  // Remove javascript: protocol from href and src
  sanitized = sanitized.replace(/\s+(href|src)\s*=\s*["']javascript:[^"']*["']/gi, ' $1=""');
  sanitized = sanitized.replace(/\s+(href|src)\s*=\s*javascript:[^\s>]*/gi, ' $1=""');

  // Remove data: protocol from src (potential data exfiltration)
  sanitized = sanitized.replace(/\s+src\s*=\s*["']data:[^"']*["']/gi, ' src=""');

  return sanitized.trim();
};

/**
 * Validates and sanitizes blog/content fields
 * Ensures rich HTML content is safe before storage
 */
export const sanitizeContentData = <T extends object>(data: T): T => {
  const sanitized = { ...data } as Record<string, unknown>;

  // Sanitize content fields that might contain HTML
  if (typeof sanitized.content === 'string') {
    sanitized.content = sanitizeHtmlContent(sanitized.content);
  }

  if (typeof sanitized.description === 'string') {
    sanitized.description = sanitizeHtmlContent(sanitized.description);
  }

  if (typeof sanitized.excerpt === 'string') {
    sanitized.excerpt = sanitizeHtmlContent(sanitized.excerpt);
  }

  return sanitized as T;
};
