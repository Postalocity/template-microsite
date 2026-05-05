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
}

const DeploymentSection = ({ headline, methods }: DeploymentSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-to-use" className="section-padding" style={{ background: '#1a1d29' }}>
      <div className="section-container">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-12 text-white text-center">
          {headline}
        </h2>
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
      </div>
    </section>
  );
};

export default DeploymentSection;
