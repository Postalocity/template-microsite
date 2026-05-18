import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">
        Internal management tool for the Microsite Platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/brands" className="block p-6 bg-white border rounded-xl hover:shadow-md transition">
          <div className="font-medium text-lg mb-1">Brands</div>
          <div className="text-gray-500 text-sm">Manage brand configurations and IKB rules</div>
        </Link>

        <Link href="/sites" className="block p-6 bg-white border rounded-xl hover:shadow-md transition">
          <div className="font-medium text-lg mb-1">Sites</div>
          <div className="text-gray-500 text-sm">Create and manage microsites</div>
        </Link>

        <Link href="/validation" className="block p-6 bg-white border rounded-xl hover:shadow-md transition">
          <div className="font-medium text-lg mb-1">Validation</div>
          <div className="text-gray-500 text-sm">Run compliance checks across content</div>
        </Link>
      </div>
    </div>
  );
}
