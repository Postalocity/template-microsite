import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface HowToUseSectionProps {
  content: {
    headline: string;
    beads: string;
    liquid: string;
  };
}

const HowToUseSection = ({ content }: HowToUseSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-to-use"
      ref={ref}
      className="section-padding bg-background"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-2xl uppercase mb-8 text-center">
            {content.headline}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Beads Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="clean-card"
            >
              <h3 className="font-display text-xl uppercase mb-4 text-foreground">
                Scent Beads
              </h3>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                {content.beads}
              </p>
            </motion.div>

            {/* Liquid Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="clean-card"
            >
              <h3 className="font-display text-xl uppercase mb-4 text-foreground">
                Liquid Scent
              </h3>
              <p className="font-body text-base leading-relaxed text-muted-foreground">
                {content.liquid}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
