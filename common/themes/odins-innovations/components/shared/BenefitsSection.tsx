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
  background?: string;
}

const benefitIcons = [
  // clock - duration
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
  // Odin's flag - legal/states
  <svg aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d', width: '40px', height: '40px' }}>
    <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1" />
    <path d="M15 35h70M15 45h70M15 55h70M15 65h70" />
    <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="22" cy="32" r="2" fill="currentColor" />
    <circle cx="30" cy="32" r="2" fill="currentColor" />
    <circle cx="38" cy="32" r="2" fill="currentColor" />
    <circle cx="26" cy="38" r="2" fill="currentColor" />
    <circle cx="34" cy="38" r="2" fill="currentColor" />
    <circle cx="22" cy="44" r="2" fill="currentColor" />
    <circle cx="30" cy="44" r="2" fill="currentColor" />
    <circle cx="38" cy="44" r="2" fill="currentColor" />
    <circle cx="26" cy="50" r="2" fill="currentColor" />
    <circle cx="34" cy="50" r="2" fill="currentColor" />
  </svg>,
  // refresh - reduces time
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />,
  // beaker/lab - tested
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />,
  // leaf - biodegradable
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
  // archive/box - shelf life
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
  // fire - performance
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />,
  // bolt - fast acting
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
  // map pin - location
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />,
  // truck - shipping
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.75M3.375 14.25V5.625A1.875 1.875 0 015.25 3.75h9.75a1.875 1.875 0 011.875 1.875v6.375M16.5 14.25h3.375a1.125 1.125 0 011.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H16.5" />,
];

const BenefitsSection = ({ benefits, background }: BenefitsSectionProps) => {
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

  // Only use image-only grid when ALL items have images (like doe-estrus/CWD)
  // Mixed items with some images use the card grid with boxes
  const hasImages = parsedItems.every(item => item.image) && parsedItems.length > 0;

  return (
    <section 
      ref={ref}
      id="benefits"
      className="section-padding"
      style={{ background: background || (hasImages ? 'hsl(var(--background))' : 'hsl(220 15% 12%)') }}
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
          {(benefits?.intro || benefits?.section?.description) && (
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {benefits?.intro || benefits?.section?.description}
            </p>
          )}
        </motion.div>

        {/* Benefits Grid with Images */}
        {hasImages ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {parsedItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md text-center"
              >
                {item.image && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain"
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
                <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Card-grid style */
          <div className="grid md:grid-cols-3 gap-8">
            {parsedItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {item.icon === 'blend' ? (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'hsl(var(--primary))' }}>
                      <circle cx="9" cy="9" r="7" />
                      <circle cx="15" cy="15" r="7" />
                    </svg>
                  ) : item.icon === 'wind-arrow-down' ? (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'hsl(var(--primary))' }}>
                      <path d="M10 2v8" />
                      <path d="M12.8 21.6A2 2 0 1 0 14 18H2" />
                      <path d="M17.5 10a2.5 2.5 0 1 1 2 4H2" />
                      <path d="m6 6 4 4 4-4" />
                    </svg>
                  ) : item.icon === 'eye-off' ? (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'hsl(var(--primary))' }}>
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  ) : item.icon === 'ban' ? (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'hsl(var(--primary))' }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.9 4.9 14.2 14.2" />
                    </svg>
                  ) : item.image ? (
                    <img src={item.image} alt="" className="w-20 h-20 object-contain" loading="lazy" />
                  ) : (
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'hsl(var(--primary))' }}>
                      {benefitIcons[index % benefitIcons.length]}
                    </svg>
                  )}
                </div>
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
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;
