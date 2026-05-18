import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { validateSiteContent } from '@microsite/validation';

interface SiteInfo {
  brand: string;
  slug: string;
  name: string;
  lastUpdated: string;
  isGenerated: boolean;
  validationStatus: 'valid' | 'warnings' | 'errors' | 'unknown';
}

async function getAllSites(): Promise<SiteInfo[]> {
  const sitesDir = path.join(process.cwd(), '../../config/sites');
  const generatedSitesDir = path.join(process.cwd(), '../../sites');

  if (!fs.existsSync(sitesDir)) return [];

  const brands = fs.readdirSync(sitesDir).filter(name => 
    fs.statSync(path.join(sitesDir, name)).isDirectory()
  );

  const sites: SiteInfo[] = [];

  for (const brand of brands) {
    const brandDir = path.join(sitesDir, brand);
    const files = fs.readdirSync(brandDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const slug = file.replace('.json', '');
      const configPath = path.join(brandDir, file);

      let name = slug;
      let lastUpdated = 'Unknown';

      try {
        const content = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(content);
        name = config.site?.name || slug;

        const stats = fs.statSync(configPath);
        lastUpdated = new Date(stats.mtime).toLocaleDateString();
      } catch (e) {}

      // Check if generated site exists
      const generatedPath = path.join(generatedSitesDir, brand, slug);
      const isGenerated = fs.existsSync(generatedPath);

      // Compute lightweight validation status
      let validationStatus: 'valid' | 'warnings' | 'errors' | 'unknown' = 'unknown';
      try {
        const result = await validateSiteContent({ content: config.content || {} }, brand);
        if (!result.valid) validationStatus = 'errors';
        else if (result.warnings.length > 0) validationStatus = 'warnings';
        else validationStatus = 'valid';
      } catch (e) {
        validationStatus = 'unknown';
      }

      sites.push({
        brand,
        slug,
        name,
        lastUpdated,
        isGenerated,
        validationStatus,
      });
    }
  }

  return sites;
}

export default async function SitesPage() {
  const sites = await getAllSites();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Sites</h1>
        <Link 
          href="/sites/new" 
          className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
        >
          + New Site
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Site Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Brand</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Last Updated</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sites.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No sites found.
                </td>
              </tr>
            )}
            {sites.map((site) => (
              <tr key={`${site.brand}-${site.slug}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  <Link 
                    href={`/sites/${site.brand}/${site.slug}`} 
                    className="hover:underline text-blue-600"
                  >
                    {site.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-600 capitalize">{site.brand}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{site.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {site.isGenerated ? (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700">Generated</span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-700">Draft</span>
                    )}

                    {site.validationStatus === 'valid' && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-100 text-emerald-700">Valid</span>
                    )}
                    {site.validationStatus === 'warnings' && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-100 text-amber-700">Warnings</span>
                    )}
                    {site.validationStatus === 'errors' && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700">Errors</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link 
                    href={`/sites/${site.brand}/${site.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
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
