'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewSitePage() {
  const [brand, setBrand] = useState('postalocity');
  const [service, setService] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, service }),
      });

      if (res.ok) {
        router.push(`/sites/${brand}/${service}`);
      } else {
        alert('Failed to create site');
      }
    } catch (err) {
      alert('Error creating site');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-semibold mb-6">Create New Site</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="postalocity">Postalocity</option>
            <option value="odins-innovations">Odins Innovations</option>
            <option value="broadstroke">Broadstroke</option>
            <option value="promo">Promo</option>
            <option value="techsp">TechSP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Service / Slug</label>
          <input 
            type="text" 
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="e.g. credit-repair"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            This will be used as the URL slug and folder name.
          </p>
        </div>

        <button 
          type="submit"
          disabled={isLoading || !service}
          className="w-full bg-black text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Site & Generate Config'}
        </button>
      </form>
    </div>
  );
}
