import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";
import { useIKBPricing } from "@/contexts";
import { DEFAULT_PRICING } from "@/utils/pricing";

const defaultFaqs = [];

const FAQSection = (faqContent?: { section?: any; faqs?: Array<{ q: string; a: string }>; items?: Array<{ question: string; answer: string }> }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Get pricing from IKB context
  const pricing = useIKBPricing();
  
  // Format pricing string for FAQ - uses dynamic pricing from IKB, falls back to DEFAULT_PRICING
  const pricingText = useMemo(() => {
    const basePrice = pricing?.basePrice ?? DEFAULT_PRICING.basePrice;
    const units = pricing?.units ?? DEFAULT_PRICING.units;
    return `$${basePrice.toFixed(2)}/${units} (1-page B&W, single-sided, envelope + postage)`;
  }, [pricing]);

  // Handle both formats: { faqs: [{q, a}] } or { items: [{question, answer}] }
  const faqData = faqContent?.faqs ? faqContent : (faqContent as any)?.faq;
  // Support both 'items' and 'faqs' arrays
  const rawFaqs = faqData?.items ?? faqData?.faqs ?? defaultFaqs;
  // Normalize to {q, a} format
  const faqs = rawFaqs.map((faq: any) => ({
    q: faq.q || faq.question || '',
    a: faq.a || faq.answer || ''
  }));
  
  // Process FAQ answers to replace placeholders
  const processAnswer = (answer: string) => {
    return answer.replace(/\{\{PRICING\}\}/g, pricingText);
  };

  return (
    <section id="faq" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-xl shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="text-foreground font-semibold pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="px-6 pb-6 text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(processAnswer(faq.a)) }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
