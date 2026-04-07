import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TrustBarSectionProps {
  trustSignals?: Array<{
    icon?: string; // Image URL or Odin's SVG icon name
    text: string;
    subtext?: string;
  }>;
}

// Helper to check if value is an image URL
const isImageUrl = (value?: string): boolean => {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Odin's style SVG icons (matching BenefitsSection and TrustBadgesSection)
const OdinsIconRibbon = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M44.18 67.51L30 89.72l-4.44-12.19-12.93 1.1 14.19-22.18a28.86 28.86 0 0 0 13.79 10.08 26.93 26.93 0 0 0 3 .85Zm43.19 11.12l-12.93-1.1L70 89.72 55.81 67.51l.63-.13a26.76 26.76 0 0 0 2.94-.85 28.8 28.8 0 0 0 13.8-10.08Z" />
    <path d="M78.92 39.19a28.82 28.82 0 0 1-3.61 14 30 30 0 0 1-1.74 2.73 5 5 0 0 1-.39.52 28.8 28.8 0 0 1-13.79 10.09 26.76 26.76 0 0 1-2.94.85l-.63.13a29 29 0 0 1-11.63 0l-.62-.13a26.93 26.93 0 0 1-3-.85 28.86 28.86 0 0 1-13.75-10.08c-.13-.17-.26-.34-.38-.52q-.93-1.32-1.74-2.73a28.92 28.92 0 1 1 54.22-14Z" />
    <path d="m56.95 42.84 1.63 9.55L50 47.88l-8.58 4.51 1.64-9.55-6.95-6.77 9.6-1.39 4.29-8.7 4.29 8.7 9.6 1.39-6.94 6.77z" />
  </svg>
);

const OdinsIconStopwatch = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="60.82" cy="54.12" r="4.26" />
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
  </svg>
);

const OdinsIconShield = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 85c15-5 25-20 25-40V25L50 15 25 25v20c0 20 10 35 25 40z" />
    <path d="M35 45l10 10 20-20" />
  </svg>
);

const OdinsIconPackage = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 89.87L15.33 69.86V30.08l34.78-19.95 34.56 19.95v39.78L50 89.87z" />
    <path d="M67.33 50.78V40.09L32.76 20.14m-17.43 9.94L50 50.09" />
    <path d="M50 89.87V50.09l34.67-20.01" />
  </svg>
);

// Map icon names to components
const iconMap: Record<string, React.FC> = {
  ribbon: OdinsIconRibbon,
  stopwatch: OdinsIconStopwatch,
  shield: OdinsIconShield,
  package: OdinsIconPackage,
};

// Icon renderer
const TrustIcon = ({ icon, index }: { icon?: string; index: number }) => {
  // Default icons if no image provided (using Odin's SVGs)
  const defaultIcons = [
    <OdinsIconRibbon key="ribbon" />,
    <OdinsIconStopwatch key="stopwatch" />,
    <OdinsIconShield key="shield" />,
    <OdinsIconPackage key="package" />
  ];

  if (icon && isImageUrl(icon)) {
    return (
      <img 
        src={icon} 
        alt="" 
        className="w-6 h-6 object-contain"
        loading="lazy"
      />
    );
  }

  // Use named Odin's icon if provided
  if (icon && iconMap[icon]) {
    const IconComponent = iconMap[icon];
    return <IconComponent />;
  }

  // Use default Odin's icons
  return defaultIcons[index % defaultIcons.length];
};

const TrustBarSection = ({ trustSignals }: TrustBarSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Default trust signals if none provided
  const defaultSignals = [
    { icon: "ribbon", text: "Made in USA", subtext: "Proudly manufactured" },
    { icon: "stopwatch", text: "30+ Day Release", subtext: "Extended effectiveness" },
    { icon: "shield", text: "CWD-Safe Formula", subtext: "Certified safe" },
    { icon: "package", text: "Weatherproof", subtext: "All conditions" }
  ];

  const signals = trustSignals && trustSignals.length > 0 ? trustSignals : defaultSignals;

  return (
    <section
      id="trust-bar"
      ref={ref}
      className="py-6 border-y-2"
      style={{ 
        background: 'hsl(var(--background))',
        borderColor: 'hsl(var(--accent))'
      }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div 
                className="p-2 flex-shrink-0"
                style={{ 
                  background: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))',
                  clipPath: 'polygon(25% 0, 100% 0, 100% 75%, 75% 100%, 0 100%, 0 25%)'
                }}
              >
                <TrustIcon icon={signal.icon} index={index} />
              </div>
              <div>
                <span 
                  className="font-display text-sm font-bold uppercase tracking-wide"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {signal.text}
                </span>
                {signal.subtext && (
                  <p className="font-body text-xs text-muted-foreground hidden sm:block">
                    {signal.subtext}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBarSection;
