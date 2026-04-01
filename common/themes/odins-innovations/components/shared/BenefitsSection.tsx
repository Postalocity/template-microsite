import { BenefitsContent } from "@/types/content";
import { sanitizeHtml } from "@/utils/sanitize-html";
import { useFormattedPricing } from "@/utils/pricing";

interface BenefitsSectionProps {
  benefits: BenefitsContent;
}

const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  const { short, full, withEnvelope } = useFormattedPricing();
  
  if (!benefits?.section || !benefits?.benefits) {
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
    <section id="benefits" className="section-lg section-alt">
      <div className="section-container">
        {/* Section header - bold, left-aligned */}
        <div className="max-w-3xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(var(--accent))' }}
          >
            Why Choose Odin&apos;s
          </p>
          <h2 className="mb-6 text-foreground">
            {benefits.section.title}
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {benefits.section.description}
          </p>
        </div>

        {/* Benefits - two-column layout with visual hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {benefits.benefits.map((benefit, idx) => (
            <div key={idx} className="group">
              {/* Number indicator */}
              <span 
                className="font-display text-5xl block mb-4"
                style={{ 
                  color: 'hsl(var(--accent) / 0.15)',
                  lineHeight: 1
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-body text-lg font-bold mb-3 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors">
                {benefit.title}
              </h3>
              <p 
                className="font-body text-base leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(processText(benefit.description || benefit.detail)) }}
              />
              {benefit.metrics && (
                <div 
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: 'hsl(var(--border))' }}
                >
                  <p 
                    className="text-sm font-bold uppercase-tracked"
                    style={{ color: 'hsl(var(--accent))' }}
                  >
                    {processText(benefit.metrics)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
