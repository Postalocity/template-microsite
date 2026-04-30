import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ServicesContent } from "../../types/content";
import { getIcon } from "../../utils/icons";
import { sanitizeHtml } from "../../utils/sanitize-html";
import { getGridLayoutClasses, getColumnClass, getColumnSpanClass } from "../../utils/grid-layout";
import { useFormattedPricing } from "@/utils/pricing";
import { ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  services: ServicesContent;
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const itemCount = services.services.length;
  const gridClasses = getGridLayoutClasses(itemCount);
  const { short, full, withEnvelope } = useFormattedPricing();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
            const hasImage = !!service.image;
            const hasHref = !!service.href;
            const isHovered = hoveredIndex === i;

            const cardContent = (
              <div 
                className={`relative h-full overflow-hidden rounded-xl group cursor-pointer ${
                  hasImage ? 'aspect-[4/3]' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hasImage ? (
                  <>
                    {/* Image Background */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    
                    {/* Dark Overlay - always visible, darker on hover */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                      isHovered ? 'bg-black/80' : 'bg-black/40'
                    }`} />
                    
                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      {/* Title - always visible at bottom */}
                      <h3 className={`text-xl font-bold text-white mb-2 transition-transform duration-300 ${
                        isHovered ? '-translate-y-2' : ''
                      }`}>
                        {service.title}
                      </h3>
                      
                      {/* Description - visible on hover */}
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isHovered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p 
                          className="text-white/90 text-sm mb-3"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(processText(service.description)) }}
                        />
                        
                        {/* View Products Link */}
                        {hasHref && (
                          <div className="flex items-center gap-2 text-primary font-medium text-sm">
                            <span>View Products</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Fallback to icon card if no image */
                  <div className="h-full bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
                    {/* Logo replaces icon when present */}
                    {service.logo ? (
                      <div className="mb-4">
                        <img
                          src={service.logo.src}
                          alt={service.logo.alt}
                          style={{ height: service.logo.height || 70 }}
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p 
                      className="text-muted-foreground text-sm"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(processText(service.description)) }}
                    />
                    {/* Per-service CTA button */}
                    {service.cta && (
                      <div className="mt-4">
                        <a
                          href={service.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                            service.cta.variant === 'primary'
                              ? 'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90'
                              : 'border-2 border-foreground/30 text-foreground hover:bg-foreground/10'
                          }`}
                        >
                          {service.cta.text}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${colStartClass} ${colSpanClass}`}
              >
                {hasHref ? (
                  <a 
                    href={service.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTAs - support both single cta and ctas array */}
        {(services.section.cta || (services.section.ctas && services.section.ctas.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {/* Single CTA (legacy support) */}
            {services.section.cta && (
              <a
                href={services.section.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {services.section.cta.text}
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            {/* Multiple CTAs array */}
            {services.section.ctas?.map((cta, idx) => (
              <a
                key={idx}
                href={cta.href}
                className={`inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg transition-all shadow-lg ${
                  cta.variant === 'primary' 
                    ? 'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90' 
                    : 'border-2 border-foreground/30 text-foreground hover:bg-foreground/10'
                }`}
              >
                {cta.text}
              </a>
            ))}
          </motion.div>
        )}

        {/* Finishing Options Note */}
        {services.section.finishingNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
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
