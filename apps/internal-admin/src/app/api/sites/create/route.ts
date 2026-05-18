import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { brand, service } = await request.json();

    if (!brand || !service) {
      return NextResponse.json({ error: 'Missing brand or service' }, { status: 400 });
    }

    const configDir = path.join(process.cwd(), `../../config/sites/${brand}`);
    const siteConfigPath = path.join(configDir, `${service}.json`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Create a basic site config if it doesn't exist
    if (!fs.existsSync(siteConfigPath)) {
      const basicConfig = {
        site: {
          id: `${brand}-${service}`,
          name: service.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          slug: service,
          domain: `${brand}.com`,
          basename: `${brand}-${service}`,
          contact: {
            email: `contact@${brand}.com`,
            phone: '000-000-0000',
            address: '123 Main St, City, ST 00000'
          }
        },
        seo: {
          title: `${service} - ${brand}`,
          description: `Professional ${service} services by ${brand}.`
        },
        navigation: {
          links: [
            { label: 'Benefits', href: '#benefits' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'FAQ', href: '#faq' }
          ]
        },
        content: {
          hero: {
            headline: {
              main: `Professional ${service} Services`,
              highlightTerm: 'Delivered'
            },
            subhead: 'High-quality service with full compliance and tracking.'
          }
        }
      };

      fs.writeFileSync(siteConfigPath, JSON.stringify(basicConfig, null, 2));
    }

    return NextResponse.json({ success: true, brand, service });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 });
  }
}
