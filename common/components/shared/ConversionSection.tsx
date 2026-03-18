import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, FileText, Zap, Lock, Shield } from "lucide-react";
import { useBrandName, useAppUrl } from "@/contexts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  zap: Zap,
  fileText: FileText,
  lock: Lock,
  shield: Shield,
};

interface HighlightItem {
  icon?: string;
  text: string;
}

interface ConversionSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  highlights?: HighlightItem[];
  whyChooseHeadline?: string;
  benefits?: string[];
}

const defaultHighlights = [
  { icon: 'zap', text: "Automate quickly" },
  { icon: 'fileText', text: "Secure PDF upload" },
  { icon: 'lock', text: "Data-secure" },
  { icon: 'shield', text: "ISO 9001 documented" },
];

const defaultBenefits = [
  "Reduce returned mail 40% with address verification",
  "Track dispute letter delivery with real-time updates",
  "Process 5,000+ letters overnight with zero staff",
  "Save 40-70% on mailing costs vs in-house processing",
];

const ConversionSection = ({
  headline = "Start Automating Dispute Letter Mailing",
  subheadline = "Automate secure dispute letters, follow-up reminders, and client notices online. Reduce returns up to 40% with address verification, track deliveries, pay-as-you-go—no monthly fees.",
  ctaText = "Sign Up Free — Start Automating Today",
  highlights,
  whyChooseHeadline,
  benefits,
}: ConversionSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const brandName = useBrandName();
  const appUrl = useAppUrl();

  const highlightList = highlights && highlights.length > 0 ? highlights : defaultHighlights;
  const benefitList = benefits && benefits.length > 0 ? benefits : defaultBenefits;
  const whyChoose = whyChooseHeadline || `Why Credit Repair Companies Choose ${brandName}`;

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
            {headline}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {subheadline}
          </p>

          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-cta-gold shadow-cta text-lg mb-8"
          >
            {ctaText}
            <ArrowRight size={20} />
          </a>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {highlightList.map((highlight, i) => (
              <motion.div
                key={highlight.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-primary/10 rounded-xl p-4 flex flex-col items-center"
              >
                {(() => {
                  const Icon = highlight.icon && iconMap[highlight.icon] ? iconMap[highlight.icon] : Zap;
                  return <Icon className="w-6 h-6 text-primary mb-2" />;
                })()}
                <span className="text-sm text-foreground font-medium">
                  {highlight.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {whyChoose}
            </h3>
            <div className="space-y-3 text-sm">
              {benefitList.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionSection;
