import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@microsite/validation'],
  // turbopack.root can be added here once the app is upgraded to Next.js 16+
  // (it fixes monorepo root inference when using `npm exec --workspace` from root).
  // Currently on 15.3.0 the option is not recognized and not required after proper `npm install`.
};

export default nextConfig;