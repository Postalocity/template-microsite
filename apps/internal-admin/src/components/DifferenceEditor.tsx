'use client';

export default function DifferenceEditor({ content, updateContent }: any) {
  const difference = content.content?.difference || { differences: [] };
  const items = difference.differences || [];

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateContent('difference', { differences: newItems });
  };

  const addItem = () => {
    const newItems = [...items, { title: 'New Difference', description: '' }];
    updateContent('difference', { differences: newItems });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">The Difference</h3>
        <button onClick={addItem} className="text-sm text-blue-600">+ Add Difference</button>
      </div>

      {items.map((item: any, i: number) => (
        <div key={i} className="border p-4 rounded mb-3">
          <input
            value={item.title || ''}
            onChange={(e) => updateItem(i, 'title', e.target.value)}
            className="w-full font-medium mb-2 border-b"
            placeholder="Title"
          />
          <textarea
            value={item.description || ''}
            onChange={(e) => updateItem(i, 'description', e.target.value)}
            className="w-full text-sm"
            rows={2}
            placeholder="Description"
          />
        </div>
      ))}
    </div>
  );
}
