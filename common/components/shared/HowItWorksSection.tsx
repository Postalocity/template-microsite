import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Printer, Mail, Truck, Check, FilePen, MousePointer2, Wand2 } from "lucide-react";
import { useBrand } from "@/contexts";
import { sanitizeHtml } from "@/utils/sanitize-html";

interface HowItWorksStep {
  number?: string;
  title: string;
  description: string;
}

interface HowItWorksContent {
  section?: {
    id?: string;
    title?: string;
    description?: string;
  };
  steps?: HowItWorksStep[];
}

interface HowItWorksSectionProps {
  howItWorks?: HowItWorksContent;
}

// Icon mapping based on step title keywords
const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('select') || lower.includes('click') || lower.includes('browse')) return MousePointer2;
  if (lower.includes('customize') || lower.includes('design') || lower.includes('artwork')) return Wand2;
  if (lower.includes('plan') || lower.includes('file') || lower.includes('upload') || lower.includes('document')) return FilePen;
  if (lower.includes('produce') || lower.includes('print') || lower.includes('process')) return Printer;
  if (lower.includes('verify') || lower.includes('address')) return Mail;
  if (lower.includes('mail') || lower.includes('deliver') || lower.includes('complete') || lower.includes('ship')) return Truck;
  return Mail;
};

const HowItWorksSection = ({ howItWorks }: HowItWorksSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  
  // Get brand config for default content
  const ctx = useBrand();
  const brandHowItWorks = ctx.brand.howItWorks;
  
  // Use config content if provided, otherwise fall back to brand defaults
  const hasConfig = howItWorks && (howItWorks.steps?.length || howItWorks.section?.title);
  const allSteps = hasConfig ? howItWorks?.steps : (brandHowItWorks?.steps || [
    {
      number: "1",
      title: "Upload Your PDFs",
      description: "Drag-and-drop your documents into our secure dashboard. Same-day or next-day mailing available."
    },
    {
      number: "2",
      title: "Address Verification",
      "description": "NCOA/CASS verification updates addresses before mailing, reducing returned letters by 40%."
    },
    {
      number: "3", 
      "title": "We Print & Process",
      "description": "Professional printing, folding, stuffing into envelopes, and sealing—all automated."
    },
    {
      number: "4",
      "title": "USPS Mailing & Tracking",
      "description": "Same-day or next-day mailing. Track Priority and Certified letters through delivery."
    }
  ]);
  const steps = allSteps || [];

  const sectionTitle = howItWorks?.section?.title || brandHowItWorks?.section?.title || "How It Works";
  const sectionDesc = howItWorks?.section?.description || brandHowItWorks?.section?.description || "Four simple steps from upload to mailing";
  const sectionClosing = howItWorks?.section?.closing;
  const sectionId = howItWorks?.section?.id || brandHowItWorks?.section?.id || "how-it-works";
  const numSteps = steps.length;
  
  // Dynamic grid columns based on number of steps
  const gridCols = numSteps <= 3 ? "lg:grid-cols-3" : numSteps === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

  return (
    <section
      id={sectionId}
      className="section-padding bg-background"
      ref={ref}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {sectionDesc}
          </p>
        </motion.div>

        <div className={`grid md:grid-cols-2 ${gridCols} gap-6`}>
          {steps.map((step, i) => {
            const Icon = getIcon(step.title);
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-card rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p 
                  className="text-muted-foreground text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(step.description) }}
                />
              </motion.div>
            );
          })}
        </div>

        {(sectionClosing || sectionDesc) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-10 text-lg font-semibold text-foreground"
          >
            {sectionClosing ? (
              sectionClosing
            ) : (
              <>
                <Check className="inline w-5 h-5 text-secondary mr-2" />
                {sectionDesc}
              </>
            )}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default HowItWorksSection;
