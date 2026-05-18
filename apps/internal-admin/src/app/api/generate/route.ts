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
    });

    return NextResponse.json({ 
      success: true, 
      runId,
      message: 'Generation started' 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to trigger generation' }, { status: 500 });
  }
}
