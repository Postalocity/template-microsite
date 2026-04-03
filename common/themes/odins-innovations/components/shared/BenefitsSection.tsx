import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Leaf, 
  FlaskConical, 
  MapPin,
  PawPrint
} from 'lucide-react';

interface BenefitsSectionProps {
  benefits: {
    section?: {
      title: string;
      description?: string;
    };
    headline?: string;
    items?: Array<{
      icon?: string; // Can be Lucide icon name OR image URL
      title: string;
      description: string;
    }>;
    benefits?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  };
}

// Icon mapping for Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck,
  'clock': Clock,
  'leaf': Leaf,
  'flask': FlaskConical,
  'flask-conical': FlaskConical,
  'map-pin': MapPin,
  'paw': PawPrint,
  'paw-print': PawPrint,
  'shield': ShieldCheck,
};

// Check if icon is an image URL
const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Icon renderer
const BenefitIcon = ({ icon, title }: { icon?: string; title: string }) => {
  if (!icon) {
    // Default icon based on title keywords
    if (title.toLowerCase().includes('legal') || title.toLowerCase().includes('safe')) {
      return <ShieldCheck className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('day') || title.toLowerCase().includes('lasting')) {
      return <Clock className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('bio') || title.toLowerCase().includes('eco')) {
      return <Leaf className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('lab') || title.toLowerCase().includes('consistent')) {
      return <FlaskConical className="w-8 h-8" />;
    }
    return <MapPin className="w-8 h-8" />;
  }

  // If it's an image URL, render as img
  if (isImageUrl(icon)) {
    return (
      <img 
        src={icon} 
        alt="" 
        className="w-10 h-10 object-contain"
        loading="lazy"
      />
    );
  }

  // Try to get Lucide icon
  const LucideIcon = iconMap[icon.toLowerCase()];
  if (LucideIcon) {
    return <LucideIcon className="w-8 h-8" />;
  }

  // Fallback
  return <MapPin className="w-8 h-8" />;
};

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Normalize data - handle both old and new formats
  const sectionTitle = benefits?.section?.title || benefits?.headline || "Why Hunters Choose Odin's";
  const sectionDesc = benefits?.section?.description || "Synthetic scent beads engineered for performance where traditional lures fall short.";
  
  // Get items from either format
  const items = benefits?.benefits || benefits?.items || [];

  // Default benefits if none provided
  const defaultBenefits = [
    { icon: 'shield-check', title: "100% Synthetic — Legal Everywhere", description: "Not subject to natural urine or CWD restrictions. Legal in all 50 states." },
    { icon: 'clock', title: "30+ Days of Continuous Release", description: "Steady attraction that lasts even after rain and through temperature changes." },
    { icon: 'leaf', title: "Biodegradable & Eco-Friendly", description: "Polymer matrix breaks down naturally. No environmental residue." },
    { icon: 'flask', title: "Lab-Consistent Results", description: "Every batch is lab-formulated. No spoilage, no freezing, no variability." },
    { icon: 'map-pin', title: "Made in the USA", description: "Field-tested weather resistance with American manufacturing quality." },
    { icon: 'paw', title: "Works for Multiple Species", description: "Effective for deer, hogs, bears, and elk across all seasons." }
  ];

  const displayItems = items.length > 0 ? items : defaultBenefits;

  return (
    <section
      id="benefits"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
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

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="clean-card h-full">
                  {/* Icon */}
                  <div 
                    className="mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    <BenefitIcon icon={item.icon} title={item.title} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg uppercase mb-2">
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

export default BenefitsSection;
