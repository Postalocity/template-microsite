import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sanitizeHtml } from "@/utils/sanitize-html";
import { useBrand, useBrandName } from "@/contexts";

// Odin's style SVG icons - stroke-based outlines matching BenefitsSection
const OdinsIconShield = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 85c15-5 25-20 25-40V25L50 15 25 25v20c0 20 10 35 25 40z" />
    <path d="M35 45l10 10 20-20" />
  </svg>
);

const OdinsIconRibbon = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M44.18 67.51L30 89.72l-4.44-12.19-12.93 1.1 14.19-22.18a28.86 28.86 0 0 0 13.79 10.08 26.93 26.93 0 0 0 3 .85Zm43.19 11.12l-12.93-1.1L70 89.72 55.81 67.51l.63-.13a26.76 26.76 0 0 0 2.94-.85 28.8 28.8 0 0 0 13.8-10.08Z" />
    <path d="M78.92 39.19a28.82 28.82 0 0 1-3.61 14 30 30 0 0 1-1.74 2.73 5 5 0 0 1-.39.52 28.8 28.8 0 0 1-13.79 10.09 26.76 26.76 0 0 1-2.94.85l-.63.13a29 29 0 0 1-11.63 0l-.62-.13a26.93 26.93 0 0 1-3-.85 28.86 28.86 0 0 1-13.75-10.08c-.13-.17-.26-.34-.38-.52q-.93-1.32-1.74-2.73a28.92 28.92 0 1 1 54.22-14Z" />
    <path d="m56.95 42.84 1.63 9.55L50 47.88l-8.58 4.51 1.64-9.55-6.95-6.77 9.6-1.39 4.29-8.7 4.29 8.7 9.6 1.39-6.94 6.77z" />
  </svg>
);

const OdinsIconStopwatch = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="60.82" cy="54.12" r="4.26" />
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
  </svg>
);

const OdinsIconLeaf = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 85c20-10 30-30 30-50 0-15-10-25-30-25s-30 10-30 25c0 20 10 40 30 50z" />
    <path d="M50 85V35" />
    <path d="M35 50c5-5 15-5 30 0" />
  </svg>
);

const OdinsIconCloud = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M25 60c-5 0-10-5-10-10s5-10 10-10h5c2-15 15-25 30-20 12 3 20 15 20 25v5h5c8 0 15 7 15 15s-7 15-15 15H25z" />
    <path d="M30 70l-10 10m20-5l-5 15m25-10l5 10" />
  </svg>
);

const OdinsIconCheck = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="50" r="35" />
    <path d="M35 50l10 10 20-20" />
  </svg>
);

const OdinsIconFlag = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Flag field - centered without pole */}
    <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1" />
    <path d="M15 35h70M15 45h70M15 55h70M15 65h70" />
    {/* Canton (blue field with stars) */}
    <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2" />
    {/* Stars pattern */}
    <circle cx="22" cy="32" r="2" fill="currentColor" />
    <circle cx="30" cy="32" r="2" fill="currentColor" />
    <circle cx="38" cy="32" r="2" fill="currentColor" />
    <circle cx="26" cy="38" r="2" fill="currentColor" />
    <circle cx="34" cy="38" r="2" fill="currentColor" />
    <circle cx="22" cy="44" r="2" fill="currentColor" />
    <circle cx="30" cy="44" r="2" fill="currentColor" />
    <circle cx="38" cy="44" r="2" fill="currentColor" />
    <circle cx="26" cy="50" r="2" fill="currentColor" />
    <circle cx="34" cy="50" r="2" fill="currentColor" />
  </svg>
);

// Map icon names to components
const iconMap: Record<string, React.FC> = {
  shield: OdinsIconShield,
  flag: OdinsIconFlag,
  ribbon: OdinsIconRibbon,
  stopwatch: OdinsIconStopwatch,
  leaf: OdinsIconLeaf,
  "check-circle": OdinsIconCheck,
  cloud: OdinsIconCloud,
};

// Helper to check if value is an image URL
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
