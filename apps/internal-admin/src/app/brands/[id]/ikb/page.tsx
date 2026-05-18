'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function IKBEditor() {
  const params = useParams<{ id: string }>();
  const [ikb, setIkb] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testPhrase, setTestPhrase] = useState('');
  const [testResult, setTestResult] = useState('');

  const brandId = params.id;

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/brands/${brandId}/ikb`);
      if (res.ok) {
        const data = await res.json();
        setIkb(data);
      }
      setLoading(false);
    }
    load();
  }, [brandId]);

  const saveIKB = async () => {
    setSaving(true);
    await fetch(`/api/brands/${brandId}/ikb`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ikb),
    });
    setSaving(false);
    alert('IKB saved successfully!');
  };

  const addPhrase = () => {
    const newPhrases = [...(ikb.blocklistedPhrases || []), 'new blocked phrase'];
    setIkb({ ...ikb, blocklistedPhrases: newPhrases });
  };

  const removePhrase = (index: number) => {
    const newPhrases = [...ikb.blocklistedPhrases];
    newPhrases.splice(index, 1);
    setIkb({ ...ikb, blocklistedPhrases: newPhrases });
  };

  const updatePhrase = (index: number, value: string) => {
    const newPhrases = [...ikb.blocklistedPhrases];
    newPhrases[index] = value;
    setIkb({ ...ikb, blocklistedPhrases: newPhrases });
  };

  const testPhraseAgainstRules = async () => {
    if (!testPhrase) return;
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: { test: testPhrase }, brandId }),
    });
    const result = await res.json();
    setTestResult(result.valid ? '✅ Allowed' : `❌ Blocked: ${result.errors?.join(', ')}`);
  };

  if (loading) return <div>Loading IKB...</div>;
  if (!ikb) return <div>IKB not found for this brand.</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">IKB Editor — {brandId}</h1>
        <button 
          onClick={saveIKB} 
          disabled={saving}
          className="px-6 py-2 bg-black text-white rounded-lg"
        >
          {saving ? 'Saving...' : 'Save IKB Rules'}
        </button>
      </div>

      {/* Blocklisted Phrases */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Blocklisted Phrases</h3>
          <button onClick={addPhrase} className="text-sm px-3 py-1 bg-gray-100 rounded">+ Add Phrase</button>
        </div>

        <div className="space-y-2">
          {(ikb.blocklistedPhrases || []).map((phrase: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input 
                value={phrase} 
                onChange={(e) => updatePhrase(i, e.target.value)}
                className="flex-1 border px-3 py-2 rounded text-sm" 
              />
              <button onClick={() => removePhrase(i)} className="text-red-600 px-2">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Sections */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h3 className="font-semibold mb-4">Approved Sections</h3>
        <textarea 
          value={JSON.stringify(ikb.approvedSections || [], null, 2)}
          onChange={(e) => {
            try {
              setIkb({ ...ikb, approvedSections: JSON.parse(e.target.value) });
            } catch {}
          }}
          className="w-full h-40 font-mono text-sm border p-3"
        />
      </div>

      {/* Live Test */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-4">Test Phrase Against Rules</h3>
        <div className="flex gap-3">
          <input 
            value={testPhrase}
            onChange={(e) => setTestPhrase(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Type a phrase to test..."
          />
          <button onClick={testPhraseAgainstRules} className="px-4 py-2 bg-blue-600 text-white rounded">
            Test
          </button>
        </div>
        {testResult && <div className="mt-3 text-sm">{testResult}</div>}
      </div>
    </div>
  );
}

