import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, MailX, Clock } from "lucide-react";

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const problems = [
    {
      icon: TrendingUp,
      text: "Credit repair companies spend 2+ hours every week printing, folding, and stuffing 5,000+ dispute letters—staff should focus on clients, not envelopes.",
    },
    {
      icon: MailX,
      text: "Letters come back every month due to bad addresses. That is wasted postage, delayed dispute resolution, and lost time for your practice.",
    },
    {
      icon: Clock,
      text: "Dispute cycles take 5+ days because of manual processing. Your clients are waiting. Their disputes are too.",
    },
  ];

  return (
    <section id="problems" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Credit Repair Dispute Cycles Are Complex
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Dispute cycles take 5+ days because of manual processing. Your
            clients are waiting. Their disputes are too. Here is what
            credit repair companies face every day.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-5">
          {problems.map((item, i) => (
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
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-lg font-semibold text-foreground"
        >
          Postalocity handles the printing, folding, stuffing, and mailing—so
          your staff can focus on patients.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;
