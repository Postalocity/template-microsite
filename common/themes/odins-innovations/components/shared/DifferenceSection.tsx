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
  Wind,
  Waves,
  Activity,
  Zap,
  Bug,
  TreeDeciduous,
  ShieldCheck 
} from 'lucide-react';

// Custom SVG Icon Components - Odin's Brand
const Icon50States = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M15 35h70M15 45h70M15 55h70M15 65h70"/>
    <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="22" cy="32" r="2" fill="currentColor"/>
    <circle cx="30" cy="32" r="2" fill="currentColor"/>
    <circle cx="38" cy="32" r="2" fill="currentColor"/>
    <circle cx="26" cy="38" r="2" fill="currentColor"/>
    <circle cx="34" cy="38" r="2" fill="currentColor"/>
    <circle cx="22" cy="44" r="2" fill="currentColor"/>
    <circle cx="30" cy="44" r="2" fill="currentColor"/>
    <circle cx="38" cy="44" r="2" fill="currentColor"/>
    <circle cx="26" cy="50" r="2" fill="currentColor"/>
    <circle cx="34" cy="50" r="2" fill="currentColor"/>
  </svg>
);

const IconLongLasting = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <circle cx="60.82" cy="54.12" r="4.26"/>
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
  </svg>
);

// Chemistry/Molecule icon for skin chemistry detection (Lactic Acid & Octenol)
const IconChemistry = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
    <circle cx="50" cy="35" r="8" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="35" cy="60" r="6" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="65" cy="60" r="6" fill="currentColor" fillOpacity="0.2"/>
    <path d="M45 42L38 54" />
    <path d="M55 42L62 54" />
    <path d="M41 60H59" />
  </svg>
);

// Custom Rainproof/Raindrop Icon - Odin's Brand
const IconRainproof = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
    <path d="M50 10c-10 20-30 35-30 55 0 20 15 35 30 35s30-15 30-35c0-20-20-35-30-55z" fill="currentColor" fillOpacity="0.1"/>
    <path d="M50 10c-10 20-30 35-30 55 0 20 15 35 30 35s30-15 30-35c0-20-20-35-30-55z" />
    <path d="M40 55c0 10 5 15 10 15s10-5 10-15" />
    <path d="M50 25v15M35 40h30" strokeOpacity="0.5"/>
  </svg>
);

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

// Default differentials for Odin's - USE CUSTOM ICON KEYS
const defaultDifferentials = [
  {
    icon: "50-states",
    title: "Legal in All 50 States",
    description: "100% synthetic formula — not subject to natural urine or CWD restrictions.",
  },
  {
    icon: "longlasting",
    title: "30+ Days of Attraction",
    description: "Continuous scent release, even after rain or snow. Beats traditional 7-14 day beads.",
  },
  {
    icon: "biodegradable",
    title: "Biodegradable & Safe",
    description: "Polymer matrix breaks down naturally. No environmental residue.",
  },
];

// Map icon string names to components or image URLs - CUSTOM BRAND ICONS FIRST
const iconMap: Record<string, React.FC | string> = {
  // 50 States - USE CUSTOM SVG
  "50-states": Icon50States,
  "50states": Icon50States,
  usa: Flag, // Fallback to Lucide if needed
  
  // Long-lasting/Duration - USE CUSTOM SVG
  clock: IconLongLasting,
  stopwatch: IconLongLasting,
  timer: IconLongLasting,
  hour: IconLongLasting,
  longlasting: IconLongLasting,
  duration: IconLongLasting,
  "30days": IconLongLasting,
  "30-days": IconLongLasting,
  
  // Rain/Weather/Water → ALL use Shopify PNG brand asset
  droplet: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  water: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  rain: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  weather: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  wet: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  rainproof: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  weatherproof: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  cloud: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  
  // Protection/EPA → ShieldCheck
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  epa: ShieldCheck,
  protection: ShieldCheck,
  registered: ShieldCheck,
  
  // Legal/flag → Flag (for other uses)
  flag: Flag,
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
  
  // CO2/Sensing/Detection → Wind (represents air/breath/gas detection)
  eye: Wind,
  wind: Wind,
  sensing: Wind,
  detection: Wind,
  co2: Wind,
  carbon: Wind,
  breath: Wind,
  air: Wind,
  
  // Temperature → Thermometer
  temperature: Thermometer,
  heat: Thermometer,
  
  // Insects/Bugs → Bug (Lucide icon for mosquito/insect)
  bug: Bug,
  mosquito: Bug,
  insect: Bug,
  fly: Bug,
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
      className="section-padding"
      ref={ref}
      style={{ background: 'hsl(220 15% 12%)' }}
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
            // Resolve icon from iconMap or use item.icon directly
            const mappedIcon = iconMap[item.icon || ''];
            const iconValue = mappedIcon || item.icon;
            const isImage = typeof iconValue === 'string' && isImageUrl(iconValue);
            const IconComponent = !isImage && typeof iconValue === 'function' ? iconValue : (isImage ? null : Shield);
            

            
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
                        <img src={iconValue as string} alt={item.title} className="w-14 h-14 object-contain" loading="lazy" />
                      ) : (
                        (() => {
                          // Explicit icon rendering to avoid component reference issues
                          // Using default strokeWidth (2) to match custom SVGs throughout theme
                          switch(item.icon) {
                            case 'bug': return <Bug className="w-8 h-8" />;
                            case 'leaf': return <Leaf className="w-8 h-8" />;
                            case 'shield-check': return <ShieldCheck className="w-8 h-8" />;
                            case 'shield': return <Shield className="w-8 h-8" />;
                            case 'wind': return <Wind className="w-8 h-8" />;
                            case 'temperature': return <Thermometer className="w-8 h-8" />;
                            case 'check-circle': return <CheckCircle className="w-8 h-8" />;
                            case 'clock':
                            case '30days':
                              return <IconLongLasting />;
                            case '50-states':
                              return <Icon50States />;
                            case 'chemistry':
                            case 'molecule':
                              return <IconChemistry />;
                            case 'cloud':
                            case 'droplet':
                            case 'water':
                            case 'rain':
                            case 'weather':
                            case 'wet':
                            case 'rainproof':
                            case 'weatherproof':
                              return <img src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png" alt={item.title} className="w-12 h-12 object-contain" loading="lazy" />;
                            default:
                              return <Shield className="w-8 h-8" />;
                          }
                        })()
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
