import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface BenefitItem {
  icon?: string;
  image?: string;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: {
    section?: {
      title: string;
      description?: string;
    };
    headline?: string;
    items?: Array<string | BenefitItem>;
    benefits?: Array<string | BenefitItem>;
  };
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const rawItems = benefits?.benefits || benefits?.items || [];

  const parsedItems: BenefitItem[] = rawItems.map((item) => {
    if (typeof item === 'string') {
      const parts = item.split('—').map(s => s.trim());
      if (parts.length >= 2) {
        return { title: parts[0], description: parts.slice(1).join(' — ') };
      }
      return { title: item, description: '' };
    }
    return { 
      title: item.title, 
      description: item.description,
      image: item.image,
      icon: item.icon
    };
  });

  // Check if we have images
  const hasImages = parsedItems.some(item => item.image);

  return (
    <section 
      ref={ref}
      id="benefits"
      className="section-padding"
      style={{ background: hasImages ? 'hsl(var(--background))' : 'hsl(220 15% 12%)' }}
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="font-display text-4xl md:text-5xl uppercase mb-4"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {benefits?.headline || benefits?.section?.title || "Why Hunters Choose Odin's"}
          </h2>
          {benefits?.section?.description && (
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {benefits.section.description}
            </p>
          )}
        </motion.div>

        {/* Benefits Grid with Images */}
        {hasImages ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {parsedItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {item.image && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-32 h-32 object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 
                  className="font-display text-xl uppercase mb-2"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Fallback to original text-with-icons style */
          <div id="shopify-section-template--21871768240417__efd9992a-3e38-43a5-b7df-532e3631d5c0" className="shopify-section index-section">
            <div className="text-with-icons" data-section-id="template--21871768240417__efd9992a-3e38-43a5-b7df-532e3631d5c0" data-section-type="text-with-icons">
              <div className="page-width">
                <div className="text-with-icons__blocks has-3-per-row" data-block-count="3">
                  {parsedItems.slice(0, 3).map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="text-with-icons__block text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-with-icons__block-icon">
                        {/* Default icons */}
                        {index === 0 && (
                          <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-tcwi-ribbon" viewBox="0 0 100 100">
                            <path d="M44.18 67.51 30 89.72l-4.44-12.19-12.93 1.1 14.19-22.18a28.86 28.86 0 0 0 13.79 10.08 26.93 26.93 0 0 0 3 .85Zm43.19 11.12-12.93-1.1L70 89.72 55.81 67.51l.63-.13a26.76 26.76 0 0 0 2.94-.85 28.8 28.8 0 0 0 13.8-10.08Z"></path>
                            <path d="M78.92 39.19a28.82 28.82 0 0 1-3.61 14 30 30 0 0 1-1.74 2.73 5 5 0 0 1-.39.52 28.8 28.8 0 0 1-13.79 10.09 26.76 26.76 0 0 1-2.94.85l-.63.13a29 29 0 0 1-11.63 0l-.62-.13a26.93 26.93 0 0 1-3-.85 28.86 28.86 0 0 1-13.75-10.08c-.13-.17-.26-.34-.38-.52q-.93-1.32-1.74-2.73a28.92 28.92 0 1 1 54.22-14Z"></path>
                            <path d="m56.95 42.84 1.63 9.55L50 47.88l-8.58 4.51 1.64-9.55-6.95-6.77 9.6-1.39 4.29-8.7 4.29 8.7 9.6 1.39-6.94 6.77z"></path>
                          </svg>
                        )}
                        {index === 1 && (
                          <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-tcwi-package" viewBox="0 0 100 100">
                            <path d="M50 89.87 15.33 69.86V30.08l34.78-19.95 34.56 19.95v39.78L50 89.87z"></path>
                            <path d="M67.33 50.78V40.09L32.76 20.14m-17.43 9.94L50 50.09"></path>
                            <path d="M50 89.87V50.09l34.67-20.01"></path>
                          </svg>
                        )}
                        {index === 2 && (
                          <svg aria-hidden="true" focusable="false" role="presentation" className="icon icon-tcwi-stopwatch" viewBox="0 0 100 100">
                            <circle cx="60.82" cy="54.12" r="4.26"></circle>
                            <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"></path>
                            <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"></path>
                            <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"></path>
                          </svg>
                        )}
                      </div>
                      <div className="text-with-icons__block-title">
                        <h3>{item.title}</h3>
                      </div>
                      <div className="text-with-icons__block-text">
                        <p>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;
