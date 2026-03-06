import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import signageMockup from "@/assets/signage-mockup.svg";

const PromoSignageSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Automate Appointment Reminders, Billing Notices & Lab Results
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Healthcare providers need more than patient statements. Turn
            appointment reminders, billing notices, lab result notifications,
            and follow-up care letters into professional mailings—without extra
            vendors or complexity.
          </p>
        </motion.div>

        {/* Signage Mockup Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-8"
        >
          <img
            src={signageMockup}
            alt="Healthcare communications including appointment reminders, billing notices, lab results, and follow-up letters - all processed same-day"
            className="w-full max-w-3xl mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-foreground text-lg mb-6 max-w-3xl mx-auto">
            Result: Fewer missed appointments, faster payments, better patient
            engagement, and zero added overhead. All secure, all professional,
            all from one portal.
          </p>
          <a
            href="https://prod.postalocity.com/login.html?signUp=true&promo=health2026"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-cta-gold text-lg"
          >
            Get Started Today!
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSignageSection;
