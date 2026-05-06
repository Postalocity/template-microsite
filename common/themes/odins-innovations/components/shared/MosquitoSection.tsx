import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface MosquitoSectionProps {
  headline: string;
  body: string;
  videoUrl?: string; // YouTube embed URL
}

const MosquitoSection = ({ headline, body, videoUrl = 'https://www.youtube.com/embed/qw00GdekMo8' }: MosquitoSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding" style={{ background: 'hsl(30, 20%, 95%)' }}>
      <div ref={ref} className="section-container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--secondary) / 0.1)',
                color: 'hsl(var(--secondary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Dual Purpose
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4" style={{ color: 'hsl(var(--foreground))' }}>
              {headline}
            </h2>
          </div>
          
          {/* Video + Text Layout */}
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: Text Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div 
                className="p-6 rounded-lg"
                style={{ 
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderLeft: '4px solid hsl(var(--accent))'
                }}
              >
                <div className="mb-4" style={{ color: 'hsl(var(--accent))' }}>
                  {/* Mosquito/Protection icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                {[
                  '30+ days continuous scent release',
                  'Repels mosquitoes & masks human scent',
                  'Weatherproof — rain, snow, or heat',
                  '100% synthetic, legal in all 50 states'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'hsl(var(--secondary))' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-body text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: YouTube Video - 3 columns */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full rounded-xl overflow-hidden shadow-2xl"
                style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title={headline}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </motion.div>
              <p className="text-center text-xs text-muted-foreground mt-3 italic">
                Watch: Field test demonstration of Odin's dual-use protection
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MosquitoSection;
