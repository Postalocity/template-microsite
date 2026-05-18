/**
 * Minimal server entry for the Payload + Microsite Validation example.
 *
 * In a real project you would use Payload's built-in server or Next.js integration.
 */

import { getPayload } from 'payload';
import config from './payload.config';

async function start() {
  const payload = await getPayload({ config });

  console.log('✅ Payload CMS started with @microsite/validation integration');
  console.log('   Validation is active on the SiteContent collection.');

  // Example: You can now create content via the admin or API and it will be validated.
}

start().catch(console.error);