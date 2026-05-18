'use client';

export default function BenefitsEditor({ content, updateContent }: any) {
  const benefits = content.content?.benefits?.benefits || [];

  const addBenefit = () => {
    const newBenefits = [...benefits, { title: 'New Benefit', detail: '' }];
    updateContent('benefits', { benefits: newBenefits });
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">Benefits</h3>
        <button onClick={addBenefit} className="text-sm text-blue-600">+ Add Benefit</button>
      </div>
      {benefits.map((b: any, i: number) => (
        <div key={i} className="border p-3 rounded mb-2">
          <input value={b.title || ''} onChange={(e) => {
            const newB = [...benefits]; newB[i].title = e.target.value; updateContent('benefits', { benefits: newB });
          }} className="w-full mb-1" placeholder="Benefit title" />
          <textarea value={b.detail || ''} onChange={(e) => {
            const newB = [...benefits]; newB[i].detail = e.target.value; updateContent('benefits', { benefits: newB });
          }} className="w-full text-sm" rows={2} />
        </div>
      ))}
    </div>
  );
}
