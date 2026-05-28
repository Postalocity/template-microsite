'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Imports of known rich editor components. Additional sections use dynamic tabs + fallback UIs.
import BenefitsEditor from '@/components/BenefitsEditor';
import DifferenceEditor from '@/components/DifferenceEditor';
import HowItWorksEditor from '@/components/HowItWorksEditor';
import PricingEditor from '@/components/PricingEditor';
import TestimonialsEditor from '@/components/TestimonialsEditor';
import HeroEditor from '@/components/HeroEditor';

interface Props {
  brand: string;
  slug: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Known rich editor components mapped by section key (from content)
const EDITOR_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroEditor,
  benefits: BenefitsEditor,
  difference: DifferenceEditor,
  howItWorks: HowItWorksEditor,
  pricing: PricingEditor,
  testimonials: TestimonialsEditor,
};

// Nice labels for common section keys (fallback uses title-casing)
const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
  benefits: 'Benefits',
  difference: 'The Difference',
  howItWorks: 'How It Works',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  services: 'Services',
  comparison: 'Comparison',
  cta: 'Call to Action',
  footer: 'Footer',
  features: 'Features',
  trustSignals: 'Trust Signals',
  'how-to-use': 'How To Use',
  'why-odins': 'Why Odins',
  products: 'Products',
  'bear-hunting': 'Bear Hunting',
  'feral-hog': 'Feral Hog',
  reviews: 'Reviews',
};

export default function SiteEditorClient({ brand, slug }: Props) {
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [approvedSections, setApprovedSections] = useState<string[]>([]);
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, errors: [], warnings: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const [generationLogs, setGenerationLogs] = useState<string>('');
  const [showLogs, setShowLogs] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);

  // Real preview iframe refresh key (bump to force reload after save/generate)
  const [previewKey, setPreviewKey] = useState(0);

  // Safe loader - no browser APIs at top level
  const loadSiteConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/sites/${brand}/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          const initial = {
            site: { id: slug, name: slug.replace(/-/g, ' '), slug, brand },
            branding: { tagline: '' },
            content: {
              hero: { headline: { main: '', highlightTerm: '' }, subhead: '', ctas: [] },
              benefits: { section: { title: 'Benefits', description: '' }, benefits: [] },
              difference: { section: { title: 'The Difference', description: '' }, differences: [] },
              howItWorks: { steps: [] },
              pricing: { tiers: [] },
              testimonials: { section: { title: 'Testimonials' }, testimonials: [] },
            },
          };
          setSiteConfig(initial);
          return;
        }
        throw new Error(`Failed to load: ${res.status}`);
      }
      const data = await res.json();
      if (!data.content) data.content = {};
      if (!data.content.hero) data.content.hero = { headline: { main: '', highlightTerm: '' }, subhead: '', ctas: [] };
      if (!data.content.benefits) data.content.benefits = { benefits: [] };
      if (!data.content.difference) data.content.difference = { differences: [] };
      if (!data.content.howItWorks) data.content.howItWorks = { steps: [] };
      if (!data.content.pricing) data.content.pricing = { tiers: [] };
      if (!data.content.testimonials) data.content.testimonials = { testimonials: [] };
      setSiteConfig(data);
    } catch (e: any) {
      console.error('Load error', e);
      setError(e.message || 'Failed to load site config');
      setSiteConfig({
        site: { id: slug, name: `${brand} / ${slug}`, slug, brand },
        content: {
          hero: { headline: { main: '', highlightTerm: '' }, subhead: '', ctas: [] },
          benefits: { section: { title: 'Benefits' }, benefits: [] },
          difference: { differences: [] },
          howItWorks: { steps: [] },
          pricing: { tiers: [] },
          testimonials: { testimonials: [] },
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [brand, slug]);

  const loadBrandIKB = useCallback(async () => {
    try {
      const res = await fetch(`/api/brands/${brand}/ikb`);
      if (res.ok) {
        const ikb = await res.json();
        const secs = ikb.approvedSections || ikb.rules?.approvedSections || [];
        setApprovedSections(Array.isArray(secs) ? secs : []);
      } else {
        setApprovedSections([]);
      }
    } catch {
      setApprovedSections([]);
    }
  }, [brand]);

  useEffect(() => {
    loadSiteConfig();
    loadBrandIKB();
  }, [loadSiteConfig, loadBrandIKB]);

  const updateContent = useCallback((sectionKey: string, patch: any) => {
    setSiteConfig((prev: any) => {
      if (!prev) return prev;
      const prevContent = prev.content || {};
      const prevSection = prevContent[sectionKey] || {};
      return {
        ...prev,
        content: {
          ...prevContent,
          [sectionKey]: {
            ...prevSection,
            ...patch,
          },
        },
      };
    });
    setSaveMessage(null);
  }, []);

  useEffect(() => {
    if (!siteConfig || isLoading) return;

    let cancelled = false;

    const pollValidation = async () => {
      if (cancelled) return;
      try {
        const payload = {
          content: siteConfig.content || siteConfig,
          brandId: brand,
        };
        const res = await fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!cancelled && res.ok) {
          const data = await res.json();
          setValidation({
            valid: !!data.valid,
            errors: Array.isArray(data.errors) ? data.errors : [],
            warnings: Array.isArray(data.warnings) ? data.warnings : [],
          });
        }
      } catch (e) {}
    };

    pollValidation();
    const interval = setInterval(pollValidation, 2500);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [siteConfig, brand, isLoading]);

  useEffect(() => {
    if (!runId) return;

    let cancelled = false;
    const pollLogs = async () => {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/generate/logs/${runId}`);
        if (!cancelled && res.ok) {
          const data = await res.json();
          setGenerationLogs(data.logs || 'Waiting for logs...');
        }
      } catch (e) {}
    };

    pollLogs();
    const interval = setInterval(pollLogs, 1200);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [runId]);

  // Auto-refresh real preview iframe when generation+build logs indicate completion
  useEffect(() => {
    if (!generationLogs) return;
    if (generationLogs.includes('Real site preview ready') || generationLogs.includes('Build finished with code 0')) {
      // Small delay so final assets are flushed to disk
      const t = setTimeout(() => setPreviewKey((k) => k + 1), 800);
      return () => clearTimeout(t);
    }
  }, [generationLogs]);

  // === Dynamic tab list derived from site content + brand IKB approvedSections ===
  const dynamicTabs = useMemo(() => {
    if (!siteConfig) return [];

    const content = siteConfig.content || {};
    const presentKeys = Object.keys(content).filter((k) => {
      const v = content[k];
      return v && typeof v === 'object' && !Array.isArray(v);
    });

    // Merge approvedSections (from API or embedded in site) + actual present keys
    let candidateKeys = presentKeys;
    const fromSiteIKB = siteConfig.ikb?.approvedSections || siteConfig.ikb?.rules?.approvedSections || [];
    const effectiveApproved = approvedSections.length > 0 ? approvedSections : (Array.isArray(fromSiteIKB) ? fromSiteIKB : []);
    if (effectiveApproved.length > 0) {
      const union = new Set([...effectiveApproved, ...presentKeys]);
      candidateKeys = Array.from(union);
    }

    // Hero first if present (for template compatibility)
    const hasHero = candidateKeys.includes('hero');
    const others = candidateKeys
      .filter((k) => k !== 'hero')
      .sort((a, b) => {
        // Prefer order from approved
        const ia = effectiveApproved.indexOf(a);
        const ib = effectiveApproved.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        // Fall back to order in present content
        const pa = presentKeys.indexOf(a);
        const pb = presentKeys.indexOf(b);
        if (pa !== -1 && pb !== -1) return pa - pb;
        return a.localeCompare(b);
      });

    const orderedKeys = hasHero ? ['hero', ...others] : others;

    return orderedKeys.map((key) => ({
      key,
      label: SECTION_LABELS[key] || key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      Component: EDITOR_COMPONENTS[key] || null,
    }));
  }, [siteConfig, approvedSections]);

  // Auto-select first tab (hero if present) when tabs become available
  useEffect(() => {
    if (dynamicTabs.length > 0) {
      const firstKey = dynamicTabs[0].key;
      if (!activeTab || !dynamicTabs.some((t) => t.key === activeTab)) {
        setActiveTab(firstKey);
      }
    }
  }, [dynamicTabs, activeTab]);

  const currentTab = dynamicTabs.find((t) => t.key === activeTab) || dynamicTabs[0] || null;
  const ActiveEditor = currentTab?.Component || null;

  const handleSave = async () => {
    if (!siteConfig) return;
    setIsSaving(true);
    setSaveMessage(null);
    setError(null);

    try {
      const res = await fetch(`/api/sites/${brand}/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteConfig),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Save failed: ${res.status}`);
      }

      setSaveMessage('✅ Saved successfully (generated config.json synced; run Generate for updated live preview)');
    } catch (e: any) {
      setError(e.message);
      setSaveMessage('❌ Save failed');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationLogs('Starting generation...');
    setShowLogs(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, service: slug }),
      });

      if (!res.ok) throw new Error('Generation request failed');

      const data = await res.json();
      if (data.runId) {
        setRunId(data.runId);
        setGenerationLogs(prev => prev + '\n' + (data.message || 'Generation started. Polling logs...'));
      } else {
        setGenerationLogs('Generation started (no runId returned)');
      }
    } catch (e: any) {
      setError(e.message);
      setGenerationLogs(prev => prev + '\nERROR: ' + e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-gray-100 rounded"></div>
            <div className="h-64 bg-gray-100 rounded"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Loading site configuration…</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">
            {brand} / {slug}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Rich Site Editor — edit sections, live validation, full generation + real-site iframe preview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || !siteConfig}
            className="px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60 flex items-center gap-2"
          >
            {isSaving ? 'Saving…' : '💾 Save Changes'}
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 flex items-center gap-2"
          >
            {isGenerating ? 'Generating…' : '🚀 Generate Site'}
          </button>

          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            {showRawJson ? 'Hide' : 'Show'} Raw JSON
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {saveMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Editor Pane */}
        <div className="lg:col-span-3 bg-white border rounded-2xl overflow-hidden shadow-sm">
          <div className="flex border-b bg-gray-50 px-2">
            {dynamicTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.key
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {dynamicTabs.length === 0 && (
              <span className="px-5 py-3 text-sm text-gray-400">No sections detected</span>
            )}
          </div>

          <div className="p-6 min-h-[520px]">
            {ActiveEditor && siteConfig ? (
              <ActiveEditor content={siteConfig} updateContent={updateContent} brand={brand} slug={slug} />
            ) : siteConfig && activeTab ? (
              <div className="text-sm text-gray-600 space-y-2">
                <p>No dedicated rich editor for section <code className="bg-gray-100 px-1 rounded">{activeTab}</code> yet.</p>
                <p className="text-gray-500">This section is still fully editable via the Raw JSON view (toggle above). Dedicated editors for approved sections (FAQ, services, comparison, etc.) can be added in the future.</p>
              </div>
            ) : (
              <div className="text-gray-500">Select a section to edit.</div>
            )}
          </div>

          <div className="border-t bg-gray-50 px-6 py-3 text-xs text-gray-500 flex items-center justify-between">
            <span>Edits are local until you click Save. Validation runs automatically.</span>
            <button onClick={loadSiteConfig} className="underline hover:no-underline">Reload from disk</button>
          </div>
        </div>

        {/* Preview + Validation + Logs Pane */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
              <span className="font-semibold text-sm">Live Site Preview (real generated output)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewKey((k) => k + 1)}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  title="Reload the real site iframe (use after Generate completes)"
                >
                  ↻ Refresh
                </button>
                <button
                  onClick={() => window.open(`/api/preview/${brand}/${slug}/`, '_blank')}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                  title="Open the real generated site in a new tab"
                >
                  ↗ New tab
                </button>
                <button onClick={() => setShowRawJson(!showRawJson)} className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
                  {showRawJson ? 'Visual' : 'JSON'}
                </button>
              </div>
            </div>
            <div className="p-2 min-h-[320px] max-h-[620px] overflow-hidden bg-gray-100">
              {!showRawJson ? (
                <iframe
                  key={previewKey}
                  src={`/api/preview/${brand}/${slug}/`}
                  title={`Live preview of generated site ${brand}/${slug}`}
                  className="w-full h-[580px] bg-white border border-gray-200 rounded-lg shadow-inner"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                />
              ) : (
                <pre className="text-[10px] font-mono bg-gray-950 text-emerald-400 p-3 rounded overflow-auto max-h-[560px] m-3">
                  {JSON.stringify(siteConfig, null, 2)}
                </pre>
              )}
            </div>
            <div className="px-5 py-2 text-[10px] text-gray-500 border-t bg-gray-50">
              Served from the real built site (<code>sites/{brand}/{slug}/dist/</code>) via proxy with base-path rewriting. Click Generate Site after edits for updates. Assets load through the dev preview handler.
            </div>
          </div>

          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b bg-gray-50 flex items-center gap-2">
              <span className="font-semibold text-sm">Live Validation</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${validation.valid ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {validation.valid ? 'VALID' : 'ISSUES'}
              </span>
              <span className="text-xs text-gray-500 ml-auto">polling every 2.5s</span>
            </div>
            <div className="p-5 text-sm space-y-2 max-h-[180px] overflow-auto">
              {validation.errors.length === 0 && validation.warnings.length === 0 ? (
                <div className="text-emerald-600">✅ No errors or warnings detected.</div>
              ) : (
                <>
                  {validation.errors.map((e, i) => <div key={i} className="text-red-600">• {e}</div>)}
                  {validation.warnings.map((w, i) => <div key={i} className="text-amber-600">⚠ {w}</div>)}
                </>
              )}
            </div>
          </div>

          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b bg-gray-50 flex items-center justify-between">
              <span className="font-semibold text-sm flex items-center gap-2">
                Generation Logs
                {runId && <span className="text-xs font-mono bg-gray-200 px-1.5 rounded">{runId.slice(0, 12)}…</span>}
              </span>
              <button onClick={() => setShowLogs(!showLogs)} className="text-xs underline">{showLogs ? 'Hide' : 'Show'}</button>
            </div>

            {showLogs && (
              <div className="p-4 bg-gray-950 text-emerald-300 text-xs font-mono h-48 overflow-auto whitespace-pre-wrap">
                {generationLogs || 'Click “Generate Site” to start a build and watch live logs here.'}
              </div>
            )}

            <div className="px-5 py-2 text-[11px] text-gray-500 border-t">
              Uses the root generate script. Logs stream via dedicated polling endpoint.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// NOTE: The previous synthetic tab-specific PreviewPane has been replaced by a real <iframe>
// pointing at the actual generated + built site (via /api/preview/... with asset path rewriting).
// This gives an authentic view of the output users will see after `npm run generate`.
