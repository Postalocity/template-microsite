import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Leaf, Shield, Clock, Zap, Recycle } from 'lucide-react';

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
const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Default icons for points
const defaultIcons = [
  <Shield className="w-8 h-8" />,
  <Clock className="w-8 h-8" />,
  <Leaf className="w-8 h-8" />,
  <Award className="w-8 h-8" />,
  <Zap className="w-8 h-8" />,
  <Recycle className="w-8 h-8" />
];

const WhyOdinsSection = ({ content }: WhyOdinsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Default points if none provided
  const defaultPoints = [
    {
      title: "Legal in All 50 States",
      description: "100% synthetic formula — not subject to natural urine or CWD restrictions that ban traditional lures."
    },
    {
      title: "30+ Days of Attraction",
      description: "Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads."
    },
    {
      title: "Biodegradable & Safe",
      description: "Polymer matrix breaks down naturally. No environmental residue or contamination."
    },
    {
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
            >
              {content.headline}
            </h2>
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
                  {/* Icon */}
                  <div 
                    className="flex-shrink-0 w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      background: 'hsl(var(--secondary) / 0.1)',
                      color: 'hsl(var(--secondary))',
                      clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)'
                    }}
                  >
                    {point.icon && isImageUrl(point.icon) ? (
                      <img 
                        src={point.icon} 
                        alt="" 
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
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
