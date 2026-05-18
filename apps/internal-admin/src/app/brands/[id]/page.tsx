import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

async function getBrand(id: string) {
  const brandPath = path.join(process.cwd(), `../../config/brands/${id}/brand.json`);

  if (!fs.existsSync(brandPath)) {
    return null;
  }

  const content = fs.readFileSync(brandPath, 'utf-8');
  return JSON.parse(content);
}

export default async function BrandDetailPage({ params }: { params: { id: string } }) {
  const brand = await getBrand(params.id);

  if (!brand) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <a href="/brands" className="text-sm text-blue-600 hover:underline">← Back to Brands</a>
      </div>

      <h1 className="text-3xl font-semibold mb-1">{brand.name}</h1>
      <p className="text-gray-500 mb-8">{brand.domain}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-medium mb-4">Brand Information</h2>
          <pre className="text-sm bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(brand, null, 2)}
          </pre>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-medium mb-4">Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
              Edit Brand Config
            </button>
            <button className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
              View IKB Rules
            </button>
            <button className="w-full px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
              Create New Site for {brand.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
