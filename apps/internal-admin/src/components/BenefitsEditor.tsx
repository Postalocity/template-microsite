'use client';

import ImageField from './ImageField';

export default function BenefitsEditor({ content, updateContent, brand, slug }: any) {
  // Codex-light support for citronella image-mapped sections (why-odins, layered, blinds use .cards not .benefits)
  // Falls back to generic benefits shape. Reuses ImageField for all.
  // odins-023: extended for broadstroke/promo "services" (image cards + extra fields like href preserved via raw if needed)
  const sectionKeys = ['benefits', 'why-odins', 'layered', 'blinds', 'services'];
  let activeKey = 'benefits';
  let items: any[] = [];
  for (const k of sectionKeys) {
    const c = content.content?.[k];
    if (c) {
      const arr = c.benefits || c.cards || c.items || c.services || [];
      if (arr.length > 0 || c.headline || c.body) { activeKey = k; items = arr; break; }
    }
  }
  if (items.length === 0) {
    // default generic
    items = content.content?.benefits?.benefits || content.content?.why-odins?.cards || content.content?.layered?.cards || content.content?.blinds?.cards || content.content?.services?.services || [];
  }
  const benefits = items; // alias for render

  const addBenefit = () => {
    const newBenefits = [...benefits, { title: 'New Benefit', detail: '' }];
    const patchKey = activeKey === 'benefits' ? 'benefits' : (activeKey === 'services' ? 'services' : 'cards');
    updateContent(activeKey, { [patchKey]: newBenefits });
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">{activeKey === 'benefits' ? 'Benefits' : activeKey.replace(/-/g, ' ').replace(/\b\w/g, c=>c.toUpperCase())}</h3>
        <button onClick={addBenefit} className="text-sm text-blue-600">+ Add Card</button>
      </div>
      {benefits.map((b: any, i: number) => (
        <div key={i} className="border p-3 rounded mb-2 space-y-2">
          <input value={b.title || ''} onChange={(e) => {
            const newB = [...benefits]; newB[i].title = e.target.value;
            const patchKey = activeKey === 'benefits' ? 'benefits' : (activeKey === 'services' ? 'services' : 'cards');
            const patch = { [patchKey]: newB };
            updateContent(activeKey, patch);
          }} className="w-full mb-1" placeholder="Card title" />
          <textarea value={b.description || b.detail || ''} onChange={(e) => {
            const newB = [...benefits]; newB[i].description = e.target.value; if (newB[i].detail) newB[i].detail = e.target.value;
            const patchKey = activeKey === 'benefits' ? 'benefits' : (activeKey === 'services' ? 'services' : 'cards');
            const patch = { [patchKey]: newB };
            updateContent(activeKey, patch);
          }} className="w-full text-sm" rows={2} />
          <ImageField
            label="Image (for card)"
            value={b.image || ''}
            onChange={(newPath) => {
              const newB = [...benefits];
              newB[i] = { ...newB[i], image: newPath };
              const patchKey = activeKey === 'benefits' ? 'benefits' : (activeKey === 'services' ? 'services' : 'cards');
              const patch = { [patchKey]: newB };
              updateContent(activeKey, patch);
            }}
            brand={brand}
            slug={slug}
          />
        </div>
      ))}
    </div>
  );
}
