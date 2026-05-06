interface StampedReviewsSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const StampedReviewsSection = ({ 
  title = "What Hunters Are Saying",
  subtitle = "Field Reports",
  description = "Real results from hunters who put Odin's to the test in the field. For hundreds more reviews, visit our product pages."
}: StampedReviewsSectionProps) => {
  return (
    <section id="reviews" className="section-lg section-alt">
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
        
        {/* Stamped.io Reviews Widget - Exact HTML */}
        <div 
          id="stamped-reviews-widget" 
          data-widget-type="full-page" 
          data-take="6" 
          data-product-brand="Odin's Innovations"
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

export default StampedReviewsSection;
