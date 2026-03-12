import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  DollarSign,
  Clock,
  ShieldCheck,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";

const reasons = [
  {
    icon: TrendingUp,
    title: "Process 5,000+ Statements Overnight",
    description:
      "Regional hospital volumes handled in hours, not days. Scale instantly—no overstaffing needed during peaks. We optimize your 5,000-50,000 volume at enterprise speed.",
  },
  {
    icon: Clock,
    title: "Same-Day Printing, 24-Hour Turnaround",
    description:
      "Upload by 3 PM, in mail by 5 PM, delivered tomorrow. Upload anytime through our secure dashboard. Speed you can trust with 99.7% on-time delivery.",
  },
  {
    icon: DollarSign,
    title: "EMR Integration Ready",
    description:
      "Epic, Cerner, Athenahealth, Allscripts, eClinicalWorks connectors available. Export statements directly from your EMR to our platform. RESTful API endpoints available.",
  },
  {
    icon: ShieldCheck,
    title: "Revenue Acceleration",
    description:
      "Statements arrive tomorrow, not in 5 days. Your patients are waiting. Their payments are too. Reduce revenue cycle time by 80%.",
  },
  {
    icon: FileText,
    title: "Secure Document Processing",
    description:
      "Enterprise-grade security with encrypted data transfers and secure processing facilities. End-to-end address verification with NCOA/CASS auto-verify before printing. ISO 9001 documented processes.",
  },
  {
    icon: Users,
    title: "Zero Staff Time Required",
    description:
      "No printing, folding, stuffing, or addressing. Upload your PDFs and we handle the rest—giving your team hours back every week to focus on patient care.",
  },
];

const WhyAutomateSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-automate"
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
            Why Healthcare Providers Choose Postalocity
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Regional hospitals, urgent care centers, and medical practices
            process thousands of statements monthly. Here is why leading
            providers trust us for high-volume, same-day mailing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
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
      </div>
    </section>
  );
};

export default WhyAutomateSection;
