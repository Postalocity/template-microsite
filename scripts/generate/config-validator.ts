import { z } from 'zod';

// Flexible schema that allows brand-specific keys (navigation, ikb, footer, theme, etc.)
export const SiteConfigSchema = z.object({
  site: z.object({
    id: z.string().min(1, 'site.id is required'),
    name: z.string(),
    slug: z.string(),
    domain: z.string().optional(),
    basename: z.string().optional(),
    contact: z
      .object({
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
  }).passthrough(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
  }).passthrough(), // Allow extra SEO keys
  navigation: z.record(z.unknown()).optional(), // Allow navigation object with any structure
  ikb: z.record(z.unknown()).optional(), // Allow IKB config
  footer: z.record(z.unknown()).optional(), // Allow footer config
  theme: z.record(z.unknown()).optional(), // Allow theme config
  branding: z.record(z.unknown()).optional(), // Allow branding config
  content: z.record(z.unknown()).optional(), // Allow content sections
}).passthrough(); // Allow any other brand-specific keys

export type ValidatedSiteConfig = z.infer<typeof SiteConfigSchema>;

export function validateSiteConfig(config: unknown): ValidatedSiteConfig {
  return SiteConfigSchema.parse(config);
}
