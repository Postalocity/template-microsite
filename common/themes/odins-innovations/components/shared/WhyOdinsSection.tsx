import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface WhyOdinsSectionProps {
  content: {
    headline: string;
    body: string;
  };
}

const WhyOdinsSection = ({ content }: WhyOdinsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-odins"
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
          <h2 className="font-display text-2xl uppercase mb-6 text-center">
            {content.headline}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="font-body text-lg leading-relaxed text-muted-foreground">
              {content.body}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyOdinsSection;
