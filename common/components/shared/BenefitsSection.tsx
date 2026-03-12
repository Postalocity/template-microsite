import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BenefitsContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { getGridClasses, getItemClasses } from "../../utils/grid-layout";

interface BenefitsSectionProps {
  benefits: BenefitsContent;
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Guard clause for missing data - prevents runtime errors (Codex #7)
  if (!benefits?.section || !benefits?.benefits) {
    return null;
  }

  const itemCount = benefits.benefits.length;

  return (
    <section id="benefits" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {benefits.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {benefits.section.description}
          </p>
        </motion.div>

        <div className={`${getGridClasses(itemCount)} gap-6 mb-12`}>
          {benefits.benefits.map((benefit, idx) => {
            const Icon = getIcon(benefit.icon);
            const itemClasses = getItemClasses(idx, itemCount);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-card rounded-xl p-8 border-2 border-border hover:border-primary/50 transition-colors ${itemClasses}`}
              >
                <div aria-hidden="true" className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {benefit.detail}
                </p>
                {benefit.metrics && (
                  <div className="text-base font-semibold text-primary">
                    {benefit.metrics}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
