import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const IntroSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <article className="max-w-4xl mx-auto">
          <p className="text-lg sm:text-xl leading-relaxed text-foreground">
            Revenue cycles take 5+ days because of manual processing. Your
            patients are waiting. Their payments are too. Postalocity handles
            everything—secure PDF upload through USPS delivery—so regional
            hospitals, urgent care centers, and medical practices cut costs,
            accelerate payments, and free your team to focus on what matters
            most: patient care.
          </p>
        </article>
      </motion.div>
    </section>
  );
};

export default IntroSection;
