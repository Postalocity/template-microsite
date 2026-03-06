import { Plugin } from 'vite';

export function basePathPlugin(basePath: string): Plugin {
  const baseWithoutTrailing = basePath.replace(/\/$/, '');
  const regex = new RegExp(`^${baseWithoutTrailing}(/.*)?`);
  
  return {
    name: 'base-path-plugin',
    configureServer(server) {
      server.middlewares.use((req, anyRes, next) => {
        const res = anyRes as any;
        if (req.url && req.url.startsWith(basePath)) {
          // Rewrite the URL to remove the base path
          if (req.url === baseWithoutTrailing || req.url === baseWithoutTrailing + '/') {
            req.url = '/index.html';
          } else {
            req.url = req.url.replace(regex, '$1');
          }
        }
        next();
      });
    }
  };
}