import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

  return (
    <section
      id={sectionId}
      ref={ref}
      className="section-padding bg-section-alt"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {isNewFormat ? (
            // New format: Simple headline + body
            <>
              <h2 className="font-display text-2xl uppercase mb-6 text-center">
                {howItWorks?.headline}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="font-body text-lg leading-relaxed text-muted-foreground">
                  {howItWorks?.body}
                </p>
              </div>
            </>
          ) : (
            // Old format: Section with steps
            <>
              <h2 className="font-display text-2xl uppercase mb-4 text-center">
                {howItWorks?.section?.title}
              </h2>
              {howItWorks?.section?.description && (
                <p className="font-body text-lg text-muted-foreground text-center mb-10">
                  {howItWorks.section.description}
                </p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {howItWorks?.steps?.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-accent/10 border-2 border-accent/20">
                      <span className="font-display text-2xl text-accent">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-body text-base font-bold mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
