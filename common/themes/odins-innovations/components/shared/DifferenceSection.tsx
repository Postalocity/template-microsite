import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sanitizeHtml } from "@/utils/sanitize-html";
import { useBrand, useBrandName } from "@/contexts";
// Use Lucide icons - clean and consistent
import { 
  Shield, 
  Flag, 
  Award, 
  Clock, 
  Leaf, 
  Cloud, 
  CheckCircle, 
  TestTube, 
  Recycle, 
  MapPin, 
  Star, 
  Calendar, 
  Thermometer, 
  Droplets,
  Eye,
  Bug,
  TreeDeciduous,
  ShieldCheck 
} from 'lucide-react';

// Helper to check if value is an image URL (PNG)
const isImageUrl = (value?: string): boolean => {
  return !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));
};

interface DifferenceItem {
  icon?: string;
  title: string;
  description: string;
}

interface DifferenceSectionProps {
  difference?: {
    section?: {
      title?: string;
      description?: string;
    };
    background?: string;
    differences?: DifferenceItem[];
  };
}

// Default differentials for Odin's
const defaultDifferentials = [
  {
    icon: "flag",
    title: "Legal in All 50 States",
    description: "100% synthetic formula — not subject to natural urine or CWD restrictions.",
  },
  {
    icon: "stopwatch",
    title: "30+ Days of Attraction",
    description: "Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads.",
  },
  {
    icon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png",
    title: "Biodegradable & Safe",
    description: "Polymer matrix breaks down naturally. No environmental residue.",
  },
];

// Map icon string names to Lucide components - CONSISTENT MAPPING
const iconMap: Record<string, React.FC> = {
  // Duration/Long-lasting → Clock
  clock: Clock,
  stopwatch: Clock,
  timer: Clock,
  hour: Clock,
  longlasting: Clock,
  duration: Clock,
  
  // Rain/Weather/Water → Droplets
  droplet: Droplets,
  water: Droplets,
  rain: Droplets,
  weather: Droplets,
  wet: Droplets,
  
  // Protection/EPA → ShieldCheck
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  epa: ShieldCheck,
  protection: ShieldCheck,
  registered: ShieldCheck,
  
  // USA/Legal → Flag
  flag: Flag,
  usa: Flag,
  legal: Flag,
  
  // Natural/Eco → Leaf
  leaf: Leaf,
  natural: Leaf,
  biodegradable: Leaf,
  eco: Leaf,
  
  // Verified → CheckCircle
  "check-circle": CheckCircle,
  verified: CheckCircle,
  complete: CheckCircle,
  check: CheckCircle,
  
  // Sensing/Detection → Eye
  eye: Eye,
  sensing: Eye,
  detection: Eye,
  radar: Eye,
  
  // Temperature → Thermometer
  temperature: Thermometer,
  heat: Thermometer,
};

const DifferenceSection = ({ difference }: DifferenceSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  // Get brand config from context
  const ctx = useBrand();
  const brandName = useBrandName();
  const brandDifference = ctx.brand.difference;
  
  // Use config data if available, otherwise fall back to brand defaults
  const hasConfigData = difference?.differences && difference.differences.length > 0;
  const differentials = hasConfigData 
    ? difference!.differences!.map(item => ({
        icon: item.icon || 'shield',
        title: item.title,
        description: item.description,
      }))
    : (brandDifference?.differences?.map(item => ({
        icon: item.icon || 'shield',
        title: item.title,
        description: item.description,
      })) || defaultDifferentials);
      
  // Allow config to override title/description, with brand-aware defaults
  const sectionTitle = difference?.section?.title || brandDifference?.section?.title || `The ${brandName} Difference`;
  const sectionDescription = difference?.section?.description || brandDifference?.section?.description || "Discover why businesses trust our service";

  return (
    <section
      id="difference"
      className="section-padding bg-section-alt"
      ref={ref}
      style={{ backgroundColor: "#333333" }}
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {sectionDescription}
          </p>
        </motion.div>

        {/* Cards with dramatic effects */}
        <div className={`grid md:grid-cols-2 ${differentials.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-8`}>
          {differentials.map((item, i) => {
            const isImage = isImageUrl(item.icon);
            const IconComponent = !isImage ? (iconMap[item.icon || ''] || OdinsIconShield) : null;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="group"
              >
                <div
                  className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 h-full transition-all duration-500 hover:-translate-y-2"
                  style={{
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/0 via-amber-400/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className="relative w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {isImage ? (
                        <img src={item.icon} alt={item.title} className="w-14 h-14 object-contain" loading="lazy" />
                      ) : (
                        IconComponent && <IconComponent />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p
                      className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
                    />
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
