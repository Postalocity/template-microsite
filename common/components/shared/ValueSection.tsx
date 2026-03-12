import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Mail,
  Eye,
  Check,
} from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";

const ValueSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const differentiators = [
    {
      icon: Mail,
      title: "Full-Color Envelopes",
      description:
        "Every statement includes a professional full-color envelope—not loose paper with stickers. Professional builds trust.",
    },
    {
      icon: Eye,
      title: "Complete Visibility",
      description:
        "USPS tracking available. See when each statement was mailed and delivered. No more guessing.",
    },
    {
      icon: Clock,
      title: "Skip USPS Lines",
      description:
        "Bypass post office drop-off times and waiting in line. We automate—eliminating missed cutoffs and days in delivery time.",
    },
  ];

  const benefits = [
    "No more staff time spent printing, folding, or stuffing envelopes",
    "Upload by 3 PM, in mail by 5 PM, delivered tomorrow",
    "Process 5,000+ statements overnight—no staffing required",
    "EMR integration available: Epic, Cerner, Athena, Allscripts",
    "Zero staff time required—upload & done",
    "Revenue acceleration: statements arrive tomorrow, not in 5 days",
  ];

  return (
    <section id="value" className="section-padding bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Healthcare Providers Choose Postalocity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            High-volume processing, same-day printing, EMR
            integration—everything healthcare providers need to accelerate
            revenue cycles.
          </p>
        </motion.div>

        {/* Top Differentiators */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow group"
            >
              <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
              />
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            What You Get with Postalocity
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-card rounded-xl p-5 shadow-card"
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <p
                  className="text-foreground font-medium leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(b) }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/20">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Revenue Assurance
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No revenue disruption. 99.7% on-time delivery. Your patients
              receive professional-looking statements that arrive tomorrow—not
              in 5 days. Faster statements mean faster payments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
