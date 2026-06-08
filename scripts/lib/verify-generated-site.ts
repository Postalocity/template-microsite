/**
 * verify-generated-site.ts
 *
 * Phase 0 stabilization utility.
 * Provides reusable verification that a generated site actually produced usable output.
 */

import fs from 'fs';
import path from 'path';

export interface VerifyResult {
  success: boolean;
  distExists: boolean;
  indexHtmlExists: boolean;
  indexHtmlSize: number;
  title?: string;
  errors: string[];
  warnings: string[];
}

export function verifyGeneratedSite(brand: string, service: string): VerifyResult {
  const result: VerifyResult = {
    success: false,
    distExists: false,
    indexHtmlExists: false,
    indexHtmlSize: 0,
    errors: [],
    warnings: [],
  };

  const root = process.cwd();
  const distDir = path.join(root, 'sites', brand, service, 'dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(distDir)) {
    result.errors.push(`dist directory does not exist: ${distDir}`);
    return result;
  }
  result.distExists = true;

  if (!fs.existsSync(indexPath)) {
    result.errors.push(`dist/index.html not found at ${indexPath}`);
    return result;
  }
  result.indexHtmlExists = true;

  try {
    const stat = fs.statSync(indexPath);
    result.indexHtmlSize = stat.size;

    if (stat.size < 2000) {
      result.warnings.push(`index.html is very small (${stat.size} bytes) — generation may have been incomplete`);
    }

    const html = fs.readFileSync(indexPath, 'utf-8');

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      result.title = titleMatch[1].trim();
    }

    // Basic sanity checks
    if (!html.includes('<html')) {
      result.errors.push('index.html does not contain <html> tag');
    }
    if (!html.includes('</body>')) {
      result.warnings.push('index.html may be truncated (no closing </body>)');
    }

    result.success = result.errors.length === 0;

  } catch (e: any) {
    result.errors.push(`Failed to read or parse index.html: ${e.message}`);
  }

  return result;
}

export function formatVerifyResult(r: VerifyResult): string {
  const lines: string[] = [];
  lines.push(`Verification: ${r.success ? '✅ PASS' : '❌ FAIL'}`);
  lines.push(`  dist/ exists: ${r.distExists}`);
  lines.push(`  index.html exists: ${r.indexHtmlExists} (${r.indexHtmlSize} bytes)`);
  if (r.title) lines.push(`  <title>: ${r.title}`);
  if (r.errors.length) lines.push(`  Errors: ${r.errors.join(' | ')}`);
  if (r.warnings.length) lines.push(`  Warnings: ${r.warnings.join(' | ')}`);
  return lines.join('\n');
}
