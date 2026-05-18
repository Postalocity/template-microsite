'use client';

export default function PricingEditor({ content, updateContent }: any) {
  const pricing = content.content?.pricing || { tiers: [] };
  return (
    <div>
      <h3 className="font-semibold mb-3">Pricing</h3>
      <p className="text-sm text-gray-500">Basic pricing editor (expand later)</p>
      <pre className="text-xs bg-gray-50 p-2 mt-2">{JSON.stringify(pricing, null, 2)}</pre>
    </div>
  );
}
