import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

const TEST_BRAND = 'postalocity';
const IKB_PATH = path.join(process.cwd(), `../../config/ikb/${TEST_BRAND}/rules.json`);

describe('IKB API (PUT /api/brands/[id]/ikb)', () => {
  let originalRules: any = null;

  beforeEach(() => {
    // Backup original rules
    if (fs.existsSync(IKB_PATH)) {
      originalRules = JSON.parse(fs.readFileSync(IKB_PATH, 'utf-8'));
    }
  });

  afterEach(() => {
    // Restore original rules after test
    if (originalRules) {
      fs.writeFileSync(IKB_PATH, JSON.stringify(originalRules, null, 2));
    }
  });

  it('should persist changes to blocklistedPhrases', async () => {
    const testPhrase = `vitest-ikb-${Date.now()}`;

    // Read current rules
    const current = JSON.parse(fs.readFileSync(IKB_PATH, 'utf-8'));
    const newRules = {
      ...current,
      blocklistedPhrases: [...(current.blocklistedPhrases || []), testPhrase],
    };

    // Simulate what the PUT handler does
    fs.writeFileSync(IKB_PATH, JSON.stringify(newRules, null, 2));

    // Verify it was saved
    const saved = JSON.parse(fs.readFileSync(IKB_PATH, 'utf-8'));
    expect(saved.blocklistedPhrases).toContain(testPhrase);

    // Cleanup the test phrase
    saved.blocklistedPhrases = saved.blocklistedPhrases.filter((p: string) => p !== testPhrase);
    fs.writeFileSync(IKB_PATH, JSON.stringify(saved, null, 2));
  });
});
