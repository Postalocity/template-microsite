import { ServicesContent } from "../../types/content";
import { sanitizeHtml } from "../../utils/sanitize-html";

interface ServicesSectionProps {
  services: ServicesContent;
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
  const itemCount = services?.services?.length || 0;
  
  if (!services?.section || itemCount === 0) {
    return null;
  }

  return (
    <section id="services" className="section-lg" style={{ background: 'hsl(220 15% 10%)' }}>
      <div className="section-container">
        {/* Section header - white on dark */}
        <div className="max-w-2xl mb-16">
          <p 
            className="uppercase-tracked mb-4"
            style={{ color: 'hsl(145 45% 55%)' }}
          >
            Our Scents
          </p>
          <h2 className="mb-6" style={{ color: 'white' }}>
            {services.section.title}
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: 'hsl(220 10% 65%)' }}>
            {services.section.description}
          </p>
        </div>

        {/* Services - grid with dark cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'hsl(220 10% 20%)' }}>
          {services.services.map((service) => (
            <div 
              key={service.title} 
              className="p-8 transition-colors group"
              style={{ background: 'hsl(220 15% 12%)' }}
            >
              <h3 className="font-body text-lg font-bold mb-3 group-hover:text-[hsl(145_45%_55%)] transition-colors" style={{ color: 'white' }}>
                {service.title}
              </h3>
              <p 
                className="font-body text-sm leading-relaxed"
                style={{ color: 'hsl(220 10% 55%)' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
