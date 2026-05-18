import { CollectionConfig } from 'payload';
import { validateSiteContent, initializeValidation } from '@microsite/validation';

// Make sure the validator is initialized when the CMS starts
initializeValidation();

export const SiteContent: CollectionConfig = {
  slug: 'site-content',
  admin: {
    useAsTitle: 'headline',
  },
  fields: [
    {
      name: 'brandId',
      type: 'text',
      required: true,
      defaultValue: 'postalocity',
      admin: {
        description: 'The brand this content belongs to (used for IKB validation)',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subhead',
      type: 'textarea',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        if (!data) return data;

        const brandId = (data.brandId as string) || 'postalocity';

        const result = await validateSiteContent(data as any, brandId);

        if (!result.valid) {
          // Collect all errors into a readable message
          const allErrors = Object.entries(result.fieldErrors)
            .flatMap(([field, errs]) => errs.map((e) => `${field}: ${e}`))
            .join(' | ');

          throw new Error(`Content failed IKB compliance validation: ${allErrors}`);
        }

        // You can also log warnings for review
        if (result.warnings.length > 0) {
          req.payload.logger.info(`Validation warnings for brand ${brandId}: ${result.warnings.join(', ')}`);
        }

        return data;
      },
    ],
  },
};
