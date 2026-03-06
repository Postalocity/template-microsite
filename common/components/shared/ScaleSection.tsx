import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BarChart3, Zap, Users } from "lucide-react";

const ScaleSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: Users,
      title: "Scale Without Commitment",
      description:
        "Process 10 or 10,000+ patient statements monthly. Pay-as-you-go healthcare mailing service for any practice size.",
    },
    {
      icon: Zap,
      title: "Automate Effortlessly",
      description:
        "Upload PDF statements to automate healthcare mailing. No monthly fees, no minimums, no contracts.",
    },
    {
      icon: BarChart3,
      title: "Streamlined onboarding",
      description:
        "Start automating patient statements quickly. Secure PDF upload.",
    },
  ];

  return (
    <section id="scale" className="section-padding bg-section-alt" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pay-as-You-Go Patient Statements Mailing: Scale Without Commitment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From small clinics to large systems, automate patient statements and
            pay-as-you-go patient statements mailing with no monthly fees, no
            contracts, and no minimums.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto text-center"
        >
          <div className="bg-card rounded-2xl p-10 shadow-card border border-primary/10">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Pay-as-You-Go Healthcare Mailing Service
            </h3>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8 font-medium">
              Start automating patient statements today. No monthly fees, no
              setup fees, no contracts. Pay-as-you-go healthcare mailing service
              for any practice size.
            </p>
            <a
              href="https://prod.postalocity.com/login.html?signUp=true&promo=health2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 rounded-xl btn-cta-gold shadow-cta text-lg font-semibold"
            >
              Start Automating Patient Statement Mailing
              <ArrowRight size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScaleSection;
