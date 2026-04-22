import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

interface HighlightSectionProps {
  section: {
    title: string;
    description: string;
    background: {
      image: string;
      overlay?: boolean;
      alt?: string;
    };
    ctas: Array<{
      text: string;
      href: string;
      variant?: 'primary' | 'outline' | 'secondary';
    }>;
  };
}

export function HighlightSection({ section }: HighlightSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={section.background.image}
          alt={section.background.alt || section.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Velum/Overlay */}
        {section.background.overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {section.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {section.description}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            {section.ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.href}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <Button
                  variant={cta.variant === 'outline' ? 'outline' : 'default'}
                  size="lg"
                  className={
                    cta.variant === 'outline'
                      ? 'border-2 border-white text-white hover:bg-white hover:text-black bg-transparent'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }
                >
                  {cta.text}
                </Button>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HighlightSection;
