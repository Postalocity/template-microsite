import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import envelopeSample from "@/assets/envelope-sample.svg";
import { useFormattedPricing } from "@/utils/pricing";

interface ComparisonData {
  section: {
    title: string;
    description: string;
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {comparison.section.title}
            </h2>
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
                {comparison.rows.map((row, i) => {
                  const Icon = (() => {
                    const iconMap: Record<string, any> = {
                      clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                      checkCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
                      trendingDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
                      zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
                      mapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
                      'map-pin': () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
                      users: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                      'dollar-sign': () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
                      trendingUp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
                      'trending-up': () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
                      shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>,
                      star: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
                      mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
                    };
                    return iconMap[row.icon]?.() || null;
                  })();

                  // Check if this is an envelope row
                  const isEnvelopeRow = typeof row.ourSolution === 'object' && row.ourSolution?.isEnvelope;

                  return (
                    <tr key={row.feature}>
                      <td className="py-4 px-4 font-medium flex items-center gap-3">
                        {Icon && <div className="flex-shrink-0 text-primary">{Icon}</div>}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;