# Testing the Internal Admin

## Running Tests

### Vitest (API + Logic)
```bash
npm run test
npm run test:ui          # Vitest UI
```

### Playwright E2E
```bash
npm run test:e2e
npm run test:e2e:ui      # Recommended while writing tests
```

Playwright will automatically start the Next.js dev server.

## Current Test Strategy

- **Vitest**: Used for testing validation logic and any pure functions / API handler logic.
- **Playwright**: Used for end-to-end flows (create site, edit content, see validation errors, IKB editing, generation logs).

## Writing New Tests

### High-Value E2E Flows to Cover
- Site creation + appears in list
- Content editing + live validation feedback
- IKB phrase add/remove + save
- Generation modal shows logs
- Navigation between sections of the editor

### Tips
- Use `Date.now()` for unique slugs when creating test sites.
- The admin currently has no authentication, so tests can navigate directly.
- After creating test sites in E2E, clean them up in `afterAll` or `afterEach` if possible (see `sites.spec.ts` for example).

## Future Improvements
- Add proper API route handler testing with `next-test-api-route-handler`
- Add visual regression tests on the editor preview
- Add auth layer and test protected routes
