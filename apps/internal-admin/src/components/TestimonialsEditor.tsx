'use client';

export default function TestimonialsEditor({ content, updateContent }: any) {
  const testimonials = content.content?.testimonials?.testimonials || [];
  const add = () => updateContent('testimonials', { testimonials: [...testimonials, { quote: '', author: '' }] });

  return (
    <div>
      <div className="flex justify-between mb-3"><h3 className="font-semibold">Testimonials</h3><button onClick={add} className="text-sm text-blue-600">+ Add</button></div>
      {testimonials.map((t: any, i: number) => (
        <div key={i} className="border p-3 mb-2">
          <textarea value={t.quote} onChange={e => { const arr=[...testimonials]; arr[i].quote=e.target.value; updateContent('testimonials',{testimonials:arr}); }} className="w-full" placeholder="Quote"/>
          <input value={t.author} onChange={e => { const arr=[...testimonials]; arr[i].author=e.target.value; updateContent('testimonials',{testimonials:arr}); }} className="w-full mt-1 text-sm" placeholder="Author"/>
        </div>
      ))}
    </div>
  );
}
