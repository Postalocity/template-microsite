import { useBrand } from "@/contexts";

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

const HowItWorksSection = ({ howItWorks }: HowItWorksSectionProps) => {
  const ctx = useBrand();
  const brandHowItWorks = ctx.brand.howItWorks;
  
  const hasConfig = howItWorks && (howItWorks.steps?.length || howItWorks.section?.title);
  const allSteps = hasConfig ? howItWorks?.steps : (brandHowItWorks?.steps || [
    {
      number: "01",
      title: "Choose Your Formula",
      description: "Select from Doe Estrus, Dominant Buck, or specialty blends based on your target species and season."
    },
    {
      number: "02",
      title: "Deploy in the Field",
      description: "Place beads in mock scrapes, on drag lines, or around your stand. A little goes a long way."
    },
    {
      number: "03", 
      title: "Let Science Work",
      description: "The polymer matrix releases attractant steadily for 30+ days—rain or shine, hot or cold."
    },
    {
      number: "04",
      title: "Results in the Crosshairs",
      description: "Consistent attraction that outlasts traditional lures. No re-application needed for weeks."
    }
  ]);
  const steps = allSteps || [];

  const sectionTitle = howItWorks?.section?.title || brandHowItWorks?.section?.title || "How It Works";
  const sectionDesc = howItWorks?.section?.description || brandHowItWorks?.section?.description || "Four steps to consistent results";
  const sectionId = howItWorks?.section?.id || brandHowItWorks?.section?.id || "how-it-works";

  return (
    <section id={sectionId} className="section-lg section-alt">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(var(--accent))' }}
          >
            How It Works
          </p>
          <h2 className="mb-6 text-foreground">
            {sectionTitle}
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Steps - horizontal timeline on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              {/* Connector line between steps (hidden on last) */}
              {i < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-8 left-full w-full h-px"
                  style={{ background: 'hsl(var(--border))' }}
                />
              )}
              
              {/* Step number - large, accent colored */}
              <div 
                className="w-16 h-16 flex items-center justify-center mb-6"
                style={{ 
                  background: 'hsl(var(--accent) / 0.08)',
                  border: '2px solid hsl(var(--accent) / 0.2)'
                }}
              >
                <span 
                  className="font-display text-2xl"
                  style={{ color: 'hsl(var(--accent))' }}
                >
                  {step.number}
                </span>
              </div>
              
              <h3 className="font-body text-base font-bold mb-2 text-foreground">
                {step.title}
              </h3>
              <p 
                className="font-body text-sm leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <p className="font-body text-base leading-relaxed max-w-2xl">
            <strong>Pro tip:</strong> Start with less than you think you need. 
            These beads are engineered for slow, consistent release. 
            A small handful in a mock scrape can last an entire season.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
