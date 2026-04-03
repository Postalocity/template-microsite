import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FAQItem {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

interface FAQSectionProps {
  faq?: {
    headline?: string;
    title?: string;
    items?: FAQItem[];
    faqs?: FAQItem[];
  };
}

const FAQSection = ({ faq }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!faq) {
    return null;
  }

  const items = faq.items || faq.faqs || [];
  const title = faq.headline || faq.title || "Frequently Asked Questions";

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding bg-section-alt"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-2xl uppercase mb-10 text-center">
            {title}
          </h2>

          <div className="space-y-0">
            {items.map((item, index) => {
              const question = item.question || item.q || "";
              const answer = item.answer || item.a || "";
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-border"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between py-6 text-left group"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-body text-lg font-bold text-foreground pr-8 text-left">
                      {question}
                    </span>
                    <span 
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all"
                      style={{ 
                        background: openIndex === index ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                        color: openIndex === index ? 'white' : 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {openIndex === index ? (
                        <Minus size={18} strokeWidth={3} strokeLinecap="round" />
                      ) : (
                        <Plus size={18} strokeWidth={3} strokeLinecap="round" />
                      )}
                    </span>
                  </button>
                  
                  {openIndex === index && (
                    <div className="pb-6">
                      <p className="font-body text-base leading-relaxed text-muted-foreground">
                        {answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
