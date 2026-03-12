import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ServicesContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { sanitizeHtml } from "../../utils/sanitize-html";
import { getGridLayoutClasses, getColumnClass, getColumnSpanClass } from "../../utils/grid-layout";

interface ServicesSectionProps {
  services: ServicesContent;
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const itemCount = services.services.length;
  const gridClasses = getGridLayoutClasses(itemCount);

  // Force 6-column grid for 7 items
  const forceGridStyle = itemCount === 7 ? {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '1.5rem'
  } : {};

  return (
    <section id="services" className="section-padding bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {services.section.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {services.section.description}
          </p>
        </motion.div>

        <div className={gridClasses} style={forceGridStyle}>
          {services.services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const colStartClass = getColumnClass(i, itemCount);
            const colSpanClass = getColumnSpanClass(itemCount);

            // Force col-span-2 and col-start for 7 items
            // Use explicit start/end lines to ensure consistent widths
            const forceItemStyle = itemCount === 7 ? {
              gridColumn: i === 3 || i === 5 ? '2 / 4' : i === 4 || i === 6 ? '4 / 6' : 'span 2'
            } : {};

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow ${colStartClass} ${colSpanClass}`}
                style={forceItemStyle}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <div
                  className="text-muted-foreground text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
