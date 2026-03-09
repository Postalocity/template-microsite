import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "No long contracts",
  "No setup fees",
  "Pay-as-you-go",
  "Secure data transfer",
  "ISO 9001 documented",
  "Free onboarding support",
];

const GetStartedSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="get-started"
      className="section-padding bg-section-alt"
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Getting Started with Postalocity
            </h2>
<p className="text-foreground text-lg leading-relaxed mb-6">
               Sign up, upload your dispute letters or connect your credit repair software, and
               stop stuffing envelopes. Process 5,000+ letters overnight. Our
               support team is available to help when you need it.
             </p>

            <div className="space-y-6 mb-8">
              <p className="text-foreground text-lg font-semibold leading-relaxed">
                Ready to stop doing mailing by hand?
              </p>
<div className="flex flex-col sm:flex-row gap-4">
                 <a
                   href="https://prod.postalocity.com/login.html?signUp=true&promo=credit2026"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl btn-cta-gold shadow-cta text-lg"
                 >
                   Get Started Now
                   <ArrowRight size={20} />
                 </a>
                 <a
                   href="https://prod.postalocity.com/login.html?signUp=true&promo=credit2026"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary/10 transition-colors text-lg"
                 >
                   Integrate Your EMR
                 </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Why Sign Up?
              </h3>
              <ul className="space-y-3 mb-6">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted-foreground text-center">
                Sign up free. No credit card required. Pay as you go.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
