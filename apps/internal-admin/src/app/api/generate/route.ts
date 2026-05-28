import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { brand, service } = await request.json();

    if (!brand || !service) {
      return NextResponse.json({ error: 'Missing brand or service' }, { status: 400 });
    }

    const rootDir = path.join(process.cwd(), '../../');
    const logsDir = path.join(rootDir, 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    const runId = `${brand}-${service}-${Date.now()}`;
    const logFile = path.join(logsDir, `generation-${runId}.log`);

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

    child.on('close', (code) => {
      fs.appendFileSync(logFile, `\n--- Generation finished with code ${code} ---\n`);

      // Chain a production build so that dist/ (used by the real <iframe> preview) is up-to-date.
      // This makes "Generate Site" produce a fully runnable real site preview.
      const siteDir = path.join(rootDir, 'sites', brand, service);
      if (fs.existsSync(siteDir)) {
        fs.appendFileSync(logFile, `\n[build] Starting Vite production build in ${siteDir}...\n`);
        const buildChild = spawn('npm', ['run', 'build'], {
          cwd: siteDir,
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        buildChild.stdout.on('data', (d) => fs.appendFileSync(logFile, d.toString()));
        buildChild.stderr.on('data', (d) => fs.appendFileSync(logFile, d.toString()));
        buildChild.on('close', (bcode) => {
          fs.appendFileSync(logFile, `\n--- Build finished with code ${bcode} ---\n`);
          fs.appendFileSync(logFile, `✅ Real site preview ready at sites/${brand}/${service}/dist/index.html\n`);
        });
      } else {
        fs.appendFileSync(logFile, `\n[build] Skipped (no site dir at ${siteDir}).\n`);
      }
    });

    return NextResponse.json({ 
      success: true, 
      runId,
      message: 'Generation + build started (preview will update when complete)' 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to trigger generation' }, { status: 500 });
  }
}
