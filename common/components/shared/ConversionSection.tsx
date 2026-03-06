import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, FileText, Zap, Lock, Shield } from "lucide-react";

const ConversionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const highlights = [
    {
      icon: Zap,
      text: "Automate quickly",
    },
    {
      icon: FileText,
      text: "Secure PDF upload",
    },
    {
      icon: Lock,
      text: "HIPAA-compliant",
    },
    {
      icon: Shield,
      text: "ISO 9001 documented",
    },
  ];

  return (
    <section id="start" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Start Automating Patient Statement Mailing
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Automate secure patient statements, medical billing, and notices
            online. Reduce returns up to 40% with address verification, track
            deliveries, pay-as-you-go—no monthly fees.
          </p>

          <a
            href="https://prod.postalocity.com/login.html?signUp=true&promo=health2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-cta-gold shadow-cta text-lg mb-8"
          >
            Sign Up Free — Start Automating Today
            <ArrowRight size={20} />
          </a>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {highlights.map((highlight, i) => (
              <motion.div
                key={highlight.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-primary/10 rounded-xl p-4 flex flex-col items-center"
              >
                <highlight.icon className="w-6 h-6 text-primary mb-2" />
                <span className="text-sm text-foreground font-medium">
                  {highlight.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Healthcare Providers Choose Postalocity
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Reduce returned patient mail 40% with address verification
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Track patient statements delivery with real-time updates
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Process 5,000+ statements overnight with zero staff
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  Save 40-70% on mailing costs vs in-house processing
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionSection;
