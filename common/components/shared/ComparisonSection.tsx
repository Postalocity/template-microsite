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
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {comparison.section.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {comparison.section.description}
          </p>
        </motion.div>

        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="w-full border-collapse bg-card rounded-xl overflow-hidden shadow-card border-2 border-border">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold text-foreground border-b-2 border-r border-border">
                  Feature
                </th>
                <th className="text-center p-4 font-semibold text-destructive border-b-2 border-r border-border w-1/3">
                  {comparison.columns.traditional}
                </th>
                <th className="text-center p-4 font-semibold text-primary border-b-2 w-1/3">
                  {comparison.columns.ourSolution}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => {
                const Icon = getIcon(row.icon);
                return (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30"
                  >
                    <td className="p-4 border-r border-border">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium text-foreground">{row.feature}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center border-r border-border text-muted-foreground">
                      {row.traditionalApproach}
                    </td>
                    <td className="p-4 text-center font-semibold text-primary">
                      {row.ourSolution}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
