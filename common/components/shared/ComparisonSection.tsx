import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ComparisonContent } from "../../types/content";

interface ComparisonSectionProps {
  comparison: ComparisonContent;
}

// Steady, purposeful easing
const easeOutExpo = [0.16, 1, 0.3, 1];
const easeOutQuart = [0.25, 1, 0.5, 1];

const ComparisonSection = ({ comparison }: ComparisonSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="comparison"
      className="section-lg section-alt"
      ref={ref}
    >
      <div className="section-container">
        {/* Section header - rustic, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="max-w-2xl mb-14"
        >
          <p 
            className="text-sm font-bold uppercase-tracked mb-3"
            style={{ color: 'hsl(var(--accent))' }}
          >
            The Difference
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4 text-foreground">
            {comparison.section.title}
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {comparison.section.description}
          </p>
        </motion.div>

        {/* Comparison table - rustic, no rounded corners, no decorative icons */}
        <div className="overflow-x-auto">
          <motion.table 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutQuart }}
            className="w-full border-collapse rustic-table"
          >
            <thead>
              <tr>
                <th 
                  className="text-left font-bold uppercase-tracked text-sm p-5 border-b-2 border-r"
                  style={{ 
                    background: 'hsl(var(--muted) / 0.3)',
                    borderColor: 'hsl(var(--border))',
                    width: '40%'
                  }}
                >
                  Feature
                </th>
                <th 
                  className="text-center font-bold uppercase-tracked text-sm p-5 border-b-2 border-r"
                  style={{ 
                    background: 'hsl(var(--muted) / 0.3)',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--muted-foreground))',
                    width: '30%'
                  }}
                >
                  {comparison.columns.traditional}
                </th>
                <th 
                  className="text-center font-bold uppercase-tracked text-sm p-5 border-b-2"
                  style={{ 
                    background: 'hsl(var(--accent) / 0.1)',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--accent))',
                    width: '30%'
                  }}
                >
                  {comparison.columns.ourSolution}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.05, ease: easeOutQuart }}
                  className="border-b"
                  style={{ borderColor: 'hsl(var(--border))' }}
                >
                  {/* Feature - simple text, no decorative icon */}
                  <td 
                    className="p-5 border-r font-bold"
                    style={{ borderColor: 'hsl(var(--border))' }}
                  >
                    {row.feature}
                  </td>
                  
                  {/* Traditional - muted */}
                  <td 
                    className="p-5 text-center border-r font-body"
                    style={{ 
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--muted-foreground))'
                    }}
                  >
                    {row.traditionalApproach}
                  </td>
                  
                  {/* Our Solution - highlighted */}
                  <td 
                    className="p-5 text-center font-bold font-body"
                    style={{ 
                      color: 'hsl(var(--foreground))',
                      background: 'hsl(var(--accent) / 0.03)'
                    }}
                  >
                    {row.ourSolution}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Bottom note - simple, direct */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8 text-center font-body text-sm"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Synthetic formulation means consistent performance without the variability of natural products.
        </motion.p>
      </div>
    </section>
  );
};

export default ComparisonSection;
