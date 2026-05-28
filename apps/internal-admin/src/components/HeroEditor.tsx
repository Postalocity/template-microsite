'use client';

import ImageField from './ImageField';

export default function HeroEditor({ content, updateContent, brand, slug }: any) {
  const hero = content.content?.hero || {};
  const headline = hero.headline || {};
  const background = hero.background || {};
  const ctas = hero.ctas || [];

  const updateHero = (patch: any) => updateContent('hero', patch);

  const updateHeadline = (hPatch: any) => {
    updateHero({ headline: { ...headline, ...hPatch } });
  };

  const updateBackground = (bPatch: any) => {
    updateHero({ background: { ...background, ...bPatch } });
  };

  const updateCta = (index: number, field: string, value: string) => {
    const newCtas = [...ctas];
    newCtas[index] = { ...newCtas[index], [field]: value };
    updateHero({ ctas: newCtas });
  };

  const addCta = () => {
    const newCtas = [...ctas, { text: 'New Action', href: '#', variant: 'primary' }];
    updateHero({ ctas: newCtas });
  };

  return (
    <div className="space-y-5 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">Hero</h3>
        <span className="text-[10px] uppercase tracking-wide text-gray-400">Core fields</span>
      </div>

      {/* Headline */}
      <div className="border p-4 rounded">
        <div className="font-medium mb-3">Headline</div>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Main</label>
            <input
              value={headline.main || ''}
              onChange={(e) => updateHeadline({ main: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
              placeholder="e.g. Professional Mailing Services"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Highlight Term</label>
            <input
              value={headline.highlightTerm || ''}
              onChange={(e) => updateHeadline({ highlightTerm: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
              placeholder="e.g. Nationwide"
            />
          </div>
        </div>
      </div>

      {/* Subhead */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Subhead</label>
        <textarea
          value={hero.subhead || ''}
          onChange={(e) => updateHero({ subhead: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black resize-y"
          placeholder="Supporting description shown below the headline..."
        />
      </div>

      {/* Background Image — now with reusable upload + preview */}
      <ImageField
        label="Background Image"
        value={background.image || ''}
        onChange={(newPath) => updateBackground({ image: newPath })}
        brand={brand}
        slug={slug}
      />

      {/* CTAs */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">Calls to Action (CTAs)</div>
          <button
            onClick={addCta}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add CTA
          </button>
        </div>

        {ctas.length === 0 && (
          <p className="text-gray-400 text-xs mb-2">No CTAs defined. Add one to get started.</p>
        )}

        {ctas.map((cta: any, i: number) => (
          <div key={i} className="border p-4 rounded mb-3 space-y-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
              <input
                value={cta.text || ''}
                onChange={(e) => updateCta(i, 'text', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-black"
                placeholder="Shop Now"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Link / Href</label>
              <input
                value={cta.href || ''}
                onChange={(e) => updateCta(i, 'href', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-black"
                placeholder="#section or https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Variant</label>
              <select
                value={cta.variant || 'primary'}
                onChange={(e) => updateCta(i, 'variant', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-black bg-white"
              >
                <option value="primary">primary</option>
                <option value="outline">outline</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
