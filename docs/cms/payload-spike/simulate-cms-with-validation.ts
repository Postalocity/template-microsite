/**
 * Minimal "Payload-like" CMS Simulation using @microsite/validation
 *
 * This shows the exact pattern you would use in a real Payload beforeValidate hook.
 */

import { validateSiteContent, initializeValidation } from '../../../packages/validation/src/index.js';

initializeValidation();

interface PublishAttempt {
  brandId: string;
  content: any;
  description: string;
}

const attempts: PublishAttempt[] = [
  {
    brandId: 'postalocity',
    description: 'Good content',
    content: {
      headline: 'Reliable dispute letter mailing with real proof',
      sections: [{ name: 'features' }, { name: 'faq' }]
    }
  },
  {
    brandId: 'postalocity',
    description: 'Bad content with multiple violations',
    content: {
      headline: 'The most revolutionary service with guaranteed results',
      sections: [{ name: 'testimonial' }]
    }
  }
];

async function run() {
  for (const attempt of attempts) {
    console.log(`\n=== ${attempt.description} ===`);
    const result = await validateSiteContent(attempt.content, attempt.brandId);

    if (result.valid) {
      console.log('✅ Publish would be allowed');
    } else {
      console.log('❌ Publish BLOCKED:');
      Object.entries(result.fieldErrors).forEach(([field, errs]) => {
        errs.forEach(e => console.log(`   - ${field}: ${e}`));
      });
    }
  }
}

run();
