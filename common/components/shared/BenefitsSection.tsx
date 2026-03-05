import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BenefitsContent } from '../../types/content';

interface BenefitsSectionProps {
  benefits: BenefitsContent;
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="benefits" ref={ref} className="py-24 bg-background/50 border-t border-border" aria-labelledby="benefits-heading">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="benefits-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {benefits.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {benefits.section.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Benefits">
          {benefits.benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-card/50 border-2 border-border hover:border-primary/30 transition-all p-6 rounded-2xl min-h-[280px] flex flex-col"
              role="listitem"
            >
              <div className="text-4xl mb-4" aria-label={benefit.title + ' icon'}>{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-grow">
                {benefit.detail}
              </p>
              {benefit.metrics && (
                <div className="mt-4 text-sm text-primary font-semibold bg-primary/10 inline-block px-3 py-1 rounded-full" aria-label={`Expected result: ${benefit.metrics}`}>
                  {benefit.metrics}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;