import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TrustedByProps {
  trustedBy?: {
    section?: {
      title?: string;
      description?: string;
    };
  };
}

const TrustedBySection = ({ trustedBy }: TrustedByProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!trustedBy?.section?.title) return null;

  return (
    <section className="py-8 bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-muted-foreground">
            {trustedBy.section.title}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
