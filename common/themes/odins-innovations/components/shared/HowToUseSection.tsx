import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Beaker, Droplets, MapPin, ArrowRight } from 'lucide-react';

interface HowToUseSectionProps {
  content: {
    headline: string;
    body?: string;
    beads: string;
    liquid: string;
    beadsImage?: string;
    liquidImage?: string;
    tips?: string[];
  };
}

const HowToUseSection = ({ content }: HowToUseSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-to-use"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--muted))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Application Guide
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {content.headline}
            </h2>
            {content.body && (
              <div className="prose prose-lg max-w-3xl mx-auto">
                <p className="font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {content.body}
                </p>
              </div>
            )}
          </div>
          
          {/* Product Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Beads Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden"
              style={{ 
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              {/* Image Area */}
              <div 
                className="h-48 flex items-center justify-center relative"
                style={{ background: 'hsl(var(--primary) / 0.1)' }}
              >
                {content.beadsImage ? (
                  <img 
                    src={content.beadsImage} 
                    alt="Scent Beads"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-3 flex items-center justify-center"
                      style={{ 
                        background: 'hsl(var(--primary))',
                        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                      }}
                    >
                      <Beaker className="w-10 h-10 text-white" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">
                      <em>Customer image placeholder</em>
                    </span>
                  </div>
                )}
                
                {/* Badge */}
                <div 
                  className="absolute top-4 left-0 px-4 py-2 font-display text-sm font-bold uppercase"
                  style={{ 
                    background: 'hsl(var(--secondary))',
                    color: 'white',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)'
                  }}
                >
                  Best for Stand Sites
                </div>
              </div>

              <div className="p-6">
                <h3 
                  className="font-display text-2xl uppercase mb-4 flex items-center gap-3"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <Beaker className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
                  Scent Beads
                </h3>
                <div className="prose prose-base">
                  <p 
                    className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: content.beads.replace(/\n/g, '<br/>') 
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Liquid Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overflow-hidden"
              style={{ 
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
              }}
            >
              {/* Image Area */}
              <div 
                className="h-48 flex items-center justify-center relative"
                style={{ background: 'hsl(var(--accent) / 0.1)' }}
              >
                {content.liquidImage ? (
                  <img 
                    src={content.liquidImage} 
                    alt="Liquid Scent"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-3 flex items-center justify-center"
                      style={{ 
                        background: 'hsl(var(--accent))',
                        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                      }}
                    >
                      <Droplets className="w-10 h-10 text-white" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">
                      <em>Customer image placeholder</em>
                    </span>
                  </div>
                )}
                
                {/* Badge */}
                <div 
                  className="absolute top-4 left-0 px-4 py-2 font-display text-sm font-bold uppercase"
                  style={{ 
                    background: 'hsl(var(--primary))',
                    color: 'white',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%)'
                  }}
                >
                  Quick Application
                </div>
              </div>

              <div className="p-6">
                <h3 
                  className="font-display text-2xl uppercase mb-4 flex items-center gap-3"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  <Droplets className="w-6 h-6" style={{ color: 'hsl(var(--accent))' }} />
                  Liquid Scent
                </h3>
                <div className="prose prose-base">
                  <p 
                    className="font-body text-muted-foreground leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: content.liquid.replace(/\n/g, '<br/>') 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pro Tips */}
          {content.tips && content.tips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6"
              style={{ 
                background: 'hsl(var(--primary))',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
              }}
            >
              <h4 className="font-display text-xl uppercase text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Pro Tips
              </h4>
              <ul className="space-y-2">
                {content.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 text-white/90">
                    <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                    <span className="font-body text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
