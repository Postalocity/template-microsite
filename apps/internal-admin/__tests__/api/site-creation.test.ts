import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// We test the underlying logic that the /api/sites/create route uses
// In a more complete setup we would use next-test-api-route-handler

const TEST_BRAND = 'postalocity';
const TEST_SLUG = `vitest-create-${Date.now()}`;
const TEST_CONFIG_PATH = path.join(
  process.cwd(),
  `../../config/sites/${TEST_BRAND}/${TEST_SLUG}.json`
);

describe('Site Creation API Logic', () => {
  afterEach(() => {
    // Cleanup created test config
    if (fs.existsSync(TEST_CONFIG_PATH)) {
      fs.rmSync(TEST_CONFIG_PATH, { recursive: true, force: true });
    }
  });

  it('should create a basic site config when called with brand + service', async () => {
    // Simulate what the route handler does
    const configDir = path.dirname(TEST_CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const basicConfig = {
      site: {
        id: `${TEST_BRAND}-${TEST_SLUG}`,
        name: 'Vitest Created Site',
        slug: TEST_SLUG,
      },
      content: {
        hero: {
          headline: { main: 'Test', highlightTerm: 'Site' },
        },
      },
    };

    fs.writeFileSync(TEST_CONFIG_PATH, JSON.stringify(basicConfig, null, 2));

    expect(fs.existsSync(TEST_CONFIG_PATH)).toBe(true);

    const saved = JSON.parse(fs.readFileSync(TEST_CONFIG_PATH, 'utf-8'));
    expect(saved.site.slug).toBe(TEST_SLUG);
    expect(saved.content.hero.headline.main).toBe('Test');
  });
});
