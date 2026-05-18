/**
 * Minimal CMS Publish Simulation
 *
 * This script demonstrates exactly how a headless CMS (Payload, Strapi, or custom)
 * would use @microsite/validation to block non-compliant content at publish time.
 *
 * Run with:
 *   npx tsx packages/validation/examples/simulate-cms-publish.ts
 */

import { validatePhrase, validateContentType, initializeValidation } from '../src/index.js';

// Bootstrap the real IKB loader
initializeValidation();

async function simulatePublishAttempt(brandId: string, headline: string, sectionType: string) {
  console.log(`\n=== CMS Publish Attempt ===`);
  console.log(`Brand: ${brandId}`);
  console.log(`Headline: "${headline}"`);
  console.log(`Section Type: ${sectionType}`);

  const phraseResult = await validatePhrase(headline, brandId);
  const typeResult = await validateContentType(sectionType, brandId);

  const allErrors = [...phraseResult.errors, ...typeResult.errors];

  if (allErrors.length > 0) {
    console.log('❌ PUBLISH BLOCKED by IKB validation:');
    allErrors.forEach(e => console.log('  - ' + e));
    return false;
  } else {
    console.log('✅ Publish allowed (content passed IKB + quality rules)');
    return true;
  }
}

async function main() {
  // Good content
  await simulatePublishAttempt(
    'postalocity',
    'Fast, reliable dispute letter mailing with real USPS proof',
    'features'
  );

  // Bad content - will be blocked
  await simulatePublishAttempt(
    'postalocity',
    'The most revolutionary and guaranteed results service in the industry',
    'testimonial'   // also blocklisted content type
  );

  // Another real blocklisted phrase from postalocity IKB
  await simulatePublishAttempt(
    'postalocity',
    'Legally-compliant, defensible proof for your compliance deadlines',
    'hero'
  );
}

main().catch(console.error);
