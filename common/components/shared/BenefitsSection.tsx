import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BenefitsContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { getGridLayoutClasses, getColumnSpanClass, getColumnClass } from "../../utils/grid-layout";
import { sanitizeHtml } from "../../utils/sanitize-html";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { useFormattedPricing } from "@/utils/pricing";

interface BenefitsSectionProps {
  benefits: BenefitsContent;
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { short, full, withEnvelope } = useFormattedPricing();
  
  // Process text with pricing placeholders - handles undefined safely
  const processText = (text: string | undefined) => {
    if (!text) return '';
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short)
      .replace(/\{\{PRICING_ENVELOPE\}\}/g, withEnvelope);
  };

  // Guard clause for missing data - prevents runtime errors (Codex #7)
  if (!benefits?.section || !benefits?.benefits) {
    return null;
  }

  const itemCount = benefits.benefits.length;
  const gridClasses = getGridLayoutClasses(itemCount);

  // Check if we have image-based benefits
  const hasImageBenefits = benefits.benefits.some(b => b.image);
  const hasIconBenefits = benefits.benefits.some(b => b.icon);

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

        <div className={gridClasses}>
          {benefits.benefits.map((benefit, idx) => {
            const colSpanClass = getColumnSpanClass(itemCount);
            const colClass = getColumnClass(idx, itemCount);

            // Phase 3: Image-based benefit card
            if (benefit.image) {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`${colSpanClass} ${colClass}`}
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={benefit.image}
                          alt={benefit.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      {benefit.description && (
                        <CardDescription className="text-base mt-2">
                          {processText(benefit.description)}
                        </CardDescription>
                      )}
                      {benefit.detail && (
                        <CardDescription className="text-base mt-2 font-medium text-primary/80">
                          {processText(benefit.detail)}
                        </CardDescription>
                      )}
                      {benefit.metrics && (
                        <div className="text-base font-semibold text-primary mt-4">
                          {processText(benefit.metrics)}
                        </div>
                      )}
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            }

            // Phase 3: Icon-based benefit card (original behavior)
            const Icon = benefit.icon ? getIcon(benefit.icon) : null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${colSpanClass} ${colClass}`}
              >
                <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    {Icon && (
                      <div aria-hidden="true" className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    )}
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    {benefit.description && (
                      <CardDescription className="text-base mt-2">
                        {processText(benefit.description)}
                      </CardDescription>
                    )}
                    {benefit.detail && (
                      <CardDescription 
                        className="text-base mt-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(processText(benefit.detail)) }}
                      />
                    )}
                    {benefit.metrics && (
                      <div className="text-base font-semibold text-primary mt-4">
                        {processText(benefit.metrics)}
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Promo Hall Visual Banner - After benefit cards (only for Broadstroke) */}
        {benefits.benefits.length > 0 && benefits.benefits[0].icon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mt-12 group cursor-pointer"
          >
            {/* Background Image - Zoomed and shifted right to crop left edge */}
            <div 
              className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: `url('/promo/images/promo-hall.png')`,
                backgroundPosition: '75% center',
                backgroundSize: '130%'
              }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Visit Our Onsite Promo Showroom
              </h3>
              <p className="text-white/90 text-base md:text-lg max-w-xl mb-6">
                See and touch products before ordering. Team members provide expert recommendations based on your preferences.
              </p>
              <a
                href="https://www.broadstrokepromos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                Browse Products
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;
