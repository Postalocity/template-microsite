import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: {
    headline: string;
    items: Array<{
      text: string;
      icon?: string; // Image URL or Lucide icon name
    }> | string[];
  };
}

// Helper to check if value is an image URL
const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Icon component that renders image or placeholder
const BenefitIcon = ({ icon, index }: { icon?: string; index: number }) => {
  // Default colored backgrounds for icons without images
  const bgColors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--primary) / 0.8)',
    'hsl(var(--secondary) / 0.8)'
  ];

  if (icon && isImageUrl(icon)) {
    return (
      <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
        <img 
          src={icon} 
          alt="" 
          className="w-10 h-10 object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback to styled div with color
  return (
    <div 
      className="w-16 h-16 flex items-center justify-center"
      style={{ 
        background: bgColors[index % bgColors.length],
        clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)'
      }}
    >
      <span className="text-white font-display text-2xl font-bold">
        {index + 1}
      </span>
    </div>
  );
};

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!benefits?.items || benefits.items.length === 0) {
    return null;
  }

  // Normalize items to object format
  const normalizedItems = benefits.items.map((item, index) => {
    if (typeof item === 'string') {
      return { text: item, icon: undefined };
    }
    return item;
  });

  return (
    <section
      id="benefits"
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
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Proven Performance
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {benefits.headline}
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Laboratory-tested and field-proven for maximum effectiveness
            </p>
          </div>

          {/* Stats Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div 
              className="relative overflow-hidden p-8 md:p-12 text-center"
              style={{ 
                background: 'hsl(var(--primary))',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              {/* Subtle pattern overlay */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-display text-6xl md:text-7xl font-bold leading-none">
                    52%
                  </div>
                  <div className="font-body text-lg md:text-xl opacity-90 mt-2">
                    Active Pheromones <strong>After 27 Days</strong>
                  </div>
                </div>
                <div 
                  className="hidden md:block w-px h-20"
                  style={{ background: 'hsl(var(--accent))' }}
                />
                <div className="text-white/90 text-center md:text-left">
                  <p className="font-body text-sm leading-relaxed max-w-xs">
                    Third-party lab tested at Mississippi State University. Outperforms all competing scent products.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {normalizedItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  background: 'white',
                  borderLeft: '4px solid hsl(var(--accent))',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-105">
                  <BenefitIcon icon={item.icon} index={index} />
                </div>
                <p 
                  className="font-body text-base font-semibold leading-relaxed"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
