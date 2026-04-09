import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BusinessContinuityContent } from "../../types/content";
import { Shield, Server, Cloud, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

// Support both legacy (no props) and new config-based content
interface BusinessContinuitySectionProps {
  businessContinuity?: BusinessContinuityContent;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  server: Server,
  cloud: Cloud,
  building: Building2,
  security: Shield,
  infrastructure: Server,
  backup: Cloud,
  facility: Building2,
};

const defaultContent = {
  title: "Business Continuity & Disaster Recovery",
  description: "Your critical mailings never stop. Our redundant dual-location infrastructure with mirrored hot-site facilities ensures 99.9% uptime—keeping statements, compliance notices, and time-sensitive communications flowing even during unexpected disruptions.",
  badge: "99.9% Uptime Guarantee",
};

const BusinessContinuitySection = ({ businessContinuity }: BusinessContinuitySectionProps = {}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Determine mode
  const useConfigMode = businessContinuity?.section !== undefined;

  if (useConfigMode) {
    // Config-based mode
    return (
      <section id="business-continuity" className="section-padding bg-muted/30" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              {businessContinuity?.section?.title}
            </h2>
            {businessContinuity?.section?.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {businessContinuity.section.description}
              </p>
            )}
          </motion.div>

          {businessContinuity?.features && businessContinuity.features.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {businessContinuity.features.map((feature, idx) => {
                const Icon = iconMap[feature.icon || 'shield'] || Shield;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {businessContinuity?.disasterRecovery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Disaster Recovery & Redundancy
                  </CardTitle>
                  <CardDescription className="text-base">
                    {businessContinuity.disasterRecovery}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // Legacy mode (hardcoded content)
  return (
    <section
      id="business-continuity"
      className="section-padding bg-background"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {defaultContent.title}
            </h2>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            {defaultContent.description}
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold">
            <Shield className="w-5 h-5" />
            {defaultContent.badge}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessContinuitySection;
