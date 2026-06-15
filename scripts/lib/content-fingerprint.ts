import { JSDOM } from 'jsdom';
import { extractRootInnerHtml } from './html-root.js';

export type ContentFingerprint = {
  title: string | null;
  h1: string | null;
  sectionIds: string[];
  h2s: string[];
  faqQuestions: string[];
  navLabels: string[];
  visibleText: string;
  textLength: number;
};

export function normalizeText(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/[—–]/g, ' - ')
    .replace(/\s*&\s*/g, ' and ')
    .replace(/self storage/gi, 'self-storage')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function fingerprintFromHtml(html: string, scope: 'root' | 'document' = 'root'): ContentFingerprint | null {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const root = scope === 'root' ? doc.getElementById('root') : doc.body;
  if (!root) return null;

  const title = doc.querySelector('title')?.textContent?.trim() ?? null;
  const h1 = root.querySelector('h1')?.textContent?.trim() ?? null;

  const sectionIds = [...root.querySelectorAll('section[id]')].map((s) => s.id).filter(Boolean);
  const h2s = [...root.querySelectorAll('h2')].map((h) => normalizeText(h.textContent ?? '')).filter(Boolean);

  const faqQuestions = [...root.querySelectorAll('[id="faq"] button, #faq h3, [id="faq"] [data-state]')]
    .map((el) => normalizeText(el.textContent ?? ''))
    .filter((t) => t.length > 8);

  const faqFallback = [...root.querySelectorAll('#faq *')];
  if (faqQuestions.length === 0) {
    for (const el of faqFallback) {
      const tag = el.tagName.toLowerCase();
      if (tag === 'button' || tag === 'h3') {
        const t = normalizeText(el.textContent ?? '');
        if (t.length > 8) faqQuestions.push(t);
      }
    }
  }

  const navLabels = [...root.querySelectorAll('nav a[href^="#"]')]
    .map((a) => normalizeText(a.textContent ?? ''))
    .filter(Boolean);

  const visibleText = normalizeText(root.textContent ?? '');

  return {
    title: title ? normalizeText(title) : null,
    h1: h1 ? normalizeText(h1) : null,
    sectionIds,
    h2s,
    faqQuestions: [...new Set(faqQuestions)],
    navLabels,
    visibleText,
    textLength: visibleText.length,
  };
}

export function fingerprintFromRootHtml(rootInnerHtml: string): ContentFingerprint | null {
  return fingerprintFromHtml(`<!DOCTYPE html><html><body><div id="root">${rootInnerHtml}</div></body></html>`, 'root');
}

export function fingerprintFromFileHtml(html: string): ContentFingerprint | null {
  const inner = extractRootInnerHtml(html);
  if (!inner || inner.length < 50) return null;
  return fingerprintFromRootHtml(inner);
}

export type ContentCompareResult = {
  match: boolean;
  score: number;
  issues: string[];
  details: {
    h1: { local: string | null; live: string | null; match: boolean };
    sections: { local: string[]; live: string[]; match: boolean };
    h2Overlap: number;
    faqOverlap: number;
    textSimilarity: number;
  };
};

function overlapRatio(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  const hits = a.filter((x) => setB.has(x)).length;
  return hits / Math.max(a.length, b.length);
}

function textSimilarity(a: string, b: string): number {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  const wordsA = new Set(a.split(' ').filter((w) => w.length > 2));
  const wordsB = new Set(b.split(' ').filter((w) => w.length > 2));
  if (wordsA.size === 0 && wordsB.size === 0) return 1;
  let hits = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) hits += 1;
  }
  return hits / Math.max(wordsA.size, wordsB.size);
}

export function compareFingerprints(
  local: ContentFingerprint,
  live: ContentFingerprint,
  opts: { minScore?: number } = {}
): ContentCompareResult {
  const minScore = opts.minScore ?? 0.85;
  const issues: string[] = [];

  const h1Match =
    !!local.h1 &&
    !!live.h1 &&
    (local.h1 === live.h1 || local.h1.includes(live.h1) || live.h1.includes(local.h1) || textSimilarity(local.h1, live.h1) >= 0.95);
  if (!h1Match) issues.push(`H1 mismatch: local="${local.h1 ?? '—'}" live="${live.h1 ?? '—'}"`);

  const sectionsMatch =
    local.sectionIds.length > 0 &&
    live.sectionIds.length > 0 &&
    local.sectionIds.join(',') === live.sectionIds.join(',');
  const sectionSubsetOk =
    local.sectionIds.length > 0 &&
    live.sectionIds.length > 0 &&
    local.sectionIds.every((id, i) => live.sectionIds[i] === id) &&
    local.sectionIds.length <= live.sectionIds.length;
  if (!sectionsMatch && !sectionSubsetOk && (local.sectionIds.length > 0 || live.sectionIds.length > 0)) {
    issues.push(`Section order: local [${local.sectionIds.join(', ')}] vs live [${live.sectionIds.join(', ')}]`);
  }

  const h2Overlap = overlapRatio(local.h2s, live.h2s);
  if (h2Overlap < 0.7) issues.push(`H2 overlap low (${(h2Overlap * 100).toFixed(0)}%)`);

  const faqOverlap = overlapRatio(local.faqQuestions, live.faqQuestions);
  if (local.faqQuestions.length > 0 && live.faqQuestions.length > 0 && faqOverlap < 0.7) {
    issues.push(`FAQ overlap low (${(faqOverlap * 100).toFixed(0)}%)`);
  }

  const textSim = textSimilarity(local.visibleText, live.visibleText);
  if (textSim < minScore) issues.push(`Visible text similarity ${(textSim * 100).toFixed(0)}% (need ${(minScore * 100).toFixed(0)}%)`);

  const score =
    (h1Match ? 0.25 : 0) +
    (sectionsMatch || sectionSubsetOk ? 0.2 : h2Overlap * 0.2) +
    faqOverlap * 0.15 +
    textSim * 0.4;

  const match =
    score >= minScore &&
    h1Match &&
    (sectionsMatch || sectionSubsetOk || h2Overlap >= 0.85) &&
    textSim >= minScore &&
    (faqOverlap >= 0.7 || local.faqQuestions.length === 0);

  return {
    match,
    score,
    issues,
    details: {
      h1: { local: local.h1, live: live.h1, match: h1Match },
      sections: { local: local.sectionIds, live: live.sectionIds, match: sectionsMatch },
      h2Overlap,
      faqOverlap,
      textSimilarity: textSim,
    },
  };
}