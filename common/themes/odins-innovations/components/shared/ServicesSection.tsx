import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string; // Image URL only (no more Lucide icons)
}

interface ServicesSectionProps {
  services?: {
    section?: {
      title: string;
      description?: string;
    };
    services?: ServiceItem[];
    items?: ServiceItem[];
  };
}

const isImageUrl = (value?: string): boolean => {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Odin's style SVG for fallback (package/box icon)
const OdinsIconPackage = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 89.87L15.33 69.86V30.08l34.78-19.95 34.56 19.95v39.78L50 89.87z" />
    <path d="M67.33 50.78V40.09L32.76 20.14m-17.43 9.94L50 50.09" />
    <path d="M50 89.87V50.09l34.67-20.01" />
  </svg>
);

const ServiceIcon = ({ icon, title }: { icon?: string; title: string }) => {
  if (icon && isImageUrl(icon)) {
    return <img src={icon} alt={title} className="w-24 h-24 object-contain" loading="lazy" />;
  }

  // Fallback to Odin's style SVG
  return <OdinsIconPackage />;
};

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const sectionTitle = services?.section?.title || "Signature Scent Beads";
  const sectionDesc = services?.section?.description || "Targeted formulas for every phase of the hunt.";
  const items = services?.services || services?.items || [];

  // Default services with Odin's category images instead of Lucide icons
  const defaultServices: ServiceItem[] = [
    { 
      title: "Doe Estrus", 
      description: "Synthetic rut cue for peak-season activity", 
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png?v=1762888380" 
    },
    { 
      title: "Dominant Buck", 
      description: "Territorial challenge scent", 
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png?v=1762888380" 
    },
    { 
      title: "Scrape Blend", 
      description: "Doe Estrus + Dominant Buck combination", 
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Rut_Scents.png?v=1762888380" 
    },
    { 
      title: "Food Scents", 
      description: "Apple, Acorn, Persimmon & Sweet Corn", 
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Food_Scents.png?v=1762888380" 
    },
    { 
      title: "Cover Scents", 
      description: "Earth, Pine & Vanilla to mask human odor", 
      icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/Cover_Scents.png?v=1762888625" 
    },
  ];

  const displayItems = items.length > 0 ? items : defaultServices;

  return (
    <section
      id="products"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--section-alt))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4">
              {sectionTitle}
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              {sectionDesc}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {displayItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="clean-card text-center h-full p-6">
                  {/* Icon - Now uses Odin's category images */}
                  <div 
                    className="mb-6 flex justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    <ServiceIcon icon={item.icon} title={item.title} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base uppercase mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
