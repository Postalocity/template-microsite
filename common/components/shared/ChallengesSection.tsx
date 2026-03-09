import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MailX, TrendingUp } from "lucide-react";

const challenges = [
  {
    icon: Clock,
    text: "Manual entry causes address errors and costly returns. Peak periods overload staff, leading to delays in dispute letter mailing.",
  },
  {
    icon: MailX,
    text: "Rising USPS rates erode budgets without optimization. Returned letters due to address errors delay credit repair cycles while wasting postage.",
  },
  {
    icon: TrendingUp,
    text: "High-risk, high-value client data demands secure handling. Deadline pressures for urgent notices and dispute letter mailing create operational challenges.",
  },
];

const ChallengesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="challenges"
      className="section-padding bg-section-alt"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Common Challenges with In-House Dispute Letter Mailing
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-5">
          {challenges.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-card"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground leading-relaxed pt-3">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-lg text-foreground"
        >
          Postalocity automates the entire process—secure PDF upload, address
          verification, printing, folding, stuffing, and USPS
          delivery—eliminating manual errors and delays.
        </motion.p>
      </div>
    </section>
  );
};

export default ChallengesSection;
