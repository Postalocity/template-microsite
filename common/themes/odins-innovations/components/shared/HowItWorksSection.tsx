import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface HowItWorksSectionProps {
  howItWorks?: {
    headline?: string;
    body?: string;
    video?: string;
    videoHeadline?: string;
    section?: {
      id?: string;
      title?: string;
      description?: string;
    };
    steps?: Array<{
      number?: string;
      title: string;
      description: string;
    }>;
  };
}

const OdinsIconMicroscope = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-6 h-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="45" cy="35" r="20" />
    <path d="M60 50l25 25M35 55v30M25 85h50" />
    <path d="M50 15v10" />
  </svg>
);

const HowItWorksSection = ({ howItWorks }: HowItWorksSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isNewFormat = howItWorks?.headline && howItWorks?.body;
  const isOldFormat = howItWorks?.section && howItWorks?.steps && howItWorks.steps.length > 0;

  if (!isNewFormat && !isOldFormat) {
    return null;
  }

  const sectionId = howItWorks?.section?.id || "how-it-works";

// 3-step data using Odin's brand PNG icons
  const timelineSteps = [
    { 
      title: "Apply Once", 
      description: "Sprinkle beads in your scrape or hang from a drag. No special equipment needed.",
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_field_tested_deer_lure.png"
    },
    { 
      title: "Weatherproof", 
      description: "Rain and snow don't wash away the scent—they protect it until air exposes it.",
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png"
    },
    { 
      title: "Weeks of Scent", 
      description: "One setup lasts 30+ days. Beats re-scenting every time you hunt.",
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-long-lasting.svg?v=1776361841"
    }
  ];

  return (
    <section
      id={sectionId}
      ref={ref}
      className="section-padding"
      style={{ background: '#f8f9fa' }}
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
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: '#1a1a1a' }}
              dangerouslySetInnerHTML={{ __html: (isNewFormat ? howItWorks?.headline : howItWorks?.section?.title || '').replace(/\n/g, '<br />') }}
            />
            {isNewFormat && howItWorks?.body && (
              <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: '#555' }}>
                {howItWorks.body}
              </p>
            )}
          </div>

          {/* Video Section */}
          {howItWorks?.video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <div className="text-center mb-6">
                <h3 
                  className="font-display text-2xl md:text-3xl uppercase"
                  style={{ color: '#1a1a1a' }}
                >
                  {howItWorks?.videoHeadline || "See How Simple It Is"}
                </h3>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={(() => {
                      const videoUrl = howItWorks.video;
                      if (videoUrl.includes('youtu.be/')) {
                        const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
                        return `https://www.youtube.com/embed/${videoId}`;
                      } else if (videoUrl.includes('watch?v=')) {
                        const videoId = videoUrl.split('watch?v=')[1]?.split('&')[0];
                        return `https://www.youtube.com/embed/${videoId}`;
                      }
                      return videoUrl;
                    })()}
                    title="How to Use Odin's Doe Estrus Scent Beads"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* 3-Step Cards - modeled after BenefitsSection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Icon - same size as BenefitsSection */}
                {step.icon && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={step.icon} 
                      alt={step.title}
                      className={`w-32 h-32 object-contain ${index === 2 ? 'hue-rotate-[70deg] saturate-[1.5]' : ''}`}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 
                  className="font-display text-xl uppercase mb-2"
                  style={{ color: '#1a1a1a' }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm" style={{ color: '#555' }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Verification + Body Section - removed for now */}
          {/* {isNewFormat && howItWorks?.body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 text-center"
              style={{ 
                background: '#f8f9fa',
                border: '1px solid #e5e5e5',
                borderRadius: '12px'
              }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <div 
                  className="p-2"
                  style={{ 
                    background: '#2d5a3d',
                    borderRadius: '8px'
                  }}
                >
                  <OdinsIconMicroscope />
                </div>
                <div className="text-left">
                  <div className="font-display text-sm font-bold uppercase" style={{ color: '#1a1a1a' }}>
                    3rd Party Verified
                  </div>
                  <div className="font-body text-xs" style={{ color: '#2d5a3d' }}>
                    Mississippi State University Testing
                  </div>
                </div>
              </div>
              
              <div className="font-body text-base leading-relaxed max-w-3xl mx-auto" style={{ color: '#1a1a1a' }}>
                {howItWorks.body}
              </div>
            </motion.div>
          )} */}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;