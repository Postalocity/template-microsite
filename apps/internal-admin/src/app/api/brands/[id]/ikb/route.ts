import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const ikbPath = path.join(process.cwd(), `../../config/ikb/${id}/rules.json`);

  if (!fs.existsSync(ikbPath)) {
    return NextResponse.json({ error: 'IKB not found' }, { status: 404 });
  }

  const data = JSON.parse(fs.readFileSync(ikbPath, 'utf-8'));
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const newRules = await request.json();

  const ikbDir = path.join(process.cwd(), `../../config/ikb/${id}`);
  const ikbPath = path.join(ikbDir, 'rules.json');

  if (!fs.existsSync(ikbDir)) {
    fs.mkdirSync(ikbDir, { recursive: true });
  }

  fs.writeFileSync(ikbPath, JSON.stringify(newRules, null, 2));

  return NextResponse.json({ success: true });
}
