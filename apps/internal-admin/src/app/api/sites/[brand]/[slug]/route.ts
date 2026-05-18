import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { brand: string; slug: string } }
) {
  const { brand, slug } = params;
  const sitePath = path.join(process.cwd(), `../../config/sites/${brand}/${slug}.json`);

  if (!fs.existsSync(sitePath)) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 });
  }

  const content = fs.readFileSync(sitePath, 'utf-8');
  return NextResponse.json(JSON.parse(content));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { brand: string; slug: string } }
) {
  const { brand, slug } = params;
  const data = await request.json();

  const configDir = path.join(process.cwd(), `../../config/sites/${brand}`);
  const sitePath = path.join(configDir, `${slug}.json`);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(sitePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}
