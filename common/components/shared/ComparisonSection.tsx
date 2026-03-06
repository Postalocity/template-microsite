import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ComparisonContent } from "../../types/content";
import { getIcon } from "../../utils/icons";

interface ComparisonSectionProps {
  comparison: ComparisonContent;
}

const ComparisonSection = ({ comparison }: ComparisonSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="comparison"
      className="section-padding bg-background"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            In-House vs Postalocity Automation
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {comparison.section.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {comparison.rows.map((row, i) => {
            const Icon = getIcon(row.icon);
            return (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border-2 border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    {row.feature}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-destructive/10 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {comparison.columns.traditional}
                    </p>
                    <p className="text-foreground font-semibold">
                      {row.traditionalApproach}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-xs text-primary uppercase tracking-wide mb-1">
                      {comparison.columns.ourSolution}
                    </p>
                    <p className="text-foreground font-semibold">
                      {row.ourSolution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
