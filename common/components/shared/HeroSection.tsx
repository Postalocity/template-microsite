import { motion } from 'framer-motion';
import { HeroContent, CTA } from '../../types/content';

interface HeroSectionProps {
  hero: HeroContent;
}

const HeroSection = ({ hero }: HeroSectionProps) => {
  return (
    <header
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {hero.background?.image && (
        <div className="absolute inset-0">
          <img
            src={hero.background.image}
            alt={hero.background.alt || 'Background'}
            className="w-full h-full object-cover opacity-30 mix-blend-lighten"
            onError={(e) => {
              e.currentTarget.parentElement?.remove();
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/60 via-hero/40 to-hero/90" />
        </div>
      )}

      <div className="section-container relative z-10 py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-hero-foreground mb-6">
            {hero.headline.main}{' '}
            <span className="gradient-text">
              {hero.headline.highlightTerm}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-hero-subtitle leading-relaxed mb-10 max-w-2xl">
            {hero.subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {hero.ctas.map((cta: CTA, idx: number) => (
              <a
                key={idx}
                href={cta.href}
                className={
                  cta.variant === 'primary'
                    ? 'inline-flex flex-col items-center bg-primary/10 border-2 border-primary rounded-xl px-8 py-4 hover:bg-primary/20 transition-all'
                    : 'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-cta-outline text-lg'
                }
              >
                {cta.variant === 'primary' && cta.subtext ? (
                  <>
                    <span className="text-xl sm:text-2xl font-black text-primary">
                      {cta.text}
                    </span>
                    <span className="text-xs text-hero-subtitle">
                      {cta.subtext}
                    </span>
                  </>
                ) : (
                  cta.text
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
