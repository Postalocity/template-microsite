import fs from 'fs';
import path from 'path';

/**
 * Shopify microsites need build:seo (vite build + prerender + shopify.html #root injection).
 */
export function resolveBuildScript(siteDir) {
  const shopifyHtml = path.join(siteDir, 'shopify.html');
  const pkgPath = path.join(siteDir, 'package.json');

  if (!fs.existsSync(shopifyHtml) || !fs.existsSync(pkgPath)) {
    return 'build';
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    if (pkg.scripts?.['build:seo']) {
      return 'build:seo';
    }
  } catch {
    /* fall through */
  }

  return 'build';
}

export function readShopifyPrerenderStatus(siteDir) {
  const shopifyPath = path.join(siteDir, 'shopify.html');
  const configPath = path.join(siteDir, 'config.json');

  if (!fs.existsSync(shopifyPath)) {
    return { shopifyHtmlExists: false, prerenderedBodyInjected: false, shopifyHtmlBytes: 0 };
  }

  const shopifyHtml = fs.readFileSync(shopifyPath, 'utf-8');
  const hasPrerenderedRoot =
    /<div\s+id=["']root["'][^>]*>[\s\S]{100,}/i.test(shopifyHtml) &&
    /how-it-works|Mosquito Control|section-padding/i.test(shopifyHtml);

  let assetJs;
  let assetCss;
  let configInjected = false;

  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      assetJs = config.shopifyAssets?.js;
      assetCss = config.shopifyAssets?.css;
      configInjected = Boolean(config.shopifyAssets?.prerenderedBodyInjected);
    } catch {
      /* ignore */
    }
  }

  return {
    shopifyHtmlExists: true,
    prerenderedBodyInjected: hasPrerenderedRoot || configInjected,
    shopifyHtmlBytes: Buffer.byteLength(shopifyHtml, 'utf8'),
    assetJs,
    assetCss,
  };
}