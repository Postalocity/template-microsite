import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ShieldCheck, Building2, Star, CheckCircle2 } from 'lucide-react';
import { TrustSignalsContent } from '../../types/content';

interface TrustSignalsSectionProps {
  trustSignals: TrustSignalsContent;
}

const TrustSignalsSection = ({ trustSignals }: TrustSignalsSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Group signals by type
  const certifications = trustSignals.signals.filter(s => s.type === 'certification');
  const accreditations = trustSignals.signals.filter(s => s.type === 'accreditation');
  const awards = trustSignals.signals.filter(s => s.type === 'award');
  const partners = trustSignals.signals.filter(s => s.type === 'partner');

  return (
    <section
      id="trust"
      ref={ref}
      className="py-24 bg-background"
      aria-labelledby="trust-heading"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="trust-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {trustSignals.section.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {trustSignals.section.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certifications */}
          {certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/50 border-2 border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((signal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-all"
                  >
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{signal.name}</p>
                      <p className="text-sm text-muted-foreground">{signal.organization}</p>
                    </div>
                    {signal.verified && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Accreditations */}
          {accreditations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-card/50 border-2 border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                Accreditation
              </h3>
              <div className="space-y-3">
                {accreditations.map((signal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-all"
                  >
                    <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{signal.name}</p>
                      <p className="text-sm text-muted-foreground">{signal.organization}</p>
                    </div>
                    {signal.verified && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card/50 border-2 border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-primary" />
                Awards & Recognition
              </h3>
              <div className="space-y-3">
                {awards.map((signal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-all"
                  >
                    <Star className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{signal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {signal.organization} {signal.year && `(${signal.year})`}
                      </p>
                    </div>
                    {signal.verified && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Partner Organizations */}
          {partners.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-card/50 border-2 border-border rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                Partner Organizations
              </h3>
              <div className="space-y-3">
                {partners.map((signal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-card transition-all"
                  >
                    <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{signal.name}</p>
                      <p className="text-sm text-muted-foreground">{signal.organization}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Overall Trust Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-primary/10 border-2 border-primary rounded-2xl px-8 py-6">
            <ShieldCheck className="w-12 h-12 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Trust Rating</p>
              <p className="text-3xl font-bold text-primary">A+ Verified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;