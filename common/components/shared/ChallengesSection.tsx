import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChallengesContent } from "../../types/content";
import { Clock, MailX, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { useBrandName } from "@/contexts";

// Support both legacy props and new config-based content
interface ChallengesSectionProps {
  challenges?: ChallengesContent;
  // Legacy props for backwards compatibility
  headline?: string;
  closingStatement?: string;
  challengesList?: { icon?: string; text: string }[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  mailX: MailX,
  trendingUp: TrendingUp,
  alert: AlertTriangle,
  time: Clock,
  volume: TrendingUp,
  cost: TrendingUp,
  warning: AlertTriangle,
};

const defaultChallenges = [
  {
    icon: 'clock',
    text: "Manual entry causes address errors and costly returns. Peak periods overload staff, leading to delays in dispute letter mailing.",
  },
  {
    icon: 'mailX',
    text: "Rising USPS rates erode budgets without optimization. Returned letters due to address errors delay credit repair cycles while wasting postage.",
  },
  {
    icon: 'trendingUp',
    text: "High-risk, high-value client data demands secure handling. Deadline pressures for urgent notices and dispute letter mailing create operational challenges.",
  },
];

const ChallengesSection = ({
  challenges,
  headline,
  closingStatement,
  challengesList,
}: ChallengesSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const brandName = useBrandName();

  // Determine which mode to use
  const useConfigMode = challenges?.section !== undefined;

  if (useConfigMode) {
    // New config-based mode
    const challengeItems = challenges?.challenges || [];

    return (
      <section id="challenges" className="section-padding bg-background" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              {challenges?.section?.title}
            </h2>
            {challenges?.section?.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {challenges.section.description}
              </p>
            )}
          </motion.div>

          {challengeItems.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challengeItems.map((challenge, idx) => {
                const Icon = iconMap[challenge.icon || 'alert'] || AlertTriangle;
                
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
                          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-destructive" />
                          </div>
                          {challenge.metric && (
                            <span className="text-lg font-bold text-destructive">
                              {challenge.metric}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                        {challenge.impact && (
                          <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">
                            <strong>Impact:</strong> {challenge.impact}
                          </p>
                        )}
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Legacy mode for backwards compatibility
  const challengeList = challengesList && challengesList.length > 0 ? challengesList : defaultChallenges;
  const closing = closingStatement || `${brandName} automates the entire process—secure PDF upload, address verification, printing, folding, stuffing, and USPS delivery—eliminating manual errors and delays.`;

  return (
    <section
      id="challenges"
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
            {headline || "Common Challenges with In-House Dispute Letter Mailing"}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-5">
          {challengeList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-card"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {(() => {
                  const Icon = item.icon && iconMap[item.icon] ? iconMap[item.icon] : Clock;
                  return <Icon className="w-8 h-8 text-primary" />;
                })()}
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
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-lg text-foreground"
        >
          {closing}
        </motion.p>
      </div>
    </section>
  );
};

export default ChallengesSection;
