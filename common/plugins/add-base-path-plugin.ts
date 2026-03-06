import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function addBasePathPlugin(basePath: string): Plugin {
  const baseClean = basePath.replace(/\/$/, '');

  return {
    name: 'add-base-path-plugin',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && fileName.endsWith('.html')) {
          const html = chunk.source.toString();
          
          // Add base path to all asset references
          const modified = html
            .replace(/src="\/assets\//g, `src="${baseClean}/assets/`)
            .replace(/href="\/assets\//g, `href="${baseClean}/assets/`)
            .replace(/src="\/index-/g, `src="${baseClean}/index-`)
            .replace(/<script type="module" crossorigin src="\//g, `<script type="module" crossorigin src="${baseClean}/`);

          chunk.source = modified;
        }
        if (chunk.type === 'asset' && fileName.endsWith('.css')) {
          const css = chunk.source.toString();
          
          // Add base path to CSS assets
          const modified = css.replace(/url\(['"]?\/assets\//g, `url('${baseClean}/assets/`);
          
          chunk.source = modified;
        }
      }
    }
  };
}