import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTrustSignals, useBrand } from "@/contexts";

interface TrustSignal {
  type?: string;
  name: string;
  organization?: string;
  year?: string;
  verified?: boolean;
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Get trust signals from IKB context (institutional knowledge)
  const ikbTrustSignals = useTrustSignals();
  
  // Get trust signals from brand config
  const ctx = useBrand();
  const brandTrustSignals = ctx.brand.trustSignals;
  
  // Priority: config signals > brand signals > IKB signals > defaults
  const rawSignals = trustSignals?.signals;
  
  let signals: TrustSignal[];
  
  if (rawSignals?.length) {
    // Use config signals if provided
    signals = rawSignals.map(s => typeof s === 'string' ? { name: s } : s);
  } else if (brandTrustSignals?.length) {
    // Use brand signals
    signals = brandTrustSignals.map(s => {
      const parts = s.split(' ');
      const yearIndex = parts.findIndex(p => /^\d{4}$/.test(p));
      if (yearIndex > 0) {
        return { name: parts.slice(0, yearIndex).join(' '), year: parts[yearIndex] };
      }
      return { name: s };
    });
  } else if (ikbTrustSignals.length > 0) {
    // Use IKB signals
    signals = ikbTrustSignals.map(s => {
      const parts = s.split(' ');
      const yearIndex = parts.findIndex(p => /^\d{4}$/.test(p));
      if (yearIndex > 0) {
        return { name: parts.slice(0, yearIndex).join(' '), year: parts[yearIndex] };
      }
      return { name: s };
    });
  } else {
    // Default signals
    signals = [
      { name: "NCOA Verified", year: "2024" },
      { name: "CASS Certified", year: "2024" },
      { name: "ISO 9001", year: "2023" },
    ];
  }

  return (
    <section className="py-8 bg-section-alt" ref={ref} id="trust-signals">
      <div className="section-container">
        {trustSignals?.section?.title && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-foreground">
              {trustSignals.section.title}
            </h2>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {signals.map((signal, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">{signal.name}</span>
              {signal.year && (
                <span className="text-xs text-muted-foreground">{signal.year}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
