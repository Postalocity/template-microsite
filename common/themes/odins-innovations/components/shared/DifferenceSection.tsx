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
  ShieldCheck,
  FlaskConicalOff,
  Biohazard,
  MilkOff 
} from 'lucide-react';

// Custom SVG Icon Components - Odin's Brand
// Custom SVG icon size: w-16 h-16 (64px) with strokeWidth="2" - no background container
const Icon50States = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16" style={{ color: '#2d5a3d' }}>
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

// Custom SVG icon size: w-16 h-16 (64px) with strokeWidth="2"
const IconLongLasting = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16" style={{ color: '#2d5a3d' }}>
    <circle cx="60.82" cy="54.12" r="4.26"/>
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4"/>
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84"/>
  </svg>
);

// Chemistry/Molecule icon for skin chemistry detection (Lactic Acid & Octenol)
const IconChemistry = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16" style={{ color: '#2d5a3d' }}>
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
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16" style={{ color: '#2d5a3d' }}>
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
  
  // USDA BioPreferred / ribbon → Shopify PNG brand asset
  ribbon: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png?v=1775508337",
  biopreferred: "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png?v=1775508337",
  "usda-bio": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png?v=1775508337",
  
  // Protection/EPA → ShieldCheck
  shield: ShieldCheck,
  "shield-check": ShieldCheck,
  epa: ShieldCheck,
  protection: ShieldCheck,
  registered: ShieldCheck,
  
  // No toxic chemicals → FlaskConicalOff
  "flask-conical-off": FlaskConicalOff,
  "flask-conical": FlaskConicalOff,
  "no-toxic": FlaskConicalOff,
  "biohazard": Biohazard,
  chemical: FlaskConicalOff,
  chemicals: FlaskConicalOff,
  
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

const DifferenceSection = ({ difference, background }: DifferenceSectionProps & { background?: string }) => {
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

  // Light backgrounds need dark text, dark backgrounds need white text
  const isLightBg = background && background !== '#333333';
  const headingColor = isLightBg ? 'text-slate-900' : 'text-white';
  const descColor = isLightBg ? 'text-slate-600' : 'text-white/80';

  return (
    <section
      id="difference"
      className="section-padding"
      ref={ref}
      style={{ background: background || '#333333' }}
    >
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${headingColor} mb-6 tracking-tight`}>
            {sectionTitle}
          </h2>
          <p className={`${descColor} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}>
            {sectionDescription}
          </p>
        </motion.div>

        {/* Cards with dramatic effects */}
        <div className={`grid md:grid-cols-3 gap-6 max-w-5xl mx-auto`}>
          {differentials.map((item, i) => {
            // Resolve icon from iconMap or use item.icon directly
            const mappedIcon = iconMap[item.icon || ''];
            const iconValue = mappedIcon || item.icon;
            const isImage = typeof iconValue === 'string' && isImageUrl(iconValue);
            const IconComponent = !isImage && typeof iconValue === 'function' ? iconValue : (isImage ? null : Shield);
            

            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  background: 'white',
                  borderLeft: '4px solid hsl(var(--secondary))',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon on the left */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    {isImage ? (
                      <img src={iconValue as string} alt={item.title} className="w-16 h-16 object-contain" loading="lazy" />
                    ) : (
                      (() => {
                          switch(item.icon) {
                            case 'bug': return <Bug className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'leaf': return <Leaf className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'biodegradable': return <Leaf className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'eco': return <Leaf className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'natural': return <Leaf className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'shield-check': return <ShieldCheck className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'shield': return <Shield className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'flag': return <Icon50States />;
                            case 'legal': return <Icon50States />;
                            case 'usa': return <Icon50States />;
                            case 'wind': return <Wind className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'temperature': return <Thermometer className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'check-circle': return <CheckCircle className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'globe': return <Flag className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'clock':
                            case 'stopwatch':
                            case 'timer':
                            case 'hour':
                            case 'duration':
                            case '30days':
                            case '30-days':
                            case 'long-lasting':
                            case 'longlasting':
                              return <IconLongLasting />;
                            case '50-states':
                            case '50states':
                              return <Icon50States />;
                            case 'chemistry':
                            case 'molecule':
                            case 'beaker':
                            case 'flask':
                            case 'flask-conical':
                              return <IconChemistry />;
                            case 'ribbon':
                            case 'biopreferred':
                            case 'usda-bio':
                              return <img src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_100__biodegradable.png?v=1775508337" alt={item.title} className="w-16 h-16 object-contain" loading="lazy" />;
                            case 'flask-conical-off':
                            case 'no-toxic':
                            case 'chemical':
                            case 'chemicals':
                              return <FlaskConicalOff className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'biohazard':
                              return <Biohazard className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'milk-off':
                            case 'milkoff':
                              return <MilkOff className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                            case 'cloud':
                            case 'droplet':
                            case 'water':
                            case 'rain':
                            case 'weather':
                            case 'wet':
                            case 'rainproof':
                            case 'weatherproof':
                              return <img src="https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png" alt={item.title} className="w-16 h-16 object-contain" loading="lazy" />;
                            default:
                              return <Shield className="w-10 h-10" strokeWidth={1.5} style={{ color: '#2d5a3d' }} />;
                          }
                        })()
                      )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-lg uppercase mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
</div>
              </motion.div>
            );
          })}
        </div>

        {/* Chart / proof image */}
        {difference?.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <img
              src={difference.image}
              alt={sectionTitle}
              className="w-full rounded-xl shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DifferenceSection;
