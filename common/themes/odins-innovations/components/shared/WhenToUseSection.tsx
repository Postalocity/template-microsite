import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface WhenToUseSectionProps {
  content: {
    headline: string;
    body: string;
    seasons?: Array<{
      name: string;
      months: string;
      description: string;
      image?: string;
      color?: string;
    }>;
    gallery?: string[]; // Image URLs for scent types, deer photos, etc.
  };
}

const WhenToUseSection = ({ content }: WhenToUseSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Default seasonal data for whitetail rut
  const defaultSeasons = [
    {
      name: "Pre-Rut",
      months: "Oct 15 - Oct 31",
      description: "Bucks begin establishing territory. Use sparingly to create curiosity without spooking deer.",
      color: "hsl(35, 70%, 50%)"
    },
    {
      name: "Peak Rut",
      months: "Nov 1 - Nov 20",
      description: "Prime time for Doe Estrus. Bucks are actively seeking does - maximum effectiveness.",
      color: "hsl(var(--secondary))"
    },
    {
      name: "Late Rut",
      months: "Nov 21 - Dec 10",
      description: "Secondary rut activity. Still effective for catching last-chance buck movement.",
      color: "hsl(var(--primary))"
    },
    {
      name: "Post-Rut",
      months: "Dec 11 - Jan 15",
      description: "Limited effectiveness. Deer recovering from rut - use only in high-traffic areas.",
      color: "hsl(200, 40%, 50%)"
    }
  ];

  const seasons = content.seasons || defaultSeasons;

  return (
    <section
      id="when-to-use"
      ref={ref}
      className="section-padding"
      style={{ background: 'hsl(var(--muted))' }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ 
                background: 'hsl(var(--accent) / 0.2)',
                color: 'hsl(var(--accent))',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              Seasonal Guide
            </span>
            <h2 
              className="font-display text-4xl md:text-5xl uppercase mb-4"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {content.headline}
            </h2>
            <div className="prose prose-lg max-w-3xl mx-auto">
              <p className="font-body text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {content.body}
              </p>
            </div>
          </div>

          {/* Seasonal Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h3 
              className="font-display text-2xl uppercase mb-8 text-center"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Whitetail Rut Calendar
            </h3>

            {/* Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {seasons.map((season, index) => (
                <motion.div
                  key={season.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative overflow-hidden"
                  style={{ 
                    background: 'white',
                    borderTop: `4px solid ${season.color || 'hsl(var(--primary))'}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {/* Season Image Placeholder */}
                  {season.image ? (
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={season.image} 
                        alt={season.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div 
                      className="h-24 flex items-center justify-center"
                      style={{ background: `${season.color || 'hsl(var(--primary))'}15` }}
                    >
                      <span 
                        className="font-display text-4xl font-bold"
                        style={{ color: season.color || 'hsl(var(--primary))', opacity: 0.3 }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  )}

                  <div className="p-5">
                    <div 
                      className="inline-block px-3 py-1 mb-3 font-body text-xs font-bold uppercase"
                      style={{ 
                        background: season.color || 'hsl(var(--primary))',
                        color: 'white'
                      }}
                    >
                      {season.months}
                    </div>
                    <h4 
                      className="font-display text-xl uppercase mb-2"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {season.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {season.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Gallery Section - For customer images */}
          {content.gallery && content.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 
                className="font-display text-2xl uppercase mb-6 text-center"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                In The Field
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {content.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="aspect-square overflow-hidden"
                    style={{ 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`Field photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Image Placeholder Notice */}
          {!content.gallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-8 border-2 border-dashed"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <p className="font-body text-muted-foreground">
                <em>Gallery space reserved for customer-provided images of scent types, product in use, and field photos.</em>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WhenToUseSection;
