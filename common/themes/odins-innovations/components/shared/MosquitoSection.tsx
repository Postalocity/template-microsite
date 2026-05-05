import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface MosquitoSectionProps {
  headline: string;
  body: string;
}

const MosquitoSection = ({ headline, body }: MosquitoSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding" style={{ background: 'hsl(var(--muted))' }}>
      <div ref={ref} className="section-container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-lg text-center"
          style={{ background: 'rgba(255,255,255,0.8)', border: '2px solid hsl(var(--accent))' }}
        >
          <div className="mb-4" style={{ color: 'hsl(var(--accent))' }}>
            {/* Mosquito icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-6 text-foreground">
            {headline}
          </h2>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">
            {body}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MosquitoSection;
