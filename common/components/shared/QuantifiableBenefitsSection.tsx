import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, Clock, DollarSign, Users } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    metric: "Reduce Returned Mail Up to 40%",
    detail:
      "Automated address verification catches bad addresses before printing, minimizing re-sends and patient frustration.",
  },
  {
    icon: Clock,
    metric: "Cut Processing Time from Days to Hours",
    detail:
      "Streamline patient statement mailing. Same-day or next-day delivery. Free your team from printing and mailing tasks.",
  },
  {
    icon: DollarSign,
    metric: "Save 40-70% on Mailing Costs",
    detail:
      "Eliminate in-house printing, labor, and errors. Presort optimization and address verification reduce costs significantly.",
  },
  {
    icon: Users,
    metric: "Free Staff for Patient Care",
    detail:
      "Automate printing, folding, stuffing, and mailing. Your clinical and administrative teams focus on patients, not paperwork.",
  },
];

const QuantifiableBenefitsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="quantifiable-benefits"
      className="section-padding bg-background"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Quantifiable Benefits: What Healthcare Practices Gain
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Faster payments, better patient engagement, and operational
            efficiency. Automate patient statement mailing with measurable
            outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.metric}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.metric}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-4 text-center">
              Pay-as-You-Go Healthcare Mailing Service
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">No minimums</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Scale freely</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Secure PDF upload</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">Track delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantifiableBenefitsSection;
