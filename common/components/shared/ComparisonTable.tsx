import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import envelopeSample from "@/assets/envelope-sample.svg";
import { useFormattedPricing } from "@/utils/pricing";
import { getIcon } from "@/utils/icons";

interface ComparisonData {
  section: {
    title: string;
    description: string;
    cta?: {
      text: string;
      href: string;
    };
  };
  columns: {
    ourSolution: string;
    traditional: string;
  };
  rows: Array<{
    icon: string;
    feature: string;
    ourSolution: string | { text: string; details?: string[]; highlight?: string; isEnvelope?: boolean };
    traditionalApproach: string;
  }>;
}

interface ComparisonTableProps {
  comparison: ComparisonData;
  promoCode?: string;
}

const ComparisonTable = ({ comparison }: ComparisonTableProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { short, full, withEnvelope } = useFormattedPricing();
  
  // Process text with pricing placeholders
  const processText = (text: string) => {
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short)
      .replace(/\{\{PRICING_ENVELOPE\}\}/g, withEnvelope);
  };

  const renderOurSolution = (data: string | { text: string; details?: string[]; highlight?: string; isEnvelope?: boolean }) => {
    if (typeof data === "string") {
      return processText(data);
    }

    // Special rendering for envelope row
    if (data.isEnvelope) {
      return (
        <div className="flex flex-col items-center">
          <img
            src={envelopeSample}
            alt="Color envelope sample"
            className="w-44 mx-auto rounded-lg"
          />
          <p className="mt-2 font-bold text-foreground text-sm">{processText(data.text)}</p>
          {data.highlight && <p className="mt-1 text-xs text-muted-foreground">{processText(data.highlight)}</p>}
        </div>
      );
    }

    return (
      <>
        <span className="font-semibold text-primary">{processText(data.text)}</span>
        {data.highlight && <span className="block text-xs text-muted-foreground mt-1">{processText(data.highlight)}</span>}
        {data.details?.map((detail, idx) => (
          <span key={idx} className="block text-xs text-muted-foreground mt-1">{processText(detail)}</span>
        ))}
      </>
    );
  };

  const renderTraditional = (value: string) => {
    if (value === "No" || value === "—" || value === "none") {
      return <X className="w-5 h-5 mx-auto text-destructive" />;
    }
    return value;
  };

  return (
    <section
      id="comparison"
      className="section-padding bg-section-alt"
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-card p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              dangerouslySetInnerHTML={{ __html: comparison.section.title }}
            />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {comparison.section.description}
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr>
                  <th className="w-1/3"></th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold border border-border bg-destructive/10 rounded-t-lg">
                    {comparison.columns.traditional}
                  </th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold border border-border bg-primary/10 rounded-t-lg">
                    {comparison.columns.ourSolution}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => {
                  // Check if icon is an emoji (contains Unicode emoji characters)
                  const isEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2300}-\u{23FF}]|[\u{2500}-\u{25FF}]|[\u{2700}-\u{27BF}]|[\u{2900}-\u{297F}]|[\u{2B00}-\u{2BFF}]|[\u{3000}-\u{303F}]|[\u{3200}-\u{32FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]/u.test(row.icon);
                  
                  const IconComponent = isEmoji ? null : getIcon(row.icon);
                  
                  return (
                    <tr key={row.feature}>
                      <td className="py-4 px-4 font-medium flex items-center gap-3">
                        {isEmoji ? (
                          <span className="text-xl flex-shrink-0">{row.icon}</span>
                        ) : IconComponent ? (
                          <div className="flex-shrink-0 text-primary">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        ) : null}
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-center text-muted-foreground border border-border">
                        {row.traditionalApproach === "No" || row.traditionalApproach === "—" || row.traditionalApproach === "none" || row.traditionalApproach === "" ? (
                          <X className="w-5 h-5 mx-auto text-destructive" />
                        ) : (
                          renderTraditional(row.traditionalApproach)
                        )}
                      </td>
                      <td className="py-4 px-4 text-center font-semibold text-primary border border-border">
                        {row.ourSolution === "Yes" ? (
                          <Check className="w-5 h-5 mx-auto" />
                        ) : (
                          renderOurSolution(row.ourSolution)
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* CTA Button */}
            {comparison.section.cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 text-center"
              >
                <a
                  href={comparison.section.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {comparison.section.cta.text}
                  <Check className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;