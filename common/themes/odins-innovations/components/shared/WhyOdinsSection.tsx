import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface WhyOdinsSectionProps {
  content: {
    headline: string;
    body: string;
    points?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  };
}

// Helper to check if value is an image URL
const isImageUrl = (value?: string): boolean => {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Odin's style SVG icons - Standardized: w-12 h-12 (48px), strokeWidth=3 (matches citronella)
const OdinsIconShield = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <path d="M50 85c15-5 25-20 25-40V25L50 15 25 25v20c0 20 10 35 25 40z" />
    <path d="M35 45l10 10 20-20" />
  </svg>
);

const OdinsIconStopwatch = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <circle cx="60.82" cy="54.12" r="4.26" />
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
  </svg>
);

const OdinsIconFlag = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
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
  </svg>
);

// Beaker/lab flask icon for "Lab-Tested" (replaces ribbon)
const OdinsIconBeaker = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <path d="M30 15h40v5l-8 25v25c0 8-6 15-12 15s-12-7-12-15V45L30 20v-5z" />
    <path d="M30 20h40" strokeOpacity="0.5" />
    <path d="M42 55c0 4 3 8 8 8s8-4 8-8" strokeOpacity="0.6" />
    <circle cx="45" cy="35" r="3" fill="currentColor" fillOpacity="0.3" />
    <circle cx="55" cy="30" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

const OdinsIconRibbon = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <path d="M44.18 67.51L30 89.72l-4.44-12.19-12.93 1.1 14.19-22.18a28.86 28.86 0 0 0 13.79 10.08 26.93 26.93 0 0 0 3 .85Zm43.19 11.12l-12.93-1.1L70 89.72 55.81 67.51l.63-.13a26.76 26.76 0 0 0 2.94-.85 28.8 28.8 0 0 0 13.8-10.08Z" />
    <path d="M78.92 39.19a28.82 28.82 0 0 1-3.61 14 30 30 0 0 1-1.74 2.73 5 5 0 0 1-.39.52 28.8 28.8 0 0 1-13.79 10.09 26.76 26.76 0 0 1-2.94.85l-.63.13a29 29 0 0 1-11.63 0l-.62-.13a26.93 26.93 0 0 1-3-.85 28.86 28.86 0 0 1-13.75-10.08c-.13-.17-.26-.34-.38-.52q-.93-1.32-1.74-2.73a28.92 28.92 0 1 1 54.22-14Z" />
    <path d="m56.95 42.84 1.63 9.55L50 47.88l-8.58 4.51 1.64-9.55-6.95-6.77 9.6-1.39 4.29-8.7 4.29 8.7 9.6 1.39-6.94 6.77z" />
  </svg>
);

const OdinsIconCloud = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <path d="M25 60c-5 0-10-5-10-10s5-10 10-10h5c2-15 15-25 30-20 12 3 20 15 20 25v5h5c8 0 15 7 15 15s-7 15-15 15H25z" />
    <path d="M30 70l-10 10m20-5l-5 15m25-10l5 10" />
  </svg>
);

const OdinsIconPackage = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: '#2d5a3d' }}>
    <path d="M50 89.87L15.33 69.86V30.08l34.78-19.95 34.56 19.95v39.78L50 89.87z" />
    <path d="M67.33 50.78V40.09L32.76 20.14m-17.43 9.94L50 50.09" />
    <path d="M50 89.87V50.09l34.67-20.01" />
  </svg>
);

// Default icons for points (using Odin's SVGs instead of Lucide)
const defaultIcons = [
  <OdinsIconShield key="shield" />,
  <OdinsIconStopwatch key="stopwatch" />,
  // Note: Biodegradable uses image instead of SVG
  <OdinsIconBeaker key="beaker" />,
  <OdinsIconCloud key="cloud" />,
  <OdinsIconPackage key="package" />
];

const WhyOdinsSection = ({ content }: WhyOdinsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Default points if none provided
  const defaultPoints = [
    {
      icon: "flag",
      title: "Legal in All 50 States",
      description: "100% synthetic formula — not subject to natural urine or CWD restrictions that ban traditional lures."
    },
    {
      icon: "stopwatch",
      title: "30+ Days of Attraction",
      description: "Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."
    },
    {
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png",
      title: "Biodegradable & Safe",
      description: "Polymer matrix breaks down naturally. No environmental residue or contamination."
    },
    {
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_field_tested_deer_lure.png",
      title: "Lab-Tested Formula",
      description: "Third-party verified at Mississippi State University for consistent potency."
    }
  ];

  const points = content.points || defaultPoints;

  return (
    <section
      id="why-odins"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
{/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              The Difference
            </span>
<h2 
              className="font-display text-4xl md:text-5xl uppercase mb-6"
              style={{ color: 'hsl(var(--foreground))' }}
              dangerouslySetInnerHTML={{ __html: content.headline.replace(/\n/g, '<br />') }}
            />
            <div className="prose prose-lg max-w-3xl mx-auto">
              <p className="font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {content.body}
              </p>
            </div>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {points.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  background: 'white',
                  borderLeft: '4px solid hsl(var(--secondary))',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon - No background, renders at full size */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {point.icon && isImageUrl(point.icon) ? (
                      <img 
                        src={point.icon} 
                        alt="" 
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    ) : point.icon === 'shield' ? (
                      <OdinsIconShield />
                    ) : point.icon === 'flag' ? (
                      <OdinsIconFlag />
                    ) : point.icon === 'stopwatch' ? (
                      <OdinsIconStopwatch />
                    ) : point.icon === 'beaker' || point.icon === 'flask' || point.icon === 'ribbon' ? (
                      <OdinsIconBeaker />
                    ) : point.icon === 'cloud' ? (
                      <img 
                        src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png" 
                        alt="Weatherproof" 
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    ) : point.icon === 'rainproof' || point.icon === 'weatherproof' || point.icon === 'droplet' ? (
                      <img 
                        src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png" 
                        alt="Rainproof" 
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    ) : point.icon === 'package' ? (
                      <OdinsIconPackage />
                    ) : (
                      defaultIcons[index % defaultIcons.length]
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className="font-display text-lg uppercase mb-2"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {point.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div 
              className="inline-block p-8"
              style={{ 
                background: 'hsl(var(--primary))',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              <p className="font-display text-xl uppercase text-white mb-2">
                Ready to Hunt Smarter?
              </p>
              <p className="font-body text-white/80 text-sm mb-4 pr-6">
                Join thousands of hunters who trust Odin's Innovations
              </p>
              <a
                href="#products"
                className="inline-block px-6 py-3 font-display font-bold uppercase tracking-wide text-sm transition-all duration-300 hover:opacity-90"
                style={{ 
                  background: 'hsl(var(--accent))',
                  color: 'hsl(var(--foreground))'
                }}
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyOdinsSection;
