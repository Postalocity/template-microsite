import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Shield, Droplets, Clock } from 'lucide-react';

interface TrustBarSectionProps {
  trustSignals?: Array<{
    icon?: string; // Image URL or Lucide icon name
    text: string;
    subtext?: string;
  }>;
}

// Helper to check if value is an image URL
const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Icon renderer
const TrustIcon = ({ icon, index }: { icon?: string; index: number }) => {
  // Default icons if no image provided
  const defaultIcons = [
    <MapPin className="w-6 h-6" key="map" />,
    <Clock className="w-6 h-6" key="clock" />,
    <Shield className="w-6 h-6" key="shield" />,
    <Droplets className="w-6 h-6" key="droplets" />
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

  // Use Lucide icon or default
  return defaultIcons[index % defaultIcons.length];
};

const TrustBarSection = ({ trustSignals }: TrustBarSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Default trust signals if none provided
  const defaultSignals = [
    { icon: undefined, text: "Made in USA", subtext: "Proudly manufactured" },
    { icon: undefined, text: "30+ Day Release", subtext: "Extended effectiveness" },
    { icon: undefined, text: "CWD-Safe Formula", subtext: "Certified safe" },
    { icon: undefined, text: "Weatherproof", subtext: "All conditions" }
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
