import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield } from "lucide-react";

const BusinessContinuitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="business-continuity"
      className="section-padding bg-background"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Business Continuity & Disaster Recovery
            </h2>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            Your critical mailings never stop. Our redundant dual-location
            infrastructure with mirrored hot-site facilities ensures 99.9%
            uptime—keeping statements, compliance notices, and time-sensitive
            communications flowing even during unexpected disruptions.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold">
            <Shield className="w-5 h-5" />
            99.9% Uptime Guarantee
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessContinuitySection;
