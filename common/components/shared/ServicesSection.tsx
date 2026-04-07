import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ServicesContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { sanitizeHtml } from "../../utils/sanitize-html";
import { getGridLayoutClasses, getColumnClass, getColumnSpanClass } from "../../utils/grid-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { useFormattedPricing } from "@/utils/pricing";

interface ServicesSectionProps {
  services: ServicesContent;
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const itemCount = services.services.length;
  const gridClasses = getGridLayoutClasses(itemCount);
  const { short, full, withEnvelope } = useFormattedPricing();
  
  // Process text with pricing placeholders
  const processText = (text: string) => {
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short)
      .replace(/\{\{PRICING_ENVELOPE\}\}/g, withEnvelope);
  };

  return (
    <section id="services" className="section-padding bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            dangerouslySetInnerHTML={{ __html: services.section.title }}
          />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {services.section.description}
          </p>
        </motion.div>

        <div className={gridClasses}>
          {services.services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const colStartClass = getColumnClass(i, itemCount);
            const colSpanClass = getColumnSpanClass(itemCount);

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${colStartClass} ${colSpanClass}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription 
                      className="text-sm mt-2"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(processText(service.description)) }}
                    />
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Finishing Options Note */}
        {services.section.finishingNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <p className="text-muted-foreground text-base text-center leading-relaxed">
              {services.section.finishingNote}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
