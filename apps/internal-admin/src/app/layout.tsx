import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Microsite Admin',
  description: 'Internal management tool for the Microsite Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          {/* Top Navigation */}
          <nav className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="font-semibold text-xl">Microsite Admin</div>
                  <div className="flex items-center gap-6 text-sm">
                    <a href="/brands" className="hover:text-blue-600">Brands</a>
                    <a href="/sites" className="hover:text-blue-600">Sites</a>
                    <a href="/validation" className="hover:text-blue-600">Validation</a>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Internal Tool</div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
