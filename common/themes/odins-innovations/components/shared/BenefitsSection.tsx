import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Leaf, 
  FlaskConical, 
  MapPin,
  PawPrint,
  Check
} from 'lucide-react';

interface BenefitsSectionProps {
  benefits: {
    section?: {
      title: string;
      description?: string;
    };
    headline?: string;
    items?: Array<string | {
      icon?: string;
      title: string;
      description: string;
    }>;
    benefits?: Array<string | {
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
  'check': Check,
};

// Check if icon is an image URL
const isImageUrl = (value: string): boolean => {
  return value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

// Parse string benefit "Title — Description" into object
const parseStringBenefit = (str: string): { title: string; description: string } => {
  const parts = str.split('—').map(s => s.trim());
  if (parts.length >= 2) {
    return { title: parts[0], description: parts.slice(1).join(' — ') };
  }
  // If no separator, use the whole string as title
  return { title: str, description: '' };
};

// Icon renderer
const BenefitIcon = ({ icon, title }: { icon?: string; title: string }) => {
  // If explicit icon provided
  if (icon) {
    if (isImageUrl(icon)) {
      return <img src={icon} alt="" className="w-10 h-10 object-contain" loading="lazy" />;
    }
    const LucideIcon = iconMap[icon.toLowerCase()];
    if (LucideIcon) return <LucideIcon className="w-8 h-8" />;
  }

  // Default icon based on title keywords
  const titleLower = title?.toLowerCase() || '';
  if (titleLower.includes('legal') || titleLower.includes('safe') || titleLower.includes('usa')) {
    return <ShieldCheck className="w-8 h-8" />;
  }
  if (titleLower.includes('day') || titleLower.includes('lasting') || titleLower.includes('time')) {
    return <Clock className="w-8 h-8" />;
  }
  if (titleLower.includes('bio') || titleLower.includes('eco') || titleLower.includes('green')) {
    return <Leaf className="w-8 h-8" />;
  }
  if (titleLower.includes('lab') || titleLower.includes('consistent') || titleLower.includes('formula')) {
    return <FlaskConical className="w-8 h-8" />;
  }
  return <Check className="w-8 h-8" />;
};

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Normalize data - handle both old and new formats
  const sectionTitle = benefits?.section?.title || benefits?.headline || "Why Hunters Choose Odin's";
  const sectionDesc = benefits?.section?.description || "Synthetic scent beads engineered for performance where traditional lures fall short.";
  
  // Get raw items
  const rawItems = benefits?.benefits || benefits?.items || [];

  // Normalize to object format
  const normalizedItems = rawItems.map((item, index) => {
    if (typeof item === 'string') {
      const parsed = parseStringBenefit(item);
      return {
        key: `benefit-${index}`,
        icon: undefined,
        title: parsed.title,
        description: parsed.description
      };
    }
    return {
      key: `benefit-${index}`,
      icon: item.icon,
      title: item.title,
      description: item.description
    };
  });

  // Default benefits if none provided
  const defaultBenefits = [
    { key: 'default-1', icon: 'shield-check', title: "100% Synthetic — Legal Everywhere", description: "Not subject to natural urine or CWD restrictions. Legal in all 50 states." },
    { key: 'default-2', icon: 'clock', title: "30+ Days of Continuous Release", description: "Steady attraction that lasts even after rain and through temperature changes." },
    { key: 'default-3', icon: 'leaf', title: "Biodegradable & Eco-Friendly", description: "Polymer matrix breaks down naturally. No environmental residue." },
    { key: 'default-4', icon: 'flask', title: "Lab-Consistent Results", description: "Every batch is lab-formulated. No spoilage, no freezing, no variability." },
    { key: 'default-5', icon: 'map-pin', title: "Made in the USA", description: "Field-tested weather resistance with American manufacturing quality." },
    { key: 'default-6', icon: 'paw', title: "Works for Multiple Species", description: "Effective for deer, hogs, bears, and elk across all seasons." }
  ];

  const displayItems = normalizedItems.length > 0 ? normalizedItems : defaultBenefits;

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
                key={item.key}
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
