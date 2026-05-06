import { z } from 'zod';

export const SiteConfigSchema = z.object({
  site: z.object({
    id: z.string().min(1, 'site.id is required'),
    name: z.string(),
    slug: z.string(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }),
  content: z.record(z.unknown()).optional(),
});

export type ValidatedSiteConfig = z.infer<typeof SiteConfigSchema>;

export function validateSiteConfig(config: unknown): ValidatedSiteConfig {
  return SiteConfigSchema.parse(config);
}
