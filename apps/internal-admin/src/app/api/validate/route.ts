import { NextRequest, NextResponse } from 'next/server';
import { validateSiteContent } from '@microsite/validation';

export async function POST(request: NextRequest) {
  try {
    const { content, brandId } = await request.json();

    if (!content || !brandId) {
      return NextResponse.json({ errors: ['Missing content or brandId'] }, { status: 400 });
    }

    const result = await validateSiteContent(content, brandId);

    const errors = Object.values(result.fieldErrors).flat();

    return NextResponse.json({
      valid: result.valid,
      errors,
      warnings: result.warnings,
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ errors: ['Validation failed'] }, { status: 500 });
  }
}
