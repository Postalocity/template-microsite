import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  const { runId } = params;
  const rootDir = path.join(process.cwd(), '../../');
  const logFile = path.join(rootDir, 'logs', `generation-${runId}.log`);

  if (!fs.existsSync(logFile)) {
    return NextResponse.json({ logs: 'Waiting for logs...' });
  }

  const logs = fs.readFileSync(logFile, 'utf-8');
  return NextResponse.json({ logs });
}
