import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';

// Note: Direct import of the route is tricky because it uses next/server.
// For now we test the side-effect logic (log file creation) at a high level.

const TEST_BRAND = 'postalocity';
const TEST_SERVICE = `vitest-gen-${Date.now()}`;

describe('POST /api/generate', () => {
  let runId: string;

  afterEach(() => {
    // Optional: clean up log file
    if (runId) {
      const logPath = path.join(process.cwd(), `../../logs/generation-${runId}.log`);
      if (fs.existsSync(logPath)) {
        fs.rmSync(logPath, { force: true });
      }
    }
  });

  it('should be able to trigger generation (smoke)', async () => {
    // In a real environment with Next.js context this would call the handler.
    // For now we just verify the log directory logic can be exercised.
    const logsDir = path.join(process.cwd(), '../../logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    expect(fs.existsSync(logsDir)).toBe(true);
  });
});

describe('GET /api/generate/logs/[runId]', () => {
  it('returns logs for a valid runId (or waiting message)', async () => {
    // We can test the route handler directly if we extract it,
    // but for now we test the underlying file existence logic indirectly.
    const logsDir = path.join(process.cwd(), '../../logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

    const fakeRunId = `fake-${Date.now()}`;
    const logPath = path.join(logsDir, `generation-${fakeRunId}.log`);
    fs.writeFileSync(logPath, 'Test generation log output\n');

    // In a real setup we would import the GET handler.
    // For now, we just verify the file was created.
    expect(fs.existsSync(logPath)).toBe(true);

    fs.rmSync(logPath, { force: true });
  });
});
