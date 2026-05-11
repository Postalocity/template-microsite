import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowToUseSectionProps {
  content: {
    headline: string;
    subhead?: string;
    video?: string;
    videoLabel?: string;
    steps: Step[];
    fieldNote?: string;
  };
}

const HowToUseSection = ({ content }: HowToUseSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const youtubeEmbedUrl = (() => {
    if (!content.video) return '';
    const url = content.video;
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('watch?v=')) {
      const videoId = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  })();

  return (
    <section
      id="how-to-use"
      ref={ref}
      className="section-padding"
      style={{ background: '#1a1d29' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              Application Guide
            </span>
            <h2
              className="font-display text-4xl md:text-5xl uppercase mb-4 text-white"
              dangerouslySetInnerHTML={{
                __html: content.headline.replace(/\n/g, '<br />'),
              }}
            />
            {content.subhead && (
              <p className="font-body text-lg text-gray-400 max-w-3xl mx-auto">
                {content.subhead}
              </p>
            )}
          </div>

          {/* Two-Panel Layout: Steps Left + Video Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Panel: Numbered Steps */}
            <div className="space-y-0">
              {content.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex gap-5 py-6 group"
                  style={{
                    borderBottom:
                      index < content.steps.length - 1
                        ? '1px solid rgba(255,255,255,0.08)'
                        : 'none',
                  }}
                >
                  {/* Step Number */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'hsl(var(--accent) / 0.15)',
                      color: 'hsl(var(--accent))',
                      border: '2px solid hsl(var(--accent) / 0.3)',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg uppercase text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Field Note */}
              {content.fieldNote && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: content.steps.length * 0.12 + 0.1 }}
                  className="mt-6 p-4 border-l-4"
                  style={{
                    borderColor: 'hsl(var(--accent))',
                    background: 'hsl(var(--accent) / 0.05)',
                  }}
                >
                  <p className="font-body text-sm italic text-gray-400">
                    {content.fieldNote}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Panel: Video */}
            {youtubeEmbedUrl && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-24"
              >
                {content.videoLabel && (
                  <p className="font-display text-sm uppercase tracking-wider mb-3 text-center lg:text-left" style={{ color: 'hsl(var(--accent))' }}>
                    {content.videoLabel}
                  </p>
                )}
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <iframe
                    src={youtubeEmbedUrl}
                    title={content.videoLabel || 'How to Use Odin\'s Attractant Beads'}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
