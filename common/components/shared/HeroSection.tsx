import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HeroContent, CTA } from '../../types/content';

interface HeroSectionProps {
  hero: HeroContent;
}

const HeroSection = ({ hero }: HeroSectionProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <header
      ref={ref}
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      role="banner"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={hero.background.image}
          alt={hero.background.alt}
          className="w-full h-full object-cover opacity-30 mix-blend-lighten"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero/60 via-hero/40 to-hero/90" />
      </div>

      <div className="section-container relative z-10 py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-hero-foreground mb-6">
            {hero.headline.main}{" "}
            <span className="gradient-text">
              {hero.headline.highlightTerm}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-hero-subtitle leading-relaxed mb-10 max-w-2xl">
            {hero.subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Call to action buttons">
            {hero.ctas.map((cta: CTA, idx: number) => (
              <a
                key={idx}
                href={cta.href}
                className={`px-8 py-4 min-h-[44px] rounded-xl hover:bg-primary/20 transition-all ${
                  cta.variant === 'primary'
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'border-2 border-hero-subtitle/30'
                }`}
                aria-label={cta.text + (cta.subtext ? ` - ${cta.subtext}` : '')}
              >
                {cta.text}
                {cta.subtext && (
                  <span className="text-xs text-hero-subtitle mt-1 block">
                    {cta.subtext}
                  </span>
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;