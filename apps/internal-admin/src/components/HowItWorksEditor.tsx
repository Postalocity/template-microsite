'use client';

export default function HowItWorksEditor({ content, updateContent }: any) {
  const howItWorks = content.content?.howItWorks || { steps: [] };
  const steps = howItWorks.steps || [];

  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    updateContent('howItWorks', { steps: newSteps });
  };

  const addStep = () => {
    const newSteps = [...steps, { title: 'New Step', description: 'Description here' }];
    updateContent('howItWorks', { steps: newSteps });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">How It Works</h3>
        <button onClick={addStep} className="text-sm px-3 py-1 bg-gray-100 rounded">+ Add Step</button>
      </div>

      {steps.map((step: any, i: number) => (
        <div key={i} className="border p-4 rounded mb-4">
          <input
            value={step.title || ''}
            onChange={(e) => updateStep(i, 'title', e.target.value)}
            className="font-medium w-full border-b mb-2"
            placeholder="Step Title"
          />
          <textarea
            value={step.description || ''}
            onChange={(e) => updateStep(i, 'description', e.target.value)}
            className="w-full text-sm"
            rows={2}
            placeholder="Step description"
          />
        </div>
      ))}
    </div>
  );
}
