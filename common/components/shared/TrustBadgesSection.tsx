import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TrustBadgesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-8 bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Professional Healthcare Mailing
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">SOC 2</span>
              <span className="text-xs text-muted-foreground">
                Type II Certified
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">HIPAA</span>
              <span className="text-xs text-muted-foreground">Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">USPS</span>
              <span className="text-xs text-muted-foreground">Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">NCOA</span>
              <span className="text-xs text-muted-foreground">Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">CASS</span>
              <span className="text-xs text-muted-foreground">Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
