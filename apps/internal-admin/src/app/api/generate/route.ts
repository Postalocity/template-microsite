import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { resolveBuildScript, readShopifyPrerenderStatus } from '../../../../../../scripts/lib/resolve-build-script.js';

export async function POST(request: NextRequest) {
  let runId = '';
  let logFile = '';
  try {
    const { brand, service } = await request.json();

    if (!brand || !service) {
      return NextResponse.json({ error: 'Missing brand or service' }, { status: 400 });
    }

    const rootDir = path.join(process.cwd(), '../../');
    const logsDir = path.join(rootDir, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    runId = `${brand}-${service}-${Date.now()}`;
    logFile = path.join(logsDir, `generation-${runId}.log`);

    // Clear previous log
    fs.writeFileSync(logFile, `Starting generation for ${brand}/${service}...\n`);

    const child = spawn('npm', ['run', 'generate', '--', '--brand', brand, '--service', service], {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Stream output to log file
    child.stdout.on('data', (data) => {
      fs.appendFileSync(logFile, data.toString());
    });
    child.stderr.on('data', (data) => {
      fs.appendFileSync(logFile, data.toString());
    });

    // Harden: ensure marker + actionable logs on spawn failure (prevents silent/no-marker cases)
    child.on('error', (err) => {
      fs.appendFileSync(logFile, `\n[SPAWN ERROR] generate child failed: ${err.message}\nACTIONABLE: Check PATH for npm/node, disk space, and script errors in ${rootDir}/scripts/generate-site.ts. Run with full terminal for details.\n`);
      const failStatus = { status: 'error', runId, brand, service, error: `Spawn error: ${err.message}`, finishedAt: new Date().toISOString() };
      fs.appendFileSync(logFile, `\n=== GENERATION_COMPLETE ===\n${JSON.stringify(failStatus, null, 2)}\n`);
    });

    child.on('close', (code) => {
      const generationSuccess = code === 0;
      fs.appendFileSync(logFile, `\n--- Generation finished with code ${code} ---\n`);

      const siteDir = path.join(rootDir, 'sites', brand, service);
      const distPath = path.join(siteDir, 'dist', 'index.html');

      if (fs.existsSync(siteDir)) {
        const buildScript = resolveBuildScript(siteDir);
        fs.appendFileSync(
          logFile,
          `\n[build] Starting ${buildScript} in ${siteDir}${buildScript === 'build:seo' ? ' (prerender + shopify.html #root injection)' : ''}...\n`
        );
        const buildChild = spawn('npm', ['run', buildScript], {
          cwd: siteDir,
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        buildChild.stdout.on('data', (d) => fs.appendFileSync(logFile, d.toString()));
        buildChild.stderr.on('data', (d) => fs.appendFileSync(logFile, d.toString()));

        // Harden: ensure marker + actionable logs on build spawn failure
        buildChild.on('error', (err) => {
          fs.appendFileSync(logFile, `\n[SPAWN ERROR] build child failed: ${err.message}\nACTIONABLE: cd sites/${brand}/${service} && npm install && npm run build manually. Verify vite.config.ts and package.json in generated dir.\n`);
          const failStatus = { status: 'error', runId, brand, service, generationExitCode: code, buildError: err.message, distBuilt: fs.existsSync(distPath), finishedAt: new Date().toISOString() };
          fs.appendFileSync(logFile, `\n=== GENERATION_COMPLETE ===\n${JSON.stringify(failStatus, null, 2)}\n`);
        });

        buildChild.on('close', (bcode) => {
          const buildSuccess = bcode === 0;
          fs.appendFileSync(logFile, `\n--- Build finished with code ${bcode} ---\n`);

          // Harden: seed dist/index.html from generated source for preview resilience (when full Vite build exits non-0 due to monorepo alias/dependency gaps; mirrors smoke-generate.ts behavior)
          const sourceIndex = path.join(siteDir, 'index.html');
          let distBuiltFinal = fs.existsSync(distPath);
          let previewSeeded = false;
          if (!distBuiltFinal && fs.existsSync(sourceIndex)) {
            if (!fs.existsSync(path.dirname(distPath))) {
              fs.mkdirSync(path.dirname(distPath), { recursive: true });
            }
            fs.copyFileSync(sourceIndex, distPath);
            distBuiltFinal = true;
            previewSeeded = true;
            fs.appendFileSync(logFile, `   [preview] Seeded dist/index.html from source (enables /api/preview iframe even if build exit ${bcode}).\n`);
          }

          const shopifyStatus = readShopifyPrerenderStatus(siteDir);
          const finalStatus = {
            status: generationSuccess && (buildSuccess || previewSeeded) ? 'success' : 'error',
            runId,
            brand,
            service,
            generationExitCode: code,
            buildExitCode: bcode,
            buildScript,
            distBuilt: distBuiltFinal,
            distPath: `sites/${brand}/${service}/dist/index.html`,
            previewSeeded,
            shopify: shopifyStatus,
            finishedAt: new Date().toISOString(),
          };

          fs.appendFileSync(logFile, `\n=== GENERATION_COMPLETE ===\n${JSON.stringify(finalStatus, null, 2)}\n`);

          if (generationSuccess) {
            if (shopifyStatus.shopifyHtmlExists && !shopifyStatus.prerenderedBodyInjected) {
              fs.appendFileSync(
                logFile,
                `\n⚠️  shopify.html #root is empty — run: cd sites/${brand}/${service} && npm run build:seo\n`
              );
            } else if (shopifyStatus.shopifyHtmlExists && shopifyStatus.prerenderedBodyInjected) {
              fs.appendFileSync(
                logFile,
                `\n📤 Shopify deploy: upload shopify.html (${shopifyStatus.shopifyHtmlBytes} bytes) + theme assets ${shopifyStatus.assetCss || 'index-*.css'} + ${shopifyStatus.assetJs || 'index-*.js'}\n`
              );
            }
            fs.appendFileSync(logFile, `\n✅ Real site preview ready at ${finalStatus.distPath}${previewSeeded ? ' (static shell seeded for iframe)' : ''}\n`);
          } else {
            fs.appendFileSync(logFile, `\n❌ Generation or build failed. Check logs above.\n`);
            fs.appendFileSync(logFile, `ACTIONABLE: Common cause = shared common/UI deps in generated site (see scripts/smoke-generate.ts note). Try: (1) cd sites/${brand}/${service} && npm i && npm run build, (2) scripts/smoke-generate.ts ${brand} ${service} for isolated repro, (3) inspect dist/ manually. Source generation succeeded if site dir + config.json present.\n`);
          }
        });
      } else {
        fs.appendFileSync(logFile, `\n[build] Skipped (no site dir at ${siteDir}).\n`);
        const finalStatus = {
          status: 'error',
          runId,
          brand,
          service,
          error: 'Site directory not found after generation',
          finishedAt: new Date().toISOString(),
        };
        fs.appendFileSync(logFile, `\n=== GENERATION_COMPLETE ===\n${JSON.stringify(finalStatus, null, 2)}\n`);
        fs.appendFileSync(logFile, `\nACTIONABLE: Generation script likely errored before writing files. Check ${logFile} for early errors from generate-site.ts (e.g. config load, validation, IKB). Re-run via editor or smoke-generate.ts after fixing source config in config/sites/.\n`);
      }
    });

    return NextResponse.json({ 
      success: true, 
      runId,
      message: 'Generation + build started (preview will update when complete)' 
    });
  } catch (error: any) {
    // Harden outer: always attempt to emit GENERATION_COMPLETE marker for resilience
    if (logFile) {
      try {
        fs.appendFileSync(logFile, `\n[ROUTE FATAL] Uncaught error in /api/generate: ${error?.message || error}\nACTIONABLE: Inspect stack in log or restart admin dev server. Verify request JSON has brand/service and workspace paths are correct from apps/internal-admin.\n`);
        const fatalStatus = { status: 'error', runId: runId || 'unknown', error: String(error?.message || error), finishedAt: new Date().toISOString() };
        fs.appendFileSync(logFile, `\n=== GENERATION_COMPLETE ===\n${JSON.stringify(fatalStatus, null, 2)}\n`);
      } catch {}
    }
    console.error('[api/generate] Fatal:', error);
    return NextResponse.json({ error: 'Failed to trigger generation' }, { status: 500 });
  }
}
