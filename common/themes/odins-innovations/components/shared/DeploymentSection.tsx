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
          /* Two-column layout: text left, video right - video stays within text height */
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start max-w-6xl mx-auto">
            {/* Left: Methods text - 3 columns */}
            <div ref={ref} className="lg:col-span-3 space-y-6">
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

            {/* Right: Video - 2 columns, sticky to stay in view */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              {videos.length === 1 ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={videos[0]}
                    title="How to Use - Video"
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
              ) : (
                <div className="space-y-4">
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
              )}
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
