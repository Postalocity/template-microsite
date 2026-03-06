import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Printer, Mail, Truck, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your PDFs",
    desc: "Drag-and-drop your patient statements into our secure dashboard. Same-day or next-day mailing available.",
  },
  {
    icon: Printer,
    title: "We Print & Process",
    desc: "Professional printing, folding, stuffing into full-color envelopes, and sealing—all automated.",
  },
  {
    icon: Mail,
    title: "Address Verification",
    desc: "NCOA/CASS verification updates addresses before mailing, reducing returned statements by 40%.",
  },
  {
    icon: Truck,
    title: "USPS Mailing & Tracking",
    desc: "Same-day or next-day mailing. Track Priority and Certified statements—see when it was mailed and when it arrived. First-Class Mail delivers with standard USPS confirmation.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="section-padding bg-background"
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
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps from upload to mailing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-lg font-semibold text-foreground"
        >
          <Check className="inline w-5 h-5 text-secondary mr-2" />
          Patient statements reach recipients reliably, accuracy is maintained,
          and your team gains hours back weekly.
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
