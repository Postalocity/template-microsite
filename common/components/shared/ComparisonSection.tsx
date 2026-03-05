import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ComparisonContent } from '../../types/content';

interface ComparisonSectionProps {
  comparison: ComparisonContent;
}

const ComparisonSection = ({ comparison }: ComparisonSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="comparison"
      ref={ref}
      className="py-24 bg-background"
      aria-labelledby="comparison-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="comparison-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {comparison.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {comparison.section.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table
              className="w-full border-collapse min-w-[600px]"
              role="table"
              aria-label="Comparison between ${comparison.columns.ourSolution} and ${comparison.columns.traditional}"
            >
              <thead>
                <tr className="border-b-2 border-border bg-card/50">
                  <th className="text-left p-6 font-semibold text-foreground min-w-[150px]">
                    Feature
                  </th>
                  <th className="text-center p-6 font-semibold text-primary bg-primary/10 min-w-[200px] min-h-[44px]">
                    {comparison.columns.ourSolution}
                  </th>
                  <th className="text-center p-6 font-semibold text-muted-foreground min-w-[200px]">
                    {comparison.columns.traditional}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border hover:bg-card/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-card/20' : ''
                    }`}
                  >
                    <td className="p-6 text-foreground min-w-[150px]">
                      <div className="font-medium">{row.feature}</div>
                    </td>
                    <td className="p-6 min-w-[200px]">
                      <div className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 inline-block min-h-[44px]">
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <Check className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-center">{row.ourSolution}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 min-w-[200px]">
                      <div className="bg-muted/50 border-2 border-border rounded-lg p-4 inline-block opacity-60 min-h-[44px]">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <X className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-center">{row.traditionalApproach}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile scroll hint */}
          <div className="mt-4 text-center md:hidden text-muted-foreground text-sm">
            <span aria-hidden="true">← Swipe to view more →</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;