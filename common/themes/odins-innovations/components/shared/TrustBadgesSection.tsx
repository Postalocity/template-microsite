import { useBrand } from "@/contexts";

// Odin's style SVG icons - stroke-based outlines matching BenefitsSection
const OdinsIconRibbon = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-4 h-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M44.18 67.51L30 89.72l-4.44-12.19-12.93 1.1 14.19-22.18a28.86 28.86 0 0 0 13.79 10.08 26.93 26.93 0 0 0 3 .85Zm43.19 11.12l-12.93-1.1L70 89.72 55.81 67.51l.63-.13a26.76 26.76 0 0 0 2.94-.85 28.8 28.8 0 0 0 13.8-10.08Z" />
    <path d="M78.92 39.19a28.82 28.82 0 0 1-3.61 14 30 30 0 0 1-1.74 2.73 5 5 0 0 1-.39.52 28.8 28.8 0 0 1-13.79 10.09 26.76 26.76 0 0 1-2.94.85l-.63.13a29 29 0 0 1-11.63 0l-.62-.13a26.93 26.93 0 0 1-3-.85 28.86 28.86 0 0 1-13.75-10.08c-.13-.17-.26-.34-.38-.52q-.93-1.32-1.74-2.73a28.92 28.92 0 1 1 54.22-14Z" />
    <path d="m56.95 42.84 1.63 9.55L50 47.88l-8.58 4.51 1.64-9.55-6.95-6.77 9.6-1.39 4.29-8.7 4.29 8.7 9.6 1.39-6.94 6.77z" />
  </svg>
);

const OdinsIconFlag = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-4 h-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    {/* Flag pole */}
    <path d="M15 15v75" />
    {/* Flag field - stripes */}
    <path d="M15 15h70v50H15z" fill="currentColor" fillOpacity="0.1" />
    <path d="M15 25h70M15 35h70M15 45h70M15 55h70" />
    {/* Canton (blue field with stars) */}
    <path d="M15 15h30v30H15z" fill="currentColor" fillOpacity="0.2" />
    {/* Stars pattern */}
    <circle cx="22" cy="22" r="2" fill="currentColor" />
    <circle cx="30" cy="22" r="2" fill="currentColor" />
    <circle cx="38" cy="22" r="2" fill="currentColor" />
    <circle cx="26" cy="28" r="2" fill="currentColor" />
    <circle cx="34" cy="28" r="2" fill="currentColor" />
    <circle cx="22" cy="34" r="2" fill="currentColor" />
    <circle cx="30" cy="34" r="2" fill="currentColor" />
    <circle cx="38" cy="34" r="2" fill="currentColor" />
    <circle cx="26" cy="40" r="2" fill="currentColor" />
    <circle cx="34" cy="40" r="2" fill="currentColor" />
  </svg>
);

const OdinsIconStopwatch = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-4 h-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="60.82" cy="54.12" r="4.26" />
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
  </svg>
);

const OdinsIconRaindrop = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-4 h-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M50 10c-10 20-30 35-30 55 0 20 15 35 30 35s30-15 30-35c0-20-20-35-30-55z" />
    <path d="M40 55c0 10 5 15 10 15s10-5 10-15" />
  </svg>
);

const OdinsIconCheckCircle = () => (
  <svg aria-hidden="true" focusable="false" role="presentation" className="w-4 h-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="50" cy="50" r="35" />
    <path d="M35 50l10 10 20-20" />
  </svg>
);

// Map badge names to Odin's style icons
const badgeIconMap: Record<string, React.FC | string> = {
  "made in usa": OdinsIconRibbon,
  "50 state legal": OdinsIconFlag,
  "50-states": OdinsIconFlag,
  "field tested": OdinsIconCheckCircle,
  "30+ day scent": OdinsIconStopwatch,
  "30days": OdinsIconStopwatch,
  // Rain/Weather - ALL use Shopify PNG brand asset
  "weatherproof": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "rainproof": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "droplet": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "water": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "rain": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "cloud": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "wet": "https://cdn.shopify.com/s/files/1/0555/8049/1971/files/odinsInnov_water_proof.png",
  "check-circle": OdinsIconCheckCircle,
};

interface TrustSignal {
  name: string;
  icon: string;
}

interface TrustSignalsProps {
  trustSignals?: {
    section?: {
      title?: string;
      description?: string;
    };
    signals?: (TrustSignal | string)[];
  };
}

const TrustBadgesSection = ({ trustSignals }: TrustSignalsProps) => {
  const ctx = useBrand();
  const brandTrustSignals = ctx.brand.trustSignals;
  
  const rawSignals = trustSignals?.signals;
  
  let signals: TrustSignal[];
  
  if (rawSignals?.length) {
    signals = rawSignals.map(s => typeof s === 'string' 
      ? { name: s, icon: Object.keys(badgeIconMap).find(k => s.toLowerCase().includes(k)) || 'check-circle' } 
      : { name: s.name, icon: (s as any).icon || 'check-circle' }
    );
  } else if (brandTrustSignals?.length) {
    signals = brandTrustSignals.map(s => {
      const lowerName = s.toLowerCase();
      const iconKey = Object.keys(badgeIconMap).find(k => lowerName.includes(k));
      return { name: s, icon: iconKey || 'check-circle' };
    });
  } else {
    // Default - 4 key badges with Odin's style icons
    signals = [
      { name: "Made in USA", icon: "made in usa" },
      { name: "50 State Legal", icon: "50 state legal" },
      { name: "30+ Day Scent", icon: "30+ day scent" },
      { name: "Weatherproof", icon: "weatherproof" },
    ];
  }

  return (
    <section className="section-sm" style={{ background: '#f8f9fa' }}>
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {signals.map((signal, index) => {
            const iconValue = badgeIconMap[signal.icon.toLowerCase()];
            const isImageUrl = typeof iconValue === 'string' && (iconValue.startsWith('http') || iconValue.startsWith('/'));
            const IconComponent = !isImageUrl ? (iconValue as React.FC || OdinsIconCheckCircle) : null;
            return (
              <div 
                key={index}
                className="flex items-center gap-2.5 px-4 py-2.5 lg:px-5 lg:py-3 bg-white rounded shadow-sm"
                style={{ 
                  border: '1px solid #e5e5e5'
                }}
              >
                {/* Odin's style SVG icon or image */}
                <div style={{ color: '#2d5a3d' }}>
                  {isImageUrl ? (
                    <img src={iconValue as string} alt={signal.name} className="w-5 h-5 object-contain" />
                  ) : (
                    <IconComponent />
                  )}
                </div>
                <span className="font-body text-xs lg:text-sm font-semibold uppercase-tracked" style={{ color: '#1a1a1a' }}>
                  {signal.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
