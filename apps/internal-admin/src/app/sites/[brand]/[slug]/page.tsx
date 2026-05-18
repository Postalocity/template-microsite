'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// Simple type for site content
interface SiteContent {
  site?: any;
  seo?: any;
  content?: Record<string, any>;
  [key: string]: any;
}

export default function SiteEditor() {
  const params = useParams<{ brand: string; slug: string }>();
  const [content, setContent] = useState<SiteContent>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState('');
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'howItWorks' | 'testimonials' | 'pricing' | 'benefits' | 'faq'>('hero');

  const brand = params.brand;
  const slug = params.slug;
  const runIdRef = useRef<string | null>(null);

  // Load site
  useEffect(() => {
    async function loadSite() {
      const res = await fetch(`/api/sites/${brand}/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    }
    if (brand && slug) loadSite();
  }, [brand, slug]);

  // Live validation
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!content.content) return;
      try {
        const res = await fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, brandId: brand }),
        });
        const result = await res.json();
        setValidationErrors(result.errors || []);
      } catch (e) {}
    }, 500);
    return () => clearTimeout(timer);
  }, [content, brand]);

  // Generation log polling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showGenerationModal && runIdRef.current) {
      interval = setInterval(async () => {
        const res = await fetch(`/api/generate/logs/${runIdRef.current}`);
        const data = await res.json();
        setGenerationLogs(data.logs || '');
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [showGenerationModal]);

  const updateContent = (section: string, newData: any) => {
    setContent(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: newData
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await fetch(`/api/sites/${brand}/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    setIsSaving(false);
    alert('Saved!');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowGenerationModal(true);
    setGenerationLogs('Starting generation...\n');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand, service: slug }),
    });

    if (res.ok) {
      const data = await res.json();
      runIdRef.current = data.runId;
    } else {
      setGenerationLogs(prev => prev + '\n❌ Failed to start generation');
    }
    setIsGenerating(false);
  };

  // Richer preview (much closer to real generated sites)
  const renderPreview = () => {
    const c = content.content || {};
    return (
      <div className="bg-white border rounded-2xl overflow-hidden text-sm shadow">
        {/* Hero */}
        <div className="bg-zinc-900 text-white p-5">
          <h2 className="text-lg font-semibold leading-tight">
            {c.hero?.headline?.main} <span className="text-amber-400">{c.hero?.headline?.highlightTerm}</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{c.hero?.subhead}</p>
        </div>

        <div className="p-4 space-y-6 bg-white">
          {/* How It Works */}
          {c.howItWorks?.steps?.length > 0 && (
            <div>
              <div className="uppercase text-[10px] tracking-[1px] text-zinc-500 mb-2 font-medium">How It Works</div>
              <div className="space-y-2">
                {c.howItWorks.steps.slice(0, 3).map((step: any, i: number) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i+1}</div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-zinc-500 line-clamp-1">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {c.benefits?.benefits?.length > 0 && (
            <div>
              <div className="uppercase text-[10px] tracking-[1px] text-zinc-500 mb-2 font-medium">Key Benefits</div>
              <ul className="space-y-1 text-xs">
                {c.benefits.benefits.slice(0,4).map((b: any, i: number) => (
                  <li key={i} className="flex gap-2">✓ <span>{b.title}</span></li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonials */}
          {c.testimonials?.testimonials?.length > 0 && (
            <div className="border-l-4 border-zinc-200 pl-3 text-xs italic text-zinc-600">
              “{c.testimonials.testimonials[0].quote?.slice(0, 90)}...” — {c.testimonials.testimonials[0].author}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <a href="/sites" className="text-sm text-blue-600">← Back</a>
          <h1 className="text-3xl font-semibold mt-1">{brand} / {slug}</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleGenerate} disabled={isGenerating} className="px-4 py-2 border rounded-lg">
            {isGenerating ? 'Generating...' : 'Generate Site'}
          </button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-black text-white rounded-lg">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl">
          <div className="font-medium text-red-700">Validation Issues</div>
          <ul className="text-sm mt-2 text-red-600">
            {validationErrors.map((e, i) => <li key={i}>• {e}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Editor Panel */}
        <div className="xl:col-span-3 space-y-6">
          {/* Section Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              'hero', 
              'howItWorks', 
              'benefits', 
              'testimonials', 
              'difference', 
              'pricing', 
              'faq', 
              'trustSignals'
            ].map(sec => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec as any)}
                className={`px-4 py-1.5 text-sm rounded-full border ${activeSection === sec ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Dynamic Section Editors */}
          <div className="bg-white border rounded-2xl p-6">
            {activeSection === 'hero' && <HeroEditor content={content} updateContent={updateContent} />}
            {activeSection === 'howItWorks' && <HowItWorksEditor content={content} updateContent={updateContent} />}
            {activeSection === 'benefits' && <BenefitsEditor content={content} updateContent={updateContent} />}
            {activeSection === 'testimonials' && <TestimonialsEditor content={content} updateContent={updateContent} />}
            {activeSection === 'difference' && <DifferenceEditor content={content} updateContent={updateContent} />}
            {activeSection === 'pricing' && <PricingEditor content={content} updateContent={updateContent} />}
            {activeSection === 'faq' && <FAQEditor content={content} updateContent={updateContent} />}
            {activeSection === 'trustSignals' && <TrustSignalsEditor content={content} updateContent={updateContent} />}
            {/* Add more editors as needed */}
          </div>
        </div>

        {/* Live Preview */}
        <div className="xl:col-span-2">
          <div className="sticky top-6">
            <div className="text-sm font-medium mb-2 text-gray-600">Live Preview</div>
            <div className="border rounded-2xl overflow-hidden shadow-sm">
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>

      {/* Generation Modal with Logs */}
      {showGenerationModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6">
            <h3 className="font-semibold text-xl mb-4">Generation Logs</h3>
            <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded h-80 overflow-auto font-mono whitespace-pre-wrap">
              {generationLogs || 'Waiting for output...'}
            </pre>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowGenerationModal(false)} className="px-4 py-2">
                Close
              </button>
              <a 
                href={`http://localhost:3000`} 
                target="_blank" 
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Open Preview
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple reusable section editors (can be extracted to components later)
function HeroEditor({ content, updateContent }: any) {
  // ... (similar to before, abbreviated for brevity)
  return <div>Hero editor fields...</div>;
}

function HowItWorksEditor({ content, updateContent }: any) {
  const steps = content.content?.howItWorks?.steps || [];
  return (
    <div>
      <h3 className="font-semibold mb-4">How It Works</h3>
      {/* Add / edit steps UI */}
      <button onClick={() => {
        const newSteps = [...steps, { title: 'New Step', description: '' }];
        updateContent('howItWorks', { steps: newSteps });
      }} className="text-sm text-blue-600">+ Add Step</button>
    </div>
  );
}

// Similar simple editors for Testimonials and Pricing...
function TestimonialsEditor({ content, updateContent }: any) { return <div>Testimonials editor</div>; }
function PricingEditor({ content, updateContent }: any) { return <div>Pricing editor</div>; }
