interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const TestimonialsSection = ({ 
  title = "What Hunters Are Saying",
  subtitle = "Field Reports",
  description = "Real results from hunters who put Odin's to the test in the field. For hundreds more reviews, visit our product pages."
}: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="section-lg section-alt">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(var(--accent))' }}
          >
            {subtitle}
          </p>
          <h2 className="mb-6 text-foreground">
            {title}
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stamped.io Reviews Widget */}
        <div 
          id="stamped-main-widget" 
          className="stamped-main-widget" 
          data-widget-type="full-page"
          data-fill-empty="false"
          data-per-page="10"
        ></div>
        
        {/* Stamped.io Script */}
        <script 
          async 
          type="text/javascript" 
          src="https://cdn.stamped.io/widget.js"
        ></script>

        {/* Link to more testimonials */}
        <div className="mt-12">
          <a 
            href="https://www.odinsinnovations.com/pages/testimonials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Read More Field Reports
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
