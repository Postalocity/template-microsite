import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";

const defaultFaqs = [
  {
    q: "How fast can I get dispute letters mailed?",
    a: "Same-day or next-day processing. We process 5,000+ letters with prompt submission to USPS. Same-day printing and mailing. Track every letter with real-time USPS tracking.",
  },
  {
    q: "Does Postalocity integrate with my credit repair software?",
    a: "Yes. Integration is available for credit repair platforms like DisputeSuite, Credit Repair Cloud, Credit Repair CRM, and other systems. We offer RESTful API endpoints or no-code connectors. Export dispute letters directly from your software to our platform with zero manual upload.",
  },
  {
    q: "How much does dispute letter mailing cost?",
    a: "Our price is <strong>$1.31 per 1-page letter</strong>. Single-sided, black and white. Includes envelope, folding, stuffing, sealing, and First-Class postage. There are no setup fees, no monthly fees, and no minimums. You only pay for what you actually mail.",
  },
  {
    q: "Can I track dispute letters through the mail?",
    a: "Tracking is available for Priority Mail and Certified Mail. First-Class Mail (standard for dispute letters) does not include tracking. For Certified Mail, signature tracking is available for an additional fee.",
  },
  {
    q: "Are dispute letters secure with encrypted processing?",
    a: "Yes. Secure dispute letters use encrypted connections for all file uploads and downloads. Your files are processed in secure facilities with data retention options you control. We do not share your data with anyone. Your files are retained according to your configured data retention settings with full control over when they are deleted from our system. ISO 9001 documented processes.",
  },
  {
    q: "Do I need technical expertise to use Postalocity?",
    a: "No. If you can save a PDF and upload it to a website, you can use Postalocity. Upload your PDF, review the preview, and click approve. We handle the rest. Our support team can walk you through your first mailing if needed.",
  },
];

const FAQSection = (faqContent?: { faqs?: Array<{ q: string; a: string }> }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = faqContent?.faqs ?? defaultFaqs;

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
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.a) }}
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
