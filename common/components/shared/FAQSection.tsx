import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanitizeHtml } from "../../utils/sanitize-html";

const defaultFaqs = [
  {
    q: "How fast can I get dispute letters mailed?",
    a: "Same-day or next-day processing. We process 5,000+ letters with prompt submission to USPS. Same-day printing and mailing.",
  },
  {
    q: "How much does a dispute letter mailing cost?",
    a: "Our price is $1.31 per a 1-page letter. Single-sided, black and white. Includes envelope, folding, stuffing, sealing, and First-Class postage. There are no setup fees, no monthly fees, and no minimums. You only pay for what you actually mail.",
  },
  {
    q: "How does Postalocity integrate with my credit repair software?",
    a: "Postalocity offers API integrations with Credit Repair Cloud, DisputeFox, and similar platforms. Once connected, dispute letters generated in your software can be automatically pushed to Postalocity for printing and mailing. Alternatively, upload PDFs manually through our dashboard. Setup typically takes 15-30 minutes with our integration guides.",
  },
  {
    q: "What mail classes and options do you support?",
    a: "We support First-Class Mail, Standard Mail for high-volume bulk campaigns, and Certified Mail with proof of delivery. All options include USPS Intelligent Mail Barcodes for scanning. First-Class Mail (standard for dispute letters) does not include tracking but does include tracing that will show mail status up through being out for delivery. Certified Mail provides additional documentation timestamps and signature options when required.",
  },
  {
    q: "How does address verification work?",
    a: "Before printing, addresses are automatically verified against USPS databases. Inaccurate addresses are flagged for correction, significantly reducing returned mail. This improves bureau response rates since disputes reach intended destinations. Verification happens within 2-4 hours of submission, with issues surfaced before production begins.",
  },
  {
    q: "What volume can Postalocity handle?",
    a: "Our platform scales from 50 to 5,000+ letters monthly. Bulk upload tools efficiently handle large volumes, with multi-bureau and multi-creditor sends processed seamlessly. API integrations enable automated workflows that can handle weekly recurring sends without manual intervention. Pricing scales with volume with no per-transaction fees for high-volume clients.",
  },
  {
    q: "Is the mailing process for dispute letters secure?",
    a: "Postalocity uses end-to-end encryption with certified infrastructure. All dispute letter uploads and downloads are completed securely using encrypted connections. Access controls, audit logs, and compliance protocols meet financial service standards. No data is stored beyond processing requirements. Customizable administrator controls ensure oversight across team permissions and document access.",
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
