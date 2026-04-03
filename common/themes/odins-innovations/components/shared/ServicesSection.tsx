import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Crown, Layers, Nut, Apple, Shield } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon?: string; // Lucide icon name or image URL
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

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'heart': Heart,
  'crown': Crown,
  'layers': Layers,
  'nut': Nut,
  'apple': Apple,
  'shield': Shield,
};

const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

const ServiceIcon = ({ icon, title }: { icon?: string; title: string }) => {
  if (!icon) {
    // Default based on title
    if (title.toLowerCase().includes('estrus')) return <Heart className="w-8 h-8" />;
    if (title.toLowerCase().includes('buck')) return <Crown className="w-8 h-8" />;
    if (title.toLowerCase().includes('scrape')) return <Layers className="w-8 h-8" />;
    if (title.toLowerCase().includes('acorn') || title.toLowerCase().includes('nut')) return <Nut className="w-8 h-8" />;
    if (title.toLowerCase().includes('apple')) return <Apple className="w-8 h-8" />;
    return <Shield className="w-8 h-8" />;
  }

  if (isImageUrl(icon)) {
    return <img src={icon} alt="" className="w-10 h-10 object-contain" loading="lazy" />;
  }

  const LucideIcon = iconMap[icon.toLowerCase()];
  if (LucideIcon) return <LucideIcon className="w-8 h-8" />;

  return <Shield className="w-8 h-8" />;
};

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const sectionTitle = services?.section?.title || "Signature Scent Beads";
  const sectionDesc = services?.section?.description || "Targeted formulas for every phase of the hunt.";
  const items = services?.services || services?.items || [];

  const defaultServices: ServiceItem[] = [
    { title: "Doe Estrus", description: "Synthetic rut cue for peak-season activity", icon: "heart" },
    { title: "Dominant Buck", description: "Territorial challenge scent", icon: "crown" },
    { title: "Whitetail Scrape Blend", description: "Doe Estrus + Dominant Buck combination", icon: "layers" },
    { title: "Acorn", description: "Food-based curiosity attractant", icon: "nut" },
    { title: "Apple", description: "Sweet fruit attractant", icon: "apple" },
    { title: "Earth Cover", description: "Neutral cover scent to mask human odor", icon: "shield" },
  ];

  const displayItems = items.length > 0 ? items : defaultServices;

  return (
    <section
      id="services"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {displayItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="clean-card text-center h-full">
                  {/* Icon */}
                  <div 
                    className="mb-4 flex justify-center transition-transform duration-300 group-hover:scale-110"
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
