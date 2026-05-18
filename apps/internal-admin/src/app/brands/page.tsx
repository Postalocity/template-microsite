import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface BrandConfig {
  id: string;
  name: string;
  domain: string;
  tagline?: string;
}

async function getBrands(): Promise<BrandConfig[]> {
  const brandsDir = path.join(process.cwd(), '../../config/brands');

  if (!fs.existsSync(brandsDir)) {
    return [];
  }

  const brandFolders = fs.readdirSync(brandsDir).filter((name) => {
    const stat = fs.statSync(path.join(brandsDir, name));
    return stat.isDirectory();
  });

  return brandFolders.map((folder) => {
    const configPath = path.join(brandsDir, folder, 'brand.json');

    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(content);
      return {
        id: config.id || folder,
        name: config.name || folder,
        domain: config.domain || '',
        tagline: config.tagline,
      };
    }

    return {
      id: folder,
      name: folder,
      domain: '',
    };
  });
}

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Brands</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800">
          + New Brand
        </button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Domain</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Tagline</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No brands found in <code>config/brands</code>
                </td>
              </tr>
            )}

            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  <Link href={`/brands/${brand.id}`} className="hover:underline">
                    {brand.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600">{brand.domain}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{brand.tagline || '—'}</td>
                <td className="px-6 py-4">
                  <Link 
                    href={`/brands/${brand.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
