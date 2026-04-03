import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Beaker, FileCheck, Microscope } from 'lucide-react';

interface HowItWorksSectionProps {
  howItWorks?: {
    headline?: string;
    body?: string;
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

const HowItWorksSection = ({ howItWorks }: HowItWorksSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Check if using new format (headline + body) or old format (section + steps)
  const isNewFormat = howItWorks?.headline && howItWorks?.body;
  const isOldFormat = howItWorks?.section && howItWorks?.steps && howItWorks.steps.length > 0;

  if (!isNewFormat && !isOldFormat) {
    return null;
  }

  const sectionId = howItWorks?.section?.id || "how-it-works";

  // Lab verification badge component
  const LabBadge = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12 inline-flex items-center gap-3 px-6 py-3"
      style={{ 
        background: 'white',
        border: '2px solid hsl(var(--accent))',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
      }}
    >
      <div 
        className="p-2"
        style={{ background: 'hsl(var(--accent) / 0.2)' }}
      >
        <Microscope className="w-5 h-5" style={{ color: 'hsl(var(--accent))' }} />
      </div>
      <div>
        <div className="font-display text-sm font-bold uppercase" style={{ color: 'hsl(var(--primary))' }}>
          3rd Party Verified
        </div>
        <div className="font-body text-xs text-muted-foreground">
          Mississippi State University Testing
        </div>
      </div>
      <FileCheck className="w-5 h-5 ml-2" style={{ color: 'hsl(var(--secondary))' }} />
    </motion.div>
  );

  // 3-step timeline steps
  const timelineSteps = isNewFormat ? [
    { 
      number: "01", 
      title: "Advanced Formulation", 
      description: "Proprietary biopolymer matrix captures and preserves natural estrous compounds at the molecular level.",
      icon: <Beaker className="w-6 h-6" />
    },
    { 
      number: "02", 
      title: "Weatherproof Protection", 
      description: "Durable shell withstands rain, snow, and extreme temperatures while maintaining scent integrity.",
      icon: <div className="w-6 h-6 flex items-center justify-center font-display font-bold text-lg">❄</div>
    },
    { 
      number: "03", 
      title: "Sustained Release", 
      description: "Gradual diffusion technology releases scent continuously for 30+ days—no reapplication needed.",
      icon: <div className="w-6 h-6 flex items-center justify-center font-display font-bold text-lg">⟳</div>
    }
  ] : howItWorks?.steps?.map((step, idx) => ({
    number: step.number || `0${idx + 1}`,
    title: step.title,
    description: step.description,
    icon: idx === 0 ? <Beaker className="w-6 h-6" /> : 
          idx === 1 ? <div className="w-6 h-6 flex items-center justify-center font-display font-bold text-lg">❄</div> :
          <div className="w-6 h-6 flex items-center justify-center font-display font-bold text-lg">⟳</div>
  })) || [];

  return (
    <section
      id={sectionId}
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
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--secondary) / 0.1)',
                color: 'hsl(var(--secondary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              The Science
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {isNewFormat ? howItWorks?.headline : howItWorks?.section?.title}
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {isNewFormat ? "" : howItWorks?.section?.description}
            </p>
          </div>

          {/* 3-Step Timeline */}
          <div className="relative">
            {/* Timeline connector line */}
            <div 
              className="hidden md:block absolute top-24 left-0 right-0 h-1"
              style={{ 
                background: 'linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)'
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step number circle */}
                  <div 
                    className="relative z-10 w-20 h-20 mx-auto mb-6 flex flex-col items-center justify-center"
                    style={{ 
                      background: 'white',
                      border: `3px solid ${index === 0 ? 'hsl(var(--primary))' : index === 1 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))'}`,
                      clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                    }}
                  >
                    <span 
                      className="font-display text-2xl font-bold"
                      style={{ color: index === 0 ? 'hsl(var(--primary))' : index === 1 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content card */}
                  <div 
                    className="p-6 text-center"
                    style={{ 
                      background: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderTop: `4px solid ${index === 0 ? 'hsl(var(--primary))' : index === 1 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))'}`
                    }}
                  >
                    <div 
                      className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
                      style={{ 
                        background: 'hsl(var(--muted))',
                        color: index === 0 ? 'hsl(var(--primary))' : index === 1 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))',
                        clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 80% 100%, 0 100%, 0 20%)'
                      }}
                    >
                      {step.icon}
                    </div>
                    <h3 
                      className="font-display text-xl uppercase mb-3"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lab Certificate Badge */}
          <div className="text-center">
            <LabBadge />
          </div>

          {/* Full article content (if available) */}
          {isNewFormat && howItWorks?.body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 p-8"
              style={{ 
                background: 'white',
                borderLeft: '4px solid hsl(var(--primary))'
              }}
            >
              <div className="prose prose-lg max-w-none font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {howItWorks.body}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
