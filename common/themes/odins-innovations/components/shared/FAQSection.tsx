import { useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import { sanitizeHtml } from "@/utils/sanitize-html";
import { useIKBPricing } from "@/contexts";
import { DEFAULT_PRICING } from "@/utils/pricing";

interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  section?: {
    title?: string;
    description?: string;
  };
  faqs?: FAQ[];
  faq?: {
    section?: {
      title?: string;
      description?: string;
    };
    faqs?: FAQ[];
  };
}

const FAQSection = ({ section, faqs: propFaqs, faq: legacyFaq }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const pricing = useIKBPricing();
  
  const pricingText = useMemo(() => {
    const basePrice = pricing?.basePrice ?? DEFAULT_PRICING.basePrice;
    const units = pricing?.units ?? DEFAULT_PRICING.units;
    return `$${basePrice.toFixed(2)}/${units}`;
  }, [pricing]);

  const faqs = propFaqs || legacyFaq?.faqs || [];
  const sectionTitle = section?.title || legacyFaq?.section?.title || "Frequently Asked";
  const sectionDesc = section?.description || legacyFaq?.section?.description;
  
  const processAnswer = (answer: string) => {
    return answer.replace(/\{\{PRICING\}\}/g, pricingText);
  };

  return (
    <section id="faq" className="section-lg">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(var(--accent))' }}
          >
            Questions
          </p>
          <h2 className="mb-6 text-foreground">
            {sectionTitle}
          </h2>
          {sectionDesc && (
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              {sectionDesc}
            </p>
          )}
        </div>

        {/* FAQ - rustic accordion with thick +/- icons */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-start justify-between py-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="faq-question pr-8 text-left">
                  {faq.q}
                </span>
                <span 
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all"
                  style={{ 
                    background: openIndex === i ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                    color: openIndex === i ? 'white' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  {openIndex === i ? (
                    <Minus size={18} strokeWidth={3} strokeLinecap="round" />
                  ) : (
                    <Plus size={18} strokeWidth={3} strokeLinecap="round" />
                  )}
                </span>
              </button>
              
              {openIndex === i && (
                <div className="pb-6 pl-0">
                  <p
                    className="faq-answer"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(processAnswer(faq.a)) }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
