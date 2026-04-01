import { MapPin, Shield, Clock, CloudRain, CheckCircle, Award } from "lucide-react";
import { useBrand } from "@/contexts";

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

// Map badge names to Lucide icons
const badgeIconMap: Record<string, typeof MapPin> = {
  "made in usa": MapPin,
  "50 state legal": Shield,
  "field tested": Award,
  "30+ day scent": Clock,
  "weatherproof": CloudRain,
};

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
    // Default - 4 key badges with specific icons
    signals = [
      { name: "Made in USA", icon: "made in usa" },
      { name: "50 State Legal", icon: "50 state legal" },
      { name: "30+ Day Scent", icon: "30+ day scent" },
      { name: "Weatherproof", icon: "weatherproof" },
    ];
  }

  return (
    <section className="section-sm" style={{ background: 'hsl(220 15% 10%)' }}>
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {signals.map((signal, index) => {
            const IconComponent = badgeIconMap[signal.icon.toLowerCase()] || CheckCircle;
            return (
              <div 
                key={index}
                className="flex items-center gap-2.5 px-4 py-2.5 lg:px-5 lg:py-3"
                style={{ 
                  border: '1px solid hsl(145 45% 38% / 0.2)',
                  background: 'hsl(145 45% 38% / 0.03)'
                }}
              >
                {/* Rustic icon - thick stroke, hand-carved feel */}
                <IconComponent 
                  width={16} 
                  height={16} 
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'hsl(145 45% 55%)' }}
                />
                <span className="font-body text-xs lg:text-sm font-semibold uppercase-tracked" style={{ color: 'white' }}>
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
