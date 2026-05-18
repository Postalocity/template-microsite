import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',   // Use 'node' for API tests (most of our tests are not React component tests)
    globals: true,
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
  },
});