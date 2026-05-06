import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface DeploymentMethod {
  title: string;
  description: string;
}

interface DeploymentSectionProps {
  headline: string;
  methods: DeploymentMethod[];
  videos?: string[];
}

const DeploymentSection = ({ headline, methods, videos }: DeploymentSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-to-use" className="section-padding" style={{ background: '#1a1d29' }}>
      <div className="section-container">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
          {headline}
        </h2>

        {videos && videos.length > 0 ? (
          /* Two-column layout: text left, videos right */
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left: Methods text */}
            <div ref={ref} className="space-y-6">
              {methods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="p-6 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid hsl(var(--accent))' }}
                >
                  <h3 className="font-display text-xl uppercase mb-3 text-white">{method.title}</h3>
                  <p className="font-body text-base text-gray-300 leading-relaxed">{method.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Right: Videos */}
            <div className="space-y-6">
              {videos.map((videoUrl, index) => (
                <div key={index} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={videoUrl}
                    title={`How to Use - Video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* No videos: single column layout */
          <div ref={ref} className="max-w-4xl mx-auto space-y-8">
            {methods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-6 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '4px solid hsl(var(--accent))' }}
              >
                <h3 className="font-display text-xl uppercase mb-3 text-white">{method.title}</h3>
                <p className="font-body text-base text-gray-300 leading-relaxed">{method.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DeploymentSection;
