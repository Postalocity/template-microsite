/**
 * Depth-aware #root innerHTML extraction for prerender audits.
 */

export function findRootBounds(html: string): {
  openIndex: number;
  innerStart: number;
  closeIndex: number;
  closeEnd: number;
} | null {
  const openMatch = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!openMatch || openMatch.index === undefined) return null;

  const startIdx = openMatch.index + openMatch[0].length;
  let depth = 1;
  let i = startIdx;
  let endCloseIdx = -1;

  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        endCloseIdx = nextClose;
        break;
      }
      i = nextClose + 6;
    }
  }

  if (endCloseIdx === -1) return null;

  return {
    openIndex: openMatch.index,
    innerStart: startIdx,
    closeIndex: endCloseIdx,
    closeEnd: endCloseIdx + 6,
  };
}

export function extractRootInnerHtml(html: string): string | null {
  const bounds = findRootBounds(html);
  if (!bounds) return null;
  return html.slice(bounds.innerStart, bounds.closeIndex).trim();
}

export function measureRootPrerender(html: string): number {
  const inner = extractRootInnerHtml(html);
  if (!inner) return 0;
  // Self-closing / empty root
  if (inner.length < 50 && !inner.includes('<')) return 0;
  return inner.length;
}

export function parseAssetHashes(html: string): { css: string | null; js: string | null } {
  return {
    css: html.match(/index-[A-Za-z0-9_-]+\.css/)?.[0] ?? null,
    js: html.match(/index-[A-Za-z0-9_-]+\.js/)?.[0] ?? null,
  };
}