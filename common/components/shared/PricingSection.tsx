import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PricingContent } from "../../types/content";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useFormattedPricing } from "@/utils/pricing";

interface PricingSectionProps {
  pricing: PricingContent;
}

const PricingSection = ({ pricing }: PricingSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { full, short, withEnvelope } = useFormattedPricing();

  if (!pricing?.section) {
    return null;
  }

  const processText = (text: string | undefined) => {
    if (!text) return '';
    return text
      .replace(/\{\{PRICING\}\}/g, full)
      .replace(/\{\{PRICING_SHORT\}\}/g, short)
      .replace(/\{\{PRICING_ENVELOPE\}\}/g, withEnvelope);
  };

  return (
    <section id="pricing" className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {pricing.section.title}
          </h2>
          {pricing.section.description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {processText(pricing.section.description)}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2 border-primary">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-5xl font-bold text-foreground mb-2">
                {pricing.startingPrice}
              </CardTitle>
              <CardDescription className="text-lg">
                {processText(pricing.priceDescription || "per letter")}
              </CardDescription>
            </CardHeader>

            {pricing.features && pricing.features.length > 0 && (
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  {pricing.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        {processText(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pricing.cta && (
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  asChild 
                  className="w-full"
                  variant={pricing.cta.variant || "default"}
                >
                  <a href={pricing.cta.href}>
                    {pricing.cta.text}
                  </a>
                </Button>
                {pricing.disclaimer && (
                  <p className="text-xs text-muted-foreground text-center">
                    {processText(pricing.disclaimer)}
                  </p>
                )}
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
