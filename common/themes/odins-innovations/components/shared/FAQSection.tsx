import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FAQItem {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
  category?: string;
}

interface FAQSectionProps {
  faq?: {
    headline?: string;
    title?: string;
    items?: FAQItem[];
    faqs?: FAQItem[];
    categories?: string[];
  };
}

const FAQSection = ({ faq }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!faq) {
    return null;
  }

  const items = faq.items || faq.faqs || [];
  const title = faq.headline || faq.title || "Frequently Asked Questions";

  // Extract categories from items or use defaults
  const defaultCategories = ["All", "Product", "Usage", "Safety"];
  const itemCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
  const categories = itemCategories.length > 0 ? ["All", ...itemCategories] : defaultCategories;

  // Filter items by category
  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory || (!item.category && activeCategory === "All"));

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--secondary) / 0.1)',
                color: 'hsl(var(--secondary))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Questions & Answers
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {title}
            </h2>
          </div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className="px-5 py-2 font-body text-sm font-semibold uppercase tracking-wide transition-all duration-300"
                style={{
                  background: activeCategory === category 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--muted))',
                  color: activeCategory === category 
                    ? 'white' 
                    : 'hsl(var(--muted-foreground))',
                  clipPath: activeCategory === category 
                    ? 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' 
                    : 'none'
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {filteredItems.map((item, index) => {
              const question = item.question || item.q || "";
              const answer = item.answer || item.a || "";
              
              return (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="overflow-hidden"
                  style={{
                    background: openIndex === index ? 'white' : 'hsl(var(--muted) / 0.5)',
                    borderLeft: openIndex === index ? '4px solid hsl(var(--primary))' : '4px solid transparent',
                    boxShadow: openIndex === index ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between py-5 px-6 text-left group"
                    aria-expanded={openIndex === index}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                        style={{ 
                          background: openIndex === index ? 'hsl(var(--accent))' : 'hsl(var(--primary) / 0.1)',
                          color: openIndex === index ? 'white' : 'hsl(var(--primary))'
                        }}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span 
                        className="font-body text-base font-semibold pr-8 text-left leading-relaxed"
                        style={{ color: 'hsl(var(--foreground))' }}
                      >
                        {question}
                      </span>
                    </div>
                    <span 
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all ml-4"
                      style={{ 
                        background: openIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
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
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-5 pl-[72px]"
                    >
                      <p className="font-body text-base leading-relaxed text-muted-foreground">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-8 text-center"
            style={{ 
              background: 'hsl(var(--muted))',
              borderLeft: '4px solid hsl(var(--accent))'
            }}
          >
            <p className="font-body text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <a
              href="mailto:support@odinsinnovations.com"
              className="inline-flex items-center gap-2 px-6 py-3 font-display font-bold uppercase tracking-wide transition-all duration-300"
              style={{ 
                background: 'hsl(var(--secondary))',
                color: 'white'
              }}
            >
              Contact Support
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
